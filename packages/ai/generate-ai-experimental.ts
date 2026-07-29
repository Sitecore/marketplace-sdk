import { createClient } from '@hey-api/openapi-ts';
import { defineBrandsOperationNamePatcherConfig } from './brands-operation-name-patcher';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';

async function generate() {
  await createClient({
    input: 'https://ai-brands-api-euw.sitecorecloud.io/openapi.json',
    output: {
      format: 'prettier',
      lint: 'eslint',
      path: './src/experimental/client-brands',
    },
    plugins: [
      defineBrandsOperationNamePatcherConfig(),
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
