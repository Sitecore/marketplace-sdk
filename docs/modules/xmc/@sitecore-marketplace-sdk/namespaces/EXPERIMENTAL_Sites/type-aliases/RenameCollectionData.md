[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / RenameCollectionData

# Type Alias: RenameCollectionData

> **RenameCollectionData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2327](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2327)

## Properties

### body

> **body**: [`RenameSiteCollectionInput`](RenameSiteCollectionInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2331](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2331)

Input object containing the new system name of the site collection.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2332](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2332)

#### collectionId

> **collectionId**: `string`

The identifier of the site collection.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2338](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2338)

#### environmentId?

> `optional` **environmentId**: `string`

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/collections/{collectionId}/rename"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2345](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2345)
