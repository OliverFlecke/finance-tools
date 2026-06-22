use std::sync::Arc;

use axum::{
	extract::{Path, State},
	response::IntoResponse,
	Json,
};
use http::StatusCode;
use sqlx_d1::D1Connection;
use uuid::Uuid;

use crate::{account::model::AccountKind, auth::Claims};

/// Update properties of an account.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		patch,
		tag = "Account",
		path = "/api/v1/account/{id}",
		params(
			("id" = Uuid, Path, description = "Account ID")
		),
		request_body = UpdateAccountRequest,
		responses(
			(status = 200, description = "Account updated successfully"),
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
pub async fn update_account(
	State(db): State<Arc<D1Connection>>,
	user: Claims,
	Path(id): Path<Uuid>,
	Json(request): Json<UpdateAccountRequest>,
) -> Result<impl IntoResponse, UpdateAccountError> {
	sqlx_d1::query!(
		r#"
		UPDATE account SET
			name = COALESCE(?, name),
			currency = COALESCE(?, currency),
			type = COALESCE(?, type),
			archived = COALESCE(?, archived),
			sort_key = COALESCE(?, sort_key)
		WHERE id = ?
		  AND project_id IN (SELECT project_id FROM project_access WHERE user_id = ?)
		RETURNING name
		"#,
		request.name,
		request.currency,
		request.kind.map(|k| k as u8),
		request.archived,
		request.sort_key,
		id.hyphenated().to_string(),
		user.user_id(),
	)
	.fetch_optional(db.as_ref())
	.await
	.map_err(UpdateAccountError::DatabaseError)?
	.ok_or(UpdateAccountError::AccountNotFound)?;

	Ok(StatusCode::OK)
}

/// Request to update an account.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct UpdateAccountRequest {
	/// Name of the account.
	name: Option<String>,
	/// Currency of the account. ISO 4217 currency code.
	currency: Option<String>,
	/// Type of the account.
	kind: Option<AccountKind>,
	/// Archived state of the account.
	archived: Option<bool>,
	/// Sort key of the account.
	sort_key: Option<u32>,
}

#[derive(Debug, thiserror::Error)]
pub enum UpdateAccountError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),
	#[error("Account not found")]
	AccountNotFound,
}

impl IntoResponse for UpdateAccountError {
	fn into_response(self) -> axum::response::Response {
		match self {
			Self::DatabaseError(_) => (StatusCode::INTERNAL_SERVER_ERROR).into_response(),
			Self::AccountNotFound => (StatusCode::NOT_FOUND).into_response(),
		}
	}
}
