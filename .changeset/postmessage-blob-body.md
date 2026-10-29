---
"@sitecore-marketplace-sdk/core": minor
"@sitecore-marketplace-sdk/client": minor
---

Send and accept request/response bodies as `Blob` over the iframe `postMessage` bridge (with `ArrayBuffer` still accepted for compatibility). Client `_fetch` now uses `input.blob()` instead of `input.arrayBuffer()` to avoid full structured-clone copies of large payloads.
