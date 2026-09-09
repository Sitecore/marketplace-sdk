[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / AnalyticsEventData

# Interface: AnalyticsEventData

Defined in: [types.ts:28](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L28)

Event-specific payload. Known fields are listed; additional keys are forwarded as-is.

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### cta?

> `optional` **cta?**: `string`

Defined in: [types.ts:34](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L34)

Call-to-action that was clicked (for example `install`).

***

### durationMs?

> `optional` **durationMs?**: `number`

Defined in: [types.ts:38](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L38)

How long the invocation lasted, in milliseconds.

***

### hostProduct?

> `optional` **hostProduct?**: `string`

Defined in: [types.ts:36](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L36)

Host product that invoked the app (for example `pages`).

***

### listingSource?

> `optional` **listingSource?**: `string`

Defined in: [types.ts:32](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L32)

Where the listing was shown (for example `search` or `featured`).

***

### position?

> `optional` **position?**: `number`

Defined in: [types.ts:30](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L30)

1-based position of the listing in the catalogue.
