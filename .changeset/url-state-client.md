---
"@sitecore-marketplace-sdk/client": minor
---

Add `application.urlState` to `QueryMap` and `MutationMap`, so apps can save view state in the host URL with `client.mutate('application.urlState', { params: { state } })` and read it with `client.query('application.urlState')`. The state is checked before it's sent, and hosts without support give a clear "not supported" error instead of an empty success. Requires `@sitecore-marketplace-sdk/core` 0.5.0.
