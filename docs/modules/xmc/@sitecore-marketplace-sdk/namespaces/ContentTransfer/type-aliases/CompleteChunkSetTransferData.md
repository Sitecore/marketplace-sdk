[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [ContentTransfer](../README.md) / CompleteChunkSetTransferData

# Type Alias: CompleteChunkSetTransferData

> **CompleteChunkSetTransferData** = `object`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:210](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L210)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:211](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L211)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:212](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L212)

#### chunksetId

> **chunksetId**: `string`

ID of the chunk set.

#### transferId

> **transferId**: `string`

ID of the transfer.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:222](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L222)

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/content/v1/transfers/{transferId}/chunksets/{chunksetId}/complete"`

Defined in: [packages/xmc/src/client-content-transfer/types.gen.ts:228](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-content-transfer/types.gen.ts#L228)
