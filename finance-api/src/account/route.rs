pub mod get_accounts;

use crate::{account::route::get_accounts::accounts, state::AppState};
use axum::{routing::get, Router};

pub fn account_router() -> Router<AppState> {
	Router::new().route("/", get(accounts))
}
