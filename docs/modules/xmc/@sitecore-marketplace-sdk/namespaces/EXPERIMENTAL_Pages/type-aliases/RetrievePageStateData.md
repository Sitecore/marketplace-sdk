[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Pages](../README.md) / RetrievePageStateData

# Type Alias: RetrievePageStateData

> **RetrievePageStateData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:983](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L983)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:984](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L984)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:985](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L985)

#### pageId

> **pageId**: `string`

The page identifier.

***

### query

> **query**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:991](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L991)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment.

#### Language

> **Language**: `string`

The language of the page.

#### Site

> **Site**: `string`

The site name.

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

#### Version?

> `optional` **Version**: `number`

The version number of the page.

#### WithLayout?

> `optional` **WithLayout**: `boolean`

Whether to include layout information.

#### WithVersions?

> `optional` **WithVersions**: `boolean`

Whether to include page versions.

#### WithWorkflow?

> `optional` **WithWorkflow**: `boolean`

Whether to include workflow information.

***

### url

> **url**: `"/api/v1/pages/{pageId}/state"`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:1025](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L1025)
