[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / RetrieveSiteHierarchyData

# Type Alias: RetrieveSiteHierarchyData

> **RetrieveSiteHierarchyData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2696](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2696)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2697](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2697)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2698](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2698)

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2704](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2704)

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

> **url**: `"/api/v1/sites/{siteId}/hierarchy"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2718](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2718)
