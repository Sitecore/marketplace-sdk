# Sitecore Marketplace SDK - `ai-v2` package

The `ai-v2` package extends the Client SDK and provides type-safe interfaces for interacting with the following Extractions API:
- Extractions API

## Prerequisites
- Node.js 16 or later. Check your installed version by using the `node --version` command.
- npm 10 or later. Check your installed version by using the `npm --version` command.
- A SitecoreAI subscription.

## Installation

```bash
npm install @sitecore-marketplace-sdk/ai-v2
```

## Initialization
Before you use queries or mutations, you must initialize the AIV2 module.

1. Update the code where you initialized the Client SDK by importing `AIV2` and adding it to `config`:

```typescript
// utils/hooks/useMarketplaceClient.ts
import { AIV2 } from '@sitecore-marketplace-sdk/ai-v2';

// ...
const config = {
  // ...
  modules: [AIV2] // Extend Client SDK with `AIV2`
};
```

## Usage

### Make a query
Use the `query` method to make one-off data requests and live subscriptions. Pass a value to the method depending on the data you want to retrieve.

For example, pass `'ai-v2.extractions.getVersionApiVersionGet'` to `query`:

```typescript
client.query('ai-v2.extractions.getVersionApiVersionGet', {
    params: {},
}).then((res) => {
    console.log("Success:", res.data);
}).catch((error) => {
    console.error("Error:", error);
});
```

For an overview of all the possible values, refer to the [`QueryMap` interface](../../docs/modules/ai-v2/interfaces/QueryMap.md).

### Make a mutation
Use the `mutate` method to trigger changes in Sitecore (the host). Pass a value to the method depending on the change you want to make.

For example, to generate an extraction:

```typescript
client?.mutate('ai-v2.extractions.generateExtractionApiExtractionsV1ExtractionsGeneratePost', {
    params: {},
});
```

For an overview of all the possible values, refer to the [`MutationMap` interface](../../docs/modules/ai-v2/interfaces/MutationMap.md).

> [!NOTE]
> Behind the scenes, the Host SDK (integrated via the internal `core` package) attaches the required user token and performs the HTTP request on behalf of the Marketplace app (the client).

## Documentation

For more information, refer to the reference documentation in the `/docs` folder.

## License
This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License. Refer to the [LICENSE](../../LICENSE.md) file in the repository root.

## Status
The `ai-v2` package is actively maintained as part of the Sitecore Marketplace SDK.
