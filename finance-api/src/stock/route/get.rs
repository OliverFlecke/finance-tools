use std::sync::Arc;

use axum::{
	Json,
	extract::{Query, State},
	response::IntoResponse,
};
use http::StatusCode;
use worker::send::IntoSendFuture;

use crate::{
	auth::Claims,
	finnhub::{FinnhubClient, SymbolMatch},
};

/// Look up one or more stock symbols via Finnhub's symbol search.
#[cfg_attr(
    feature = "openapi",
    utoipa::path(
		operation_id = "lookup_stock",
        get,
		tag = "Stock",
        path = "/api/v1/stock",
		params(LookupQuery),
        responses(
            (status = 200, description = "Stocks looked up successfully", body = StockLookupResponse),
            (status = 401, description = "Unauthorized"),
            (status = 502, description = "Finnhub request failed"),
        ),
        security(
            ("bearer" = [])
        )
    )
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(client))]
pub async fn lookup(
	State(client): State<Arc<FinnhubClient>>,
	_user: Claims,
	Query(query): Query<LookupQuery>,
) -> Result<Json<StockLookupResponse>, StockLookupError> {
	// `reqwest`'s wasm backend returns a `!Send` future (it wraps JS promises).
	// Workers is single-threaded, so wrapping it as `Send` here is safe; axum's
	// `Handler` trait requires the handler's future to be `Send` regardless.
	async move {
		let symbols = query
			.symbols
			.split(',')
			.map(str::trim)
			.filter(|s| !s.is_empty());

		let mut results = Vec::new();
		for symbol in symbols {
			let found = client.symbol_search(symbol).await?;
			results.push(StockLookupResult {
				symbol: symbol.to_string(),
				matches: found.result,
			});
		}

		Ok(Json(StockLookupResponse { results }))
	}
	.into_send()
	.await
}

#[cfg_attr(feature = "openapi", derive(utoipa::IntoParams))]
#[derive(Debug, serde::Deserialize)]
pub struct LookupQuery {
	/// Comma separated list of stock symbols to look up, e.g. `AAPL,MSFT`.
	symbols: String,
}

#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize)]
pub struct StockLookupResponse {
	results: Vec<StockLookupResult>,
}

#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize)]
pub struct StockLookupResult {
	/// The symbol as requested.
	symbol: String,
	/// Matches found for this symbol, as returned by Finnhub.
	matches: Vec<SymbolMatch>,
}

#[derive(Debug, thiserror::Error)]
pub enum StockLookupError {
	#[error("Finnhub error: {0}")]
	Finnhub(#[from] crate::finnhub::FinnhubError),
}

impl IntoResponse for StockLookupError {
	fn into_response(self) -> axum::response::Response {
		match self {
			Self::Finnhub(e) => {
				tracing::error!(?e, "Finnhub request failed");
				StatusCode::BAD_GATEWAY.into_response()
			}
		}
	}
}
