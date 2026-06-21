pub mod get;
pub mod post;

use crate::{
	account::route::{get::accounts, post::add_account},
	state::AppState,
};
use axum::{
	routing::{get, post},
	Router,
};

pub fn account_router() -> Router<AppState> {
	Router::new()
		.route("/", get(accounts))
		.route("/", post(add_account))
}
