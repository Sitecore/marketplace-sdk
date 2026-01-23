[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / DeleteHostData

# Type Alias: DeleteHostData

> **DeleteHostData** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3293](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3293)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3294](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3294)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3295](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3295)

#### hostId

> **hostId**: `string`

The identifier of the host.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3305](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3305)

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

Defined in: [packages/xmc/src/client-sites/types.gen.ts:3319](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L3319)
