---
'@sitecore-marketplace-sdk/core': minor
---

Introduce new extensionPoint naming conventions with full backward compatibility

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
