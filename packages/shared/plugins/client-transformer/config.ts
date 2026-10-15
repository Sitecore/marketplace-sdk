import type { Plugin } from '@hey-api/openapi-ts';

import { httpClientPluginName } from '../http-client';
import { handler } from './plugin';
import type { Config } from './types';

export const defaultClientTransformerConfig: Plugin.Config<Config> = {
  _dependencies: [httpClientPluginName, '@hey-api/typescript'],
  _handler: handler,
  _handlerLegacy: () => {},
  name: '@sitecore-marketplace/client-transformer',
  output: 'client',
};

/**
 * Type helper for `my-plugin` plugin, returns {@link Plugin.Config} object
 */
export const defineClientTransformerConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultClientTransformerConfig,
  ...config,
});
