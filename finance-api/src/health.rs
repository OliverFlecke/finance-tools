use axum::{routing::get, Router};
use http::StatusCode;

pub fn health_check_router() -> Router {
	Router::new()
		.route("/readyz", get(ready))
		.route("/livez", get(liveness))
}

async fn ready() -> StatusCode {
	StatusCode::OK
}

async fn liveness() -> StatusCode {
	StatusCode::OK
}
