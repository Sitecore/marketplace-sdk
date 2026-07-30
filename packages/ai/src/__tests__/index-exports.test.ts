import { describe, it, expect, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  createConfig: vi.fn((config) => config),
  generateBrandReview: vi.fn(),
  listBrandKits: vi.fn(),
  createBrandKit: vi.fn(),
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

import * as aiModule from '../index';

describe('AI module exports', () => {
  it('should export AI SDKModule', () => {
    expect(aiModule.AI).toBeDefined();
    expect(aiModule.AI.namespace).toBe('ai');
    expect(typeof aiModule.AI.invokeOperation).toBe('function');
  });

  it('should export experimental_AI class', () => {
    expect(aiModule.experimental_AI).toBeDefined();
  });

  it('should export experimental_createAIClient factory', () => {
    expect(aiModule.experimental_createAIClient).toBeDefined();
    expect(typeof aiModule.experimental_createAIClient).toBe('function');
  });

  it('should export QueryMap and MutationMap', () => {
    // These are type-only re-exports, so we just verify the module compiles
    expect(aiModule).toBeDefined();
  });
});
