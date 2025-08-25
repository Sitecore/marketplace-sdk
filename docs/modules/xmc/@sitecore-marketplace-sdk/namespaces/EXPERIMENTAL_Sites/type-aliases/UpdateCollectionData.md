[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / UpdateCollectionData

# Type Alias: UpdateCollectionData

> **UpdateCollectionData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1696](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1696)

## Properties

### body?

> `optional` **body**: [`UpdateSiteCollectionInput`](UpdateSiteCollectionInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1700](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1700)

Input data containing name and the description of the site collection

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1701](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1701)

#### collectionId

> **collectionId**: `string`

The identifier of the site collection.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1707](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1707)

#### environmentId?

> `optional` **environmentId**: `string`

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/collections/{collectionId}"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1714](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1714)
