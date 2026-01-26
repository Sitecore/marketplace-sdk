import {
  ExperimentalClientBase,
  ExperimentalClientConfig,
  ApiConfig,
} from '@sitecore-marketplace-sdk/internal';

import * as experimental_sites_sdk from './experimental/client-sites/sdk.gen';
import * as experimental_pages_sdk from './experimental/client-pages/sdk.gen';
import * as experimental_authoring_sdk from './experimental/client-authoring/sdk.gen';
import * as experimental_content_transfer_sdk from './experimental/client-content-transfer/sdk.gen';
import * as experimental_content_sdk from './experimental/client-content/sdk.gen';
import * as experimental_agent_sdk from './experimental/client-agent';

// Re-export experimental types for convenience
export * from './experimental/client-sites/types.gen';
export * from './experimental/client-pages/types.gen';
export * from './experimental/client-authoring/types.gen';
export * from './experimental/client-content-transfer/types.gen';
export * from './experimental/client-content/types.gen';
export * from './experimental/client-agent/types.gen';

// API type definitions
type XMCApiType = 'sites' | 'pages' | 'authoring' | 'contentTransfer' | 'preview' | 'live' | 'agent';

// Type definitions for the API objects with full IntelliSense support
export type SitesApi = typeof experimental_sites_sdk;
export type PagesApi = typeof experimental_pages_sdk;
export type AuthoringApi = typeof experimental_authoring_sdk;
export type ContentTransferApi = typeof experimental_content_transfer_sdk;
export type ContentApi = typeof experimental_content_sdk;
export type AgentApi = typeof experimental_agent_sdk;

// Re-export config type with alias for backwards compatibility
export type experimental_XMCConfig = ExperimentalClientConfig;

// Helper function to create experimental_XMC client asynchronously
export async function experimental_createXMCClient(
  config: experimental_XMCConfig,
): Promise<experimental_XMC> {
  return new experimental_XMC(config);
}

export class experimental_XMC extends ExperimentalClientBase<XMCApiType> {
  public readonly sites: SitesApi;
  public readonly pages: PagesApi;
  public readonly authoring: AuthoringApi;
  public readonly contentTransfer: ContentTransferApi;
  public readonly preview: ContentApi;
  public readonly live: ContentApi;
  public readonly agent: AgentApi;

  constructor(config: experimental_XMCConfig) {
    super(config);

    // Create API proxies
    this.sites = this.createApiProxy('sites');
    this.pages = this.createApiProxy('pages');
    this.authoring = this.createApiProxy('authoring');
    this.contentTransfer = this.createApiProxy('contentTransfer');
    this.preview = this.createApiProxy('preview');
    this.live = this.createApiProxy('live');
    this.agent = this.createApiProxy('agent');
  }

  protected defineApiConfigs(): Record<XMCApiType, ApiConfig> {
    return {
      sites: {
        baseUrl: `${this.edgePlatformProxyUrl}/authoring`,
        sdk: experimental_sites_sdk,
        name: 'Sites API',
      },
      pages: {
        baseUrl: `${this.edgePlatformProxyUrl}/authoring`,
        sdk: experimental_pages_sdk,
        name: 'Pages API',
      },
      authoring: {
        baseUrl: `${this.edgePlatformProxyUrl}/v1/authoring`,
        sdk: experimental_authoring_sdk,
        name: 'Authoring API',
      },
      contentTransfer: {
        baseUrl: `${this.edgePlatformProxyUrl}/authoring/transfer`,
        sdk: experimental_content_transfer_sdk,
        name: 'Content Transfer API',
      },
      preview: {
        baseUrl: `${this.edgePlatformProxyUrl}/content/api`,
        sdk: experimental_content_sdk,
        name: 'Preview API',
      },
      live: {
        baseUrl: `${this.edgePlatformProxyUrl}/content/api`,
        sdk: experimental_content_sdk,
        name: 'Live API',
      },
      agent: {
        baseUrl: `${this.edgePlatformProxyUrl}/stream/ai-agent-api/`,
        sdk: experimental_agent_sdk,
        name: 'Agent API',
      },
    };
  }
}
