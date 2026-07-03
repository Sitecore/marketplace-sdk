import { describe, it, expect, vi, beforeEach } from 'vitest';
import { experimental_AITest2, experimental_createAITest2Client } from '../experimental_aiTest2';

vi.mock('@hey-api/client-fetch', () => ({
  createClient: vi.fn((config: any) => ({ config })),
  createConfig: vi.fn((config: any) => config),
}));

vi.mock('../experimental/client-authoring/sdk.gen', () => ({
  someOperation: vi.fn(),
}));

describe('experimental_AITest2', () => {
  const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'env', {
      value: undefined,
      writable: true,
      configurable: true,
    });
  });

  it('should create an instance with getAccessToken', () => {
    const client = new experimental_AITest2({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
    expect(client.authoring).toBeDefined();
  });

  it('should have an authoring property', () => {
    const client = new experimental_AITest2({ getAccessToken: mockGetAccessToken });
    expect(client.authoring).toBeDefined();
    expect(typeof client.authoring.someOperation).toBe('function');
  });

  it('should create client via factory function', async () => {
    const client = await experimental_createAITest2Client({ getAccessToken: mockGetAccessToken });
    expect(client).toBeInstanceOf(experimental_AITest2);
    expect(client.authoring).toBeDefined();
  });

  it('should use default edge platform proxy URL when no env is set', () => {
    const client = new experimental_AITest2({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
  });

  it('should use EDGE_PLATFORM_PROXY_URL from window.env when available', () => {
    const customUrl = 'https://custom-proxy.example.com';
    Object.defineProperty(window, 'env', {
      value: { EDGE_PLATFORM_PROXY_URL: customUrl },
      writable: true,
      configurable: true,
    });

    const client = new experimental_AITest2({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();

    Object.defineProperty(window, 'env', {
      value: undefined,
      writable: true,
      configurable: true,
    });
  });
});