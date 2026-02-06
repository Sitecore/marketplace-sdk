[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / UpdateSiteInput

# Type Alias: UpdateSiteInput

> **UpdateSiteInput** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1470](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1470)

A site update request.

## Properties

### brandKitId?

> `optional` **brandKitId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1510](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1510)

The identifier of the brand kit associated with this site.
Example value: e3f1c5a2-4b6d-4a3e-9f1b-2d3c4b5a6e7f

***

### description?

> `optional` **description**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1480](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1480)

The description for the site.
Example value: New site for Brand A in English-speaking countries.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1475](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1475)

The display name for the site.
Example value: Skate Park Site

***

### editorProfiles?

> `optional` **editorProfiles**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1523](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1523)

The list of text editor profiles associated with the site.
Example value: [
"e2102e93-424a-4a99-a066-7750dbf41b28",
"530f7907-6eec-4b7a-9fcc-98aef2719232"
]

***

### errorPages?

> `optional` **errorPages**: [`ErrorPages`](ErrorPages.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1494](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1494)

***

### resetThumbnail?

> `optional` **resetThumbnail**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1515](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1515)

Whether the thumbnail should be reset. True - thumbnail will be reset to automatic. False - thumbnail will not be reset.
Example value: True

***

### shared?

> `optional` **shared**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1493](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1493)

Whether the site should be marked as shared or not. True - site will be shared. False - site will not be marked as shared.
Example value: True

***

### sortOrder?

> `optional` **sortOrder**: `number` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1499](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1499)

The sort order of the site.
Example value: 100

***

### supportedLanguages?

> `optional` **supportedLanguages**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1488](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1488)

The list of languages supported by Sitecore.
Example value: [
"en-US",
"en-CA"
]

***

### ~~targetHostname?~~

> `optional` **targetHostname**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1505](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1505)

The target hostname of the site.
Example value: skatepark.local

#### Deprecated
