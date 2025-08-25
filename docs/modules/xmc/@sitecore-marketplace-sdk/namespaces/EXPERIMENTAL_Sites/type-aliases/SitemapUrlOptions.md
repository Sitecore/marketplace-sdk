[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Sites](../README.md) / SitemapUrlOptions

# Type Alias: SitemapUrlOptions

> **SitemapUrlOptions** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1162](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1162)

URL property configurations in the sitemap.

## Properties

### includeChangeFreq?

> `optional` **includeChangeFreq**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1167](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1167)

Whether to include change frequency attribute in the sitemap, that specifies how often the page changes its content.
Example value: True

***

### includeLastMod?

> `optional` **includeLastMod**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1172](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1172)

Whether to include the last modification date in the sitemap.
Example value: True

***

### includePriority?

> `optional` **includePriority**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1177](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1177)

Whether to include priority information in the sitemap. The priority is a number between 0 and 1 that represents the importance of a page.
Example value: True
