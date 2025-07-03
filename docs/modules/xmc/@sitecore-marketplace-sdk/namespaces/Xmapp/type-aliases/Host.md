[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / Host

# Type Alias: Host

> **Host** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:251](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L251)

A host response entity

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:303](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L303)

The list of analytics tracker identifiers mapped to the host, per language.
Example value: [
{
"name": "skate-park",
"language": "en-US"
}
]

***

### created?

> `optional` **created**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:311](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L311)

The date when the host was created.
Example value: 2019-08-24T14:15:22Z

***

### createdBy?

> `optional` **createdBy**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:316](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L316)

The ID of the user who created the host.
Example value: L6kfw52ZVf

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:279](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L279)

The identifier of the home page.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:269](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L269)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:256](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L256)

The host ID.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:306](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L306)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:261](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L261)

The name of the site host.
Example value: skate-park

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:281](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L281)

***

### properties?

> `optional` **properties**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:291](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L291)

Readonly host properties collection.

***

### renderingHost?

> `optional` **renderingHost**: [`RenderingHost`](RenderingHost.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:280](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L280)

***

### settings?

> `optional` **settings**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:285](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L285)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:274](https://github.com/Sitecore/marketplace-sdk/blob/e3ec55ede335ad59ac5875d32f0d68c50e7bc899/packages/xmc/src/client-xmapp/types.gen.ts#L274)

The target hostname.
Example value: www.skate-park.com
