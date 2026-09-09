[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / AnalyticsClient

# Interface: AnalyticsClient

Defined in: [types.ts:179](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L179)

Client returned by [createAnalytics](../functions/createAnalytics.md).
Public methods never throw; failures go to `onError` when configured.

## Methods

### flush()

> **flush**(): `Promise`\<`void`\>

Defined in: [types.ts:198](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L198)

Send every queued event now. Use before a known navigation.
Transient failures are retried; `4xx` batches are dropped.

#### Returns

`Promise`\<`void`\>

***

### shutdown()

> **shutdown**(): `Promise`\<`void`\>

Defined in: [types.ts:203](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L203)

Flush remaining events with `keepalive`, detach page-hide listeners, and stop accepting `track`.
Create a new client with [createAnalytics](../functions/createAnalytics.md) to send again.

#### Returns

`Promise`\<`void`\>

***

### track()

#### Call Signature

> **track**(`event`): `Promise`\<`void`\>

Defined in: [types.ts:186](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L186)

Enqueue one event. Resolves when the event is queued, not when it is delivered.
Identity fields are stripped. Invalid `type` or empty `appId` are dropped.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | [`AnalyticsEventInput`](AnalyticsEventInput.md) | Full event object, including `type`. |

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **track**(`type`, `props`): `Promise`\<`void`\>

Defined in: [types.ts:193](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L193)

Enqueue one event using a type string and props.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`AnalyticsEventType`](../type-aliases/AnalyticsEventType.md) | Short name (`listing.view`) or full wire type. |
| `props` | [`AnalyticsTrackProps`](../type-aliases/AnalyticsTrackProps.md) | Remaining event fields (`appId` is required). |

##### Returns

`Promise`\<`void`\>
