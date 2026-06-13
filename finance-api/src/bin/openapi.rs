#[cfg(feature = "openapi")]
fn main() {
	println!("{}", finance_api::openapi::generate());
}

#[cfg(not(feature = "openapi"))]
fn main() {
	eprintln!("error: openapi feature is required. Run with --features openapi");
	std::process::exit(1);
}
