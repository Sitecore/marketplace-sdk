[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Pages](../README.md) / AddPageVersionsData

# Type Alias: AddPageVersionsData

> **AddPageVersionsData** = `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1211](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1211)

## Properties

### body?

> `optional` **body**: [`AddPageVersionInput`](AddPageVersionInput.md)

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1215](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1215)

Input data containing properties of the page

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1216](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1216)

#### pageId

> **pageId**: `string`

The page identifier.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1222](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1222)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/versions"`

Defined in: [packages/xmc/src/client-pages/types.gen.ts:1232](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-pages/types.gen.ts#L1232)
