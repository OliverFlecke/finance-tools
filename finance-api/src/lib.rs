pub mod account;
pub mod auth;
pub mod health;
mod router;
pub mod state;

use tower_service::Service;
use tracing_subscriber::{
	fmt::{format::Pretty, time::UtcTime},
	layer::SubscriberExt,
	util::SubscriberInitExt,
};
use tracing_web::{performance_layer, MakeConsoleWriter};
use worker::*;

use crate::{router::build_router, state::AppState};

#[event(start)]
fn start() {
	let fmt_layer = tracing_subscriber::fmt::layer()
		.json()
		.with_ansi(false) // Only partially supported across JavaScript runtimes
		.with_timer(UtcTime::rfc_3339()) // std::time is not available in browsers
		.with_writer(MakeConsoleWriter); // write events to the console
								   //
	let perf_layer = performance_layer().with_details_from_fields(Pretty::default());
	tracing_subscriber::registry()
		.with(fmt_layer)
		.with(perf_layer)
		.init();
}

#[event(fetch)]
async fn fetch(
	req: HttpRequest,
	_env: Env,
	_ctx: Context,
) -> Result<axum::http::Response<axum::body::Body>> {
	let state = AppState::new()
		.await
		.expect("to be able to create the state");

	Ok(build_router(state).call(req).await?)
}
