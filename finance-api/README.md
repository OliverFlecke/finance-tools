# Finance API

Backend API to track financial accounts across services.

The project is written in Rust using [axum](https://github.com/tokio-rs/axum) and deployed on [Cloudflare Worker](https://github.com/cloudflare/workers-rs).

## Development

Install required tooling — see `mise.toml` in the root of the project.

Copy `.dev.vars.example` to `.dev.vars` and fill in a [Finnhub](https://finnhub.io) API key:

```sh
cp .dev.vars.example .dev.vars
```

```sh
wrangler dev
```

### Secrets

Secrets (like `FINNHUB_API_KEY`) are not stored in `wrangler.toml`. Locally they're
read from `.dev.vars` (gitignored); when deployed, set them with:

```sh
wrangler secret put FINNHUB_API_KEY
```
