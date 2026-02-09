[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / UpdateHostInput

# Type Alias: UpdateHostInput

> **UpdateHostInput** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1270](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1270)

A host update request.

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: [`AnalyticsIdentifier`](AnalyticsIdentifier.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1306](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1306)

The list of analytics tracker identifiers mapped to the host, per language.

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1298](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1298)

The identifier of the home page.
Example value: 110d559fdea542ea9c1c8a5df7e70ef9

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1283](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1283)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1313](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1313)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1275](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1275)

Name of the host
Example value: skate-park

***

### renderingHost?

> `optional` **renderingHost**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1293](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1293)

The rendering host.
Example value: Default

***

### settings?

> `optional` **settings**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1310](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1310)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1288](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1288)

The target hostname.
Example value: www.skate-park.com

***

### thumbnail?

> `optional` **thumbnail**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1302](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1302)

The thumbnail information.
