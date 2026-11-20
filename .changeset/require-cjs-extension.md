---
"@sitecore-marketplace-sdk/core": patch
"@sitecore-marketplace-sdk/client": patch
"@sitecore-marketplace-sdk/xmc": patch
"@sitecore-marketplace-sdk/ai": patch
---

Publish the CommonJS build as `dist/index.cjs` so `require()` loads it when the package is marked as an ES module.
