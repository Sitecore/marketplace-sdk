# Sitecore Marketplace SDK - `client` package

The `client` package provides secure, bidirectional communication between a Marketplace application (the client) and Sitecore (the host). Sitecore loads the Marketplace app inside a sandboxed [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe). The iframe and its parent window securely communicate using the web browser's [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

This package lets you:
- Make queries. Queries support one-off data requests and subscriptions for live updates. The `client` package lets you query the host's state and environment, and the [context](#query-the-application-context) of your Marketplace app.
- Make mutations. Mutations trigger state changes or HTTP requests in Sitecore.
- Interact with Sitecore APIs to perform actions on behalf of the resources it was granted access to during installation.
  > [!TIP]
  > Inspired by GraphQL and React Query, the query/mutation API manages internal state, loading status, and error handling.

The `client` package is required for all Marketplace apps.

## Prerequisites
- Node.js 16 or later. Check your installed version by using the `node --version` command.
- npm 10 or later. Check your installed version by using the `npm --version` command.
- Access to the Sitecore Cloud Portal.

## Installation

```bash
npm install @sitecore-marketplace-sdk/client
```

## Initialization

Before you use queries or mutations, you must initialize the Client SDK.

1. Create a hook that will handle the initialization:

```typescript
// utils/hooks/useMarketplaceClient.ts

import { ClientSDK } from "@sitecore-marketplace-sdk/client";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

export interface MarketplaceClientState {
  client: ClientSDK | null;
  error: Error | null;
  isLoading: boolean;
  isInitialized: boolean;
}

export interface UseMarketplaceClientOptions {
  /**
   * Number of retry attempts when initialization fails
   * @default 3
   */
  retryAttempts?: number;

  /**
   * Delay between retry attempts in milliseconds
   * @default 1000
   */
  retryDelay?: number;

  /**
   * Whether to automatically initialize the client
   * @default true
   */
  autoInit?: boolean;
}

const DEFAULT_OPTIONS: Required<UseMarketplaceClientOptions> = {
  retryAttempts: 3,
  retryDelay: 1000,
  autoInit: true,
};

let client: ClientSDK | undefined = undefined;

async function getMarketplaceClient() {
  if (client) {
    return client;
  }

  const config = {
    target: window.parent,
  };

  client = await ClientSDK.init(config);
  return client;
}

export function useMarketplaceClient(options: UseMarketplaceClientOptions = {}) {
  // Memoize the options to prevent unnecessary re-renders
  const opts = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [
    options,
  ]);

  const [state, setState] = useState<MarketplaceClientState>({
    client: null,
    error: null,
    isLoading: false,
    isInitialized: false,
  });

  // Use ref to track if we're currently initializing to prevent race conditions
  const isInitializingRef = useRef(false);

  const initializeClient = useCallback(async (attempt = 1): Promise<void> => {
    // Use functional state update to check current state without dependencies
    let shouldProceed = false;
    setState(prev => {
      if (prev.isLoading || prev.isInitialized || isInitializingRef.current) {
        return prev;
      }
      shouldProceed = true;
      isInitializingRef.current = true;
      return { ...prev, isLoading: true, error: null };
    });

    if (!shouldProceed) return;

    try {
      const client = await getMarketplaceClient();
      setState({
        client,
        error: null,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      if (attempt < opts.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, opts.retryDelay));
        return initializeClient(attempt + 1);
      }

      setState({
        client: null,
        error: error instanceof Error ? error : new Error('Failed to initialize MarketplaceClient'),
        isLoading: false,
        isInitialized: false,
      });
    } finally {
      isInitializingRef.current = false;
    }
  }, [opts.retryAttempts, opts.retryDelay]); // Removed state dependencies

  useEffect(() => {
    if (opts.autoInit) {
      initializeClient();
    }

    return () => {
      isInitializingRef.current = false;
      setState({
        client: null,
        error: null,
        isLoading: false,
        isInitialized: false,
      });
    };
  }, [opts.autoInit, initializeClient]);

  // Memoize the return value to prevent object recreation on every render
  return useMemo(() => ({
    ...state,
    initialize: initializeClient,
  }), [state, initializeClient]);
}
```

2. Initialize the SDK:
```typescript
// src/pages/index.tsx

import { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function App() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      console.log("Marketplace client initialized successfully.");

      // Make a query to retrieve the application context
      client.query("application.context")
        .then((res) => {
          console.log("Success retrieving application.context:", res.data);
          setAppContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving application.context:", error);
        });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

  return (
    <>
      <h1>Welcome to {appContext?.name}</h1>
    </>
  );
}

export default App;
```


## Usage

### Make a query

Use the `query` method to make one-off data requests and live subscriptions. Pass a value to the method depending on the data you want to retrieve.

For example, pass `'application.context'` to retrieve details about the Marketplace app and the Sitecore host, including, for example, your Context IDs:

```typescript
client.query("application.context")
  .then((res) => {
    console.log("Success retrieving application.context:", res.data);
    setAppContext(res.data);
  })
  .catch((error) => {
    console.error("Error retrieving application.context:", error);
});
```

The application context provides information about your Marketplace app, such as its ID, URL, name, type, icon URL, installation ID, and associated resources:

```javascript
{
   id: 'my-app-id',
   name: 'My App',
   type: 'portal',
   url: 'https://my-app.com/app',
   iconUrl: 'https://my-app.com/assets/icon.png',
   installationId: 'abc1234567890',
   resources: [
     {
       resourceId: 'resource-1',
       tenantId: 'tenant-1',
       tenantName: 'Example Tenant',
       context: {
         live: '1234567890', 
         preview: '0987654321'
       }
     }
   ]
}
```

For an overview of all the possible values, refer to the [`QueryMap` interface](../../docs/client/interfaces/QueryMap.md).

### Make a mutation

Use the `mutate` method to trigger changes in Sitecore (the host). Pass a value to the method depending on the change you want to make. 

For example, pass `'pages.reloadCanvas'` to reload the XM Cloud page builder canvas:

```typescript
const reloadCanvas = () => {
  client?.mutate("pages.reloadCanvas");
};
```

For an overview of all the possible values, refer to the [`MutationMap` interface](../../docs/client/interfaces/MutationMap.md).

> [!NOTE]
> Behind the scenes, the Host SDK (integrated via the internal `core` package) attaches the required user token and performs the HTTP request on behalf of the Marketplace app (the client).

## Documentation

For more information, refer to the reference documentation in the `/docs` folder, and the official [Marketplace developer documentation](https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html) and [Marketplace SDK documentation](https://doc.sitecore.com/mp/en/developers/sdk/latest/sitecore-marketplace-sdk/sitecore-marketplace-sdk-for-javascript.html).

## License 
This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License. Refer to the [LICENSE](../../LICENSE.md) file in the repository root.

## Status
The `client` package is actively maintained as part of the Sitecore Marketplace SDK.
