[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / RenameSiteData

# Type Alias: RenameSiteData

> **RenameSiteData** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2808](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2808)

## Properties

### body

> **body**: [`RenameSiteInput`](RenameSiteInput.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2812](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2812)

Input object containing new name of the site

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2813](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2813)

#### siteId

> **siteId**: `string`

The identifier of the site you want to rename.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2819](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2819)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/rename"`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:2829](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L2829)
