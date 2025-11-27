import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ClientSDK } from '../client';
import { CoreSDK } from '@sitecore-marketplace-sdk/core';
import { StateManager } from '../state';
import { logger } from '../logger';

vi.mock('@sitecore-marketplace-sdk/core');
vi.mock('../state');
vi.mock('../logger');

describe('ClientSDK', () => {
  let client: ClientSDK;
  const key = 'host.state';
  const config = {
    origin: 'https://host.app',
    target: window.parent,
    targetOrigin: 'https://target.app',
    selfOrigin: 'https://self.app',
  };

  const mockData = {
    userId: 'user1',
    userName: 'User One',
  };

  beforeEach(async () => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize ClientSDK instance', async () => {
    let consoleSpyInit: ReturnType<typeof vi.spyOn>;
    consoleSpyInit = vi.spyOn(ClientSDK.prototype, 'initialize').mockImplementation(async () => {});

    client = await ClientSDK.init(config);
    expect(client).toBeInstanceOf(ClientSDK);
    expect(consoleSpyInit).toHaveBeenCalled();
  });

  it('should log error on fail initialization', async () => {
    const mockError = new Error('failed initialization');
    CoreSDK.prototype.connect = vi.fn().mockRejectedValue(mockError);

    await expect(ClientSDK.init(config)).rejects.toThrow('failed initialization');
    expect(logger.error).toHaveBeenCalledWith('Client handshake failed:', mockError);
  });

  it('should log info on successful initialization', async () => {
    client = await ClientSDK.init(config);
    expect(logger.info).toHaveBeenCalledWith('Client handshake successful.');
  });

  it('should register module when have module in config on initialization', async () => {
    const clientConfig = {
      origin: 'https://host.app',
      target: window.parent,
      targetOrigin: 'https://target.app',
      selfOrigin: 'https://self.app',
      modules: [{ namespace: 'testModule', invokeOperation: vi.fn() }],
    };

    client = await ClientSDK.init(clientConfig);
    expect(client['modules'].has('testModule')).toBe(true);
  });

  it('should register a module correctly', () => {
    const mockModule = { namespace: 'testModule', invokeOperation: vi.fn() };
    client['registerModule'](mockModule);

    expect(client['modules'].has('testModule')).toBe(true);
    expect(client['modules'].get('testModule')).toBe(mockModule);
  });

  it('should check if a module is registered', () => {
    const mockModule = { namespace: 'testModule', invokeOperation: vi.fn() };
    client['registerModule'](mockModule);

    expect(client['hasModule']('testModule')).toBe(true);
    expect(client['hasModule']('nonExistentModule')).toBe(false);
  });

  it('should return available modules', async () => {
    client = await ClientSDK.init(config);
    const mockModule1 = { namespace: 'module1', invokeOperation: vi.fn() };
    const mockModule2 = { namespace: 'module2', invokeOperation: vi.fn() };
    client['registerModule'](mockModule1);
    client['registerModule'](mockModule2);

    expect(client['availableModules']()).toEqual(['module1', 'module2']);
  });

  it('should resolve core operation', () => {
    const mockModule = { namespace: 'host', invokeOperation: vi.fn() };
    client['registerModule'](mockModule);
    const result = client['resolveOperation']('host.operation');
    expect(result.operation).toBe('operation');
    expect(result.request).toBeInstanceOf(Function);
  });

  it('should resolve module operation', () => {
    const mockModule = { namespace: 'testModule', invokeOperation: vi.fn() };
    client['registerModule'](mockModule);

    const result = client['resolveOperation']('testModule.operation');
    expect(result.operation).toBe('operation');
  });

  it('should call registerHandlers if config.events is defined', async () => {
    const clientConfig = {
      ...config,
      events: { onPageContextUpdate: vi.fn() },
    };
    const registerHandlersSpy = vi.spyOn(ClientSDK.prototype as any, 'registerHandlers');
    client = await ClientSDK.init(clientConfig);

    expect(registerHandlersSpy).toHaveBeenCalled();
  });

  it('should not call registerHandlers if config.events is not defined', async () => {
    const registerHandlersSpy = vi.spyOn(ClientSDK.prototype as any, 'registerHandlers');
    client = await ClientSDK.init(config);

    expect(registerHandlersSpy).not.toHaveBeenCalled();
  });

  it('should register pages.context event correctly', async () => {
    const payload = { some: 'data' };
    const clientConfig = {
      ...config,
      events: { onPageContextUpdate: vi.fn() },
    };
    (CoreSDK as any).mockImplementation(() => ({
      connect: vi.fn(),
      initialize: vi.fn(),
      on: vi.fn().mockImplementation((event: string, handler: any) => {
        if (event === 'pages.context') {
          handler(payload);
        }
      }),
    }));

    await ClientSDK.init(clientConfig);

    expect(logger.debug).toHaveBeenCalledWith('Received pages.context request:', payload);
    expect(clientConfig.events.onPageContextUpdate).toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith('Processed pages.context request.');
  });

  it('should throw an error if onPageContextUpdate event listener is not set', async () => {
    const payload = { some: 'data' };
    const clientConfig = {
      ...config,
      events: { onPageContextUpdate: undefined },
    };
    (CoreSDK as any).mockImplementation(() => ({
      connect: vi.fn(),
      initialize: vi.fn(),
      on: vi.fn().mockImplementation((event: string, handler: any) => {
        if (event === 'pages.context') {
          handler(payload);
        }
      }),
    }));

    await ClientSDK.init(clientConfig);

    expect(logger.debug).toHaveBeenCalledWith('Received pages.context request:', payload);
    expect(logger.debug).toHaveBeenCalledWith('onPageContextUpdate event listener is not set.');
  });

  it('should use key as hashedKey and call handleSubscription when subscribe is true', async () => {
    client = await ClientSDK.init(config);
    const key = 'host.state';
    const options = { subscribe: true };
    const handleSubscriptionSpy = vi
      .spyOn(client as any, 'handleSubscription')
      .mockReturnValue(() => {});
    const generateKeyWithHashSpy = vi.spyOn(client as any, 'generateKeyWithHash');

    await client.query(key, options);

    expect(handleSubscriptionSpy).toHaveBeenCalledWith(key, undefined, undefined);
    expect(generateKeyWithHashSpy).not.toHaveBeenCalled();
  });

  it('should generate hashedKey and NOT call handleSubscription when subscribe is false', async () => {
    client = await ClientSDK.init(config);
    const key = 'host.state';
    const options = { subscribe: false };
    const handleSubscriptionSpy = vi.spyOn(client as any, 'handleSubscription');
    const generateKeyWithHashSpy = vi
      .spyOn(client as any, 'generateKeyWithHash')
      .mockResolvedValue('hashed-key');

    await client.query(key, options);

    expect(generateKeyWithHashSpy).toHaveBeenCalledWith(key, options);
    expect(handleSubscriptionSpy).not.toHaveBeenCalled();
  });

  it('should generate unique keys for different query options', async () => {
    const key = 'host.user';
    const options1 = { subscribe: true };
    const options2 = { subscribe: false };

    const hashedKey1 = await client['generateKeyWithHash'](key, options1);
    const hashedKey2 = await client['generateKeyWithHash'](key, options2);

    expect(hashedKey1).not.toEqual(hashedKey2);
  });

  it('should update query state with unique keys', async () => {
    const key = 'xmc.request';
    const options = { subscribe: false };
    const hashedKey = await client['generateKeyWithHash'](key, options);

    await client.query(key, options);

    expect(StateManager.prototype.updateQueryState).toHaveBeenCalledWith(hashedKey, {
      status: 'loading',
    });
  });

  it('should handle query success with unique keys when subscribe is false', async () => {
    client = await ClientSDK.init(config);
    const key = 'xmc.request';
    const options = {
      subscribe: false,
      params: {
        path: '/api/resource',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        query: { id: '123' },
        requiresAuth: true,
      },
    };
    const hashedKey = await client['generateKeyWithHash'](key, options);
    const responseData = { id: 1, name: 'User' };

    (CoreSDK.prototype.request as vi.Mock).mockResolvedValue(responseData);
    (StateManager.prototype.getQueryState as vi.Mock).mockReturnValue({
      status: 'success',
      data: responseData,
    });

    const result = await client.query(key, options);

    expect(StateManager.prototype.updateQueryState).toHaveBeenCalledWith(hashedKey, {
      status: 'success',
      data: responseData,
    });
    expect(StateManager.prototype.getQueryState).toHaveBeenCalledWith(hashedKey);
    expect(result.data).toEqual(responseData);
  });

  it('should handle query success with event key when subscribe is true', async () => {
    client = await ClientSDK.init(config);
    const key = 'host.request';
    const options = {
      subscribe: true,
      params: {
        path: '/api/resource',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        query: { id: '123' },
        requiresAuth: true,
      },
    };
    const hashedKey = key;
    const responseData = { id: 1, name: 'User' };

    (CoreSDK.prototype.request as vi.Mock).mockResolvedValue(responseData);
    (StateManager.prototype.getQueryState as vi.Mock).mockReturnValue({
      status: 'success',
      data: responseData,
    });

    const result = await client.query(key, options);

    expect(StateManager.prototype.updateQueryState).toHaveBeenCalledWith(hashedKey, {
      status: 'success',
      data: responseData,
    });
    expect(StateManager.prototype.getQueryState).toHaveBeenCalledWith(hashedKey);
    expect(result.data).toEqual(responseData);
  });

  it('should handle query error with correct state update and logging', async () => {
    const key = 'host.request';
    const options = { subscribe: true };
    const mockError = new Error('Query failed');
    CoreSDK.prototype.request = vi.fn().mockRejectedValue(mockError);
    client = await ClientSDK.init(config);

    const result = await client.query(key, options);

    expect(logger.error).toHaveBeenCalledWith(`Query (${key}) error:`, mockError);
    expect(StateManager.prototype.updateQueryState).toHaveBeenCalledWith(expect.any(String), {
      status: 'error',
      error: mockError,
    });
    expect(result).toMatchObject({
      data: undefined,
      error: mockError,
      status: 'error',
      isLoading: false,
      isError: true,
      isSuccess: false,
      refetch: expect.any(Function),
      unsubscribe: expect.any(Function),
    });
  });

  it('should handle query success', async () => {
    StateManager.prototype.getQueryState = vi
      .fn()
      .mockReturnValue({ status: 'idle', subscriptionCount: 0, data: mockData });
    CoreSDK.prototype.request = vi.fn().mockReturnValue(mockData);
    client = await ClientSDK.init(config);

    const result = await client.query(key);

    expect(result.data).toEqual(mockData);
    expect(result.isSuccess).toBe(true);
    expect(logger.info).toHaveBeenCalledWith(`Query (${key}) success:`, mockData);
  });

  it('should handle query error', async () => {
    CoreSDK.prototype.request = vi.fn().mockRejectedValue(new Error('Query failed'));
    client = await ClientSDK.init(config);
    const result = await client.query(key);

    expect(result.data).toEqual(undefined);
    expect(result.isError).toBe(true);
    expect(logger.error).toHaveBeenCalled();
  });

  it('should handle pages.reloadCanvas mutation successfully', async () => {
    // Mock the CoreSDK request method
    CoreSDK.prototype.request = vi.fn().mockResolvedValue(undefined);
    client = await ClientSDK.init(config);

    // Test mutation of pages.reloadCanvas
    const mutationKey = 'pages.reloadCanvas';
    const onSuccessMock = vi.fn();
    const onErrorMock = vi.fn();

    await client.mutate(mutationKey, {
      onSuccess: onSuccessMock,
      onError: onErrorMock
    });

    // Verify the request was made with correct endpoint and parameters
    expect(CoreSDK.prototype.request).toHaveBeenCalledWith('pages.reloadCanvas:mutation', undefined);
    expect(logger.info).toHaveBeenCalledWith(`Mutation (${mutationKey}) success:`, undefined);
    expect(onSuccessMock).toHaveBeenCalledWith(undefined);
    expect(onErrorMock).not.toHaveBeenCalled();
  });

  it('should handle pages.reloadCanvas mutation error', async () => {
    // Mock the CoreSDK request method to throw an error
    const mockError = new Error('Mutation failed');
    CoreSDK.prototype.request = vi.fn().mockRejectedValue(mockError);
    client = await ClientSDK.init(config);

    // Test mutation of pages.reloadCanvas with error
    const mutationKey = 'pages.reloadCanvas';
    const onSuccessMock = vi.fn();
    const onErrorMock = vi.fn();

    await expect(client.mutate(mutationKey, {
      onSuccess: onSuccessMock,
      onError: onErrorMock
    })).rejects.toThrow(mockError);

    // Verify error handling
    expect(logger.error).toHaveBeenCalledWith(`Mutation (${mutationKey}) error:`, mockError);
    expect(onSuccessMock).not.toHaveBeenCalled();
    expect(onErrorMock).toHaveBeenCalledWith(mockError);
  });

  it('should clean up all queries on destroy', () => {
    StateManager.prototype.getQueryKeys = vi.fn().mockReturnValue(['query1', 'query2']);
    const clientSDK = new ClientSDK(config);
    const unsubscribeSpy = vi.spyOn(clientSDK as any, '_unsubscribe');

    clientSDK.destroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(unsubscribeSpy).toHaveBeenCalledWith('query1');
    expect(unsubscribeSpy).toHaveBeenCalledWith('query2');
  });

  it('should call host.navigateTo.externalUrl with correct parameters', async () => {
    // Mock the CoreSDK request method
    CoreSDK.prototype.request = vi.fn().mockResolvedValue(undefined);
    client = await ClientSDK.init(config);

    // Test with provided URL and default newTab value
    const url = 'https://example.com';
    await client.navigateToExternalUrl(url);

    // Verify the request was made with correct endpoint and parameters
    expect(CoreSDK.prototype.request).toHaveBeenCalledWith('host.navigateTo.externalUrl', {
      url,
      newTab: true,
    });
  });

  it('should call host.navigateTo.externalUrl with correct parameters', async () => {
    // Mock the CoreSDK request method
    CoreSDK.prototype.request = vi.fn().mockResolvedValue(undefined);
    client = await ClientSDK.init(config);

    // Test with provided URL and default newTab value
    const url = 'https://example.com';
    await client.navigateToExternalUrl(url);

    // Verify the request was made with correct endpoint and parameters
    expect(CoreSDK.prototype.request).toHaveBeenCalledWith('host.navigateTo.externalUrl', {
      url,
      newTab: true,
    });

    // Test with provided URL and newTab set to false
    await client.navigateToExternalUrl(url, false);

    // Verify the request was made with correct endpoint and parameters
    expect(CoreSDK.prototype.request).toHaveBeenCalledWith('host.navigateTo.externalUrl', {
      url,
      newTab: false,
    });

    // Test with missing URL
    await expect(client.navigateToExternalUrl('')).rejects.toThrow(
      'URL is required for navigateToExternalUrl',
    );
  });

  it('should unsubscribe correctly', async () => {
    const key = 'host.user';
    const options = { subscribe: true };
    const hashedKey = 'host.user_12345';
    StateManager.prototype.getQueryState = vi.fn().mockReturnValue({
      unsubscribe: vi.fn(),
      subscriptionCount: 1,
    });
    StateManager.prototype.getSubscriptionCount = vi.fn().mockReturnValue(0);
    StateManager.prototype.decrementSubscriptionCount = vi.fn();
    StateManager.prototype.removeQuery = vi.fn();

    client = await ClientSDK.init(config);
    client['_unsubscribe'](hashedKey);

    expect(StateManager.prototype.decrementSubscriptionCount).toHaveBeenCalledWith(hashedKey);
    expect(StateManager.prototype.removeQuery).toHaveBeenCalledWith(hashedKey);
  });

  it('should handle subscription: call onSuccess and onError, manage subscription count', () => {
    const clientSDK = new ClientSDK(config);
    const hashedKey = 'test.key';
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();
    // Mock stateManager methods
    const subscribeMock = vi.fn((_, cb) => {
      // Simulate state change with data
      cb({ data: 'test-data', error: undefined });
      // Simulate state change with error
      cb({ data: undefined, error: new Error('test-error') });
      return vi.fn(); // unsubscribe function
    });
    const incrementMock = vi.fn();
    const getCountMock = vi.fn().mockReturnValue(1);
    const updateQueryStateMock = vi.fn();
    // Mock coreSdk.on to return an unsubscribe function
    clientSDK['coreSdk'] = {
      on: vi.fn().mockReturnValue(vi.fn()),
    } as any;
    clientSDK['stateManager'] = {
      subscribe: subscribeMock,
      incrementSubscriptionCount: incrementMock,
      getSubscriptionCount: getCountMock,
      updateQueryState: updateQueryStateMock,
    } as any;
    // Call handleSubscription
    const unsubscribe = (clientSDK as any).handleSubscription(
      hashedKey,
      mockOnSuccess,
      mockOnError,
    );
    // Should call subscribe and increment
    expect(subscribeMock).toHaveBeenCalledWith(hashedKey, expect.any(Function));
    expect(incrementMock).toHaveBeenCalledWith(hashedKey);
    expect(getCountMock).toHaveBeenCalledWith(hashedKey);
    // Should call onSuccess and onError
    expect(mockOnSuccess).toHaveBeenCalledWith('test-data');
    expect(mockOnError).toHaveBeenCalledWith(new Error('test-error'));
    // Should return an unsubscribe function
    expect(typeof unsubscribe).toBe('function');
  });

  it('should not call coreSdk.on if subscription count > 1', () => {
    const clientSDK = new ClientSDK(config);
    const hashedKey = 'test.key';
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();
    // Mock stateManager methods
    const subscribeMock = vi.fn();
    const incrementMock = vi.fn();
    const getCountMock = vi.fn().mockReturnValue(2); // > 1
    const updateQueryStateMock = vi.fn();
    clientSDK['coreSdk'] = {
      on: vi.fn(),
    } as any;
    clientSDK['stateManager'] = {
      subscribe: subscribeMock,
      incrementSubscriptionCount: incrementMock,
      getSubscriptionCount: getCountMock,
      updateQueryState: updateQueryStateMock,
    } as any;
    (clientSDK as any).handleSubscription(hashedKey, mockOnSuccess, mockOnError);
    expect(clientSDK['coreSdk'].on).not.toHaveBeenCalled();
  });

  it('should call only onSuccess if state has data, only onError if state has error, and neither if state is empty', () => {
    const clientSDK = new ClientSDK(config);
    const hashedKey = 'test.key';
    const mockOnSuccess = vi.fn();
    const mockOnError = vi.fn();
    let stateCallback: any;
    const subscribeMock = vi.fn((_, cb) => {
      stateCallback = cb;
      return vi.fn();
    });
    const incrementMock = vi.fn();
    const getCountMock = vi.fn().mockReturnValue(2);
    const updateQueryStateMock = vi.fn();
    clientSDK['coreSdk'] = { on: vi.fn() } as any;
    clientSDK['stateManager'] = {
      subscribe: subscribeMock,
      incrementSubscriptionCount: incrementMock,
      getSubscriptionCount: getCountMock,
      updateQueryState: updateQueryStateMock,
    } as any;
    (clientSDK as any).handleSubscription(hashedKey, mockOnSuccess, mockOnError);
    // Only data
    stateCallback({ data: 'data', error: undefined });
    expect(mockOnSuccess).toHaveBeenCalledWith('data');
    // Only error
    stateCallback({ data: undefined, error: new Error('err') });
    expect(mockOnError).toHaveBeenCalledWith(new Error('err'));
    // Neither
    stateCallback({ data: undefined, error: undefined });
    // Should not throw
  });

  it('should not throw if onSuccess/onError are not provided', () => {
    const clientSDK = new ClientSDK(config);
    const hashedKey = 'test.key';
    let stateCallback: any;
    const subscribeMock = vi.fn((_, cb) => {
      stateCallback = cb;
      return vi.fn();
    });
    const incrementMock = vi.fn();
    const getCountMock = vi.fn().mockReturnValue(2);
    const updateQueryStateMock = vi.fn();
    clientSDK['coreSdk'] = { on: vi.fn() } as any;
    clientSDK['stateManager'] = {
      subscribe: subscribeMock,
      incrementSubscriptionCount: incrementMock,
      getSubscriptionCount: getCountMock,
      updateQueryState: updateQueryStateMock,
    } as any;
    (clientSDK as any).handleSubscription(hashedKey);
    expect(() => stateCallback({ data: 'data', error: undefined })).not.toThrow();
    expect(() => stateCallback({ data: undefined, error: new Error('err') })).not.toThrow();
  });

  it('should call both stateChangeUnsubscribe and _unsubscribe on returned unsubscribe', () => {
    const clientSDK = new ClientSDK(config);
    const hashedKey = 'test.key';
    const stateChangeUnsubscribe = vi.fn();
    const subscribeMock = vi.fn(() => stateChangeUnsubscribe);
    const incrementMock = vi.fn();
    const getCountMock = vi.fn().mockReturnValue(2);
    const updateQueryStateMock = vi.fn();
    const _unsubscribeMock = vi.spyOn(clientSDK as any, '_unsubscribe');
    clientSDK['coreSdk'] = { on: vi.fn() } as any;
    clientSDK['stateManager'] = {
      subscribe: subscribeMock,
      incrementSubscriptionCount: incrementMock,
      getSubscriptionCount: getCountMock,
      updateQueryState: updateQueryStateMock,
      getQueryState: vi.fn().mockReturnValue({}),
      decrementSubscriptionCount: vi.fn(),
    } as any;
    const unsub = (clientSDK as any).handleSubscription(hashedKey);
    unsub();
    expect(stateChangeUnsubscribe).toHaveBeenCalled();
    expect(_unsubscribeMock).toHaveBeenCalledWith(hashedKey);
  });

  it('should store and call coreSdk.on unsubscribe when subscription count is 1', () => {
    const clientSDK = new ClientSDK(config);
    const hashedKey = 'test.key';
    const subscribeMock = vi.fn(() => vi.fn());
    const incrementMock = vi.fn();
    const getCountMock = vi.fn().mockReturnValue(1);
    const updateQueryStateMock = vi.fn();
    const coreUnsubscribe = vi.fn();
    clientSDK['coreSdk'] = {
      on: vi.fn().mockReturnValue(coreUnsubscribe),
    } as any;
    clientSDK['stateManager'] = {
      subscribe: subscribeMock,
      incrementSubscriptionCount: incrementMock,
      getSubscriptionCount: getCountMock,
      updateQueryState: updateQueryStateMock,
    } as any;
    (clientSDK as any).handleSubscription(hashedKey);
    expect(clientSDK['coreSdk'].on).toHaveBeenCalledWith(hashedKey, expect.any(Function));
    expect(updateQueryStateMock).toHaveBeenCalledWith(hashedKey, { unsubscribe: coreUnsubscribe });
  });

  it('should emit route event with correct payload', async () => {
    // Setup
    CoreSDK.prototype.emit = vi.fn();
    client = await ClientSDK.init(config);

    // Test with route only
    const route = '/products/123';
    await client.emitRouteEvent(route);

    // Verify
    expect(CoreSDK.prototype.emit).toHaveBeenCalledWith('client.route', {
      route,
      data: undefined
    });
    expect(logger.debug).toHaveBeenCalledWith(`Sending route event: ${route}`);
  });

  it('should throw error when route is empty', async () => {
    // Setup
    client = await ClientSDK.init(config);

    // Test with empty route
    await expect(client.emitRouteEvent('')).rejects
      .toThrow('Route is required for sendRouteEvent');

    // Test with undefined route
    await expect(client.emitRouteEvent(undefined as unknown as string)).rejects
      .toThrow('Route is required for sendRouteEvent');
  });

  it('should call coreSdk.request with pages.getValue in getValue()', async () => {
    client = await ClientSDK.init(config);
    const mockRequest = vi.spyOn(client['coreSdk'], 'request').mockResolvedValue('mockedValue');
    const result = await client.getValue();
    expect(mockRequest).toHaveBeenCalledWith('pages.getValue', {});
    expect(result).toBe('mockedValue');
  });

  it.each([
    [true, { value: 'testValue', canvasReload: true }],
    [false, { value: 'testValue', canvasReload: false }],
  ])('should call coreSdk.request with pages.setValue in setValue() when canvasReload is %s', async (canvasReload, expectedParams) => {
    client = await ClientSDK.init(config);
    const mockRequest = vi.spyOn(client['coreSdk'], 'request').mockResolvedValue(undefined);
    await client.setValue('testValue', canvasReload);
    expect(mockRequest).toHaveBeenCalledWith('pages.setValue', expectedParams);
  });

  it('should call coreSdk.request with pages.closeApp in closeApp()', async () => {
    client = await ClientSDK.init(config);
    const mockRequest = vi.spyOn(client['coreSdk'], 'request').mockResolvedValue(undefined);
    await client.closeApp();
    expect(mockRequest).toHaveBeenCalledWith('pages.closeApp', {});
  });

  it('should call coreSdk.request with pages.context in mutate()', async () => {
    client = await ClientSDK.init(config);
    const mockRequest = vi.spyOn(client['coreSdk'], 'request').mockResolvedValue(undefined);
    const params = { itemId: '123', language: 'en', itemVersion: '1' };
    await client.mutate('pages.context', { params });
    expect(mockRequest).toHaveBeenCalledWith('pages.context:mutation', params);
  });

  it('should call coreSdk.request with pages.setValue in mutate()', async () => {
    client = await ClientSDK.init(config);
    const mockRequest = vi.spyOn(client['coreSdk'], 'request').mockResolvedValue(undefined);
    const params = { value: 'test', canvasReload: false };
    await client.mutate('pages.setValue', { params });
    expect(mockRequest).toHaveBeenCalledWith('pages.setValue:mutation', params);
  });

  describe('subscribe', () => {
    it('should subscribe to an event and return unsubscribe function', () => {
      client = new ClientSDK(config);
      const eventKey = 'pages.content.layoutUpdated';
      const mockUnsubscribe = vi.fn();
      const mockOn = vi.fn().mockReturnValue(mockUnsubscribe);
      client['coreSdk'] = { on: mockOn } as any;

      const onData = vi.fn();
      const unsubscribe = client.subscribe(eventKey, { onData });

      expect(mockOn).toHaveBeenCalledWith(eventKey, expect.any(Function));
      expect(unsubscribe).toBeInstanceOf(Function);
      expect(logger.debug).toHaveBeenCalledWith(`Subscribing to event: ${eventKey}`);
      expect(logger.info).toHaveBeenCalledWith(`Successfully subscribed to event: ${eventKey}`);
    });

    it('should call onData callback when event is received', () => {
      client = new ClientSDK(config);
      const eventKey = 'pages.content.layoutUpdated';
      const eventData = { ItemId: '123', Language: 'en', layout: { type: 'FINAL' } };
      let eventHandler: (data: any) => void;

      const mockOn = vi.fn().mockImplementation((key, handler) => {
        eventHandler = handler;
        return vi.fn();
      });
      client['coreSdk'] = { on: mockOn } as any;

      const onData = vi.fn();
      client.subscribe(eventKey, { onData });

      // Simulate event being received
      eventHandler!(eventData);

      expect(onData).toHaveBeenCalledWith(eventData);
      expect(logger.debug).toHaveBeenCalledWith(`Received event data for ${eventKey}:`, eventData);
    });

    it('should call onError callback when error occurs in handler', () => {
      client = new ClientSDK(config);
      const eventKey = 'pages.content.layoutUpdated';
      const eventData = { ItemId: '123' };
      let eventHandler: (data: any) => void;

      const mockOn = vi.fn().mockImplementation((key, handler) => {
        eventHandler = handler;
        return vi.fn();
      });
      client['coreSdk'] = { on: mockOn } as any;

      const onData = vi.fn().mockImplementation(() => {
        throw new Error('Handler error');
      });
      const onError = vi.fn();
      client.subscribe(eventKey, { onData, onError });

      // Simulate event being received
      eventHandler!(eventData);

      expect(onError).toHaveBeenCalledWith(expect.any(Error));
      expect(logger.error).toHaveBeenCalledWith(
        `Error in onData callback for ${eventKey}:`,
        expect.any(Error),
      );
    });

    it('should call onError callback when subscription fails', () => {
      client = new ClientSDK(config);
      const eventKey = 'pages.content.layoutUpdated';
      const subscriptionError = new Error('Subscription failed');

      const mockOn = vi.fn().mockImplementation(() => {
        throw subscriptionError;
      });
      client['coreSdk'] = { on: mockOn } as any;

      const onData = vi.fn();
      const onError = vi.fn();
      const unsubscribe = client.subscribe(eventKey, { onData, onError });

      expect(onError).toHaveBeenCalledWith(subscriptionError);
      expect(logger.error).toHaveBeenCalledWith(`Failed to subscribe to event ${eventKey}:`, subscriptionError);
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('should call unsubscribe function when unsubscribe is called', () => {
      client = new ClientSDK(config);
      const eventKey = 'pages.content.layoutUpdated';
      const mockUnsubscribe = vi.fn();
      const mockOn = vi.fn().mockReturnValue(mockUnsubscribe);
      client['coreSdk'] = { on: mockOn } as any;

      const onData = vi.fn();
      const unsubscribe = client.subscribe(eventKey, { onData });

      unsubscribe();

      expect(mockUnsubscribe).toHaveBeenCalled();
      expect(logger.debug).toHaveBeenCalledWith(`Unsubscribing from event: ${eventKey}`);
    });

    it('should return no-op unsubscribe function when subscription fails', () => {
      client = new ClientSDK(config);
      const eventKey = 'pages.content.layoutUpdated';
      const subscriptionError = new Error('Subscription failed');

      const mockOn = vi.fn().mockImplementation(() => {
        throw subscriptionError;
      });
      client['coreSdk'] = { on: mockOn } as any;

      const onData = vi.fn();
      const unsubscribe = client.subscribe(eventKey, { onData });

      // Should not throw when calling unsubscribe even if subscription failed
      expect(() => unsubscribe()).not.toThrow();
    });

    it('should subscribe to fieldsUpdated event', () => {
      client = new ClientSDK(config);
      const eventKey = 'pages.content.fieldsUpdated';
      const eventData = {
        ItemId: '123',
        Language: 'en',
        ItemVersion: 1,
        fields: [{ fieldId: 'field1', value: 'value1' }],
      };
      let eventHandler: (data: any) => void;

      const mockOn = vi.fn().mockImplementation((key, handler) => {
        eventHandler = handler;
        return vi.fn();
      });
      client['coreSdk'] = { on: mockOn } as any;

      const onData = vi.fn();
      client.subscribe(eventKey, { onData });

      // Simulate event being received
      eventHandler!(eventData);

      expect(onData).toHaveBeenCalledWith(eventData);
      expect(mockOn).toHaveBeenCalledWith(eventKey, expect.any(Function));
    });
  });
});
