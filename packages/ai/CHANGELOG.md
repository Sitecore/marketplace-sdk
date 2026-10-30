# Changelog

## 0.1.4

### Patch Changes

- a644338: Accept `@sitecore-marketplace-sdk/client` 0.5 as a peer dependency.
- bb3a693: Remove unused AI types referenced only by operations excluded through `x-sc-sdk.generate: false` from both stable and experimental clients.
- Updated dependencies [a644338]
  - @sitecore-marketplace-sdk/client@0.5.0

## 0.1.3

### Patch Changes

- 46b824f: Remove the deprecated `@hey-api/client-fetch` dependency and regenerate API clients with `@hey-api/openapi-ts` 0.99. The HTTP client is now bundled; request and response types and runtime behaviour are unchanged.
- Updated dependencies [ab11188]
  - @sitecore-marketplace-sdk/client@0.4.1

## 0.1.2

### Patch Changes

- 2978fef: Update marketplace client

## 0.1.1

### Patch Changes

- 2779684: Upgrade test tooling to Vitest 4 and apply security overrides for postcss, fast-uri, ws, turbo, uuid, and tmp.
- 78d923f: Fix security vulnerability
- Updated dependencies [2779684]
- Updated dependencies [78d923f]
  - @sitecore-marketplace-sdk/client@0.3.4

## 0.1.0

### Minor Changes

- Initial release of `@sitecore-marketplace-sdk/ai` with Skills API support.
