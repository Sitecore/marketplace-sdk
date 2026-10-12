import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS output
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js', // ES module output
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      module: 'ESNext',
      declaration: true,
      declarationDir: 'dist',
      rootDir: path.resolve(__dirname, '..'),
    }),
    terser(), // Minify the output
    {
      // The bundled HTTP client is derived from MIT-licensed code, whose notice must ship with it
      name: 'http-client-license',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'shared/src/http/LICENSE',
          source: fs.readFileSync(path.resolve(__dirname, '../shared/src/http/LICENSE'), 'utf8'),
        });
      },
    },
  ],
  external: ['@sitecore-marketplace-sdk/core'],
};
