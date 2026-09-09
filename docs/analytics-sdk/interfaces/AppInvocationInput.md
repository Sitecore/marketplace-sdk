[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / AppInvocationInput

# Interface: AppInvocationInput

Defined in: [events.ts:35](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L35)

Input for [events.appInvocation](../variables/events.md#appinvocation).

## Properties

### appId

> **appId**: `string`

Defined in: [events.ts:37](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L37)

Marketplace app that was invoked.

***

### data?

> `optional` **data?**: `Pick`\<[`AnalyticsEventData`](AnalyticsEventData.md), `"hostProduct"` \| `"durationMs"`\>

Defined in: [events.ts:43](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L43)

Optional host product and duration.

***

### eventId?

> `optional` **eventId?**: `string`

Defined in: [events.ts:47](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L47)

Idempotency key. The SDK generates a UUID if omitted.

***

### installationId

> **installationId**: `string`

Defined in: [events.ts:39](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L39)

Installation that was invoked. Required on the wire for this type.

***

### occurredAt?

> `optional` **occurredAt?**: `string`

Defined in: [events.ts:45](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L45)

ISO-8601 timestamp. The SDK sets this if omitted.

***

### surface

> **surface**: [`InvocationSurface`](../type-aliases/InvocationSurface.md)

Defined in: [events.ts:41](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/events.ts#L41)

Host surface: `standalone` or `puzzle`.
