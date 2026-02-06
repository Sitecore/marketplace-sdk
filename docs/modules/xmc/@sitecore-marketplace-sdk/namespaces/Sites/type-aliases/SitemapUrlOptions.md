[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Sites](../README.md) / SitemapUrlOptions

# Type Alias: SitemapUrlOptions

> **SitemapUrlOptions** = `object`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1235](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1235)

URL property configurations in the sitemap.

## Properties

### includeChangeFreq?

> `optional` **includeChangeFreq**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1240](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1240)

Whether to include change frequency attribute in the sitemap, that specifies how often the page changes its content.
Example value: True

***

### includeLastMod?

> `optional` **includeLastMod**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1245](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1245)

Whether to include the last modification date in the sitemap.
Example value: True

***

### includePriority?

> `optional` **includePriority**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-sites/types.gen.ts:1250](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-sites/types.gen.ts#L1250)

Whether to include priority information in the sitemap. The priority is a number between 0 and 1 that represents the importance of a page.
Example value: True
