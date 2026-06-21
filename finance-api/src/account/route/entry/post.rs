use std::sync::Arc;

use axum::{
	extract::{Path, State},
	response::IntoResponse,
	Json,
};
use http::StatusCode;
use rust_decimal::Decimal;
use sqlx_d1::D1Connection;
use uuid::Uuid;

/// Add an entry to an account.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		post,
		tag = "Account",
		path = "/api/v1/account/{id}/entry",
		params(
			("id" = Uuid, Path, description = "Account ID")
		),
		request_body = AddAccountEntryRequest,
		responses(
			(status = 200, description = "Entry created successfully"),
			(status = 401, description = "Unauthorized"),
			(status = 404, description = "Account not found"),
			(status = 500, description = "Internal server error"),
		),
		security(
			("bearer_auth" = [])
		)
	)
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(db))]
pub async fn add(
	State(db): State<Arc<D1Connection>>,
	user: crate::auth::Claims,
	Path(id): Path<Uuid>,
	Json(request): Json<AddAccountEntryRequest>,
) -> Result<StatusCode, AddEntryError> {
	tracing::info!(?user, ?request, "Adding entry to account");

	let acccess = sqlx_d1::query!(
		r#"
		SELECT EXISTS (
			SELECT 1 FROM project_access
			WHERE project_id = ? AND user_id = ?
		) AS has_access
		"#,
		id,
		user.user_id(),
	)
	.fetch_one(db.as_ref())
	.await
	.map_err(AddEntryError::DatabaseError)?;

	if acccess.has_access == 0 {
		return Err(AddEntryError::AccountNotFound);
	}

	sqlx_d1::query!(
		r#"
		INSERT INTO account_entry (account_id, date, amount)
		VALUES (?, ?, ?)
		ON CONFLICT (account_id, date) DO UPDATE SET amount = EXCLUDED.amount
		"#,
		id.hyphenated().to_string(),
		request.date,
		request.amount,
	)
	.fetch_optional(db.as_ref())
	.await
	.map_err(AddEntryError::DatabaseError)?;

	Ok(StatusCode::OK)
}

/// Request to add an entry to an account.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct AddAccountEntryRequest {
	/// Date of the entry.
	date: chrono::NaiveDate,
	/// Amount of the entry.
	amount: Decimal,
}

#[derive(Debug, thiserror::Error)]
pub enum AddEntryError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),

	#[error("Account not found")]
	AccountNotFound,
}

impl IntoResponse for AddEntryError {
	fn into_response(self) -> axum::response::Response {
		match self {
			Self::DatabaseError(_) => (StatusCode::INTERNAL_SERVER_ERROR).into_response(),
			Self::AccountNotFound => (StatusCode::NOT_FOUND).into_response(),
		}
	}
}
