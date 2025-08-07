# Sitecore Marketplace SDK - `core` package

`core` is an internal package used by other Sitecore Marketplace SDK packages. Developers typically do not need to directly interact with it.

The `core` package sets up secure communication between a Marketplace application and Sitecore, using the web browser's [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). It handles low-level details, such as:
- secure handshake
- request-response pattern
- event publish-subscribe system
- origin validation

## Prerequisites
- Node.js 16 or later. Check your installed version by using the `node --version` command.
- npm 10 or later. Check your installed version by using the `npm --version` command.

## Installation
`core` is automatically installed when you install other Marketplace SDK packages, such as `client`.

## License 
This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License. Refer to the [LICENSE](../../LICENSE.md) file in the repository root.

## Status
The `core` package is actively maintained as part of the Sitecore Marketplace SDK.
