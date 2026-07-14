import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from '../shared/plugins/augmentation';
import { defineClientTransformerConfig } from '../shared/plugins/client-transformer/config';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';

createClient({
  input: 'https://ai-skills-api-euw.sitecorecloud.io/openapi.json',
  output: { format: 'prettier', lint: 'eslint', path: './src/client-authoring' },
  plugins: [
    defineSchemaPatcherConfig({ basePath: '/skills' }),
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    '@hey-api/sdk',
    { enums: 'javascript', name: '@hey-api/typescript' },
    defineAugmentationConfig({ namespaces: ['aiTest2.authoring'] }),
    defineClientTransformerConfig({ namespace: 'Authoring' }),
  ],
});