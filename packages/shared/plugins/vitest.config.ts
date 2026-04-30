import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['plugins/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['plugins/**/*.ts'],
      exclude: ['plugins/__tests__/**/*.ts', 'plugins/vitest.config.ts'],
    },
    watch: false,
  },
});
