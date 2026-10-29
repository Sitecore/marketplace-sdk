---
"@sitecore-marketplace-sdk/core": minor
"@sitecore-marketplace-sdk/client": minor
---

Send request bodies as `Blob` over the iframe `postMessage` bridge, and accept either `Blob` or `ArrayBuffer` on the response. Client `_fetch` uses `input.blob()` and sets `responseBodyType: 'blob'` so a new host can return a Blob. Hosts that do not understand the flag, and clients that omit it, keep the ArrayBuffer response.
