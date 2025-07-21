[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / DeleteHostData

# Type Alias: DeleteHostData

> **DeleteHostData** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2731](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L2731)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2732](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L2732)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2733](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L2733)

#### hostId

> **hostId**: `string`

The identifier of the host.

#### siteId

> **siteId**: `string`

The identifier of the site.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2743](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L2743)

#### force?

> `optional` **force**: `boolean`

If this is set to true, the host will be deleted even if it is published to Edge.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/{siteId}/hosts/{hostId}"`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2753](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L2753)
