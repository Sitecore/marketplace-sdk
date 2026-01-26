import { createClient, createConfig, type Client } from '@hey-api/client-fetch';
import { DEFAULT_HEADERS, DEFAULT_EDGE_PLATFORM_PROXY_URL } from './constants';
import type { ExperimentalClientConfig, ApiConfig, CustomClients } from './types';

/**
 * Base class for experimental SDK clients.
 * Provides shared functionality for authentication, client creation, and API proxying.
 *
 * @typeParam TApiType - Union type of API names (e.g., 'sites' | 'pages' | 'agent')
 */
export abstract class ExperimentalClientBase<TApiType extends string> {
  protected readonly getAccessToken: () => Promise<string>;
  protected readonly edgePlatformProxyUrl: string;
  protected readonly apiConfigs: Record<TApiType, ApiConfig>;
  protected readonly customClients: CustomClients<TApiType>;

  constructor(config: ExperimentalClientConfig) {
    this.getAccessToken = config.getAccessToken;
    this.edgePlatformProxyUrl = config.edgePlatformProxyUrl || this.calculateEdgePlatformProxyUrl();
    this.apiConfigs = this.defineApiConfigs();
    this.customClients = this.createCustomClients();
  }

  /**
   * Define the API configurations for this client.
   * Subclasses must implement this to specify their APIs.
   */
  protected abstract defineApiConfigs(): Record<TApiType, ApiConfig>;

  /**
   * Creates custom HTTP clients for all APIs with authentication
   */
  protected createCustomClients(): CustomClients<TApiType> {
    const clients: Partial<CustomClients<TApiType>> = {};

    for (const [apiType, config] of Object.entries(this.apiConfigs) as [TApiType, ApiConfig][]) {
      const authFunction = async () => {
        const token = await this.getAccessToken();
        return token;
      };

      clients[apiType] = createClient(
        createConfig({
          baseUrl: config.baseUrl,
          auth: authFunction,
        }),
      );
    }

    return clients as CustomClients<TApiType>;
  }

  /**
   * Creates a proxy for an API that automatically injects the custom client and headers
   */
  protected createApiProxy<T>(apiType: TApiType): T {
    const apiObject = {
      ...this.apiConfigs[apiType].sdk,
    };

    const methodCache = new Map<string, Function>();

    return new Proxy(apiObject, {
      get: (target, prop) => {
        const propKey = String(prop);
        const originalMethod = target[prop as keyof typeof target];

        if (typeof originalMethod === 'function') {
          if (methodCache.has(propKey)) {
            return methodCache.get(propKey);
          }

          const wrappedMethod = (options?: any) => {
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
    }) as T;
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
    return DEFAULT_EDGE_PLATFORM_PROXY_URL;
  }
}
