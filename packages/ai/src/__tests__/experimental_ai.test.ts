import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@hey-api/client-fetch', () => ({
  createClient: vi.fn(() => ({})),
  createConfig: vi.fn(() => ({})),
}));

vi.mock('../experimental/client-brands/sdk.gen', () => ({
  getVersion: vi.fn(),
}));

vi.mock('../experimental/client-skills/sdk.gen', () => ({
  generateBrandReview: vi.fn(),
}));

import { experimental_AI, experimental_createAIClient } from '../experimental_ai';

describe('experimental_AI', () => {
  const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create an instance with getAccessToken', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
    expect(client.brands).toBeDefined();
    expect(typeof client.brands.getVersion).toBe('function');
    expect(client.skills).toBeDefined();
    expect(typeof client.skills.generateBrandReview).toBe('function');
  });

  it('should have a skills property', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client.brands).toBeDefined();
    expect(typeof client.brands.getVersion).toBe('function');
    expect(client.skills).toBeDefined();
    expect(typeof client.skills.generateBrandReview).toBe('function');
  });

  it('should create client via factory function', async () => {
    const client = await experimental_createAIClient({ getAccessToken: mockGetAccessToken });
    expect(client).toBeInstanceOf(experimental_AI);
    expect(client.brands).toBeDefined();
    expect(typeof client.brands.getVersion).toBe('function');
    expect(client.skills).toBeDefined();
    expect(typeof client.skills.generateBrandReview).toBe('function');
  });

  it('should use default edge platform proxy URL when no env is set', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
  });

  it('should use EDGE_PLATFORM_PROXY_URL from window.env when available', () => {
    const customUrl = 'https://custom-proxy.example.com';
    Object.defineProperty(window, 'env', {
      configurable: true,
      value: { EDGE_PLATFORM_PROXY_URL: customUrl },
      writable: true,
    });

    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();

    Object.defineProperty(window, 'env', {
      configurable: true,
      value: undefined,
      writable: true,
    });
  });
});
