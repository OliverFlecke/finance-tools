#[derive(Debug, thiserror::Error)]
pub enum YahooError {
	#[error("Request to Yahoo Finance failed: {0}")]
	Request(#[from] reqwest::Error),

	#[error("Yahoo Finance returned error status {status}: {body}")]
	Api { status: u16, body: String },

	#[error("Yahoo Finance returned no quote for the symbol: {0}")]
	NotFound(String),
}
