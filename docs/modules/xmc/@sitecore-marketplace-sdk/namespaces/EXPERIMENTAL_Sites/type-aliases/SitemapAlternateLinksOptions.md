[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / SitemapAlternateLinksOptions

# Type Alias: SitemapAlternateLinksOptions

> **SitemapAlternateLinksOptions** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1113](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1113)

Alternate link sitemap configuration.

## Properties

### enabled?

> `optional` **enabled**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1118](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1118)

Whether alternate link generation is enabled. When enabled, xhtml:link elements are added to the URL elements in the sitemap.
Example value: True

***

### includeXDefault?

> `optional` **includeXDefault**: `boolean` \| `null`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:1123](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L1123)

Whether alternate links include an x-default link element. The x-default value signals to the search algorithm that the page does not target any specific language or region.
Example value: True
