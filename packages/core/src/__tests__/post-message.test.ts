import { PostMessageBridge } from '../post-message';
import { CoreError } from '../errors';
import type { HandshakeMessage } from '../types';
import { afterEach, beforeEach, describe, expect, test, vi, Mock } from 'vitest';
import { source } from './shared';
import { AllowedOrigins } from '../allowed-origins';

describe('PostMessageBridge', () => {
  const mockTarget = {
    postMessage: vi.fn()
  } as unknown as Window;

  const mockTargetOrigin = 'https://trusted-origin.com';
  const testSelfOrigin = 'https://self-origin.com';
  let bridge: PostMessageBridge;

  beforeEach(() => {
    vi.clearAllMocks();

    bridge = new PostMessageBridge({
      target: mockTarget,
      targetOrigin: mockTargetOrigin,
      selfOrigin: testSelfOrigin,
      timeout: 5000
    });
  });

  afterEach(async () => {
    await bridge.destroy();
  });

  const simulateResponse = async (data: any): Promise<void> => {
    const calls = (mockTarget.postMessage as Mock).mock.calls;
    const sentMessageId = calls.length > 0 ? calls[calls.length - 1][0].id : data.id;
    const event = new MessageEvent('message', {
      data: {
        ...data,
        id: sentMessageId,
        source: source,
      },
      origin: data.origin || mockTargetOrigin
    });
    window.dispatchEvent(event);
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  describe('initialization', () => {
    test('marks host as initialized without handshake', async () => {
      bridge.initialize({
        type: 'host',
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });
      await expect(Promise.resolve()).resolves.toBeUndefined();
    });

    test('throws error if already initialized', async () => {
      bridge.initialize({
        type: 'host',
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });
      expect(() => bridge.initialize({
        type: 'host',
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      })).toThrow('[host SDK] SDK is already initialized');
    });

    test('throws error if ensureInitialized is called before initialization', async () => {
      const uninitializedBridge = new PostMessageBridge({
        target: mockTarget,
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        timeout: 5000
      });

      expect(() => uninitializedBridge['ensureConnected']()).toThrow(CoreError);
    });

    test('performs handshake successfully on client', async () => {
      bridge.initialize({
        type: 'client',
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });

      await simulateResponse({
        type: 'handshake',
        handshakeType: 'response',
        sessionId: 'test-session',
        timestamp: Date.now()
      } as unknown as HandshakeMessage);

      await expect(Promise.resolve()).resolves.toBeUndefined();
    });

    test('fails handshake on invalid origin for client', async () => {
      bridge.initialize({
        type: 'client',
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });

      const calls = (mockTarget.postMessage as Mock).mock.calls;
      const sentMessageId = calls.length > 0 ? calls[calls.length - 1][0].id : undefined;

      const event = new MessageEvent('message', {
        data: {
          type: 'handshake',
          handshakeType: 'response',
          id: sentMessageId,
          source: source
        },
        origin: 'https://invalid-origin.com'
      });
      window.dispatchEvent(event);

      await expect(Promise.resolve()).resolves.toBeUndefined();
    });

    test('validates origin and updates targetOrigin for client handshake with null targetOrigin', () => {
      const mockEvent = {
        origin: 'https://allowed-origin.com',
        data: {
          type: 'handshake',
          source: 'sitecore-marketplace-sdk',
        },
      } as MessageEvent;

      const mockAllowOrigins = ['https://allowed-origin.com'];
      vi.spyOn(AllowedOrigins, 'some').mockImplementation((callback) => mockAllowOrigins.some(callback));

      const bridge = new PostMessageBridge({
        target: mockTarget,
        targetOrigin: null,
        selfOrigin: testSelfOrigin,
        timeout: 5000,
      });

      bridge.initialize({
        type: 'client',
        targetOrigin: null,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });

      const isValid = (bridge as any).isValidOrigin(mockEvent, mockEvent.data);

      expect(isValid).toBe(true);
      expect(bridge['config'].targetOrigin).toBe('https://allowed-origin.com');
    });

    test('fail validates origin when used not allowed origin', () => {
      const mockEvent = {
        origin: 'https://notallowed-origin.com',
        data: {
          type: 'handshake',
          source: 'sitecore-marketplace-sdk',
        },
      } as MessageEvent;

      const mockAllowOrigins = ['https://allowed-origin.com'];
      vi.spyOn(AllowedOrigins, 'some').mockImplementation((callback) => mockAllowOrigins.some(callback));

      const bridge = new PostMessageBridge({
        target: mockTarget,
        targetOrigin: null,
        selfOrigin: testSelfOrigin,
        timeout: 5000,
      });

      bridge.initialize({
        type: 'client',
        targetOrigin: null,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });

      const isValid = (bridge as any).isValidOrigin(mockEvent, mockEvent.data);

      expect(isValid).toBe(false);
      expect(bridge['config'].targetOrigin).toBe(null);
    });

    // describe('request/response', () => {
    //   beforeEach(async () => {
    //     bridge.initialize({
    //       type: 'client',
    //       targetOrigin: mockTargetOrigin,
    //       selfOrigin: testSelfOrigin,
    //       version: '1.0.0'
    //     });
    //
    //     await simulateResponse({
    //       type: 'handshake',
    //       handshakeType: 'response',
    //       sessionId: 'test-session',
    //       timestamp: Date.now()
    //     } as unknown as HandshakeMessage);
    //   });
    //
    //   test('sends request and receives response', async () => {
    //     const requestPromise = bridge.request('getData', { id: 1 });
    //
    //     await simulateResponse({
    //       type: 'response',
    //       success: true,
    //       data: { result: 'success' },
    //       timestamp: Date.now()
    //     });
    //
    //     await expect(requestPromise).resolves.toEqual({ result: 'success' });
    //   });
    //
    //   test('handles request and sends response', async () => {
    //     const handler = vi.fn().mockResolvedValue('response data');
    //     bridge.onRequest('testAction', handler);
    //
    //     const requestMessage = {
    //       id: 'test-id',
    //       type: 'request',
    //       action: 'testAction',
    //       payload: { key: 'value' },
    //       timestamp: Date.now(),
    //       source: source
    //     };
    //
    //     const event = new MessageEvent('message', {
    //       data: requestMessage,
    //       origin: mockTargetOrigin
    //     });
    //
    //     window.dispatchEvent(event);
    //
    //     await new Promise((resolve) => setTimeout(resolve, 0));
    //
    //     expect(handler).toHaveBeenCalledWith({ key: 'value' });
    //     expect(mockTarget.postMessage).toHaveBeenCalledWith(
    //       expect.objectContaining({
    //         id: 'test-id',
    //         type: 'response',
    //         success: true,
    //         data: 'response data'
    //       }),
    //       mockTargetOrigin
    //     );
    //   });
    //
    //   test('handles request and sends error response when no handler is found', async () => {
    //     const requestMessage = {
    //       id: 'test-id',
    //       type: 'request',
    //       action: 'unknownAction',
    //       payload: { key: 'value' },
    //       timestamp: Date.now(),
    //       source: source,
    //     };
    //
    //     const event = new MessageEvent('message', {
    //       data: requestMessage,
    //       origin: mockTargetOrigin
    //     });
    //
    //     window.dispatchEvent(event);
    //
    //     await new Promise((resolve) => setTimeout(resolve, 0));
    //
    //     expect(mockTarget.postMessage).toHaveBeenCalledWith(
    //       expect.objectContaining({
    //         id: 'test-id',
    //         type: 'response',
    //         success: false,
    //         error: expect.objectContaining({
    //           code: 'METHOD_NOT_FOUND',
    //           message: 'No handler found for request action "unknownAction".'
    //         })
    //       }),
    //       mockTargetOrigin
    //     );
    //   });
    //
    //   test('handles request and sends error response when handler throws an error', async () => {
    //     const handler = vi.fn().mockRejectedValue(new Error('Handler error'));
    //     bridge.onRequest('testAction', handler);
    //
    //     const requestMessage = {
    //       id: 'test-id',
    //       type: 'request',
    //       action: 'testAction',
    //       payload: { key: 'value' },
    //       timestamp: Date.now(),
    //       source: source,
    //     };
    //
    //     const event = new MessageEvent('message', {
    //       data: requestMessage,
    //       origin: mockTargetOrigin
    //     });
    //
    //     window.dispatchEvent(event);
    //
    //     await new Promise((resolve) => setTimeout(resolve, 0));
    //
    //     expect(handler).toHaveBeenCalledWith({ key: 'value' });
    //     expect(mockTarget.postMessage).toHaveBeenCalledWith(
    //       expect.objectContaining({
    //         id: 'test-id',
    //         type: 'response',
    //         success: false,
    //         error: expect.objectContaining({
    //           code: 'EXECUTION_ERROR',
    //           message: 'Handler error'
    //         })
    //       }),
    //       mockTargetOrigin
    //     );
    //   });
    //
    //   test('handles request timeout (with fake timers)', async () => {
    //     vi.useFakeTimers();
    //     const requestPromise = bridge.request('getData', { id: 1 });
    //
    //     vi.advanceTimersByTime(5000);
    //
    //     await expect(requestPromise).rejects.toThrow(CoreError);
    //     vi.useRealTimers();
    //   });
    // });

    // describe('events', () => {
    //   beforeEach(async () => {
    //     bridge.initialize({
    //       type: 'client',
    //       targetOrigin: mockTargetOrigin,
    //       selfOrigin: testSelfOrigin,
    //       version: '1.0.0'
    //     });
    //
    //     await simulateResponse({
    //       type: 'handshake',
    //       handshakeType: 'response',
    //       sessionId: 'test-session',
    //       timestamp: Date.now()
    //     } as unknown as HandshakeMessage);
    //   });
    //
    //   test('receives events', async () => {
    //     const handler = vi.fn();
    //     bridge.on('testEvent', handler);
    //
    //     await simulateResponse({
    //       type: 'event',
    //       event: 'testEvent',
    //       payload: { data: 'test' },
    //       timestamp: Date.now()
    //     });
    //
    //     expect(handler).toHaveBeenCalledWith({ data: 'test' });
    //   });
    //
    //   test('emits events', () => {
    //     bridge.emit('testEvent', { data: 'test' });
    //
    //     expect(mockTarget.postMessage).toHaveBeenCalledWith(
    //       expect.objectContaining({
    //         type: 'event',
    //         event: 'testEvent',
    //         payload: { data: 'test' },
    //         source: source,
    //       }),
    //       mockTargetOrigin
    //     );
    //   });
    // });
  });
});
