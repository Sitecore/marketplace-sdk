/**
 * Configuration for an API endpoint used by experimental clients.
 */
export interface ApiConfig {
  baseUrl: string;
  sdk: any;
  name: string;
}

/**
 * Base configuration for experimental client constructors.
 */
export interface ExperimentalClientConfig {
  getAccessToken: () => Promise<string>;
}

/**
 * Locally-defined SDKModule interface, structurally compatible with
 * `@sitecore-marketplace-sdk/client`'s `SDKModule` so that consumers
 * can assign the result of `createSDKModule` directly.
 */
export interface SDKModuleDefinition {
  namespace: string;
  invokeOperation: (operation: string, ...args: any[]) => any;
}
