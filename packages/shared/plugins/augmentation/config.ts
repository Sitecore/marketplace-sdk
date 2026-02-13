import type { Plugin } from '@hey-api/openapi-ts';

import { handler } from './plugin';
import type { Config } from './types';

export const defaultAugmentationConfig: Plugin.Config<Config> = {
  _dependencies: ['@hey-api/sdk'],
  _handler: handler,
  _handlerLegacy: () => {},
  name: '@sitecore-marketplace/augmentation',
  output: 'augmentation',
  exportFromIndex: false,
};

/**
 * Type helper for `my-plugin` plugin, returns {@link Plugin.Config} object
 */
export const defineAugmentationConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultAugmentationConfig,
  ...config,
});
