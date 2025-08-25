[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Pages](../README.md) / RetrieveInsertOptionsData

# Type Alias: RetrieveInsertOptionsData

> **RetrieveInsertOptionsData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1042](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1042)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1043](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1043)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1044](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1044)

#### pageId

> **pageId**: `string`

The page identifier.

***

### query

> **query**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1050](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1050)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### insertOptionKind

> **insertOptionKind**: `string`

The type of object to retrieve (Page or Folder).

#### language

> **language**: `string`

The page language.

#### site

> **site**: `string`

The site identifier.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/insertoptions"`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1072](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1072)
