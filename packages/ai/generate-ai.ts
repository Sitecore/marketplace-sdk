import { createClient } from '@hey-api/openapi-ts';
import { generatorOutput } from '../shared/generator-output';
import { defineAugmentationConfig } from '../shared/plugins/augmentation';
import { defineHttpClientConfig } from '../shared/plugins/http-client';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';

async function generate() {
  await createClient({
    input: './schema/skills.json',
    output: generatorOutput('./src/client-skills'),
    plugins: [
      defineSchemaPatcherConfig({
        basePath: '/stream/ai-skills-api/',
      }),
      defineHttpClientConfig({ runtimeConfigPath: './src/client-sdk-fetch' }),
      '@hey-api/schemas',
      '@hey-api/sdk',
      {
        enums: 'javascript',
        name: '@hey-api/typescript',
      },
      defineAugmentationConfig({
        namespaces: ['ai.skills'],
      }),
      defineNamespaceTransformerConfig({
        namespace: 'Skills',
      }),
    ],
  });
}

generate();
