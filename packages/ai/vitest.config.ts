import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@sitecore-marketplace-sdk/client': path.resolve(__dirname, '../client/src/index.ts'),
      '@hey-api/client-fetch': path.resolve(__dirname, 'node_modules/@hey-api/client-fetch'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'src/__tests__/*.test.ts',
      'src/**/*.spec.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/client-*/*.ts'],
    },
    watch: false,
  },
});
