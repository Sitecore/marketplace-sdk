import {
  clientDefaultConfig,
  clientDefaultMeta,
  clientPluginHandler,
  definePluginConfig,
  type DefinePlugin,
} from '@hey-api/openapi-ts';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Config } from './types';

/**
 * Absolute path of the HTTP client entry file. An absolute client name makes
 * the generator import the client from this folder (relative to each output)
 * instead of from an npm package.
 */
export const httpClientPluginName = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../src/http/index.ts',
);

export const defaultHttpClientConfig: DefinePlugin<Config>['Config'] = {
  ...clientDefaultMeta,
  config: {
    ...clientDefaultConfig,
    // Import the client from packages/shared/src/http instead of copying a
    // client into every generated module.
    bundle: false,
    throwOnError: false,
    // Keep the generated client file named client.gen.ts.
    $hooks: { symbols: { getFilePath: () => 'client' } },
  },
  handler: clientPluginHandler as DefinePlugin<Config>['Handler'],
  name: httpClientPluginName,
  symbolMeta() {
    return { artifact: 'client' };
  },
};

/**
 * Client plugin for the HTTP client in `packages/shared/src/http`.
 */
export const defineHttpClientConfig = definePluginConfig(defaultHttpClientConfig);
