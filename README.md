# Finance Tools

[![Frontend](https://github.com/OliverFlecke/finance-tools/actions/workflows/frontend.yml/badge.svg)](https://github.com/OliverFlecke/finance-tools/actions/workflows/frontend.yml)
[![Backend](https://github.com/OliverFlecke/finance-tools/actions/workflows/backend.yml/badge.svg)](https://github.com/OliverFlecke/finance-tools/actions/workflows/backend.yml)

Dashboard for tracking personal finances — accounts, stock lots, and compound interest calculations.

Deployed at [finance.oliverflecke.me](https://finance.oliverflecke.me).

## Structure

| Package | Description | Stack |
|---|---|---|
| [`frontend/`](frontend/) | Next.js SPA with account/stock tracking, calculators | React 19, Next.js (static export), Tailwind 3 |
| [`finance-api/`](finance-api/) | REST API for account CRUD, entries, auth | Rust (axum), WASM, Cloudflare Workers + D1 |

## Prerequisites

Node 26, pnpm 11.10, wrangler 4.x — managed via [mise](https://mise.jdx.dev):

```sh
mise install
```

## Development

Each package has its own README with setup and development instructions:

```sh
cd frontend/    # pnpm dev → next dev + tailwind (concurrently)
cd finance-api/ # wrangler dev → local Workers server
```
