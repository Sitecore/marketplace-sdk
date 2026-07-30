import { describe, it, expect, vi } from 'vitest';

vi.mock('../client-documents/sdk.gen', () => ({
  getVersion: vi.fn().mockReturnValue('documents-version'),
}));

vi.mock('../client-skills/sdk.gen', () => ({
  generateBrandReview: vi.fn().mockReturnValue('skills-brand-review'),
}));

import { AI } from '../index';
import * as documentsSdk from '../client-documents/sdk.gen';
import * as skillsSdk from '../client-skills/sdk.gen';

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

  it('should dispatch documents operations correctly', () => {
    expect(AI.invokeOperation('documents.getVersion')).toBe('documents-version');
    expect(documentsSdk.getVersion).toHaveBeenCalledTimes(1);
  });

  it('should dispatch skills operations correctly', () => {
    expect(AI.invokeOperation('skills.generateBrandReview')).toBe('skills-brand-review');
    expect(skillsSdk.generateBrandReview).toHaveBeenCalledTimes(1);
  });
});
