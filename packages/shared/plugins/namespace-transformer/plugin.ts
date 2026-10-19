import type { DefinePlugin } from '@hey-api/openapi-ts';
import type { Config } from './types';
import { wrapTypesInNamespace } from '../namespace';

export const handler: DefinePlugin<Config>['Handler'] = ({ plugin }) => {
  wrapTypesInNamespace(plugin, plugin.config.namespace);
};
