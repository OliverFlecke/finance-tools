# Finance tools

Website to help perform different finance calculations.

## Development

This project is build with ReactJS and is using Tailwindcss for styling.

First install dependencies with `yarn install`.
The website can then be run locally with `yarn start`.

To generate the required stylesheets run `yarn run css`.
Tailwindcss is running in JIT mode, see [tailwindcss.com](https://tailwindcss.com/) for documentation.

## Build and deploy

The build is generating a static site, with statically generated HTML from React using [react-snap](https://www.npmjs.com/package/react-snap).
The build script can be executed with `yarn build`, which will output everything to the `build` directory.

### Deploy

The site is deployed to Github Pages.
Deploy a new version with

```sh
yarn run deploy
```
