use axum::Router;
use http::{HeaderValue, request::Parts as RequestParts};
use tower_http::cors::{AllowOrigin, CorsLayer};

use crate::{account::account_router, health::health_check_router, state::AppState};

pub fn build_router(state: AppState) -> Router {
	// TODO: CORS should not be necessary when running in production.
	// Pin the production origins explicitly, but allow any localhost origin so
	// local dev works regardless of which port/scheme `next dev` happens to pick.
	let cors = CorsLayer::very_permissive().allow_origin(AllowOrigin::predicate(
		|origin: &HeaderValue, _: &RequestParts| {
			let Ok(origin) = origin.to_str() else {
				return false;
			};
			matches!(
				origin,
				"https://finance.oliverflecke.me" | "https://finance-tools.oliverfl.workers.dev"
			) || origin.starts_with("http://localhost:")
				|| origin.starts_with("https://localhost:")
		},
	));

	Router::new()
		.nest("/api/v1/account", account_router())
		.with_state(state)
		.merge(health_check_router())
		.layer(cors)
}
