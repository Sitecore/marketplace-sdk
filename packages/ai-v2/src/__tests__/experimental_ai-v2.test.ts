import { describe, it, expect, vi } from 'vitest';
import {
  experimental_AIV2,
  experimental_createAIV2Client,
} from '../experimental_ai-v2';

describe('experimental_AIV2', () => {
  it('creates the extractions API proxy', async () => {
    const client = await experimental_createAIV2Client({
      getAccessToken: vi.fn().mockResolvedValue('token'),
    });

    expect(client).toBeInstanceOf(experimental_AIV2);
    expect(client.extractions).toBeDefined();
  });
});
