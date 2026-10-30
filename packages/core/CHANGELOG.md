# @sitecore-marketplace-sdk/core

## 0.5.0

### Minor Changes

- d8191e1: Add the shared URL state contract for `application.urlState`: types, param names, size and depth limits, an instance-key helper and a versioned codec (`1z.` zlib / `1j.` plain base64url). Encoding rejects non-JSON, too deeply nested or oversized values with `INVALID_REQUEST` and a `reason`; an object property set to `undefined` is left out, as `JSON.stringify` does, and `readonly` arrays are accepted. Decoding never throws and returns `null` for bad input; decoding the host map leaves out a state over the per-instance JSON limit and keeps the others.

  Request handlers that throw a `CoreError` now pass its `code`, `message` and `details.reason` to the requester instead of `EXECUTION_ERROR`; other `details` stay on the handler's side. Other errors pass only their `message`.

  The bridge now ignores messages from a window other than its target, including messages buffered before the target was set. Several iframes of one app share an origin, so the origin alone didn't tell them apart. Debug logs redact `application.urlState` payloads and the responses to them.

### Patch Changes

- 69acd59: Update undici dev dependency to a patched version

## 0.4.0

### Minor Changes

- fb9da3e: Add an optional per-request timeout to the core bridge request

### Patch Changes

- f23c00d: fix vulnerability

## 0.3.5

### Patch Changes

- dc8a43f: Add developer information to `ApplicationRuntimeContext`

## 0.3.4

### Patch Changes

- 2779684: Upgrade test tooling to Vitest 4 and apply security overrides for postcss, fast-uri, ws, turbo, uuid, and tmp.
- 78d923f: Fix security vulnerability

## 0.3.3

### Patch Changes

- 556ddcf: Security: Fix client SDK handshake origin validation.

## 0.3.2

### Patch Changes

- 4ad8d6b: Fix vulnerabilities found

## 0.3.1

### Patch Changes

- 23eb7bf: Fixes format string issues found by security scan

## 0.3.0

### Minor Changes

- d8a184a: Updates pages interfaces to support new features
  - Added display field in extension point meta object for pages custom field
  - Added subscription event interfaces for pages.content.layoutUpdated and pages.content.fieldsUpdated

## 0.2.3

### Patch Changes

- f580406: Implemented a new Permission property in ApplicationRuntimeContext to configure iframe sandbox and allow attributes for stricter browser capability control. Additionally, addressed and fixed high-severity vulnerabilities identified in the glob CLI dependency.

## 0.2.2

### Patch Changes

- a650e09: Add OrganizationID and MarketplaceTenantID in ApplicationRuntimeContext

## 0.2.1

### Patch Changes

- d41657b: Fixes `AllowedExtensionPoints` exports

## 0.2.0

### Minor Changes

- ff3ca07: Introduce new extensionPoint naming conventions with full backward compatibility

  **New Features:**

  - Added `AllowedExtensionPoints` type alias for `AllowedTouchpoints` enum
  - Added `ApplicationExtensionPointContext` interface as the new standard (replaces `ApplicationTouchpointContext`)
  - Added `ApplicationExtensionPointMetaContext` interface as the new standard (replaces `ApplicationTouchpointMetaContext`)
  - Added `extensionPoints` property to `ApplicationContext` and `ApplicationRuntimeContext` interfaces
  - Updated `resourceAccess` property naming (replaces deprecated `resources`)

  **Backward Compatibility:**

  This is a fully backward-compatible change. All existing code will continue to work without modifications:

  - `AllowedTouchpoints` enum remains unchanged and fully functional
  - `ApplicationTouchpointContext` and `ApplicationTouchpointMetaContext` interfaces remain functional but are marked as deprecated
  - `touchpoints` and `resources` properties continue to work but show deprecation warnings

  **What changed:**

  - Added new `extensionPoints` property alongside deprecated `touchpoints`
  - Added new extension point interfaces with cleaner naming
  - Added type alias for better API consistency
  - Maintained full backward compatibility with automatic property mapping

## 0.1.6

### Patch Changes

- d2f72e4: Updates itemVersion field type to number in pages context mutation
- 11081ee: Updates application touchpoint context to support multiple dashboard blocks

## 0.1.5

### Patch Changes

- 402b92a: Adds types for host init new property `applicationContext`

## 0.1.4

### Patch Changes

- d385577: Add support for dynamic origins in core SDK. Refer to allowed-origin.ts for list of supported origins.

## 0.1.3

### Patch Changes

- b48590c: Added a new shared type for the mutation parameters to support update Pages Context
- 894b467: Support touchpoints
