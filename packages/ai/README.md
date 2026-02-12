# @sitecore-marketplace-sdk/ai

AI module for the Sitecore Marketplace SDK. Provides typed API access to Sitecore AI Skills.

## Installation

```bash
npm install @sitecore-marketplace-sdk/ai @sitecore-marketplace-sdk/client
```

## Usage

### Classic Mode (with ClientSDK)

```typescript
import { ClientSDK } from '@sitecore-marketplace-sdk/client';
import { AI } from '@sitecore-marketplace-sdk/ai';

const clientSdk = new ClientSDK({ /* config */ });
clientSdk.addModule(AI);

// Use typed operations
const result = await clientSdk.mutate('ai.skills.generateBrandReview', {
  body: {
    brandkitId: 'your-brand-kit-id',
    input: { text: 'Content to review' },
  },
});
```

### Experimental Mode (Standalone)

```typescript
import { experimental_createAIClient } from '@sitecore-marketplace-sdk/ai';

const client = await experimental_createAIClient({
  getAccessToken: async () => 'your-access-token',
});

// Use typed API methods directly
const result = await client.skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost({
  body: {
    brandkitId: 'your-brand-kit-id',
    input: { text: 'Content to review' },
  },
});
```

## License

Apache-2.0
