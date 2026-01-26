import { createClient } from '@hey-api/openapi-ts';
import { defineSchemaPatcherConfig } from '@sitecore-marketplace-sdk/internal/tools/openapi-plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '@sitecore-marketplace-sdk/internal/tools/openapi-plugins/namespace-transformer';

createClient({
  input: 'https://ai-skills-api-euw.sitecorecloud.io/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-skills',
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
      namespace: 'experimental_Skills',
    }),
  ],
});
