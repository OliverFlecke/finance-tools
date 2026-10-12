use std::{collections::HashMap, sync::Arc};

use axum::{Json, extract::State, response::IntoResponse};
use chrono::NaiveDate;
use http::StatusCode;
use rust_decimal::Decimal;
use sqlx_d1::D1Connection;
use uuid::Uuid;
use worker::send::IntoSendFuture;

use crate::{auth::Claims, stock::model::StockEventKind, yahoo::YahooClient};

/// Import stock buy/sell events from a broker CSV export (e.g. Interactive Brokers).
///
/// Expected columns: `Symbol,Trade Date,Purchase Price,Quantity,Commission,Comment,Transaction Type`,
/// with `Trade Date` formatted as `YYYYMMDD` and `Transaction Type` one of `BUY`/`SELL`.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		operation_id = "import_stock_events",
		post,
		tag = "Stock",
		path = "/api/v1/stock/event/import",
		request_body = ImportStockEventsRequest,
		responses(
			(status = 200, description = "Events imported successfully", body = ImportStockEventsResponse),
			(status = 400, description = "CSV could not be parsed"),
			(status = 401, description = "Unauthorized"),
			(status = 500, description = "Internal server error"),
		),
		security(
			("bearer" = [])
		)
	)
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(db, yahoo, request))]
pub async fn import(
	State(db): State<Arc<D1Connection>>,
	State(yahoo): State<Arc<YahooClient>>,
	user: Claims,
	Json(request): Json<ImportStockEventsRequest>,
) -> Result<Json<ImportStockEventsResponse>, ImportStockEventsError> {
	// See `stock::route::get::lookup` for why this is wrapped: `reqwest`'s wasm
	// backend returns a `!Send` future, but axum's `Handler` trait requires `Send`.
	async move { do_import(db, yahoo, user, request).await }
		.into_send()
		.await
}

/// Record a single stock buy or sell transaction.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		operation_id = "add_stock_event",
		post,
		tag = "Stock",
		path = "/api/v1/stock/event",
		request_body = AddStockEventRequest,
		responses(
			(status = 200, description = "Event recorded successfully"),
			(status = 401, description = "Unauthorized"),
			(status = 500, description = "Internal server error"),
		),
		security(
			("bearer" = [])
		)
	)
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(db, yahoo, request))]
pub async fn create(
	State(db): State<Arc<D1Connection>>,
	State(yahoo): State<Arc<YahooClient>>,
	user: Claims,
	Json(request): Json<AddStockEventRequest>,
) -> Result<StatusCode, ImportStockEventsError> {
	// See `stock::route::get::lookup` for why this is wrapped: `reqwest`'s wasm
	// backend returns a `!Send` future, but axum's `Handler` trait requires `Send`.
	async move { do_create(db, yahoo, user, request).await }
		.into_send()
		.await
}

async fn do_create(
	db: Arc<D1Connection>,
	yahoo: Arc<YahooClient>,
	user: Claims,
	request: AddStockEventRequest,
) -> Result<StatusCode, ImportStockEventsError> {
	let currency = yahoo
		.quote(&request.symbol)
		.await
		.map(|q| q.currency)
		.unwrap_or_else(|_| "USD".to_string());

	sqlx_d1::query!(
		r#"
		WITH project AS (
			SELECT project_id as id FROM project_access
			WHERE user_id = ? ORDER BY project_id LIMIT 1
		)
		INSERT INTO stock_event (id, project_id, portfolio, symbol, kind, trade_date, quantity, price, commission, currency)
		SELECT ?, p.id, ?, ?, ?, date('now'), ?, ?, ?, ?
		FROM project p
		"#,
		user.user_id(),
		Uuid::now_v7().hyphenated().to_string(),
		request.portfolio,
		request.symbol,
		request.kind as u8,
		request.quantity,
		request.price,
		request.commission,
		currency,
	)
	.execute(db.as_ref())
	.await
	.map_err(ImportStockEventsError::DatabaseError)?;

	Ok(StatusCode::OK)
}

/// Request to record a single stock buy or sell transaction.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct AddStockEventRequest {
	/// Portfolio this event belongs to. The same stock can be held in multiple portfolios.
	portfolio: String,
	symbol: String,
	kind: StockEventKind,
	#[serde(with = "rust_decimal::serde::float")]
	quantity: Decimal,
	#[serde(with = "rust_decimal::serde::float")]
	price: Decimal,
	#[serde(with = "rust_decimal::serde::float")]
	commission: Decimal,
}

async fn do_import(
	db: Arc<D1Connection>,
	yahoo: Arc<YahooClient>,
	user: Claims,
	request: ImportStockEventsRequest,
) -> Result<Json<ImportStockEventsResponse>, ImportStockEventsError> {
	let rows = parse_csv(&request.csv, &request.portfolio)?;
	tracing::info!(count = rows.len(), portfolio = %request.portfolio, "Importing stock events");

	// Look up each distinct symbol's quote currency once. Falls back to USD if
	// the quote can't be fetched, rather than failing the whole import.
	let mut currencies: HashMap<&str, String> = HashMap::new();
	for row in &rows {
		if !currencies.contains_key(row.symbol.as_str()) {
			let currency = yahoo
				.quote(&row.symbol)
				.await
				.map(|q| q.currency)
				.unwrap_or_else(|_| "USD".to_string());
			currencies.insert(&row.symbol, currency);
		}
	}

	for row in &rows {
		let currency = &currencies[row.symbol.as_str()];
		sqlx_d1::query!(
			r#"
			WITH project AS (
				SELECT project_id as id FROM project_access
				WHERE user_id = ? ORDER BY project_id LIMIT 1
			)
			INSERT INTO stock_event (id, project_id, portfolio, symbol, kind, trade_date, quantity, price, commission, comment, currency)
			SELECT ?, p.id, ?, ?, ?, ?, ?, ?, ?, ?, ?
			FROM project p
			"#,
			user.user_id(),
			Uuid::now_v7().hyphenated().to_string(),
			row.portfolio,
			row.symbol,
			row.kind as u8,
			row.trade_date,
			row.quantity,
			row.price,
			row.commission,
			row.comment,
			currency,
		)
		.execute(db.as_ref())
		.await
		.map_err(ImportStockEventsError::DatabaseError)?;
	}

	Ok(Json(ImportStockEventsResponse {
		imported: rows.len(),
	}))
}

fn parse_csv(csv: &str, portfolio: &str) -> Result<Vec<ParsedRow>, ImportStockEventsError> {
	let mut reader = csv::Reader::from_reader(csv.as_bytes());
	reader
		.deserialize::<CsvRow>()
		.map(|record| {
			let record = record.map_err(|e| ImportStockEventsError::InvalidCsv(e.to_string()))?;
			record.into_parsed_row(portfolio)
		})
		.collect()
}

#[derive(Debug, serde::Deserialize)]
struct CsvRow {
	#[serde(rename = "Symbol")]
	symbol: String,
	#[serde(rename = "Trade Date")]
	trade_date: String,
	#[serde(rename = "Purchase Price")]
	purchase_price: Decimal,
	#[serde(rename = "Quantity")]
	quantity: Decimal,
	#[serde(rename = "Commission")]
	commission: Decimal,
	#[serde(rename = "Comment")]
	comment: Option<String>,
	#[serde(rename = "Transaction Type")]
	transaction_type: String,
}

impl CsvRow {
	fn into_parsed_row(self, portfolio: &str) -> Result<ParsedRow, ImportStockEventsError> {
		let trade_date = NaiveDate::parse_from_str(&self.trade_date, "%Y%m%d").map_err(|_| {
			ImportStockEventsError::InvalidCsv(format!("invalid trade date '{}'", self.trade_date))
		})?;
		let kind = match self.transaction_type.as_str() {
			"BUY" => StockEventKind::Buy,
			"SELL" => StockEventKind::Sell,
			other => {
				return Err(ImportStockEventsError::InvalidCsv(format!(
					"unknown transaction type '{other}'"
				)));
			}
		};

		Ok(ParsedRow {
			portfolio: portfolio.to_string(),
			symbol: self.symbol,
			kind,
			trade_date,
			quantity: self.quantity,
			price: self.purchase_price,
			commission: self.commission,
			comment: self.comment.filter(|c| !c.is_empty()),
		})
	}
}

struct ParsedRow {
	portfolio: String,
	symbol: String,
	kind: StockEventKind,
	trade_date: NaiveDate,
	quantity: Decimal,
	price: Decimal,
	commission: Decimal,
	comment: Option<String>,
}

/// Request to import stock events from a CSV file.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct ImportStockEventsRequest {
	/// Portfolio to import these events into. The same stock can be held in multiple portfolios.
	portfolio: String,
	/// Raw contents of the CSV file.
	csv: String,
}

/// Response for a successful import.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct ImportStockEventsResponse {
	/// Number of events imported.
	imported: usize,
}

#[derive(Debug, thiserror::Error)]
pub enum ImportStockEventsError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),

	#[error("Invalid CSV: {0}")]
	InvalidCsv(String),
}

impl IntoResponse for ImportStockEventsError {
	fn into_response(self) -> axum::response::Response {
		match self {
			Self::DatabaseError(e) => {
				tracing::error!(?e, "Database error while importing stock events");
				(StatusCode::INTERNAL_SERVER_ERROR).into_response()
			}
			Self::InvalidCsv(message) => (StatusCode::BAD_REQUEST, message).into_response(),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;

	const SAMPLE: &str = "Symbol,Trade Date,Purchase Price,Quantity,Commission,Comment,Transaction Type\nCSPX.L,20260116,745.3,36.0,14.63,,BUY\nG3B.SI,20260702,5.284,1800.0,8.29,8.293766,BUY\n";

	#[test]
	fn parses_sample_ibkr_csv() {
		let rows = parse_csv(SAMPLE, "My Portfolio").expect("to parse");

		assert_eq!(rows.len(), 2);
		assert_eq!(rows[0].symbol, "CSPX.L");
		assert_eq!(rows[0].portfolio, "My Portfolio");
		assert_eq!(rows[0].kind, StockEventKind::Buy);
		assert_eq!(
			rows[0].trade_date,
			NaiveDate::from_ymd_opt(2026, 1, 16).unwrap()
		);
		assert_eq!(rows[0].quantity, Decimal::new(360, 1));
		assert_eq!(rows[0].comment, None);
		assert_eq!(rows[1].comment, Some("8.293766".to_string()));
	}

	#[test]
	fn skips_trailing_blank_line() {
		let rows = parse_csv(&format!("{SAMPLE}\n"), "My Portfolio").expect("to parse");
		assert_eq!(rows.len(), 2);
	}

	#[test]
	fn rejects_unknown_transaction_type() {
		let csv = "Symbol,Trade Date,Purchase Price,Quantity,Commission,Comment,Transaction Type\nAAPL,20260101,1,1,0,,SPLIT\n";
		assert!(matches!(
			parse_csv(csv, "p"),
			Err(ImportStockEventsError::InvalidCsv(_))
		));
	}
}
