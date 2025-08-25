[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / UpdateSiteInput

# Type Alias: UpdateSiteInput

> **UpdateSiteInput** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1338](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1338)

A site update request.

## Properties

### brandKitId?

> `optional` **brandKitId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1372](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1372)

The identifier of the brand kit associated with this site.
Example value: e3f1c5a2-4b6d-4a3e-9f1b-2d3c4b5a6e7f

***

### description?

> `optional` **description**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1348](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1348)

The description for the site.
Example value: New site for Brand A in English-speaking countries.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1343](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1343)

The display name for the site.
Example value: Skate Park Site

***

### errorPages?

> `optional` **errorPages**: [`ErrorPages`](ErrorPages.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1362](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1362)

***

### resetThumbnail?

> `optional` **resetThumbnail**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1377](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1377)

Whether the thumbnail should be reset. True - thumbnail will be reset to automatic. False - thumbnail will not be reset.
Example value: True

***

### shared?

> `optional` **shared**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1361](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1361)

Whether the site should be marked as shared or not. True - site will be shared. False - site will not be marked as shared.
Example value: True

***

### sortOrder?

> `optional` **sortOrder**: `number` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1367](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1367)

The sort order of the site.
Example value: 100

***

### supportedLanguages?

> `optional` **supportedLanguages**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1356](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1356)

The list of languages supported by Sitecore.
Example value: [
"en-US",
"en-CA"
]
