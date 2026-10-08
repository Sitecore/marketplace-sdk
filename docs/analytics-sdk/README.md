**@sitecore-marketplace-sdk/analytics**

***

# @sitecore-marketplace-sdk/analytics

Framework-agnostic client that batches Marketplace insight events and POSTs them to
`POST /api/marketplace/v1/telemetry`. Hosts and App Studio inject the endpoint and a
token provider; the SDK never stores a token and never sends actor or publisher identity.

## Example

```ts
import { createAnalytics, events } from '@sitecore-marketplace-sdk/analytics';

const analytics = createAnalytics({
  endpoint: 'https://api.sitecorecloud.io/api/marketplace/v1/telemetry',
  getAccessToken: () => host.getAccessToken(),
});

await analytics.track(events.listingView({ appId: 'app-42' }));
await analytics.track('listing.install_click', { appId: 'app-42' });
await analytics.flush();
```

## Interfaces

- [AnalyticsBatchConfig](interfaces/AnalyticsBatchConfig.md)
- [AnalyticsClient](interfaces/AnalyticsClient.md)
- [AnalyticsEventData](interfaces/AnalyticsEventData.md)
- [AnalyticsEventInput](interfaces/AnalyticsEventInput.md)
- [AnalyticsRetryConfig](interfaces/AnalyticsRetryConfig.md)
- [AnalyticsWireEvent](interfaces/AnalyticsWireEvent.md)
- [AppInvocationInput](interfaces/AppInvocationInput.md)
- [CreateAnalyticsConfig](interfaces/CreateAnalyticsConfig.md)
- [InstallClickInput](interfaces/InstallClickInput.md)
- [ListingViewInput](interfaces/ListingViewInput.md)

## Type Aliases

- [AnalyticsEventType](type-aliases/AnalyticsEventType.md)
- [AnalyticsShortType](type-aliases/AnalyticsShortType.md)
- [AnalyticsTrackProps](type-aliases/AnalyticsTrackProps.md)
- [AnalyticsWireType](type-aliases/AnalyticsWireType.md)
- [InvocationSurface](type-aliases/InvocationSurface.md)

## Variables

- [events](variables/events.md)

## Functions

- [createAnalytics](functions/createAnalytics.md)
