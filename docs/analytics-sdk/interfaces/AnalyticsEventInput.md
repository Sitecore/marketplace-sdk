[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / AnalyticsEventInput

# Interface: AnalyticsEventInput

Defined in: [types.ts:46](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L46)

Caller-supplied event. Identity fields are accepted so they can be stripped;
they are never sent on the wire.

## Properties

### actorId?

> `optional` **actorId?**: `string`

Defined in: [types.ts:64](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L64)

Stripped. The Ingestion API derives actor from the access token.

***

### actorOrgId?

> `optional` **actorOrgId?**: `string`

Defined in: [types.ts:62](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L62)

Stripped. The Ingestion API derives actor org from the access token.

***

### actorTenantId?

> `optional` **actorTenantId?**: `string`

Defined in: [types.ts:66](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L66)

Stripped. The Ingestion API derives tenant from the access token.

***

### appId

> **appId**: `string`

Defined in: [types.ts:50](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L50)

Marketplace app the event is about. Required.

***

### data?

> `optional` **data?**: [`AnalyticsEventData`](AnalyticsEventData.md)

Defined in: [types.ts:56](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L56)

Event-specific payload.

***

### dims?

> `optional` **dims?**: `unknown`

Defined in: [types.ts:70](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L70)

Stripped. Not part of the current wire contract.

***

### eventId?

> `optional` **eventId?**: `string`

Defined in: [types.ts:60](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L60)

Idempotency key. The SDK generates a UUID if omitted. Stable across retries.

***

### installationId?

> `optional` **installationId?**: `string`

Defined in: [types.ts:52](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L52)

Installation that was invoked. Used for `app.invocation` only.

***

### occurredAt?

> `optional` **occurredAt?**: `string`

Defined in: [types.ts:58](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L58)

ISO-8601 timestamp. The SDK sets this if omitted.

***

### orgId?

> `optional` **orgId?**: `string`

Defined in: [types.ts:68](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L68)

Stripped. Publisher org is resolved server-side from the app catalog.

***

### surface?

> `optional` **surface?**: [`InvocationSurface`](../type-aliases/InvocationSurface.md)

Defined in: [types.ts:54](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L54)

`standalone` or `puzzle`. Used for `app.invocation` only.

***

### type

> **type**: [`AnalyticsEventType`](../type-aliases/AnalyticsEventType.md)

Defined in: [types.ts:48](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L48)

Short name (`listing.view`) or full wire type (`mkp.telemetry.listing.view`).
