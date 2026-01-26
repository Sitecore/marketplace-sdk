import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AI } from '../index';
import * as skills from '../client-skills/sdk.gen';

// Mock the skills SDK module
vi.mock('../client-skills/sdk.gen', () => ({
  getVersionApiVersionGet: vi.fn(),
  generateBrandReviewApiSkillsV1BrandreviewGeneratePost: vi.fn(),
  generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost: vi.fn(),
  generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost: vi.fn(),
  generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost: vi.fn(),
  generateEmbeddingsApiSkillsV1DeepResearchGeneratePost: vi.fn(),
}));

describe('AI SDKModule', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  describe('Namespace', () => {
    it('should have correct namespace', () => {
      expect(AI.namespace).toBe('ai');
    });

    it('should have invokeOperation function', () => {
      expect(typeof AI.invokeOperation).toBe('function');
    });
  });

  describe('Error Handling', () => {
    it('should throw an error for invalid operation format', () => {
      expect(() => AI.invokeOperation('invalidOperation')).toThrow(
        "Invalid operation format: 'invalidOperation'. Expected format 'clientNamespace.operationName'.",
      );
    });

    it('should throw an error for operation without namespace', () => {
      expect(() => AI.invokeOperation('singleWord')).toThrow(
        "Invalid operation format: 'singleWord'. Expected format 'clientNamespace.operationName'.",
      );
    });

    it('should throw an error for non-existent namespace', () => {
      expect(() => AI.invokeOperation('nonExistentNamespace.operation')).toThrow(
        "Namespace 'nonExistentNamespace' not found",
      );
    });

    it('should throw an error for non-existent operation in skills namespace', () => {
      expect(() => AI.invokeOperation('skills.nonExistentOperation')).toThrow(
        "Operation 'nonExistentOperation' not found in namespace 'skills'",
      );
    });
  });

  describe('Operation Invocation', () => {
    it('should invoke getVersionApiVersionGet in the skills namespace', () => {
      AI.invokeOperation('skills.getVersionApiVersionGet');

      expect(skills.getVersionApiVersionGet).toHaveBeenCalled();
    });

    it('should invoke generateBrandReviewApiSkillsV1BrandreviewGeneratePost in the skills namespace', () => {
      AI.invokeOperation('skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost', {
        body: { brandkitId: 'test-id', input: {} },
      });

      expect(skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost).toHaveBeenCalledWith({
        body: { brandkitId: 'test-id', input: {} },
      });
    });

    it('should invoke generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost in the skills namespace', () => {
      AI.invokeOperation('skills.generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost', {
        body: { input: [] },
      });

      expect(skills.generateEmbeddingsApiSkillsV1EmbeddingsGeneratePost).toHaveBeenCalledWith({
        body: { input: [] },
      });
    });

    it('should invoke generateEmbeddingsApiSkillsV1DeepResearchGeneratePost in the skills namespace', () => {
      AI.invokeOperation('skills.generateEmbeddingsApiSkillsV1DeepResearchGeneratePost', {
        body: { prompt: 'test prompt', brandkitId: 'test-id' },
      });

      expect(skills.generateEmbeddingsApiSkillsV1DeepResearchGeneratePost).toHaveBeenCalledWith({
        body: { prompt: 'test prompt', brandkitId: 'test-id' },
      });
    });

    it('should pass multiple arguments to the operation', () => {
      AI.invokeOperation(
        'skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost',
        { body: {} },
        { headers: {} },
      );

      expect(skills.generateBrandReviewApiSkillsV1BrandreviewGeneratePost).toHaveBeenCalledWith(
        { body: {} },
        { headers: {} },
      );
    });

    it('should return the result from the invoked operation', () => {
      const expectedResult = { data: { version: '1.0.0' } };
      vi.mocked(skills.getVersionApiVersionGet).mockReturnValue(expectedResult as any);

      const result = AI.invokeOperation('skills.getVersionApiVersionGet');

      expect(result).toBe(expectedResult);
    });
  });

  describe('Admin Operations', () => {
    it('should invoke generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost in the skills namespace', () => {
      AI.invokeOperation('skills.generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost', {
        body: { brandkitId: 'test-id', input: {} },
        headers: { 'x-sc-src-tenant-id': 'tenant-123' },
      });

      expect(skills.generateBrandReviewAdminApiSkillsAdminV1BrandreviewGeneratePost).toHaveBeenCalledWith({
        body: { brandkitId: 'test-id', input: {} },
        headers: { 'x-sc-src-tenant-id': 'tenant-123' },
      });
    });

    it('should invoke generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost in the skills namespace', () => {
      AI.invokeOperation('skills.generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost', {
        body: { input: [] },
        headers: { 'x-sc-src-tenant-id': 'tenant-123' },
      });

      expect(skills.generateEmbeddingsApiSkillsAdminV1EmbeddingsGeneratePost).toHaveBeenCalledWith({
        body: { input: [] },
        headers: { 'x-sc-src-tenant-id': 'tenant-123' },
      });
    });
  });
});
