[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / UpdateHostInput

# Type Alias: UpdateHostInput

> **UpdateHostInput** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1216](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1216)

A host update request.

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: [`AnalyticsIdentifier`](AnalyticsIdentifier.md)[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1252](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1252)

The list of analytics tracker identifiers mapped to the host, per language.

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1244](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1244)

The identifier of the home page.
Example value: 110d559fdea542ea9c1c8a5df7e70ef9

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1229](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1229)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1259](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1259)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1221](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1221)

Name of the host
Example value: skate-park

***

### renderingHost?

> `optional` **renderingHost**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1239](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1239)

The rendering host.
Example value: Default

***

### settings?

> `optional` **settings**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1256](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1256)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1234](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1234)

The target hostname.
Example value: www.skate-park.com

***

### thumbnail?

> `optional` **thumbnail**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1248](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1248)

The thumbnail information.
