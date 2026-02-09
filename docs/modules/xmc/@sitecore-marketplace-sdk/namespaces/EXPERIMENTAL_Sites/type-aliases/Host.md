[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / Host

# Type Alias: Host

> **Host** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:280](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L280)

A host response entity

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:332](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L332)

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

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:340](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L340)

The date when the host was created.
Example value: 2019-08-24T14:15:22Z

***

### createdBy?

> `optional` **createdBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:345](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L345)

The ID of the user who created the host.
Example value: L6kfw52ZVf

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:308](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L308)

The identifier of the home page.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:298](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L298)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:285](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L285)

The host ID.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:335](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L335)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:290](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L290)

The name of the site host.
Example value: skate-park

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:310](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L310)

***

### properties?

> `optional` **properties**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:320](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L320)

Readonly host properties collection.

***

### renderingHost?

> `optional` **renderingHost**: [`RenderingHost`](RenderingHost.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:309](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L309)

***

### settings?

> `optional` **settings**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:314](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L314)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:303](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L303)

The target hostname.
Example value: www.skate-park.com
