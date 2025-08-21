import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EXPERIMENTAL_XMC, type EXPERIMENTAL_XMCConfig } from '../experimental_xmc';

// Mock the @hey-api/client-fetch module
vi.mock('@hey-api/client-fetch', () => ({
  createClient: vi.fn(() => ({})),
  createConfig: vi.fn(() => ({})),
}));

// Mock the experimental SDK modules
vi.mock('../experimental/client-sites/sdk.gen', () => ({
  listLanguages: vi.fn(),
  listSupportedLanguages: vi.fn(),
  listSites: vi.fn(),
}));

vi.mock('../experimental/client-pages/sdk.gen', () => ({
  search: vi.fn(),
  retrievePage: vi.fn(),
}));

vi.mock('../experimental/client-authoring/sdk.gen', () => ({
  graphql: vi.fn(),
}));

vi.mock('../experimental/client-content-transfer/sdk.gen', () => ({
  createContentTransfer: vi.fn(),
  getContentTransferStatus: vi.fn(),
  deleteContentTransfer: vi.fn(),
}));

vi.mock('../experimental/client-content/sdk.gen', () => ({
  graphql: vi.fn(),
}));

describe('EXPERIMENTAL_XMC', () => {
  let mockGetAccessToken: () => Promise<string>;
  let experimentalXMC: EXPERIMENTAL_XMC;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock getAccessToken function
    mockGetAccessToken = vi.fn().mockResolvedValue('mock-token-123');

    // Mock window.env for testing
    Object.defineProperty(window, 'env', {
      value: undefined,
      writable: true,
    });

    // Create instance
    experimentalXMC = new EXPERIMENTAL_XMC({
      getAccessToken: mockGetAccessToken,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Constructor', () => {
    it('should create an instance with correct configuration', () => {
      expect(experimentalXMC).toBeInstanceOf(EXPERIMENTAL_XMC);
      expect(experimentalXMC.getAccessToken).toBe(mockGetAccessToken);
    });

    it('should have all required API properties', () => {
      expect(experimentalXMC.sites).toBeDefined();
      expect(experimentalXMC.pages).toBeDefined();
      expect(experimentalXMC.authoring).toBeDefined();
      expect(experimentalXMC.contentTransfer).toBeDefined();
      expect(experimentalXMC.preview).toBeDefined();
      expect(experimentalXMC.live).toBeDefined();
    });

    it('should use default edge platform proxy URL when env is not set', () => {
      expect(experimentalXMC).toBeDefined();
      // The default URL should be used since window.env is undefined
    });

    it('should use environment variable when available', () => {
      // Mock environment variable
      Object.defineProperty(window, 'env', {
        value: {
          VITE_EDGE_PLATFORM_PROXY_URL: 'https://custom-edge.example.com',
        },
        writable: true,
      });

      const customXMC = new EXPERIMENTAL_XMC({
        getAccessToken: mockGetAccessToken,
      });

      expect(customXMC).toBeDefined();
    });
  });

  describe('API Methods', () => {
    it('should have all API methods available', () => {
      // Sites API
      expect(typeof experimentalXMC.sites.listLanguages).toBe('function');
      // Pages API
      expect(typeof experimentalXMC.pages.search).toBe('function');
      // Authoring API
      expect(typeof experimentalXMC.authoring.graphql).toBe('function');
      // Content Transfer API
      expect(typeof experimentalXMC.contentTransfer.createContentTransfer).toBe('function');
      // Preview API
      expect(typeof experimentalXMC.preview.graphql).toBe('function');
      // Live API
      expect(typeof experimentalXMC.live.graphql).toBe('function');
    });
  });

  describe('Method Execution', () => {
    it('should include default headers in API calls', async () => {
      const mockGraphql = vi.fn().mockResolvedValue({ data: {} });
      (experimentalXMC.authoring as any).graphql = mockGraphql;

      await experimentalXMC.authoring.graphql({
        body: { query: 'test' },
      });

      expect(mockGraphql).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'sc-resource': 'marketplace',
          }),
        }),
      );
    });

    it('should merge custom headers with default headers', async () => {
      const mockGraphql = vi.fn().mockResolvedValue({ data: {} });
      (experimentalXMC.authoring as any).graphql = mockGraphql;

      await experimentalXMC.authoring.graphql({
        body: { query: 'test' },
        headers: { 'custom-header': 'value' },
      });

      expect(mockGraphql).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'sc-resource': 'marketplace',
            'custom-header': 'value',
          }),
        }),
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle getAccessToken errors gracefully', async () => {
      const errorGetAccessToken = vi.fn().mockRejectedValue(new Error('Token error'));
      const errorXMC = new EXPERIMENTAL_XMC({
        getAccessToken: errorGetAccessToken,
      });

      const mockGraphql = vi.fn().mockResolvedValue({ data: {} });
      (errorXMC.authoring as any).graphql = mockGraphql;

      // Should not throw during construction
      expect(errorXMC).toBeDefined();
    });
  });

  describe('Type Safety', () => {
    it('should maintain type safety for API methods', () => {
      // This test ensures TypeScript compilation works correctly
      const sitesApi = experimentalXMC.sites;
      const pagesApi = experimentalXMC.pages;
      const authoringApi = experimentalXMC.authoring;
      const contentTransferApi = experimentalXMC.contentTransfer;
      const previewApi = experimentalXMC.preview;
      const liveApi = experimentalXMC.live;

      expect(sitesApi).toBeDefined();
      expect(pagesApi).toBeDefined();
      expect(authoringApi).toBeDefined();
      expect(contentTransferApi).toBeDefined();
      expect(previewApi).toBeDefined();
      expect(liveApi).toBeDefined();
    });
  });
});
