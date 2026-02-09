[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / CreateHostInput

# Type Alias: CreateHostInput

> **CreateHostInput** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:140](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L140)

A host creation request

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: [`AnalyticsIdentifier`](AnalyticsIdentifier.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:176](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L176)

The list of analytics tracker identifiers mapped to the host, per language.

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:168](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L168)

The identifier of the home page.
Example value: 110d559fdea542ea9c1c8a5df7e70ef9

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:153](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L153)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:183](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L183)

***

### name

> **name**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:145](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L145)

The name of the new host.
Example value: skate-park

***

### renderingHost?

> `optional` **renderingHost**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:163](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L163)

The rendering host.
Example value: Default

***

### settings?

> `optional` **settings**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:180](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L180)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:158](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L158)

The target hostname.
Example value: www.skate-park.com

***

### thumbnail?

> `optional` **thumbnail**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:172](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L172)

The thumbnail information.
