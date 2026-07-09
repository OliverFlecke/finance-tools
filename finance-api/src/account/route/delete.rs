use std::sync::Arc;

use axum::{
	extract::{Path, State},
	response::IntoResponse,
};
use http::StatusCode;
use sqlx_d1::D1Connection;
use uuid::Uuid;

use crate::auth::Claims;

/// Delete an account.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		operation_id = "delete_account",
		delete,
		tag = "Account",
		path = "/api/v1/account/{id}",
		params(
			("id" = Uuid, Path, description = "Account ID")
		),
		responses(
			(status = 200, description = "Account deleted successfully"),
			(status = 401, description = "Unauthorized"),
			(status = 500, description = "Internal server error"),
		),
		security(
			("bearer_auth" = [])
		)
	)
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(db))]
pub async fn remove(
	State(db): State<Arc<D1Connection>>,
	user: Claims,
	Path(id): Path<Uuid>,
) -> Result<StatusCode, DeleteAccountError> {
	tracing::info!(?user, ?id, "Deleting account for user");

	sqlx_d1::query!(
		"UPDATE account SET deleted_at = datetime('now')
		WHERE id = ? AND project_id IN (SELECT project_id FROM project_access WHERE user_id = ?)",
		id.hyphenated().to_string(),
		user.user_id(),
	)
	.execute(db.as_ref())
	.await
	.map_err(DeleteAccountError::DatabaseError)?;

	Ok(StatusCode::OK)
}

#[derive(Debug, thiserror::Error)]
pub enum DeleteAccountError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),
}

impl IntoResponse for DeleteAccountError {
	fn into_response(self) -> axum::response::Response {
		match self {
			Self::DatabaseError(_) => (StatusCode::INTERNAL_SERVER_ERROR).into_response(),
		}
	}
}
