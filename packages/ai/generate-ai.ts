import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from '../../tools/plugins/augmentation';
import { defineClientTransformerConfig } from '../../tools/plugins/client-transformer/config';
import { defineSchemaPatcherConfig } from '../../tools/plugins/schema-patcher';

createClient({
  input: './schema/skills.json',
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
