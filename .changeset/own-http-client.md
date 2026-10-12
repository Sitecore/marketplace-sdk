---
'@sitecore-marketplace-sdk/xmc': patch
'@sitecore-marketplace-sdk/ai': patch
---

Remove the dependency on the deprecated `@hey-api/client-fetch` package. The generated clients now use a built-in HTTP client with the same API.
