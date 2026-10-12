// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { generate, type GenerateConfig } from '../generate';
import type { OpenApiDocument } from '../spec';
import { testSpec } from './fixtures';

// The generated SDK imports src/http with a relative path, so the output must be on the same drive
const GENERATED = fileURLToPath(new URL('./.generated', import.meta.url));

const ITEM = { id: '1', name: 'Item', status: 'active' };

let root: string;
let specs: string;
let count = 0;

/**
 * Writes the spec to a file and generates a client from it, by default into a new directory.
 */
async function generateSpec(
  spec: OpenApiDocument,
  config: Partial<GenerateConfig> = {},
): Promise<string> {
  count += 1;
  const input = path.join(specs, `spec-${count}.json`);
  const output = config.output ?? path.join(root, `client-${count}`);
  fs.writeFileSync(input, JSON.stringify(spec));

  await generate({ input, namespace: 'TestApi', ...config, output });

  return output;
}

/**
 * Returns the names and contents of the files in a directory.
 */
function readDirectory(directory: string): Record<string, string> {
  return Object.fromEntries(
    fs
      .readdirSync(directory)
      .sort()
      .map((name) => [name, fs.readFileSync(path.join(directory, name), 'utf8')]),
  );
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

beforeAll(() => {
  // @hey-api/openapi-ts prints its banner and progress with console.log
  vi.spyOn(console, 'log').mockImplementation(() => {});

  fs.mkdirSync(GENERATED, { recursive: true });
  root = fs.mkdtempSync(path.join(GENERATED, 'run-'));
  specs = fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-codegen-test-'));

  // Imported by client.gen.ts when hostFetch is set
  fs.writeFileSync(
    path.join(root, 'client-sdk-fetch.ts'),
    'export const clientSdkfetch = (request: Request): Promise<Response> =>\n' +
      '  (globalThis as any).__codegenTestFetch(request);\n',
  );
  // Stands in for the client package, which declares the maps extended by the augmentation
  fs.writeFileSync(
    path.join(root, 'client-package.ts'),
    'export interface QueryMap {}\nexport interface MutationMap {}\n',
  );
});

afterAll(() => {
  vi.restoreAllMocks();
  fs.rmSync(root, { recursive: true, force: true });
  fs.rmSync(specs, { recursive: true, force: true });
  if (!fs.readdirSync(GENERATED).length) {
    fs.rmdirSync(GENERATED);
  }
});

describe('generate', () => {
  let output: string;

  beforeAll(async () => {
    output = await generateSpec(testSpec(), {
      output: path.join(root, 'client'),
      hostFetch: true,
      augmentation: { namespaces: ['test.items'] },
    });
  });

  it('should generate the files', async () => {
    const files = readDirectory(output);

    expect(Object.keys(files)).toEqual([
      'augmentation.gen.ts',
      'client.gen.ts',
      'index.ts',
      'sdk.gen.ts',
      'types.gen.ts',
    ]);
    for (const [name, code] of Object.entries(files)) {
      await expect(code).toMatchFileSnapshot(`./__snapshots__/generate/${name}.snap`);
    }
  });

  it('should generate the same files again', async () => {
    const files = readDirectory(output);

    await generateSpec(testSpec(), {
      output,
      hostFetch: true,
      augmentation: { namespaces: ['test.items'] },
    });

    expect(readDirectory(output)).toEqual(files);
  });

  it('should generate types that declare the operations in the client package', () => {
    const consumer = path.join(root, 'consumer.ts');
    fs.writeFileSync(
      consumer,
      `import type { MutationMap, QueryMap } from '@sitecore-marketplace-sdk/client';
import { createItem, getItem, listItems, replaceItem, search, TestApi } from './client';

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

export type Checks = [
  Expect<Equal<TestApi.Item, { id: string; name: string; status: TestApi.Status; metadata?: {} }>>,
  Expect<Equal<TestApi.Status, 'active' | 'archived'>>,
  Expect<Equal<TestApi.ListItemsResponse, Array<TestApi.Item>>>,
  Expect<Equal<TestApi.GetItemError, TestApi.Problem>>,
  Expect<Equal<TestApi.SearchData['query'], { ids: Array<number>; sitecoreContextId?: string }>>,
  Expect<Equal<TestApi.ReplaceItemData['body'], { name: string; file?: Blob | File }>>,
  Expect<Equal<Awaited<ReturnType<typeof getItem<true>>>['data'], TestApi.Item>>,
  Expect<Equal<keyof QueryMap, 'test.items.listItems' | 'test.items.getItem' | 'test.items.search'>>,
  Expect<Equal<keyof MutationMap, 'test.items.createItem' | 'test.items.replaceItem'>>,
  Expect<Equal<QueryMap['test.items.getItem']['params'], Parameters<typeof getItem>[0]>>,
  Expect<Equal<QueryMap['test.items.getItem']['response'], Awaited<ReturnType<typeof getItem>>>>,
  Expect<Equal<QueryMap['test.items.search']['subscribe'], false>>,
  Expect<Equal<MutationMap['test.items.createItem']['params'], Parameters<typeof createItem>[0]>>,
  Expect<Equal<MutationMap['test.items.replaceItem']['response'], Awaited<ReturnType<typeof replaceItem>>>>,
];

listItems();
replaceItem({ path: { id: '1' }, body: { name: 'Item', file: new Blob([]) } });
// @ts-expect-error The path parameters are required
getItem();
// @ts-expect-error The body is required
createItem({});
// @ts-expect-error The ids query parameter is required
search({ query: {} });
// @ts-expect-error The operation is excluded with x-sc-sdk.generate
export { deleteItem } from './client';
// @ts-expect-error The operation is excluded with x-sc-sdk.generate
export type Excluded = TestApi.DeleteItemData;
`,
    );

    const program = ts.createProgram({
      rootNames: [consumer, path.join(output, 'augmentation.gen.ts')],
      options: {
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
        types: [],
        paths: { '@sitecore-marketplace-sdk/client': [path.join(root, 'client-package.ts')] },
      },
    });

    const diagnostics = ts.getPreEmitDiagnostics(program).map((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      if (!diagnostic.file || diagnostic.start === undefined) {
        return message;
      }
      const { line } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      return `${path.basename(diagnostic.file.fileName)}:${line + 1}: ${message}`;
    });

    expect(diagnostics).toEqual([]);
  });

  describe('SDK', () => {
    const fetch = vi.fn<(request: Request) => Promise<Response>>();
    let sdk: Record<string, any>;

    beforeAll(async () => {
      (globalThis as any).__codegenTestFetch = fetch;
      sdk = await import(/* @vite-ignore */ path.join(output, 'index.ts'));
    });

    afterAll(() => {
      delete (globalThis as any).__codegenTestFetch;
    });

    beforeEach(() => {
      fetch.mockReset();
    });

    function request(): Request {
      expect(fetch).toHaveBeenCalledOnce();
      return fetch.mock.calls[0][0];
    }

    it('should export the SDK functions and the types namespace', () => {
      expect(Object.keys(sdk).sort()).toEqual([
        'TestApi',
        'createItem',
        'getItem',
        'listItems',
        'replaceItem',
        'search',
      ]);
      expect(sdk.TestApi.Status).toEqual({ ACTIVE: 'active', ARCHIVED: 'archived' });
    });

    it('should create the client with the server URL', async () => {
      const { client } = await import(/* @vite-ignore */ path.join(output, 'client.gen.ts'));

      expect(client.getConfig().baseUrl).toBe('https://api.example.com/v1');
    });

    it('should send the query parameters through the host application', async () => {
      fetch.mockResolvedValue(json([ITEM]));

      const result = await sdk.listItems({
        query: { tags: ['a', 'b'], limit: 5, sitecoreContextId: 'context' },
      });

      expect(request().method).toBe('GET');
      expect(request().url).toBe(
        'https://api.example.com/v1/items?tags=a&tags=b&limit=5&sitecoreContextId=context',
      );
      expect(result.data).toEqual([ITEM]);
      expect(result.error).toBeUndefined();
    });

    it('should send a JSON body with the bearer token', async () => {
      fetch.mockResolvedValue(json(ITEM, 201));

      const result = await sdk.createItem({ body: { name: 'Item' }, auth: 'token' });

      expect(request().method).toBe('POST');
      expect(request().url).toBe('https://api.example.com/v1/items');
      expect(request().headers.get('Authorization')).toBe('Bearer token');
      expect(request().headers.get('Content-Type')).toBe('application/json');
      expect(await request().json()).toEqual({ name: 'Item' });
      expect(result.data).toEqual(ITEM);
    });

    it('should encode the path parameters', async () => {
      fetch.mockResolvedValue(json(ITEM));

      await sdk.getItem({ path: { id: 'a/b c' } });

      expect(request().url).toBe('https://api.example.com/v1/items/a%2Fb%20c');
    });

    it('should return the error of a failed request', async () => {
      fetch.mockResolvedValue(json({ title: 'Not found', status: 404 }, 404));

      const result = await sdk.getItem({ path: { id: '1' } });

      expect(result.data).toBeUndefined();
      expect(result.error).toEqual({ title: 'Not found', status: 404 });
      expect(result.response.status).toBe(404);
    });

    it('should throw the error of a failed request with throwOnError', async () => {
      fetch.mockResolvedValue(json({ title: 'Not found', status: 404 }, 404));

      await expect(sdk.getItem({ path: { id: '1' }, throwOnError: true })).rejects.toEqual({
        title: 'Not found',
        status: 404,
      });
    });

    it('should send a multipart body', async () => {
      fetch.mockResolvedValue(json(ITEM));

      await sdk.replaceItem({
        path: { id: '1' },
        body: { name: 'Item', file: new Blob(['content'], { type: 'text/plain' }) },
      });

      expect(request().method).toBe('PUT');
      expect(request().url).toBe('https://api.example.com/v1/items/1');
      expect(request().headers.get('Content-Type')).toMatch(/^multipart\/form-data; boundary=/);
      const form = await request().formData();
      expect(form.get('name')).toBe('Item');
      expect(await (form.get('file') as File).text()).toBe('content');
    });

    it('should join array query parameters without explode', async () => {
      fetch.mockResolvedValue(json([]));

      await sdk.search({ query: { ids: [1, 2] } });

      expect(request().url).toBe('https://api.example.com/v1/search?ids=1,2');
    });
  });
});

describe('generate validation', () => {
  const OK = { 200: { description: 'OK' } };

  function document(paths: Record<string, unknown>, extra: Record<string, unknown> = {}) {
    return {
      openapi: '3.0.3',
      info: { title: 'Test', version: '1.0.0' },
      servers: [{ url: 'https://api.example.com' }],
      paths,
      ...extra,
    };
  }

  function withParameters(...parameters: unknown[]) {
    return document({ '/a': { get: { operationId: 'getA', parameters, responses: OK } } });
  }

  const array = { type: 'array', items: { type: 'string' } };

  it.each([
    [
      'a cookie parameter',
      withParameters({ name: 'session', in: 'cookie', schema: { type: 'string' } }),
      "Cookie parameter 'session' is not supported: GET /a",
    ],
    [
      'a path parameter with the label style',
      document({
        '/a/{id}': {
          get: {
            operationId: 'getA',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                style: 'label',
                schema: { type: 'string' },
              },
            ],
            responses: OK,
          },
        },
      }),
      "Path parameter 'id' must use the simple style without explode: GET /a/{id}",
    ],
    [
      'an exploded path parameter',
      document({
        '/a/{ids}': {
          get: {
            operationId: 'getA',
            parameters: [{ name: 'ids', in: 'path', required: true, explode: true, schema: array }],
            responses: OK,
          },
        },
      }),
      "Path parameter 'ids' must use the simple style without explode: GET /a/{ids}",
    ],
    [
      'a query parameter with allowReserved',
      withParameters({ name: 'q', in: 'query', allowReserved: true, schema: { type: 'string' } }),
      "Query parameter 'q' with allowReserved is not supported: GET /a",
    ],
    [
      'an array query parameter with the pipeDelimited style',
      withParameters({ name: 'ids', in: 'query', style: 'pipeDelimited', schema: array }),
      "Array query parameter 'ids' must use the form style: GET /a",
    ],
    [
      'a referenced array query parameter with the spaceDelimited style',
      {
        ...withParameters({
          name: 'ids',
          in: 'query',
          style: 'spaceDelimited',
          schema: { $ref: '#/components/schemas/Ids' },
        }),
        components: { schemas: { Ids: array } },
      },
      "Array query parameter 'ids' must use the form style: GET /a",
    ],
    [
      'an object query parameter with the form style',
      withParameters({
        name: 'filter',
        in: 'query',
        schema: { type: 'object', properties: { name: { type: 'string' } } },
      }),
      "Object query parameter 'filter' must use the deepObject style: GET /a",
    ],
    [
      'a query parameter that can be an array or a string',
      withParameters({ name: 'q', in: 'query', schema: { anyOf: [array, { type: 'string' }] } }),
      'Query parameter schemas must not mix arrays, objects and primitives: GET /a',
    ],
    [
      'array query parameters with different explode values',
      withParameters(
        { name: 'a', in: 'query', schema: array },
        { name: 'b', in: 'query', explode: false, schema: array },
      ),
      'Array query parameters must all use the same explode value: GET /a',
    ],
    [
      'the digest authentication scheme',
      document(
        { '/a': { get: { operationId: 'getA', security: [{ digest: [] }], responses: OK } } },
        { components: { securitySchemes: { digest: { type: 'http', scheme: 'digest' } } } },
      ),
      'Unsupported security scheme {"type":"http","scheme":"digest"}: GET /a',
    ],
    [
      'an XML request body',
      document({
        '/a': {
          post: {
            operationId: 'createA',
            requestBody: { content: { 'application/xml': { schema: { type: 'object' } } } },
            responses: OK,
          },
        },
      }),
      "Unsupported request body media type 'application/xml': POST /a",
    ],
    [
      'an operation named with a reserved word',
      document({ '/a': { get: { operationId: 'delete', responses: OK } } }),
      "Invalid operation name 'delete'",
    ],
    [
      'an operation named like an import of the SDK',
      document({ '/a': { get: { operationId: 'formDataBodySerializer', responses: OK } } }),
      "Invalid operation name 'formDataBodySerializer'",
    ],
    [
      'operation names that collide',
      document({
        '/a': { get: { operationId: 'getA', responses: OK } },
        '/b': {
          get: { operationId: 'getB', 'x-sc-sdk': { operationName: 'get_a' }, responses: OK },
        },
      }),
      "Operation name 'get_a' collides with 'getA': GET /b",
    ],
    [
      'a ClientOptions schema',
      document(
        { '/a': { get: { operationId: 'getA', responses: OK } } },
        { components: { schemas: { ClientOptions: { type: 'object' } } } },
      ),
      'ClientOptions is not the client options type. Rename the conflicting schema.',
    ],
    [
      'a schema named like the namespace',
      document(
        { '/a': { get: { operationId: 'getA', responses: OK } } },
        { components: { schemas: { TestApi: { type: 'object' } } } },
      ),
      "Type 'TestApi' conflicts with the namespace",
    ],
  ])('should reject %s', async (_name, spec, message) => {
    await expect(generateSpec(spec)).rejects.toThrow(message);
  });

  it.each(['my-namespace', 'Client', 'default'])(
    "should reject the namespace '%s'",
    async (namespace) => {
      await expect(generateSpec(testSpec(), { namespace })).rejects.toThrow(
        `Invalid namespace name '${namespace}'`,
      );
    },
  );

  it('should accept a nullable array query parameter', async () => {
    const output = await generateSpec(
      withParameters({ name: 'ids', in: 'query', schema: { ...array, nullable: true } }),
    );

    expect(fs.readFileSync(path.join(output, 'types.gen.ts'), 'utf8')).toContain(
      'ids?: Array<string> | null;',
    );
  });
});

describe('generate output directory', () => {
  it('should replace the files of a previous run', async () => {
    const output = path.join(root, 'previous');
    fs.mkdirSync(output);
    fs.writeFileSync(path.join(output, 'old.gen.ts'), '');
    fs.writeFileSync(path.join(output, 'augmentation.gen.ts'), '');
    fs.writeFileSync(path.join(output, 'index.ts'), '');

    await generateSpec(testSpec(), { output });

    const files = readDirectory(output);
    expect(Object.keys(files)).toEqual(['client.gen.ts', 'index.ts', 'sdk.gen.ts', 'types.gen.ts']);
    expect(files['index.ts']).toContain("export * from './sdk.gen';");
  });

  it.each([
    ['a file', 'notes.md', false],
    ['a TypeScript file', 'helpers.ts', false],
    ['a directory', 'nested', true],
  ])(
    'should refuse a directory with %s that was not generated',
    async (_name, entry, directory) => {
      const output = fs.mkdtempSync(path.join(root, 'unexpected-'));
      fs.writeFileSync(path.join(output, 'sdk.gen.ts'), 'previous');
      if (directory) {
        fs.mkdirSync(path.join(output, entry));
      } else {
        fs.writeFileSync(path.join(output, entry), 'kept');
      }

      await expect(generateSpec(testSpec(), { output })).rejects.toThrow(
        `${output} contains files that were not generated: ${entry}`,
      );
      expect(fs.readdirSync(output).sort()).toEqual([entry, 'sdk.gen.ts'].sort());
      expect(fs.readFileSync(path.join(output, 'sdk.gen.ts'), 'utf8')).toBe('previous');
    },
  );

  it('should leave the output untouched when the generation fails', async () => {
    const output = await generateSpec(testSpec());
    const files = readDirectory(output);
    const spec = testSpec();
    spec.paths['/items'].get.parameters.push({
      name: 'session',
      in: 'cookie',
      schema: { type: 'string' },
    });

    await expect(generateSpec(spec, { output })).rejects.toThrow(
      "Cookie parameter 'session' is not supported: GET /items",
    );
    expect(readDirectory(output)).toEqual(files);
  });
});
