# Finance tools

Website to help perform different finance calculations.

## Development

**tl;dr**: `yarn run dev`

This project is build with ReactJS and is using Tailwindcss for styling.

First install dependencies with `yarn install`.
The website can then be run locally with `yarn start`.
To generate the required stylesheets run `yarn run css`.
Tailwindcss is running in JIT mode, see [tailwindcss.com](https://tailwindcss.com/) for documentation.

Both the build of JS and CSS along with serving the website can be run concurrently with `yarn run dev`.

### Running with HTTPS

In order to be able to authenticate against the API, the app MUST be run over HTTPS.
This can be done using the custom `server.js`, which uses a self-signed certificate for your localhost.
Note that the custom server is only used for development and not for production, as it is not required when in production where SSL termination is offloaded.

To generate the required key and certificate use:

```sh
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

If using Chrome or any other Chromium based browser, you can turn off the certificate warning using the `chrome://flags/#allow-insecure-localhost` flag.

## Build and deploy

The build is generating a static site, with statically generated HTML from React using [react-snap](https://www.npmjs.com/package/react-snap).
The build script can be executed with `yarn build`, which will output everything to the `build` directory.

### Deploy

The site can be build to be served as static assets.
This can be done by using the `deploy` command, which will build the site and push the files to the `gh-page` branch, which can then be cloned and served from anywhere.

```sh
yarn run deploy
```

## Features

- [x] Ability to authenticate user (currently only possible with a Github account)
- Account tracker
  - [x] Add new money accounts with name and type
  - [x] Add date entries with amounts in each account
  - [x] Persist data to cloud
  - [ ] Visualization of distribution between different account types
  - [ ] Visualization of changes to account over time
- Stock tracker
  - [x] Mark stock symbols as tracked
  - [x] Get latest stock prices (supplied through Yahoo Finance's REST API)
  - [x] Add stock lots with buy date and price
  - [x] Show calculated gain in both absolute value and percentage
  - [x] Sort columns
  - [x] Persist data to cloud
- [x] Compound interest calculator
- [ ] Offline only mode (data is currently cached on device, but only in a read-only mode. Any changes will be overwritten on next refresh.)

All features should work on both mobile and desktop platforms, however some components displays some larger tables with data, which are best viewed on desktop.
They still work well, but can require some horizontal scrolling for now.
