import { generate } from '../shared/codegen';

await generate({
  input: './schema/skills.json',
  output: './src/experimental/client-skills',
  namespace: 'experimental_Skills',
  basePath: '/stream/ai-skills-api/',
});
