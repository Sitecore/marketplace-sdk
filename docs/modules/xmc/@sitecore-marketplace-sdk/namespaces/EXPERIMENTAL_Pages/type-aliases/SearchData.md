[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Pages](../README.md) / SearchData

# Type Alias: SearchData

> **SearchData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:977](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L977)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:978](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L978)

***

### path?

> `optional` **path**: `never`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:979](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L979)

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:980](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L980)

#### continuationToken?

> `optional` **continuationToken**: `string`

Continuation token for pagination.

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### filter?

> `optional` **filter**: [`TypeFilter`](TypeFilter.md)

The search filter. Possible values are "Pages" (items that have a presentation layout and can be rendered), "Folders" (items that use 'folder' as their base template), "All" (both pages and folders).

#### language?

> `optional` **language**: `string`

If you want to limit the search to items in a specific language, the language code of those items.

#### pageNumber?

> `optional` **pageNumber**: `number`

The page number used to paginate the results.

#### pageSize?

> `optional` **pageSize**: `number`

The page size of the results to return.

#### rootIds?

> `optional` **rootIds**: `string`[]

If you want to limit the search to pages or folders under a specific parent, the list of identifiers to search under.

#### searchText?

> `optional` **searchText**: `string`

The text by which to search for the name or display name.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/search"`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1018](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1018)
