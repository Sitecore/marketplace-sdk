import { describe, it, expect } from 'vitest';
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
