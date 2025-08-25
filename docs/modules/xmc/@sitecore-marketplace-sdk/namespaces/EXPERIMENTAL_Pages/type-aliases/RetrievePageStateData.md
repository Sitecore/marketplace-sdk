[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [EXPERIMENTAL\_Pages](../README.md) / RetrievePageStateData

# Type Alias: RetrievePageStateData

> **RetrievePageStateData** = `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:914](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L914)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:915](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L915)

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:916](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L916)

#### pageId

> **pageId**: `string`

The page identifier.

***

### query

> **query**: `object`

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:922](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L922)

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

Defined in: [packages/xmc/src/experimental/client-pages/types.gen.ts:956](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-pages/types.gen.ts#L956)
