pub(crate) mod get;

use axum::{Router, routing::get};

use crate::state::AppState;

pub fn stock_router() -> Router<AppState> {
	Router::new().route("/", get(get::lookup))
}
