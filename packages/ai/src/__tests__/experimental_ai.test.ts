import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  createClient: vi.fn((config) => ({ config })),
  createConfig: vi.fn((config) => config),
  generateBrandReview: vi.fn().mockResolvedValue('skills-result'),
  listBrandKits: vi.fn().mockResolvedValue('brands-result'),
  createBrandKit: vi.fn().mockResolvedValue('brands-mutation-result'),
}));

vi.mock('@hey-api/client-fetch', () => ({
  createClient: mocks.createClient,
  createConfig: mocks.createConfig,
}));

vi.mock('../experimental/client-skills/sdk.gen', () => ({
  generateBrandReview: mocks.generateBrandReview,
}));

vi.mock('../experimental/client-brands/sdk.gen', () => ({
  listBrandKits: mocks.listBrandKits,
  createBrandKit: mocks.createBrandKit,
}));

import { experimental_AI, experimental_createAIClient } from '../experimental_ai';

describe('experimental_AI', () => {
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
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
    expect(client.skills).toBeDefined();
    expect(client.brands).toBeDefined();
    expect(typeof client.skills.generateBrandReview).toBe('function');
    expect(typeof client.brands.listBrandKits).toBe('function');
    expect(typeof client.brands.createBrandKit).toBe('function');
  });

  it('should have a skills property', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client.skills).toBeDefined();
    expect(client.brands).toBeDefined();
  });

  it('should create client via factory function', async () => {
    const client = await experimental_createAIClient({ getAccessToken: mockGetAccessToken });
    expect(client).toBeInstanceOf(experimental_AI);
    expect(client.skills).toBeDefined();
    expect(client.brands).toBeDefined();
  });

  it('should use default edge platform proxy URL when no env is set', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
    expect(mocks.createConfig).toHaveBeenCalledTimes(2);
    expect(mocks.createConfig.mock.calls[0][0].baseUrl).toBe(
      'https://edge-platform.sitecorecloud.io/stream/ai-skills-api/',
    );
    expect(mocks.createConfig.mock.calls[1][0].baseUrl).toBe(
      'https://edge-platform.sitecorecloud.io/ai-brands-api',
    );
  });

  it('should use EDGE_PLATFORM_PROXY_URL from window.env when available', () => {
    const customUrl = 'https://custom-proxy.example.com';
    Object.defineProperty(window, 'env', {
      value: { EDGE_PLATFORM_PROXY_URL: customUrl },
      writable: true,
      configurable: true,
    });

    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
    expect(mocks.createConfig).toHaveBeenCalledTimes(2);
    expect(mocks.createConfig.mock.calls[0][0].baseUrl).toBe(
      `${customUrl}/stream/ai-skills-api/`,
    );
    expect(mocks.createConfig.mock.calls[1][0].baseUrl).toBe(
      `${customUrl}/ai-brands-api`,
    );
  });
});
