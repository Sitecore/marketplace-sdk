import { describe, it, expect, vi } from 'vitest';
import { createSDKModule } from '../sdk-module-factory';

describe('createSDKModule', () => {
  it('should create a module with the correct namespace', () => {
    const module = createSDKModule('test', {});
    expect(module.namespace).toBe('test');
  });

  it('should throw error for invalid operation format', () => {
    const module = createSDKModule('test', {});
    expect(() => module.invokeOperation('invalidFormat')).toThrow(
      "Invalid operation format: 'invalidFormat'. Expected format 'clientNamespace.operationName'.",
    );
  });

  it('should throw error for unknown namespace', () => {
    const module = createSDKModule('test', {});
    expect(() => module.invokeOperation('unknown.operation')).toThrow(
      "Namespace 'unknown' not found",
    );
  });

  it('should throw error for non-existent operation in a valid namespace', () => {
    const namespaceMap = {
      myNamespace: { existingOp: vi.fn() },
    };
    const module = createSDKModule('test', namespaceMap);
    expect(() => module.invokeOperation('myNamespace.nonExistentOp')).toThrow(
      "Operation 'nonExistentOp' not found in namespace 'myNamespace'",
    );
  });

  it('should invoke the correct operation', () => {
    const mockOp = vi.fn().mockReturnValue('result');
    const namespaceMap = {
      myNamespace: { myOp: mockOp },
    };
    const module = createSDKModule('test', namespaceMap);

    const result = module.invokeOperation('myNamespace.myOp', 'arg1', 'arg2');

    expect(mockOp).toHaveBeenCalledWith('arg1', 'arg2');
    expect(result).toBe('result');
  });

  it('should handle multiple namespaces', () => {
    const mockOp1 = vi.fn().mockReturnValue('result1');
    const mockOp2 = vi.fn().mockReturnValue('result2');
    const namespaceMap = {
      ns1: { op1: mockOp1 },
      ns2: { op2: mockOp2 },
    };
    const module = createSDKModule('test', namespaceMap);

    expect(module.invokeOperation('ns1.op1')).toBe('result1');
    expect(module.invokeOperation('ns2.op2')).toBe('result2');
  });
});
