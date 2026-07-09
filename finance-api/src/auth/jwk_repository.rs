use jsonwebtoken::Validation;

use crate::auth::{jwk::JwksResponse, AuthConfig, Jwk, JwkValidator};

/// Represents a repository for storing and managing JWKs locally.
/// This includes fetching them from a remote authority and updating them regularly.
#[derive(Debug, Clone)]
pub struct JwkRepository {
	auth_config: AuthConfig,
	keys: Vec<Jwk>,
}

impl From<AuthConfig> for JwkRepository {
	fn from(auth_config: AuthConfig) -> Self {
		Self {
			auth_config,
			keys: vec![],
		}
	}
}

impl JwkRepository {
	pub async fn new(auth_config: AuthConfig) -> Result<Self, reqwest::Error> {
		let jwks = JwksResponse::fetch(auth_config.issuer()).await?;

		Ok(Self {
			auth_config,
			keys: jwks.keys,
		})
	}

	/// Get the configuration of the authority that JWKs are fetched from.
	pub fn get_auth_config(&self) -> &AuthConfig {
		&self.auth_config
	}

	/// Get the current JWK to use.
	pub fn get_key(&self) -> Option<Jwk> {
		self.keys.first().cloned()
	}

	/// Refresh JWKs and returns the current one.
	pub async fn get_key_with_refresh(&mut self) -> Result<Jwk, reqwest::Error> {
		// TODO: Should be update at a certain frequency.
		if self.keys.is_empty() {
			self.update_keys().await?;
		}

		Ok(self.get_key().expect("a key to have been fetched"))
	}

	/// Updates the internal, local storage of the JWKs.
	async fn update_keys(&mut self) -> Result<(), reqwest::Error> {
		tracing::trace!("Fetching jwk from identity host");
		self.keys = JwksResponse::fetch(self.auth_config.issuer()).await?.keys;

		Ok(())
	}
}

impl JwkValidator for JwkRepository {
	fn get_key(&self) -> Option<Jwk> {
		self.keys.first().cloned()
	}

	fn get_validation(&self) -> Validation {
		self.get_auth_config().into()
	}
}

#[cfg(test)]
mod test {
	use crate::auth::config::AuthConfig;

	use super::*;

	#[tokio::test]
	async fn repository_update_keys() {
		let mut repository = JwkRepository::from(AuthConfig::default());

		repository.update_keys().await.expect("update to work");

		let jwk = repository.get_key().expect("key to be there");
		assert_eq!(jwk.e(), "AQAB");
		assert_ne!(jwk.n(), ""); // Don't want to test the exact value of the key here, so it's enough to just verify that its not empty.
	}

	#[tokio::test]
	async fn repository_fetch_on_create() {
		let repository = JwkRepository::new(AuthConfig::default())
			.await
			.expect("to be able to create the repository");

		assert_ne!(repository.get_key(), None);
	}
}
