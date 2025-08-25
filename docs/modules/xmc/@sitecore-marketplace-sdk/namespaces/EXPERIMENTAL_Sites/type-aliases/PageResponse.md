[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / PageResponse

# Type Alias: PageResponse

> **PageResponse** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:657](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L657)

## Properties

### children?

> `optional` **children**: `PageResponse`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:670](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L670)

Children of the page.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:685](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L685)

The page's display name.
Example value: Site Home

***

### hasChildren?

> `optional` **hasChildren**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:715](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L715)

Whether the page has any child pages.
Example value: True

***

### hasPresentation?

> `optional` **hasPresentation**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:710](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L710)

If set to true, this page can be rendered in the XM Cloud Pages application. This value is automatically set to false for the root item of the site, as well as for the folders if there are any.
Example value: True

***

### hasVersions?

> `optional` **hasVersions**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:666](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L666)

Whether the page has versions in the queried language.
Example value: True

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:675](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L675)

The page identifier.
Example value: 68900348a3b84eb8ac7df4d179c25727

***

### insertOptions?

> `optional` **insertOptions**: [`PageInsertOption`](PageInsertOption.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:661](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L661)

Insert options for the page.

***

### isLatestPublishableVersion?

> `optional` **isLatestPublishableVersion**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:720](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L720)

Whether the page version is latest publishable version
Example value: True

***

### language?

> `optional` **language**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:690](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L690)

The page language.
Example value: en-US

***

### locking?

> `optional` **locking**: [`PageLocking`](PageLocking.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:722](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L722)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:680](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L680)

The page's system name.
Example value: Home

***

### parentId?

> `optional` **parentId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:705](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L705)

The identifier of the page's parent.
Example value: 4bc0c81a280b4b13890b7b074b9d68f4

***

### path?

> `optional` **path**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:727](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L727)

The path for the page.
Example value: Sitecore/Content/Home/Categories/Products/MyProduct

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:721](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L721)

***

### route?

> `optional` **route**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:732](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L732)

The public-facing URL path relative to the site's root.
Example value: /Aboutus

***

### templateId?

> `optional` **templateId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:700](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L700)

The identifier of the template this page is based on.
Example value: 6fe7d6551e3d4c2780105777f06c6c4f

***

### version?

> `optional` **version**: `number`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:695](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L695)

The current version of the page.
Example value: 1
