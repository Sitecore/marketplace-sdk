import { createClient } from '@hey-api/openapi-ts';
import { generatorOutput } from '../shared/generator-output';
import { defineAugmentationConfig } from '../shared/plugins/augmentation';
import { defineHttpClientConfig } from '../shared/plugins/http-client';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';

createClient({
  input: './schema/xmapp.yaml',
  output: generatorOutput('./src/client-xmapp'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.xmapp'],
      deprecated: true,
      deprecationMessage: `The 'xmc.xmapp' namespace is deprecated. Use 'xmc.sites' or 'xmc.pages' instead. Will be removed in later version.`,
    }),
    defineNamespaceTransformerConfig({
      namespace: 'Xmapp',
    }),
  ],
});

createClient({
  input: './schema/authoring.yaml',
  output: generatorOutput('./src/client-authoring'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/v1/authoring',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.authoring'],
    }),
    defineNamespaceTransformerConfig({
      namespace: 'Authoring',
    }),
  ],
});

createClient({
  input: './schema/content-transfer.yaml',
  output: generatorOutput('./src/client-content-transfer'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring/transfer',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.contentTransfer'],
    }),
    defineNamespaceTransformerConfig({
      namespace: 'ContentTransfer',
    }),
  ],
});

createClient({
  input: './schema/content.yaml',
  output: generatorOutput('./src/client-content'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/content/api',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.preview', 'xmc.live'],
    }),
    defineNamespaceTransformerConfig({
      namespace: 'Content',
    }),
  ],
});

createClient({
  input: './schema/agent.json',
  output: generatorOutput('./src/client-agent'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/stream/ai-agent-api/',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.agent'],
    }),
    defineNamespaceTransformerConfig({
      namespace: 'Agent',
    }),
  ],
});

createClient({
  input: './schema/sites.json',
  output: generatorOutput('./src/client-sites'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.sites'],
    }),
    defineNamespaceTransformerConfig({
      namespace: 'Sites',
    }),
  ],
});

createClient({
  input: './schema/pages.json',
  output: generatorOutput('./src/client-pages'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.pages'],
    }),
    defineNamespaceTransformerConfig({
      namespace: 'Pages',
    }),
  ],
});

createClient({
  input: './schema/search.json',
  output: generatorOutput('./src/client-search'),
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/search',
    }),
    defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.search'],
    }),
    defineNamespaceTransformerConfig({
      namespace: 'Search',
    }),
  ],
});