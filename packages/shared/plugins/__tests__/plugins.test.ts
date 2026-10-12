import { afterEach, describe, expect, it } from 'vitest';
import { createClient } from '@hey-api/openapi-ts';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ts from 'typescript';
import { defaultAugmentationConfig, defineAugmentationConfig } from '../augmentation';
import {
  defaultClientTransformerConfig,
  defineClientTransformerConfig,
} from '../client-transformer';
import {
  defaultNamespaceTransformerConfig,
  defineNamespaceTransformerConfig,
} from '../namespace-transformer';
import { defaultSchemaPatcherConfig, defineSchemaPatcherConfig } from '../schema-patcher';
import { namespaceSource } from '../namespace';

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

const schema = {
  openapi: '3.0.3',
  info: { title: 'Marketplace generator regression', version: '1.0.0' },
  servers: [{ url: 'https://original.example.com' }],
  components: {
    schemas: {
      Widget: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          status: { type: 'string', enum: ['active', 'inactive'] },
        },
      },
    },
  },
  paths: {
    '/reserved': {
      get: {
        operationId: 'client',
        responses: { '200': { description: 'Reserved name' } },
      },
    },
    '/widgets': {
      get: {
        operationId: 'list-widgets',
        summary: 'List widgets',
        responses: {
          '200': {
            description: 'Widgets',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Widget' } } },
          },
        },
      },
      post: {
        operationId: 'oldCreateName',
        'x-sc-sdk': { operationName: 'createWidget' },
        responses: { '204': { description: 'Created' } },
      },
    },
    '/excluded': {
      'x-sc-sdk': { generate: false },
      get: {
        operationId: 'excludedOperation',
        responses: { '200': { description: 'Excluded' } },
      },
      post: {
        operationId: 'includedOverride',
        'x-sc-sdk': { generate: true },
        responses: { '204': { description: 'Included' } },
      },
    },
  },
};

describe('Hey API 0.99 plugin registration', () => {
  it.each([
    defaultAugmentationConfig,
    defaultClientTransformerConfig,
    defaultNamespaceTransformerConfig,
    defaultSchemaPatcherConfig,
  ])('registers the current handler and dependencies for $name', (config) => {
    expect(config.handler).toBeTypeOf('function');
    expect(config.dependencies).toBeInstanceOf(Array);
    expect(config.config).toBeDefined();
    expect(config).not.toHaveProperty('_handler');
    expect(config).not.toHaveProperty('_dependencies');
    expect(config).not.toHaveProperty('_handlerLegacy');
  });

  it('keeps user options inside the normalized config', () => {
    const plugin = defineAugmentationConfig({ namespaces: ['ai.skills'], deprecated: true });
    expect(plugin.name).toBe('@sitecore-marketplace/augmentation');
    expect(plugin.config).toMatchObject({
      namespaces: ['ai.skills'],
      deprecated: true,
      output: 'augmentation',
      includeInEntry: false,
    });
  });
});

describe('actual Hey API generation', () => {
  it.each([
    { namespace: 'Skills', operationNamespace: 'ai.skills', experimental: false },
    { namespace: 'XmcTypes', operationNamespace: 'xmc.widgets', experimental: false },
    { namespace: 'experimental_Skills', operationNamespace: 'ai.skills', experimental: true },
    { namespace: 'experimental_XmcTypes', operationNamespace: 'xmc.widgets', experimental: true },
    { namespace: '', operationNamespace: 'plain.widgets', experimental: false },
  ])(
    'generates and typechecks $namespace (experimental: $experimental)',
    async ({ namespace, operationNamespace, experimental }) => {
      const root = mkdtempSync(join(tmpdir(), 'marketplace-generator-'));
      temporaryDirectories.push(root);
      const output = join(root, 'generated');
      writeFileSync(
        join(root, 'client-sdk-fetch.ts'),
        'export const clientSdkfetch: typeof fetch = fetch;',
      );
      writeFileSync(
        join(root, 'client.d.ts'),
        "declare module '@sitecore-marketplace-sdk/client' { interface QueryMap {} interface MutationMap {} }",
      );

      await createClient({
        input: structuredClone(schema),
        output: { path: output, postProcess: [] },
        plugins: [
          defineSchemaPatcherConfig({ baseUrl: 'https://override.example.com/authoring' }),
          '@hey-api/client-fetch',
          '@hey-api/schemas',
          '@hey-api/sdk',
          { name: '@hey-api/typescript', enums: 'javascript' },
          ...(!experimental
            ? [
                defineAugmentationConfig({
                  namespaces: [operationNamespace],
                  deprecated: true,
                  deprecationMessage: 'Use the replacement namespace.',
                }),
              ]
            : []),
          experimental
            ? defineNamespaceTransformerConfig({ namespace })
            : defineClientTransformerConfig({ namespace }),
        ],
      });

      const sdk = readFileSync(join(output, 'sdk.gen.ts'), 'utf8');
      const types = readFileSync(join(output, 'types.gen.ts'), 'utf8');
      const client = readFileSync(join(output, 'client.gen.ts'), 'utf8');
      const index = readFileSync(join(output, 'index.ts'), 'utf8');
      expect(sdk).toContain('export const listWidgets');
      expect(sdk).toContain('export const createWidget');
      expect(sdk).toContain('export const includedOverride');
      expect(sdk).not.toContain('excludedOperation');
      expect(sdk).not.toContain('oldCreateName');
      expect(types).toContain('sitecoreContextId?: string');
      expect(client).toContain('https://override.example.com/authoring');
      expect(client.includes('fetch: clientSdkfetch')).toBe(!experimental);
      if (namespace) {
        expect(types).toContain(`export namespace ${namespace}`);
        expect(sdk).toContain(`import type { ${namespace} }`);
        expect(index).toContain(`export { ${namespace} }`);
      } else {
        expect(types).not.toContain('export namespace');
      }
      if (!experimental) {
        const augmentation = readFileSync(join(output, 'augmentation.gen.ts'), 'utf8');
        expect(augmentation).toContain(`"${operationNamespace}.listWidgets"`);
        expect(augmentation).toContain(`"${operationNamespace}.createWidget"`);
        expect(augmentation).toContain('typeof sdk.createWidget');
        expect(augmentation).toContain('Use the replacement namespace.');
        expect(augmentation).not.toContain('excludedOperation');
        expect(index).not.toContain('augmentation');
      }

      const generatedFiles = readdirSync(output)
        .filter((file) => file.endsWith('.ts'))
        .map((file) => join(output, file));
      const program = ts.createProgram([...generatedFiles, join(root, 'client.d.ts')], {
        noEmit: true,
        strict: true,
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        skipLibCheck: true,
      });
      const diagnostics = ts.getPreEmitDiagnostics(program);
      expect(
        diagnostics.map((diagnostic) =>
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
        ),
      ).toEqual([]);
    },
    30000,
  );
});

describe('namespace renderer', () => {
  it('preserves renamed imports and file-level imports', () => {
    const sdk = namespaceSource(
      "import type { ClientOptions as Options } from './types.gen'; export type Config = Options;",
      'Skills',
      false,
    );
    expect(sdk).toContain('type Options = Skills.ClientOptions');
    const types = namespaceSource(
      "import type { External } from 'external'; export type Widget = External;",
      'Skills',
      true,
    );
    expect(types.indexOf('import type')).toBeLessThan(types.indexOf('export namespace'));
    expect(types).toContain('export type Widget = External');
  });
});
