# experimental_XMC - Server-to-Server API Access

The `experimental_XMC` class provides direct access to Sitecore APIs without requiring the Host SDK or Client SDK mode. This is perfect for server-side applications and other scenarios where you need direct API communication.

## 🚀 Quick Start

### Installation

```bash
npm install @sitecore-marketplace-sdk/xmc
```

### Basic Usage

```typescript
import { experimental_createXMCClient } from '@sitecore-marketplace-sdk/xmc';

// Create client asynchronously
const xmc = await experimental_createXMCClient({
  getAccessToken: async () => {
    // Return your access token here
    return await getYourAccessToken();
  },
});

// Use any API directly
const languages = await xmc.sites.listLanguages({
  query: { sitecoreContextId: 'your-context-id' },
});
```

## 🔧 Available APIs

The `experimental_XMC` provides access to the following APIs:

- **Sites API** (`xmc.sites.*`) - Site and language management
- **Pages API** (`xmc.pages.*`) - Page search and management
- **Authoring API** (`xmc.authoring.*`) - GraphQL authoring operations
- **Content Transfer API** (`xmc.contentTransfer.*`) - Content import/export
- **Preview API** (`xmc.preview.*`) - Preview content queries
- **Live API** (`xmc.live.*`) - Live content queries

## 📚 API Examples

### Sites API

```typescript
// List all languages
const languages = await xmc.sites.listLanguages({
  query: { sitecoreContextId: 'your-context-id' },
});

// List all sites
const sites = await xmc.sites.listSites({
  query: { sitecoreContextId: 'your-context-id' },
});
```

### Pages API

```typescript
// Search for pages
const pages = await xmc.pages.search({
  query: {
    sitecoreContextId: 'your-context-id',
    rootIds: ['root-item-id'],
    language: 'en',
    searchText: 'home',
  },
});
```

### Authoring API

```typescript
// Execute GraphQL queries
const result = await xmc.authoring.graphql({
  body: {
    query: `
      query {
        sites {
          name
          id
        }
      }
    `,
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

### Content Transfer API

```typescript
// Create a content transfer
const transfer = await xmc.contentTransfer.createContentTransfer({
  body: {
    configuration: {
      dataTrees: [
        {
          itemPath: '/sitecore/content/Home',
          scope: 'SingleItem',
          mergeStrategy: 'OverrideExistingItem',
        },
      ],
    },
    transferId: crypto.randomUUID(),
  },
  query: { sitecoreContextId: 'your-context-id' },
});

// Delete a content transfer
await xmc.contentTransfer.deleteContentTransfer({
  path: { transferId: transfer.data!.transferId },
  query: { sitecoreContextId: 'your-context-id' },
});
```

### Preview & Live APIs

```typescript
// Query preview content
const previewContent = await xmc.preview.graphql({
  body: {
    query: `
      query {
        item(path: "/sitecore/content/Home", language: "en") {
          id
          name
          path
          fields {
            name
            value
          }
        }
      }
    `,
  },
  query: { sitecoreContextId: 'your-context-id' },
});

// Query live content
const liveContent = await xmc.live.graphql({
  body: {
    query: `
      query {
        item(path: "/sitecore/content/Home", language: "en") {
          id
          name
          path
        }
      }
    `,
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

## 🎨 Enhanced Type Safety

For better IntelliSense and type safety, import the experimental type namespaces:

```typescript
import {
  experimental_Sites,
  experimental_Pages,
  experimental_Authoring,
  experimental_ContentTransfer,
  experimental_Content,
} from '@sitecore-marketplace-sdk/xmc';

// Type your responses
const response = await xmc.sites.listLanguages();
let data: experimental_Sites.ListLanguagesResponse = response.data!;

// Type your requests
const searchResponse = await xmc.pages.search();
let searchData: experimental_Pages.SearchResponse = searchResponse.data!;
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
const xmc = await experimental_createXMCClient({
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

const xmc = await experimental_createXMCClient({
  getAccessToken: () => getAccessTokenSilently(),
});
```

## 🖥️ Demo Application Setup

Want to see `experimental_XMC` in action? This shows how to build a standalone Next.js application that runs inside Sitecore Marketplace Extension points inside iframe.

**💡 Getting Started:** You can start with the official [Auth0 Next.js Sample Application](https://github.com/auth0-samples/auth0-nextjs-samples/tree/main/Sample-01) and then apply the modifications shown below to integrate with Sitecore's experimental XMC functionality.

**⚠️ IMPORTANT:** The configuration below includes critical iframe compatibility settings that are required for the app to work when embedded in the Sitecore portal shell.

Here's the core integration template:

### Next.js App Configuration

**Install Dependencies:**

```bash
npm install @auth0/nextjs-auth0 @sitecore-marketplace-sdk/xmc
```

**⚠️ CRITICAL:** The Auth0 configuration below includes essential iframe compatibility settings. Without these settings, login will fail when your app runs inside an iframe.

**Environment Variables (.env.local):**

```bash
# Auth0 Configuration
AUTH0_SECRET='LONG_RANDOM_VALUE'
APP_BASE_URL='http://localhost:3000'
AUTH0_DOMAIN='https://auth.sitecorecloud.io'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
AUTH0_AUDIENCE='https://api-webapp.sitecorecloud.io'
AUTH0_SCOPE='openid profile email offline_access'

# Experimental Phase Configuration
AUTH0_ORGANIZATION_ID='app orgId'
AUTH0_TENANT_ID='tenantId' // You can get the tenantId from stand-alone app url as you open from portal shell
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
    organization_id: process.env.AUTH0_ORGANIZATION_ID,
    tenant_id: process.env.AUTH0_TENANT_ID,
  },
});
```

**API Route for Server-Side XMC (app/api/xmc/route.js):**

```javascript
import { NextResponse } from 'next/server';
import { auth0 } from '../../../lib/auth0';
import { experimental_createXMCClient } from '@sitecore-marketplace-sdk/xmc';

export const GET = async function xmcApi() {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Create XMC client
    const xmc = await experimental_createXMCClient({
      getAccessToken: async () => {
        const { token: accessToken } = await auth0.getAccessToken();
        return accessToken;
      },
    });

    // Example API call
    const contextId = 'your-context-id'; // Replace with actual context ID
    const response = await xmc.sites.listLanguages({
      query: { sitecoreContextId: contextId },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};
```

## 🏪 Setting Up Your Sitecore Marketplace App

To test the `experimental_XMC` package, you need to create a custom app with Standalone Extension point besides other Extension points:

1. **Create a Custom App**: Follow the [Sitecore Marketplace documentation](https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html) to create your custom app with Standalone Extension point and other Extension points of your choice.

2. **Install the App**: Once created, install your app in your Sitecore environment.

3. **Get Organization and Tenant IDs**: After installation, when you open your standalone app from the portal shell, you can extract the `orgId` and `tenantId` from the app URL. These values are required for the experimental phase configuration.

4. **Get Context IDs**: After installation, you can use a regular standalone application that uses the Sitecore Client SDK. Using the Client SDK, you can use the `application.context` query to get context information temporarily, which provides the context IDs needed for the `experimental_XMC` package.

```typescript
// Using Client SDK to get context information
const contextInfo = await client.query('application.context');
const contextId = contextInfo.sitecoreContextId;
```

4. **Authentication**: Use your Sitecore Identity login token for authentication.

```typescript
// Use the context ID from your app installation
const response = await xmc.sites.listLanguages({
  query: { sitecoreContextId: contextId },
});
```

## 🔧 Important Configuration Notes

### Iframe Compatibility

**⚠️ CRITICAL REQUIREMENT:** For the experimental phase, your Next.js app must be configured to work inside iframes. The following cookie configuration is **MANDATORY** for login to work inside iframes:

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
  organization_id: process.env.AUTH0_ORGANIZATION_ID, // Required for experimental phase
  tenant_id: process.env.AUTH0_TENANT_ID // Required for experimental phase
}
```
