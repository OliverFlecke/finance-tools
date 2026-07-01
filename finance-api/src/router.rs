use axum::Router;
use http::HeaderValue;
use tower_http::cors::CorsLayer;

use crate::{account::account_router, health::health_check_router, state::AppState};

pub fn build_router(state: AppState) -> Router {
	// TODO: CORS should not be necessary when running in production.
	let cors = CorsLayer::very_permissive().allow_origin([
		HeaderValue::from_static("https://localhost:3000"),
		HeaderValue::from_static("https://finance.oliverflecke.me"),
		HeaderValue::from_static("https://finance-tools.oliverfl.workers.dev"),
	]);

	Router::new()
		.nest("/api/v1/account", account_router())
		.with_state(state)
		.merge(health_check_router())
		.layer(cors)
}
