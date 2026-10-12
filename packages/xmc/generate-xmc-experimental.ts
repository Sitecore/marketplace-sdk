import { createClient } from '@hey-api/openapi-ts';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';

createClient({
  input: 'https://api-docs.sitecore.com/_spec/sai/sites-api/index.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-sites',
  },
  plugins: [
    defineSchemaPatcherConfig(),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Sites',
      timeoutOptions: true,
    }),
  ],
});

createClient({
  input: 'https://api-docs.sitecore.com/_spec/sai/pages-api/index.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-pages',
  },
  plugins: [
    defineSchemaPatcherConfig(),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Pages',
      timeoutOptions: true,
    }),
  ],
});

createClient({
  input: './schema/experimental/authoring.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-authoring',
  },
  plugins: [
    defineSchemaPatcherConfig(),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Authoring',
      timeoutOptions: true,
    }),
  ],
});

createClient({
  input: './schema/experimental/content-transfer.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-content-transfer',
  },
  plugins: [
    defineSchemaPatcherConfig(),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_ContentTransfer',
      timeoutOptions: true,
    }),
  ],
});

createClient({
  input: './schema/experimental/content.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-content',
  },
  plugins: [
    defineSchemaPatcherConfig(),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Content',
      timeoutOptions: true,
    }),
  ],
});

createClient({
  input: 'https://ai-agent-api-use.sitecorecloud.io/api/docs/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-agent',
  },
  plugins: [
    defineSchemaPatcherConfig(),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Agent',
      timeoutOptions: true,
    }),
  ],
});

createClient({
  input: './schema/search.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-search',
  },
  plugins: [
    defineSchemaPatcherConfig(),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Search',
      timeoutOptions: true,
    }),
  ],
});
