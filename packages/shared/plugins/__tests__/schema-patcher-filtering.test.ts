import { describe, it, expect } from 'vitest';
import { handler as schemaPatcherHandler } from '../schema-patcher/plugin';
import { preprocessInput } from '../schema-patcher/preprocess-input';

// ─── Plugin handler tests (IR-level filtering) ───────────────────────────────

describe('schema patcher plugin - operation filtering', () => {
  function makeSchema(paths: Record<string, any>) {
    return {
      servers: [{ url: 'https://api.example.com' }],
      paths,
    };
  }

  function runHandler(schema: any, pluginOverrides: Record<string, any> = {}) {
    const context: any = { ir: schema };
    schemaPatcherHandler({
      context,
      plugin: {
        name: '@sitecore-marketplace/schema-patcher',
        ...pluginOverrides,
      },
    } as any);
    return schema;
  }

  // ── includeOperationIds ──

  it('includeOperationIds keeps only listed operations', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
        post: { id: 'createUser', parameters: {} },
      },
      '/items': {
        get: { id: 'listItems', parameters: {} },
      },
    });

    runHandler(schema, { includeOperationIds: ['listUsers'] });

    expect(schema.paths['/users'].get).toBeDefined();
    expect(schema.paths['/users'].post).toBeUndefined();
    expect(schema.paths['/items']).toBeUndefined(); // entire path removed
  });

  it('includeOperationIds with empty array keeps all operations', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
      },
    });

    runHandler(schema, { includeOperationIds: [] });

    expect(schema.paths['/users'].get).toBeDefined();
  });

  // ── excludeOperationIds ──

  it('excludeOperationIds removes listed operations', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
        post: { id: 'createUser', parameters: {} },
      },
    });

    runHandler(schema, { excludeOperationIds: ['createUser'] });

    expect(schema.paths['/users'].get).toBeDefined();
    expect(schema.paths['/users'].post).toBeUndefined();
  });

  it('excludeOperationIds removes entire path when all methods are excluded', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
      },
    });

    runHandler(schema, { excludeOperationIds: ['listUsers'] });

    expect(schema.paths['/users']).toBeUndefined();
  });

  // ── includeTags ──

  it('includeTags keeps only operations with matching tags', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', tags: ['public'], parameters: {} },
        post: { id: 'createUser', tags: ['admin'], parameters: {} },
      },
    });

    runHandler(schema, { includeTags: ['public'] });

    expect(schema.paths['/users'].get).toBeDefined();
    expect(schema.paths['/users'].post).toBeUndefined();
  });

  it('includeTags removes operations with no tags', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} }, // no tags
      },
    });

    runHandler(schema, { includeTags: ['public'] });

    expect(schema.paths['/users']).toBeUndefined();
  });

  // ── excludeTags ──

  it('excludeTags removes operations with matching tags', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', tags: ['public'], parameters: {} },
        post: { id: 'createUser', tags: ['admin'], parameters: {} },
      },
    });

    runHandler(schema, { excludeTags: ['admin'] });

    expect(schema.paths['/users'].get).toBeDefined();
    expect(schema.paths['/users'].post).toBeUndefined();
  });

  it('excludeTags keeps operations with no tags', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} }, // no tags
      },
    });

    runHandler(schema, { excludeTags: ['admin'] });

    expect(schema.paths['/users'].get).toBeDefined();
  });

  // ── mutual exclusivity ──

  it('throws when both includeOperationIds and excludeOperationIds are provided', () => {
    const schema = makeSchema({
      '/users': { get: { id: 'listUsers', parameters: {} } },
    });

    expect(() =>
      runHandler(schema, {
        includeOperationIds: ['listUsers'],
        excludeOperationIds: ['createUser'],
      }),
    ).toThrow('mutually exclusive');
  });

  it('throws when both includeTags and excludeTags are provided', () => {
    const schema = makeSchema({
      '/users': { get: { id: 'listUsers', tags: ['public'], parameters: {} } },
    });

    expect(() =>
      runHandler(schema, {
        includeTags: ['public'],
        excludeTags: ['admin'],
      }),
    ).toThrow('mutually exclusive');
  });

  // ── still injects sitecoreContextId on surviving operations ──

  it('injects sitecoreContextId on operations that pass filters', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
        post: { id: 'createUser', parameters: {} },
      },
    });

    runHandler(schema, { includeOperationIds: ['listUsers'] });

    const getOp = schema.paths['/users'].get;
    expect(getOp.parameters.query.sitecoreContextId).toBeDefined();
    expect(getOp.parameters.query.sitecoreContextId.name).toBe('sitecoreContextId');
  });

  // ── no filters → all operations kept (backward compat) ──

  it('keeps all operations when no filters are provided', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
        post: { id: 'createUser', parameters: {} },
      },
      '/items': {
        get: { id: 'listItems', parameters: {} },
      },
    });

    runHandler(schema);

    expect(schema.paths['/users'].get).toBeDefined();
    expect(schema.paths['/users'].post).toBeDefined();
    expect(schema.paths['/items'].get).toBeDefined();
  });
});

// ─── preprocessInput tests (raw spec x-sc-sdk processing) ────────────────────

describe('preprocessInput', () => {
  function makeSpec(paths: Record<string, any>) {
    return {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0' },
      paths,
    };
  }

  it('removes operations where x-sc-sdk.generate is false (operation level)', async () => {
    const spec = makeSpec({
      '/api/version': {
        get: {
          operationId: 'getVersion',
          'x-sc-sdk': { generate: false },
        },
      },
      '/api/data': {
        get: {
          operationId: 'getData',
          'x-sc-sdk': { generate: true },
        },
      },
    });

    const result = await preprocessInput(spec);

    expect(result.paths['/api/version']).toBeUndefined();
    expect(result.paths['/api/data']).toBeDefined();
    expect(result.paths['/api/data'].get.operationId).toBe('getData');
  });

  it('inherits path-level generate:false to all operations', async () => {
    const spec = makeSpec({
      '/applications': {
        'x-sc-sdk': { generate: false },
        get: { operationId: 'listApps' },
        post: { operationId: 'createApp' },
      },
    });

    const result = await preprocessInput(spec);

    expect(result.paths['/applications']).toBeUndefined();
  });

  it('operation-level generate:true overrides path-level generate:false', async () => {
    const spec = makeSpec({
      '/applications': {
        'x-sc-sdk': { generate: false },
        get: {
          operationId: 'listApps',
          'x-sc-sdk': { generate: true, operationName: 'listApplications' },
        },
        post: {
          operationId: 'createApp',
          summary: 'Create Application',
        },
      },
    });

    const result = await preprocessInput(spec);

    expect(result.paths['/applications']).toBeDefined();
    expect(result.paths['/applications'].get).toBeDefined();
    expect(result.paths['/applications'].get.operationId).toBe('listApplications');
    expect(result.paths['/applications'].post).toBeUndefined();
  });

  it('overrides operationId with x-sc-sdk.operationName', async () => {
    const spec = makeSpec({
      '/api/languages': {
        get: {
          operationId: 'ListLanguages',
          'x-sc-sdk': { operationName: 'ListActiveLanguages' },
        },
      },
    });

    const result = await preprocessInput(spec);

    expect(result.paths['/api/languages'].get.operationId).toBe('ListActiveLanguages');
  });

  it('strips x-sc-sdk from output', async () => {
    const spec = makeSpec({
      '/api/data': {
        'x-sc-sdk': { generate: true },
        get: {
          operationId: 'getData',
          'x-sc-sdk': { generate: true, operationName: 'fetchData' },
        },
      },
    });

    const result = await preprocessInput(spec);

    expect(result.paths['/api/data']['x-sc-sdk']).toBeUndefined();
    expect(result.paths['/api/data'].get['x-sc-sdk']).toBeUndefined();
  });

  it('keeps all operations when no x-sc-sdk is present (backward compat)', async () => {
    const spec = makeSpec({
      '/users': {
        get: { operationId: 'listUsers' },
        post: { operationId: 'createUser' },
      },
    });

    const result = await preprocessInput(spec);

    expect(result.paths['/users'].get.operationId).toBe('listUsers');
    expect(result.paths['/users'].post.operationId).toBe('createUser');
  });

  it('does not mutate the original input object', async () => {
    const spec = makeSpec({
      '/api/data': {
        get: {
          operationId: 'getData',
          'x-sc-sdk': { generate: false },
        },
      },
    });

    await preprocessInput(spec);

    // Original should still have the operation
    expect(spec.paths['/api/data'].get).toBeDefined();
    expect(spec.paths['/api/data'].get['x-sc-sdk']).toBeDefined();
  });

  // ── preprocessInput with filter options ──

  it('filters by includeTags', async () => {
    const spec = makeSpec({
      '/api/data': {
        get: { operationId: 'getData', tags: ['public'] },
        post: { operationId: 'createData', tags: ['admin'] },
      },
    });

    const result = await preprocessInput(spec, { includeTags: ['public'] });

    expect(result.paths['/api/data'].get).toBeDefined();
    expect(result.paths['/api/data'].post).toBeUndefined();
  });

  it('filters by excludeTags', async () => {
    const spec = makeSpec({
      '/api/data': {
        get: { operationId: 'getData', tags: ['public'] },
        post: { operationId: 'createData', tags: ['admin'] },
      },
    });

    const result = await preprocessInput(spec, { excludeTags: ['admin'] });

    expect(result.paths['/api/data'].get).toBeDefined();
    expect(result.paths['/api/data'].post).toBeUndefined();
  });

  it('filters by includeOperationIds (after operationName override)', async () => {
    const spec = makeSpec({
      '/api/data': {
        get: {
          operationId: 'old_name',
          'x-sc-sdk': { operationName: 'getData' },
        },
        post: { operationId: 'createData' },
      },
    });

    const result = await preprocessInput(spec, { includeOperationIds: ['getData'] });

    expect(result.paths['/api/data'].get).toBeDefined();
    expect(result.paths['/api/data'].get.operationId).toBe('getData');
    expect(result.paths['/api/data'].post).toBeUndefined();
  });

  it('filters by excludeOperationIds', async () => {
    const spec = makeSpec({
      '/api/data': {
        get: { operationId: 'getData' },
        post: { operationId: 'createData' },
      },
    });

    const result = await preprocessInput(spec, { excludeOperationIds: ['createData'] });

    expect(result.paths['/api/data'].get).toBeDefined();
    expect(result.paths['/api/data'].post).toBeUndefined();
  });

  it('throws when both includeOperationIds and excludeOperationIds are given', async () => {
    const spec = makeSpec({
      '/api/data': { get: { operationId: 'getData' } },
    });

    await expect(
      preprocessInput(spec, {
        includeOperationIds: ['getData'],
        excludeOperationIds: ['createData'],
      }),
    ).rejects.toThrow('mutually exclusive');
  });

  it('throws when both includeTags and excludeTags are given', async () => {
    const spec = makeSpec({
      '/api/data': { get: { operationId: 'getData', tags: ['public'] } },
    });

    await expect(
      preprocessInput(spec, {
        includeTags: ['public'],
        excludeTags: ['admin'],
      }),
    ).rejects.toThrow('mutually exclusive');
  });

  it('removes empty paths after filtering', async () => {
    const spec = makeSpec({
      '/api/data': {
        get: {
          operationId: 'getData',
          'x-sc-sdk': { generate: false },
        },
      },
      '/api/other': {
        get: {
          operationId: 'getOther',
          'x-sc-sdk': { generate: true },
        },
      },
    });

    const result = await preprocessInput(spec);

    expect(result.paths['/api/data']).toBeUndefined();
    expect(result.paths['/api/other']).toBeDefined();
  });
});
