use jsonwebtoken::Validation;

use super::jwk::{Jwk, JwkValidator};

#[derive(Debug, Clone)]
pub struct MockJwkRepository {
	key: Jwk,
	validation: Validation,
}

impl MockJwkRepository {
	pub fn new(key: Jwk) -> Self {
		let mut validation = jsonwebtoken::Validation::new(jsonwebtoken::Algorithm::RS256);
		validation.set_issuer(&["https://test.issuer/"]);
		validation.set_audience(&["https://test.audience/"]);

		Self { key, validation }
	}
}

impl JwkValidator for MockJwkRepository {
	fn get_key(&self) -> Option<Jwk> {
		Some(self.key.clone())
	}

	fn get_validation(&self) -> Validation {
		self.validation.clone()
	}
}
