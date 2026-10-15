import { $, type DefinePlugin } from '@hey-api/openapi-ts';
import type { Config } from './types';
import { httpClientPluginName } from '../http-client';
import { wrapTypesInNamespace } from '../namespace';

export const handler: DefinePlugin<Config>['Handler'] = ({ plugin }) => {
  const client = plugin.getPluginOrThrow(httpClientPluginName);
  const symbol = client.querySymbol({ category: 'client' });
  const node = symbol?.node;
  if (!node || node['~dsl'] !== 'VarTsDsl') {
    throw new Error('Generated fetch client declaration was not found');
  }

  const symbols = [...plugin.gen.symbols.registered()];
  const createClient = symbols.find(
    (symbol) => symbol.name === 'createClient' && Boolean(symbol.external),
  );
  const createConfig = symbols.find(
    (symbol) => symbol.name === 'createConfig' && Boolean(symbol.external),
  );
  if (!createClient || !createConfig) {
    throw new Error('Generated fetch client factory symbols were not found');
  }
  const fetch = plugin.symbol('clientSdkfetch', { external: '../client-sdk-fetch' });
  const options = plugin.referenceSymbol({
    category: 'type',
    resource: 'client',
    role: 'options',
  });
  const baseUrl = plugin.context.ir.servers?.[0]?.url;
  const config = $.object()
    .$if(baseUrl, (object, value) => object.prop('baseUrl', $.literal(value)))
    .prop('fetch', $(fetch));

  (node as ReturnType<typeof $.const>).assign(
    $(createClient).call($(createConfig).call(config).generic(options)),
  );

  wrapTypesInNamespace(plugin, plugin.config.namespace ?? '');
};
