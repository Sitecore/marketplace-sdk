[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / ListPageChildrenData

# Type Alias: ListPageChildrenData

> **ListPageChildrenData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2831](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2831)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2832](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2832)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2833](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2833)

#### pageId

> **pageId**: `string`

Page identifier.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2843](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2843)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### language?

> `optional` **language**: `string`

The ISO country-region language code for which to retrieve the children, for example: en-US, ar-AE.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/hierarchy/{pageId}/children"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2857](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2857)
