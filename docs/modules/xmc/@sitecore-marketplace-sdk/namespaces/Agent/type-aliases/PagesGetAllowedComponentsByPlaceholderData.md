[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Agent](../README.md) / PagesGetAllowedComponentsByPlaceholderData

# Type Alias: PagesGetAllowedComponentsByPlaceholderData

> **PagesGetAllowedComponentsByPlaceholderData** = `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:1098](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L1098)

## Properties

### body?

> `optional` **body**: `never`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:1099](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L1099)

***

### headers?

> `optional` **headers**: `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:1100](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L1100)

#### x-sc-job-id?

> `optional` **x-sc-job-id**: `unknown`

Job ID for auditing purposes

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:1106](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L1106)

#### pageId

> **pageId**: `string`

#### placeholderName

> **placeholderName**: `string`

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:1110](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L1110)

#### language?

> `optional` **language**: `string` \| `null`

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/pages/{pageId}/placeholders/{placeholderName}/allowed-components"`

Defined in: [packages/xmc/src/client-agent/types.gen.ts:1117](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/client-agent/types.gen.ts#L1117)
