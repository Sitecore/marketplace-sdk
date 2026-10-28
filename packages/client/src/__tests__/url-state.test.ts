import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CoreError, ErrorCode } from '@sitecore-marketplace-sdk/core';
import { ClientSDK } from '../client';
import { logger } from '../logger';
import * as clientExports from '../index';

vi.mock('../logger');

describe('application.urlState', () => {
  let client: ClientSDK;
  let request: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    client = new ClientSDK({ target: window.parent, targetOrigin: 'https://host.app' });
    request = vi.spyOn(client['coreSdk'], 'request');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mutation sends only the state and resolves with the host response', async () => {
    request.mockResolvedValue({ ok: true });

    await expect(
      client.mutate('application.urlState', { params: { state: { tab: 'seo' } } }),
    ).resolves.toEqual({ ok: true });
    expect(request).toHaveBeenCalledWith('application.urlState:mutation', {
      state: { tab: 'seo' },
    });
  });

  it('every query asks the host and returns its latest value', async () => {
    request
      .mockResolvedValueOnce({ state: { tab: 'a' } })
      .mockResolvedValueOnce({ state: { tab: 'b' } });

    const first = await client.query('application.urlState');
    const second = await client.query('application.urlState');

    expect(request).toHaveBeenCalledTimes(2);
    expect(request).toHaveBeenCalledWith('application.urlState:query', undefined);
    expect(first.data).toEqual({ state: { tab: 'a' } });
    expect(second.data).toEqual({ state: { tab: 'b' } });
  });

  it.each([
    ['a function', { f: () => 1 }, 'NOT_SERIALIZABLE'],
    ['a class instance', new (class View {})(), 'NOT_PLAIN_OBJECT'],
  ])('rejects %s before sending, with the same reason as the host', async (_, state, reason) => {
    await expect(
      client.mutate('application.urlState', { params: { state: state as never } }),
    ).rejects.toMatchObject({ code: ErrorCode.INVALID_REQUEST, details: { reason } });
    expect(request).not.toHaveBeenCalled();
  });

  it('passes host errors through with their code and reason', async () => {
    const hostError = new CoreError(ErrorCode.INVALID_REQUEST, 'Too large', {
      reason: 'STATE_TOO_LARGE',
    });
    request.mockRejectedValue(hostError);

    await expect(
      client.mutate('application.urlState', { params: { state: { big: 'x' } } }),
    ).rejects.toBe(hostError);
  });

  // Hosts without URL state support answer application.* with an empty success, a "No schema"
  // execution error, or METHOD_NOT_FOUND.
  it.each([
    ['an empty response', () => Promise.resolve(undefined)],
    [
      'the "No schema" error',
      () =>
        Promise.reject(
          new CoreError(
            ErrorCode.EXECUTION_ERROR,
            '[client SDK] No schema available for key: application.urlState:mutation',
          ),
        ),
    ],
    ['METHOD_NOT_FOUND', () => Promise.reject(new CoreError(ErrorCode.METHOD_NOT_FOUND, 'none'))],
  ])('reports "not supported" when an older host sends %s', async (_, respond) => {
    request.mockImplementation(respond);

    await expect(
      client.mutate('application.urlState', { params: { state: null } }),
    ).rejects.toMatchObject({
      code: ErrorCode.METHOD_NOT_FOUND,
      message: expect.stringContaining('not supported by this host'),
    });

    const result = await client.query('application.urlState');
    expect(result.isError).toBe(true);
    expect(result.error?.message).toContain('not supported by this host');
  });

  it('keeps empty responses a success for other keys', async () => {
    request.mockResolvedValue(undefined);

    await expect(client.mutate('pages.reloadCanvas')).resolves.toBeUndefined();
  });

  it('sends a Proxy state, such as a Vue reactive object, as plain JSON', async () => {
    request.mockResolvedValue({ ok: true });
    const reactive = new Proxy({ tab: 'seo', filters: { range: '7d' } }, {});
    expect(() => structuredClone(reactive)).toThrow();

    await client.mutate('application.urlState', { params: { state: reactive } });

    const [, sent] = request.mock.calls[0];
    expect(sent).toEqual({ state: { tab: 'seo', filters: { range: '7d' } } });
    expect(() => structuredClone(sent)).not.toThrow();
  });

  it('drops undefined properties, as JSON does', async () => {
    request.mockResolvedValue({ ok: true });

    await client.mutate('application.urlState', {
      params: { state: { tab: 'seo', filter: undefined, nested: { page: 2, sort: undefined } } },
    });

    expect(request.mock.calls[0][1]).toStrictEqual({ state: { tab: 'seo', nested: { page: 2 } } });
  });

  it('sends only the state, without other params', async () => {
    request.mockResolvedValue({ ok: true });
    const params = { state: { tab: 'seo' }, extra: 'dropped' };

    await client.mutate('application.urlState', { params: params as never });
    await client.mutate('application.urlState', { params: { state: null } });

    expect(request.mock.calls[0][1]).toStrictEqual({ state: { tab: 'seo' } });
    expect(request.mock.calls[1][1]).toStrictEqual({ state: null });
  });

  it('never logs the state', async () => {
    request
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ state: { secret: 'read' } });

    await client.mutate('application.urlState', { params: { state: { secret: 'saved' } } });
    await client.query('application.urlState');

    const logged = JSON.stringify([
      vi.mocked(logger.debug).mock.calls,
      vi.mocked(logger.info).mock.calls,
    ]);
    expect(logged).not.toContain('secret');
    expect(logged).toContain('[redacted]');
  });

  it('exports the error and URL state helpers apps need', () => {
    expect(clientExports.CoreError).toBe(CoreError);
    expect(clientExports.ErrorCode).toBe(ErrorCode);
    expect(clientExports.UrlStateErrorReason.STATE_TOO_LARGE).toBe('STATE_TOO_LARGE');
  });
});
