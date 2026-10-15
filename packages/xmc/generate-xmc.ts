import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from '../shared/plugins/augmentation';
import { defineClientTransformerConfig } from '../shared/plugins/client-transformer/config';
import { defineHttpClientConfig } from '../shared/plugins/http-client';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';

createClient({
  input: './schema/xmapp.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-xmapp',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    defineHttpClientConfig(),
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
    defineClientTransformerConfig({
      namespace: 'Xmapp',
    }),
  ],
});

createClient({
  input: './schema/authoring.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-authoring',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/v1/authoring',
    }),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.authoring'],
    }),
    defineClientTransformerConfig({
      namespace: 'Authoring',
    }),
  ],
});

createClient({
  input: './schema/content-transfer.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-content-transfer',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring/transfer',
    }),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.contentTransfer'],
    }),
    defineClientTransformerConfig({
      namespace: 'ContentTransfer',
    }),
  ],
});

createClient({
  input: './schema/content.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-content',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/content/api',
    }),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.preview', 'xmc.live'],
    }),
    defineClientTransformerConfig({
      namespace: 'Content',
    }),
  ],
});

createClient({
  input: './schema/agent.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-agent',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/stream/ai-agent-api/',
    }),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.agent'],
    }),
    defineClientTransformerConfig({
      namespace: 'Agent',
    }),
  ],
});

createClient({
  input: './schema/sites.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-sites',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.sites'],
    }),
    defineClientTransformerConfig({
      namespace: 'Sites',
    }),
  ],
});

createClient({
  input: './schema/pages.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-pages',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.pages'],
    }),
    defineClientTransformerConfig({
      namespace: 'Pages',
    }),
  ],
});

createClient({
  input: './schema/search.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-search',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/search',
    }),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineAugmentationConfig({
      namespaces: ['xmc.search'],
    }),
    defineClientTransformerConfig({
      namespace: 'Search',
    }),
  ],
});