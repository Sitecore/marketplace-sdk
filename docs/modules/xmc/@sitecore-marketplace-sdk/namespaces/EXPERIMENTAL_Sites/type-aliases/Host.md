[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / Host

# Type Alias: Host

> **Host** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:356](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L356)

A host response entity

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:409](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L409)

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

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:417](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L417)

The date when the host was created.
Example value: 2019-08-24T14:15:22Z

***

### createdBy?

> `optional` **createdBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:422](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L422)

The ID of the user who created the host.
Example value: L6kfw52ZVf

***

### editingHost?

> `optional` **editingHost**: [`EditingHost`](EditingHost.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:386](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L386)

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:384](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L384)

The identifier of the home page.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:374](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L374)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:361](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L361)

The host ID.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:412](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L412)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:366](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L366)

The name of the site host.
Example value: skate-park

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:387](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L387)

***

### properties?

> `optional` **properties**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:397](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L397)

Readonly host properties collection.

***

### renderingHost?

> `optional` **renderingHost**: [`RenderingHost`](RenderingHost.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:385](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L385)

***

### settings?

> `optional` **settings**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:391](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L391)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:379](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L379)

The target hostname.
Example value: www.skate-park.com
