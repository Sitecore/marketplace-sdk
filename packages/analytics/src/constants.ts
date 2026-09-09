import type { AnalyticsShortType, AnalyticsWireType } from './types';

export const WIRE_TYPES = {
  'listing.view': 'mkp.telemetry.listing.view',
  'listing.install_click': 'mkp.telemetry.listing.install_click',
  'app.invocation': 'mkp.telemetry.app.invocation',
} as const satisfies Record<AnalyticsShortType, AnalyticsWireType>;

export const SHORT_TYPES = {
  'mkp.telemetry.listing.view': 'listing.view',
  'mkp.telemetry.listing.install_click': 'listing.install_click',
  'mkp.telemetry.app.invocation': 'app.invocation',
} as const;

export const INVOCATION_WIRE_TYPE: AnalyticsWireType = WIRE_TYPES['app.invocation'];

export const IDENTITY_FIELDS = ['actorOrgId', 'actorId', 'actorTenantId', 'orgId', 'dims'] as const;

export const DEFAULT_BATCH = {
  maxSize: 20,
  maxWaitMs: 5000,
  maxQueue: 1000,
} as const;

export const DEFAULT_RETRY = {
  maxAttempts: 4,
  baseDelayMs: 200,
  maxDelayMs: 5000,
} as const;
