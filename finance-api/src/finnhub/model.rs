/// Response from the Finnhub symbol search endpoint.
/// See <https://finnhub.io/docs/api/symbol-search>.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct SymbolSearchResponse {
	pub count: u32,
	pub result: Vec<SymbolMatch>,
}

/// Response from the Finnhub quote endpoint.
/// See <https://finnhub.io/docs/api/quote>.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct QuoteResponse {
	/// Current price.
	pub c: f64,
	/// Previous close price.
	pub pc: f64,
}

#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct SymbolMatch {
	pub description: String,
	#[serde(rename = "displaySymbol")]
	pub display_symbol: String,
	pub symbol: String,
	#[serde(rename = "type")]
	pub kind: String,
}
