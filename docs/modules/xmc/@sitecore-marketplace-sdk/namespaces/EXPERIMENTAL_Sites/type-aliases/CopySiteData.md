[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / CopySiteData

# Type Alias: CopySiteData

> **CopySiteData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2767](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2767)

## Properties

### body

> **body**: [`CopySiteInput`](CopySiteInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2771](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2771)

Input object containing the name and description of the new site

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2772](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2772)

#### siteId

> **siteId**: `string`

The identifier of the site you want to duplicate.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2778](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2778)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/copy"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2788](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2788)
