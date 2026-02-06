[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / DeletePageVersionsData

# Type Alias: DeletePageVersionsData

> **DeletePageVersionsData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1641](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1641)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1642](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1642)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1643](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1643)

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

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1657](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1657)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/versions/{versionNumber}/{language}"`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1667](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1667)
