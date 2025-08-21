---
'@sitecore-marketplace-sdk/xmc': patch
---

# Experimental XMC - Server-to-Server API Access

## 🚀 What's New

### Server-to-Server Support

EXPERIMENTAL_XMC enables API access to Sitecore APIs without requiring the Host SDK or Client SDK mode. Perfect for server-side applications that need to communicate with Sitecore APIs.

### Setup

```typescript
import { EXPERIMENTAL_XMC } from '@sitecore-marketplace-sdk/xmc';

// No Host SDK required
const xmc = new EXPERIMENTAL_XMC({
  getAccessToken: () => auth0.getAccessTokenSilently(),
});
```

### Enhanced Type Safety

```typescript
import { EXPERIMENTAL_Sites } from '@sitecore-marketplace-sdk/xmc';

// Optional: Full IntelliSense support with types
const response = await xmc.sites.listLanguages();
let data: EXPERIMENTAL_Sites.ListLanguagesResponse = response.data!;
```

## 🎯 Quick Start - Server-to-Server

### 1. Install and Import

```typescript
import { EXPERIMENTAL_XMC } from '@sitecore-marketplace-sdk/xmc';
// Optional: import types for enhanced IntelliSense
import { EXPERIMENTAL_Sites } from '@sitecore-marketplace-sdk/xmc';
```

### 2. Initialize with Auth

```typescript
const xmc = new EXPERIMENTAL_XMC({
  getAccessToken: () => auth0.getAccessTokenSilently(),
});
```

### 3. Use APIs

```typescript
// Sites API
const languages = await xmc.sites.listLanguages({
  query: { sitecoreContextId: 'your-context-id' },
});

// Pages API
const pages = await xmc.pages.search({
  query: { sitecoreContextId: 'your-context-id' },
});

// Authoring API
const result = await xmc.authoring.graphql({
  body: {
    query: `query {
      sites {
        name
      }
    }`,
  },
  query: { sitecoreContextId: 'your-context-id' },
});

// Content Transfer API
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

// Preview API
const previewContent = await xmc.preview.graphql({
  body: {
    query: `query {
      item(path: "/sitecore/content/Home", language: "en") {
        id
        name
        path
        fields {
          name
          value
        }
      }
    }`,
  },
  query: { sitecoreContextId: 'your-context-id' },
});

// Live API
const liveContent = await xmc.live.graphql({
  body: {
    query: `query {
      item(path: "/sitecore/content/Home", language: "en") {
        id
        name
        path
        fields {
          name
          value
        }
      }
    }`,
  },
  query: { sitecoreContextId: 'your-context-id' },
});
```

## 🔧 Use Cases

### Server-Side Applications

```typescript
// Node.js server, Azure Functions, AWS Lambda, etc.
const xmc = new EXPERIMENTAL_XMC({
  getAccessToken: () => getServerSideToken(),
});

// Direct API calls without browser context
const languages = await xmc.sites.listLanguages();
```

## 🎨 Optional Type Support

For enhanced IntelliSense, you can optionally import type namespaces:

- `EXPERIMENTAL_Sites.*` - Sites API types
- `EXPERIMENTAL_Pages.*` - Pages API types
- `EXPERIMENTAL_Authoring.*` - Authoring API types
- `EXPERIMENTAL_ContentTransfer.*` - Content Transfer API types
- `EXPERIMENTAL_Content.*` - Content API types
