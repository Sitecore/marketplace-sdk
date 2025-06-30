# Client Transformer Plugin

This plugin transforms the generated OpenAPI TypeScript types and optionally wraps all exports in a namespace.

## Configuration

```typescript
import { defineClientTransformerConfig } from '@sitecore-marketplace/client-transformer';

// With namespace wrapping
const config = defineClientTransformerConfig({
  output: 'client', // Optional: defaults to 'client'
  namespace: 'MyNamespace', // Optional: wraps all exports in namespace
});

// Without namespace wrapping
const config = defineClientTransformerConfig({
  output: 'client', // Optional: defaults to 'client'
  // namespace: undefined // Default: no wrapping
});
```

## Features

### Namespace Wrapping

When a namespace is provided, all exported types will be wrapped in the specified namespace, providing clean scoping for your API types.

**Example output with namespace:**

```typescript
export namespace MyNamespace {
  export type GraphqlData = {
    /* ... */
  };
  export type GraphqlErrors = {
    /* ... */
  };
  export type ClientOptions = {
    /* ... */
  };
}
```

**Example output without namespace:**

```typescript
export type GraphqlData = {
  /* ... */
};
export type GraphqlErrors = {
  /* ... */
};
export type ClientOptions = {
  /* ... */
};
```

## Usage in Client Code

**With namespace:**

The plugin imports the namespace and updates all type references to use the namespaced types:

```typescript
import type { MyNamespace } from './types.gen';

// Type references are automatically updated to use namespaced types
const options: MyNamespace.ClientOptions = {
  baseUrl: 'https://api.example.com',
};

// In SDK files, all type references are also updated
export const graphql = <ThrowOnError extends boolean = false>(
  options: Options<MyNamespace.GraphqlData, ThrowOnError>,
) => {
  return client.post<MyNamespace.GraphqlResponse, unknown, ThrowOnError>({
    // ...
  });
};
```

**Without namespace:**

```typescript
import type { ClientOptions } from './types.gen';

// Use types like:
const options: ClientOptions = {
  baseUrl: 'https://api.example.com',
};
```
