#[derive(Debug, thiserror::Error)]
pub enum FinnhubError {
	#[error("Request to Finnhub failed: {0}")]
	Request(#[from] reqwest::Error),

	#[error("Finnhub returned error status {status}: {body}")]
	Api { status: u16, body: String },
}
