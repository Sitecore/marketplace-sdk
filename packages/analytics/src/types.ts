/**
 * Short event names accepted by {@link AnalyticsClient.track}.
 * The SDK maps these to {@link AnalyticsWireType} before POST.
 */
export type AnalyticsShortType = 'listing.view' | 'listing.install_click' | 'app.invocation';

/**
 * Wire `type` values sent to `POST /api/marketplace/v1/telemetry`.
 */
export type AnalyticsWireType =
  | 'mkp.telemetry.listing.view'
  | 'mkp.telemetry.listing.install_click'
  | 'mkp.telemetry.app.invocation';

/**
 * Event type accepted by {@link AnalyticsClient.track}: a short name or a full wire type.
 */
export type AnalyticsEventType = AnalyticsShortType | AnalyticsWireType;

/**
 * Host surface for `app.invocation` events.
 */
export type InvocationSurface = 'standalone' | 'puzzle';

/**
 * Event-specific payload. Known fields are listed; additional keys are forwarded as-is.
 */
export interface AnalyticsEventData {
  /** 1-based position of the listing in the catalogue. */
  position?: number;
  /** Where the listing was shown (for example `search` or `featured`). */
  listingSource?: string;
  /** Call-to-action that was clicked (for example `install`). */
  cta?: string;
  /** Host product that invoked the app (for example `pages`). */
  hostProduct?: string;
  /** How long the invocation lasted, in milliseconds. */
  durationMs?: number;
  [key: string]: unknown;
}

/**
 * Caller-supplied event. Identity fields are accepted so they can be stripped;
 * they are never sent on the wire.
 */
export interface AnalyticsEventInput {
  /** Short name (`listing.view`) or full wire type (`mkp.telemetry.listing.view`). */
  type: AnalyticsEventType;
  /** Marketplace app the event is about. Required. */
  appId: string;
  /** Installation that was invoked. Used for `app.invocation` only. */
  installationId?: string;
  /** `standalone` or `puzzle`. Used for `app.invocation` only. */
  surface?: InvocationSurface;
  /** Event-specific payload. */
  data?: AnalyticsEventData;
  /** ISO-8601 timestamp. The SDK sets this if omitted. */
  occurredAt?: string;
  /** Idempotency key. The SDK generates a UUID if omitted. Stable across retries. */
  eventId?: string;
  /** Stripped. The Ingestion API derives actor org from the access token. */
  actorOrgId?: string;
  /** Stripped. The Ingestion API derives actor from the access token. */
  actorId?: string;
  /** Stripped. The Ingestion API derives tenant from the access token. */
  actorTenantId?: string;
  /** Stripped. Publisher org is resolved server-side from the app catalog. */
  orgId?: string;
  /** Stripped. Not part of the current wire contract. */
  dims?: unknown;
}

/**
 * Second argument to `track(type, props)`. Same fields as {@link AnalyticsEventInput} without `type`.
 */
export type AnalyticsTrackProps = Omit<AnalyticsEventInput, 'type'>;

/**
 * Event shape POSTed in `{ events: AnalyticsWireEvent[] }`.
 * Identity fields are never present.
 */
export interface AnalyticsWireEvent {
  /** Client-generated idempotency key. Unchanged if a batch is retried. */
  eventId: string;
  /** Full telemetry type, for example `mkp.telemetry.listing.view`. */
  type: AnalyticsWireType;
  /** ISO-8601 timestamp when the event occurred. */
  occurredAt: string;
  /** Marketplace app the event is about. */
  appId: string;
  /** Installation that was invoked. Omitted unless the type is `app.invocation`. */
  installationId?: string;
  /** `standalone` or `puzzle`. Omitted unless the type is `app.invocation`. */
  surface?: InvocationSurface;
  /** Event-specific payload copied from the caller. */
  data?: Record<string, unknown>;
}

/**
 * Batching and in-memory queue limits.
 */
export interface AnalyticsBatchConfig {
  /**
   * Flush when the queue reaches this many events.
   * @defaultValue 20
   */
  maxSize?: number;
  /**
   * Flush this many milliseconds after the first queued event, if `maxSize` is not reached.
   * @defaultValue 5000
   */
  maxWaitMs?: number;
  /**
   * Maximum events kept in memory. Oldest events are dropped first on overflow.
   * @defaultValue 1000
   */
  maxQueue?: number;
}

/**
 * Retry policy for transient ingest failures (network errors and HTTP 5xx).
 * HTTP 4xx is never retried.
 */
export interface AnalyticsRetryConfig {
  /**
   * Attempts per flush, including the first send.
   * @defaultValue 4
   */
  maxAttempts?: number;
  /**
   * Starting delay in milliseconds before the next attempt. Doubled each retry.
   * @defaultValue 200
   */
  baseDelayMs?: number;
  /**
   * Cap on the computed delay, in milliseconds.
   * @defaultValue 5000
   */
  maxDelayMs?: number;
}

/**
 * Configuration for {@link createAnalytics}.
 * The host or App Studio injects `endpoint` and `getAccessToken`. The SDK never stores a token.
 */
export interface CreateAnalyticsConfig {
  /** Ingestion URL, typically `…/api/marketplace/v1/telemetry`. */
  endpoint: string;
  /**
   * Called at flush time so the Bearer token is fresh.
   * An empty or throwing provider keeps the batch queued for retry.
   */
  getAccessToken: () => string | Promise<string>;
  /** Optional batching overrides. */
  batch?: AnalyticsBatchConfig;
  /** Optional retry overrides for 5xx and network failures. */
  retry?: AnalyticsRetryConfig;
  /**
   * Fraction of events to keep, from `0` (drop all) to `1` (keep all).
   * @defaultValue 1
   */
  sampling?: number;
  /**
   * Kill switch. When `false`, `track` is a no-op.
   * @defaultValue true
   */
  enabled?: boolean;
  /**
   * Invoked when a batch is dropped, a request fails, or the queue overflows.
   * Must not throw; the SDK swallows errors from this callback.
   */
  onError?: (error: unknown, batch?: AnalyticsWireEvent[]) => void;
}

/**
 * Client returned by {@link createAnalytics}.
 * Public methods never throw; failures go to `onError` when configured.
 */
export interface AnalyticsClient {
  /**
   * Enqueue one event. Resolves when the event is queued, not when it is delivered.
   * Identity fields are stripped. Invalid `type` or empty `appId` are dropped.
   *
   * @param event - Full event object, including `type`.
   */
  track(event: AnalyticsEventInput): Promise<void>;
  /**
   * Enqueue one event using a type string and props.
   *
   * @param type - Short name (`listing.view`) or full wire type.
   * @param props - Remaining event fields (`appId` is required).
   */
  track(type: AnalyticsEventType, props: AnalyticsTrackProps): Promise<void>;
  /**
   * Send every queued event now. Use before a known navigation.
   * Transient failures are retried; `4xx` batches are dropped.
   */
  flush(): Promise<void>;
  /**
   * Flush remaining events with `keepalive`, detach page-hide listeners, and stop accepting `track`.
   * Create a new client with {@link createAnalytics} to send again.
   */
  shutdown(): Promise<void>;
}
