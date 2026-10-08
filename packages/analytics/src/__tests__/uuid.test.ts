import { describe, expect, it, vi } from 'vitest';
import { createEventId } from '../uuid';

describe('createEventId', () => {
  it('uses crypto.randomUUID when available', () => {
    const randomUUID = vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('11111111-1111-4111-8111-111111111111');

    expect(createEventId()).toBe('11111111-1111-4111-8111-111111111111');
    expect(randomUUID).toHaveBeenCalledOnce();

    randomUUID.mockRestore();
  });

  it('falls back to getRandomValues when randomUUID is missing', () => {
    const original = globalThis.crypto.randomUUID;
    // @ts-expect-error test fallback
    globalThis.crypto.randomUUID = undefined;
    const bytes = new Uint8Array(16).fill(7);
    const getRandomValues = vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation((buffer) => {
      (buffer as Uint8Array).set(bytes);
      return buffer;
    });

    const id = createEventId();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(getRandomValues).toHaveBeenCalledOnce();

    getRandomValues.mockRestore();
    globalThis.crypto.randomUUID = original;
  });

  it('falls back to Math.random when crypto random APIs are missing', () => {
    const originalCrypto = globalThis.crypto;
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: undefined });
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const id = createEventId();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);

    random.mockRestore();
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: originalCrypto });
  });
});
