[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Pages](../README.md) / PagesSearchResult

# Type Alias: PagesSearchResult

> **PagesSearchResult** = `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:520](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L520)

The result of a page search, including the total count and a collection of result pages.

## Properties

### results?

> `optional` **results**: [`Page`](Page.md)[] \| `null`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:529](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L529)

The collection of result pages returned by the search.

***

### totalCount?

> `optional` **totalCount**: `number`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:525](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L525)

The total number of pages found by the search.
Example value: 25
