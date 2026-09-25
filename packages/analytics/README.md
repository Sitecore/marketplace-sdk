# Sitecore Marketplace SDK - `analytics` package

Framework-agnostic client that batches Marketplace insight events and POSTs them to the authenticated Ingestion API (`POST /api/marketplace/v1/telemetry`).

Hosts (App Studio, Pages, Sites) and the Host SDK import this package directly. It does not talk to Kafka and never sends actor or publisher identity.

## Installation

```bash
npm install @sitecore-marketplace-sdk/analytics
```

## Per-item rejections

The Ingestion API can return `202 Accepted` while rejecting individual events. Use `onRejected` to
observe those validation or processing failures. Rejected events are not retried, and callback errors
never escape into application code.

```typescript
const analytics = createAnalytics({
  endpoint,
  getAccessToken,
  onRejected: (rejected, batch) => {
    logger.warn('Analytics events rejected', { rejected, batch });
  },
});
```

## License

This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License. Refer to the [LICENSE](../../LICENSE.md) file in the repository root.
