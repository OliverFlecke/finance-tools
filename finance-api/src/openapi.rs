use utoipa::{
	openapi::security::{HttpAuthScheme, HttpBuilder, SecurityRequirement, SecurityScheme},
	Modify, OpenApi,
};

#[derive(OpenApi)]
#[openapi(
    paths(
        crate::account::route::get_accounts::accounts,
        crate::health::ready,
        crate::health::liveness,
    ),
    components(
        schemas(
            crate::account::route::get_accounts::AccountResponse,
            crate::account::route::get_accounts::Account,
            crate::account::route::get_accounts::AccountKind,
            crate::account::route::get_accounts::AccountEntry,
        )
    ),
    info(
        title = "Finance API",
        version = "0.1.0",
        description = "API for tracking personal finances",
    ),
    modifiers(&SecurityAddon)
)]
pub struct ApiDoc;

struct SecurityAddon;

impl Modify for SecurityAddon {
	fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
		use utoipa::openapi::Components;

		let components = openapi.components.get_or_insert_with(Components::new);
		components.add_security_scheme(
			"bearer",
			SecurityScheme::Http(
				HttpBuilder::new()
					.scheme(HttpAuthScheme::Bearer)
					.bearer_format("JWT")
					.description(Some("JWT Bearer token for authorization"))
					.build(),
			),
		);

		openapi.security = Some(vec![SecurityRequirement::new(
			"bearer",
			Vec::<String>::new(),
		)]);
	}
}

pub fn generate() -> String {
	ApiDoc::openapi().to_pretty_json().unwrap()
}
