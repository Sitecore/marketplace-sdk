[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Pages](../README.md) / AddPageVersionData

# Type Alias: AddPageVersionData

> **AddPageVersionData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1454](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1454)

## Properties

### body?

> `optional` **body**: [`AddPageVersionInput`](AddPageVersionInput.md)

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1458](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1458)

Input data containing properties of the page for which to create a new version.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1459](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1459)

#### pageId

> **pageId**: `string`

The page identifier.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1465](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1465)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/version"`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1475](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1475)
