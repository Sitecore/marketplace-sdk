[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / AnalyticsBatchConfig

# Interface: AnalyticsBatchConfig

Defined in: [types.ts:102](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L102)

Batching and in-memory queue limits.

## Properties

### maxQueue?

> `optional` **maxQueue?**: `number`

Defined in: [types.ts:117](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L117)

Maximum events kept in memory. Oldest events are dropped first on overflow.

#### Default Value

```ts
1000
```

***

### maxSize?

> `optional` **maxSize?**: `number`

Defined in: [types.ts:107](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L107)

Flush when the queue reaches this many events.

#### Default Value

```ts
20
```

***

### maxWaitMs?

> `optional` **maxWaitMs?**: `number`

Defined in: [types.ts:112](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L112)

Flush this many milliseconds after the first queued event, if `maxSize` is not reached.

#### Default Value

```ts
5000
```
