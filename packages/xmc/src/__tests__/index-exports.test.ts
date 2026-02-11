import { describe, it, expect, vi } from 'vitest';

// Mock the client-sdk-fetch module to prevent window.ClientSDK errors
vi.mock('../client-sdk-fetch', () => ({
  clientSdkfetch: vi.fn().mockResolvedValue(new Response()),
}));

// Test imports from index.ts
import { experimental_XMC, XMC } from '../index';

// Test type imports from index.ts
import type {
  experimental_XMCConfig,
  SitesApi,
  PagesApi,
  AuthoringApi,
  ContentTransferApi,
  ContentApi,
  SearchApi,
} from '../index';

// Test experimental_ namespace imports like in demo app
import {
  experimental_Sites,
  experimental_Pages,
  experimental_Authoring,
  experimental_ContentTransfer,
  experimental_Content,
  experimental_Search,
} from '../index';

describe('Index Exports', () => {
  describe('experimental_XMC Export', () => {
    it('should export experimental_XMC class', () => {
      expect(experimental_XMC).toBeDefined();
      expect(typeof experimental_XMC).toBe('function');
    });

    it('should allow creating experimental_XMC instance', () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');

      const xmc = new experimental_XMC({
        getAccessToken: mockGetAccessToken,
      });

      expect(xmc).toBeInstanceOf(experimental_XMC);
      // Note: getAccessToken is private, so we can't test it directly
    });

    it('should have all API properties', () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');
      const xmc = new experimental_XMC({
        getAccessToken: mockGetAccessToken,
      });

      expect(xmc.sites).toBeDefined();
      expect(xmc.pages).toBeDefined();
      expect(xmc.authoring).toBeDefined();
      expect(xmc.contentTransfer).toBeDefined();
      expect(xmc.preview).toBeDefined();
      expect(xmc.live).toBeDefined();
      expect(xmc.search).toBeDefined();
    });
  });

  describe('XMC Module Export', () => {
    it('should export XMC module', () => {
      expect(XMC).toBeDefined();
      expect(XMC.namespace).toBe('xmc');
      expect(typeof XMC.invokeOperation).toBe('function');
    });

    it('should handle valid operations', () => {
      const result = XMC.invokeOperation('authoring.graphql', { query: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle search operations', () => {
      const result = XMC.invokeOperation('search.getConfigs', {});
      expect(result).toBeDefined();
    });

    it('should throw error for invalid operation format', () => {
      expect(() => {
        XMC.invokeOperation('invalid');
      }).toThrow('Invalid operation format');
    });

    it('should throw error for non-existent namespace', () => {
      expect(() => {
        XMC.invokeOperation('nonexistent.operation');
      }).toThrow("Namespace 'nonexistent' not found");
    });

    it('should throw error for non-existent operation', () => {
      expect(() => {
        XMC.invokeOperation('authoring.nonexistent');
      }).toThrow("Operation 'nonexistent' not found in namespace 'authoring'");
    });
  });

  describe('Type Exports from Index', () => {
    it('should export all required types', () => {
      const config: experimental_XMCConfig = {
        getAccessToken: async () => 'test-token',
      };
      const sitesApi: SitesApi = {} as SitesApi;
      const pagesApi: PagesApi = {} as PagesApi;
      const authoringApi: AuthoringApi = {} as AuthoringApi;
      const contentTransferApi: ContentTransferApi = {} as ContentTransferApi;
      const contentApi: ContentApi = {} as ContentApi;
      const searchApi: SearchApi = {} as SearchApi;

      expect(config).toBeDefined();
      expect(sitesApi).toBeDefined();
      expect(pagesApi).toBeDefined();
      expect(authoringApi).toBeDefined();
      expect(contentTransferApi).toBeDefined();
      expect(contentApi).toBeDefined();
      expect(searchApi).toBeDefined();
    });

    it('should support all experimental_ namespaces', () => {
      // Test that we can use types from all namespaces (TypeScript compilation test)
      const mockSitesData: experimental_Sites.ListLanguagesResponse = [
        { id: 'test-id', iso: 'en', regionalIsoCode: 'en-US' },
      ];
      const mockPagesData: experimental_Pages.SearchResponse = {
        // PagesSearchResult structure
        results: [],
        totalCount: 0,
      };
      const mockAuthoringData: experimental_Authoring.GraphqlResponse = {
        data: { test: 'value' },
        errors: [],
      };
      const mockContentTransferData: experimental_ContentTransfer.GetContentTransferStatusResponse =
        {
          State: 'Completed',
          ChunkSetsMetadata: [
            {
              ChunkSetId: 'test-chunk-set',
              ChunkCount: 1,
              TotalItemCount: 1,
            },
          ],
        };
      const mockContentData: experimental_Content.GraphqlResponse = {
        data: { content: 'test' },
      };
      const mockSearchData: experimental_Search.GetConfigsResponse = [];

      expect(mockSitesData).toBeDefined();
      expect(mockSitesData[0].iso).toBe('en');
      expect(mockPagesData).toBeDefined();
      expect(mockAuthoringData).toBeDefined();
      expect(mockAuthoringData.data).toBeDefined();
      expect(mockContentTransferData).toBeDefined();
      expect(mockContentData).toBeDefined();
      expect(mockSearchData).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should support full integration with proper types', () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');
      const config: experimental_XMCConfig = {
        getAccessToken: mockGetAccessToken,
      };

      // Create experimental_XMC instance
      const xmc = new experimental_XMC(config);

      // Test that all APIs are available and properly typed
      expect(typeof xmc.sites.listLanguages).toBe('function');
      expect(typeof xmc.pages.search).toBe('function');
      expect(typeof xmc.authoring.graphql).toBe('function');
      expect(typeof xmc.contentTransfer.createContentTransfer).toBe('function');
      expect(typeof xmc.preview.graphql).toBe('function');
      expect(typeof xmc.live.graphql).toBe('function');
      expect(typeof xmc.search.getConfigs).toBe('function');

      // Test demo app usage pattern
      const mockResponse = {
        data: { languages: [{ id: 'en', name: 'English' }] },
      };
      expect(mockResponse.data).toBeDefined();
      expect(mockResponse.data.languages).toBeDefined();
    });
  });
});
