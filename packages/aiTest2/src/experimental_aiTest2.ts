import * as experimental_authoring_sdk from './experimental/client-authoring/sdk.gen';
import {
  getEdgePlatformProxyUrl,
  createCustomClients,
  createApiProxy,
  type ApiConfig,
} from '../../shared/src';

export * from './experimental/client-authoring/types.gen';

type ApiType = 'authoring';

export interface experimental_AITest2Config {
  getAccessToken: () => Promise<string>;
}

export async function experimental_createAITest2Client(
  config: experimental_AITest2Config,
): Promise<experimental_AITest2> {
  return new experimental_AITest2(config);
}

export type AuthoringApi = typeof experimental_authoring_sdk;

export class experimental_AITest2 {
  public readonly authoring: AuthoringApi;

  constructor(config: experimental_AITest2Config) {
    console.log('🔧 [experimental_AITest2] Constructor called');
    const edgePlatformProxyUrl = getEdgePlatformProxyUrl();

    const apiConfigs: Record<ApiType, ApiConfig> = {
      authoring: {
        baseUrl: `${edgePlatformProxyUrl}/skills`,
        sdk: experimental_authoring_sdk,
        name: 'Authoring API',
      },
    };

    const customClients = createCustomClients(apiConfigs, config.getAccessToken, 'experimental_AITest2');

    this.authoring = createApiProxy('authoring', apiConfigs, customClients, 'experimental_AITest2');
  }
}