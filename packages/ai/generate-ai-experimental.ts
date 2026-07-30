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

  await createClient({
    input: 'https://ai-brands-api-euw.sitecorecloud.io/openapi.json',
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
      {
        methodNameBuilder: (operation) => {
          const baseName = (operation.operationId ?? operation.id ?? operation.name ?? '')
            .replace(/[-_](\w)/g, (_, character: string) => character.toUpperCase())
            .replace(/^(\w)/, (_, character: string) => character.toLowerCase());
          const versionSuffix = operation.path.includes('/v2/')
            ? 'V2'
            : operation.path.includes('/v1/')
              ? 'V1'
              : '';

          return `${baseName}${versionSuffix}`;
        },
        operationId: false,
        name: '@hey-api/sdk',
      },
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
