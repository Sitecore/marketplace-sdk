import { WIRE_TYPES } from './constants';
import type { AnalyticsEventData, AnalyticsEventInput, InvocationSurface } from './types';

/**
 * Input for {@link events.listingView}.
 */
export interface ListingViewInput {
  /** Marketplace app that was viewed. */
  appId: string;
  /** Optional catalogue position and listing source. */
  data?: Pick<AnalyticsEventData, 'position' | 'listingSource'>;
  /** ISO-8601 timestamp. The SDK sets this if omitted. */
  occurredAt?: string;
  /** Idempotency key. The SDK generates a UUID if omitted. */
  eventId?: string;
}

/**
 * Input for {@link events.installClick}.
 */
export interface InstallClickInput {
  /** Marketplace app the install CTA belongs to. */
  appId: string;
  /** Optional CTA label. */
  data?: Pick<AnalyticsEventData, 'cta'>;
  /** ISO-8601 timestamp. The SDK sets this if omitted. */
  occurredAt?: string;
  /** Idempotency key. The SDK generates a UUID if omitted. */
  eventId?: string;
}

/**
 * Input for {@link events.appInvocation}.
 */
export interface AppInvocationInput {
  /** Marketplace app that was invoked. */
  appId: string;
  /** Installation that was invoked. Required on the wire for this type. */
  installationId: string;
  /** Host surface: `standalone` or `puzzle`. */
  surface: InvocationSurface;
  /** Optional host product and duration. */
  data?: Pick<AnalyticsEventData, 'hostProduct' | 'durationMs'>;
  /** ISO-8601 timestamp. The SDK sets this if omitted. */
  occurredAt?: string;
  /** Idempotency key. The SDK generates a UUID if omitted. */
  eventId?: string;
}

/**
 * Typed builders that set the wire `type` for you.
 * Pass the result to {@link AnalyticsClient.track}.
 *
 * @example
 * ```ts
 * analytics.track(events.listingView({ appId: 'app-42' }));
 * analytics.track(events.installClick({ appId: 'app-42', data: { cta: 'install' } }));
 * analytics.track(events.appInvocation({ appId: 'app-42', installationId: 'inst-7', surface: 'standalone' }));
 * ```
 */
export const events = {
  /**
   * Build a listing view event (`mkp.telemetry.listing.view`).
   *
   * @param input - App id and optional catalogue data.
   */
  listingView(input: ListingViewInput): AnalyticsEventInput {
    return {
      type: WIRE_TYPES['listing.view'],
      appId: input.appId,
      data: input.data,
      occurredAt: input.occurredAt,
      eventId: input.eventId,
    };
  },
  /**
   * Build an install click event (`mkp.telemetry.listing.install_click`).
   *
   * @param input - App id and optional CTA data.
   */
  installClick(input: InstallClickInput): AnalyticsEventInput {
    return {
      type: WIRE_TYPES['listing.install_click'],
      appId: input.appId,
      data: input.data,
      occurredAt: input.occurredAt,
      eventId: input.eventId,
    };
  },
  /**
   * Build an app invocation event (`mkp.telemetry.app.invocation`).
   *
   * @param input - App id, installation id, and surface.
   */
  appInvocation(input: AppInvocationInput): AnalyticsEventInput {
    return {
      type: WIRE_TYPES['app.invocation'],
      appId: input.appId,
      installationId: input.installationId,
      surface: input.surface,
      data: input.data,
      occurredAt: input.occurredAt,
      eventId: input.eventId,
    };
  },
};
