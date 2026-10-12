import { generate } from '../shared/codegen';

// Snapshot of https://ai-skills-api-euw.sitecorecloud.io/openapi.json
await generate({
  input: './schema/skills.json',
  output: './src/client-skills',
  namespace: 'Skills',
  basePath: '/stream/ai-skills-api/',
  hostFetch: true,
  augmentation: {
    namespaces: ['ai.skills'],
  },
});
