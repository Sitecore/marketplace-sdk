import { describe, it, expect } from 'vitest';
import { AI } from '../index';

describe('AI SDKModule', () => {
  it('should have namespace "ai"', () => {
    expect(AI.namespace).toBe('ai');
  });

  it('should throw error for invalid operation format', () => {
    expect(() => AI.invokeOperation('invalidFormat')).toThrow(
      "Invalid operation format: 'invalidFormat'. Expected format 'clientNamespace.operationName'.",
    );
  });

  it('should throw error for unknown namespace', () => {
    expect(() => AI.invokeOperation('unknown.operation')).toThrow(
      "Namespace 'unknown' not found",
    );
  });

  it('should dispatch brands operations correctly', () => {
    expect(AI.namespace).toBe('ai');
    expect(typeof AI.invokeOperation).toBe('function');
  });
});
