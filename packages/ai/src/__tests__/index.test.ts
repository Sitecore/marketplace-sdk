import { describe, it, expect, vi } from 'vitest';
import * as documents from '../client-documents/sdk.gen';
import * as skills from '../client-skills/sdk.gen';
import { AI } from '../index';

vi.mock('../client-documents/sdk.gen', () => ({
  getVersion: vi.fn(),
}));

vi.mock('../client-skills/sdk.gen', () => ({
  generateBrandReview: vi.fn(),
}));

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
    const result = { data: 'skills-result' };
    vi.mocked(skills.generateBrandReview).mockReturnValue(result as never);

    expect(AI.invokeOperation('skills.generateBrandReview')).toBe(result);
  });

  it('should map documents operations correctly', () => {
    const result = { data: 'documents-result' };
    vi.mocked(documents.getVersion).mockReturnValue(result as never);

    expect(AI.invokeOperation('documents.getVersion')).toBe(result);
  });
});
