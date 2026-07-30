import { describe, it, expect, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockGetPublicOpenapi: vi.fn().mockResolvedValue('brands-ok'),
  mockGenerateBrandReview: vi.fn().mockResolvedValue('skills-ok'),
}));

vi.mock('../client-brands/sdk.gen', () => ({
  getPublicOpenapi: mocks.mockGetPublicOpenapi,
}));

vi.mock('../client-skills/sdk.gen', () => ({
  generateBrandReview: mocks.mockGenerateBrandReview,
}));

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

  it('should dispatch brands operations correctly', async () => {
    await expect(AI.invokeOperation('brands.getPublicOpenapi', {})).resolves.toBe('brands-ok');
    expect(mocks.mockGetPublicOpenapi).toHaveBeenCalled();
  });

  it('should dispatch skills operations correctly', async () => {
    await expect(AI.invokeOperation('skills.generateBrandReview', {})).resolves.toBe(
      'skills-ok',
    );
    expect(mocks.mockGenerateBrandReview).toHaveBeenCalled();
  });
});
