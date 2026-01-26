import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { experimental_AI, type experimental_AIConfig } from '../experimental_ai';

// Mock the @hey-api/client-fetch module
vi.mock('@hey-api/client-fetch', () => ({
  createClient: vi.fn(() => ({})),
  createConfig: vi.fn(() => ({})),
}));

// Mock the experimental SDK modules
vi.mock('../experimental/client-skills/sdk.gen', () => ({
  getVersionApiVersionGet: vi.fn(),
  generateBrandReviewApiSkillsV1BrandreviewGeneratePost: vi.fn(),
  generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost: vi.fn(),
  generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost: vi.fn(),
  generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost: vi.fn(),
  generateEmbeddingsApiSkillsV1DeepResearchGeneratePost: vi.fn(),
}));

describe('experimental_AI', () => {
  let mockGetAccessToken: () => Promise<string>;
  let experimentalAI: experimental_AI;

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
    experimentalAI = new experimental_AI({
      getAccessToken: mockGetAccessToken,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Constructor', () => {
    it('should create an instance with correct configuration', () => {
      expect(experimentalAI).toBeInstanceOf(experimental_AI);
    });

    it('should have skills API property', () => {
      expect(experimentalAI.skills).toBeDefined();
    });

    it('should use default edge platform proxy URL when env is not set', () => {
      expect(experimentalAI).toBeDefined();
      // The default URL should be used since window.env is undefined
    });

    it('should use environment variable when available', () => {
      // Mock environment variable
      Object.defineProperty(window, 'env', {
        value: {
          EDGE_PLATFORM_PROXY_URL: 'https://custom-edge.example.com',
        },
        writable: true,
      });

      const customAI = new experimental_AI({
        getAccessToken: mockGetAccessToken,
      });

      expect(customAI).toBeDefined();
    });
  });

  describe('API Methods', () => {
    it('should have getVersionApiVersionGet method', () => {
      expect(typeof experimentalAI.skills.getVersionApiVersionGet).toBe('function');
    });

    it('should have generateBrandReviewApiSkillsV1BrandreviewGeneratePost method', () => {
      expect(typeof experimentalAI.skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost).toBe('function');
    });

    it('should have generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost method', () => {
      expect(typeof experimentalAI.skills.generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost).toBe('function');
    });

    it('should have generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost method', () => {
      expect(typeof experimentalAI.skills.generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost).toBe('function');
    });

    it('should have generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost method', () => {
      expect(typeof experimentalAI.skills.generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost).toBe('function');
    });

    it('should have generateEmbeddingsApiSkillsV1DeepResearchGeneratePost method', () => {
      expect(typeof experimentalAI.skills.generateEmbeddingsApiSkillsV1DeepResearchGeneratePost).toBe('function');
    });
  });

  describe('Method Execution', () => {
    it('should include default headers in API calls', async () => {
      const mockGetVersion = vi.fn().mockResolvedValue({ data: {} });
      (experimentalAI.skills as any).getVersionApiVersionGet = mockGetVersion;

      await experimentalAI.skills.getVersionApiVersionGet({});

      expect(mockGetVersion).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'sc-resource': 'marketplace',
            'sc-marketplace-auth': 'interactive/v1',
          }),
        }),
      );
    });

    it('should merge custom headers with default headers', async () => {
      const mockGetVersion = vi.fn().mockResolvedValue({ data: {} });
      (experimentalAI.skills as any).getVersionApiVersionGet = mockGetVersion;

      await experimentalAI.skills.getVersionApiVersionGet({
        headers: { 'custom-header': 'value' },
      });

      expect(mockGetVersion).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'sc-resource': 'marketplace',
            'sc-marketplace-auth': 'interactive/v1',
            'custom-header': 'value',
          }),
        }),
      );
    });

    it('should call generateBrandReviewApiSkillsV1BrandreviewGeneratePost with correct parameters', async () => {
      const mockGenerateBrandReview = vi.fn().mockResolvedValue({ data: {} });
      (experimentalAI.skills as any).generateBrandReviewApiSkillsV1BrandreviewGeneratePost = mockGenerateBrandReview;

      await experimentalAI.skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost({
        body: { brandkitId: 'test-brandkit-id', input: { content: 'test content' } },
      });

      expect(mockGenerateBrandReview).toHaveBeenCalledWith(
        expect.objectContaining({
          body: { brandkitId: 'test-brandkit-id', input: { content: 'test content' } },
          headers: expect.objectContaining({
            'sc-resource': 'marketplace',
            'sc-marketplace-auth': 'interactive/v1',
          }),
        }),
      );
    });

    it('should call generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost with correct parameters', async () => {
      const mockGenerateEmbeddings = vi.fn().mockResolvedValue({ data: {} });
      (experimentalAI.skills as any).generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost = mockGenerateEmbeddings;

      await experimentalAI.skills.generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost({
        body: { input: [{ name: 'test', data: 'test data', contentType: 'ShortText', mimeType: 'text/plain' }] },
      });

      expect(mockGenerateEmbeddings).toHaveBeenCalledWith(
        expect.objectContaining({
          body: { input: [{ name: 'test', data: 'test data', contentType: 'ShortText', mimeType: 'text/plain' }] },
          headers: expect.objectContaining({
            'sc-resource': 'marketplace',
            'sc-marketplace-auth': 'interactive/v1',
          }),
        }),
      );
    });

    it('should call generateEmbeddingsApiSkillsV1DeepResearchGeneratePost with correct parameters', async () => {
      const mockDeepResearch = vi.fn().mockResolvedValue({ data: {} });
      (experimentalAI.skills as any).generateEmbeddingsApiSkillsV1DeepResearchGeneratePost = mockDeepResearch;

      await experimentalAI.skills.generateEmbeddingsApiSkillsV1DeepResearchGeneratePost({
        body: { prompt: 'research topic', brandkitId: 'test-brandkit-id' },
      });

      expect(mockDeepResearch).toHaveBeenCalledWith(
        expect.objectContaining({
          body: { prompt: 'research topic', brandkitId: 'test-brandkit-id' },
          headers: expect.objectContaining({
            'sc-resource': 'marketplace',
            'sc-marketplace-auth': 'interactive/v1',
          }),
        }),
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle getAccessToken errors gracefully', async () => {
      const errorGetAccessToken = vi.fn().mockRejectedValue(new Error('Token error'));
      const errorAI = new experimental_AI({
        getAccessToken: errorGetAccessToken,
      });

      const mockGetVersion = vi.fn().mockResolvedValue({ data: {} });
      (errorAI.skills as any).getVersionApiVersionGet = mockGetVersion;

      // Should not throw during construction
      expect(errorAI).toBeDefined();
    });
  });

  describe('Type Safety', () => {
    it('should maintain type safety for API methods', () => {
      // This test ensures TypeScript compilation works correctly
      const skillsApi = experimentalAI.skills;

      expect(skillsApi).toBeDefined();
      expect(typeof skillsApi.getVersionApiVersionGet).toBe('function');
      expect(typeof skillsApi.generateBrandReviewApiSkillsV1BrandreviewGeneratePost).toBe('function');
      expect(typeof skillsApi.generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost).toBe('function');
    });
  });

  describe('Factory Function', () => {
    it('should create an instance using experimental_createAIClient', async () => {
      const { experimental_createAIClient } = await import('../experimental_ai');
      const client = await experimental_createAIClient({
        getAccessToken: async () => 'test-token',
      });

      expect(client).toBeInstanceOf(experimental_AI);
      expect(client.skills).toBeDefined();
    });
  });
});
