import { createRequire } from 'node:module';
import { resolve } from 'node:path';

export function generatorOutput(path: string) {
  const require = createRequire(resolve(process.cwd(), 'package.json'));
  return {
    path,
    postProcess: [
      {
        name: 'Prettier',
        command: process.execPath,
        args: [require.resolve('prettier/bin/prettier.cjs'), '--write', '{{path}}'],
      },
    ],
  };
}
