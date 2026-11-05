import { PostMessageBridge } from '../post-message';
import { CoreError, ErrorCode } from '../errors';
import type { HandshakeMessage } from '../types';
import { afterEach, beforeEach, describe, expect, test, vi, Mock } from 'vitest';
import { source } from './shared';

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

  test('uses request-local timeouts without changing the global timeout', async () => {
    vi.useFakeTimers();
    bridge.initialize({
      type: 'host',
      targetOrigin: mockTargetOrigin,
      selfOrigin: testSelfOrigin,
      version: '1.0.0',
    });
    bridge['connected'] = true;
    try {
      const shortRequest = bridge.request('short', undefined, { timeoutMs: 100 }).catch(error => error);
      const defaultRequest = bridge.request('default').catch(error => error);
      await vi.advanceTimersByTimeAsync(100);
      expect(await shortRequest).toMatchObject({ code: 'TIMEOUT' });
      expect(bridge['pendingRequests'].size).toBe(1);
      expect(bridge['config'].timeout).toBe(5000);
      await vi.advanceTimersByTimeAsync(4900);
      expect(await defaultRequest).toMatchObject({ code: 'TIMEOUT' });
      expect(bridge['pendingRequests'].size).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

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
        origin: 'https://sitecorecloud.io',
        data: {
          type: 'handshake',
          source: 'sitecore-marketplace-sdk',
        },
      } as MessageEvent;

      const bridge = new PostMessageBridge({
        target: mockTarget,
        targetOrigin: undefined,
        selfOrigin: testSelfOrigin,
        timeout: 5000,
      });

      bridge.initialize({
        type: 'client',
        targetOrigin: undefined,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });

      const isValid = (bridge as any).isValidOrigin(mockEvent, mockEvent.data);

      expect(isValid).toBe(true);
      expect(bridge['config'].targetOrigin).toBe('https://sitecorecloud.io');
    });

    test('fail validates origin when used not allowed origin', () => {
      const mockEvent = {
        origin: 'https://notallowed-origin.com',
        data: {
          type: 'handshake',
          source: 'sitecore-marketplace-sdk',
        },
      } as MessageEvent;

      const bridge = new PostMessageBridge({
        target: mockTarget,
        targetOrigin: undefined,
        selfOrigin: testSelfOrigin,
        timeout: 5000,
      });

      bridge.initialize({
        type: 'client',
        targetOrigin: undefined,
        selfOrigin: testSelfOrigin,
        version: '1.0.0'
      });

      const isValid = (bridge as any).isValidOrigin(mockEvent, mockEvent.data);

      expect(isValid).toBe(false);
      expect(bridge['config'].targetOrigin).toBeUndefined();
    });

    describe('isValidOrigin - handshake hostname validation', () => {
      const makeClientBridge = () => {
        const b = new PostMessageBridge({
          target: mockTarget,
          targetOrigin: undefined,
          selfOrigin: testSelfOrigin,
          timeout: 5000,
        });
        b.initialize({ type: 'client', targetOrigin: undefined, selfOrigin: testSelfOrigin, version: '1.0.0' });
        return b;
      };

      const handshakeMessage = { type: 'handshake', source: 'sitecore-marketplace-sdk' };
      const handshakeEvent = (origin: string) =>
        ({ origin, data: handshakeMessage }) as unknown as MessageEvent;

      test.each([
        'https://sitecorecloud.io',
        'https://sitecorecloud.app',
        'https://sitecore-staging.cloud',
      ])('accepts exact allowed domain: %s', (origin) => {
        const b = makeClientBridge();
        expect((b as any).isValidOrigin(handshakeEvent(origin), handshakeMessage)).toBe(true);
        expect(b['config'].targetOrigin).toBe(origin);
      });

      test.each([
        'https://app1.sitecorecloud.io',
        'https://app1.sitecorecloud.app',
        'https://app1.sitecore-staging.cloud',
        'https://a.b.sitecorecloud.io',
      ])('accepts true subdomain: %s', (origin) => {
        const b = makeClientBridge();
        expect((b as any).isValidOrigin(handshakeEvent(origin), handshakeMessage)).toBe(true);
        expect(b['config'].targetOrigin).toBe(origin);
      });

      test.each([
        'https://sitecorecloud.io.attacker.com',
        'https://sitecorecloud.app.attacker.com',
        'https://sitecore-staging.cloud.attacker.com',
      ])('rejects lookalike suffix attack: %s', (origin) => {
        const b = makeClientBridge();
        expect((b as any).isValidOrigin(handshakeEvent(origin), handshakeMessage)).toBe(false);
        expect(b['config'].targetOrigin).toBeUndefined();
      });

      test.each([
        'https://evil-sitecorecloud.io',
        'https://notsitecore-staging.cloud',
        'https://fakesitecorecloud.app',
      ])('rejects substring prefix attack: %s', (origin) => {
        const b = makeClientBridge();
        expect((b as any).isValidOrigin(handshakeEvent(origin), handshakeMessage)).toBe(false);
        expect(b['config'].targetOrigin).toBeUndefined();
      });

      test('rejects opaque origin ("null" string)', () => {
        const b = makeClientBridge();
        const event = { origin: 'null', data: handshakeMessage } as unknown as MessageEvent;
        expect((b as any).isValidOrigin(event, handshakeMessage)).toBe(false);
        expect(b['config'].targetOrigin).toBeUndefined();
      });
    });

    test('logs request handling with %s specifier and action', async () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      const bridge = new PostMessageBridge({
        target: { postMessage: vi.fn() } as unknown as Window, // <-- Fix here
        targetOrigin: 'https://trusted-origin.com',
        selfOrigin: 'https://self-origin.com',
        timeout: 5000,
      });

      bridge['connected'] = true;
      bridge['sdkType'] = 'client';
      bridge['requestHandlers'].set('testAction', vi.fn());

      const message = {
        id: '1',
        type: 'request',
        action: 'testAction',
        payload: {},
        timestamp: Date.now(),
        source: 'sitecore-marketplace-sdk',
      } as const;

      await bridge['handleRequest'](message);

      expect(consoleSpy).toHaveBeenCalledWith(
          '[client PostMessageBridge] Handling request for action: %s',
          'testAction',
          message
      );

      consoleSpy.mockRestore();
    });

    test('logs response handling with %s specifier and message id', () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      const bridge = new PostMessageBridge({
        target: { postMessage: vi.fn() } as unknown as Window,
        targetOrigin: 'https://trusted-origin.com',
        selfOrigin: 'https://self-origin.com',
        timeout: 5000,
      });

      bridge['connected'] = true;
      bridge['sdkType'] = 'client';
      // Simulate a pending request to avoid early return
      const message = {
        id: 'resp-1',
        type: 'response',
        success: true,
        data: { foo: 'bar' },
        timestamp: Date.now(),
        source: 'sitecore-marketplace-sdk',
      } as const;
      bridge['pendingRequests'].set('resp-1', {
        resolve: vi.fn(),
        reject: vi.fn(),
        timeout: setTimeout(() => {}, 1000),
      });

      bridge['handleResponse'](message);

      expect(consoleSpy).toHaveBeenCalledWith(
          '[client PostMessageBridge] Handling response for message ID: %s',
          'resp-1',
          message
      );

      consoleSpy.mockRestore();
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

  describe('request handler errors', () => {
    const respondTo = async (handler: () => unknown) => {
      bridge['requestHandlers'].set('testAction', handler);
      await bridge['handleRequest']({
        id: 'req-1',
        type: 'request',
        action: 'testAction',
        payload: {},
        timestamp: Date.now(),
        source,
      });
      const calls = (mockTarget.postMessage as Mock).mock.calls;
      return calls[calls.length - 1][0].error;
    };

    test('passes a CoreError code, message and details to the requester', async () => {
      const error = await respondTo(() => {
        throw new CoreError(ErrorCode.INVALID_REQUEST, 'State too large', {
          reason: 'STATE_TOO_LARGE',
        });
      });

      expect(error).toEqual({
        code: ErrorCode.INVALID_REQUEST,
        message: 'State too large',
        details: { reason: 'STATE_TOO_LARGE' },
      });
    });

    test('passes CoreErrors from another bundled copy of core', async () => {
      class OtherCopyCoreError extends Error {
        name = 'CoreError';
        constructor(
          public code: ErrorCode,
          message: string,
          public details?: unknown,
        ) {
          super(message);
        }
      }

      const error = await respondTo(() => {
        throw new OtherCopyCoreError(ErrorCode.INVALID_REQUEST, 'Full', {
          reason: 'HOST_STATE_FULL',
        });
      });

      expect(error).toEqual({
        code: ErrorCode.INVALID_REQUEST,
        message: 'Full',
        details: { reason: 'HOST_STATE_FULL' },
      });
    });

    test('passes only details.reason, never other details', async () => {
      const withReason = await respondTo(() => {
        throw new CoreError(ErrorCode.INVALID_REQUEST, 'Denied', {
          reason: 'STATE_TOO_LARGE',
          request: { headers: { Authorization: 'Bearer secret' } },
        });
      });
      const withoutReason = await respondTo(() => {
        throw new CoreError(ErrorCode.EXECUTION_ERROR, 'Failed', { token: 'secret' });
      });

      expect(withReason.details).toEqual({ reason: 'STATE_TOO_LARGE' });
      expect(withoutReason).toEqual({
        code: ErrorCode.EXECUTION_ERROR,
        message: 'Failed',
        details: undefined,
      });
    });

    test('still wraps other errors as EXECUTION_ERROR', async () => {
      const error = await respondTo(() => {
        throw new Error('boom');
      });

      expect(error).toMatchObject({ code: ErrorCode.EXECUTION_ERROR, message: 'boom' });
    });

    test('sends only the message of other errors, never the error itself', async () => {
      const error = await respondTo(() => {
        throw Object.assign(new Error('Request failed with status 401'), {
          config: { headers: { Authorization: 'Bearer secret' } },
          retry: () => {},
        });
      });

      expect(error).toEqual({
        code: ErrorCode.EXECUTION_ERROR,
        message: 'Request failed with status 401',
      });
    });
  });

  describe('message source', () => {
    const frame = () => {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      const window = iframe.contentWindow!;
      vi.spyOn(window, 'postMessage').mockImplementation(() => {});
      return window;
    };
    const request = (id: string, payload: unknown) => ({
      id,
      type: 'request',
      action: 'testAction',
      payload,
      timestamp: Date.now(),
      source,
    });
    const dispatch = async (data: unknown, from: Window) => {
      window.dispatchEvent(new MessageEvent('message', { data, origin: mockTargetOrigin, source: from }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    };
    const handshakeInit = (id: string) => ({
      id,
      type: 'handshake',
      event: 'handshake:init',
      handshakeType: 'request',
      sdkType: 'client',
      version: '1.0.0',
      timestamp: Date.now(),
      source,
    });
    const hostBridge = (target?: Window) => {
      const hostBridge = new PostMessageBridge({
        target,
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        timeout: 5000,
      });
      hostBridge.initialize({
        type: 'host',
        targetOrigin: mockTargetOrigin,
        selfOrigin: testSelfOrigin,
        version: '1.0.0',
      });
      return hostBridge;
    };

    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('ignores a request from another window of the same origin', async () => {
      const own = frame();
      const other = frame();
      const handler = vi.fn(() => 'ok');
      const host = hostBridge(own);
      host.onRequest('testAction', handler);

      await dispatch(request('from-other', { widget: 2 }), other);
      await dispatch(request('from-own', { widget: 1 }), own);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ widget: 1 });
      expect(own.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'from-own', type: 'response' }),
        mockTargetOrigin,
      );
      host.destroy();
    });

    test('drops buffered messages from other windows once the target is set', async () => {
      const own = frame();
      const other = frame();
      const handler = vi.fn(() => 'ok');
      const host = hostBridge();
      host.onRequest('testAction', handler);

      await dispatch(handshakeInit('other-init'), other);
      await dispatch(request('other-req', { widget: 2 }), other);
      await dispatch(handshakeInit('own-init'), own);
      await dispatch(request('own-req', { widget: 1 }), own);
      host.setTarget(own);
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ widget: 1 });
      const sent = (own.postMessage as Mock).mock.calls.map(([message]) => message.id);
      expect(sent).toEqual(['own-init', 'own-req']);
      host.destroy();
    });
  });

  describe('URL state in debug logs', () => {
    const logged = (spy: Mock) => JSON.stringify(spy.mock.calls);

    test('redacts URL state requests, and the responses to them, on both sides', async () => {
      const debug = vi.spyOn(console, 'debug').mockImplementation(() => {});
      bridge['initialized'] = true;
      bridge['connected'] = true;
      bridge['sdkType'] = 'client';
      const saved = bridge.request('application.urlState:mutation', { state: { secret: 'saved' } });
      await simulateResponse({ type: 'response', success: true, data: { ok: true } });
      await saved;

      bridge.onRequest('application.urlState:query', () => ({ state: { secret: 'read' } }));
      await bridge['handleRequest']({
        id: 'query-1',
        type: 'request',
        action: 'application.urlState:query',
        timestamp: Date.now(),
        source,
      });

      expect(logged(debug as Mock)).not.toContain('secret');
      expect(logged(debug as Mock)).toContain('[redacted]');
      expect(bridge['urlStateRequestIds'].size).toBe(0);
      debug.mockRestore();
    });

    test('still logs other requests in full', async () => {
      const debug = vi.spyOn(console, 'debug').mockImplementation(() => {});
      bridge['connected'] = true;
      bridge.onRequest('host.user', () => ({ name: 'visible' }));

      await bridge['handleRequest']({
        id: 'user-1',
        type: 'request',
        action: 'host.user',
        timestamp: Date.now(),
        source,
      });

      expect(logged(debug as Mock)).toContain('visible');
      debug.mockRestore();
    });
  });
});
