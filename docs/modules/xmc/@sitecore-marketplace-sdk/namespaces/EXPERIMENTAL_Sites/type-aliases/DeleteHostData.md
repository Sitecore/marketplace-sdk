[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / DeleteHostData

# Type Alias: DeleteHostData

> **DeleteHostData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2948](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2948)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2949](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2949)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2950](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2950)

#### hostId

> **hostId**: `string`

The identifier of the host.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2960](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2960)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### force?

> `optional` **force**: `boolean`

If this is set to true, the host will be deleted even if it is published to Edge.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/hosts/{hostId}"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2974](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2974)
