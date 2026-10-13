import { definePluginConfig, type DefinePlugin } from '@hey-api/openapi-ts';

import { handler } from './plugin';
import type { Config } from './types';

export const defaultAugmentationConfig: DefinePlugin<Config>['Config'] = {
  dependencies: ['@hey-api/sdk'],
  handler,
  name: '@sitecore-marketplace/augmentation',
  config: {
    output: 'augmentation',
    includeInEntry: false,
  },
};

/**
 * Type helper for `my-plugin` plugin, returns {@link Plugin.Config} object
 */
export const defineAugmentationConfig = definePluginConfig(defaultAugmentationConfig);
