pub mod delete;
pub mod get;
pub mod post;

use crate::{
	account::route::{delete::delete_account, get::accounts, post::add_account},
	state::AppState,
};
use axum::{
	routing::{delete, get, post},
	Router,
};

pub fn account_router() -> Router<AppState> {
	Router::new()
		.route("/", get(accounts))
		.route("/", post(add_account))
		.route("/{id}", delete(delete_account))
}
