import { describe, it, expect } from 'vitest';
import { DEFAULT_HEADERS, DEFAULT_EDGE_PLATFORM_PROXY_URL } from '../constants';

describe('constants', () => {
  it('should export DEFAULT_HEADERS with correct values', () => {
    expect(DEFAULT_HEADERS).toEqual({
      'sc-resource': 'marketplace',
      'sc-marketplace-auth': 'interactive/v1',
    });
  });

  it('should export DEFAULT_EDGE_PLATFORM_PROXY_URL', () => {
    expect(DEFAULT_EDGE_PLATFORM_PROXY_URL).toBe('https://edge-platform.sitecorecloud.io');
  });
});
