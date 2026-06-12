pub mod auth;
mod router;
pub mod state;

use tower_service::Service;
use worker::*;

use crate::router::build_router;

#[event(fetch)]
async fn fetch(
	req: HttpRequest,
	_env: Env,
	_ctx: Context,
) -> Result<axum::http::Response<axum::body::Body>> {
	Ok(build_router().call(req).await?)
}
