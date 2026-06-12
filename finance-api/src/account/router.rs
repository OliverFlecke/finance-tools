use std::convert::Infallible;

use axum::{routing::get, Json, Router};
use uuid::Uuid;

use crate::{auth::Claims, state::AppState};

pub fn account_router() -> Router<AppState> {
	Router::new().route("/", get(accounts))
}

#[derive(Debug, serde::Serialize)]
pub struct AccountResponse {
	accounts: Vec<Account>,
}

#[derive(Debug, serde::Serialize)]
pub struct Account {
	id: Uuid,
	name: String,
	currency: String,
}

#[axum::debug_handler(state = AppState)]
#[tracing::instrument()]
async fn accounts(user: Claims) -> Result<Json<AccountResponse>, Infallible> {
	tracing::info!(?user, "Fetching accounts");

	Ok(Json(AccountResponse {
		accounts: vec![Account {
			id: Uuid::new_v4(),
			name: "Test".to_string(),
			currency: "USD".to_string(),
		}],
	}))
}
