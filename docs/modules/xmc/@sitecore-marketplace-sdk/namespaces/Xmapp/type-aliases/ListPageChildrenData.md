[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / ListPageChildrenData

# Type Alias: ListPageChildrenData

> **ListPageChildrenData** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2626](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2626)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2627](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2627)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2628](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2628)

#### pageId

> **pageId**: `string`

Page identifier.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2638](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2638)

#### language?

> `optional` **language**: `string`

The ISO country-region language code for which to retrieve the children, for example: en-US, ar-AE.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/hierarchy/{pageId}/children"`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2648](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L2648)
