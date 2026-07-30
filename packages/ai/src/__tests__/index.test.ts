import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../client-brands/sdk.gen', () => ({
  getVersion: vi.fn().mockReturnValue('brands-result'),
}));

vi.mock('../client-skills/sdk.gen', () => ({
  generateBrandReview: vi.fn().mockReturnValue('skills-result'),
}));

import { AI } from '../index';
import * as brands from '../client-brands/sdk.gen';
import * as skills from '../client-skills/sdk.gen';

describe('AI SDKModule', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

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
    AI.invokeOperation('brands.getVersion', { client: {} });

    expect(brands.getVersion).toHaveBeenCalledWith({ client: {} });
  });

  it('should dispatch skills operations correctly', () => {
    AI.invokeOperation('skills.generateBrandReview', {
      client: {},
      body: {},
    });

    expect(skills.generateBrandReview).toHaveBeenCalledWith({ client: {}, body: {} });
  });
});
