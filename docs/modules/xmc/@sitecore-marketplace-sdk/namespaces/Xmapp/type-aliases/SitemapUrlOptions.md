[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / SitemapUrlOptions

# Type Alias: SitemapUrlOptions

> **SitemapUrlOptions** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1108](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1108)

URL property configurations in the sitemap.

## Properties

### includeChangeFreq?

> `optional` **includeChangeFreq**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1113](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1113)

Whether to include a change frequency attribute in the sitemap, that specifies how often the page changes its content.
Example value: True

***

### includeLastMod?

> `optional` **includeLastMod**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1118](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1118)

hether to include the last modification date in the sitemap.
Example value: True

***

### includePriority?

> `optional` **includePriority**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1123](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-xmapp/types.gen.ts#L1123)

Whether to include priority information in the sitemap. The priority is a number between 0 and 1 that represents the importance of a page.
Example value: True
