[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / SitemapAlternateLinksOptions

# Type Alias: SitemapAlternateLinksOptions

> **SitemapAlternateLinksOptions** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1059](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1059)

Alternate link sitemap configuration.

## Properties

### enabled?

> `optional` **enabled**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1064](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1064)

Whether alternate link generation is enabled. When enabled, xhtml:link elements are added to the URL elements in the sitemap.
Example value: True

***

### includeXDefault?

> `optional` **includeXDefault**: `boolean` \| `null`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:1069](https://github.com/Sitecore/marketplace-sdk/blob/047115917e8843232ba2a4ba284b67585698b1c5/packages/xmc/src/client-xmapp/types.gen.ts#L1069)

Whether alternate links include an x-default link element. The x-default value signals to the search algorithm that the page does not target any specific language or region.
Example value: True
