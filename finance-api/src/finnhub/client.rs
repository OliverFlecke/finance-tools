use crate::finnhub::{
	error::FinnhubError,
	model::{QuoteResponse, SymbolSearchResponse},
};

const BASE_URL: &str = "https://finnhub.io/api/v1";

/// Client for the Finnhub (<https://finnhub.io>) stock market data API.
///
/// Holds the API key used to authenticate every request. Add new endpoints
/// here as methods, following the same request/error pattern as
/// [`FinnhubClient::symbol_search`].
#[derive(Clone)]
pub struct FinnhubClient {
	api_key: String,
}

impl std::fmt::Debug for FinnhubClient {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		f.debug_struct("FinnhubClient").finish_non_exhaustive()
	}
}

impl FinnhubClient {
	pub fn new(api_key: String) -> Self {
		Self { api_key }
	}

	/// Search for symbols matching the given query.
	/// See <https://finnhub.io/docs/api/symbol-search>.
	#[tracing::instrument(skip(self))]
	pub async fn symbol_search(&self, query: &str) -> Result<SymbolSearchResponse, FinnhubError> {
		let response = reqwest::Client::new()
			.get(format!("{BASE_URL}/search"))
			.query(&[("q", query), ("token", self.api_key.as_str())])
			.send()
			.await?;

		if !response.status().is_success() {
			return Err(FinnhubError::Api {
				status: response.status().as_u16(),
				body: response.text().await.unwrap_or_default(),
			});
		}

		Ok(response.json().await?)
	}

	/// Get the latest quote for a symbol.
	/// See <https://finnhub.io/docs/api/quote>.
	#[tracing::instrument(skip(self))]
	pub async fn quote(&self, symbol: &str) -> Result<QuoteResponse, FinnhubError> {
		let response = reqwest::Client::new()
			.get(format!("{BASE_URL}/quote"))
			.query(&[("symbol", symbol), ("token", self.api_key.as_str())])
			.send()
			.await?;

		if !response.status().is_success() {
			return Err(FinnhubError::Api {
				status: response.status().as_u16(),
				body: response.text().await.unwrap_or_default(),
			});
		}

		Ok(response.json().await?)
	}
}
