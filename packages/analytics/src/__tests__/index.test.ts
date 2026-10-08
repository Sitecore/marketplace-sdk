import { describe, expect, it } from 'vitest';
import { createAnalytics, events } from '../index';

describe('package exports', () => {
  it('exports createAnalytics and events', () => {
    expect(typeof createAnalytics).toBe('function');
    expect(typeof events.listingView).toBe('function');
    expect(typeof events.installClick).toBe('function');
    expect(typeof events.appInvocation).toBe('function');
  });
});
