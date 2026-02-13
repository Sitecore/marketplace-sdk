import { describe, it, expect, afterEach } from 'vitest';
import { getEdgePlatformProxyUrl } from '../edge-platform';
import { DEFAULT_EDGE_PLATFORM_PROXY_URL } from '../constants';

describe('getEdgePlatformProxyUrl', () => {
  afterEach(() => {
    // Clean up window.env
    if (typeof window !== 'undefined') {
      delete (window as any).env;
    }
  });

  it('should return default URL when no env is set', () => {
    const url = getEdgePlatformProxyUrl();
    expect(url).toBe(DEFAULT_EDGE_PLATFORM_PROXY_URL);
  });

  it('should return custom fallback URL when provided and no env is set', () => {
    const customUrl = 'https://custom-fallback.example.com';
    const url = getEdgePlatformProxyUrl(customUrl);
    expect(url).toBe(customUrl);
  });

  it('should return window.env.EDGE_PLATFORM_PROXY_URL when set', () => {
    const envUrl = 'https://env-proxy.example.com';
    (window as any).env = { EDGE_PLATFORM_PROXY_URL: envUrl };

    const url = getEdgePlatformProxyUrl();
    expect(url).toBe(envUrl);
  });

  it('should prefer window.env over default', () => {
    const envUrl = 'https://env-proxy.example.com';
    (window as any).env = { EDGE_PLATFORM_PROXY_URL: envUrl };

    const url = getEdgePlatformProxyUrl('https://fallback.example.com');
    expect(url).toBe(envUrl);
  });
});
