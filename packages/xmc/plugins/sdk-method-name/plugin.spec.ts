import { describe, it, expect, vi } from 'vitest';
import { handler } from './plugin';

// Helper to create a mock operation
const makeOperation = (overrides: Record<string, unknown> = {}) => ({
  id: 'defaultOperationId',
  tags: ['xmapp'],
  ...overrides,
});

// Helper to create a mock context with IR schema
const makeContext = (paths: Record<string, Record<string, unknown>>) => ({
  ir: { paths },
});

// Helper to create a mock plugin config
const makePlugin = () => ({
  name: '@sitecore-marketplace/sdk-method-name' as const,
});

describe('sdk-method-name plugin', () => {
  describe('happy path', () => {
    it('should apply x-sdk-method-name override when valid', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': 'myMethod',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operation.id).toBe('myMethod');
    });

    it('should handle underscores in method name', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': 'my_method_name',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operation.id).toBe('my_method_name');
    });

    it('should allow method names starting with underscore', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': '_privateMethod',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operation.id).toBe('_privateMethod');
    });

    it('should not modify operations without x-sdk-method-name', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operation.id).toBe('originalOperationId');
    });

    it('should trim whitespace from method name', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': '  trimmedName  ',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operation.id).toBe('trimmedName');
    });

    it('should handle multiple operations with different tags', () => {
      const operation1 = makeOperation({
        id: 'op1',
        tags: ['sites'],
        'x-sdk-method-name': 'methodName',
      });
      const operation2 = makeOperation({
        id: 'op2',
        tags: ['pages'],
        'x-sdk-method-name': 'methodName', // Same name, different tag - allowed
      });
      const context = makeContext({
        '/api/sites': { get: operation1 },
        '/api/pages': { get: operation2 },
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operation1.id).toBe('methodName');
      expect(operation2.id).toBe('methodName');
    });

    it('should handle operations without tags using default bucket', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        tags: undefined,
        'x-sdk-method-name': 'myMethod',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operation.id).toBe('myMethod');
    });

    it('should process all HTTP methods', () => {
      const operations = {
        get: makeOperation({ id: 'getOp', 'x-sdk-method-name': 'getMethod' }),
        post: makeOperation({ id: 'postOp', 'x-sdk-method-name': 'postMethod' }),
        put: makeOperation({ id: 'putOp', 'x-sdk-method-name': 'putMethod' }),
        patch: makeOperation({ id: 'patchOp', 'x-sdk-method-name': 'patchMethod' }),
        delete: makeOperation({ id: 'deleteOp', 'x-sdk-method-name': 'deleteMethod' }),
      };
      const context = makeContext({
        '/api/test': operations,
      });

      handler({ context, plugin: makePlugin() } as any);

      expect(operations.get.id).toBe('getMethod');
      expect(operations.post.id).toBe('postMethod');
      expect(operations.put.id).toBe('putMethod');
      expect(operations.patch.id).toBe('patchMethod');
      expect(operations.delete.id).toBe('deleteMethod');
    });
  });

  describe('validation errors', () => {
    it('should throw on invalid identifier starting with digit', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': '123bad',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(
        /Invalid x-sdk-method-name "123bad"/,
      );
    });

    it('should throw on identifier with invalid characters', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': 'method-name',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(
        /Invalid x-sdk-method-name "method-name"/,
      );
    });

    it('should throw on identifier with spaces', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': 'method name',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(
        /Invalid x-sdk-method-name "method name"/,
      );
    });

    it('should throw on empty string', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': '',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(
        /must be a non-empty string/,
      );
    });

    it('should throw on whitespace-only string', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': '   ',
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(
        /must be a non-empty string/,
      );
    });

    it('should throw on non-string value', () => {
      const operation = makeOperation({
        id: 'originalOperationId',
        'x-sdk-method-name': 123,
      });
      const context = makeContext({
        '/api/test': { get: operation },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(
        /must be a non-empty string/,
      );
    });
  });

  describe('duplicate detection', () => {
    it('should throw on duplicate x-sdk-method-name within same tag', () => {
      const operation1 = makeOperation({
        id: 'op1',
        tags: ['xmapp'],
        'x-sdk-method-name': 'duplicateName',
      });
      const operation2 = makeOperation({
        id: 'op2',
        tags: ['xmapp'],
        'x-sdk-method-name': 'duplicateName',
      });
      const context = makeContext({
        '/api/test1': { get: operation1 },
        '/api/test2': { get: operation2 },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(/Duplicate/);
    });

    it('should include operationIds in duplicate error message', () => {
      const operation1 = makeOperation({
        id: 'firstOperation',
        tags: ['xmapp'],
        'x-sdk-method-name': 'sharedName',
      });
      const operation2 = makeOperation({
        id: 'secondOperation',
        tags: ['xmapp'],
        'x-sdk-method-name': 'sharedName',
      });
      const context = makeContext({
        '/api/test1': { get: operation1 },
        '/api/test2': { get: operation2 },
      });

      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(/firstOperation/);
      expect(() => handler({ context, plugin: makePlugin() } as any)).toThrow(/secondOperation/);
    });

    it('should allow same method name in different tags', () => {
      const operation1 = makeOperation({
        id: 'op1',
        tags: ['sites'],
        'x-sdk-method-name': 'create',
      });
      const operation2 = makeOperation({
        id: 'op2',
        tags: ['pages'],
        'x-sdk-method-name': 'create',
      });
      const context = makeContext({
        '/api/sites': { post: operation1 },
        '/api/pages': { post: operation2 },
      });

      // Should not throw
      handler({ context, plugin: makePlugin() } as any);

      expect(operation1.id).toBe('create');
      expect(operation2.id).toBe('create');
    });
  });

  describe('edge cases', () => {
    it('should handle empty paths object', () => {
      const context = makeContext({});

      // Should not throw
      handler({ context, plugin: makePlugin() } as any);
    });

    it('should handle missing IR', () => {
      const context = { ir: null };

      // Should not throw
      handler({ context, plugin: makePlugin() } as any);
    });

    it('should handle missing paths in IR', () => {
      const context = { ir: {} };

      // Should not throw
      handler({ context, plugin: makePlugin() } as any);
    });

    it('should skip null operations', () => {
      const context = makeContext({
        '/api/test': { get: null },
      });

      // Should not throw
      handler({ context, plugin: makePlugin() } as any);
    });

    it('should skip non-HTTP method keys', () => {
      const operation = makeOperation({
        id: 'originalId',
        'x-sdk-method-name': 'newName',
      });
      const context = makeContext({
        '/api/test': {
          get: operation,
          parameters: [], // Common OpenAPI path-level key
          summary: 'Test endpoint',
        },
      });

      // Should not throw and should process the get operation
      handler({ context, plugin: makePlugin() } as any);
      expect(operation.id).toBe('newName');
    });
  });
});
