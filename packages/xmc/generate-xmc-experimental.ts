import { createClient } from '@hey-api/openapi-ts';
import { defineSchemaPatcherConfig } from '@sitecore-marketplace-sdk/internal/tools/openapi-plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '@sitecore-marketplace-sdk/internal/tools/openapi-plugins/namespace-transformer';

createClient({
  input: 'https://api-docs.sitecore.com/_spec/xmc/sites-api/index.yaml',
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
    }),
  ],
});

createClient({
  input: 'https://api-docs.sitecore.com/_spec/xmc/pages-api/index.yaml',
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
    }),
  ],
});
