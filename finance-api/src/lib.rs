pub mod account;
pub mod auth;
pub mod health;
mod router;
pub mod state;

#[cfg(feature = "openapi")]
pub mod openapi;

use axum::response::IntoResponse;
use http::{header, StatusCode};
use tower_service::Service;
use tracing_subscriber::{fmt::time::UtcTime, layer::SubscriberExt, util::SubscriberInitExt};
use tracing_web::MakeConsoleWriter;
use worker::*;

use crate::{router::build_router, state::AppState};

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

#[event(fetch)]
async fn fetch(
	req: HttpRequest,
	env: Env,
	_ctx: Context,
) -> Result<axum::http::Response<axum::body::Body>> {
	if *req.method() == http::Method::OPTIONS {
		return Ok((
			StatusCode::OK,
			[
				(header::ACCESS_CONTROL_ALLOW_ORIGIN, "*"),
				(header::ACCESS_CONTROL_REQUEST_METHOD, "*"),
				(header::ACCESS_CONTROL_ALLOW_CREDENTIALS, "*"),
				(header::ACCESS_CONTROL_ALLOW_HEADERS, "*"),
			],
		)
			.into_response());
	}

	let db = env.d1("prod_d1_finance")?;

	let state = AppState::new(db, &env)
		.await
		.expect("to be able to create the state");

	Ok(build_router(state).call(req).await?)
}
