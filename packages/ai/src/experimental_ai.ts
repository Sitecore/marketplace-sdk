import {
  ExperimentalClientBase,
  ExperimentalClientConfig,
  ApiConfig,
} from '@sitecore-marketplace-sdk/internal';

import * as experimental_skills_sdk from './experimental/client-skills/sdk.gen';

// Re-export types
export * from './experimental/client-skills/types.gen';

// API type definitions
type AIApiType = 'skills';

// Type alias for API object
export type SkillsApi = typeof experimental_skills_sdk;

// Re-export config type with alias
export type experimental_AIConfig = ExperimentalClientConfig;

// Factory function
export async function experimental_createAIClient(
  config: experimental_AIConfig,
): Promise<experimental_AI> {
  return new experimental_AI(config);
}

export class experimental_AI extends ExperimentalClientBase<AIApiType> {
  public readonly skills: SkillsApi;

  constructor(config: experimental_AIConfig) {
    super(config);

    // Create API proxy
    this.skills = this.createApiProxy('skills');
  }

  protected defineApiConfigs(): Record<AIApiType, ApiConfig> {
    return {
      skills: {
        baseUrl: `${this.edgePlatformProxyUrl}/stream/ai-skills-api/`,
        sdk: experimental_skills_sdk,
        name: 'AI Skills API',
      },
    };
  }
}
