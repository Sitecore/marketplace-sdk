/**
 * @packageDocumentation
 *
 * Framework-agnostic client that batches Marketplace insight events and POSTs them to
 * `POST /api/marketplace/v1/telemetry`. Hosts and App Studio inject the endpoint and a
 * token provider; the SDK never stores a token and never sends actor or publisher identity.
 *
 * @example
 * ```ts
 * import { createAnalytics, events } from '@sitecore-marketplace-sdk/analytics';
 *
 * const analytics = createAnalytics({
 *   endpoint: 'https://api.sitecorecloud.io/api/marketplace/v1/telemetry',
 *   getAccessToken: () => host.getAccessToken(),
 * });
 *
 * await analytics.track(events.listingView({ appId: 'app-42' }));
 * await analytics.track('listing.install_click', { appId: 'app-42' });
 * await analytics.flush();
 * ```
 */
export { createAnalytics } from './create-analytics';
export { events } from './events';
export type { AppInvocationInput, InstallClickInput, ListingViewInput } from './events';
export type {
  AnalyticsBatchConfig,
  AnalyticsClient,
  AnalyticsEventData,
  AnalyticsEventInput,
  AnalyticsEventType,
  AnalyticsRetryConfig,
  AnalyticsShortType,
  AnalyticsTrackProps,
  AnalyticsWireEvent,
  AnalyticsWireType,
  CreateAnalyticsConfig,
  InvocationSurface,
} from './types';
