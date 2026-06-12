use axum::Router;

use crate::{account::account_router, health::health_check_router, state::AppState};

pub fn build_router(state: AppState) -> Router {
	Router::new()
		.nest("/api/v1/account", account_router())
		.with_state(state)
		.merge(health_check_router())
}
