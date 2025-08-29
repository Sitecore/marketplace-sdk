[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / Site

# Type Alias: Site

> **Site** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:901](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L901)

A site response entity.

## Properties

### brandKitId?

> `optional` **brandKitId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:947](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L947)

The identifier of the brand kit associated with this site.
Example value: e3f1c5a2-4b6d-4a3e-9f1b-2d3c4b5a6e7f

***

### collectionId?

> `optional` **collectionId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:927](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L927)

The identifier of the collection to which the site belongs.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### created?

> `optional` **created**: `string`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:932](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L932)

The date when the site was created.
Example value: 2019-08-24T14:15:22Z

***

### createdBy?

> `optional` **createdBy**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:937](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L937)

The ID of the user who created the site.
Example value: L6kfw52ZVf

***

### description?

> `optional` **description**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:916](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L916)

The description of the site.
Example value: New site for Brand A in English-speaking countries

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:921](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L921)

The display name of the site.
Example value: Skate Park Website

***

### errorPagesConfiguration?

> `optional` **errorPagesConfiguration**: [`ErrorPagesConfiguration`](ErrorPagesConfiguration.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:969](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L969)

***

### hosts?

> `optional` **hosts**: [`Host`](Host.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:960](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L960)

The list of hosts that the site resolves to.

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:906](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L906)

The identifier of the site.
Example value: 497f6eca-6276-4993-bfeb-53cbbbba6f08

***

### languages?

> `optional` **languages**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:956](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L956)

The list of languages in use by the site.
Example value: [
"en-US",
"en-CA"
]

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:911](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L911)

The name of the site.
Example value: skate-park

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:948](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L948)

***

### properties?

> `optional` **properties**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:979](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L979)

The read-only properties of the site.

***

### settings?

> `optional` **settings**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:973](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L973)

The settings for the site.

***

### sortOrder?

> `optional` **sortOrder**: `number` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:942](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L942)

Sort order of the site.
Example value: 100

***

### supportedLanguages?

> `optional` **supportedLanguages**: `string`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:968](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L968)

The list of languages supported by Sitecore.
Example value: [
"en-US",
"en-CA"
]

***

### thumbnail?

> `optional` **thumbnail**: [`Thumbnail`](Thumbnail.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:922](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L922)
