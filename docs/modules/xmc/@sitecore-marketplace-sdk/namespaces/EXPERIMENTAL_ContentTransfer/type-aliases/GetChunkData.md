[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_ContentTransfer](../README.md) / GetChunkData

# Type Alias: GetChunkData

> **GetChunkData** = `object`

Defined in: [packages/xmc/src/experimental/client-content-transfer/types.gen.ts:117](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-content-transfer/types.gen.ts#L117)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-content-transfer/types.gen.ts:118](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-content-transfer/types.gen.ts#L118)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-content-transfer/types.gen.ts:119](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-content-transfer/types.gen.ts#L119)

#### chunkId

> **chunkId**: `number`

Id of the chunk.

#### chunksetId

> **chunksetId**: `string`

ID of the chunk set.

#### transferId

> **transferId**: `string`

ID of the transfer.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-content-transfer/types.gen.ts:133](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-content-transfer/types.gen.ts#L133)

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/content/v1/transfers/{transferId}/chunksets/{chunksetId}/chunks/{chunkId}"`

Defined in: [packages/xmc/src/experimental/client-content-transfer/types.gen.ts:139](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-content-transfer/types.gen.ts#L139)
