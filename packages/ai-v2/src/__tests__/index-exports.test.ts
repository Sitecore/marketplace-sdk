import { describe, it, expect } from 'vitest';
import * as aiV2Module from '../index';


describe('ai-v2 exports', () => {
  it('exports the production and experimental APIs', () => {
    expect(aiV2Module.AIV2).toBeDefined();
    expect(aiV2Module.AIV2.namespace).toBe('ai-v2');
    expect(aiV2Module.experimental_AIV2).toBeDefined();
    expect(aiV2Module.experimental_createAIV2Client).toBeTypeOf('function');
  });
});
