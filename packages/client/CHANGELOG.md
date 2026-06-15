# @sitecore-marketplace-sdk/client

## 0.3.3

### Patch Changes

- 76ac0c2: Bump `@sitecore-marketplace-sdk/core` dependency to `0.3.3`

## 0.3.2

### Patch Changes

- 9bd1985: Update core dependency to fix vulnerability issues

## 0.3.1

### Patch Changes

- 62064ff: Fixes: Use of externally-controlled format string in log

## 0.3.0

### Minor Changes

- 3b308a9: Updated pages context response with enhanced type definitions for site and page information, adding new fields and improving structure.
- 0a7363e: Clients can subscribe to `pages.content.layoutUpdated` and `pages.content.fieldsUpdated` events using the new `subscribe` method.

## 0.2.2

### Patch Changes

- e4ac5c7: Update core dependency to pick up added ApplicationContext fields and ApplicationRuntimeContext field: organizationId and marketplaceAppTenantId (both optional).

## 0.2.0

### Minor Changes

- ff3ca07: Updated application context response with improved property naming and enhanced type definitions

  **🔄 What's Changed in Application Context Response:**

  When you call `client.query('application.context')`, the response now includes updated property names for better clarity:

  **New Property Names (Recommended):**

  ```typescript
  const context = await client.query('application.context');

  // ✅ New: resourceAccess (replaces resources)
  context.data.resourceAccess; // Array of resource access information

  // ✅ New: extensionPoints (replaces touchpoints)
  context.data.extensionPoints; // Array of available extension points
  ```

  **Legacy Properties (Still Supported):**

  ```typescript
  // ⚠️ Deprecated but still works: resources
  context.data.resources; // Still returns resource data

  // ⚠️ Deprecated but still works: touchpoints
  context.data.touchpoints; // Still returns extension point data
  ```

  **📋 Updated Response Structure:**

  ```typescript
  // Application context now returns both old and new properties
  interface ApplicationContext {
    // Resource access information
    resourceAccess: ApplicationResourceContext[]; // ✅ New name
    resources: ApplicationResourceContext[]; // ⚠️ Deprecated

    // Extension points information
    extensionPoints: ApplicationExtensionPointContext[]; // ✅ New name
    touchpoints: ApplicationTouchpointContext[]; // ⚠️ Deprecated

    // Other properties remain unchanged
    id: string;
    name: string;
    url: string;
    // ... etc
  }
  ```

  **✅ Full Backward Compatibility:**

  Your existing code continues to work without any changes:

  - ✅ All existing property access (`resources`, `touchpoints`) functions normally
  - ✅ No breaking changes to response structure
  - ✅ Both old and new properties are available in every response
  - ✅ Update at your own pace - no migration pressure

  **🚀 Benefits of New Names:**

  - **`resourceAccess`**: More accurately describes granted access permissions
  - **`extensionPoints`**: Better describes integration points in your application
  - **Consistency**: Aligns with modern naming conventions across Sitecore products
  - **Clarity**: More descriptive names improve code readability

  **📖 Migration Examples:**

  ```typescript
  // Before (still works)
  const resources = context.data.resources;
  const touchpoints = context.data.touchpoints;

  resources.forEach((resource) => {
    console.log(`Access to: ${resource.resourceId}`);
  });

  touchpoints.forEach((touchpoint) => {
    console.log(`Extension point: ${touchpoint.touchpointId}`);
  });

  // After (recommended for new code)
  const resourceAccess = context.data.resourceAccess;
  const extensionPoints = context.data.extensionPoints;

  resourceAccess.forEach((access) => {
    console.log(`Access to: ${access.resourceId}`);
  });

  extensionPoints.forEach((point) => {
    console.log(`Extension point: ${point.extensionPointId}`);
  });
  ```

  **🔧 Recommended Migration Path:**

  1. **Immediate**: No action required - existing code continues working
  2. **New Code**: Use `resourceAccess` and `extensionPoints` for new implementations
  3. **Gradual Updates**: Update existing code when convenient during regular maintenance
  4. **IDE Benefits**: New property names provide better IntelliSense and type checking

  This update improves the clarity of your application context data while maintaining complete backward compatibility.

## 0.1.4

### Patch Changes

- d385577: Make the origin field in the client SDK init method optional.
- 7f64b54: Adds support for SiteContext query
- b48590c: Added new mutation key to support update Pages context
- da1106f: Introduces custom field support in client
- Updated dependencies [d385577]
  - @sitecore-marketplace-sdk/core@0.1.4

## 0.1.2

### Patch Changes

- a90ac03: Emit route event support: Enables applications to raise route change events to the host application.
- 8ac41c9: Improves intellisense support for clientSdk
- 5360a88: Fixes event subscription not working
- a90ac03: Pages canvas reload support: Adds ability to reload the Pages canvas.
