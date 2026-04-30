import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCustomClients, createApiProxy } from '../client-factory';
import type { ApiConfig } from '../types';

// Mock @hey-api/client-fetch
vi.mock('@hey-api/client-fetch', () => ({
  createClient: vi.fn(() => ({ post: vi.fn(), get: vi.fn() })),
  createConfig: vi.fn((config: any) => config),
}));

describe('createCustomClients', () => {
  const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create clients for all API types', () => {
    const apiConfigs: Record<string, ApiConfig> = {
      api1: { baseUrl: 'https://api1.example.com', sdk: {}, name: 'API 1' },
      api2: { baseUrl: 'https://api2.example.com', sdk: {}, name: 'API 2' },
    };

    const clients = createCustomClients(apiConfigs, mockGetAccessToken, 'TestLabel');

    expect(clients.api1).toBeDefined();
    expect(clients.api2).toBeDefined();
  });
});

describe('createApiProxy', () => {
  const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should wrap SDK methods with client and headers injection', () => {
    const mockMethod = vi.fn().mockReturnValue(Promise.resolve({ data: 'test' }));
    const sdk = { myOperation: mockMethod };

    const apiConfigs: Record<string, ApiConfig> = {
      testApi: { baseUrl: 'https://test.example.com', sdk, name: 'Test API' },
    };

    const clients = createCustomClients(apiConfigs, mockGetAccessToken, 'TestLabel');
    const proxy = createApiProxy('testApi', apiConfigs, clients, 'TestLabel');

    proxy.myOperation({ body: { key: 'value' } });

    expect(mockMethod).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { key: 'value' },
        client: clients.testApi,
        headers: expect.objectContaining({
          'sc-resource': 'marketplace',
          'sc-marketplace-auth': 'interactive/v1',
        }),
      }),
    );
  });

  it('should cache wrapped methods', () => {
    const mockMethod = vi.fn().mockReturnValue(Promise.resolve());
    const sdk = { myOperation: mockMethod };

    const apiConfigs: Record<string, ApiConfig> = {
      testApi: { baseUrl: 'https://test.example.com', sdk, name: 'Test API' },
    };

    const clients = createCustomClients(apiConfigs, mockGetAccessToken, 'TestLabel');
    const proxy = createApiProxy('testApi', apiConfigs, clients, 'TestLabel');

    const method1 = proxy.myOperation;
    const method2 = proxy.myOperation;

    expect(method1).toBe(method2);
  });

  it('should return non-function properties as-is', () => {
    const sdk = { version: '1.0.0', myOperation: vi.fn() };

    const apiConfigs: Record<string, ApiConfig> = {
      testApi: { baseUrl: 'https://test.example.com', sdk, name: 'Test API' },
    };

    const clients = createCustomClients(apiConfigs, mockGetAccessToken, 'TestLabel');
    const proxy = createApiProxy('testApi', apiConfigs, clients, 'TestLabel');

    expect(proxy.version).toBe('1.0.0');
  });
});
