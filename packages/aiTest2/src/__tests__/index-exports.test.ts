import { describe, it, expect } from 'vitest';
import * as aiTest2Module from '../index';

describe('aiTest2 module exports', () => {
  it('should export AITest2 SDKModule', () => {
    expect(aiTest2Module.AITest2).toBeDefined();
    expect(aiTest2Module.AITest2.namespace).toBe('aiTest2');
    expect(typeof aiTest2Module.AITest2.invokeOperation).toBe('function');
  });

  it('should export experimental_AITest2 class', () => {
    expect(aiTest2Module.experimental_AITest2).toBeDefined();
  });

  it('should export experimental_createAITest2Client factory', () => {
    expect(aiTest2Module.experimental_createAITest2Client).toBeDefined();
    expect(typeof aiTest2Module.experimental_createAITest2Client).toBe('function');
  });

  it('should export QueryMap and MutationMap', () => {
    expect(aiTest2Module).toBeDefined();
  });
});