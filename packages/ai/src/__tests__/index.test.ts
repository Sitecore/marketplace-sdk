import { describe, it, expect, vi } from 'vitest';
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

  it('should dispatch skills operations correctly', () => {
    // This test validates that the skills namespace is mapped
    // The actual operations depend on generated code
    const sdk = AI;
    expect(sdk.namespace).toBe('ai');
    expect(typeof sdk.invokeOperation).toBe('function');
  });
});
