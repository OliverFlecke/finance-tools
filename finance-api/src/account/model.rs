#[cfg_attr(feature = "openapi", derive(utoipa::ToSchema))]
#[derive(Debug, serde::Serialize, serde::Deserialize, strum::FromRepr)]
#[repr(u8)]
pub enum AccountKind {
	Cash,
	Investment,
}
