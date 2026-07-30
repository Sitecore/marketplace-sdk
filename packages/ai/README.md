# Sitecore Marketplace SDK - `ai` package

The `ai` package extends the Client SDK and provides type-safe interfaces for interacting with the following AI APIs:
- [Brand Review REST API](https://api-docs.sitecore.com/ai-capabilities/ai-brand-review-admin-rest-api) - using AI-powered analysis, evaluate whether input content and assets comply with the guidelines defined in a brand kit.
- Documents API - manage AI document content, chunks, references, and topics.

## Prerequisites
- Node.js 16 or later. Check your installed version by using the `node --version` command.
- npm 10 or later. Check your installed version by using the `npm --version` command.
- A Stream subscription.

## Installation

```bash
npm install @sitecore-marketplace-sdk/ai
```

## Initialization
Before you use queries or mutations, you must initialize the AI module.

1. Update the code where you initialized the Client SDK by importing `AI` and adding it to `config`:

```typescript
// utils/hooks/useMarketplaceClient.ts
import { AI } from '@sitecore-marketplace-sdk/ai';

// ...
const config = {
  // ...
  modules: [AI] // Extend Client SDK with `AI`
};
```

## Usage

### Make a query
Use the `query` method to make one-off data requests and live subscriptions. Pass a value to the method depending on the data you want to retrieve.

For example, to read the Documents API version:

```typescript
client.query('ai.documents.getVersion', {
  params: {},
}).then((res) => {
  console.log('Success:', res.data);
}).catch((error) => {
  console.error('Error:', error);
});
```

For an overview of all the possible values, refer to the [`QueryMap` interface](../../docs/modules/ai/interfaces/QueryMap.md).

### Make a mutation
Use the `mutate` method to trigger changes in Sitecore (the host). Pass a value to the method depending on the change you want to make.

For example, to create a document using the Documents API:

```typescript
const createDocument = async () => {
  await client?.mutate('ai.documents.createDocument', {
    body: {
      title: 'New document',
      content: 'Document body',
    },
  });
};
```

For an overview of all the possible values, refer to the [`MutationMap` interface](../../docs/modules/ai/interfaces/MutationMap.md).

> [!NOTE]
> Behind the scenes, the Host SDK (integrated via the internal `core` package) attaches the required user token and performs the HTTP request on behalf of the Marketplace app (the client).

## Documentation

For more information, refer to the reference documentation in the `/docs` folder.

## License 
This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License. Refer to the [LICENSE](../../LICENSE.md) file in the repository root.

## Status
The `ai` package is actively maintained as part of the Sitecore Marketplace SDK.
