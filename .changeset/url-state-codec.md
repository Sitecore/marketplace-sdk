---
"@sitecore-marketplace-sdk/core": minor
---

Add the shared URL state contract for `application.urlState`: types, param names, size and depth limits, an instance-key helper and a versioned codec (`1z.` zlib / `1j.` plain base64url). Encoding rejects non-JSON, too deeply nested or oversized values with `INVALID_REQUEST` and a `reason`; an object property set to `undefined` is left out, as `JSON.stringify` does, and `readonly` arrays are accepted. Decoding never throws and returns `null` for bad input; decoding the host map leaves out a state over the per-instance JSON limit and keeps the others.

Request handlers that throw a `CoreError` now pass its `code`, `message` and `details.reason` to the requester instead of `EXECUTION_ERROR`; other `details` stay on the handler's side. Other errors pass only their `message`.

The bridge now ignores messages from a window other than its target, including messages buffered before the target was set. Several iframes of one app share an origin, so the origin alone didn't tell them apart. Debug logs redact `application.urlState` payloads and the responses to them.
