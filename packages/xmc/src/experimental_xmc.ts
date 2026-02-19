import * as experimental_sites_sdk from './experimental/client-sites/sdk.gen';
import * as experimental_pages_sdk from './experimental/client-pages/sdk.gen';
import * as experimental_authoring_sdk from './experimental/client-authoring/sdk.gen';
import * as experimental_content_transfer_sdk from './experimental/client-content-transfer/sdk.gen';
import * as experimental_content_sdk from './experimental/client-content/sdk.gen';
import * as experimental_agent_sdk from './experimental/client-agent';
import * as experimental_search_sdk from './experimental/client-search/sdk.gen';
import {
  getEdgePlatformProxyUrl,
  createCustomClients,
  createApiProxy,
  type ApiConfig,
} from '../../shared/src';

// Re-export experimental types for convenience
export * from './experimental/client-sites/types.gen';
export * from './experimental/client-pages/types.gen';
export * from './experimental/client-authoring/types.gen';
export * from './experimental/client-content-transfer/types.gen';
export * from './experimental/client-content/types.gen';
export * from './experimental/client-agent/types.gen';
export * from './experimental/client-search/types.gen';

// Supported API types
type ApiType = 'sites' | 'pages' | 'authoring' | 'contentTransfer' | 'preview' | 'live' | 'agent' | 'search';

// Configuration type for experimental_XMC
export interface experimental_XMCConfig {
  getAccessToken: () => Promise<string>;
}

// Helper function to create experimental_XMC client asynchronously
export async function experimental_createXMCClient(
  config: experimental_XMCConfig,
): Promise<experimental_XMC> {
  return new experimental_XMC(config);
}

// Type definitions for the API objects with full IntelliSense support
// These types provide complete IntelliSense for all available methods and their parameters
export type SitesApi = typeof experimental_sites_sdk;
export type PagesApi = typeof experimental_pages_sdk;
export type AuthoringApi = typeof experimental_authoring_sdk;
export type ContentTransferApi = typeof experimental_content_transfer_sdk;
export type ContentApi = typeof experimental_content_sdk;
export type AgentApi = typeof experimental_agent_sdk;
export type SearchApi = typeof experimental_search_sdk;

export class experimental_XMC {
  public readonly sites: SitesApi;
  public readonly pages: PagesApi;
  public readonly authoring: AuthoringApi;
  public readonly contentTransfer: ContentTransferApi;
  public readonly preview: ContentApi;
  public readonly live: ContentApi;
  public readonly agent: AgentApi;
  public readonly search: SearchApi;

  constructor(config: experimental_XMCConfig) {
    console.log('🔧 [experimental_XMC] Constructor called');
    const edgePlatformProxyUrl = getEdgePlatformProxyUrl();

    // Define API configurations
    const apiConfigs: Record<ApiType, ApiConfig> = {
      sites: {
        baseUrl: `${edgePlatformProxyUrl}/authoring`,
        sdk: experimental_sites_sdk,
        name: 'Sites API',
      },
      pages: {
        baseUrl: `${edgePlatformProxyUrl}/authoring`,
        sdk: experimental_pages_sdk,
        name: 'Pages API',
      },
      authoring: {
        baseUrl: `${edgePlatformProxyUrl}/v1/authoring`,
        sdk: experimental_authoring_sdk,
        name: 'Authoring API',
      },
      contentTransfer: {
        baseUrl: `${edgePlatformProxyUrl}/authoring/transfer`,
        sdk: experimental_content_transfer_sdk,
        name: 'Content Transfer API',
      },
      preview: {
        baseUrl: `${edgePlatformProxyUrl}/content/api`,
        sdk: experimental_content_sdk,
        name: 'Preview API',
      },
      live: {
        baseUrl: `${edgePlatformProxyUrl}/content/api`,
        sdk: experimental_content_sdk,
        name: 'Live API',
      },
      agent: {
        baseUrl: `${edgePlatformProxyUrl}/stream/ai-agent-api/`,
        sdk: experimental_agent_sdk,
        name: 'Agent API',
      },
      search: {
        baseUrl: `${edgePlatformProxyUrl}/search`,
        sdk: experimental_search_sdk,
        name: 'Search API',
      },
    };

    // Create custom clients for each API
    const customClients = createCustomClients(apiConfigs, config.getAccessToken, 'experimental_XMC');

    // Create API proxies with separated methods and types
    this.sites = createApiProxy('sites', apiConfigs, customClients, 'experimental_XMC');
    this.pages = createApiProxy('pages', apiConfigs, customClients, 'experimental_XMC');
    this.authoring = createApiProxy('authoring', apiConfigs, customClients, 'experimental_XMC');
    this.contentTransfer = createApiProxy('contentTransfer', apiConfigs, customClients, 'experimental_XMC');
    this.preview = createApiProxy('preview', apiConfigs, customClients, 'experimental_XMC');
    this.live = createApiProxy('live', apiConfigs, customClients, 'experimental_XMC');
    this.agent = createApiProxy('agent', apiConfigs, customClients, 'experimental_XMC');
    this.search = createApiProxy('search', apiConfigs, customClients, 'experimental_XMC');
  }
}
