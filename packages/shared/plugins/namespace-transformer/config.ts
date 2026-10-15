import type { Plugin } from '@hey-api/openapi-ts';

import { httpClientPluginName } from '../http-client';
import { handler } from './plugin';
import type { Config } from './types';

export const defaultNamespaceTransformerConfig: Plugin.Config<Config> = {
  _dependencies: [httpClientPluginName, '@hey-api/typescript'],
  _handler: handler,
  _handlerLegacy: () => {},
  name: '@sitecore-marketplace/namespace-transformer',
  output: 'client',
  namespace: '',
};

/**
 * Type helper for `my-plugin` plugin, returns {@link Plugin.Config} object
 */
export const defineNamespaceTransformerConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultNamespaceTransformerConfig,
  ...config,
});
