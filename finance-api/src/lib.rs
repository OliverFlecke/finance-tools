pub mod account;
pub mod auth;
pub mod health;
mod router;
pub mod state;

#[cfg(feature = "openapi")]
pub mod openapi;

#[cfg(not(target_arch = "wasm32"))]
pub use router::build_router;

#[cfg(target_arch = "wasm32")]
use tower_service::Service;
#[cfg(target_arch = "wasm32")]
use tracing_subscriber::{fmt::time::UtcTime, layer::SubscriberExt, util::SubscriberInitExt};
#[cfg(target_arch = "wasm32")]
use tracing_web::MakeConsoleWriter;
#[cfg(target_arch = "wasm32")]
use worker::*;

#[cfg(target_arch = "wasm32")]
use crate::{router::build_router, state::AppState};

#[cfg(target_arch = "wasm32")]
#[event(start)]
fn start() {
	let fmt_layer = tracing_subscriber::fmt::layer()
		.json()
		.with_ansi(false) // Only partially supported across JavaScript runtimes
		.with_timer(UtcTime::rfc_3339()) // std::time is not available in browsers
		.with_writer(MakeConsoleWriter); // write events to the console

	tracing_subscriber::registry()
		.with(fmt_layer)
		// FIXME: the performance layer throws errors during tests. Disable for now.
		// .with(
		// 	tracing_web::performance_layer()
		// 		.with_details_from_fields(tracing_subscriber::fmt::format::Pretty::default()),
		// )
		.init();
}

#[cfg(target_arch = "wasm32")]
#[event(fetch)]
async fn fetch(
	req: HttpRequest,
	env: Env,
	_ctx: Context,
) -> Result<axum::http::Response<axum::body::Body>> {
	let db = env.d1("prod_d1_finance")?;

	let state = AppState::new(db, &env)
		.await
		.expect("to be able to create the state");

	Ok(build_router(state).call(req).await?)
}
