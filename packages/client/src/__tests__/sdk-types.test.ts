import { describe, it, expect } from 'vitest';
import {
  AppType,
  HostState,
  ApplicationMetadata,
  QueryMap,
  MutationMap,
  QueryKey,
  MutationKey,
  PagesContext,
  PagesContextSiteInfo,
} from '../sdk-types';

describe('sdk-types', () => {
  it('should validate AppType', () => {
    const appType: AppType = 'portal';
    expect(appType).toBe('portal');
  });

  it('should validate HostState for portal', () => {
    const hostState: HostState<'portal'> = null;
    expect(hostState).toBeNull();
  });

  it('should validate HostState for xmc:xmapps', () => {
    const hostState: HostState<'xmc:xmapps'> = {
      environment: 'dev',
      language: 'en',
      userInfo: { name: 'user' },
    };
    expect(hostState).toEqual({ environment: 'dev', language: 'en', userInfo: { name: 'user' } });
  });

  it('should validate HostState for xmc:pages-contextview', () => {
    const hostState: HostState<'xmc:pages-contextview'> = {
      organizationId: 'org1',
      xmCloudTenantInfo: {
        url: 'http://localhost:2222',
      },
      userInfo: {
        name: 'user',
      },
      testId: '123',
    };
    expect(hostState).toEqual({
      organizationId: 'org1',
      xmCloudTenantInfo: {
        url: 'http://localhost:2222',
      },
      userInfo: {
        name: 'user',
      },
      testId: '123',
    });
  });

  it('should validate ApplicationMetadata', () => {
    const metadata: ApplicationMetadata = {
      resources: [{ contextId: '1', tenantName: 'Tenant1', tenantId: 'tenant1' }],
      appId: 'app1',
      appType: 'portal',
    };
    expect(metadata).toEqual({
      resources: [{ contextId: '1', tenantName: 'Tenant1', tenantId: 'tenant1' }],
      appId: 'app1',
      appType: 'portal',
    });
  });

  it('should validate QueryMap', () => {
    const queryMap: QueryMap = {
      'host.user': {
        params: undefined,
        response: { userId: 'user1', userName: 'User One' },
        subscribe: false,
      },
      'host.state': { params: undefined, response: null, subscribe: true },
      'pages.context': {
        params: undefined,
        response: { siteInfo: { id: 'site1' }, pageInfo: { id: 'page1' } },
        subscribe: true,
      },
      'application.metadata': {
        params: undefined,
        response: { resources: [], appId: 'app1', appType: 'portal' },
        subscribe: false,
      },
      'xmc.publishing.status': {
        params: { id: '123' },
        response: { status: 'published' },
        subscribe: false,
      },
    };
    expect(queryMap).toBeDefined();
  });

  it('should validate MutationMap', () => {
    const mutationMap: MutationMap = {
      'xmc.publishing.publish': {
        params: { id: '123' },
        response: { jobId: 'job1', status: 'queued' },
      },
      'xmc.authoring.createItem': {
        params: { sitecoreContextId: 'context1', body: { query: 'query' } },
        response: {
          data: {
            createItem: {
              item: { itemId: 'item1', name: 'Item One', path: '/path', fields: { nodes: [] } },
            },
          },
        },
      },
    };
    expect(mutationMap).toBeDefined();
  });

  it('should validate pages.context MutationMap', () => {
    const mutationMap: MutationMap = {
      'pages.reloadCanvas': {
        params: undefined,
        response: undefined,
        subscribe: false,
      },
      'pages.context': {
        params: { itemId: 'item1', language: 'en', itemVersion: '2' },
        response: undefined,
        subscribe: false,
      },
    };
    expect(mutationMap['pages.context'].params).toEqual({ itemId: 'item1', language: 'en', itemVersion: '2' });
    expect(mutationMap['pages.context'].response).toBeUndefined();
  });

  it('should validate QueryKey', () => {
    const queryKey: QueryKey = 'host.user';
    expect(queryKey).toBe('host.user');
  });

  it('should validate MutationKey', () => {
    const mutationKey: MutationKey = 'xmc.publishing.publish';
    expect(mutationKey).toBe('xmc.publishing.publish');
  });

  describe('PagesContext', () => {
    it('should validate empty PagesContext', () => {
      const pagesContext: PagesContext = {};
      expect(pagesContext).toEqual({});
      expect(pagesContext.siteInfo).toBeUndefined();
      expect(pagesContext.pageInfo).toBeUndefined();
    });

    it('should validate PagesContext with siteInfo only', () => {
      const siteInfo: PagesContextSiteInfo = {
        id: 'site-123',
        name: 'Test Site',
        displayName: 'Test Site Display Name',
        language: 'en',
      };

      const pagesContext: PagesContext = {
        siteInfo,
      };

      expect(pagesContext.siteInfo).toBeDefined();
      expect(pagesContext.siteInfo?.id).toBe('site-123');
      expect(pagesContext.siteInfo?.name).toBe('Test Site');
      expect(pagesContext.siteInfo?.displayName).toBe('Test Site Display Name');
      expect(pagesContext.siteInfo?.language).toBe('en');
      expect(pagesContext.pageInfo).toBeUndefined();
    });

    it('should validate PagesContext with pageInfo only', () => {
      const pagesContext: PagesContext = {
        pageInfo: {
          id: 'page-456',
          name: 'Test Page',
          displayName: 'Test Page Display Name',
          path: '/test-page',
          language: 'en',
        },
      };

      expect(pagesContext.pageInfo).toBeDefined();
      expect(pagesContext.pageInfo?.id).toBe('page-456');
      expect(pagesContext.pageInfo?.name).toBe('Test Page');
      expect(pagesContext.pageInfo?.displayName).toBe('Test Page Display Name');
      expect(pagesContext.pageInfo?.path).toBe('/test-page');
      expect(pagesContext.pageInfo?.language).toBe('en');
      expect(pagesContext.siteInfo).toBeUndefined();
    });

    it('should validate PagesContext with both siteInfo and pageInfo', () => {
      const siteInfo: PagesContextSiteInfo = {
        id: 'site-123',
        name: 'Test Site',
        displayName: 'Test Site Display Name',
        language: 'en',
        appName: 'Test App',
      };

      const pagesContext: PagesContext = {
        siteInfo,
        pageInfo: {
          id: 'page-456',
          name: 'Test Page',
          displayName: 'Test Page Display Name',
          path: '/test-page',
          language: 'en',
          version: 1,
        },
      };

      expect(pagesContext.siteInfo).toBeDefined();
      expect(pagesContext.siteInfo?.id).toBe('site-123');
      expect(pagesContext.siteInfo?.name).toBe('Test Site');
      expect(pagesContext.pageInfo).toBeDefined();
      expect(pagesContext.pageInfo?.id).toBe('page-456');
      expect(pagesContext.pageInfo?.name).toBe('Test Page');
      expect(pagesContext.pageInfo?.version).toBe(1);
    });

    it('should validate PagesContext with additional properties using index signature', () => {
      const pagesContext: PagesContext = {
        siteInfo: {
          id: 'site-123',
          name: 'Test Site',
        },
        pageInfo: {
          id: 'page-456',
          name: 'Test Page',
        },
        customProperty: 'custom-value',
        anotherProperty: 123,
        nestedProperty: {
          key: 'value',
        },
      };

      expect(pagesContext.customProperty).toBe('custom-value');
      expect(pagesContext.anotherProperty).toBe(123);
      expect(pagesContext.nestedProperty).toEqual({ key: 'value' });
    });

    it('should validate PagesContext with complete siteInfo properties', () => {
      const siteInfo: PagesContextSiteInfo = {
        id: 'site-123',
        hostId: 'host-456',
        name: 'Test Site',
        displayName: 'Test Site Display Name',
        language: 'en',
        appName: 'Test App',
        layoutServiceConfig: 'config-123',
        renderingEngineEndpointUrl: 'https://rendering.example.com',
        renderingEngineApplicationUrl: 'https://app.example.com',
        pointOfSale: [
          {
            language: 'en',
            name: 'POS 1',
          },
        ],
        startItemId: 'start-item-123',
        supportedLanguages: ['en', 'fr', 'de'],
        collectionId: 'collection-123',
        properties: {
          isSxaSite: true,
          tagsFolderId: 'tags-123',
          isLocalDatasourcesEnabled: false,
        },
        description: 'Test site description',
        thumbnail: {
          url: 'https://example.com/thumbnail.jpg',
          rootPath: '/thumbnails',
          autogenerated: false,
        },
        created: '2024-01-01T00:00:00Z',
        createdBy: 'user-123',
        sortOrder: 1,
        brandKitId: 'brandkit-123',
        permissions: {
          canAdmin: true,
          canWrite: true,
          canCreate: true,
          canDelete: false,
          canRename: true,
          canRead: true,
          canPublish: true,
          canDuplicate: false,
        },
        languages: ['en', 'fr'],
        hosts: {},
        errorPagesConfiguration: {},
        settings: {
          thumbnailsRootPath: '/thumbnails',
          generateThumbnails: 'true',
        },
      };

      const pagesContext: PagesContext = {
        siteInfo,
      };

      expect(pagesContext.siteInfo).toBeDefined();
      expect(pagesContext.siteInfo?.id).toBe('site-123');
      expect(pagesContext.siteInfo?.pointOfSale).toHaveLength(1);
      expect(pagesContext.siteInfo?.pointOfSale?.[0]?.language).toBe('en');
      expect(pagesContext.siteInfo?.supportedLanguages).toEqual(['en', 'fr', 'de']);
      expect(pagesContext.siteInfo?.properties?.isSxaSite).toBe(true);
      expect(pagesContext.siteInfo?.permissions?.canAdmin).toBe(true);
    });

    it('should validate PagesContext with complete pageInfo properties', () => {
      const pagesContext: PagesContext = {
        pageInfo: {
          id: 'page-456',
          name: 'Test Page',
          displayName: 'Test Page Display Name',
          version: 1,
          versionName: 'v1',
          revision: 'rev-123',
          icon: 'icon-path',
          path: '/test-page',
          url: 'https://example.com/test-page',
          hasChildren: true,
          language: 'en',
          parent: {
            id: 'parent-123',
          },
          workflow: null,
          template: {
            name: 'Test Template',
            id: 'template-123',
            displayName: 'Test Template Display Name',
            baseTemplateIds: ['base-1', 'base-2'],
            path: '/templates/test',
          },
          isFolder: false,
          isLatestPublishableVersion: true,
          creationDate: '2024-01-01T00:00:00Z',
          updatedDate: '2024-01-02T00:00:00Z',
          createdBy: 'user-123',
          updatedBy: 'user-456',
          permissions: {
            canWrite: true,
            canDelete: false,
            canRename: true,
            canCreate: true,
            canPublish: true,
            canWriteLanguage: false,
          },
          locking: {
            lockedByCurrentUser: false,
            isLocked: false,
          },
          publishing: {
            hasPublishableVersion: true,
            isPublishable: true,
            validFromDate: '2024-01-01T00:00:00Z',
            validToDate: '2024-12-31T23:59:59Z',
            isAvailableToPublish: true,
          },
          presentationDetails: 'presentation-123',
          route: '/test-route',
          versions: [],
          hasVersions: false,
        },
      };

      expect(pagesContext.pageInfo).toBeDefined();
      expect(pagesContext.pageInfo?.id).toBe('page-456');
      expect(pagesContext.pageInfo?.version).toBe(1);
      expect(pagesContext.pageInfo?.template?.name).toBe('Test Template');
      expect(pagesContext.pageInfo?.permissions?.canWrite).toBe(true);
      expect(pagesContext.pageInfo?.publishing?.isPublishable).toBe(true);
      expect(pagesContext.pageInfo?.hasVersions).toBe(false);
    });

    it('should validate PagesContext in QueryMap for pages.context', () => {
      const queryMapEntry: QueryMap['pages.context'] = {
        params: undefined,
        response: {
          siteInfo: {
            id: 'site-123',
            name: 'Test Site',
          },
          pageInfo: {
            id: 'page-456',
            name: 'Test Page',
          },
          customProperty: 'custom-value',
        },
        subscribe: true,
      };

      expect(queryMapEntry.response).toBeDefined();
      expect(queryMapEntry.response.siteInfo?.id).toBe('site-123');
      expect(queryMapEntry.response.pageInfo?.id).toBe('page-456');
      expect(queryMapEntry.response.customProperty).toBe('custom-value');
      expect(queryMapEntry.subscribe).toBe(true);
    });

    it('should validate PagesContext with partial siteInfo and pageInfo', () => {
      const pagesContext: PagesContext = {
        siteInfo: {
          id: 'site-123',
        },
        pageInfo: {
          id: 'page-456',
        },
      };

      expect(pagesContext.siteInfo?.id).toBe('site-123');
      expect(pagesContext.pageInfo?.id).toBe('page-456');
      expect(pagesContext.siteInfo?.name).toBeUndefined();
      expect(pagesContext.pageInfo?.name).toBeUndefined();
    });

    it('should validate PagesContext with nested objects in additional properties', () => {
      const pagesContext: PagesContext = {
        siteInfo: {
          id: 'site-123',
        },
        pageInfo: {
          id: 'page-456',
        },
        metadata: {
          author: 'John Doe',
          tags: ['tag1', 'tag2'],
          nested: {
            deep: {
              value: 'deep-value',
            },
          },
        },
      };

      expect(pagesContext.metadata).toBeDefined();
      expect((pagesContext.metadata as any).author).toBe('John Doe');
      expect((pagesContext.metadata as any).tags).toEqual(['tag1', 'tag2']);
      expect((pagesContext.metadata as any).nested.deep.value).toBe('deep-value');
    });

    it('should validate PagesContext with array values in additional properties', () => {
      const pagesContext: PagesContext = {
        siteInfo: {
          id: 'site-123',
        },
        customArray: [1, 2, 3],
        customStringArray: ['a', 'b', 'c'],
      };

      expect(pagesContext.customArray).toEqual([1, 2, 3]);
      expect(pagesContext.customStringArray).toEqual(['a', 'b', 'c']);
    });
  });
});
