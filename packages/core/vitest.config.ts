import { defineConfig } from 'vitest/config';
import { GithubActionsReporter } from 'vitest/node';

export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
    environment: 'jsdom',
    include: ['src/__tests__/**/*.test.ts'],
    exclude: ['src/**/*.d.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      include: ['src/**/*.ts'],
    },
    setupFiles: ['src/__tests__/setup.ts'],
    watch: false
  }
});
