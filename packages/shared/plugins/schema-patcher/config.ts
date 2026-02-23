import type { Plugin } from '@hey-api/openapi-ts';

import { handler } from './plugin';
import type { Config } from './types';

export const defaultSchemaPatcherConfig: Plugin.Config<Config> = {
  _dependencies: [],
  _handler: handler,
  _handlerLegacy: () => {},
  name: '@sitecore-marketplace/schema-patcher',
  output: 'types',
};

/**
 * Type helper for `my-plugin` plugin, returns {@link Plugin.Config} object
 */
export const defineSchemaPatcherConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultSchemaPatcherConfig,
  ...config,
});
