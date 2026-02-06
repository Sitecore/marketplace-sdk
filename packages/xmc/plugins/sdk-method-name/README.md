# x-sdk-method-name Plugin

A Hey API plugin that allows overriding generated SDK method names using the `x-sdk-method-name` OpenAPI extension.

## Overview

This plugin reads `x-sdk-method-name` from OpenAPI operation extensions and uses it to override the generated SDK method name. This is useful when:

- The auto-generated `operationId` is unwieldy (e.g., `renameSitev2xmappsRenameSiteOperation`)
- You want consistent naming conventions across your SDK (e.g., camelCase)
- You need to maintain backward compatibility when operationIds change

## Testing

### Run Unit Tests

```bash
# From the packages/xmc directory
pnpm test -- plugins/sdk-method-name/plugin.spec.ts

# Or run all tests
pnpm test
```

The test suite includes 22 test cases covering:
- Happy path scenarios (valid overrides, different naming styles)
- Validation errors (invalid identifiers, empty strings)
- Duplicate detection (same name in same tag)
- Edge cases (missing IR, null operations, non-HTTP methods)

### Manual Integration Test

1. **Add `x-sdk-method-name` to an operation in an OpenAPI schema:**

   Edit `packages/xmc/schema/xmapp.yaml` and add the extension to any operation:

   ```yaml
   paths:
     /api/v1/sites/{siteId}/rename:
       post:
         operationId: RenameSite
         x-sdk-method-name: renameSite  # Add this line
         tags:
           - Sites
   ```

2. **Regenerate the SDK:**

   ```bash
   # From packages/xmc directory
   pnpm run generate:module
   ```

3. **Verify the generated code:**

   Check `packages/xmc/src/client-xmapp/sdk.gen.ts` for the method name:

   ```typescript
   // Without x-sdk-method-name: function is named RenameSite
   // With x-sdk-method-name: renameSite - function is named renameSite
   export const renameSite = <ThrowOnError extends boolean = false>(
     options: Options<RenameSiteData, ThrowOnError>
   ) => { ... }
   ```

4. **Verify the augmentation file:**

   Check `packages/xmc/src/client-xmapp/augmentation.gen.ts` to ensure the augmented types also use the new name.

### Test Validation Errors

To verify error handling works correctly:

1. **Test invalid identifier:**

   ```yaml
   x-sdk-method-name: 123invalid  # Starts with digit - should fail
   ```

   Run `pnpm run generate:module` - should see error:
   ```
   Invalid x-sdk-method-name "123invalid" for operationId "...".
   Must match /^[A-Za-z_][A-Za-z0-9_]*$/.
   ```

2. **Test duplicate names:**

   Add the same `x-sdk-method-name` to two operations with the same tag:

   ```yaml
   # Operation 1
   x-sdk-method-name: myMethod
   tags: [Sites]

   # Operation 2  
   x-sdk-method-name: myMethod  # Same name, same tag - should fail
   tags: [Sites]
   ```

   Run `pnpm run generate:module` - should see error:
   ```
   Duplicate x-sdk-method-name "myMethod" in tag/client "Sites".
   ```

### Test Coverage

To run tests with coverage:

```bash
pnpm run coverage
```

## Files

| File | Description |
|------|-------------|
| `plugin.ts` | Core plugin logic |
| `config.ts` | Plugin configuration and `defineSdkMethodNameConfig` helper |
| `types.d.ts` | TypeScript type definitions |
| `index.ts` | Public exports |
| `plugin.spec.ts` | Unit tests |
| `README.md` | This file |

## Usage in Generation Scripts

The plugin is wired into the generation scripts and runs automatically:

```typescript
// generate-xmc.ts
import { defineSdkMethodNameConfig } from './plugins/sdk-method-name';

createClient({
  input: './schema/xmapp.yaml',
  output: { ... },
  plugins: [
    defineSchemaPatcherConfig({ ... }),
    defineSdkMethodNameConfig(),  // Add after schema-patcher, before other plugins
    '@hey-api/client-fetch',
    // ...
  ],
});
```

## Documentation

See [docs/codegen/x-sdk-method-name.md](/docs/codegen/x-sdk-method-name.md) for full documentation.
