[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / RenameCollectionData

# Type Alias: RenameCollectionData

> **RenameCollectionData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1982](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1982)

## Properties

### body

> **body**: [`RenameSiteCollectionInput`](RenameSiteCollectionInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1986](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1986)

Input object containing the new system name of the site collection.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1987](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1987)

#### collectionId

> **collectionId**: `string`

The identifier of the site collection.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1993](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1993)

#### environmentId?

> `optional` **environmentId**: `string`

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/collections/{collectionId}/rename"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2000](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2000)
