import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CoreError, ErrorCode } from '@sitecore-marketplace-sdk/core';
import { ClientSDK } from '../client';

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
});
