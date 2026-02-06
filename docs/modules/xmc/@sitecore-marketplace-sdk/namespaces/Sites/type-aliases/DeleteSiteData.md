[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / DeleteSiteData

# Type Alias: DeleteSiteData

> **DeleteSiteData** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2646](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2646)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2647](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2647)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2648](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2648)

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2654](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2654)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### force?

> `optional` **force**: `boolean`

If this is set to true, the site will be deleted even if it is published to Edge.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}"`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2668](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2668)
