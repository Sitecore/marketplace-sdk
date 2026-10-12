import type { OpenApiDocument } from '../spec';

const json = (schema: unknown) => ({ 'application/json': { schema } });

const ITEM = { $ref: '#/components/schemas/Item' };
const PROBLEM = { $ref: '#/components/schemas/Problem' };

/**
 * OpenAPI document covering the features the generator supports: SDK directives, path-level
 * parameters, array query parameters with and without explode, JSON and multipart bodies,
 * security, deprecation, enums and `additionalProperties`.
 */
export function testSpec(): OpenApiDocument {
  return {
    openapi: '3.0.3',
    info: { title: 'Test API', version: '1.0.0' },
    servers: [{ url: 'https://api.example.com/v1' }],
    paths: {
      '/items': {
        get: {
          operationId: 'listItems',
          summary: 'Lists items.',
          description: 'Returns the items that match the filters.',
          parameters: [
            { name: 'tags', in: 'query', schema: { type: 'array', items: { type: 'string' } } },
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
          ],
          responses: {
            200: { description: 'OK', content: json({ type: 'array', items: ITEM }) },
            400: { description: 'Bad request', content: json(PROBLEM) },
          },
        },
        post: {
          operationId: 'createItem',
          summary: 'Creates an item.',
          security: [{ bearer: [] }],
          requestBody: {
            required: true,
            content: json({ $ref: '#/components/schemas/NewItem' }),
          },
          responses: {
            201: { description: 'Created', content: json(ITEM) },
          },
        },
      },
      '/items/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: {
          operationId: 'getItem',
          summary: 'Gets an item.',
          deprecated: true,
          responses: {
            200: { description: 'OK', content: json(ITEM) },
            404: { description: 'Not found', content: json(PROBLEM) },
          },
        },
        delete: {
          operationId: 'deleteItem',
          'x-sc-sdk': { generate: false },
          responses: { 204: { description: 'Deleted' } },
        },
        put: {
          operationId: 'replace_item',
          'x-sc-sdk': { operationName: 'replaceItem' },
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    file: { type: 'string', format: 'binary' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'OK', content: json(ITEM) },
          },
        },
      },
      '/internal': {
        'x-sc-sdk': { generate: false },
        get: {
          operationId: 'getInternal',
          responses: { 200: { description: 'OK' } },
        },
      },
      '/search': {
        get: {
          operationId: 'search',
          parameters: [
            {
              name: 'ids',
              in: 'query',
              required: true,
              explode: false,
              schema: { type: 'array', items: { type: 'integer' } },
            },
          ],
          responses: {
            200: { description: 'OK', content: json({ type: 'array', items: ITEM }) },
          },
        },
      },
    },
    components: {
      schemas: {
        Item: {
          type: 'object',
          title: 'Catalog item',
          description: 'An item of the catalog.',
          required: ['id', 'name', 'status'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string', title: 'Name' },
            status: { $ref: '#/components/schemas/Status' },
            metadata: { type: 'object', additionalProperties: {} },
          },
        },
        NewItem: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
          },
        },
        Problem: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            status: { type: 'integer' },
          },
        },
        Status: { type: 'string', enum: ['active', 'archived'] },
      },
      securitySchemes: {
        bearer: { type: 'http', scheme: 'bearer' },
      },
    },
  };
}
