/// Response from the Finnhub symbol search endpoint.
/// See <https://finnhub.io/docs/api/symbol-search>.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct SymbolSearchResponse {
	pub count: u32,
	pub result: Vec<SymbolMatch>,
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
