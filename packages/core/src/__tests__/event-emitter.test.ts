import { EventEmitter } from '../event-emitter';
import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';

describe('EventEmitter', () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  afterEach(() => {
    emitter.clear();
  });

  test('subscribes and receives events', () => {
    const handler = vi.fn();
    const unsubscribe = emitter.on('test', handler);

    const data = { message: 'hello' };
    emitter.emit('test', data);

    expect(handler).toHaveBeenCalledWith(data);
    unsubscribe();
  });

  test('unsubscribes from events', () => {
    const handler = vi.fn();
    const unsubscribe = emitter.on('test', handler);

    unsubscribe();
    emitter.emit('test', 'data');

    expect(handler).not.toHaveBeenCalled();
  });

  test('handles multiple subscribers', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const unsubscribe1 = emitter.on('test', handler1);
    const unsubscribe2 = emitter.on('test', handler2);

    emitter.emit('test', 'data');

    expect(handler1).toHaveBeenCalledWith('data');
    expect(handler2).toHaveBeenCalledWith('data');

    unsubscribe1();
    unsubscribe2();
  });

  test('removes event from handlers map if last handler is removed', () => {
    const handler = vi.fn();
    emitter.on('test', handler);

    emitter.off('test', handler);

    expect(emitter.hasListeners('test')).toBe(false);
  });

  test('clears all handlers', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    emitter.on('test1', handler1);
    emitter.on('test2', handler2);

    emitter.clear();

    emitter.emit('test1', 'data');
    emitter.emit('test2', 'data');

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });

  test('wildcard handlers receive events', () => {
    const handler = vi.fn();
    const wildcardHandler = vi.fn();

    emitter.on('test', handler);
    emitter.on('*', wildcardHandler);

    const data = { message: 'hello' };
    emitter.emit('test', data);

    expect(handler).toHaveBeenCalledWith(data);
    expect(wildcardHandler).toHaveBeenCalledWith({ event: 'test', payload: data });
  });

  test('catches and logs wildcard handler errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Wildcard handler error');

    const wildcardHandler = () => {
      throw error;
    };

    emitter.on('*', wildcardHandler);
    emitter.emit('test', 'data');

    expect(consoleSpy).toHaveBeenCalledWith('Error in wildcard handler for %s:', 'test', error);

    consoleSpy.mockRestore();
  });

  test('catches and logs handler errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Handler error');

    const handler = () => {
      throw error;
    };

    const unsubscribe = emitter.on('test', handler);
    emitter.emit('test', 'data');

    expect(consoleSpy).toHaveBeenCalledWith('Error in event handler for %s:', 'test', error);

    consoleSpy.mockRestore();
    unsubscribe();
  });

  test('hasListeners returns correct state', () => {
    const handler = vi.fn();

    expect(emitter.hasListeners('test')).toBe(false);

    const unsubscribe = emitter.on('test', handler);
    expect(emitter.hasListeners('test')).toBe(true);

    unsubscribe();
    expect(emitter.hasListeners('test')).toBe(false);
  });
});
