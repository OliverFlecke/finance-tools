use axum::Router;

use crate::health::health_check_router;

pub fn build_router() -> Router {
	Router::new().nest("/", health_check_router())
}
