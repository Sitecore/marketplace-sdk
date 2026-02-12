import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['**/*.ts'],
      exclude: ['__tests__/**/*.ts', 'vitest.config.ts'],
    },
    watch: false,
  },
});
