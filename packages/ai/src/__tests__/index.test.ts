import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../client-brands/sdk.gen', () => ({
  listBrandKits: vi.fn(),
}));

vi.mock('../client-skills/sdk.gen', () => ({
  generateBrandReview: vi.fn(),
}));

import { AI } from '../index';
import * as brandsSdk from '../client-brands/sdk.gen';
import * as skillsSdk from '../client-skills/sdk.gen';

describe('AI SDKModule', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it('should invoke a brands operation', () => {
    const result = AI.invokeOperation('brands.listBrandKits', 'org-1');

    expect(brandsSdk.listBrandKits).toHaveBeenCalledWith('org-1');
    expect(result).toBeUndefined();
  });

  it('should invoke a skills operation', () => {
    const result = AI.invokeOperation('skills.generateBrandReview', { text: 'hello' });

    expect(skillsSdk.generateBrandReview).toHaveBeenCalledWith({ text: 'hello' });
    expect(result).toBeUndefined();
  });
});
