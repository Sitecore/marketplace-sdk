import { createClient } from '@hey-api/openapi-ts';
import { defineSchemaPatcherConfig } from '../../tools/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../../tools/plugins/namespace-transformer';

createClient({
  input: './schema/skills.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-skills',
  },
  plugins: [
    defineSchemaPatcherConfig(),
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
