import { describe, it, expect } from 'vitest';
import { handler as schemaPatcherHandler } from '../schema-patcher/plugin';
import { preprocessInput } from '../schema-patcher/preprocess-input';

// ─── Plugin handler tests (IR-level) ─────────────────────────────────────────

describe('schema patcher plugin - sitecoreContextId injection', () => {
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

  it('injects sitecoreContextId on all operations', () => {
    const schema = makeSchema({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
        post: { id: 'createUser', parameters: {} },
      },
    });

    runHandler(schema);

    const getOp = schema.paths['/users'].get;
    expect(getOp.parameters.query.sitecoreContextId).toBeDefined();
    expect(getOp.parameters.query.sitecoreContextId.name).toBe('sitecoreContextId');

    const postOp = schema.paths['/users'].post;
    expect(postOp.parameters.query.sitecoreContextId).toBeDefined();
  });

  it('keeps all operations (no filtering)', () => {
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
