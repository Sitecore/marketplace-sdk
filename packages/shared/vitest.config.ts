import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {},
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
      include: ['src/**/*.ts', 'plugins/**/*.ts'],
      exclude: ['src/__tests__/**', 'plugins/__tests__/**', 'plugins/vitest.config.ts'],
    },
    watch: false,
  },
});
