import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { clientSdkfetch } from '../client-sdk-fetch';
import { ClientSDK } from '@sitecore-marketplace-sdk/client';

describe('clientSdkfetch', () => {
  let mockClientSDK: ClientSDK;

  beforeEach(() => {
    mockClientSDK = {
      _fetch: vi.fn().mockResolvedValue({
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        statusText: 'OK',
        body: new Blob(['{"message":"success"}'], { type: 'application/json' }),
      }),
    } as unknown as ClientSDK;

    (window as any).sitecore_marketplace__clientSdk = mockClientSDK;
  });

  afterEach(() => {
    delete (window as any).sitecore_marketplace__clientSdk;
  });

  it('should throw an error if ClientSDK is not available', async () => {
    delete (window as any).sitecore_marketplace__clientSdk;

    const request = new Request('https://example.com/api/test', { method: 'GET' });

    await expect(clientSdkfetch(request)).rejects.toThrow(
      'ClientSDK is not available on the window object.',
    );
  });

  it('should make a request using ClientSDK and return a response', async () => {
    const request = new Request('https://example.com/api/test', { method: 'GET' });

    const response = await clientSdkfetch(request);

    expect(mockClientSDK['_fetch']).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
        url: 'https://example.com/api/test',
      }),
    );
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });
});
