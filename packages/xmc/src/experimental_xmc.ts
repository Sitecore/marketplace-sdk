import * as experimental_sites_sdk from './experimental/client-sites/sdk.gen';
import * as experimental_pages_sdk from './experimental/client-pages/sdk.gen';
import * as experimental_authoring_sdk from './experimental/client-authoring/sdk.gen';
import * as experimental_content_transfer_sdk from './experimental/client-content-transfer/sdk.gen';
import * as experimental_content_sdk from './experimental/client-content/sdk.gen';
import { createClient, createConfig, type Client } from '@hey-api/client-fetch';

// Re-export experimental types for convenience
export * from './experimental/client-sites/types.gen';
export * from './experimental/client-pages/types.gen';
export * from './experimental/client-authoring/types.gen';
export * from './experimental/client-content-transfer/types.gen';
export * from './experimental/client-content/types.gen';

// Default headers required for API calls
const DEFAULT_HEADERS = {
  'sc-resource': 'marketplace',
} as const;

// API configurations with better typing
interface ApiConfig {
  baseUrl: string;
  sdk: any;
  name: string;
}

// Supported API types
type ApiType = 'sites' | 'pages' | 'authoring' | 'contentTransfer' | 'preview' | 'live';

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

export class experimental_XMC {
  public readonly sites: SitesApi;
  public readonly pages: PagesApi;
  public readonly authoring: AuthoringApi;
  public readonly contentTransfer: ContentTransferApi;
  public readonly preview: ContentApi;
  public readonly live: ContentApi;

  private readonly getAccessToken: () => Promise<string>;
  private readonly apiConfigs: Record<ApiType, ApiConfig>;
  private readonly customClients: Record<ApiType, Client>;
  private readonly edgePlatformProxyUrl: string;
  private readonly defaultEdgePlatformProxyUrl = 'https://edge-platform.sitecorecloud.io';

  constructor(config: experimental_XMCConfig) {
    console.log('🔧 [experimental_XMC] Constructor called');
    this.getAccessToken = config.getAccessToken;
    this.edgePlatformProxyUrl = this.calculateEdgePlatformProxyUrl();

    // Define default API configurations
    const defaultApiConfigs: Record<ApiType, ApiConfig> = {
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
    };

    // Use default configurations
    this.apiConfigs = defaultApiConfigs;

    // Create custom clients for each API
    this.customClients = this.createCustomClients();

    // Create API proxies with separated methods and types
    this.sites = this.createApiProxy('sites');
    this.pages = this.createApiProxy('pages');
    this.authoring = this.createApiProxy('authoring');
    this.contentTransfer = this.createApiProxy('contentTransfer');
    this.preview = this.createApiProxy('preview');
    this.live = this.createApiProxy('live');
  }

  /**
   * Creates custom clients for all APIs
   */
  private createCustomClients(): Record<ApiType, Client> {
    const clients: Partial<Record<ApiType, Client>> = {};

    for (const [apiType, config] of Object.entries(this.apiConfigs)) {
      const authFunction = async () => {
        console.log(`🔑 [experimental_XMC] Getting access token for ${apiType}`);
        const token = await this.getAccessToken();
        return token;
      };

      clients[apiType as ApiType] = createClient(
        createConfig({
          baseUrl: config.baseUrl,
          auth: authFunction,
        }),
      );
    }

    return clients as Record<ApiType, Client>;
  }

  /**
   * Creates a proxy for an API that automatically injects the custom client
   */
  private createApiProxy(apiType: ApiType) {
    const apiObject = {
      ...this.apiConfigs[apiType].sdk,
    };

    // Cache for wrapped methods to avoid recreating functions
    const methodCache = new Map<string, Function>();

    return new Proxy(apiObject, {
      get: (target, prop) => {
        const propKey = String(prop);
        const originalMethod = target[prop as keyof typeof target];

        if (typeof originalMethod === 'function') {
          // Check if we already have a wrapped version
          if (methodCache.has(propKey)) {
            return methodCache.get(propKey);
          }

          // Create wrapped method and cache it
          const wrappedMethod = (options?: any) => {
            console.log(`🎭 [experimental_XMC] Calling ${apiType}.${propKey}`);

            const result = originalMethod({
              ...options,
              client: this.customClients[apiType],
              headers: {
                ...options?.headers,
                ...DEFAULT_HEADERS,
              },
            });

            return result;
          };

          methodCache.set(propKey, wrappedMethod);
          return wrappedMethod;
        }

        return originalMethod;
      },
    });
  }

  /**
   * Calculates the edge platform proxy URL from environment or falls back to default
   */
  private calculateEdgePlatformProxyUrl(): string {
    let envUrl: string | undefined;

    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Browser environment - check window.env
      envUrl = (window as any)?.env?.EDGE_PLATFORM_PROXY_URL;
    } else {
      // Node.js environment - check process.env
      envUrl = process.env.EDGE_PLATFORM_PROXY_URL;
    }

    if (envUrl) {
      return envUrl;
    }

    // Fallback to default production URL when environment variable is not set
    return this.defaultEdgePlatformProxyUrl;
  }
}
