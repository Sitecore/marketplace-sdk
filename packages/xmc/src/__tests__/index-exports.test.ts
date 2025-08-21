import { describe, it, expect, vi } from 'vitest';

// Mock the client-sdk-fetch module to prevent window.ClientSDK errors
vi.mock('../client-sdk-fetch', () => ({
  clientSdkfetch: vi.fn().mockResolvedValue(new Response()),
}));

// Test imports from index.ts
import { EXPERIMENTAL_XMC, XMC } from '../index';

// Test type imports from index.ts
import type {
  EXPERIMENTAL_XMCConfig,
  SitesApi,
  PagesApi,
  AuthoringApi,
  ContentTransferApi,
  ContentApi,
} from '../index';

// Test EXPERIMENTAL_ namespace imports like in demo app
import {
  EXPERIMENTAL_Sites,
  EXPERIMENTAL_Pages,
  EXPERIMENTAL_Authoring,
  EXPERIMENTAL_ContentTransfer,
  EXPERIMENTAL_Content,
} from '../index';

describe('Index Exports', () => {
  describe('EXPERIMENTAL_XMC Export', () => {
    it('should export EXPERIMENTAL_XMC class', () => {
      expect(EXPERIMENTAL_XMC).toBeDefined();
      expect(typeof EXPERIMENTAL_XMC).toBe('function');
    });

    it('should allow creating EXPERIMENTAL_XMC instance', () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');

      const xmc = new EXPERIMENTAL_XMC({
        getAccessToken: mockGetAccessToken,
      });

      expect(xmc).toBeInstanceOf(EXPERIMENTAL_XMC);
      expect(xmc.getAccessToken).toBe(mockGetAccessToken);
    });

    it('should have all API properties', () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');
      const xmc = new EXPERIMENTAL_XMC({
        getAccessToken: mockGetAccessToken,
      });

      expect(xmc.sites).toBeDefined();
      expect(xmc.pages).toBeDefined();
      expect(xmc.authoring).toBeDefined();
      expect(xmc.contentTransfer).toBeDefined();
      expect(xmc.preview).toBeDefined();
      expect(xmc.live).toBeDefined();
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
      const config: EXPERIMENTAL_XMCConfig = {
        getAccessToken: async () => 'test-token',
      };
      const sitesApi: SitesApi = {} as SitesApi;
      const pagesApi: PagesApi = {} as PagesApi;
      const authoringApi: AuthoringApi = {} as AuthoringApi;
      const contentTransferApi: ContentTransferApi = {} as ContentTransferApi;
      const contentApi: ContentApi = {} as ContentApi;

      expect(config).toBeDefined();
      expect(sitesApi).toBeDefined();
      expect(pagesApi).toBeDefined();
      expect(authoringApi).toBeDefined();
      expect(contentTransferApi).toBeDefined();
      expect(contentApi).toBeDefined();
    });

    it('should support all EXPERIMENTAL_ namespaces', () => {
      // Test that we can use types from all namespaces (TypeScript compilation test)
      const mockSitesData: EXPERIMENTAL_Sites.ListLanguagesResponse = [
        { id: 'test-id', iso: 'en', regionalIsoCode: 'en-US' },
      ];
      const mockPagesData: EXPERIMENTAL_Pages.SearchResponse = {
        // PagesSearchResult structure
        results: [],
        totalCount: 0,
      };
      const mockAuthoringData: EXPERIMENTAL_Authoring.GraphqlResponse = {
        data: { test: 'value' },
        errors: [],
      };
      const mockContentTransferData: EXPERIMENTAL_ContentTransfer.GetContentTransferStatusResponse =
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
      const mockContentData: EXPERIMENTAL_Content.GraphqlResponse = {
        data: { content: 'test' },
      };

      expect(mockSitesData).toBeDefined();
      expect(mockSitesData[0].iso).toBe('en');
      expect(mockPagesData).toBeDefined();
      expect(mockAuthoringData).toBeDefined();
      expect(mockAuthoringData.data).toBeDefined();
      expect(mockContentTransferData).toBeDefined();
      expect(mockContentData).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should support full integration with proper types', () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue('test-token');
      const config: EXPERIMENTAL_XMCConfig = {
        getAccessToken: mockGetAccessToken,
      };

      // Create EXPERIMENTAL_XMC instance
      const xmc = new EXPERIMENTAL_XMC(config);

      // Test that all APIs are available and properly typed
      expect(typeof xmc.sites.listLanguages).toBe('function');
      expect(typeof xmc.pages.search).toBe('function');
      expect(typeof xmc.authoring.graphql).toBe('function');
      expect(typeof xmc.contentTransfer.createContentTransfer).toBe('function');
      expect(typeof xmc.preview.graphql).toBe('function');
      expect(typeof xmc.live.graphql).toBe('function');

      // Test demo app usage pattern
      const mockResponse = {
        data: { languages: [{ id: 'en', name: 'English' }] },
      };
      expect(mockResponse.data).toBeDefined();
      expect(mockResponse.data.languages).toBeDefined();
    });
  });
});
