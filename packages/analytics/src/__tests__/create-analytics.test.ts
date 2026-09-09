import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAnalytics } from '../create-analytics';
import { events } from '../events';
import { isClientErrorStatus, isSuccessStatus, postTelemetry } from '../transport';
import type { AnalyticsWireEvent } from '../types';

function jsonResponse(status: number): Response {
  return { status, ok: status >= 200 && status < 300 } as Response;
}

describe('transport helpers', () => {
  it('classifies HTTP statuses', () => {
    expect(isSuccessStatus(202)).toBe(true);
    expect(isSuccessStatus(199)).toBe(false);
    expect(isClientErrorStatus(400)).toBe(true);
    expect(isClientErrorStatus(413)).toBe(true);
    expect(isClientErrorStatus(500)).toBe(false);
  });

  it('posts the telemetry envelope', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(202));
    vi.stubGlobal('fetch', fetchMock);

    await postTelemetry({
      endpoint: 'https://example.test/telemetry',
      token: 'token-1',
      events: [{ eventId: 'e1', type: 'mkp.telemetry.listing.view', occurredAt: 't', appId: 'a' }],
      keepalive: true,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.test/telemetry',
      expect.objectContaining({
        method: 'POST',
        keepalive: true,
        headers: {
          Authorization: 'Bearer token-1',
          'Content-Type': 'application/json',
        },
      }),
    );
  });
});

describe('createAnalytics', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue(jsonResponse(202));
    vi.stubGlobal('fetch', fetchMock);
    vi.useFakeTimers();
  });

  afterEach(async () => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
  });

  function client(overrides: Partial<Parameters<typeof createAnalytics>[0]> = {}) {
    return createAnalytics({
      endpoint: 'https://example.test/api/marketplace/v1/telemetry',
      getAccessToken: () => 'token',
      batch: { maxSize: 20, maxWaitMs: 5000, maxQueue: 1000 },
      ...overrides,
    });
  }

  function postedEvents(): AnalyticsWireEvent[] {
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    return JSON.parse(String(init.body)).events;
  }

  it('maps short names and omits identity fields on the wire', async () => {
    const analytics = client({ batch: { maxSize: 1, maxWaitMs: 60_000 } });

    await analytics.track('listing.view', {
      appId: 'app-1',
      actorOrgId: 'forged-org',
      actorId: 'forged-user',
      orgId: 'forged-publisher',
      dims: { locale: 'en-US' },
      data: { position: 3, listingSource: 'catalog_grid' },
    });

    await vi.runAllTimersAsync();

    expect(fetchMock).toHaveBeenCalledOnce();
    const [event] = postedEvents();
    expect(event.type).toBe('mkp.telemetry.listing.view');
    expect(event.appId).toBe('app-1');
    expect(event.data).toEqual({ position: 3, listingSource: 'catalog_grid' });
    expect(event).not.toHaveProperty('actorOrgId');
    expect(event).not.toHaveProperty('actorId');
    expect(event).not.toHaveProperty('orgId');
    expect(event).not.toHaveProperty('dims');
    await analytics.shutdown();
  });

  it('accepts builders and invocation fields', async () => {
    const analytics = client({ batch: { maxSize: 1, maxWaitMs: 60_000 } });
    await analytics.track(
      events.appInvocation({
        appId: 'app-1',
        installationId: 'inst-7',
        surface: 'standalone',
      }),
    );
    await vi.runAllTimersAsync();

    expect(postedEvents()[0]).toMatchObject({
      type: 'mkp.telemetry.app.invocation',
      installationId: 'inst-7',
      surface: 'standalone',
    });
    await analytics.shutdown();
  });

  it('keeps eventId stable across a retry', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce(jsonResponse(202));
    const analytics = client({ batch: { maxSize: 1, maxWaitMs: 60_000 } });

    await analytics.track('listing.install_click', { appId: 'app-1', eventId: 'same-id', data: { cta: 'install' } });
    const flush = analytics.flush();
    await vi.runAllTimersAsync();
    await flush;

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const first = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body)).events[0];
    const second = JSON.parse(String((fetchMock.mock.calls[1][1] as RequestInit).body)).events[0];
    expect(first.eventId).toBe('same-id');
    expect(second.eventId).toBe('same-id');
    await analytics.shutdown();
  });

  it('honours retry.maxAttempts for transient failures', async () => {
    fetchMock.mockRejectedValue(new Error('offline'));
    const analytics = client({
      batch: { maxSize: 1, maxWaitMs: 60_000 },
      retry: { maxAttempts: 2, baseDelayMs: 10, maxDelayMs: 10 },
    });

    await analytics.track('listing.view', { appId: 'app-1' });
    const flush = analytics.flush();
    await vi.advanceTimersByTimeAsync(30_000);
    await flush;

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const shutdown = analytics.shutdown();
    await vi.advanceTimersByTimeAsync(30_000);
    await shutdown;
  });

  it('does not delay when retry.maxAttempts is 1', async () => {
    fetchMock.mockResolvedValue(jsonResponse(503));
    const analytics = client({
      batch: { maxSize: 1, maxWaitMs: 60_000 },
      retry: { maxAttempts: 1 },
    });

    await analytics.track('listing.view', { appId: 'app-1' });
    await analytics.flush();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    await analytics.shutdown();
  });

  it('fetches a fresh token on each flush attempt', async () => {
    const getAccessToken = vi.fn().mockResolvedValueOnce('t1').mockResolvedValueOnce('t2');
    fetchMock.mockResolvedValueOnce(jsonResponse(503)).mockResolvedValueOnce(jsonResponse(202));
    const analytics = client({ getAccessToken, batch: { maxSize: 1, maxWaitMs: 60_000 } });

    await analytics.track('listing.view', { appId: 'app-1' });
    const flush = analytics.flush();
    await vi.runAllTimersAsync();
    await flush;

    expect(getAccessToken).toHaveBeenCalledTimes(2);
    expect((fetchMock.mock.calls[0][1] as RequestInit).headers).toMatchObject({ Authorization: 'Bearer t1' });
    expect((fetchMock.mock.calls[1][1] as RequestInit).headers).toMatchObject({ Authorization: 'Bearer t2' });
    await analytics.shutdown();
  });

  it('does not throw when transport fails', async () => {
    fetchMock.mockRejectedValue(new Error('offline'));
    const onError = vi.fn(() => {
      throw new Error('onError boom');
    });
    const analytics = client({ onError, batch: { maxSize: 1, maxWaitMs: 60_000 } });

    await expect(analytics.track('listing.view', { appId: 'app-1' })).resolves.toBeUndefined();
    const flush = analytics.flush();
    await vi.advanceTimersByTimeAsync(30_000);
    await expect(flush).resolves.toBeUndefined();
    expect(onError).toHaveBeenCalled();
    const shutdown = analytics.shutdown();
    await vi.advanceTimersByTimeAsync(30_000);
    await shutdown;
  });

  it('drops 4xx batches including 413 and does not retry', async () => {
    fetchMock.mockResolvedValue(jsonResponse(413));
    const analytics = client({ batch: { maxSize: 1, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    await analytics.flush();
    expect(fetchMock).toHaveBeenCalledOnce();
    await analytics.shutdown();
  });

  it('treats 202 as success', async () => {
    fetchMock.mockResolvedValue(jsonResponse(202));
    const analytics = client({ batch: { maxSize: 1, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    await analytics.flush();
    expect(fetchMock).toHaveBeenCalledOnce();
    await analytics.shutdown();
  });

  it('flushes when the batch is full', async () => {
    const analytics = client({ batch: { maxSize: 2, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'a' });
    expect(fetchMock).not.toHaveBeenCalled();
    await analytics.track('listing.view', { appId: 'b' });
    await vi.runAllTimersAsync();
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(postedEvents()).toHaveLength(2);
    await analytics.shutdown();
  });

  it('flushes after maxWaitMs', async () => {
    const analytics = client({ batch: { maxSize: 20, maxWaitMs: 5000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    expect(fetchMock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(5000);
    expect(fetchMock).toHaveBeenCalledOnce();
    await analytics.shutdown();
  });

  it('drops oldest events past maxQueue', async () => {
    const onError = vi.fn();
    const analytics = client({ batch: { maxSize: 50, maxWaitMs: 60_000, maxQueue: 2 }, onError });
    await analytics.track('listing.view', { appId: 'one', eventId: '1' });
    await analytics.track('listing.view', { appId: 'two', eventId: '2' });
    await analytics.track('listing.view', { appId: 'three', eventId: '3' });
    await analytics.flush();

    const ids = postedEvents().map((event) => event.eventId);
    expect(ids).toEqual(['2', '3']);
    expect(onError).toHaveBeenCalled();
    await analytics.shutdown();
  });

  it('no-ops when disabled or sampled out', async () => {
    const disabled = client({ enabled: false, batch: { maxSize: 1 } });
    await disabled.track('listing.view', { appId: 'app-1' });
    await disabled.flush();
    expect(fetchMock).not.toHaveBeenCalled();
    await disabled.shutdown();

    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const sampled = client({ sampling: 0.5, batch: { maxSize: 1 } });
    await sampled.track('listing.view', { appId: 'app-1' });
    await sampled.flush();
    expect(fetchMock).not.toHaveBeenCalled();
    await sampled.shutdown();
  });

  it('keeps events queued when the token provider fails', async () => {
    const getAccessToken = vi.fn().mockRejectedValueOnce(new Error('stale')).mockResolvedValue('token');
    const analytics = client({ getAccessToken, batch: { maxSize: 1, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1', eventId: 'keep-me' });
    const first = analytics.flush();
    await vi.runAllTimersAsync();
    await first;
    expect(postedEvents()[0].eventId).toBe('keep-me');
    await analytics.shutdown();
  });

  it('keeps events queued when the token is empty', async () => {
    const getAccessToken = vi.fn().mockResolvedValueOnce('').mockResolvedValue('token');
    const analytics = client({ getAccessToken, batch: { maxSize: 1, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    const flush = analytics.flush();
    await vi.runAllTimersAsync();
    await flush;
    expect(fetchMock).toHaveBeenCalledOnce();
    await analytics.shutdown();
  });

  it('flushes on pagehide with keepalive', async () => {
    const analytics = client({ batch: { maxSize: 20, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    window.dispatchEvent(new Event('pagehide'));
    await vi.runAllTimersAsync();
    expect(fetchMock).toHaveBeenCalledOnce();
    expect((fetchMock.mock.calls[0][1] as RequestInit).keepalive).toBe(true);
    await analytics.shutdown();
  });

  it('flushes on visibilitychange hidden', async () => {
    const analytics = client({ batch: { maxSize: 20, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
    await vi.runAllTimersAsync();
    expect(fetchMock).toHaveBeenCalledOnce();
    await analytics.shutdown();
  });

  it('does not flush on visibilitychange visible', async () => {
    const analytics = client({ batch: { maxSize: 20, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    document.dispatchEvent(new Event('visibilitychange'));
    await Promise.resolve();
    expect(fetchMock).not.toHaveBeenCalled();
    await analytics.shutdown();
  });

  it('swallows invalid events and missing track props', async () => {
    const onError = vi.fn();
    const analytics = client({ onError, batch: { maxSize: 1 } });
    await analytics.track('listing.view' as never);
    await analytics.track({ type: 'nope' as never, appId: 'app-1' });
    await analytics.flush();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    await analytics.shutdown();
  });

  it('does not track after shutdown', async () => {
    const analytics = client({ batch: { maxSize: 1 } });
    await analytics.shutdown();
    await analytics.track('listing.view', { appId: 'app-1' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('swallows errors thrown while tracking', async () => {
    const onError = vi.fn();
    vi.spyOn(Math, 'random').mockImplementation(() => {
      throw new Error('rng');
    });
    const analytics = client({ sampling: 0.5, onError, batch: { maxSize: 1 } });
    await expect(analytics.track('listing.view', { appId: 'app-1' })).resolves.toBeUndefined();
    expect(onError).toHaveBeenCalled();
    await analytics.shutdown();
  });

  it('coalesces concurrent flush calls onto one in-flight request', async () => {
    fetchMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(jsonResponse(202)), 25)),
    );
    const analytics = client({ batch: { maxSize: 20, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    const first = analytics.flush();
    const second = analytics.flush();
    expect(second).toBe(first);
    await vi.advanceTimersByTimeAsync(25);
    await Promise.all([first, second]);
    expect(fetchMock).toHaveBeenCalledOnce();
    await analytics.shutdown();
  });

  it('retries 5xx then succeeds', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(500)).mockResolvedValueOnce(jsonResponse(202));
    const analytics = client({ batch: { maxSize: 1, maxWaitMs: 60_000 } });
    await analytics.track('listing.view', { appId: 'app-1' });
    const flush = analytics.flush();
    await vi.runAllTimersAsync();
    await flush;
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await analytics.shutdown();
  });
});
