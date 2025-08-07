[**@sitecore-marketplace-sdk/xmc**](../../../../README.md)

***

[@sitecore-marketplace-sdk/xmc](../../../../README.md) / [Xmapp](../README.md) / DetachAnalyticsIdentifierData

# Type Alias: DetachAnalyticsIdentifierData

> **DetachAnalyticsIdentifierData** = `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2460](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L2460)

## Properties

### body

> **body**: [`DetachFromSitesInput`](DetachFromSitesInput.md)

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2464](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L2464)

Input containing an array of site identifiers.

***

### path

> **path**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2465](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L2465)

#### analyticsIdentifier

> **analyticsIdentifier**: `string`

Analytics identifier.

***

### query?

> `optional` **query**: `object`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2471](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L2471)

#### sitecoreContextId?

> `optional` **sitecoreContextId**: `string`

The Sitecore context ID.

***

### url

> **url**: `"/api/v1/sites/analytics-identifiers/{analyticsIdentifier}/detach"`

Defined in: [packages/xmc/src/client-xmapp/types.gen.ts:2477](https://github.com/Sitecore/marketplace-sdk/blob/893df143248e67d8c66e942a96045542130259a0/packages/xmc/src/client-xmapp/types.gen.ts#L2477)
