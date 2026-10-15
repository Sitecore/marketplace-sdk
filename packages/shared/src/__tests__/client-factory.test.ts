import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createCustomClients, createApiProxy } from '../client-factory';
import type { ApiConfig } from '../types';

// Mock @hey-api/client-fetch
vi.mock('@hey-api/client-fetch', () => ({
  createClient: vi.fn(() => ({ post: vi.fn(), get: vi.fn(), getConfig: () => ({}) })),
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

  afterEach(() => {
    vi.useRealTimers();
  });

  it('enforces default, global, and request-local deadlines independently', async () => {
    vi.useFakeTimers();
    const fetch = vi.fn((request: Request) => new Promise<Response>((_resolve, reject) => {
      request.signal.addEventListener('abort', () => reject(request.signal.reason), { once: true });
    }));
    const method = vi.fn((options: any) => options.fetch(new Request('https://example.com', { signal: options.signal })));
    const configs = { api: { baseUrl: 'https://example.com', sdk: { method }, name: 'API' } };
    const clients = createCustomClients(configs, mockGetAccessToken, 'test');
    const globalProxy = createApiProxy('api', configs, clients, 'test', undefined, 1000);
    const defaultProxy = createApiProxy('api', configs, clients, 'test');
    const short = globalProxy.method({ fetch, timeoutMs: 100 }).catch((error: Error) => error);
    const global = globalProxy.method({ fetch }).catch((error: Error) => error);
    const defaultRequest = defaultProxy.method({ fetch }).catch((error: Error) => error);
    await vi.advanceTimersByTimeAsync(100);
    expect(await short).toMatchObject({ name: 'TimeoutError' });
    expect(fetch.mock.calls[1][0].signal.aborted).toBe(false);
    expect(method.mock.calls[0][0]).not.toHaveProperty('timeoutMs');
    await vi.advanceTimersByTimeAsync(900);
    expect(await global).toMatchObject({ name: 'TimeoutError' });
    expect(fetch.mock.calls[2][0].signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(29000);
    expect(await defaultRequest).toMatchObject({ name: 'TimeoutError' });
    expect(vi.getTimerCount()).toBe(0);
  });

  it('preserves caller cancellation and cleans up successful request timers', async () => {
    vi.useFakeTimers();
    const method = (options: any) => options.fetch(new Request('https://example.com', { signal: options.signal }));
    const configs = { api: { baseUrl: 'https://example.com', sdk: { method }, name: 'API' } };
    const clients = createCustomClients(configs, mockGetAccessToken, 'test');
    const proxy = createApiProxy('api', configs, clients, 'test');
    const controller = new AbortController();
    const fetch = vi.fn((request: Request) => new Promise<Response>((_resolve, reject) => {
      request.signal.addEventListener('abort', () => reject(request.signal.reason), { once: true });
    }));
    const result = proxy.method({ fetch, signal: controller.signal }).catch((error: Error) => error);
    const reason = new Error('cancelled');
    controller.abort(reason);
    expect(await result).toBe(reason);
    expect(vi.getTimerCount()).toBe(0);
    const response = new Response('ok');
    expect(await proxy.method({ fetch: vi.fn().mockResolvedValue(response) })).toBe(response);
    expect(vi.getTimerCount()).toBe(0);
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
