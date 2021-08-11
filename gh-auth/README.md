# Small NodeJS server for getting around Github authentication CORS

This repository contains a small NodeJS express application, which allows authenticating users with Github's OAuth flow in a Single-Page Application.
A pure browser-only flow is not yet supported for Github OAuth apps, see [this issue](https://github.com/isaacs/github/issues/330) for more details.

## Development

To run the project locally, first install its dependencies with `yarn install`, then run with

```sh
yarn start
```

## Environment variables

Because the OAuth flow requires a `client_secret` for authentication, which we do not want to include in source control, these are provided in a `.env` file.
This file has the following format:

```sh
CLIENT_ID=<client id from Github>
CLIENT_SECRET=<client secret from Github>
```
