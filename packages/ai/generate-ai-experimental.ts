import { createClient } from '@hey-api/openapi-ts';
import { defineSchemaPatcherConfig, preprocessInput } from '../shared/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';

async function generate() {
  const skillsInput = await preprocessInput(
    'https://ai-skills-api-euw.sitecorecloud.io/openapi.json',
  );

  await createClient({
    input: skillsInput,
    output: {
      format: 'prettier',
      lint: 'eslint',
      path: './src/experimental/client-skills',
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
      defineNamespaceTransformerConfig({
        namespace: 'experimental_Skills',
      }),
    ],
  });
}

generate();
