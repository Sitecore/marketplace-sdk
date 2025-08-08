[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [ContentTransfer](../README.md) / SaveChunkData

# Type Alias: SaveChunkData

> **SaveChunkData** = `object`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:162](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L162)

## Properties

### body

> **body**: `Blob` \| `File`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:163](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L163)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:164](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L164)

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

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:178](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L178)

#### isMedia?

> `optional` **isMedia**: `boolean`

Indicates whether this chunk is media. Default is false.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/content/v1/transfers/{transferId}/chunksets/{chunksetId}/chunks/{chunkId}"`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:188](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L188)
