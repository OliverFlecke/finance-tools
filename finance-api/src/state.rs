use std::sync::Arc;

use axum::extract::FromRef;
use derive_getters::Getters;
use duplicate::duplicate_item;
use sqlx_d1::D1Connection;
use worker::{D1Database, Env};

use crate::{
	auth::{AuthConfig, Jwk, JwkRepository, JwkValidator, MockJwkRepository},
	finnhub::FinnhubClient,
	yahoo::YahooClient,
};

#[derive(Debug, Clone, Getters)]
pub struct AppState {
	jwks_repository: Arc<dyn JwkValidator>,
	db: Arc<D1Connection>,
	finnhub_client: Arc<FinnhubClient>,
	yahoo_client: Arc<YahooClient>,
}

impl AppState {
	pub async fn new(db: D1Database, env: &Env) -> Result<Self, Box<dyn std::fmt::Debug>> {
		let conn = sqlx_d1::D1Connection::new(db);
		let db = Arc::new(conn);

		let finnhub_api_key = env
			.secret("FINNHUB_API_KEY")
			.expect("secret 'FINNHUB_API_KEY' to be set")
			.to_string();

		Ok(Self {
			jwks_repository: create_jwk_validator(env).await,
			db,
			finnhub_client: Arc::new(FinnhubClient::new(finnhub_api_key)),
			yahoo_client: Arc::new(YahooClient::new()),
		})
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
	[ FinnhubClient ]    [ finnhub_client ];
	[ YahooClient ]      [ yahoo_client ];
)]
impl FromRef<AppState> for Arc<service> {
	fn from_ref(app_state: &AppState) -> Self {
		app_state.field.clone()
	}
}

async fn create_jwk_validator(env: &Env) -> Arc<dyn JwkValidator + 'static> {
	if let Ok(jwk_json) = env.var("TEST_JWK") {
		let jwk: Jwk =
			serde_json::from_str(&jwk_json.to_string()).expect("TEST_JWK to be valid JSON");

		Arc::new(MockJwkRepository::new(jwk))
	} else {
		Arc::new(
			JwkRepository::new(AuthConfig {
				issuer: env
					.var("AUTH_ISSUER")
					.expect("variable 'AUTH_ISSUER' to be set")
					.to_string(),
				audience: env
					.var("AUTH_AUDIENCE")
					.expect("variable 'AUTH_AUDIENCE' to be set")
					.to_string(),
			})
			.await
			.expect("to be able to create the JWK repository"),
		)
	}
}
