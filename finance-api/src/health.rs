use axum::{routing::get, Router};
use http::StatusCode;

pub fn health_check_router() -> Router {
	Router::new()
		.route("/readyz", get(ready))
		.route("/livez", get(liveness))
}

#[cfg_attr(
    feature = "openapi",
    utoipa::path(
        get,
        path = "/readyz",
        responses(
            (status = 200, description = "Readiness check passed")
        )
    )
)]
pub async fn ready() -> StatusCode {
	StatusCode::OK
}

#[cfg_attr(
    feature = "openapi",
    utoipa::path(
        get,
        path = "/livez",
        responses(
            (status = 200, description = "Liveness check passed")
        )
    )
)]
pub async fn liveness() -> StatusCode {
	StatusCode::OK
}
