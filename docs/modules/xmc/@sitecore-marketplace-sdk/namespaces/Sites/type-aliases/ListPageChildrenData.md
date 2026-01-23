[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / ListPageChildrenData

# Type Alias: ListPageChildrenData

> **ListPageChildrenData** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3176](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3176)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3177](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3177)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3178](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3178)

#### pageId

> **pageId**: `string`

Page identifier.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3188](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3188)

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

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3202](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3202)
