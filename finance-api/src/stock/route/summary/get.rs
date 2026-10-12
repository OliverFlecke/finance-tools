use std::{collections::HashMap, sync::Arc};

use axum::{Json, extract::State, response::IntoResponse};
use http::StatusCode;
use rust_decimal::{Decimal, prelude::FromPrimitive};
use sqlx_d1::D1Connection;
use worker::send::IntoSendFuture;

use crate::{auth::Claims, stock::model::StockEventKind, yahoo::YahooClient};

/// Get an aggregated view of all stock events, grouped by portfolio and symbol.
///
/// Reports the current lot (share) count and cost basis, realized and unrealized
/// profit using the average cost method, and the latest price from Yahoo Finance.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		operation_id = "get_stock_summary",
		get,
		tag = "Stock",
		path = "/api/v1/stock/summary",
		responses(
			(status = 200, description = "Stock summary retrieved successfully", body = StockSummaryResponse),
			(status = 401, description = "Unauthorized"),
			(status = 500, description = "Internal server error"),
		),
		security(
			("bearer" = [])
		)
	)
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(db, yahoo))]
pub async fn summary(
	State(db): State<Arc<D1Connection>>,
	State(yahoo): State<Arc<YahooClient>>,
	user: Claims,
) -> Result<Json<StockSummaryResponse>, GetStockSummaryError> {
	// See `stock::route::get::lookup` for why this is wrapped: `reqwest`'s wasm
	// backend returns a `!Send` future, but axum's `Handler` trait requires `Send`.
	async move { summarize(db, yahoo, user).await }
		.into_send()
		.await
}

async fn summarize(
	db: Arc<D1Connection>,
	yahoo: Arc<YahooClient>,
	user: Claims,
) -> Result<Json<StockSummaryResponse>, GetStockSummaryError> {
	let rows = sqlx_d1::query!(
		r#"
		SELECT
			e.portfolio
			, e.symbol
			, e.kind
			, e.quantity as "quantity: f64"
			, e.price as "price: f64"
			, e.commission as "commission: f64"
			, e.currency
		FROM stock_event e
		JOIN project_access p ON p.project_id = e.project_id AND CAST(p.user_id AS TEXT) = ?
		ORDER BY e.trade_date ASC
		"#,
		user.user_id(),
	)
	.fetch_all(db.as_ref())
	.await
	.map_err(GetStockSummaryError::DatabaseError)?;

	let mut groups: HashMap<(String, String), (String, Vec<Lot>)> = HashMap::new();
	for row in rows {
		groups
			.entry((row.portfolio, row.symbol))
			.or_insert_with(|| (row.currency.clone(), Vec::new()))
			.1
			.push(Lot {
				kind: StockEventKind::from_repr(row.kind as u8).expect("to be a valid event kind"),
				quantity: Decimal::from_f64(row.quantity).unwrap_or_default(),
				price: Decimal::from_f64(row.price).unwrap_or_default(),
				commission: Decimal::from_f64(row.commission).unwrap_or_default(),
			});
	}

	let positions: Vec<_> = groups
		.into_iter()
		.map(|((portfolio, symbol), (currency, lots))| {
			let (quantity, cost_basis, realized_profit) = aggregate(&lots);
			(
				portfolio,
				symbol,
				currency,
				quantity,
				cost_basis,
				realized_profit,
			)
		})
		.collect();

	// Fetch the current price once per distinct symbol, even if held in multiple portfolios.
	let mut prices: HashMap<String, Option<Decimal>> = HashMap::new();
	for (_, symbol, ..) in &positions {
		if !prices.contains_key(symbol) {
			let price = yahoo
				.quote(symbol)
				.await
				.ok()
				.and_then(|q| Decimal::from_f64(q.price));
			prices.insert(symbol.clone(), price);
		}
	}

	let summaries = positions
		.into_iter()
		.map(
			|(portfolio, symbol, currency, quantity, cost_basis, realized_profit)| {
				let current_price = prices.get(&symbol).copied().flatten();
				let unrealized_profit = current_price.map(|price| quantity * price - cost_basis);

				StockSummary {
					portfolio,
					symbol,
					currency,
					quantity,
					cost_basis,
					realized_profit,
					current_price,
					unrealized_profit,
				}
			},
		)
		.collect();

	Ok(Json(StockSummaryResponse { summaries }))
}

struct Lot {
	kind: StockEventKind,
	quantity: Decimal,
	price: Decimal,
	commission: Decimal,
}

/// Computes `(lot count, cost basis, realized profit)` for a chronologically
/// ordered sequence of events, using the average cost method: each sell realizes
/// profit against the average cost per share of the position at that point,
/// rather than tracking individual purchase lots (e.g. FIFO).
fn aggregate(events: &[Lot]) -> (Decimal, Decimal, Decimal) {
	let mut quantity = Decimal::ZERO;
	let mut cost_basis = Decimal::ZERO;
	let mut realized_profit = Decimal::ZERO;

	for event in events {
		let gross = event.quantity * event.price;
		match event.kind {
			StockEventKind::Buy => {
				quantity += event.quantity;
				cost_basis += gross + event.commission;
			}
			StockEventKind::Sell => {
				if quantity > Decimal::ZERO {
					let avg_cost = cost_basis / quantity;
					realized_profit += gross - event.commission - avg_cost * event.quantity;
					cost_basis -= avg_cost * event.quantity;
				}
				quantity -= event.quantity;
			}
		}
	}

	(quantity, cost_basis, realized_profit)
}

/// Response for the aggregated stock summary.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct StockSummaryResponse {
	summaries: Vec<StockSummary>,
}

/// Aggregated position for one symbol within one portfolio.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct StockSummary {
	portfolio: String,
	symbol: String,
	/// ISO currency code the price fields are quoted in, e.g. `USD` or `GBp`.
	currency: String,
	/// Current number of shares held.
	#[serde(with = "rust_decimal::serde::float")]
	quantity: Decimal,
	/// Total cost basis of the current position.
	#[serde(with = "rust_decimal::serde::float")]
	cost_basis: Decimal,
	#[serde(with = "rust_decimal::serde::float")]
	realized_profit: Decimal,
	/// Latest price from Yahoo Finance. `None` if the quote could not be retrieved.
	#[serde(with = "rust_decimal::serde::float_option")]
	current_price: Option<Decimal>,
	/// `None` if the current price could not be retrieved.
	#[serde(with = "rust_decimal::serde::float_option")]
	unrealized_profit: Option<Decimal>,
}

#[derive(Debug, thiserror::Error)]
pub enum GetStockSummaryError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),
}

impl IntoResponse for GetStockSummaryError {
	fn into_response(self) -> axum::response::Response {
		match self {
			Self::DatabaseError(_) => (StatusCode::INTERNAL_SERVER_ERROR).into_response(),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;

	#[test]
	fn average_cost_tracks_partial_sell() {
		let events = vec![
			Lot {
				kind: StockEventKind::Buy,
				quantity: Decimal::from(10),
				price: Decimal::from(100),
				commission: Decimal::ZERO,
			},
			Lot {
				kind: StockEventKind::Sell,
				quantity: Decimal::from(4),
				price: Decimal::from(150),
				commission: Decimal::ZERO,
			},
		];

		let (quantity, cost_basis, realized_profit) = aggregate(&events);

		assert_eq!(quantity, Decimal::from(6));
		assert_eq!(cost_basis, Decimal::from(600));
		assert_eq!(realized_profit, Decimal::from(200));
	}

	#[test]
	fn multiple_buys_average_cost_before_sell() {
		let events = vec![
			Lot {
				kind: StockEventKind::Buy,
				quantity: Decimal::from(10),
				price: Decimal::from(100),
				commission: Decimal::ZERO,
			},
			Lot {
				kind: StockEventKind::Buy,
				quantity: Decimal::from(10),
				price: Decimal::from(200),
				commission: Decimal::ZERO,
			},
			Lot {
				kind: StockEventKind::Sell,
				quantity: Decimal::from(20),
				price: Decimal::from(150),
				commission: Decimal::ZERO,
			},
		];

		let (quantity, cost_basis, realized_profit) = aggregate(&events);

		assert_eq!(quantity, Decimal::ZERO);
		assert_eq!(cost_basis, Decimal::ZERO);
		// Avg cost = (10*100 + 10*200) / 20 = 150; sold at 150 => 0 profit.
		assert_eq!(realized_profit, Decimal::ZERO);
	}
}
