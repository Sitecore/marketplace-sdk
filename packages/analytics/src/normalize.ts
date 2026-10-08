import { IDENTITY_FIELDS, INVOCATION_WIRE_TYPE, SHORT_TYPES, WIRE_TYPES } from './constants';
import type {
  AnalyticsEventInput,
  AnalyticsEventType,
  AnalyticsWireEvent,
  AnalyticsWireType,
  InvocationSurface,
} from './types';
import { createEventId } from './uuid';

export function toWireType(type: AnalyticsEventType): AnalyticsWireType | undefined {
  if (type in WIRE_TYPES) {
    return WIRE_TYPES[type as keyof typeof WIRE_TYPES];
  }

  if (type in SHORT_TYPES) {
    return type as AnalyticsWireType;
  }

  return undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function omitEmpty(value: string | undefined): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function normalizeEvent(input: AnalyticsEventInput): AnalyticsWireEvent | undefined {
  const type = toWireType(input.type);
  const appId = omitEmpty(input.appId);

  if (!type || !appId) {
    return undefined;
  }

  const event: AnalyticsWireEvent = {
    eventId: omitEmpty(input.eventId) ?? createEventId(),
    type,
    occurredAt: omitEmpty(input.occurredAt) ?? new Date().toISOString(),
    appId,
  };

  if (type === INVOCATION_WIRE_TYPE) {
    const installationId = omitEmpty(input.installationId);
    const surface = omitEmpty(input.surface) as InvocationSurface | undefined;
    if (installationId) {
      event.installationId = installationId;
    }
    if (surface) {
      event.surface = surface;
    }
  }

  if (isRecord(input.data)) {
    event.data = { ...input.data };
  }

  return event;
}

export function stripIdentity<T extends Record<string, unknown>>(input: T): T {
  const copy = { ...input };
  for (const field of IDENTITY_FIELDS) {
    delete copy[field];
  }
  return copy;
}
