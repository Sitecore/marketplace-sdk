import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  createConfig: vi.fn((config) => config),
  generateBrandReview: vi.fn().mockResolvedValue('skills-result'),
  listBrandKits: vi.fn().mockResolvedValue('brands-result'),
  createBrandKit: vi.fn().mockResolvedValue('brands-mutation-result'),
  experimentalGenerateBrandReview: vi.fn(),
  experimentalListBrandKits: vi.fn(),
  experimentalCreateBrandKit: vi.fn(),
}));

vi.mock('@hey-api/client-fetch', () => ({
  createClient: mocks.createClient,
  createConfig: mocks.createConfig,
}));

vi.mock('../client-skills/sdk.gen', () => ({
  generateBrandReview: mocks.generateBrandReview,
}));

vi.mock('../client-brands/sdk.gen', () => ({
  listBrandKits: mocks.listBrandKits,
  createBrandKit: mocks.createBrandKit,
}));

vi.mock('../experimental/client-skills/sdk.gen', () => ({
  generateBrandReview: mocks.experimentalGenerateBrandReview,
}));

vi.mock('../experimental/client-brands/sdk.gen', () => ({
  listBrandKits: mocks.experimentalListBrandKits,
  createBrandKit: mocks.experimentalCreateBrandKit,
}));

import { AI } from '../index';

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

  it('should dispatch skills operations correctly', async () => {
    const result = await AI.invokeOperation('skills.generateBrandReview', {
      body: {
        brandkitId: 'brandkit-1',
        input: { text: 'Content to review' },
      },
    });

    expect(mocks.generateBrandReview).toHaveBeenCalledWith({
      body: {
        brandkitId: 'brandkit-1',
        input: { text: 'Content to review' },
      },
    });
    expect(result).toBe('skills-result');
  });

  it('should dispatch brands operations correctly', async () => {
    const result = await AI.invokeOperation('brands.listBrandKits', {
      params: {
        organizationId: 'organization-1',
      },
    });

    expect(mocks.listBrandKits).toHaveBeenCalledWith({
      params: {
        organizationId: 'organization-1',
      },
    });
    expect(result).toBe('brands-result');
  });
});
