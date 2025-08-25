[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [experimental\_Sites](../README.md) / DetachAnalyticsIdentifierData

# Type Alias: DetachAnalyticsIdentifierData

> **DetachAnalyticsIdentifierData** = `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2649](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2649)

## Properties

### body

> **body**: [`DetachFromSitesInput`](DetachFromSitesInput.md)

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2653](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2653)

Input containing an array of site identifiers.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2654](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2654)

#### analyticsIdentifier

> **analyticsIdentifier**: `string`

Analytics identifier.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2660](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2660)

#### environmentId?

> `optional` **environmentId**: `string`

The identifier of the environment

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/analytics-identifiers/{analyticsIdentifier}/detach"`

Defined in: [packages/xmc/src/experimental/client-sites/types.gen.ts:2670](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/xmc/src/experimental/client-sites/types.gen.ts#L2670)
