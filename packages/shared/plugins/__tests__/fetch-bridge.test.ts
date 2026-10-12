import { afterEach, describe, expect, it, vi } from 'vitest';
import { clientSdkfetch as aiFetch } from '../../../ai/src/client-sdk-fetch';
import { clientSdkfetch as xmcFetch } from '../../../xmc/src/client-sdk-fetch';

afterEach(() => vi.unstubAllGlobals());

describe.each([
  { module: 'AI', fetch: aiFetch },
  { module: 'XMC', fetch: xmcFetch },
])('$module Marketplace fetch bridge', ({ fetch }) => {
  it('forwards an existing Request unchanged', async () => {
    const response = new Response('ok');
    const sdkFetch = vi.fn().mockResolvedValue(response);
    vi.stubGlobal('window', { sitecore_marketplace__clientSdk: { _fetch: sdkFetch } });
    const request = new Request('https://example.com/widgets');
    expect(await fetch(request)).toBe(response);
    expect(sdkFetch).toHaveBeenCalledWith(request);
  });

  it('normalizes URL and RequestInit arguments for the 0.99 runtime', async () => {
    const sdkFetch = vi.fn().mockResolvedValue(new Response('ok'));
    vi.stubGlobal('window', { sitecore_marketplace__clientSdk: { _fetch: sdkFetch } });
    await fetch(new URL('https://example.com/widgets'), { method: 'POST', body: 'payload' });
    const request: Request = sdkFetch.mock.calls[0][0];
    expect(request).toBeInstanceOf(Request);
    expect(request.method).toBe('POST');
    expect(await request.text()).toBe('payload');
  });

  it('rejects explicitly when the Marketplace ClientSDK is missing', async () => {
    vi.stubGlobal('window', {});
    await expect(fetch('https://example.com/widgets')).rejects.toThrow(
      'ClientSDK is not available on the window object.',
    );
  });
});
