import { describe, it, expect, vi, beforeEach } from 'vitest';
import { experimental_AI, experimental_createAIClient } from '../experimental_ai';

describe('experimental_AI', () => {
  const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create an instance with getAccessToken', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
    expect(client.skills).toBeDefined();
  });

  it('should have a skills property', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client.skills).toBeDefined();
  });

  it('should create client via factory function', async () => {
    const client = await experimental_createAIClient({ getAccessToken: mockGetAccessToken });
    expect(client).toBeInstanceOf(experimental_AI);
    expect(client.skills).toBeDefined();
  });

  it('should use default edge platform proxy URL when no env is set', () => {
    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();
  });

  it('should use EDGE_PLATFORM_PROXY_URL from window.env when available', () => {
    const customUrl = 'https://custom-proxy.example.com';
    (window as any).env = { EDGE_PLATFORM_PROXY_URL: customUrl };

    const client = new experimental_AI({ getAccessToken: mockGetAccessToken });
    expect(client).toBeDefined();

    delete (window as any).env;
  });
});
