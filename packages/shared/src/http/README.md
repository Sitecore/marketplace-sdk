# HTTP client

Source of `@hey-api/client-fetch` 0.8.3 and the `@hey-api/client-core` modules it bundles (MIT, see `LICENSE.md`), kept in the SDK so generated modules no longer depend on the deprecated package. The only change from upstream is the `./core` import path.

Generated modules import this folder through the custom client plugin in `packages/shared/plugins/http-client`.
