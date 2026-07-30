import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from '../shared/plugins/augmentation';
import { defineClientTransformerConfig } from '../shared/plugins/client-transformer/config';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';

async function generate() {
  await createClient({
    input: 'https://ai-extractions-euw.sitecorecloud.io/openapi.json',
    output: {
      format: 'prettier',
      lint: 'eslint',
      path: './src/client-extractions',
    },
    plugins: [
      defineSchemaPatcherConfig({
        basePath: '/ai-extractions-api',
      }),
      '@hey-api/client-fetch',
      '@hey-api/schemas',
      '@hey-api/sdk',
      {
        enums: 'javascript',
        name: '@hey-api/typescript',
      },
      defineAugmentationConfig({
        namespaces: ['ai-v2.extractions'],
      }),
      defineClientTransformerConfig({
        namespace: 'Extractions',
      }),
    ],
  });
}

generate();
