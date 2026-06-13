use std::sync::Arc;

use axum::{extract::State, response::IntoResponse, Json};
use chrono::NaiveDate;
use http::StatusCode;
use rust_decimal::{prelude::FromPrimitive, Decimal};
use sqlx_d1::D1Connection;
use uuid::Uuid;

use crate::{auth::Claims, state::AppState};

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
	kind: AccountKind,
	entries: Vec<AccountEntry>,
}

#[derive(Debug, serde::Serialize, serde::Deserialize, strum::FromRepr)]
#[repr(u8)]
pub enum AccountKind {
	Cash,
	Investment,
}

/// Represents an amount logged for on an account on a given date.
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct AccountEntry {
	date: NaiveDate,
	amount: Decimal,
}

#[derive(Debug, thiserror::Error)]
pub enum GetAccountError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),
}

impl IntoResponse for GetAccountError {
	fn into_response(self) -> axum::response::Response {
		match self {
			GetAccountError::DatabaseError(_) => {
				(StatusCode::INTERNAL_SERVER_ERROR).into_response()
			}
		}
	}
}

/// Get accounts for a user.
/// Note that this currently only return accounts in the first project for the user.
#[axum::debug_handler(state = AppState)]
#[tracing::instrument(skip(db))]
pub async fn accounts(
	State(db): State<Arc<D1Connection>>,
	user: Claims,
) -> Result<Json<AccountResponse>, GetAccountError> {
	tracing::info!(?user, "Fetching accounts");

	let accounts = get_accounts(db, &user.user_id()).await?;
	Ok(Json(AccountResponse { accounts }))
}

async fn get_accounts(db: Arc<D1Connection>, user: &str) -> Result<Vec<Account>, GetAccountError> {
	let entries = sqlx_d1::query!(
		r#"
		SELECT
			CAST(a.id AS TEXT) as id
			, a.name
			, a.currency
			, a.type as "kind"
			, e.amount as "amount: f64"
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
		user
	)
	.fetch_all(db.as_ref())
	.await
	.map_err(GetAccountError::DatabaseError)?;

	Ok(entries
		.chunk_by(|a, b| &a.id == &b.id)
		.map(|values| {
			let account = values.first().unwrap();

			// TODO: We should avoid these `expects`
			Account {
				id: Uuid::parse_str(&account.id).expect("to be valid uuid"),
				currency: account.currency.clone(),
				name: account.name.clone(),
				kind: AccountKind::from_repr(account.kind as u8)
					.expect("to be a valid account kind"),
				entries: values
					.iter()
					.map(|x| AccountEntry {
						date: x.date,
						amount: Decimal::from_f64(x.amount).expect("to be a valid decimal"),
					})
					.collect(),
			}
		})
		.collect::<Vec<_>>())
}
