import { generate, type GenerateConfig } from '../shared/codegen';

const clients: GenerateConfig[] = [
  {
    input: './schema/sites.json',
    output: './src/experimental/client-sites',
    namespace: 'experimental_Sites',
  },
  {
    input: './schema/pages.json',
    output: './src/experimental/client-pages',
    namespace: 'experimental_Pages',
  },
  {
    input: './schema/experimental/authoring.yaml',
    output: './src/experimental/client-authoring',
    namespace: 'experimental_Authoring',
  },
  {
    input: './schema/experimental/content-transfer.yaml',
    output: './src/experimental/client-content-transfer',
    namespace: 'experimental_ContentTransfer',
  },
  {
    input: './schema/experimental/content.yaml',
    output: './src/experimental/client-content',
    namespace: 'experimental_Content',
  },
  {
    input: './schema/agent.json',
    output: './src/experimental/client-agent',
    namespace: 'experimental_Agent',
  },
  {
    input: './schema/search.json',
    output: './src/experimental/client-search',
    namespace: 'experimental_Search',
  },
];

for (const client of clients) {
  await generate(client);
}
