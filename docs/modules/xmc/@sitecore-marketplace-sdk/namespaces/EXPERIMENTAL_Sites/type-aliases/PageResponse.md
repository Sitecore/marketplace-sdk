[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / PageResponse

# Type Alias: PageResponse

> **PageResponse** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:729](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L729)

## Properties

### children?

> `optional` **children**: `PageResponse`[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:742](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L742)

Children of the page.

***

### displayName?

> `optional` **displayName**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:757](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L757)

The page's display name.
Example value: Site Home

***

### hasChildren?

> `optional` **hasChildren**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:787](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L787)

Whether the page has any child pages.
Example value: True

***

### hasPresentation?

> `optional` **hasPresentation**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:782](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L782)

If set to true, this page can be rendered in the SitecoreAI Pages application. This value is automatically set to false for the root item of the site, as well as for the folders if there are any.
Example value: True

***

### hasVersions?

> `optional` **hasVersions**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:738](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L738)

Whether the page has versions in the queried language.
Example value: True

***

### id?

> `optional` **id**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:747](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L747)

The page identifier.
Example value: 68900348a3b84eb8ac7df4d179c25727

***

### insertOptions?

> `optional` **insertOptions**: [`PageInsertOption`](PageInsertOption.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:733](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L733)

Insert options for the page.

***

### isLatestPublishableVersion?

> `optional` **isLatestPublishableVersion**: `boolean`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:792](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L792)

Whether the page version is latest publishable version
Example value: True

***

### language?

> `optional` **language**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:762](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L762)

The page language.
Example value: en-US

***

### locking?

> `optional` **locking**: [`PageLocking`](PageLocking.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:794](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L794)

***

### name?

> `optional` **name**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:752](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L752)

The page's system name.
Example value: Home

***

### parentId?

> `optional` **parentId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:777](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L777)

The identifier of the page's parent.
Example value: 4bc0c81a280b4b13890b7b074b9d68f4

***

### path?

> `optional` **path**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:799](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L799)

The path for the page.
Example value: Sitecore/Content/Home/Categories/Products/MyProduct

***

### permissions?

> `optional` **permissions**: [`Permissions`](Permissions.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:793](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L793)

***

### route?

> `optional` **route**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:804](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L804)

The public-facing URL path relative to the site's root.
Example value: /Aboutus

***

### templateId?

> `optional` **templateId**: `string` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:772](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L772)

The identifier of the template this page is based on.
Example value: 6fe7d6551e3d4c2780105777f06c6c4f

***

### version?

> `optional` **version**: `number`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:767](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L767)

The current version of the page.
Example value: 1
