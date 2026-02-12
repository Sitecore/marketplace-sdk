import * as experimental_skills_sdk from './experimental/client-skills/sdk.gen';
import { createClient, createConfig, type Client } from '@hey-api/client-fetch';

// Re-export experimental types for convenience
export * from './experimental/client-skills/types.gen';

// Default headers required for API calls
const DEFAULT_HEADERS = {
  'sc-resource': 'marketplace',
  'sc-marketplace-auth': 'interactive/v1',
} as const;

// API configurations with better typing
interface ApiConfig {
  baseUrl: string;
  sdk: any;
  name: string;
}

// Supported API types
type ApiType = 'skills';

// Configuration type for experimental_AI
export interface experimental_AIConfig {
  getAccessToken: () => Promise<string>;
}

// Helper function to create experimental_AI client asynchronously
export async function experimental_createAIClient(
  config: experimental_AIConfig,
): Promise<experimental_AI> {
  return new experimental_AI(config);
}

// Type definitions for the API objects with full IntelliSense support
export type SkillsApi = typeof experimental_skills_sdk;

export class experimental_AI {
  public readonly skills: SkillsApi;

  private readonly getAccessToken: () => Promise<string>;
  private readonly apiConfigs: Record<ApiType, ApiConfig>;
  private readonly customClients: Record<ApiType, Client>;
  private readonly edgePlatformProxyUrl: string;
  private readonly defaultEdgePlatformProxyUrl = 'https://edge-platform.sitecorecloud.io';

  constructor(config: experimental_AIConfig) {
    console.log('🔧 [experimental_AI] Constructor called');
    this.getAccessToken = config.getAccessToken;
    this.edgePlatformProxyUrl = this.calculateEdgePlatformProxyUrl();

    // Define default API configurations
    const defaultApiConfigs: Record<ApiType, ApiConfig> = {
      skills: {
        baseUrl: `${this.edgePlatformProxyUrl}/stream/ai-skills-api/`,
        sdk: experimental_skills_sdk,
        name: 'Skills API',
      },
    };

    // Use default configurations
    this.apiConfigs = defaultApiConfigs;

    // Create custom clients for each API
    this.customClients = this.createCustomClients();

    // Create API proxies with separated methods and types
    this.skills = this.createApiProxy('skills');
  }

  /**
   * Creates custom clients for all APIs
   */
  private createCustomClients(): Record<ApiType, Client> {
    const clients: Partial<Record<ApiType, Client>> = {};

    for (const [apiType, config] of Object.entries(this.apiConfigs)) {
      const authFunction = async () => {
        console.log(`🔑 [experimental_AI] Getting access token for ${apiType}`);
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
            console.log(`🎭 [experimental_AI] Calling ${apiType}.${propKey}`);

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
