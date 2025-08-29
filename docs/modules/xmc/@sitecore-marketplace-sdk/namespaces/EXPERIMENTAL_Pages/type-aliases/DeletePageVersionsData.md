[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / DeletePageVersionsData

# Type Alias: DeletePageVersionsData

> **DeletePageVersionsData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1495](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1495)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1496](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1496)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1497](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1497)

#### language

> **language**: `string`

The language of the page version to delete.

#### pageId

> **pageId**: `string`

The page identifier.

#### versionNumber

> **versionNumber**: `number`

The number of the version to delete.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1511](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1511)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/versions/{versionNumber}/{language}"`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1521](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1521)
