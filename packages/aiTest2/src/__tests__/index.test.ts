import { describe, it, expect, vi } from 'vitest';
import { AITest2 } from '../index';

vi.mock('../client-authoring/sdk.gen', () => ({
  someOperation: vi.fn().mockReturnValue('result'),
}));

describe('AITest2 SDKModule', () => {
  it('should have namespace "aiTest2"', () => {
    expect(AITest2.namespace).toBe('aiTest2');
  });

  it('should throw error for invalid operation format', () => {
    expect(() => AITest2.invokeOperation('invalidFormat')).toThrow(
      "Invalid operation format: 'invalidFormat'. Expected format 'clientNamespace.operationName'.",
    );
  });

  it('should throw error for unknown namespace', () => {
    expect(() => AITest2.invokeOperation('unknown.operation')).toThrow(
      "Namespace 'unknown' not found",
    );
  });

  it('should dispatch authoring operations correctly', () => {
    const result = AITest2.invokeOperation('authoring.someOperation');

    expect(result).toBe('result');
  });
});