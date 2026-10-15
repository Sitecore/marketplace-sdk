# HTTP client

Source of `@hey-api/client-fetch` 0.8.3 and the `@hey-api/client-core` modules it bundles (MIT, see `LICENSE.md`), kept in the SDK so generated modules no longer depend on the deprecated package and SDK users keep the same client behaviour across generator upgrades.

Changes from upstream:

- `@hey-api/client-core` imports point to `./core`.
- `types.ts` accepts the calling convention of `@hey-api/openapi-ts` 0.99: generated SDK functions pass responses and errors as maps keyed by status code, `Options` takes a third type parameter, and `ClientMeta` is exported. Result types and runtime behaviour are unchanged.

Generated modules import this folder through the custom client plugin in `packages/shared/plugins/http-client`.
