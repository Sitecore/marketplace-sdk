import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AI } from '../index';
import * as documents from '../client-documents/sdk.gen';
import * as skills from '../client-skills/sdk.gen';

vi.mock('../client-documents/sdk.gen', () => ({
  listDocuments: vi.fn(),
}));

vi.mock('../client-skills/sdk.gen', () => ({
  generateBrandReview: vi.fn(),
}));

describe('AI SDKModule', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
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

  it('should invoke a documents operation', () => {
    AI.invokeOperation('documents.listDocuments', { query: 'test' });

    expect(documents.listDocuments).toHaveBeenCalledWith({ query: 'test' });
  });

  it('should invoke a skills operation', () => {
    AI.invokeOperation('skills.generateBrandReview', { body: { input: { text: 'test' } } });

    expect(skills.generateBrandReview).toHaveBeenCalledWith({ body: { input: { text: 'test' } } });
  });
});
