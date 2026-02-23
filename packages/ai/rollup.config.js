import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
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
  ],
  external: ['@sitecore-marketplace-sdk/core', '@sitecore-marketplace-sdk/client', '@hey-api/client-fetch'],
};
