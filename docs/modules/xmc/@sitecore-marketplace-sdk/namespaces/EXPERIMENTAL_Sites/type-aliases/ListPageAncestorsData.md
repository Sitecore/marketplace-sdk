[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / ListPageAncestorsData

# Type Alias: ListPageAncestorsData

> **ListPageAncestorsData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2788](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2788)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2789](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2789)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2790](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2790)

#### pageId

> **pageId**: `string`

Page identifier.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2800](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2800)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### language?

> `optional` **language**: `string`

The ISO country-region language code for which to retrieve the ancestors, for example: en-US, ar-AE.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/hierarchy/{pageId}/ancestors"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2814](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2814)
