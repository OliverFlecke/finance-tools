pub(crate) mod event;
pub(crate) mod get;
pub(crate) mod summary;

use axum::{
	Router,
	routing::{get, post},
};

use crate::state::AppState;

pub fn stock_router() -> Router<AppState> {
	Router::new()
		.route("/", get(get::lookup))
		.route("/event", get(event::get::list).post(event::post::create))
		.route("/event/import", post(event::post::import))
		.route("/summary", get(summary::get::summary))
}
