import { describe, expect, it } from 'vitest';
import { toWireType, normalizeEvent, stripIdentity } from '../normalize';
import { events } from '../events';

describe('toWireType', () => {
  it('maps short names to wire types', () => {
    expect(toWireType('listing.view')).toBe('mkp.telemetry.listing.view');
    expect(toWireType('listing.install_click')).toBe('mkp.telemetry.listing.install_click');
    expect(toWireType('app.invocation')).toBe('mkp.telemetry.app.invocation');
  });

  it('accepts full wire types', () => {
    expect(toWireType('mkp.telemetry.listing.view')).toBe('mkp.telemetry.listing.view');
  });

  it('returns undefined for unknown types', () => {
    expect(toWireType('install' as never)).toBeUndefined();
  });
});

describe('normalizeEvent', () => {
  it('fills eventId and occurredAt and omits empty optional fields', () => {
    const event = normalizeEvent({
      type: 'listing.view',
      appId: 'app-1',
      installationId: '',
      surface: '   ',
    });

    expect(event).toMatchObject({
      type: 'mkp.telemetry.listing.view',
      appId: 'app-1',
    });
    expect(event?.eventId).toMatch(/^[0-9a-f-]{36}$/);
    expect(event?.occurredAt).toBeTruthy();
    expect(event?.installationId).toBeUndefined();
    expect(event?.surface).toBeUndefined();
    expect(event?.data).toBeUndefined();
  });

  it('keeps a caller-supplied eventId across normalization', () => {
    const event = normalizeEvent({
      type: 'listing.install_click',
      appId: 'app-1',
      eventId: 'stable-id',
      occurredAt: '2026-08-03T22:58:20.000Z',
      data: { cta: 'install' },
    });

    expect(event?.eventId).toBe('stable-id');
    expect(event?.occurredAt).toBe('2026-08-03T22:58:20.000Z');
    expect(event?.data).toEqual({ cta: 'install' });
  });

  it('includes installationId and surface only for invocation', () => {
    const listing = normalizeEvent({
      type: 'listing.view',
      appId: 'app-1',
      installationId: 'inst-1',
      surface: 'standalone',
    });
    const invocation = normalizeEvent({
      type: 'app.invocation',
      appId: 'app-1',
      installationId: 'inst-1',
      surface: 'puzzle',
    });

    expect(listing?.installationId).toBeUndefined();
    expect(listing?.surface).toBeUndefined();
    expect(invocation?.installationId).toBe('inst-1');
    expect(invocation?.surface).toBe('puzzle');
  });

  it('omits empty invocation installationId and surface', () => {
    const event = normalizeEvent({
      type: 'app.invocation',
      appId: 'app-1',
      installationId: '  ',
      surface: '',
    });
    expect(event?.installationId).toBeUndefined();
    expect(event?.surface).toBeUndefined();
  });

  it('returns undefined without type or appId', () => {
    expect(normalizeEvent({ type: 'nope' as never, appId: 'app-1' })).toBeUndefined();
    expect(normalizeEvent({ type: 'listing.view', appId: '  ' })).toBeUndefined();
  });

  it('ignores non-object data', () => {
    const event = normalizeEvent({
      type: 'listing.view',
      appId: 'app-1',
      data: 'nope' as never,
    });
    expect(event?.data).toBeUndefined();
  });
});

describe('stripIdentity', () => {
  it('removes identity and dims fields', () => {
    expect(
      stripIdentity({
        appId: 'app-1',
        actorOrgId: 'org',
        actorId: 'user',
        actorTenantId: 't',
        orgId: 'pub',
        dims: { locale: 'en' },
      }),
    ).toEqual({ appId: 'app-1' });
  });
});

describe('events', () => {
  it('builds listing.view', () => {
    expect(events.listingView({ appId: 'app-1', data: { position: 2 } })).toEqual({
      type: 'mkp.telemetry.listing.view',
      appId: 'app-1',
      data: { position: 2 },
      occurredAt: undefined,
      eventId: undefined,
    });
  });

  it('builds listing.install_click', () => {
    expect(events.installClick({ appId: 'app-1', data: { cta: 'install' } }).type).toBe(
      'mkp.telemetry.listing.install_click',
    );
  });

  it('builds app.invocation', () => {
    expect(
      events.appInvocation({
        appId: 'app-1',
        installationId: 'inst-1',
        surface: 'standalone',
        data: { durationMs: 12 },
      }),
    ).toMatchObject({
      type: 'mkp.telemetry.app.invocation',
      installationId: 'inst-1',
      surface: 'standalone',
    });
  });
});
