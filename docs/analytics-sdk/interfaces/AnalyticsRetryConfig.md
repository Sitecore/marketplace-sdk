[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / AnalyticsRetryConfig

# Interface: AnalyticsRetryConfig

Defined in: [types.ts:124](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L124)

Retry policy for transient ingest failures (network errors and HTTP 5xx).
HTTP 4xx is never retried.

## Properties

### baseDelayMs?

> `optional` **baseDelayMs?**: `number`

Defined in: [types.ts:134](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L134)

Starting delay in milliseconds before the next attempt. Doubled each retry.

#### Default Value

```ts
200
```

***

### maxAttempts?

> `optional` **maxAttempts?**: `number`

Defined in: [types.ts:129](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L129)

Attempts per flush, including the first send.

#### Default Value

```ts
4
```

***

### maxDelayMs?

> `optional` **maxDelayMs?**: `number`

Defined in: [types.ts:139](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/types.ts#L139)

Cap on the computed delay, in milliseconds.

#### Default Value

```ts
5000
```
