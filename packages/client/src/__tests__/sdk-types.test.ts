import { describe, it, expect } from 'vitest';
import {
  AppType,
  HostState,
  ApplicationMetadata,
  QueryMap,
  MutationMap,
  QueryKey,
  MutationKey,
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
});
