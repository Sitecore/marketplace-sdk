import { createClient } from '@hey-api/openapi-ts';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';

async function generate() {
  await createClient({
    input: 'https://ai-skills-api-euw.sitecorecloud.io/openapi.json',
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
      {
        name: '@hey-api/sdk',
        operationId: false,
      },
      {
        enums: 'javascript',
        name: '@hey-api/typescript',
      },
      defineNamespaceTransformerConfig({
        namespace: 'experimental_Skills',
      }),
    ],
  });

  await createClient({
    input: './schema/brands.openapi.json',
    output: {
      format: 'prettier',
      lint: 'eslint',
      path: './src/experimental/client-brands',
    },
    plugins: [
      defineSchemaPatcherConfig({
        basePath: '/ai-brands-api',
      }),
      '@hey-api/client-fetch',
      '@hey-api/schemas',
      '@hey-api/sdk',
      {
        enums: 'javascript',
        name: '@hey-api/typescript',
      },
      defineNamespaceTransformerConfig({
        namespace: 'experimental_Brands',
      }),
    ],
  });
}

generate();
