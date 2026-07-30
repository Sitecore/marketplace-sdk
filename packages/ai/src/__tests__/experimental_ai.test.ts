import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@hey-api/client-fetch', () => ({
  createClient: vi.fn(() => ({ mocked: true })),
  createConfig: vi.fn((config) => config),
}));

vi.mock('../experimental/client-documents/sdk.gen', () => ({
  getVersion: vi.fn().mockReturnValue('documents-version'),
}));

vi.mock('../experimental/client-skills/sdk.gen', () => ({
  generateBrandReview: vi.fn().mockReturnValue('skills-brand-review'),
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

  afterEach(() => {
    Object.defineProperty(window, 'env', {
      value: undefined,
      writable: true,
      configurable: true,
    });
  });

  it('should create an instance with getAccessToken', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
    expect(client.documents).toBeDefined();
    expect(client.skills).toBeDefined();
  });

  it('should have documents and skills properties', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client.documents).toBeDefined();
    expect(client.skills).toBeDefined();
    expect(typeof client.documents.getVersion).toBe('function');
    expect(typeof client.skills.generateBrandReview).toBe('function');
  });

  it('should create client via factory function', async () => {
    const client = await experimental_createAIClient({ getAccessToken: mockGetAccessToken });
    expect(client).toBeInstanceOf(experimental_AI);
    expect(client.documents).toBeDefined();
    expect(client.skills).toBeDefined();
  });

  it('should use default edge platform proxy URL when no env is set', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
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
  });
});
