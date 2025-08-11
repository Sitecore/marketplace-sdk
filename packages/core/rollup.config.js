import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js', // CommonJS output
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
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
    }),
  ],
  external: [],
};
