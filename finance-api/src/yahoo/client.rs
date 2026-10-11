use crate::yahoo::{
	error::YahooError,
	model::{ChartResponse, Quote},
};

const BASE_URL: &str = "https://query1.finance.yahoo.com/v8/finance/chart";

/// Client for Yahoo Finance's public (undocumented) chart API, used as a Finnhub
/// fallback for symbols outside Finnhub's free-tier coverage (e.g. non-US
/// exchanges like `CSPX.L`). No API key: this is the same endpoint the `yfinance`
/// Python package scrapes.
#[derive(Debug, Clone, Default)]
pub struct YahooClient;

impl YahooClient {
	pub fn new() -> Self {
		Self
	}

	/// Get the latest quote for a symbol, e.g. `AAPL` or `CSPX.L`.
	#[tracing::instrument(skip(self))]
	pub async fn quote(&self, symbol: &str) -> Result<Quote, YahooError> {
		let response = reqwest::Client::new()
			.get(format!("{BASE_URL}/{symbol}"))
			// Yahoo rejects requests without a browser-like User-Agent.
			.header(reqwest::header::USER_AGENT, "Mozilla/5.0")
			.query(&[("range", "1d"), ("interval", "1d")])
			.send()
			.await?;

		if !response.status().is_success() {
			return Err(YahooError::Api {
				status: response.status().as_u16(),
				body: response.text().await.unwrap_or_default(),
			});
		}

		let body: ChartResponse = response.json().await?;

		if let Some(error) = body.chart.error {
			return Err(YahooError::NotFound(error.description));
		}

		body.chart
			.result
			.and_then(|results| results.into_iter().next())
			.map(|result| result.meta.into())
			.ok_or_else(|| YahooError::NotFound(symbol.to_owned()))
	}
}
