use std::sync::Arc;

use axum::extract::FromRef;
use derive_getters::Getters;
use duplicate::duplicate_item;
use sqlx_d1::D1Connection;
use worker::D1Database;

use crate::auth::{AuthConfig, JwkRepository};

#[derive(Debug, Clone, Getters)]
pub struct AppState {
	jwks_repository: Arc<JwkRepository>,
	db: Arc<D1Connection>,
}

impl AppState {
	pub async fn new(db: D1Database) -> Result<Self, reqwest::Error> {
		// TODO: Read config from environment.

		let conn = sqlx_d1::D1Connection::new(db);
		let db = Arc::new(conn);

		Ok(Self {
			jwks_repository: Arc::new(JwkRepository::new(AuthConfig::default()).await?),
			db,
		})
	}
}

#[duplicate_item(
    service              field;
    [ JwkRepository ]    [ jwks_repository ];
	[ D1Connection ]     [ db ];
)]
impl FromRef<AppState> for Arc<service> {
	fn from_ref(app_state: &AppState) -> Self {
		app_state.field.clone()
	}
}
