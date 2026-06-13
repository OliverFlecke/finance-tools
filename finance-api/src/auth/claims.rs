use std::collections::HashSet;

use axum_extra::{
	headers::{authorization::Bearer, Authorization},
	TypedHeader,
};
use chrono::{serde::ts_seconds, DateTime, Utc};
use http::StatusCode;
use jsonwebtoken::{decode, TokenData, Validation};
use serde::{Deserialize, Serialize};

use crate::auth::jwk::JwkValidator;
use crate::state::AppState;

use axum::{extract::FromRequestParts, http::request::Parts, RequestPartsExt};

/// Claims representing a user.
#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Claims {
	aud: Vec<String>,
	#[serde(with = "ts_seconds")]
	exp: DateTime<Utc>,
	#[serde(with = "ts_seconds")]
	iat: DateTime<Utc>,
	iss: String,
	sub: String,
	scope: String,
}

impl Claims {
	pub fn user_id(&self) -> &str {
		&self.sub
	}

	pub fn scopes(&self) -> HashSet<&str> {
		self.scope.split(' ').collect()
	}

	pub fn has_scope(&self, scope: &str) -> bool {
		self.scope.split(' ').any(|s| s == scope)
	}

	pub async fn decode(
		token: &str,
		jwks_repository: &dyn JwkValidator,
		validation: Validation,
	) -> Result<TokenData<Claims>, jsonwebtoken::errors::Error> {
		let jwk = jwks_repository.get_key().expect("to have a key");
		decode::<Claims>(token, &jwk.into(), &validation)
	}
}

/// Extract `Claims` from the current request.
///
/// If this cannot be done, the request is rejected with an `UNAUTHORIZED`
/// status code.
impl FromRequestParts<AppState> for Claims {
	type Rejection = StatusCode;

	#[tracing::instrument(skip(state, parts), level = "info")]
	async fn from_request_parts(
		parts: &mut Parts,
		state: &AppState,
	) -> Result<Self, Self::Rejection> {
		tracing::debug!("Extracting claims from request");
		let TypedHeader(Authorization(bearer)) = parts
			.extract::<TypedHeader<Authorization<Bearer>>>()
			.await
			.map_err(|_| StatusCode::UNAUTHORIZED)?;

		let jwks_repository = state.jwks_repository().as_ref();

		tracing::debug!("Decoding token");
		Claims::decode(
			bearer.token(),
			jwks_repository,
			jwks_repository.get_validation(),
		)
		.await
		.map_err(|e| {
			tracing::debug!(?e, "Failed to decode token");
			StatusCode::UNAUTHORIZED
		})
		.map(|t| t.claims)
	}
}

#[cfg(test)]
mod test {
	use crate::auth::config::AuthConfig;

	use super::*;

	#[tokio::test]
	async fn decode_token() {
		let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBVTVplWW5mWGYxMFlHcFUtVVZTUyJ9.eyJpc3MiOiJodHRwczovL29saXZlcmZsZWNrZS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ2l0aHVifDcyMjc2NTgiLCJhdWQiOlsiaHR0cHM6Ly9maW5hbmNlLm9saXZlcmZsZWNrZS5tZS8iLCJodHRwczovL29saXZlcmZsZWNrZS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc2NTUyNjU0LCJleHAiOjE2NzY2MzkwNTQsImF6cCI6InZCTXhsSFh3Ym5FQ0RyWUtZaUt2c1dxUnhhSjAyVFdmIiwic2NvcGUiOiJvcGVuaWQgYWNjb3VudDpyZWFkIn0.L3FCpDCtoO4Cf5DBE1q0CG1_K3gS--736Zot1Ypg9V-cEm59aCC6nMtEHWcQsLiH6VbKKm3snz5lUpIJAIflFPMvCxaIFPGO9kvRQjJ0-1YRRyuqhOFQAbhEVdCZZ4JPFfbCK2UhGifjfRYl0uKHW0QUU_0pluMRy62yP5fCvGJx1ryXNiuzqUZFraeDacfAfNascAghA9LqQsWOXsyXmxEaLoiJuu-dT3YE_5HwJRNYOf8H4BQZSf17L1W0TbAxsi_Skn5-h54tglsCno9JCTCfonJ8K4_QzjxJTXcdetWja41SeEHl3MmH-FWeg7gvM7ErsEZ7pz3GDxrgrmmeuA";

		let auth_config = AuthConfig::default();
		let jwks_repository = JwkRepository::new(auth_config.clone()).await.unwrap();
		let mut validation: Validation = jwks_repository.get_auth_config().into();
		validation.validate_exp = false; // This allow us to use an expired token to validate the general token flow works.
		let decoded_token = Claims::decode(token, &jwks_repository, validation)
			.await
			.unwrap();

		assert_eq!(decoded_token.claims.iss.as_str(), auth_config.issuer());
		assert_eq!(decoded_token.claims.sub.as_str(), "github|7227658");
	}

	#[tokio::test]
	async fn decode_expired_token() {
		let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBVTVplWW5mWGYxMFlHcFUtVVZTUyJ9.eyJpc3MiOiJodHRwczovL29saXZlcmZsZWNrZS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ2l0aHVifDcyMjc2NTgiLCJhdWQiOlsiaHR0cHM6Ly9maW5hbmNlLm9saXZlcmZsZWNrZS5tZS8iLCJodHRwczovL29saXZlcmZsZWNrZS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc2NTUyNjU0LCJleHAiOjE2NzY2MzkwNTQsImF6cCI6InZCTXhsSFh3Ym5FQ0RyWUtZaUt2c1dxUnhhSjAyVFdmIiwic2NvcGUiOiJvcGVuaWQgYWNjb3VudDpyZWFkIn0.L3FCpDCtoO4Cf5DBE1q0CG1_K3gS--736Zot1Ypg9V-cEm59aCC6nMtEHWcQsLiH6VbKKm3snz5lUpIJAIflFPMvCxaIFPGO9kvRQjJ0-1YRRyuqhOFQAbhEVdCZZ4JPFfbCK2UhGifjfRYl0uKHW0QUU_0pluMRy62yP5fCvGJx1ryXNiuzqUZFraeDacfAfNascAghA9LqQsWOXsyXmxEaLoiJuu-dT3YE_5HwJRNYOf8H4BQZSf17L1W0TbAxsi_Skn5-h54tglsCno9JCTCfonJ8K4_QzjxJTXcdetWja41SeEHl3MmH-FWeg7gvM7ErsEZ7pz3GDxrgrmmeuA";

		let auth_config = AuthConfig::default();
		let jwks_repository = JwkRepository::new(auth_config).await.unwrap();
		let validation: Validation = jwks_repository.get_auth_config().into();

		let decoded_token = Claims::decode(token, &jwks_repository, validation).await;
		assert_eq!(
			decoded_token.unwrap_err(),
			jsonwebtoken::errors::Error::from(jsonwebtoken::errors::ErrorKind::ExpiredSignature)
		);
	}

	#[test]
	fn check_claims_has_scope() {
		let mut claims = Claims::default();
		claims.scope = "account:read account:create account:delete".to_string();

		assert!(claims.has_scope("account:read"));
	}

	#[test]
	fn check_claims_has_scope_fails() {
		let mut claims = Claims::default();
		claims.scope = "account:read account:create account:delete".to_string();

		assert!(!claims.has_scope("some_scope"));
	}
}
