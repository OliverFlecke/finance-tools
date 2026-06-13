use derive_getters::Getters;
use jsonwebtoken::{DecodingKey, Validation};
use serde::Deserialize;

static JWKS_ENDPOINT: &str = ".well-known/jwks.json";

/// Ability to validate a JWT.
pub trait JwkValidator: std::fmt::Debug + Send + Sync {
	fn get_key(&self) -> Option<Jwk>;
	fn get_validation(&self) -> Validation;
}

#[derive(Debug, Clone, Deserialize, Getters, PartialEq, Eq)]
pub struct Jwk {
	n: String,
	e: String,
}

impl From<Jwk> for DecodingKey {
	fn from(value: Jwk) -> Self {
		DecodingKey::from_rsa_components(value.n(), value.e()).unwrap()
	}
}

/// Response containing a list of JWKs.
#[derive(Debug, Deserialize, Getters)]
pub struct JwksResponse {
	pub keys: Vec<Jwk>,
}

impl JwksResponse {
	/// Fetch JWKS keys from the and endpoint
	pub async fn fetch(auth_server: &str) -> Result<JwksResponse, reqwest::Error> {
		reqwest::get(format!("{auth_server}{JWKS_ENDPOINT}"))
			.await?
			.json::<JwksResponse>()
			.await
	}
}
