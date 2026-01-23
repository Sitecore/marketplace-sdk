[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / RetrievePageHierarchyData

# Type Alias: RetrievePageHierarchyData

> **RetrievePageHierarchyData** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3085](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3085)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3086](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3086)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3087](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3087)

#### pageId

> **pageId**: `string`

Page identifier.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3097](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3097)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### language?

> `optional` **language**: `string`

The ISO country-region language code for which to retrieve the hierarchy, for example: en-US, ar-AE.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/hierarchy/{pageId}"`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3111](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3111)
