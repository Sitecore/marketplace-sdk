import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from './plugins/augmentation';
import { defineClientTransformerConfig } from './plugins/client-transformer/config';
import { defineSchemaPatcherConfig } from './plugins/schema-patcher';

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
    '@hey-api/client-fetch',
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
    '@hey-api/client-fetch',
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
    '@hey-api/client-fetch',
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
    '@hey-api/client-fetch',
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
  input: 'https://ai-agent-api-use.sitecorecloud.io/api/docs/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-agent',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/stream/ai-agent-api/',
    }),
    '@hey-api/client-fetch',
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
  input: 'https://api-docs.sitecore.com/_spec/sai/sites-api/index.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-sites',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    '@hey-api/client-fetch',
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
  input: 'https://api-docs.sitecore.com/_spec/sai/pages-api/index.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-pages',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/authoring',
    }),
    '@hey-api/client-fetch',
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
    '@hey-api/client-fetch',
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