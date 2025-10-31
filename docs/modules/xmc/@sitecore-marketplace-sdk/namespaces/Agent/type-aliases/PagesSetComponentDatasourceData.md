[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Agent](../README.md) / PagesSetComponentDatasourceData

# Type Alias: PagesSetComponentDatasourceData

> **PagesSetComponentDatasourceData** = `object`

Defined in: packages/xmc/src/client-agent/types.gen.ts:833

## Properties

### body

> **body**: [`SetComponentDatasourceRequest`](SetComponentDatasourceRequest.md)

Defined in: packages/xmc/src/client-agent/types.gen.ts:834

***

### headers?

> `optional` **headers**: `object`

Defined in: packages/xmc/src/client-agent/types.gen.ts:835

#### x-sc-job-id?

> `optional` **x-sc-job-id**: `unknown`

Job ID for auditing purposes

***

### path

> **path**: `object`

Defined in: packages/xmc/src/client-agent/types.gen.ts:841

#### componentId

> **componentId**: `string`

#### pageId

> **pageId**: `string`

***

### query?

> `optional` **query**: `object`

Defined in: packages/xmc/src/client-agent/types.gen.ts:845

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/components/{componentId}/datasource"`

Defined in: packages/xmc/src/client-agent/types.gen.ts:851
