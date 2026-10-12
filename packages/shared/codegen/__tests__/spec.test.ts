// @vitest-environment node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  DECLARED_ADDITIONAL_PROPERTIES,
  loadSpec,
  preprocessSpec,
  type OpenApiDocument,
} from '../spec';

const SERVER = 'https://api.example.com';

const CONTEXT_ID_PARAMETER = {
  name: 'sitecoreContextId',
  in: 'query',
  required: false,
  description: 'The Sitecore context ID.',
  schema: { type: 'string', description: 'The Sitecore context ID.' },
  style: 'form',
  explode: true,
  allowReserved: false,
};

const OK = { 200: { description: 'OK' } };

function document(paths: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  return {
    openapi: '3.0.3',
    info: { title: 'Test', version: '1.0.0' },
    servers: [{ url: SERVER }],
    paths,
    ...extra,
  } as OpenApiDocument;
}

function operation(operationId: string, extra: Record<string, unknown> = {}) {
  return { operationId, responses: OK, ...extra };
}

describe('preprocessSpec x-sc-sdk directives', () => {
  it('should remove operations with generate false', () => {
    const spec = preprocessSpec(
      document({
        '/api/version': { get: operation('getVersion', { 'x-sc-sdk': { generate: false } }) },
        '/api/data': { get: operation('getData', { 'x-sc-sdk': { generate: true } }) },
      }),
    );

    expect(spec.paths['/api/version']).toBeUndefined();
    expect(spec.paths['/api/data'].get.operationId).toBe('getData');
  });

  it('should apply a path-level generate false to every operation of the path', () => {
    const spec = preprocessSpec(
      document({
        '/applications': {
          'x-sc-sdk': { generate: false },
          get: operation('listApps'),
          post: operation('createApp'),
        },
        '/users': { get: operation('listUsers') },
      }),
    );

    expect(Object.keys(spec.paths)).toEqual(['/users']);
  });

  it('should let an operation-level value override the path-level value', () => {
    const spec = preprocessSpec(
      document({
        '/applications': {
          'x-sc-sdk': { generate: false },
          get: operation('listApps', { 'x-sc-sdk': { generate: true } }),
          post: operation('createApp'),
        },
      }),
    );

    expect(spec.paths['/applications'].get.operationId).toBe('listApps');
    expect(spec.paths['/applications'].post).toBeUndefined();
  });

  it('should rename operations with operationName', () => {
    const spec = preprocessSpec(
      document({
        '/api/languages': {
          get: operation('ListLanguages', {
            'x-sc-sdk': { operationName: 'listActiveLanguages' },
          }),
        },
      }),
    );

    expect(spec.paths['/api/languages'].get.operationId).toBe('listActiveLanguages');
  });

  it('should apply operationName and generate together', () => {
    const spec = preprocessSpec(
      document({
        '/api/data': {
          get: operation('old_name', {
            'x-sc-sdk': { generate: true, operationName: 'fetchData' },
          }),
          post: operation('createData', { 'x-sc-sdk': { generate: false } }),
        },
      }),
    );

    expect(spec.paths['/api/data'].get.operationId).toBe('fetchData');
    expect(spec.paths['/api/data'].post).toBeUndefined();
  });

  it('should keep every operation without directives', () => {
    const spec = preprocessSpec(
      document({
        '/users': { get: operation('listUsers'), post: operation('createUser') },
        '/items': { get: operation('listItems') },
      }),
    );

    expect(spec.paths['/users'].get.operationId).toBe('listUsers');
    expect(spec.paths['/users'].post.operationId).toBe('createUser');
    expect(spec.paths['/items'].get.operationId).toBe('listItems');
  });

  it('should only check the names of the operations that are generated', () => {
    const spec = preprocessSpec(
      document({
        '/a': {
          get: operation('getA', { 'x-sc-sdk': { generate: false } }),
          post: operation('getB', { 'x-sc-sdk': { operationName: 'createA' } }),
        },
        '/b': { get: operation('getB', { 'x-sc-sdk': { operationName: 'getA' } }) },
      }),
    );

    expect(spec.paths['/a'].post.operationId).toBe('createA');
    expect(spec.paths['/b'].get.operationId).toBe('getA');
  });

  it.each([
    [
      'a path-level operationName',
      { '/a': { 'x-sc-sdk': { operationName: 'x' }, get: operation('a') } },
      'x-sc-sdk.operationName is only supported on operations: /a',
    ],
    [
      'a path-level directive that is not an object',
      { '/a': { 'x-sc-sdk': false, get: operation('a') } },
      'x-sc-sdk must be an object: /a',
    ],
    [
      'an operation directive that is not an object',
      { '/a': { get: operation('a', { 'x-sc-sdk': [] }) } },
      'x-sc-sdk must be an object: GET /a',
    ],
    [
      'a generate value that is not a boolean',
      { '/a': { post: operation('a', { 'x-sc-sdk': { generate: 'false' } }) } },
      'x-sc-sdk.generate must be a boolean: POST /a',
    ],
    [
      'an empty operationName',
      { '/a': { get: operation('a', { 'x-sc-sdk': { operationName: ' ' } }) } },
      'x-sc-sdk.operationName must be a non-empty string: GET /a',
    ],
    [
      'an operationName that is not a string',
      { '/a': { get: operation('a', { 'x-sc-sdk': { operationName: 42 } }) } },
      'x-sc-sdk.operationName must be a non-empty string: GET /a',
    ],
    [
      'a path item $ref',
      { '/a': { $ref: '#/components/pathItems/A' } },
      'Path item $ref is not supported: /a',
    ],
    [
      'duplicate operation ids',
      { '/a': { get: operation('getA') }, '/b': { get: operation('getA') } },
      "Operation name 'getA' collides with 'getA': GET /b",
    ],
    [
      'an operationName that collides with an operation id',
      {
        '/a': { get: operation('getA') },
        '/b': { get: operation('getB', { 'x-sc-sdk': { operationName: 'getA' } }) },
      },
      "Operation name 'getA' collides with 'getA': GET /b",
    ],
    [
      'operation ids that differ only in case and separators',
      { '/items': { get: operation('get_items'), post: operation('GetItems') } },
      "Operation name 'GetItems' collides with 'get_items': POST /items",
    ],
    [
      'an operation id that collides with a name derived from the path',
      { '/a/{id}': { get: { responses: OK } }, '/b': { get: operation('getAById') } },
      "Operation name 'getAById' collides with 'get-/a/by-id': GET /b",
    ],
  ])('should reject %s', (_name, paths, message) => {
    expect(() => preprocessSpec(document(paths))).toThrow(message);
  });
});

describe('preprocessSpec sitecoreContextId', () => {
  it('should append the optional sitecoreContextId query parameter to every operation', () => {
    const limit = { name: 'limit', in: 'query', schema: { type: 'integer' } };

    const spec = preprocessSpec(
      document({
        '/items': {
          get: operation('listItems', { parameters: [limit] }),
          post: operation('createItem'),
        },
      }),
    );

    expect(spec.paths['/items'].get.parameters).toEqual([limit, CONTEXT_ID_PARAMETER]);
    expect(spec.paths['/items'].post.parameters).toEqual([CONTEXT_ID_PARAMETER]);
    expect(spec.paths['/items'].get.parameters[1]).not.toBe(
      spec.paths['/items'].post.parameters[0],
    );
  });

  it('should keep a sitecoreContextId parameter declared by the operation', () => {
    const parameters = [{ name: 'sitecoreContextId', in: 'query', required: true }];

    const spec = preprocessSpec(
      document({ '/items': { get: operation('listItems', { parameters }) } }),
    );

    expect(spec.paths['/items'].get.parameters).toEqual(parameters);
  });

  it('should keep a sitecoreContextId parameter declared by the path', () => {
    const spec = preprocessSpec(
      document({
        '/items': {
          parameters: [{ name: 'sitecoreContextId', in: 'query' }],
          get: operation('listItems'),
        },
      }),
    );

    expect(spec.paths['/items'].get.parameters).toBeUndefined();
  });

  it('should resolve parameter references', () => {
    const spec = preprocessSpec(
      document(
        {
          '/items': {
            parameters: [{ $ref: '#/components/parameters/Context' }],
            get: operation('listItems'),
          },
          '/users': {
            get: operation('listUsers', {
              parameters: [{ $ref: '#/components/parameters/a~1b%20c' }],
            }),
          },
        },
        {
          components: {
            parameters: {
              Context: { $ref: '#/components/parameters/ContextTarget' },
              ContextTarget: { name: 'sitecoreContextId', in: 'query' },
              'a/b c': { name: 'sitecoreContextId', in: 'query' },
            },
          },
        },
      ),
    );

    expect(spec.paths['/items'].get.parameters).toBeUndefined();
    expect(spec.paths['/users'].get.parameters).toEqual([
      { $ref: '#/components/parameters/a~1b%20c' },
    ]);
  });

  it('should add the query parameter when a header has the same name', () => {
    const header = { name: 'sitecoreContextId', in: 'header', schema: { type: 'string' } };

    const spec = preprocessSpec(
      document({ '/items': { get: operation('listItems', { parameters: [header] }) } }),
    );

    expect(spec.paths['/items'].get.parameters).toEqual([header, CONTEXT_ID_PARAMETER]);
  });

  it('should only add the parameter to the operations that are generated', () => {
    const spec = preprocessSpec(
      document({
        '/api/data': {
          get: operation('getData'),
          post: operation('createData', { 'x-sc-sdk': { generate: false } }),
        },
      }),
    );

    expect(spec.paths['/api/data'].get.parameters).toEqual([CONTEXT_ID_PARAMETER]);
    expect(spec.paths['/api/data'].post).toBeUndefined();
  });

  it.each([
    [
      'a query parameter that differs only in case',
      {
        '/a': { get: operation('a', { parameters: [{ name: 'SitecoreContextID', in: 'query' }] }) },
      },
      {},
      "Query parameter 'SitecoreContextID' clashes with 'sitecoreContextId': GET /a",
    ],
    [
      'operation parameters that are not an array',
      { '/a': { get: operation('a', { parameters: {} }) } },
      {},
      'parameters must be an array: GET /a',
    ],
    [
      'path parameters that are not an array',
      { '/a': { parameters: 'limit', get: operation('a') } },
      {},
      'parameters must be an array: /a',
    ],
    [
      'a circular reference',
      { '/a': { get: operation('a', { parameters: [{ $ref: '#/components/parameters/A' }] }) } },
      {
        components: {
          parameters: {
            A: { $ref: '#/components/parameters/B' },
            B: { $ref: '#/components/parameters/A' },
          },
        },
      },
      'Circular $ref: #/components/parameters/A -> #/components/parameters/B -> #/components/parameters/A',
    ],
    [
      'an unresolvable reference',
      {
        '/a': {
          get: operation('a', { parameters: [{ $ref: '#/components/parameters/Missing' }] }),
        },
      },
      {},
      "Unresolvable $ref '#/components/parameters/Missing'",
    ],
    [
      'a reference that is not a JSON pointer',
      { '/a': { get: operation('a', { parameters: [{ $ref: '#Context' }] }) } },
      {},
      "Invalid $ref '#Context'",
    ],
  ])('should reject %s', (_name, paths, extra, message) => {
    expect(() => preprocessSpec(document(paths, extra))).toThrow(message);
  });
});

describe('preprocessSpec servers', () => {
  it('should prefer baseUrl over basePath', () => {
    const spec = preprocessSpec(document({}), {
      baseUrl: 'https://override.example.com',
      basePath: '/authoring',
    });

    expect(spec.servers).toEqual([{ url: 'https://override.example.com' }]);
  });

  it('should append basePath to https://example.com', () => {
    const spec = preprocessSpec(document({}), { basePath: '/authoring' });

    expect(spec.servers).toEqual([{ url: 'https://example.com/authoring' }]);
  });

  it('should keep the other properties of the first server and the other servers', () => {
    const spec = preprocessSpec(
      document(
        {},
        {
          servers: [
            { url: 'https://{region}.example.com', description: 'Production' },
            { url: 'https://staging.example.com' },
          ],
        },
      ),
      { basePath: '/authoring' },
    );

    expect(spec.servers).toEqual([
      { url: 'https://example.com/authoring', description: 'Production' },
      { url: 'https://staging.example.com' },
    ]);
  });

  it('should add a server when the spec has none', () => {
    const spec = preprocessSpec(document({}, { servers: undefined }), {
      baseUrl: 'http://localhost:8080/api',
    });

    expect(spec.servers).toEqual([{ url: 'http://localhost:8080/api' }]);
  });

  it('should use the first server of the spec when no URL is configured', () => {
    const spec = preprocessSpec(document({}));

    expect(spec.servers).toEqual([{ url: SERVER }]);
  });

  it.each([
    ['no server', { servers: undefined }, {}],
    ['an empty server list', { servers: [] }, {}],
    ['a relative server URL', { servers: [{ url: '/api' }] }, {}],
    ['a server URL with variables', { servers: [{ url: 'https://{region}.example.com' }] }, {}],
    ['a server URL that is not http(s)', { servers: [{ url: 'ftp://example.com' }] }, {}],
    ['a basePath with whitespace', {}, { basePath: '/a b' }],
  ])('should reject %s', (_name, extra, options) => {
    expect(() => preprocessSpec(document({}, extra), options)).toThrow(
      'The first server URL must be an absolute http(s) URL without variables. Set baseUrl or basePath.',
    );
  });

  it('should reject servers that are not an array', () => {
    expect(() =>
      preprocessSpec(document({}, { servers: { url: SERVER } }), { basePath: '/a' }),
    ).toThrow('servers must be an array');
  });
});

describe('preprocessSpec references', () => {
  it.each(['other.json#/components/schemas/Item', 'https://example.com/schemas/item.json'])(
    "should reject the external reference '%s'",
    (ref) => {
      const spec = document({
        '/items': {
          get: operation('listItems', {
            responses: {
              200: {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: ref } } },
              },
            },
          }),
        },
      });

      expect(() => preprocessSpec(spec)).toThrow(
        `Unsupported external $ref '${ref}' at #/paths/~1items/get/responses/200/content/application~1json/schema`,
      );
    },
  );

  it('should accept local references', () => {
    const spec = document(
      {
        '/items': {
          get: operation('listItems', {
            responses: {
              200: {
                description: 'OK',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
              },
            },
          }),
        },
      },
      { components: { schemas: { Item: { type: 'object' } } } },
    );

    expect(() => preprocessSpec(spec)).not.toThrow();
  });
});

describe('preprocessSpec schema normalization', () => {
  // Every schema below has a title that must be removed
  const titled = (schema: Record<string, unknown> = {}) => ({ title: 'Removed', ...schema });
  const content = () => ({ 'application/json': { schema: titled() } });

  function titledDocument() {
    return document(
      {
        '/items/{id}': {
          parameters: [{ name: 'id', in: 'path', required: true, schema: titled() }],
          post: operation('createItem', {
            parameters: [
              { name: 'filter', in: 'query', content: content() },
              { name: 'limit', in: 'query', schema: titled({ example: { title: 'Kept' } }) },
            ],
            requestBody: { content: content() },
            responses: {
              200: {
                description: 'OK',
                headers: { 'x-total': { schema: titled() } },
                content: content(),
              },
            },
            callbacks: {
              onEvent: {
                '{$request.body#/callbackUrl}': {
                  post: operation('onEvent', { requestBody: { content: content() } }),
                },
              },
            },
          }),
        },
      },
      {
        openapi: '3.1.0',
        webhooks: {
          itemCreated: { post: operation('itemCreated', { requestBody: { content: content() } }) },
        },
        components: {
          schemas: {
            Item: titled({
              type: 'object',
              default: { title: 'Kept' },
              examples: [{ title: 'Kept' }],
              properties: {
                title: titled({ type: 'string' }),
                tags: titled({ type: 'array', items: titled() }),
                tuple: titled({
                  prefixItems: [titled()],
                  items: [titled()],
                  additionalItems: titled(),
                }),
                metadata: titled({ additionalProperties: titled() }),
              },
              allOf: [titled()],
              anyOf: [titled()],
              oneOf: [titled()],
              not: titled(),
              if: titled(),
              then: titled(),
              else: titled(),
              contains: titled(),
              contentSchema: titled(),
              propertyNames: titled(),
              unevaluatedItems: titled(),
              unevaluatedProperties: titled(),
              patternProperties: { '^x-': titled() },
              dependentSchemas: { a: titled() },
              $defs: { Nested: titled() },
              definitions: { Legacy: titled() },
            }),
          },
          parameters: { Limit: { name: 'limit', in: 'query', schema: titled() } },
          headers: { Total: { schema: titled() } },
          requestBodies: { Item: { content: content() } },
          responses: { NotFound: { description: 'Not found', content: content() } },
          pathItems: {
            Shared: {
              get: operation('shared', {
                responses: { 200: { description: 'OK', content: content() } },
              }),
            },
          },
          callbacks: {
            Event: {
              '{$url}': { post: operation('event', { requestBody: { content: content() } }) },
            },
          },
        },
      },
    );
  }

  it('should remove the title of every schema', () => {
    const spec = preprocessSpec(titledDocument());
    const text = JSON.stringify(spec);

    expect(text).not.toContain('Removed');
    expect(text.match(/"Kept"/g)).toHaveLength(3);
    expect(spec.info.title).toBe('Test');
    expect(spec.components.schemas.Item.properties.title).toEqual({ type: 'string' });
  });

  it('should not modify the source document', () => {
    const source = titledDocument();
    const copy = structuredClone(source);

    preprocessSpec(source);

    expect(source).toEqual(copy);
  });

  it('should mark additionalProperties schemas that are not references', () => {
    const spec = preprocessSpec(
      document(
        {},
        {
          components: {
            schemas: {
              Any: { type: 'object', additionalProperties: {} },
              Strings: { type: 'object', additionalProperties: { type: 'string' } },
              Items: { type: 'object', additionalProperties: { $ref: '#/components/schemas/Any' } },
              Open: { type: 'object', additionalProperties: true },
              Closed: { type: 'object', additionalProperties: false },
              Plain: { type: 'object', properties: { a: { type: 'string' } } },
            },
          },
        },
      ),
    );

    const { schemas } = spec.components;
    expect(schemas.Any.additionalProperties).toEqual({ [DECLARED_ADDITIONAL_PROPERTIES]: true });
    expect(schemas.Strings.additionalProperties).toEqual({
      type: 'string',
      [DECLARED_ADDITIONAL_PROPERTIES]: true,
    });
    expect(schemas.Items.additionalProperties).toEqual({ $ref: '#/components/schemas/Any' });
    expect(schemas.Open.additionalProperties).toBe(true);
    expect(schemas.Closed.additionalProperties).toBe(false);
    expect(schemas.Plain).toEqual({ type: 'object', properties: { a: { type: 'string' } } });
  });
});

describe('loadSpec', () => {
  let directory: string;

  beforeAll(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-codegen-spec-'));
  });

  afterAll(() => {
    fs.rmSync(directory, { recursive: true, force: true });
  });

  function write(name: string, text: string): string {
    const file = path.join(directory, name);
    fs.writeFileSync(file, text);
    return file;
  }

  it('should read JSON with a byte order mark', () => {
    const file = write('spec.json', `\uFEFF${JSON.stringify(document({}))}`);

    expect(loadSpec(file)).toEqual(document({}));
  });

  it.each(['spec.yaml', 'spec.YML'])('should read YAML from %s', (name) => {
    const file = write(
      name,
      ['openapi: 3.0.3', 'info:', '  title: Test', '  version: 1.0.0', 'paths: {}', ''].join('\n'),
    );

    expect(loadSpec(file)).toEqual({
      openapi: '3.0.3',
      info: { title: 'Test', version: '1.0.0' },
      paths: {},
    });
  });

  it.each([
    ['a Swagger 2 document', 'swagger.json', JSON.stringify({ swagger: '2.0', paths: {} })],
    ['a JSON array', 'array.json', '[]'],
    ['a numeric openapi version', 'number.yaml', 'openapi: 3.0\npaths: {}\n'],
  ])('should reject %s', (_name, fileName, text) => {
    const file = write(fileName, text);

    expect(() => loadSpec(file)).toThrow(`${file} is not an OpenAPI 3 document`);
  });
});
