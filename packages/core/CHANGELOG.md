# @sitecore-marketplace-sdk/core

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
