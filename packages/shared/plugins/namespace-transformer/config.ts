import { definePluginConfig, type DefinePlugin } from '@hey-api/openapi-ts';

import { handler } from './plugin';
import type { Config } from './types';

export const defaultNamespaceTransformerConfig: DefinePlugin<Config>['Config'] = {
  dependencies: ['@hey-api/client-fetch', '@hey-api/typescript', '@hey-api/sdk'],
  handler,
  name: '@sitecore-marketplace/namespace-transformer',
  config: { output: 'client', namespace: '' },
};

/**
 * Type helper for `my-plugin` plugin, returns {@link Plugin.Config} object
 */
export const defineNamespaceTransformerConfig = definePluginConfig(
  defaultNamespaceTransformerConfig,
);
