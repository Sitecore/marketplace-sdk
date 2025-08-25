# EXPERIMENTAL_XMC - Server-to-Server API Access

The `EXPERIMENTAL_XMC` class provides direct access to Sitecore APIs without requiring the Host SDK or Client SDK mode. This is perfect for server-side applications and other scenarios where you need direct API communication.

## 🚀 Quick Start

### Installation

```bash
npm install @sitecore-marketplace-sdk/xmc
```

### Basic Usage

```typescript
import { EXPERIMENTAL_XMC } from '@sitecore-marketplace-sdk/xmc';

// Initialize with your token provider
const xmc = new EXPERIMENTAL_XMC({
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

The `EXPERIMENTAL_XMC` provides access to the following APIs:

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
  EXPERIMENTAL_Sites,
  EXPERIMENTAL_Pages,
  EXPERIMENTAL_Authoring,
  EXPERIMENTAL_ContentTransfer,
  EXPERIMENTAL_Content,
} from '@sitecore-marketplace-sdk/xmc';

// Type your responses
const response = await xmc.sites.listLanguages();
let data: EXPERIMENTAL_Sites.ListLanguagesResponse = response.data!;

// Type your requests
const searchResponse = await xmc.pages.search();
let searchData: EXPERIMENTAL_Pages.SearchResponse = searchResponse.data!;
```

## 🔐 Authentication Setup

### Sitecore Configuration

When setting up your Auth0 application, use the following Sitecore configuration:

```bash
# Auth0 Configuration for Sitecore
VITE_AUTH0_DOMAIN=https://auth.sitecorecloud.io
VITE_AUTH0_AUDIENCE=https://api-webapp.sitecorecloud.io
```

**Required Scopes:**

- `openid profile email` - Basic user information
- `offline_access` - Refresh token support
- `read:marketplace` - Marketplace API access

### Server-Side Token Provider

```typescript
// Example: Next.js server-side with user token
const xmc = new EXPERIMENTAL_XMC({
  getAccessToken: async () => {
    // Your server-side token logic (e.g., from session, database, etc.)
    return await getUserAccessToken();
  },
});
```

### Auth0 Integration (Client-Side)

```typescript
import { useAuth0 } from '@auth0/auth0-react';

const { getAccessTokenSilently } = useAuth0();

const xmc = new EXPERIMENTAL_XMC({
  getAccessToken: () => getAccessTokenSilently(),
});
```

## 🖥️ Demo Application Setup

Want to see `EXPERIMENTAL_XMC` in action? This shows how to build a standalone application that runs independently outside of Sitecore and authenticates using Sitecore Identity. Here's the core integration template:

The demo app shows two approaches:

#### A. Using React Context (Recommended)

**AuthProvider Setup:**

```typescript
// src/providers/AuthProvider.tsx
import { Auth0Provider } from '@auth0/auth0-react';
import { audience, clientId, domain } from '../config/envConfig';

function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: window.location.origin,
        scope: 'openid profile email offline_access read:marketplace',
      }}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      {children}
    </Auth0Provider>
  );
}
```

**ExperimentalXMC Provider:**

```typescript
// src/features/client-sdk/providers/ExperimentalXMCProvider.tsx
import { EXPERIMENTAL_XMC } from '@sitecore-marketplace-sdk/xmc';
import { useAuth0 } from '@auth0/auth0-react';

export const ExperimentalXMCProvider = ({ children }) => {
  const [experimentalXMC, setExperimentalXMC] = useState(null);
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const init = async () => {
      if (isLoading || !isAuthenticated) return;

      const xmc = new EXPERIMENTAL_XMC({
        getAccessToken: () => getAccessTokenSilently(),
      });

      setExperimentalXMC(xmc);
    };

    init();
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  return (
    <ExperimentalXMCContext.Provider value={experimentalXMC}>
      {children}
    </ExperimentalXMCContext.Provider>
  );
};
```

**Using the Hook:**

```typescript
// src/components/ExperimentalXMCDemo.tsx
import { useExperimentalXMC } from '../features/client-sdk/hooks/useExperimentalXMC';

const ExperimentalXMCDemo = () => {
  const XMC = useExperimentalXMC();

  const handleSitesTest = async () => {
    const response = await XMC.sites.listLanguages({
      query: { sitecoreContextId: contextId },
    });
    console.log('Languages:', response.data);
  };

  return (
    <div>
      <button onClick={handleSitesTest}>Test Sites API</button>
    </div>
  );
};
```

## 🏪 Setting Up Your Sitecore Marketplace App

To test the `EXPERIMENTAL_XMC` package, you need to create a custom app with Standalone extension points:

1. **Create a Custom App**: Follow the [Sitecore Marketplace documentation](https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html) to create your custom app with Standalone extension points.

2. **Install the App**: Once created, install your app in your Sitecore environment.

3. **Get Context IDs**: After installation, you can use a regular standalone application that uses the Sitecore Client SDK. Using the Client SDK, you can use the `application.context` query to get context information temporarily, which provides the context IDs needed for the `EXPERIMENTAL_XMC` package.

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
