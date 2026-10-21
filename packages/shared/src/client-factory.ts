import { createClient, createConfig, type Client } from './http';
import { DEFAULT_HEADERS } from './constants';
import type { ApiConfig } from './types';

function createTimeoutFetch(fetch: typeof globalThis.fetch, timeoutMs: number, streaming: boolean) {
  return async (input: Request): Promise<Response> => {
    const controller = new AbortController();
    const abort = () => controller.abort(input.signal.reason);
    if (input.signal.aborted) {
      abort();
    } else {
      input.signal.addEventListener('abort', abort, { once: true });
    }
    const timer = setTimeout(() => {
      controller.abort(new DOMException(`Request timed out after ${timeoutMs} ms.`, 'TimeoutError'));
    }, timeoutMs);
    try {
      const response = await fetch(new Request(input, { signal: controller.signal }));
      if (!streaming && response.body) {
        await response.clone().arrayBuffer();
      }
      return response;
    } finally {
      clearTimeout(timer);
      input.signal.removeEventListener('abort', abort);
    }
  };
}

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
  timeout: number = 30000,
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

          const { timeoutMs, ...requestOptions } = options ?? {};
          const configuredFetch = typeof customClients[apiType].getConfig === 'function'
            ? customClients[apiType].getConfig().fetch
            : undefined;
          const fetch = requestOptions.fetch ?? configuredFetch ?? globalThis.fetch;
          const result = originalMethod({
            ...requestOptions,
            client: customClients[apiType],
            fetch: createTimeoutFetch(fetch, timeoutMs || timeout || 30000, requestOptions.parseAs === 'stream'),
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
