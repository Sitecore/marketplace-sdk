# Sitecore Marketplace SDK - `xmc` package

The `xmc` package extends the Client SDK and provides type-safe interfaces for interacting with the following Sitecore XM Cloud APIs:
-   [Authoring and Management GraphQL API](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-authoring-and-management-graphql-api.html) - to manage Sitecore content using GraphQL.
-   [Pages API](https://api-docs.sitecore.com/sai/pages-api) - to manage site pages in SitecoreAI.
  - [Sites API](https://api-docs.sitecore.com/sai/sites-api) - to manage site collections, sites, languages and running background jobs.
-   [Experience Edge Token API](https://doc.sitecore.com/xmc/en/developers/xm-cloud/experience-edge-for-xm-apis.html) - to manage API keys for the Delivery API.
-   [Experience Edge Admin API](https://doc.sitecore.com/xmc/en/developers/xm-cloud/experience-edge-for-xm-apis.html) - to administer your Edge tenant.

## Prerequisites
- Node.js 16 or later. Check your installed version by using the `node --version` command.
- npm 10 or later. Check your installed version by using the `npm --version` command.
- An XM Cloud subscription.

## Installation

```bash
npm install @sitecore-marketplace-sdk/xmc
```

## Initialization
Before you use queries or mutations, you must initialize the XMC module.

1. Update the code where you initialized the Client SDK by importing `XMC` and adding it to `config`:

```typescript
// utils/hooks/useMarketplaceClient.ts
import { XMC } from '@sitecore-marketplace-sdk/xmc';

// ...
const config = {
  // ...
  modules: [XMC] // Extend Client SDK with `XMC`
};
```

## Usage
### Make a query
Use the `query` method to make one-off data requests and live subscriptions. Pass a value to the method depending on the data you want to retrieve. For example, pass `'sai.sites.listSites'` to retrieve a list of sites:

```typescript
client.query("sai.sites.listSites", {
   params: {
        query: {
          sitecoreContextId,
        },
      },
})
  .then((res) => {
    console.log(
      "Success retrieving sai.sites.listSites:",
      res.data
    );
  })
  .catch((error) => {
    console.error(
      "Error retrieving sai.sites.listSites:",
      error
    );
});
```

For an overview of all the possible values, refer to the [`QueryMap` interface](../../docs/xmc/interfaces/QueryMap.md).

### Make a mutation
Use the `mutate` method to trigger changes in Sitecore (the host). Pass a value to the method depending on the change you want to make.

For example, to open a different page in the XM Cloud Page builder in response to some other action:

```typescript
const openDifferentPage = () => {
  client?.mutate("pages.context", {
    params: {
      itemId: "<ID_OF_NEW_PAGE>",
    },
  });
};
```

For an overview of all the possible values, refer to the [`MutationMap` interface](../../docs/xmc/interfaces/MutationMap.md).

> [!NOTE]
> Behind the scenes, the Host SDK (integrated via the internal `core` package) attaches the required user token and performs the HTTP request on behalf of the Marketplace app (the client).

## Documentation

For more information, refer to the reference documentation in the `/docs` folder.

## License 
This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License. Refer to the [LICENSE](../../LICENSE.md) file in the repository root.

## Status
The `client` package is actively maintained as part of the Sitecore Marketplace SDK.
