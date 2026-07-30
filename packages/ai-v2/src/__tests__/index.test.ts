import { describe, it, expect, vi } from 'vitest';
import { AIV2 } from '../index';
import * as extractions from '../client-extractions/sdk.gen';

describe('AIV2 SDKModule', () => {
  it('should have namespace "ai-v2"', () => {
    expect(AIV2.namespace).toBe('ai-v2');
  });

  it('should throw error for invalid operation format', () => {
    expect(() => AIV2.invokeOperation('invalidFormat')).toThrow(
      "Invalid operation format: 'invalidFormat'. Expected format 'clientNamespace.operationName'.",
    );
  });

  it('should throw error for unknown namespace', () => {
    expect(() => AIV2.invokeOperation('unknown.operation')).toThrow(
      "Namespace 'unknown' not found",
    );
  });

  it('should expose the extractions namespace', () => {
    const result = { data: { version: 'test' } };
    vi.spyOn(extractions, 'getVersionApiVersionGet').mockReturnValue(result as any);

    expect(AIV2.invokeOperation('extractions.getVersionApiVersionGet')).toBe(result);
  });
});
