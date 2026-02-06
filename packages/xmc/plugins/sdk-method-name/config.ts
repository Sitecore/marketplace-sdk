import type { Plugin } from '@hey-api/openapi-ts';

import { handler } from './plugin';
import type { Config } from './types';

export const defaultSdkMethodNameConfig: Plugin.Config<Config> = {
  _dependencies: [],
  _handler: handler,
  _handlerLegacy: () => {},
  name: '@sitecore-marketplace/sdk-method-name',
  output: 'types',
};

/**
 * Type helper for `sdk-method-name` plugin, returns {@link Plugin.Config} object.
 *
 * This plugin uses the x-sdk-method-name OpenAPI extension to override
 * generated SDK method names.
 *
 * @example
 * ```yaml
 * paths:
 *   /api/v1/sites/{siteId}/rename:
 *     post:
 *       operationId: renameSitev2xmappsRenameSiteOperation
 *       x-sdk-method-name: renameSite
 * ```
 *
 * The generated SDK will use `renameSite` instead of `renameSitev2xmappsRenameSiteOperation`.
 */
export const defineSdkMethodNameConfig: Plugin.DefineConfig<Config> = (config) => ({
  ...defaultSdkMethodNameConfig,
  ...config,
});
