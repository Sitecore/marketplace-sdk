import * as experimental_xmapp_sdk from './experimental/client-xmapp/sdk.gen';
import * as experimental_authoring_sdk from './experimental/client-authoring/sdk.gen';
import { createClient, createConfig, type Client } from '@hey-api/client-fetch';

// Re-export experimental types for convenience
export * as Experimental_XmappTypes from './experimental/client-xmapp/types.gen';
export * as Experimental_AuthoringTypes from './experimental/client-authoring/types.gen';

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
type ApiType = 'xmapp' | 'authoring';

// Configuration type for Experimental_XMC
interface ExperimentalXMCConfig {
  getAccessToken: () => Promise<string>;
}

// Type definitions for the API objects with full IntelliSense support
// These types provide complete IntelliSense for all available methods and their parameters
export type XmappApi = typeof experimental_xmapp_sdk;
export type AuthoringApi = typeof experimental_authoring_sdk;

export class Experimental_XMC {
  public readonly xmapp: XmappApi;
  public readonly authoring: AuthoringApi;
  public readonly getAccessToken: () => Promise<string>;

  private readonly apiConfigs: Record<ApiType, ApiConfig>;
  private readonly customClients: Record<ApiType, Client>;
  private readonly edgePlatformProxyUrl: string;
  private readonly defaultEdgePlatformProxyUrl = 'https://edge-platform.sitecorecloud.io';

  constructor(config: ExperimentalXMCConfig) {
    console.log('🔧 [Experimental_XMC] Constructor called');
    this.getAccessToken = config.getAccessToken;
    this.edgePlatformProxyUrl = this.calculateEdgePlatformProxyUrl();

    // Define default API configurations
    const defaultApiConfigs: Record<ApiType, ApiConfig> = {
      xmapp: {
        baseUrl: `${this.edgePlatformProxyUrl}/authoring`,
        sdk: experimental_xmapp_sdk,
        name: 'XMApp API',
      },
      authoring: {
        baseUrl: `${this.edgePlatformProxyUrl}/v1/authoring`,
        sdk: experimental_authoring_sdk,
        name: 'Authoring API',
      },
    };

    // Use default configurations
    this.apiConfigs = defaultApiConfigs;

    // Create custom clients for each API
    this.customClients = this.createCustomClients();

    // Create API proxies with separated methods and types
    this.xmapp = this.createApiProxy('xmapp');
    this.authoring = this.createApiProxy('authoring');
  }

  /**
   * Creates custom clients for all APIs
   */
  private createCustomClients(): Record<ApiType, Client> {
    const clients: Partial<Record<ApiType, Client>> = {};

    for (const [apiType, config] of Object.entries(this.apiConfigs)) {
      const authFunction = async () => {
        console.log(`🔑 [Experimental_XMC] Getting access token for ${apiType}`);
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

    return new Proxy(apiObject, {
      get: (target, prop) => {
        const originalMethod = target[prop as keyof typeof target];

        if (typeof originalMethod === 'function') {
          return (options?: any) => {
            console.log(`🎭 [Experimental_XMC] Calling ${apiType}.${String(prop)}`);

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
        }

        return originalMethod;
      },
    });
  }

  /**
   * Calculates the edge platform proxy URL from environment or falls back to default
   */
  private calculateEdgePlatformProxyUrl(): string {
    // Prefer environment variable EDGE_PLATFORM_PROXY_URL
    if ((window as any).env && (window as any).env.VITE_EDGE_PLATFORM_PROXY_URL) {
      const envUrl = (window as any).env.VITE_EDGE_PLATFORM_PROXY_URL;
      return envUrl;
    }

    // Fallback to default production URL when environment variable is not set
    return this.defaultEdgePlatformProxyUrl;
  }
}
