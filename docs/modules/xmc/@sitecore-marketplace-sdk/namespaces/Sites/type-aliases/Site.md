[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / Site

# Type Alias: Site

> **Site** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:973](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L973)

A site response entity.

## Properties

### brandKitId?

> `optional` **brandKitId**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1019](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1019)

The identifier of the brand kit associated with this site.
Example value: e3f1c5a2-4b6d-4a3e-9f1b-2d3c4b5a6e7f

***

### collectionId?

> `optional` **collectionId**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:999](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L999)

The identifier of the collection to which the site belongs.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### created?

> `optional` **created**: `string`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1004](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1004)

The date when the site was created.
Example value: 2019-08-24T14:15:22Z

***

### createdBy?

> `optional` **createdBy**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1009](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1009)

The ID of the user who created the site.
Example value: L6kfw52ZVf

***

### description?

> `optional` **description**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:988](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L988)

The description of the site.
Example value: New site for Brand A in English-speaking countries

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:993](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L993)

The display name of the site.
Example value: Skate Park Website

***

### errorPages?

> `optional` **errorPages**: [`ErrorPages`](ErrorPages.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1041](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1041)

***

### errorPagesConfiguration?

> `optional` **errorPagesConfiguration**: [`ErrorPagesConfiguration`](ErrorPagesConfiguration.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1042](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1042)

***

### hosts?

> `optional` **hosts**: [`Host`](Host.md)[] \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1032](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1032)

The list of hosts that the site resolves to.

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:978](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L978)

The identifier of the site.
Example value: 497f6eca-6276-4993-bfeb-53cbbbba6f08

***

### languages?

> `optional` **languages**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1028](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1028)

The list of languages in use by the site.
Example value: [
"en-US",
"en-CA"
]

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:983](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L983)

The name of the site.
Example value: skate-park

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1020](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1020)

***

### properties?

> `optional` **properties**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1052](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1052)

The read-only properties of the site.

***

### settings?

> `optional` **settings**: \{\[`key`: `string`\]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1046](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1046)

The settings for the site.

***

### sortOrder?

> `optional` **sortOrder**: `number` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1014](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1014)

Sort order of the site.
Example value: 100

***

### supportedLanguages?

> `optional` **supportedLanguages**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1040](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1040)

The list of languages supported by Sitecore.
Example value: [
"en-US",
"en-CA"
]

***

### thumbnail?

> `optional` **thumbnail**: [`Thumbnail`](Thumbnail.md)

Defined in: [packages/xmc/src/client-sites/types.gen.ts:994](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L994)
