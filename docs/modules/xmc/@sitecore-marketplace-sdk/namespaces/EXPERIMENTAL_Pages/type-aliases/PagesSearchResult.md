[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Pages](../README.md) / PagesSearchResult

# Type Alias: PagesSearchResult

> **PagesSearchResult** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:489](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L489)

The result of a page search, including the total count and a collection of result pages.

## Properties

### results?

> `optional` **results**: [`Page`](Page.md)[] \| `null`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:498](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L498)

The collection of result pages returned by the search.

***

### totalCount?

> `optional` **totalCount**: `number`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:494](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L494)

The total number of pages found by the search.
Example value: 25
