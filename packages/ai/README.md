# Sitecore Marketplace SDK - `ai` package

The `ai` package extends the Client SDK and provides type-safe interfaces for interacting with the following AI APIs:
- AI Skills API - AI-powered capabilities grounded in SitecoreAI data.
- AI Documents API - manage documents, chunks, references, topics, and fields.

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
Use the `mutate` method to trigger changes in Sitecore (the host). Pass a value to the method depending on the change you want to make.

For example, to list documents using the AI documents API:

```typescript
const documents = await client?.query('ai.documents.listDocuments', {
  params: {
    path: {
      organizationId: 'your-organization-id',
    },
  },
});
```

For an overview of all the possible values, refer to the [`QueryMap` interface](../../docs/modules/ai/interfaces/QueryMap.md).

### Make a mutation
Use the `mutate` method to trigger changes in Sitecore (the host). Pass a value to the method depending on the change you want to make.

For example, to create a document using the AI documents API:

```typescript
const document = await client?.mutate('ai.documents.createDocument', {
  body: {
    // Add the document fields required by your documents API request.
  },
});
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
