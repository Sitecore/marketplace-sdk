import { clientDefaultConfig, clientPluginHandler, type Plugin } from '@hey-api/openapi-ts';
import { fileURLToPath } from 'node:url';

import type { Config } from './types';

/**
 * Absolute path of the HTTP client entry file. An absolute client name makes
 * the generator import the client from this folder (relative to each output)
 * instead of from an npm package.
 */
export const httpClientPluginName = fileURLToPath(
  new URL('../../src/http/index.ts', import.meta.url),
);

export const defaultHttpClientConfig: Plugin.Config<Config> = {
  ...clientDefaultConfig,
  _handler: clientPluginHandler,
  _handlerLegacy: () => {},
  name: httpClientPluginName,
  throwOnError: false,
};

/**
 * Client plugin for the HTTP client in `packages/shared/src/http`.
 */
export const defineHttpClientConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultHttpClientConfig,
  ...config,
});
