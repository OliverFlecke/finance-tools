use std::{convert::Infallible, sync::Arc};

use axum::{extract::State, routing::get, Json, Router};
use sqlx_d1::D1Connection;
use uuid::Uuid;

use crate::{auth::Claims, state::AppState};

pub fn account_router() -> Router<AppState> {
	Router::new().route("/", get(accounts))
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct AccountResponse {
	accounts: Vec<Account>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize, sqlx_d1::FromRow)]
pub struct Account {
	id: Uuid,
	name: String,
	currency: String,
}

#[axum::debug_handler(state = AppState)]
async fn accounts(
	State(db): State<Arc<D1Connection>>,
	user: Claims,
) -> Result<Json<AccountResponse>, Infallible> {
	tracing::info!(?user, "Fetching accounts");

	// let accounts = sqlx_d1::query!(
	// 	"
	// 	SELECT a.id, a.name, a.currency
	// 	FROM account a
	// 	WHERE a.project_id IN (
	// 		SELECT p.id
	// 		FROM project p
	// 		JOIN project_access pa ON pa.project_id = p.id
	// 		WHERE pa.user_id = ?
	// 	)
	// 	ORDER BY a.sort_key
	//        ",
	// 	user.user_id()
	// )
	// .fetch_all(db.as_ref())
	// .await
	// .expect("to be able to fetch accounts");

	let entries = sqlx_d1::query!(
		"
		SELECT e.amount, CAST(e.date AS DATE) AS date, a.id, a.name, a.currency
		FROM account_entry e
		JOIN account a ON a.id = e.account_id
		WHERE a.project_id IN (
			SELECT p.id FROM project p
			JOIN project_access pa ON pa.project_id = p.id
			WHERE pa.user_id = ?
		)
		",
		user.user_id()
	)
	.fetch_all(db.as_ref())
	.await
	.expect("to be able to fetch entries");

	Ok(Json(AccountResponse {
		accounts: entries
			.into_iter()
			.map(|a| Account {
				id: Uuid::parse_str(&a.id).unwrap(),
				name: a.name,
				currency: a.currency,
			})
			.collect(),
	}))
}
