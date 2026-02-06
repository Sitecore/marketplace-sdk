[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Pages](../README.md) / RetrieveInsertOptionsData

# Type Alias: RetrieveInsertOptionsData

> **RetrieveInsertOptionsData** = `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1111](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1111)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1112](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1112)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1113](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1113)

#### pageId

> **pageId**: `string`

The page identifier.

***

### query

> **query**: `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1119](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1119)

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

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1141](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1141)
