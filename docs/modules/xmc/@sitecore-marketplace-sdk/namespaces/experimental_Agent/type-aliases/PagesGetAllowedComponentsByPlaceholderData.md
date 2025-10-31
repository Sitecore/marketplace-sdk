[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Agent](../README.md) / PagesGetAllowedComponentsByPlaceholderData

# Type Alias: PagesGetAllowedComponentsByPlaceholderData

> **PagesGetAllowedComponentsByPlaceholderData** = `object`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:1116

## Properties

### body?

> `optional` **body**: `never`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:1117

***

### headers?

> `optional` **headers**: `object`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:1118

#### x-sc-job-id?

> `optional` **x-sc-job-id**: `unknown`

Job ID for auditing purposes

***

### path

> **path**: `object`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:1124

#### pageId

> **pageId**: `string`

#### placeholderName

> **placeholderName**: `string`

***

### query?

> `optional` **query**: `object`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:1128

#### language?

> `optional` **language**: `string` \| `null`

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/placeholders/{placeholderName}/allowed-components"`

Defined in: packages/xmc/src/experimental/client-agent/types.gen.ts:1135
