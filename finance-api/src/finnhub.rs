pub mod client;
pub mod error;
pub mod model;

pub use client::FinnhubClient;
pub use error::FinnhubError;
pub use model::{QuoteResponse, SymbolMatch, SymbolSearchResponse};
