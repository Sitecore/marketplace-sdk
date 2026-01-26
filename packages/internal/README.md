# Sitecore Marketplace SDK - Shared Package

The `shared` package provides shared utilities and tools for the Sitecore Marketplace SDK.

## Contents

### Runtime Utilities (Published)

- `ExperimentalClientBase` - Base class for building experimental SDK clients
- `ExperimentalClientConfig` - Configuration interface for experimental clients
- `ApiConfig` - Configuration for individual APIs
- `DEFAULT_HEADERS` - Default headers for API calls
- `DEFAULT_EDGE_PLATFORM_PROXY_URL` - Default Edge Platform proxy URL

### Dev-time Tools (Not Bundled)

OpenAPI plugins for code generation:
- `augmentation` - Generates QueryMap/MutationMap augmentation
- `client-transformer` - Transforms client code
- `namespace-transformer` - Adds namespace prefixes
- `schema-patcher` - Patches OpenAPI schemas

## Usage

### Runtime Utilities

```typescript
import {
  ExperimentalClientBase,
  ExperimentalClientConfig,
  ApiConfig,
} from '@sitecore-marketplace-sdk/shared';

class MyExperimentalClient extends ExperimentalClientBase<'api1' | 'api2'> {
  // Implementation
}
```

### Dev-time Plugins

```typescript
import { defineAugmentationConfig } from '@sitecore-marketplace-sdk/shared/tools/openapi-plugins/augmentation';
import { defineSchemaPatcherConfig } from '@sitecore-marketplace-sdk/shared/tools/openapi-plugins/schema-patcher';
```

## License

This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License.
