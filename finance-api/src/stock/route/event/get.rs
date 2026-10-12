use std::sync::Arc;

use axum::{Json, extract::State, response::IntoResponse};
use chrono::NaiveDate;
use http::StatusCode;
use rust_decimal::{Decimal, prelude::FromPrimitive};
use sqlx_d1::D1Connection;
use uuid::Uuid;

use crate::{auth::Claims, stock::model::StockEventKind};

/// Get all stock buy/sell events for the current user, across all portfolios.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		operation_id = "get_stock_events",
		get,
		tag = "Stock",
		path = "/api/v1/stock/event",
		responses(
			(status = 200, description = "Stock events retrieved successfully", body = StockEventResponse),
			(status = 401, description = "Unauthorized"),
			(status = 500, description = "Internal server error"),
		),
		security(
			("bearer" = [])
		)
	)
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(db))]
pub async fn list(
	State(db): State<Arc<D1Connection>>,
	user: Claims,
) -> Result<Json<StockEventResponse>, GetStockEventsError> {
	let rows = sqlx_d1::query!(
		r#"
		SELECT
			CAST(e.id AS TEXT) as id
			, e.portfolio
			, e.symbol
			, e.kind
			, e.trade_date as "trade_date: NaiveDate"
			, e.quantity as "quantity: f64"
			, e.price as "price: f64"
			, e.commission as "commission: f64"
			, e.comment
		FROM stock_event e
		JOIN project_access p ON p.project_id = e.project_id AND CAST(p.user_id AS TEXT) = ?
		ORDER BY e.trade_date DESC
		"#,
		user.user_id(),
	)
	.fetch_all(db.as_ref())
	.await
	.map_err(GetStockEventsError::DatabaseError)?;

	let events = rows
		.into_iter()
		.map(|row| StockEvent {
			id: Uuid::parse_str(&row.id).expect("to be valid uuid"),
			portfolio: row.portfolio,
			symbol: row.symbol,
			kind: StockEventKind::from_repr(row.kind as u8).expect("to be a valid event kind"),
			trade_date: row.trade_date,
			quantity: Decimal::from_f64(row.quantity).unwrap_or_default(),
			price: Decimal::from_f64(row.price).unwrap_or_default(),
			commission: Decimal::from_f64(row.commission).unwrap_or_default(),
			comment: row.comment,
		})
		.collect();

	Ok(Json(StockEventResponse { events }))
}

/// Response for stock events.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct StockEventResponse {
	events: Vec<StockEvent>,
}

/// A single buy or sell event for a stock, in a given portfolio.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct StockEvent {
	id: Uuid,
	/// User provided label for the portfolio this event belongs to.
	portfolio: String,
	symbol: String,
	kind: StockEventKind,
	trade_date: NaiveDate,
	#[serde(with = "rust_decimal::serde::float")]
	quantity: Decimal,
	#[serde(with = "rust_decimal::serde::float")]
	price: Decimal,
	#[serde(with = "rust_decimal::serde::float")]
	commission: Decimal,
	comment: Option<String>,
}

#[derive(Debug, thiserror::Error)]
pub enum GetStockEventsError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),
}

impl IntoResponse for GetStockEventsError {
	fn into_response(self) -> axum::response::Response {
		match self {
			Self::DatabaseError(_) => (StatusCode::INTERNAL_SERVER_ERROR).into_response(),
		}
	}
}
