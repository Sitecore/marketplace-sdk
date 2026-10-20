import { createClient } from '@hey-api/openapi-ts';
import { generatorOutput } from '../shared/generator-output';
import { defineHttpClientConfig } from '../shared/plugins/http-client';
import { defineSchemaPatcherConfig } from '../shared/plugins/schema-patcher';
import { defineNamespaceTransformerConfig } from '../shared/plugins/namespace-transformer';

createClient({
  input: './schema/sites.json',
  output: generatorOutput('./src/experimental/client-sites'),
  plugins: [
    defineSchemaPatcherConfig(),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Sites',
    }),
  ],
});

createClient({
  input: './schema/pages.json',
  output: generatorOutput('./src/experimental/client-pages'),
  plugins: [
    defineSchemaPatcherConfig(),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Pages',
    }),
  ],
});

createClient({
  input: './schema/experimental/authoring.yaml',
  output: generatorOutput('./src/experimental/client-authoring'),
  plugins: [
    defineSchemaPatcherConfig(),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Authoring',
    }),
  ],
});

createClient({
  input: './schema/experimental/content-transfer.yaml',
  output: generatorOutput('./src/experimental/client-content-transfer'),
  plugins: [
    defineSchemaPatcherConfig(),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_ContentTransfer',
    }),
  ],
});

createClient({
  input: './schema/experimental/content.yaml',
  output: generatorOutput('./src/experimental/client-content'),
  plugins: [
    defineSchemaPatcherConfig(),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Content',
    }),
  ],
});

createClient({
  input: './schema/agent.json',
  output: generatorOutput('./src/experimental/client-agent'),
  plugins: [
    defineSchemaPatcherConfig(),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Agent',
    }),
  ],
});

createClient({
  input: './schema/search.json',
  output: generatorOutput('./src/experimental/client-search'),
  plugins: [
    defineSchemaPatcherConfig(),
    defineHttpClientConfig(),
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    defineNamespaceTransformerConfig({
      namespace: 'experimental_Search',
    }),
  ],
});
