[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / DetachAnalyticsIdentifierData

# Type Alias: DetachAnalyticsIdentifierData

> **DetachAnalyticsIdentifierData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2994](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2994)

## Properties

### body

> **body**: [`DetachFromSitesInput`](DetachFromSitesInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2998](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2998)

Input containing an array of site identifiers.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2999](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2999)

#### analyticsIdentifier

> **analyticsIdentifier**: `string`

Analytics identifier.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3005](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3005)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/analytics-identifiers/{analyticsIdentifier}/detach"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:3015](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L3015)
