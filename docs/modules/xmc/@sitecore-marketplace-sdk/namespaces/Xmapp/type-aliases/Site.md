[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / Site

# Type Alias: Site

> **Site** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:854](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L854)

A site response entity.

## Properties

### brandKitId?

> `optional` **brandKitId**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:900](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L900)

The identifier of the brand kit associated with this site.
Example value: e3f1c5a2-4b6d-4a3e-9f1b-2d3c4b5a6e7f

***

### collectionId?

> `optional` **collectionId**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:880](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L880)

The identifier of the collection to which the site belongs.
Example value: 5aae1eeaea2440bf96f11f43da82c77b

***

### created?

> `optional` **created**: `string`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:885](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L885)

The date when the site was created.
Example value: 2019-08-24T14:15:22Z

***

### createdBy?

> `optional` **createdBy**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:890](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L890)

The ID of the user who created the site.
Example value: L6kfw52ZVf

***

### description?

> `optional` **description**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:869](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L869)

The description of the site.
Example value: New site for Brand A in English-speaking countries

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:874](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L874)

The display name of the site.
Example value: Skate Park Website

***

### errorPagesConfiguration?

> `optional` **errorPagesConfiguration**: [`ErrorPagesConfiguration`](ErrorPagesConfiguration.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:922](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L922)

***

### hosts?

> `optional` **hosts**: [`Host`](Host.md)[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:913](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L913)

The list of hosts that the site resolves to.

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:859](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L859)

The identifier of the site.
Example value: 497f6eca-6276-4993-bfeb-53cbbbba6f08

***

### languages?

> `optional` **languages**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:909](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L909)

The list of languages in use by the site.
Example value: [
"en-US",
"en-CA"
]

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:864](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L864)

The name of the site.
Example value: skate-park

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:901](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L901)

***

### properties?

> `optional` **properties**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:932](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L932)

The read-only properties of the site.

***

### settings?

> `optional` **settings**: \{[`key`: `string`]: `string`; \} \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:926](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L926)

The settings for the site.

***

### sortOrder?

> `optional` **sortOrder**: `number` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:895](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L895)

Sort order of the site.
Example value: 100

***

### supportedLanguages?

> `optional` **supportedLanguages**: `string`[] \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:921](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L921)

The list of languages supported by Sitecore.
Example value: [
"en-US",
"en-CA"
]

***

### thumbnail?

> `optional` **thumbnail**: [`Thumbnail`](Thumbnail.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:875](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L875)
