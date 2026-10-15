import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from '../shared/plugins/augmentation';
import { defineClientTransformerConfig } from '../shared/plugins/client-transformer/config';
import { defineHttpClientConfig } from '../shared/plugins/http-client';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';

async function generate() {
  await createClient({
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
      defineHttpClientConfig(),
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
}

generate();
