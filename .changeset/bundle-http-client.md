---
'@sitecore-marketplace-sdk/xmc': patch
'@sitecore-marketplace-sdk/ai': patch
---

Remove the deprecated `@hey-api/client-fetch` dependency and regenerate API clients with `@hey-api/openapi-ts` 0.99. The HTTP client is now bundled; request and response types and runtime behaviour are unchanged.
