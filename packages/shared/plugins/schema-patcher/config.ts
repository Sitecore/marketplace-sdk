import { definePluginConfig, type DefinePlugin } from '@hey-api/openapi-ts';

import { handler } from './plugin';
import type { Config } from './types';

export const defaultSchemaPatcherConfig: DefinePlugin<Config>['Config'] = {
  dependencies: [],
  handler,
  name: '@sitecore-marketplace/schema-patcher',
  config: { output: 'types' },
};

/**
 * Type helper for `my-plugin` plugin, returns {@link Plugin.Config} object
 */
export const defineSchemaPatcherConfig = definePluginConfig(defaultSchemaPatcherConfig);
