/**
 * Default headers required for all API calls through the Marketplace SDK.
 */
export const DEFAULT_HEADERS = {
  'sc-resource': 'marketplace',
  'sc-marketplace-auth': 'interactive/v1',
} as const;

/**
 * Default Edge Platform proxy URL used when no environment variable is set.
 */
export const DEFAULT_EDGE_PLATFORM_PROXY_URL = 'https://edge-platform.sitecorecloud.io';
