import { DEFAULT_EDGE_PLATFORM_PROXY_URL } from './constants';

/**
 * Resolves the Edge Platform proxy URL from the environment.
 *
 * Checks `window.env.EDGE_PLATFORM_PROXY_URL` (browser) or
 * `process.env.EDGE_PLATFORM_PROXY_URL` (Node.js), falling back
 * to the provided default or `DEFAULT_EDGE_PLATFORM_PROXY_URL`.
 */
export function getEdgePlatformProxyUrl(
  fallbackUrl: string = DEFAULT_EDGE_PLATFORM_PROXY_URL,
): string {
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
  return fallbackUrl;
}
