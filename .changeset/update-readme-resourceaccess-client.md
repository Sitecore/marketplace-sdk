---
'@sitecore-marketplace-sdk/client': patch
---

Update README documentation to use new `resourceAccess` property name

**Deprecation Notice:**

The `application.context` query response now includes new `resourceAccess` and `extensionsPoints` properties. The existing `resources` and `touchpoints` properties are deprecated but still available for backward compatibility. This is a non-breaking change - existing code will continue to work unchanged.

**What changed:**

- The `application.context` query response now includes new `resourceAccess` and `extensionsPoints` properties alongside the deprecated ones
- Updated README.md examples to use `resourceAccess` instead of the deprecated `resources` property
- Updated descriptive text to refer to "resource access" instead of "resources" for consistency with new property naming
- Enhanced initialization examples with comprehensive React hooks and error handling patterns

**Migration guide:**

When consuming the `application.context` query response, use the new properties:

- `applicationContext.resourceAccess` instead of `applicationContext.resources`
- `applicationContext.extensionsPoints` instead of `applicationContext.touchpoints`
- The deprecated properties are still available for backward compatibility

This ensures your code uses the recommended property names and prepares for future versions where deprecated properties may be removed.
