import { createRequire } from 'node:module';
import { dirname, relative, resolve, sep } from 'node:path';

import { httpClientPluginName } from './plugins/http-client';

const httpClientModule = httpClientPluginName.split(sep).join('/');
const httpClientDir = dirname(httpClientPluginName);

/**
 * The HTTP client lives outside the output folder, so the generator would
 * import it by absolute path. Import it by relative path instead.
 */
export function resolveHttpClientModule(
  modulePath: string,
  ctx: { file: { finalPath: string } },
): string | undefined {
  if (modulePath !== httpClientModule) return undefined;
  return relative(dirname(ctx.file.finalPath), httpClientDir).split(sep).join('/');
}

export function generatorOutput(path: string) {
  const require = createRequire(resolve(process.cwd(), 'package.json'));
  return {
    path,
    module: { resolve: resolveHttpClientModule },
    postProcess: [
      {
        name: 'Prettier',
        command: process.execPath,
        args: [require.resolve('prettier/bin/prettier.cjs'), '--write', '{{path}}'],
      },
    ],
  };
}
