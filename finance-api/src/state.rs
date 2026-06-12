use std::sync::Arc;

use axum::extract::FromRef;
use derive_getters::Getters;
use duplicate::duplicate_item;

use crate::auth::{AuthConfig, JwkRepository};

#[derive(Debug, Clone, Getters)]
pub struct AppState {
	jwks_repository: Arc<JwkRepository>,
}

impl AppState {
	pub async fn new() -> Result<Self, reqwest::Error> {
		// TODO: Read config from environment.

		Ok(Self {
			jwks_repository: Arc::new(JwkRepository::new(AuthConfig::default()).await?),
		})
	}
}

#[duplicate_item(
    service              field;
    [ JwkRepository ]    [ jwks_repository ];
)]
impl FromRef<AppState> for Arc<service> {
	fn from_ref(app_state: &AppState) -> Self {
		app_state.field.clone()
	}
}
