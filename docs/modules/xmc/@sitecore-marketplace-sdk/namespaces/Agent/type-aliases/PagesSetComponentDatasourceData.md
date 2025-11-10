[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Agent](../README.md) / PagesSetComponentDatasourceData

# Type Alias: PagesSetComponentDatasourceData

> **PagesSetComponentDatasourceData** = `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:815](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L815)

## Properties

### body

> **body**: [`SetComponentDatasourceRequest`](SetComponentDatasourceRequest.md)

Defined in: [packages/xmc/src/client-agent/types.gen.ts:816](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L816)

***

### headers?

> `optional` **headers**: `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:817](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L817)

#### x-sc-job-id?

> `optional` **x-sc-job-id**: `unknown`

Job ID for auditing purposes

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:823](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L823)

#### componentId

> **componentId**: `string`

#### pageId

> **pageId**: `string`

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:827](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L827)

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/components/{componentId}/datasource"`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:833](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L833)
