import * as experimental_documents_sdk from './experimental/client-documents/sdk.gen';
import * as experimental_skills_sdk from './experimental/client-skills/sdk.gen';
import {
  getEdgePlatformProxyUrl,
  createCustomClients,
  createApiProxy,
  type ApiConfig,
} from '../../shared/src';

// Re-export experimental types for convenience
export * from './experimental/client-documents/types.gen';
export * from './experimental/client-skills/types.gen';

// Supported API types
type ApiType = 'documents' | 'skills';

// Configuration type for experimental_AI
export interface experimental_AIConfig {
  getAccessToken: () => Promise<string>;
}

// Helper function to create experimental_AI client asynchronously
export async function experimental_createAIClient(
  config: experimental_AIConfig,
): Promise<experimental_AI> {
  return new experimental_AI(config);
}

// Type definitions for the API objects with full IntelliSense support
export type DocumentsApi = typeof experimental_documents_sdk;
export type SkillsApi = typeof experimental_skills_sdk;

export class experimental_AI {
  public readonly documents: DocumentsApi;
  public readonly skills: SkillsApi;

  constructor(config: experimental_AIConfig) {
    console.log('🔧 [experimental_AI] Constructor called');
    const edgePlatformProxyUrl = getEdgePlatformProxyUrl();

    // Define API configurations
    const apiConfigs: Record<ApiType, ApiConfig> = {
      documents: {
        baseUrl: `${edgePlatformProxyUrl}/stream/ai-documents-api`,
        sdk: experimental_documents_sdk,
        name: 'AI documents API',
      },
      skills: {
        baseUrl: `${edgePlatformProxyUrl}/stream/ai-skills-api/`,
        sdk: experimental_skills_sdk,
        name: 'AI skills API',
      },
    };

    // Create custom clients for each API
    const customClients = createCustomClients(apiConfigs, config.getAccessToken, 'experimental_AI');

    // Create API proxies with separated methods and types
    this.documents = createApiProxy('documents', apiConfigs, customClients, 'experimental_AI');
    this.skills = createApiProxy('skills', apiConfigs, customClients, 'experimental_AI');
  }
}
