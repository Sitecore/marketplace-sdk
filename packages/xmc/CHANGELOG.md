# @sitecore-marketplace-sdk/xmc

## 0.2.1

### Patch Changes

- fec9f87: # experimental_XMC

  ## 🚀 What's New

  ### Server-to-Server Support

  experimental_XMC enables API access to Sitecore APIs without requiring the Client SDK mode. Perfect for server-side applications that need to communicate with Sitecore APIs.

  ### Setup

  ```typescript
  import { experimental_createXMCClient } from '@sitecore-marketplace-sdk/xmc';

  // No Host SDK required
  const xmc = await experimental_createXMCClient({
    getAccessToken: () => auth0.getAccessTokenSilently(),
  });
  ```

  ### Enhanced Type Safety

  ```typescript
  import { experimental_Sites } from '@sitecore-marketplace-sdk/xmc';

  // Optional: Full IntelliSense support with types
  const response = await xmc.sites.listLanguages();
  let data: experimental_Sites.ListLanguagesResponse = response.data!;
  ```

  ## 🎯 Quick Start - Server-to-Server

  ### 1. Install and Import

  ```typescript
  import { experimental_createXMCClient } from '@sitecore-marketplace-sdk/xmc';
  // Optional: import types for enhanced IntelliSense
  import { experimental_Sites } from '@sitecore-marketplace-sdk/xmc';
  ```

  ### 2. Initialize with Auth

  ```typescript
  const xmc = await experimental_createXMCClient({
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
  const xmc = await experimental_createXMCClient({
    getAccessToken: () => getServerSideToken(),
  });

  // Direct API calls without browser context
  const languages = await xmc.sites.listLanguages();
  ```

  ## 🎨 Optional Type Support

  For enhanced IntelliSense, you can optionally import type namespaces:

  - `experimental_Sites.*` - Sites API types
  - `experimental_Pages.*` - Pages API types
  - `experimental_Authoring.*` - Authoring API types
  - `experimental_ContentTransfer.*` - Content Transfer API types
  - `experimental_Content.*` - Content API types

## 0.2.0

### Minor Changes

- ff3ca07: Update XMC SDK to support new extensionPoint naming conventions

  **Compatibility Update:**

  - Updated to work with new extensionPoint interfaces from core SDK
  - Maintains full backward compatibility with existing touchpoint-based code
  - No breaking changes to XMC-specific functionality

  **What changed:**

  - Updated dependencies to support new extensionPoint types
  - Enhanced type compatibility for both old and new naming conventions
  - Maintained all XMC-specific functionality while supporting new interface names

### Patch Changes

- Updated dependencies [ff3ca07]
  - @sitecore-marketplace-sdk/client@0.2.0

## 0.1.7

### Patch Changes

- 90aaa94: XMC package now includes exported types for query and mutation requests and responses.

## 0.1.4

### Patch Changes

- Updated dependencies [d385577]
- Updated dependencies [7f64b54]
- Updated dependencies [b48590c]
- Updated dependencies [da1106f]
  - @sitecore-marketplace-sdk/client@0.1.4

## 0.1.2

### Patch Changes

- Updated dependencies [a90ac03]
- Updated dependencies [8ac41c9]
- Updated dependencies [5360a88]
- Updated dependencies [a90ac03]
  - @sitecore-marketplace-sdk/client@0.1.2
