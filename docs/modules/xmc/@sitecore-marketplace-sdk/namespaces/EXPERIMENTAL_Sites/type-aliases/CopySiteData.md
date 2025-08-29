[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / CopySiteData

# Type Alias: CopySiteData

> **CopySiteData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2422](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2422)

## Properties

### body

> **body**: [`CopySiteInput`](CopySiteInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2426](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2426)

Input object containing the name and description of the new site

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2427](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2427)

#### siteId

> **siteId**: `string`

The identifier of the site you want to duplicate.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2433](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2433)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/copy"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2443](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2443)
