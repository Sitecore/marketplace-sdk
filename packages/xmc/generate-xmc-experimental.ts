import { createClient } from '@hey-api/openapi-ts';
import { defineAugmentationConfig } from './plugins/augmentation';
import { defineClientTransformerConfig } from './plugins/client-transformer/config';
import { defineSchemaPatcherConfig } from './plugins/schema-patcher';

createClient({
  input: 'https://api-docs.sitecore.com/_spec/xmc/sites-api/index.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-xmapp',
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
    /*     defineClientTransformerConfig({
      namespace: 'Xmapp',
    }), */
  ],
});

createClient({
  input: './schema/experimental/authoring.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/experimental/client-authoring',
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
  ],
});

// createClient({
//   input: './schema/content-transfer.yaml',
//   output: {
//     format: 'prettier',
//     lint: 'eslint',
//     path: './src/client-content-transfer',
//   },
//   plugins: [
//     defineSchemaPatcherConfig(),
//     '@hey-api/client-fetch',
//     '@hey-api/schemas',
//     '@hey-api/sdk',
//     {
//       enums: 'javascript',
//       name: '@hey-api/typescript',
//     },
//     defineAugmentationConfig({
//       namespaces: ['xmc.contentTransfer'],
//     }),
//     defineClientTransformerConfig({
//       namespace: 'ContentTransfer',
//     }),
//   ],
// });

// createClient({
//   input: './schema/content.yaml',
//   output: {
//     format: 'prettier',
//     lint: 'eslint',
//     path: './src/client-content',
//   },
//   plugins: [
//     defineSchemaPatcherConfig(),
//     '@hey-api/client-fetch',
//     '@hey-api/schemas',
//     '@hey-api/sdk',
//     {
//       enums: 'javascript',
//       name: '@hey-api/typescript',
//     },
//     defineAugmentationConfig({
//       namespaces: ['xmc.preview', 'xmc.live'],
//     }),
//     defineClientTransformerConfig({
//       namespace: 'Content',
//     }),
//   ],
// });
