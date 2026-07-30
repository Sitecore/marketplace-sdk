import * as experimental_extractions_sdk from './experimental/client-extractions/sdk.gen';
import {
  getEdgePlatformProxyUrl,
  createCustomClients,
  createApiProxy,
  type ApiConfig,
} from '../../shared/src';

export * from './experimental/client-extractions/types.gen';

type ApiType = 'extractions';

export interface experimental_AIV2Config {
  getAccessToken: () => Promise<string>;
}

export async function experimental_createAIV2Client(
  config: experimental_AIV2Config,
): Promise<experimental_AIV2> {
  return new experimental_AIV2(config);
}

export type ExtractionsApi = typeof experimental_extractions_sdk;

export class experimental_AIV2 {
  public readonly extractions: ExtractionsApi;

  constructor(config: experimental_AIV2Config) {
    console.log('🔧 [experimental_AIV2] Constructor called');
    const edgePlatformProxyUrl = getEdgePlatformProxyUrl();

    const apiConfigs: Record<ApiType, ApiConfig> = {
      extractions: {
        baseUrl: `${edgePlatformProxyUrl}/ai-extractions-api`,
        sdk: experimental_extractions_sdk,
        name: 'Extractions API',
      },
    };

    const customClients = createCustomClients(apiConfigs, config.getAccessToken, 'experimental_AIV2');

    this.extractions = createApiProxy(
      'extractions',
      apiConfigs,
      customClients,
      'experimental_AIV2',
    );
  }
}
