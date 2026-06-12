use std::{convert::Infallible, sync::Arc};

use axum::{extract::State, routing::get, Json, Router};
use chrono::NaiveDate;
use rust_decimal::{prelude::FromPrimitive, Decimal};
use sqlx_d1::D1Connection;
use uuid::Uuid;

use crate::{auth::Claims, state::AppState};

pub fn account_router() -> Router<AppState> {
	Router::new().route("/", get(accounts))
}

/// Response for accounts.
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct AccountResponse {
	accounts: Vec<Account>,
}

/// An account with name and currency. Amounts can be logged on different dates in this account.
#[derive(Debug, serde::Serialize, serde::Deserialize, sqlx_d1::FromRow)]
pub struct Account {
	id: Uuid,
	name: String,
	currency: String,
	entries: Vec<AccountEntry>,
	// TODO: Add type
}

/// Represents an amount logged for on an account on a given date.
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct AccountEntry {
	date: NaiveDate,
	amount: Decimal,
}

#[axum::debug_handler(state = AppState)]
async fn accounts(
	State(db): State<Arc<D1Connection>>,
	user: Claims,
) -> Result<Json<AccountResponse>, Infallible> {
	tracing::info!(?user, "Fetching accounts");

	let entries = sqlx_d1::query!(
		r#"
		SELECT
			CAST(a.id AS TEXT) as id
			, a.name
			, a.currency
			, e.amount
			, e.date as "date: NaiveDate"
		FROM account_entry e
		JOIN account a ON a.id = e.account_id
		WHERE a.project_id IN (
			SELECT p.id FROM project p
			JOIN project_access pa ON pa.project_id = p.id
			WHERE pa.user_id = ?
			LIMIT 1
		)
		ORDER BY a.id, a.sort_key
		"#,
		user.user_id()
	)
	.fetch_all(db.as_ref())
	.await
	.expect("to be able to fetch entries");

	let accounts = entries
		.chunk_by(|a, b| &a.id == &b.id)
		.map(|values| {
			let account = values.first().unwrap();

			Account {
				id: Uuid::parse_str(&account.id).expect("to be valid uuid"),
				currency: account.currency.clone(),
				name: account.name.clone(),
				entries: values
					.iter()
					.map(|x| AccountEntry {
						date: x.date,
						amount: Decimal::from_f64(x.amount).expect("to be a valid decimal"),
					})
					.collect(),
			}
		})
		.collect::<Vec<_>>();

	Ok(Json(AccountResponse { accounts }))
}
