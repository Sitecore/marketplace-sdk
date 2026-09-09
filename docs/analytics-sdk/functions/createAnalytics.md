[**@sitecore-marketplace-sdk/analytics**](../README.md)

***

[@sitecore-marketplace-sdk/analytics](../README.md) / createAnalytics

# Function: createAnalytics()

> **createAnalytics**(`config`): [`AnalyticsClient`](../interfaces/AnalyticsClient.md)

Defined in: [create-analytics.ts:83](https://github.com/Sitecore/marketplace-sdk/blob/main/packages/analytics/src/create-analytics.ts#L83)

Create an analytics client that queues insight events and POSTs them to the Ingestion API.

Events flush when the batch is full, `maxWaitMs` elapses, [AnalyticsClient.flush](../interfaces/AnalyticsClient.md#flush) is called,
[AnalyticsClient.shutdown](../interfaces/AnalyticsClient.md#shutdown) is called, or the page becomes hidden.
Page-hide delivery uses `fetch` with `keepalive: true` so the `Authorization` header can be set.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`CreateAnalyticsConfig`](../interfaces/CreateAnalyticsConfig.md) | Endpoint, token provider, and optional batching / retry / sampling / kill switch. |

## Returns

[`AnalyticsClient`](../interfaces/AnalyticsClient.md)

A client whose `track`, `flush`, and `shutdown` methods never throw.

## Example

```ts
const analytics = createAnalytics({
  endpoint: 'https://api.sitecorecloud.io/api/marketplace/v1/telemetry',
  getAccessToken: () => host.getAccessToken(),
});

await analytics.track('listing.view', { appId: 'app-42' });
await analytics.flush();
await analytics.shutdown();
```
