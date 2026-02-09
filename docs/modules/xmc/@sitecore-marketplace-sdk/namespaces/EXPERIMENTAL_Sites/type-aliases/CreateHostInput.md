[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / CreateHostInput

# Type Alias: CreateHostInput

> **CreateHostInput** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:155](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L155)

A host creation request

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: [`AnalyticsIdentifier`](AnalyticsIdentifier.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:197](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L197)

The list of analytics tracker identifiers mapped to the host, per language.

***

### editingHost?

> `optional` **editingHost**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:184](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L184)

The rendering host.
Example value: Default

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:189](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L189)

The identifier of the home page.
Example value: 110d559fdea542ea9c1c8a5df7e70ef9

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:168](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L168)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:204](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L204)

***

### name

> **name**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:160](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L160)

The name of the new host.
Example value: skate-park

***

### ~~renderingHost?~~

> `optional` **renderingHost**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:179](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L179)

The rendering host.
Example value: Default

#### Deprecated

***

### settings?

> `optional` **settings**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:201](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L201)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:173](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L173)

The target hostname.
Example value: www.skate-park.com

***

### thumbnail?

> `optional` **thumbnail**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:193](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L193)

The thumbnail information.
