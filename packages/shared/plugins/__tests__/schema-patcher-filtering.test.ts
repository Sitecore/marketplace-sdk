import { describe, it, expect } from 'vitest';
import { handler as schemaPatcherHandler } from '../schema-patcher/plugin';

// ─── Plugin handler tests (IR-level) ─────────────────────────────────────────

describe('schema patcher plugin - sitecoreContextId injection', () => {
  function makeSchema(paths: Record<string, any>) {
    return {
      servers: [{ url: 'https://api.example.com' }],
      paths,
    };
  }

  function runHandler(schema: any, spec?: any, pluginOverrides: Record<string, any> = {}) {
    const context: any = { ir: schema, spec };
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

  it('keeps all operations when no spec or x-sc-sdk present', () => {
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

// ─── Plugin handler tests (x-sc-sdk via context.spec) ────────────────────────

describe('schema patcher plugin - x-sc-sdk directives', () => {
  function makeIR(paths: Record<string, any>) {
    return {
      servers: [{ url: 'https://api.example.com' }],
      paths,
    };
  }

  function makeSpec(paths: Record<string, any>) {
    return {
      openapi: '3.0.0',
      info: { title: 'Test', version: '1.0.0' },
      paths,
    };
  }

  function runHandler(ir: any, spec: any, pluginOverrides: Record<string, any> = {}) {
    const context: any = { ir, spec };
    schemaPatcherHandler({
      context,
      plugin: {
        name: '@sitecore-marketplace/schema-patcher',
        ...pluginOverrides,
      },
    } as any);
    return ir;
  }

  // ── x-sc-sdk.generate ──

  it('removes operations where x-sc-sdk.generate is false (operation level)', () => {
    const ir = makeIR({
      '/api/version': {
        get: { id: 'getVersion', parameters: {} },
      },
      '/api/data': {
        get: { id: 'getData', parameters: {} },
      },
    });
    const spec = makeSpec({
      '/api/version': {
        get: { operationId: 'getVersion', 'x-sc-sdk': { generate: false } },
      },
      '/api/data': {
        get: { operationId: 'getData', 'x-sc-sdk': { generate: true } },
      },
    });

    runHandler(ir, spec);

    expect(ir.paths['/api/version']).toBeUndefined();
    expect(ir.paths['/api/data']).toBeDefined();
    expect(ir.paths['/api/data'].get.id).toBe('getData');
  });

  it('inherits path-level generate:false to all operations', () => {
    const ir = makeIR({
      '/applications': {
        get: { id: 'listApps', parameters: {} },
        post: { id: 'createApp', parameters: {} },
      },
    });
    const spec = makeSpec({
      '/applications': {
        'x-sc-sdk': { generate: false },
        get: { operationId: 'listApps' },
        post: { operationId: 'createApp' },
      },
    });

    runHandler(ir, spec);

    expect(ir.paths['/applications']).toBeUndefined();
  });

  it('operation-level generate:true overrides path-level generate:false', () => {
    const ir = makeIR({
      '/applications': {
        get: { id: 'listApps', parameters: {} },
        post: { id: 'createApp', parameters: {} },
      },
    });
    const spec = makeSpec({
      '/applications': {
        'x-sc-sdk': { generate: false },
        get: { operationId: 'listApps', 'x-sc-sdk': { generate: true } },
        post: { operationId: 'createApp' },
      },
    });

    runHandler(ir, spec);

    expect(ir.paths['/applications']).toBeDefined();
    expect(ir.paths['/applications'].get).toBeDefined();
    expect(ir.paths['/applications'].post).toBeUndefined();
  });

  it('keeps all operations when x-sc-sdk is not present in spec', () => {
    const ir = makeIR({
      '/users': {
        get: { id: 'listUsers', parameters: {} },
        post: { id: 'createUser', parameters: {} },
      },
    });
    const spec = makeSpec({
      '/users': {
        get: { operationId: 'listUsers' },
        post: { operationId: 'createUser' },
      },
    });

    runHandler(ir, spec);

    expect(ir.paths['/users'].get).toBeDefined();
    expect(ir.paths['/users'].post).toBeDefined();
  });

  // ── x-sc-sdk.operationName ──

  it('overrides operation id with x-sc-sdk.operationName', () => {
    const ir = makeIR({
      '/api/languages': {
        get: { id: 'ListLanguages', parameters: {} },
      },
    });
    const spec = makeSpec({
      '/api/languages': {
        get: { operationId: 'ListLanguages', 'x-sc-sdk': { operationName: 'listActiveLanguages' } },
      },
    });

    runHandler(ir, spec);

    expect(ir.paths['/api/languages'].get.id).toBe('listActiveLanguages');
  });

  it('applies operationName and generate together', () => {
    const ir = makeIR({
      '/api/data': {
        get: { id: 'old_name', parameters: {} },
        post: { id: 'createData', parameters: {} },
      },
    });
    const spec = makeSpec({
      '/api/data': {
        get: { operationId: 'old_name', 'x-sc-sdk': { generate: true, operationName: 'fetchData' } },
        post: { operationId: 'createData', 'x-sc-sdk': { generate: false } },
      },
    });

    runHandler(ir, spec);

    expect(ir.paths['/api/data'].get).toBeDefined();
    expect(ir.paths['/api/data'].get.id).toBe('fetchData');
    expect(ir.paths['/api/data'].post).toBeUndefined();
  });

  // ── still injects sitecoreContextId on surviving operations ──

  it('injects sitecoreContextId on operations that survive x-sc-sdk filtering', () => {
    const ir = makeIR({
      '/api/data': {
        get: { id: 'getData', parameters: {} },
        post: { id: 'createData', parameters: {} },
      },
    });
    const spec = makeSpec({
      '/api/data': {
        get: { operationId: 'getData' },
        post: { operationId: 'createData', 'x-sc-sdk': { generate: false } },
      },
    });

    runHandler(ir, spec);

    expect(ir.paths['/api/data'].get.parameters.query.sitecoreContextId).toBeDefined();
    expect(ir.paths['/api/data'].post).toBeUndefined();
  });
});


