---
'@sitecore-marketplace-sdk/core': patch
---

Deprecate `resources` and `touchpoints` properties in favor of `resourceAccess` and `extensionsPoints`

**Deprecation Notice:**

- The `resources` property in `ApplicationContext` and `ApplicationRuntimeContext` interfaces is now deprecated. Use `resourceAccess` instead.
- The `touchpoints` property in `ApplicationContext` and `ApplicationRuntimeContext` interfaces is now deprecated. Use `extensionsPoints` instead.

This is a non-breaking change - existing code will continue to work unchanged.

**What changed:**

- Added deprecation JSDoc comments to `resources` and `touchpoints` properties in both interfaces
- Added new `resourceAccess` and `extensionsPoints` properties to `ApplicationContext` and `ApplicationRuntimeContext` interfaces
- Maintained backward compatibility - deprecated properties still work but will show deprecation warnings in IDEs

**Migration guide:**

Replace usage of deprecated properties with their new equivalents:

- `applicationContext.resources` → `applicationContext.resourceAccess`
- `applicationContext.touchpoints` → `applicationContext.extensionsPoints`
- `runtimeContext.resources` → `runtimeContext.resourceAccess`
- `runtimeContext.touchpoints` → `runtimeContext.extensionsPoints`

The deprecated properties will be removed in a future major version.
