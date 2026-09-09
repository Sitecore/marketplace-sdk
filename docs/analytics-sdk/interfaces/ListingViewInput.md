[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / ListingViewInput

# Interface: ListingViewInput

Defined in: [events.ts:7](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L7)

Input for [events.listingView](../variables/events.md#listingview).

## Properties

### appId

> **appId**: `string`

Defined in: [events.ts:9](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L9)

Marketplace app that was viewed.

***

### data?

> `optional` **data?**: `Pick`\<[`AnalyticsEventData`](AnalyticsEventData.md), `"position"` \| `"listingSource"`\>

Defined in: [events.ts:11](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L11)

Optional catalogue position and listing source.

***

### eventId?

> `optional` **eventId?**: `string`

Defined in: [events.ts:15](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L15)

Idempotency key. The SDK generates a UUID if omitted.

***

### occurredAt?

> `optional` **occurredAt?**: `string`

Defined in: [events.ts:13](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L13)

ISO-8601 timestamp. The SDK sets this if omitted.
