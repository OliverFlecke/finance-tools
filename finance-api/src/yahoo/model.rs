/// Raw response from Yahoo Finance's chart endpoint
/// (`https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`), trimmed to the
/// fields we use.
#[derive(Debug, Clone, serde::Deserialize)]
pub(super) struct ChartResponse {
	pub chart: Chart,
}

#[derive(Debug, Clone, serde::Deserialize)]
pub(super) struct Chart {
	pub result: Option<Vec<ChartResult>>,
	pub error: Option<ChartError>,
}

#[derive(Debug, Clone, serde::Deserialize)]
pub(super) struct ChartError {
	pub description: String,
}

#[derive(Debug, Clone, serde::Deserialize)]
pub(super) struct ChartResult {
	pub meta: ChartMeta,
}

#[derive(Debug, Clone, serde::Deserialize)]
pub(super) struct ChartMeta {
	#[serde(rename = "regularMarketPrice")]
	pub regular_market_price: f64,
	#[serde(rename = "chartPreviousClose")]
	pub previous_close: f64,
}

/// Latest quote for a symbol.
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Quote {
	/// Current price.
	pub price: f64,
	/// Previous close price.
	pub previous_close: f64,
}

impl From<ChartMeta> for Quote {
	fn from(meta: ChartMeta) -> Self {
		Self {
			price: meta.regular_market_price,
			previous_close: meta.previous_close,
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;

	#[test]
	fn parses_successful_response() {
		let json = r#"{"chart":{"result":[{"meta":{
			"regularMarketPrice":841.26,"chartPreviousClose":838.64
		}}],"error":null}}"#;

		let body: ChartResponse = serde_json::from_str(json).unwrap();
		let quote: Quote = body
			.chart
			.result
			.unwrap()
			.into_iter()
			.next()
			.unwrap()
			.meta
			.into();

		assert_eq!(quote.price, 841.26);
		assert_eq!(quote.previous_close, 838.64);
	}

	#[test]
	fn parses_not_found_response() {
		let json = r#"{"chart":{"result":null,"error":{"code":"Not Found","description":"No data found, symbol may be delisted"}}}"#;

		let body: ChartResponse = serde_json::from_str(json).unwrap();

		assert!(body.chart.result.is_none());
		assert_eq!(
			body.chart.error.unwrap().description,
			"No data found, symbol may be delisted"
		);
	}
}
