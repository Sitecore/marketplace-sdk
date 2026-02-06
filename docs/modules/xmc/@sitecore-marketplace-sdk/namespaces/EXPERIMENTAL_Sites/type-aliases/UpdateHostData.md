[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / UpdateHostData

# Type Alias: UpdateHostData

> **UpdateHostData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3380](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3380)

## Properties

### body

> **body**: [`UpdateHostInput`](UpdateHostInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3384](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3384)

New parameter values for the host.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3385](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3385)

#### hostId

> **hostId**: `string`

The identifier of the host.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3395](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3395)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/hosts/{hostId}"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3405](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3405)
