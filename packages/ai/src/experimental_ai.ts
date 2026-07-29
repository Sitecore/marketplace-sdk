import * as experimental_brands_sdk from './experimental/client-brands/sdk.gen';
import {
  getEdgePlatformProxyUrl,
  createCustomClients,
  createApiProxy,
  type ApiConfig,
} from '../../shared/src';

export * from './experimental/client-brands/types.gen';

type ApiType = 'brands';

export interface experimental_AIConfig {
  getAccessToken: () => Promise<string>;
}

export async function experimental_createAIClient(
  config: experimental_AIConfig,
): Promise<experimental_AI> {
  return new experimental_AI(config);
}

export type BrandsApi = typeof experimental_brands_sdk;

export class experimental_AI {
  public readonly brands: BrandsApi;

  constructor(config: experimental_AIConfig) {
    console.log('🔧 [experimental_AI] Constructor called');
    const edgePlatformProxyUrl = getEdgePlatformProxyUrl();

    const apiConfigs: Record<ApiType, ApiConfig> = {
      brands: {
        baseUrl: `${edgePlatformProxyUrl}/ai-brands-api`,
        sdk: experimental_brands_sdk,
        name: 'Brands API',
      },
    };

    const customClients = createCustomClients(apiConfigs, config.getAccessToken, 'experimental_AI');

    this.brands = createApiProxy('brands', apiConfigs, customClients, 'experimental_AI');
  }
}
