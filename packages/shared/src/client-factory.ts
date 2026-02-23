import { createClient, createConfig, type Client } from '@hey-api/client-fetch';
import { DEFAULT_HEADERS } from './constants';
import type { ApiConfig } from './types';

/**
 * Creates authenticated HTTP clients for each API type.
 *
 * @param apiConfigs - Map of API type keys to their configuration
 * @param getAccessToken - Async function that returns a bearer token
 * @param label - Label used in log messages (e.g. 'experimental_AI')
 */
export function createCustomClients<T extends string>(
  apiConfigs: Record<T, ApiConfig>,
  getAccessToken: () => Promise<string>,
  label: string,
): Record<T, Client> {
  const clients: Partial<Record<T, Client>> = {};

  for (const [apiType, config] of Object.entries(apiConfigs) as [T, ApiConfig][]) {
    const authFunction = async () => {
      console.log(`🔑 [${label}] Getting access token for ${apiType}`);
      const token = await getAccessToken();
      return token;
    };

    clients[apiType] = createClient(
      createConfig({
        baseUrl: config.baseUrl,
        auth: authFunction,
      }),
    );
  }

  return clients as Record<T, Client>;
}

/**
 * Creates a Proxy wrapper around an SDK module that automatically injects
 * the custom client and default headers into every method call.
 *
 * @param apiType - The API type key (used for logging)
 * @param apiConfigs - Map of API type keys to their configuration
 * @param customClients - Map of API type keys to their pre-configured Client instances
 * @param label - Label used in log messages (e.g. 'experimental_AI')
 * @param headers - Headers to inject into every request (defaults to DEFAULT_HEADERS)
 */
export function createApiProxy<T extends string>(
  apiType: T,
  apiConfigs: Record<T, ApiConfig>,
  customClients: Record<T, Client>,
  label: string,
  headers: Record<string, string> = DEFAULT_HEADERS as unknown as Record<string, string>,
) {
  const apiObject = {
    ...apiConfigs[apiType].sdk,
  };

  // Cache for wrapped methods to avoid recreating functions
  const methodCache = new Map<string, Function>();

  return new Proxy(apiObject, {
    get: (target: any, prop: string | symbol) => {
      const propKey = String(prop);
      const originalMethod = target[prop as keyof typeof target];

      if (typeof originalMethod === 'function') {
        // Check if we already have a wrapped version
        if (methodCache.has(propKey)) {
          return methodCache.get(propKey);
        }

        // Create wrapped method and cache it
        const wrappedMethod = (options?: any) => {
          console.log(`🎭 [${label}] Calling ${apiType}.${propKey}`);

          const result = originalMethod({
            ...options,
            client: customClients[apiType],
            headers: {
              ...options?.headers,
              ...headers,
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
