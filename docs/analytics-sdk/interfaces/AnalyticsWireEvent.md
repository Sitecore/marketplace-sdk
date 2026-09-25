[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / AnalyticsWireEvent

# Interface: AnalyticsWireEvent

Defined in: [types.ts:82](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L82)

Event shape POSTed in `{ events: AnalyticsWireEvent[] }`.
Identity fields are never present.

## Properties

### appId

> **appId**: `string`

Defined in: [types.ts:90](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L90)

Marketplace app the event is about.

***

### data?

> `optional` **data?**: `Record`\<`string`, `unknown`\>

Defined in: [types.ts:96](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L96)

Event-specific payload copied from the caller.

***

### eventId

> **eventId**: `string`

Defined in: [types.ts:84](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L84)

Client-generated idempotency key. Unchanged if a batch is retried.

***

### installationId?

> `optional` **installationId?**: `string`

Defined in: [types.ts:92](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L92)

Installation that was invoked. Omitted unless the type is `app.invocation`.

***

### occurredAt

> **occurredAt**: `string`

Defined in: [types.ts:88](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L88)

ISO-8601 timestamp when the event occurred.

***

### surface?

> `optional` **surface?**: [`InvocationSurface`](../type-aliases/InvocationSurface.md)

Defined in: [types.ts:94](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L94)

`standalone` or `puzzle`. Omitted unless the type is `app.invocation`.

***

### type

> **type**: [`AnalyticsWireType`](../type-aliases/AnalyticsWireType.md)

Defined in: [types.ts:86](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L86)

Full telemetry type, for example `mkp.telemetry.listing.view`.
