import * as experimental_brands_sdk from './experimental/client-brands/sdk.gen';
import * as experimental_skills_sdk from './experimental/client-skills/sdk.gen';
import {
  getEdgePlatformProxyUrl,
  createCustomClients,
  createApiProxy,
  type ApiConfig,
} from '../../shared/src';

export * from './experimental/client-brands/types.gen';
export * from './experimental/client-skills/types.gen';

type ApiType = 'brands' | 'skills';

// Configuration type for experimental_AI
export interface experimental_AIConfig {
  getAccessToken: () => Promise<string>;
}

export async function experimental_createAIClient(
  config: experimental_AIConfig,
): Promise<experimental_AI> {
  return new experimental_AI(config);
}

export type BrandsApi = typeof experimental_brands_sdk;
export type SkillsApi = typeof experimental_skills_sdk;

export class experimental_AI {
  public readonly brands: BrandsApi;
  public readonly skills: SkillsApi;

  constructor(config: experimental_AIConfig) {
    console.log('🔧 [experimental_AI] Constructor called');
    const edgePlatformProxyUrl = getEdgePlatformProxyUrl();

    const apiConfigs: Record<ApiType, ApiConfig> = {
      brands: {
        baseUrl: `${edgePlatformProxyUrl}/ai-brands-api`,
        sdk: experimental_brands_sdk,
        name: 'Brands API',
      },
      skills: {
        baseUrl: `${edgePlatformProxyUrl}/stream/ai-skills-api/`,
        sdk: experimental_skills_sdk,
        name: 'AI skills API',
      },
    };

    const customClients = createCustomClients(apiConfigs, config.getAccessToken, 'experimental_AI');

    this.brands = createApiProxy('brands', apiConfigs, customClients, 'experimental_AI');
    this.skills = createApiProxy('skills', apiConfigs, customClients, 'experimental_AI');
  }
}
