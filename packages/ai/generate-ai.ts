import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from '@sitecore-marketplace-sdk/internal/tools/openapi-plugins/augmentation';
import { defineClientTransformerConfig } from '@sitecore-marketplace-sdk/internal/tools/openapi-plugins/client-transformer';
import { defineSchemaPatcherConfig } from '@sitecore-marketplace-sdk/internal/tools/openapi-plugins/schema-patcher';

createClient({
  input: 'https://ai-skills-api-euw.sitecorecloud.io/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-skills',
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
    defineAugmentationConfig({
      namespaces: ['ai.skills'],
    }),
    defineClientTransformerConfig({
      namespace: 'Skills',
    }),
  ],
});
