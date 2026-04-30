# experimental_AI - Server-to-Server API Access

The `experimental_AI` class provides direct access to Sitecore AI APIs without requiring the Host SDK or Client SDK mode. This is perfect for server-side applications and other scenarios where you need direct API communication.

## 🚀 Quick Start

### Installation

```bash
npm install @sitecore-marketplace-sdk/ai
```

### Basic Usage

```typescript
import { experimental_createAIClient } from '@sitecore-marketplace-sdk/ai';

// Create client asynchronously
const ai = await experimental_createAIClient({
  getAccessToken: async () => {
    // Return your access token here
    return await getYourAccessToken();
  },
});

// Use any API directly
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      headline: 'Your marketing headline',
      body: 'Your marketing body copy',
    },
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

## 🔧 Available APIs

The `experimental_AI` provides access to the following APIs:

- **Skills API** (`ai.skills.*`) - AI skills such as brand review generation

## 📚 API Examples

### Skills API - Brand Review

Generate a brand review by running input content against a brand definition using a large language model (LLM). It considers the content of the brand kit sections and subsections to deliver compliance scores, explanations, and fix suggestions.

```typescript
// Generate a brand review
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      headline: 'Summer Sale - 50% Off Everything!',
      body: 'Shop our biggest sale of the year with incredible discounts on all items.',
    },
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

### Brand Review with Specific Sections

You can target specific sections and fields for the review:

```typescript
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      headline: 'Your headline text',
      body: 'Your body copy',
    },
    sections: [
      {
        sectionId: 'tone-of-voice',
        fieldIds: ['headline', 'body'],
      },
    ],
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

### Brand Review with an Image

Send an image for brand review. The `input` record accepts `ExtractableFile` objects where `type` is `'image'` and `mimeType` is one of `'image/jpeg'`, `'image/png'`, or `'image/webp'`. Use the optional `detail` field (`'low'`, `'auto'`, or `'high'`) to control the level of processing detail.

```typescript
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      heroImage: {
        name: 'hero-banner.png',
        type: 'image',
        url: 'https://example.com/hero-banner.png',
        mimeType: 'image/png',
        detail: 'high',
      },
    },
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

You can also pass a base64-encoded image directly via the `url` field:

```typescript
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      logo: {
        name: 'logo.png',
        type: 'image',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
        mimeType: 'image/png',
        detail: 'auto',
      },
    },
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

### Brand Review with a Document

Send a document (PDF or plain text) for brand review. Set `type` to `'document'` and `mimeType` to `'application/pdf'` or `'text/plain'`. If the file requires authentication to download, provide the `auth` object.

```typescript
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      pressRelease: {
        name: 'press-release.pdf',
        type: 'document',
        url: 'https://example.com/press-release.pdf',
        mimeType: 'application/pdf',
      },
    },
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

If the document URL requires authentication, use the `auth` field. Supported `authType` values are `'bearer'`, `'basic'`, and `'custom'` (which requires a `customHeaderName`):

```typescript
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      internalDoc: {
        name: 'style-guide.pdf',
        type: 'document',
        url: 'https://internal.example.com/style-guide.pdf',
        mimeType: 'application/pdf',
        auth: {
          authType: 'bearer',
          value: 'your-file-access-token',
        },
      },
    },
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

### Brand Review with Mixed Input

The `input` field is a flexible record (`{ [key: string]: ... }`). Each key is a field name and the value can be a `string`, `number`, `boolean`, `Array`, object, `ExtractableFile`, `Array<ExtractableFile>`, or `null`. This lets you combine text, images, and documents in a single request.

```typescript
const brandReview = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      // Text fields
      headline: 'Summer Sale - 50% Off Everything!',
      body: 'Shop our biggest sale of the year with incredible discounts.',

      // An image for review
      banner: {
        name: 'summer-banner.webp',
        type: 'image',
        url: 'https://cdn.example.com/summer-banner.webp',
        mimeType: 'image/webp',
        detail: 'high',
      },

      // A document for review
      campaign: {
        name: 'campaign-brief.pdf',
        type: 'document',
        url: 'https://example.com/campaign-brief.pdf',
        mimeType: 'application/pdf',
      },

      // Multiple images as an array of ExtractableFile
      productPhotos: [
        {
          name: 'product-front.jpg',
          type: 'image',
          url: 'https://cdn.example.com/product-front.jpg',
          mimeType: 'image/jpeg',
        },
        {
          name: 'product-back.jpg',
          type: 'image',
          url: 'https://cdn.example.com/product-back.jpg',
          mimeType: 'image/jpeg',
        },
      ],

      // Other supported value types
      wordCount: 150,
      isApproved: false,
      tags: ['summer', 'sale', 'promotion'],
      metadata: { channel: 'email', region: 'us-east' },
    },
    // Optionally target specific brand kit sections and fields
    sections: [
      { sectionId: 'tone-of-voice', fieldIds: ['headline', 'body'] },
      { sectionId: 'visual-identity' },
    ],
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

## 🎨 Enhanced Type Safety

For better IntelliSense and type safety, import the experimental type namespace:

```typescript
import {
  experimental_Skills,
} from '@sitecore-marketplace-sdk/ai';

// Type your request body
const request: experimental_Skills.GenerateBrandReviewModelRequest = {
  brandkitId: 'your-brandkit-id',
  input: {
    headline: 'Your headline',
  },
};

// Type your response
const response = await ai.skills.generateBrandReview({
  body: request,
  query: { sitecoreContextId: 'your-context-id' },
});

// Use typed models
const file: experimental_Skills.ExtractableFile = {
  name: 'banner.png',
  type: 'image',
  url: 'https://example.com/banner.png',
  mimeType: 'image/png',
};

// Use content type constants
const contentType = experimental_Skills.ContentType.SHORT_TEXT;
```

## 🔐 Authentication Setup

### Sitecore Configuration

When setting up your Auth0 application, use the following Sitecore configuration:

```bash
# Auth0 Configuration for Sitecore
AUTH0_DOMAIN=https://auth.sitecorecloud.io
AUTH0_AUDIENCE=https://api-webapp.sitecorecloud.io
```

**Required Scopes:**

- `openid profile email` - Basic user information
- `offline_access` - Refresh token support

### Server-Side Token Provider

```typescript
// Example: Next.js server-side with user token
const ai = await experimental_createAIClient({
  getAccessToken: async () => {
    // Your server-side token logic (e.g., from session, database, etc.)
    return await getUserAccessToken();
  },
});
```

### Auth0 Integration (Client-Side)

```typescript
import { useUser } from '@auth0/nextjs-auth0';

const { user } = useUser();

const ai = await experimental_createAIClient({
  getAccessToken: () => getAccessTokenSilently(),
});
```

## 🖥️ Demo Application Setup

Want to see `experimental_AI` in action? This shows how to build a standalone Next.js application that runs inside Sitecore Marketplace Extension points inside iframe.

**💡 Getting Started:** You can start with the official [Auth0 Next.js Sample Application](https://github.com/auth0-samples/auth0-nextjs-samples/tree/main/Sample-01) and then apply the modifications shown below to integrate with Sitecore's experimental AI functionality.

**⚠️ IMPORTANT:** The configuration below includes critical iframe compatibility settings that are required for the app to work when embedded in the Sitecore environment.

Here's the core integration template:

### Next.js App Configuration

**Install Dependencies:**

```bash
npm install @auth0/nextjs-auth0 @sitecore-marketplace-sdk/ai
```

**Environment Variables (.env.local):**

```bash
# Auth0 Configuration
AUTH0_SECRET='LONG_RANDOM_VALUE'
APP_BASE_URL='https://localhost:3000'  # Must be HTTPS for iframe authentication
AUTH0_DOMAIN='https://auth.sitecorecloud.io'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
AUTH0_AUDIENCE='https://api-webapp.sitecorecloud.io'
AUTH0_SCOPE='openid profile email offline_access'

# Experimental Phase Configuration
SITECORE_ORGANIZATION_ID='app orgId'
SITECORE_TENANT_ID='tenantId' // You can get the tenantId from stand-alone app url as you open from portal shell
```

**Auth0 Configuration (lib/auth0.js):**

```javascript
import { Auth0Client } from '@auth0/nextjs-auth0/server';

// Initialize the Auth0 client with iframe-compatible settings
// ⚠️ CRITICAL: The cookie configuration below is REQUIRED for iframe compatibility
export const auth0 = new Auth0Client({
  session: {
    cookie: {
      sameSite: 'none', // Required for iframe login
      secure: true, // Required for iframe login
    },
  },
  transactionCookie: {
    sameSite: 'none', // Required for iframe login
    secure: true, // Required for iframe login
  },
  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
    organization_id: process.env.SITECORE_ORGANIZATION_ID,
    tenant_id: process.env.SITECORE_TENANT_ID,
  },
});
```

**API Route for Server-Side AI (app/api/ai/route.js):**

```javascript
import { NextResponse } from 'next/server';
import { auth0 } from '../../../lib/auth0';
import { experimental_createAIClient } from '@sitecore-marketplace-sdk/ai';

export const GET = async function aiApi() {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Create AI client
    const ai = await experimental_createAIClient({
      getAccessToken: async () => {
        const { token: accessToken } = await auth0.getAccessToken();
        return accessToken;
      },
    });

    // Example API call - Brand Review
    const contextId = 'your-context-id'; // Replace with actual context ID
    const response = await ai.skills.generateBrandReview({
      body: {
        brandkitId: 'your-brandkit-id',
        input: {
          headline: 'Your headline text',
        },
      },
      query: { sitecoreContextId: contextId },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};
```

## 🏪 Setting Up Your Sitecore Marketplace App

To test the `experimental_AI` package, you need to create a custom app with Standalone Extension point besides other Extension points:

1. **Create a Custom App**: Follow the [Sitecore Marketplace documentation](https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html) to create your custom app with Standalone Extension point and other Extension points of your choice.

2. **Install the App**: Once created, install your app in your Sitecore environment.

3. **Get Organization and Tenant IDs**: After installation, when you open your standalone app from the portal shell, you can extract the `orgId` and `tenantId` from the app URL. These values are required for the experimental phase configuration.

4. **Get Context IDs**: After installation, you can use a regular standalone application that uses the Sitecore Client SDK. Using the Client SDK, you can use the `application.context` query to get context information temporarily, which provides the context IDs needed for the `experimental_AI` package.

```typescript
// Using Client SDK to get context information
const contextInfo = await client.query('application.context');
const contextId = contextInfo.sitecoreContextId;
```

4. **Authentication**: Use your Sitecore Identity login token for authentication.

```typescript
// Use the context ID from your app installation
const response = await ai.skills.generateBrandReview({
  body: {
    brandkitId: 'your-brandkit-id',
    input: {
      headline: 'Your content to review',
    },
  },
  query: { sitecoreContextId: contextId },
});
```

## 🔧 Important Configuration Notes

### Iframe Compatibility

**⚠️ CRITICAL REQUIREMENT:** For the experimental phase, your Next.js app must be configured to work inside iframes. This includes both HTTPS requirements and cookie configuration.

#### HTTPS Requirement

Authentication inside iframes requires HTTPS. For local testing, use `next dev --experimental-https` and ensure your `APP_BASE_URL` uses `https://localhost:3000`.

#### Cookie Configuration

The following cookie configuration is **MANDATORY** for login to work inside iframes:

```javascript
session: {
  cookie: {
    sameSite: 'none',  // Required for iframe login
    secure: true       // Required for iframe login
  }
},
transactionCookie: {
  sameSite: 'none',    // Required for iframe login
  secure: true         // Required for iframe login
}
```

**Why this is required:** When your app runs inside an iframe within the Sitecore portal shell, browsers enforce strict cookie policies. The `sameSite: 'none'` and `secure: true` settings allow authentication cookies to be sent across different origins, which is necessary for the login flow to work properly within the iframe context.

### Organization and Tenant IDs

During the experimental phase, you must configure your organization ID and tenant ID in the Auth0 configuration:

```javascript
authorizationParameters: {
  scope: process.env.AUTH0_SCOPE,
  audience: process.env.AUTH0_AUDIENCE,
  organization_id: process.env.SITECORE_ORGANIZATION_ID, // Required for experimental phase
  tenant_id: process.env.SITECORE_TENANT_ID // Required for experimental phase
}
```
