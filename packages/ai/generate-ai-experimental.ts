import { createClient } from '@hey-api/openapi-ts';
import { generatorOutput } from '../shared/generator-output';
import { defineHttpClientConfig } from '../shared/plugins/http-client';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';

async function generate() {
  await createClient({
    input: './schema/skills.json',
    output: generatorOutput('./src/experimental/client-skills'),
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
      defineNamespaceTransformerConfig({
        namespace: 'experimental_Skills',
        timeoutOptions: true,
      }),
    ],
  });
}

generate();
