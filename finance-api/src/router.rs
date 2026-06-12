use axum::{http::StatusCode, routing::get, Router};

pub fn build_router() -> Router {
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
