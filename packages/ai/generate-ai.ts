import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from '../shared/plugins/augmentation';
import { defineClientTransformerConfig } from '../shared/plugins/client-transformer/config';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';

createClient({
  input: 'https://ai-skills-api-euw-staging.sitecore-staging.cloud/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client-skills',
  },
  plugins: [
    defineSchemaPatcherConfig({
      basePath: '/stream/ai-skills-api/',
    }),
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
