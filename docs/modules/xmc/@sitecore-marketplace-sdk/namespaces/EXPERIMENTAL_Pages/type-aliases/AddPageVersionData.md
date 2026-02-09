[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / AddPageVersionData

# Type Alias: AddPageVersionData

> **AddPageVersionData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1555](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1555)

## Properties

### body?

> `optional` **body**: [`AddPageVersionInput`](AddPageVersionInput.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1559](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1559)

Input data containing properties of the page for which to create a new version.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1560](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1560)

#### pageId

> **pageId**: `string`

The page identifier.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1566](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1566)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/version"`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1576](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1576)
