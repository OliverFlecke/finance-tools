use std::sync::Arc;

use axum::{extract::State, response::IntoResponse, Json};
use http::StatusCode;
use sqlx_d1::D1Connection;
use uuid::Uuid;

use crate::{account::model::AccountKind, auth::Claims};

/// Create a new account.
#[cfg_attr(
	feature = "openapi",
	utoipa::path(
		post,
		tag = "Account",
		path = "/api/v1/account",
		responses(
			(status = 200, description = "Account created successfully", body = CreateAccountResponse),
			(status = 401, description = "Unauthorized"),
			(status = 500, description = "Internal server error"),
		),
		request_body = CreateAccountRequest,
		security(
			("bearer_auth" = [])
		)
	)
)]
#[axum::debug_handler(state = crate::state::AppState)]
#[tracing::instrument(skip(db))]
pub async fn add_account(
	State(db): State<Arc<D1Connection>>,
	user: Claims,
	Json(request): Json<CreateAccountRequest>,
) -> Result<Json<CreateAccountResponse>, CreateAccountError> {
	let user_id = user.user_id();
	tracing::info!(?user_id, ?request, "Creating account");

	let account_id = Uuid::now_v7();
	let _ = sqlx_d1::query!(
		r#"
		WITH project AS (
			SELECT project_id as id FROM project_access
			WHERE user_id = ? ORDER BY project_id LIMIT 1
		)
		INSERT INTO account (project_id, id, name, currency, type, sort_key)
		SELECT
			p.id, ?, ?, ?, ?
			, (SELECT MAX(sort_key) + 1 FROM account a WHERE a.project_id = p.id)
		FROM project p
		"#,
		user_id,
		account_id,
		request.name,
		request.currency,
		request.kind as u8
	)
	.fetch_one(db.as_ref())
	.await
	.map_err(CreateAccountError::DatabaseError)?;

	Ok(Json(CreateAccountResponse { id: account_id }))
}

/// Request for creating a new account.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct CreateAccountRequest {
	/// Name of the account.
	name: String,

	/// Currency of the account. ISO 4217 currency code.
	currency: String,

	kind: AccountKind,
}

/// Response for a successful account creation.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct CreateAccountResponse {
	/// Unique identifier for the created account.
	id: Uuid,
}

#[derive(Debug, thiserror::Error)]
pub enum CreateAccountError {
	#[error("Database error: {0}")]
	DatabaseError(#[from] sqlx_d1::Error),
}

impl IntoResponse for CreateAccountError {
	fn into_response(self) -> axum::response::Response {
		match self {
			_ => (StatusCode::INTERNAL_SERVER_ERROR).into_response(),
		}
	}
}
