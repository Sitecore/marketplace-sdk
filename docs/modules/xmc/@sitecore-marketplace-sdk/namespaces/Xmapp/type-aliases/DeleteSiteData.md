[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / DeleteSiteData

# Type Alias: DeleteSiteData

> **DeleteSiteData** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2148](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2148)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2149](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2149)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2150](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2150)

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2156](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2156)

#### force?

> `optional` **force**: `boolean`

If this is set to true, the site will be deleted even if it is published to Edge.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}"`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2166](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2166)
