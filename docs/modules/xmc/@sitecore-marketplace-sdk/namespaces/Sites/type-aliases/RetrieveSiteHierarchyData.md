[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / RetrieveSiteHierarchyData

# Type Alias: RetrieveSiteHierarchyData

> **RetrieveSiteHierarchyData** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3041](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3041)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3042](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3042)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3043](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3043)

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3049](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3049)

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

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3063](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3063)
