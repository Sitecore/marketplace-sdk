# Sitecore Marketplace SDK - `analytics` package

Framework-agnostic client that batches Marketplace insight events and POSTs them to the authenticated Ingestion API (`POST /api/marketplace/v1/telemetry`).

Hosts (App Studio, Pages, Sites) and the Host SDK import this package directly. It does not talk to Kafka and never sends actor or publisher identity.

## Installation

```bash
npm install @sitecore-marketplace-sdk/analytics
```

## License

This package is part of the Sitecore Marketplace SDK, licensed under the Apache 2.0 License. Refer to the [LICENSE](../../LICENSE.md) file in the repository root.
