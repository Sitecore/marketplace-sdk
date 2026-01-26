# Sitecore Marketplace SDK - AI Package

The `ai` package extends the Client SDK and provides type-safe interfaces for interacting with Sitecore AI APIs.

## Prerequisites

- Node.js 16 or later
- npm 10 or later
- A Sitecore subscription with AI features enabled

## Installation

```bash
npm install @sitecore-marketplace-sdk/ai
```

## Initialization

Before you use queries or mutations, you must initialize the AI module.

### Non-Experimental (Inside Sitecore Iframe)

Update the code where you initialized the Client SDK by importing `AI` and adding it to `config`:

```typescript
import { ClientSDK } from '@sitecore-marketplace-sdk/client';
import { AI } from '@sitecore-marketplace-sdk/ai';

const client = await ClientSDK.init({
  origin: 'https://host.app',
  target: window.parent,
  modules: [AI] // Extend Client SDK with AI
});

// Use the AI module
const result = await client.query('ai.skills.listSkills', {
  params: { query: { sitecoreContextId } }
});
```

### Experimental (Standalone/Server-side)

For standalone or server-side applications:

```typescript
import { experimental_createAIClient } from '@sitecore-marketplace-sdk/ai';

const ai = await experimental_createAIClient({
  getAccessToken: async () => await getYourAccessToken()
});

const result = await ai.skills.listSkills({
  query: { sitecoreContextId }
});
```

## Generating SDK from OpenAPI Spec

Once you have the actual OpenAPI specification:

1. Replace the placeholder `schema/skills.yaml` with your actual OpenAPI spec
2. Run the generation command:

```bash
cd packages/ai
pnpm run generate:module              # For non-experimental
pnpm run generate:module:experimental # For experimental
```

## License

This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License.

## Status

The `ai` package is actively maintained as part of the Sitecore Marketplace SDK.
