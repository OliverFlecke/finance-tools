/// Kind of a [`crate::stock::route::event::get::StockEvent`].
#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(
	Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize, strum::FromRepr,
)]
#[repr(u8)]
pub enum StockEventKind {
	Buy,
	Sell,
}
