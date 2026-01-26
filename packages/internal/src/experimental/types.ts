import type { Client } from '@hey-api/client-fetch';

/**
 * Configuration for experimental SDK clients
 */
export interface ExperimentalClientConfig {
  /** Function to retrieve the access token for authentication */
  getAccessToken: () => Promise<string>;
  /** Optional custom Edge Platform proxy URL */
  edgePlatformProxyUrl?: string;
}

/**
 * Configuration for an individual API within the experimental client
 */
export interface ApiConfig {
  /** Base URL for the API */
  baseUrl: string;
  /** The generated SDK module */
  sdk: any;
  /** Human-readable name for the API */
  name: string;
}

/**
 * Type for the custom clients record
 */
export type CustomClients<T extends string> = Record<T, Client>;
