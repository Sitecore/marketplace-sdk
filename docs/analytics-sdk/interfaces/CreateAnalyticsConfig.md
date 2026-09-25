[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / CreateAnalyticsConfig

# Interface: CreateAnalyticsConfig

Defined in: [types.ts:146](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L146)

Configuration for [createAnalytics](../functions/createAnalytics.md).
The host or App Studio injects `endpoint` and `getAccessToken`. The SDK never stores a token.

## Properties

### batch?

> `optional` **batch?**: [`AnalyticsBatchConfig`](AnalyticsBatchConfig.md)

Defined in: [types.ts:155](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L155)

Optional batching overrides.

***

### enabled?

> `optional` **enabled?**: `boolean`

Defined in: [types.ts:167](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L167)

Kill switch. When `false`, `track` is a no-op.

#### Default Value

```ts
true
```

***

### endpoint

> **endpoint**: `string`

Defined in: [types.ts:148](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L148)

Ingestion URL, typically `…/api/marketplace/v1/telemetry`.

***

### getAccessToken

> **getAccessToken**: () => `string` \| `Promise`\<`string`\>

Defined in: [types.ts:153](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L153)

Called at flush time so the Bearer token is fresh.
An empty or throwing provider keeps the batch queued for retry.

#### Returns

`string` \| `Promise`\<`string`\>

***

### onError?

> `optional` **onError?**: (`error`, `batch?`) => `void`

Defined in: [types.ts:172](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L172)

Invoked when a batch is dropped, a request fails, or the queue overflows.
Must not throw; the SDK swallows errors from this callback.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |
| `batch?` | [`AnalyticsWireEvent`](AnalyticsWireEvent.md)[] |

#### Returns

`void`

***

### retry?

> `optional` **retry?**: [`AnalyticsRetryConfig`](AnalyticsRetryConfig.md)

Defined in: [types.ts:157](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L157)

Optional retry overrides for 5xx and network failures.

***

### sampling?

> `optional` **sampling?**: `number`

Defined in: [types.ts:162](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L162)

Fraction of events to keep, from `0` (drop all) to `1` (keep all).

#### Default Value

```ts
1
```
