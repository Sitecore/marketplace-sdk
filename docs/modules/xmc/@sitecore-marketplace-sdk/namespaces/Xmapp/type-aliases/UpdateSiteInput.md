[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / UpdateSiteInput

# Type Alias: UpdateSiteInput

> **UpdateSiteInput** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1284](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1284)

A site update request.

## Properties

### brandKitId?

> `optional` **brandKitId**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1318](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1318)

The identifier of the brand kit associated with this site.
Example value: e3f1c5a2-4b6d-4a3e-9f1b-2d3c4b5a6e7f

***

### description?

> `optional` **description**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1294](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1294)

The description for the site.
Example value: New site for Brand A in English-speaking countries.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1289](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1289)

The display name for the site.
Example value: Skate Park Site

***

### errorPages?

> `optional` **errorPages**: [`ErrorPages`](ErrorPages.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1308](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1308)

***

### shared?

> `optional` **shared**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1307](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1307)

Indicates if the site should be marked as shared or not. True - site will be shared. False - site will not be marked as shared.
Example value: True

***

### sortOrder?

> `optional` **sortOrder**: `number` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1313](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1313)

The sort order of the site.
Example value: 100

***

### supportedLanguages?

> `optional` **supportedLanguages**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1302](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1302)

The list of languages supported by Sitecore.
Example value: [
"en-US",
"en-CA"
]
