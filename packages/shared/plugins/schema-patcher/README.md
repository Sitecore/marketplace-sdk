# Schema Patcher Plugin — Filtering & `x-sc-sdk` Support

The **schema-patcher** plugin for `@hey-api/openapi-ts` now supports filtering operations and overriding `operationId` values using the `x-sc-sdk` vendor extension and plugin configuration options.

## Architecture

The implementation has two layers:

| Layer | When it runs | What it does |
|---|---|---|
| **`preprocessInput()`** | Before `createClient()` — on the raw OpenAPI spec | Processes `x-sc-sdk.generate` and `x-sc-sdk.operationName` directives. Also supports tag/operationId filtering. |
| **Plugin handler** | Inside hey-api pipeline — on the IR | Supports `includeOperationIds`, `excludeOperationIds`, `includeTags`, `excludeTags` via plugin config. Also injects `sitecoreContextId` and patches server URLs. |

> **Why two layers?** The `x-sc-sdk` vendor extension is stripped during hey-api's OpenAPI → IR parsing, so it must be processed on the raw spec. IR-level filtering (tags, operationIds) works in the plugin handler.

## `x-sc-sdk` Extension

The `x-sc-sdk` extension can be placed at **path level** or **operation level** in an OpenAPI spec:

```yaml
paths:
  /applications:
    x-sc-sdk:
      generate: false          # Path-level default: skip all operations
    get:
      operationId: listApps
      x-sc-sdk:
        generate: true         # Override: keep this operation
        operationName: listApplications  # Override operationId
    post:
      summary: Create Application
      # Inherits generate: false from path level → removed
```

### Supported fields

| Field | Type | Description |
|---|---|---|
| `generate` | `boolean` | Whether to include this operation in code generation. Operation-level overrides path-level. Default: `true` (keep). |
| `operationName` | `string` | Overrides the `operationId` value for the operation. Applied before any operationId-based filtering. |

### Inheritance rules

1. If **path-level** `x-sc-sdk.generate` is `false`, all operations under that path are removed unless individually overridden.
2. If **operation-level** `x-sc-sdk.generate` is `true`, it overrides a path-level `false`.
3. If no `x-sc-sdk` is present, the operation is kept (backward compatible).

## `preprocessInput()` — Raw Spec Preprocessing

```typescript
import { preprocessInput } from '../shared/plugins/schema-patcher';

const spec = await preprocessInput('./schema/skills.json');
// or from a URL:
const spec = await preprocessInput('https://example.com/openapi.json');
// with options:
const spec = await preprocessInput('./schema/skills.json', {
  includeTags: ['public'],
});

await createClient({ input: spec, ... });
```

### Processing order

1. **`x-sc-sdk.generate`** — remove operations where effective generate is `false`
2. **Tag filtering** — `includeTags` / `excludeTags`
3. **`x-sc-sdk.operationName`** — override `operationId`
4. **OperationId filtering** — `includeOperationIds` / `excludeOperationIds`
5. **Cleanup** — strip `x-sc-sdk` keys, remove empty paths

### `PreprocessInputOptions`

| Option | Type | Description |
|---|---|---|
| `includeOperationIds` | `string[]` | Only keep operations whose `operationId` is in this list (applied after `operationName` override). |
| `excludeOperationIds` | `string[]` | Remove operations whose `operationId` is in this list. |
| `includeTags` | `string[]` | Only keep operations with at least one matching tag. |
| `excludeTags` | `string[]` | Remove operations with any matching tag. |

> **`include*` and `exclude*` are mutually exclusive** — providing both for the same dimension throws an error.

## Plugin Config — IR-Level Filtering

The same filter options are also available on the plugin config for IR-level filtering:

```typescript
defineSchemaPatcherConfig({
  basePath: '/stream/ai-skills-api/',
  includeOperationIds: ['generateBrandReview', 'generateEmbeddings'],
  // or: excludeOperationIds: ['adminOnly'],
  // or: includeTags: ['public'],
  // or: excludeTags: ['admin'],
})
```

These work on the hey-api IR (after parsing). Use `preprocessInput()` for `x-sc-sdk` directives; use plugin config for additional IR-level filtering.

## Full Example

```typescript
import { createClient } from '@hey-api/openapi-ts';
import { defineSchemaPatcherConfig, preprocessInput } from '../shared/plugins/schema-patcher';

async function generate() {
  // Phase 1: preprocess raw spec (x-sc-sdk directives)
  const input = await preprocessInput(
    'https://ai-skills-api-euw-staging.sitecore-staging.cloud/openapi.json',
  );

  // Phase 2: hey-api pipeline (IR-level patching)
  await createClient({
    input,
    output: { path: './src/client-skills' },
    plugins: [
      defineSchemaPatcherConfig({
        basePath: '/stream/ai-skills-api/',
      }),
      '@hey-api/client-fetch',
      '@hey-api/schemas',
      '@hey-api/sdk',
      { enums: 'javascript', name: '@hey-api/typescript' },
    ],
  });
}

generate();
```

## Files

| File | Purpose |
|---|---|
| `plugins/schema-patcher/plugin.ts` | Plugin handler — server URL patching, `sitecoreContextId` injection, IR-level filtering |
| `plugins/schema-patcher/preprocess-input.ts` | Raw spec preprocessor — `x-sc-sdk` processing, tag/operationId filtering |
| `plugins/schema-patcher/types.d.ts` | Plugin config interface |
| `plugins/schema-patcher/config.ts` | Plugin registration with hey-api |
| `plugins/schema-patcher/index.ts` | Re-exports |
| `plugins/__tests__/schema-patcher-filtering.test.ts` | Unit tests for filtering (26 tests) |
