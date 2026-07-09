use derive_getters::Getters;
use jsonwebtoken::{Algorithm, Validation};

#[derive(Debug, Getters, Clone)]
pub struct AuthConfig {
	pub issuer: String,
	pub audience: String,
}

impl AuthConfig {
	pub fn from_env() -> Self {
		Self {
			issuer: std::env::var("ISSUER").expect("variable 'ISSUER' to be set"),
			audience: std::env::var("AUDIENCE").expect("variable 'AUDIENCE' to be set"),
		}
	}
}

impl From<&AuthConfig> for Validation {
	fn from(value: &AuthConfig) -> Self {
		let mut validation = Validation::new(Algorithm::RS256);
		validation.set_issuer(&[value.issuer()]);
		validation.set_audience(&[value.audience()]);

		validation
	}
}
