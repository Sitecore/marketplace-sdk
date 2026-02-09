[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / UpdateHostInput

# Type Alias: UpdateHostInput

> **UpdateHostInput** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1396](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1396)

A host update request.

## Properties

### analyticsIdentifiers?

> `optional` **analyticsIdentifiers**: [`AnalyticsIdentifier`](AnalyticsIdentifier.md)[] \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1438](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1438)

The list of analytics tracker identifiers mapped to the host, per language.

***

### editingHost?

> `optional` **editingHost**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1425](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1425)

The rendering host.
Example value: Default

***

### homePageId?

> `optional` **homePageId**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1430](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1430)

The identifier of the home page.
Example value: 110d559fdea542ea9c1c8a5df7e70ef9

***

### hostnames?

> `optional` **hostnames**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1409](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1409)

One or more hostnames.
Example value: [
"dev.skate-park.com",
"uat.skate-park.com"
]

***

### languageSettings?

> `optional` **languageSettings**: [`SiteLanguageSettings`](SiteLanguageSettings.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1445](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1445)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1401](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1401)

Name of the host
Example value: skate-park

***

### ~~renderingHost?~~

> `optional` **renderingHost**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1420](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1420)

The rendering host.
Example value: Default

#### Deprecated

***

### settings?

> `optional` **settings**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1442](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1442)

The host settings collection.

***

### targetHostname?

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1414](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1414)

The target hostname.
Example value: www.skate-park.com

***

### thumbnail?

> `optional` **thumbnail**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1434](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1434)

The thumbnail information.
