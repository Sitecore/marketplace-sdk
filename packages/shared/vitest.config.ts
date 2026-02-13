import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@hey-api/client-fetch': path.resolve(__dirname, '../xmc/node_modules/@hey-api/client-fetch'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'src/__tests__/*.test.ts',
      'src/**/*.spec.ts',
      'plugins/__tests__/**/*.test.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/__tests__/**'],
    },
    watch: false,
  },
});
