---
"@sitecore-marketplace-sdk/core": minor
---

Add the shared URL state contract for `application.urlState`: types, param names, size and depth limits, an instance-key helper and a versioned codec (`1z.` zlib / `1j.` plain base64url). Encoding rejects non-JSON, too deeply nested or oversized values with `INVALID_REQUEST` and a `reason`; decoding never throws and returns `null` for bad input. Request handlers that throw a `CoreError` now pass its `code`, `message` and `details.reason` to the requester instead of `EXECUTION_ERROR`; other `details` stay on the handler's side.
