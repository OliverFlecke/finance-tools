use std::sync::Arc;

use axum::extract::FromRef;
use derive_getters::Getters;
use duplicate::duplicate_item;
use sqlx_d1::D1Connection;
use worker::{D1Database, Env};

use crate::auth::{AuthConfig, Jwk, JwkRepository, JwkValidator, MockJwkRepository};

#[derive(Debug, Clone, Getters)]
pub struct AppState {
	jwks_repository: Arc<dyn JwkValidator>,
	db: Arc<D1Connection>,
}

impl AppState {
	pub async fn new(db: D1Database, env: &Env) -> Result<Self, Box<dyn std::fmt::Debug>> {
		let conn = sqlx_d1::D1Connection::new(db);
		let db = Arc::new(conn);

		Ok(Self {
			jwks_repository: create_jwk_validator(env).await,
			db,
		})
	}
}

async fn create_jwk_validator(env: &Env) -> Arc<dyn JwkValidator + 'static> {
	if let Ok(jwk_json) = env.var("TEST_JWK") {
		let jwk: Jwk =
			serde_json::from_str(&jwk_json.to_string()).expect("TEST_JWK to be valid JSON");

		Arc::new(MockJwkRepository::new(jwk))
	} else {
		Arc::new(
			JwkRepository::new(AuthConfig::default())
				.await
				.expect("to be able to create the JWK repository"),
		)
	}
}

impl FromRef<AppState> for Arc<dyn JwkValidator> {
	fn from_ref(app_state: &AppState) -> Self {
		app_state.jwks_repository.clone()
	}
}

#[duplicate_item(
    service              field;
	[ D1Connection ]     [ db ];
)]
impl FromRef<AppState> for Arc<service> {
	fn from_ref(app_state: &AppState) -> Self {
		app_state.field.clone()
	}
}
