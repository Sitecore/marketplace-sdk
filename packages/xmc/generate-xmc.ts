import { generate, type GenerateConfig } from '../shared/codegen';

const clients: GenerateConfig[] = [
  {
    input: './schema/xmapp.yaml',
    output: './src/client-xmapp',
    namespace: 'Xmapp',
    basePath: '/authoring',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.xmapp'],
      deprecated: `The 'xmc.xmapp' namespace is deprecated. Use 'xmc.sites' or 'xmc.pages' instead. Will be removed in later version.`,
    },
  },
  {
    input: './schema/authoring.yaml',
    output: './src/client-authoring',
    namespace: 'Authoring',
    basePath: '/v1/authoring',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.authoring'],
    },
  },
  {
    input: './schema/content-transfer.yaml',
    output: './src/client-content-transfer',
    namespace: 'ContentTransfer',
    basePath: '/authoring/transfer',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.contentTransfer'],
    },
  },
  {
    input: './schema/content.yaml',
    output: './src/client-content',
    namespace: 'Content',
    basePath: '/content/api',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.preview', 'xmc.live'],
    },
  },
  {
    // Snapshot of https://ai-agent-api-use.sitecorecloud.io/api/docs/openapi.json
    input: './schema/agent.json',
    output: './src/client-agent',
    namespace: 'Agent',
    basePath: '/stream/ai-agent-api/',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.agent'],
    },
  },
  {
    // Snapshot of https://api-docs.sitecore.com/_spec/sai/sites-api/index.yaml
    input: './schema/sites.json',
    output: './src/client-sites',
    namespace: 'Sites',
    basePath: '/authoring',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.sites'],
    },
  },
  {
    // Snapshot of https://api-docs.sitecore.com/_spec/sai/pages-api/index.yaml
    input: './schema/pages.json',
    output: './src/client-pages',
    namespace: 'Pages',
    basePath: '/authoring',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.pages'],
    },
  },
  {
    input: './schema/search.json',
    output: './src/client-search',
    namespace: 'Search',
    basePath: '/search',
    hostFetch: true,
    augmentation: {
      namespaces: ['xmc.search'],
    },
  },
];

for (const client of clients) {
  await generate(client);
}
