[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / InstallClickInput

# Interface: InstallClickInput

Defined in: [events.ts:21](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L21)

Input for [events.installClick](../variables/events.md#installclick).

## Properties

### appId

> **appId**: `string`

Defined in: [events.ts:23](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L23)

Marketplace app the install CTA belongs to.

***

### data?

> `optional` **data?**: `Pick`\<[`AnalyticsEventData`](AnalyticsEventData.md), `"cta"`\>

Defined in: [events.ts:25](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L25)

Optional CTA label.

***

### eventId?

> `optional` **eventId?**: `string`

Defined in: [events.ts:29](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L29)

Idempotency key. The SDK generates a UUID if omitted.

***

### occurredAt?

> `optional` **occurredAt?**: `string`

Defined in: [events.ts:27](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L27)

ISO-8601 timestamp. The SDK sets this if omitted.
