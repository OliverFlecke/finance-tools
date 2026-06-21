pub(crate) mod delete;
pub(crate) mod entry;
pub(crate) mod get;
pub(crate) mod post;

use crate::state::AppState;
use axum::{
	routing::{delete, get, post},
	Router,
};

pub fn account_router() -> Router<AppState> {
	Router::new()
		.route("/", get(get::read))
		.route("/", post(post::add))
		.route("/{id}", delete(delete::remove))
		.route("/{id}", post(entry::post::add))
}
