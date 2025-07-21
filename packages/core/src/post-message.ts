import { CoreError, ErrorCode } from './errors';
import { EventEmitter } from './event-emitter';
import { HandshakeManager } from './handshake-manager';
import { v4 as uuidV4 } from 'uuid';
import {
  Message,
  RequestMessage,
  ResponseMessage,
  EventMessage,
  HandshakeMessage,
  HandshakeResponseMessage,
  CoreSDKConfig,
  HandshakeConfig,
} from './types';
import { AllowedOrigins } from './allowed-origins';

const DEFAULT_TIMEOUT = 30000; // 30 seconds

/**
 * PostMessageBridge handles the communication between host and client applications
 * through the postMessage API. It provides:
 * - Type-safe message passing
 * - Request/response handling with timeouts
 * - Event emission and subscription
 * - Origin validation
 * - Handshake protocol for secure initialization
 */
export class PostMessageBridge {
  private eventEmitter = new EventEmitter();
  private handshakeManager: HandshakeManager | null = null;

  /**
   * Stores pending requests with their resolve/reject handlers and timeout references.
   * The type parameter R represents the expected response type for each request.
   */
  private pendingRequests = new Map<
    string,
    {
      resolve: (value: any) => void;
      reject: (error: Error) => void;
      timeout: NodeJS.Timeout;
    }
  >();

  // Store request handlers for incoming requests.
  private requestHandlers = new Map<string, (payload: any) => Promise<any> | any>();

  // Store buffered messages received before the target was available
  private bufferedMessages: Array<{ message: Message, origin: string }> = [];

  private initialized = false;
  private source = 'sitecore-marketplace-sdk';
  private connected = false;
  private listenerMode = false;
  private sessionId?: string;
  private sdkType: 'host' | 'client' | undefined;

  constructor(private config: CoreSDKConfig) {
    window.addEventListener('message', this.handleMessage);
    
    // If no target is provided, we're in listener mode
    this.listenerMode = !config.target;
  }

  /**
   * Sets or updates the target window for postMessage communication.
   * This is useful for host applications that need to establish the iframe
   * target after the SDK is already initialized.
   * 
   * @param target - The target window to communicate with (typically iframe.contentWindow)
   */
  public setTarget(target: Window): void {
    if (!target) {
      throw this.formatError(new CoreError(
        ErrorCode.INVALID_REQUEST,
        'Target window cannot be null or undefined'
      ));
    }

    this.config.target = target;
    this.listenerMode = false;
    
    // Process any pending handshake init messages
    if (this.handshakeManager && this.handshakeManager.hasPendingInitMessage()) {
      this.handshakeManager.processPendingInitMessage((message) => {
        this.postMessage(message);
        this.connected = true;
      });
    }
    
    // Process any buffered messages
    if (this.bufferedMessages.length > 0) {
      console.debug(`[${this.sdkType} PostMessageBridge] Processing ${this.bufferedMessages.length} buffered messages`);
      
      // Create a copy of the buffer to iterate over as we'll be clearing it
      const messagesToProcess = [...this.bufferedMessages];
      this.bufferedMessages = [];
      
      // Process each buffered message
      for (const { message, origin } of messagesToProcess) {
        this.processMessage(message, origin);
      }
    }
  }

  /**
   * Prefixes an error's message with the current SDK type (if available).
   * For example, errors will be transformed into "[client SDK] <original error message>".
   * @param error - The error to format.
   * @returns The updated error.
   */
  private formatError(error: Error): Error {
    const sdkTypePrefix = this.sdkType ? `[${this.sdkType} SDK] ` : '[SDK] ';
    error.message = sdkTypePrefix + error.message;
    return error;
  }

  /**
   * Initializes the bridge with basic configuration.
   * This only sets up the event listeners and basic configuration but doesn't perform the handshake yet.
   * 
   * @param handshakeConfig - Configuration for the handshake
   */
  initialize(handshakeConfig: HandshakeConfig): void {
    if (this.initialized) {
      throw this.formatError(CoreError.alreadyInitialized());
    }

    this.sdkType = handshakeConfig.type;
    this.initialized = true;
    
    // Create the handshake manager
    this.handshakeManager = new HandshakeManager({
      type: handshakeConfig.type,
      targetOrigin: handshakeConfig.targetOrigin,
      selfOrigin: handshakeConfig.selfOrigin,
      version: handshakeConfig.version,
      timeout: this.config.timeout || DEFAULT_TIMEOUT,
    });

    // For the host, we just initialize the handshake manager
    if (handshakeConfig.type === 'host') {
      this.handshakeManager.initializeHost();
    }
  }

  /**
   * Connects the bridge by performing the handshake process.
   * For the client, this sends the handshake init message.
   * For the host, the connection is considered complete once a handshake init message is received and responded to.
   * 
   * @returns A promise that resolves when the connection is established.
   */
  async connect(): Promise<void> {
    if (!this.initialized) {
      throw this.formatError(CoreError.notInitialized());
    }

    if (this.connected) {
      return;
    }

    if (!this.handshakeManager) {
      throw this.formatError(new CoreError(
        ErrorCode.INITIALIZATION_ERROR,
        'Handshake manager not initialized'
      ));
    }

    // For the client, we need to send the handshake init message
    if (this.sdkType === 'client') {
      if (this.listenerMode || !this.config.target) {
        throw this.formatError(new CoreError(
          ErrorCode.INVALID_STATE,
          'Cannot connect in listener mode without a target. Set target first.'
        ));
      }

      try {
        await this.handshakeManager.initializeClient((message) => {
          this.postMessage(message);
        });
        this.connected = true;
      } catch (error) {
        throw this.formatError(error as Error);
      }
    }
    
    // For the host, the connection is considered complete when handshakeManager.isHandshakeComplete() is true
    // This happens after a handshake init message is received and responded to
    if (this.sdkType === 'host' && this.handshakeManager.isHandshakeComplete()) {
      this.connected = true;
    }
  }

  /**
   * Sends a request to the other side and waits for a response.
   * @param action - The action to perform
   * @param payload - Optional data to send with the request
   * @returns Promise that resolves with the response data
   */
  async request<T, R>(action: string, payload?: T): Promise<R> {
    this.ensureConnected();

    const id = this.generateId();
    const message: RequestMessage = {
      id,
      type: 'request',
      action,
      payload,
      timestamp: Date.now(),
    };

    // Log outbound request details.
    console.debug(
      `[${this.sdkType} PostMessageBridge] Outbound Request - Action: ${action}, Message:`,
      message,
    );

    return new Promise<R>((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(
            this.formatError(
              CoreError.timeout(
                `Request for action "${action}" timed out after ${this.config.timeout || DEFAULT_TIMEOUT} ms.`,
              ),
            ),
          );
        }
      }, this.config.timeout || DEFAULT_TIMEOUT);

      this.pendingRequests.set(id, { resolve, reject, timeout });
      this.postMessage(message);
    });
  }

  /**
   * Emits an event to the other side.
   * @param event - Event name
   * @param payload - Data to send with the event
   */
  emit<T>(event: string, payload: T): void {
    this.ensureConnected();

    const message: EventMessage = {
      id: this.generateId(),
      type: 'event',
      event,
      payload,
      timestamp: Date.now(),
    };

    this.postMessage(message);
  }

  /**
   * Subscribes to events from the other side.
   * @param event - Event name to listen for
   * @param handler - Callback to handle the event data
   * @returns Function to unsubscribe from the event
   */
  on<T>(event: string, handler: (data: T) => void): () => void {
    return this.eventEmitter.on(event, handler);
  }

  /**
   * Cleans up all resources used by the bridge.
   * Should be called when the bridge is no longer needed.
   */
  destroy(): void {
    window.removeEventListener('message', this.handleMessage);
    this.eventEmitter.clear();
    this.pendingRequests.forEach(({ timeout }) => clearTimeout(timeout));
    this.pendingRequests.clear();
    this.bufferedMessages = [];
    this.handshakeManager = null;
    this.initialized = false;
    this.connected = false;
  }

  /**
   * Handles incoming postMessage events.
   * Validates origin and routes messages to appropriate handlers.
   */
  private handleMessage = (event: MessageEvent): void => {
    const message = event.data as Message;

    if (!message.source || message.source !== this.source) {
      // This ensures that the message is from the SDK and not from another source.
      return;
    }

    // Determine the expected origin.
    try {
      let isValidOrigin = this.isValidOrigin(event, message);
      if (!isValidOrigin) {
        const error = this.formatError(CoreError.invalidOrigin(event.origin));
        console.warn(error);
        // If the message comes from an unexpected origin, simply ignore it.
        return;
      }
    } catch (error) {
      console.warn(`[${this.sdkType} PostMessageBridge] Error parsing origin:`, error);
      return;
    }
    
    // If we're in listener mode (no target yet), buffer the message for later processing
    if (this.listenerMode || !this.config.target) {
      if (message.type === 'handshake') {
        // For handshake messages in listener mode, we can still handle them 
        // but can't respond until we have a target
        if (this.handshakeManager) {
          this.handshakeManager.handleHandshakeMessage(
            message as HandshakeMessage | HandshakeResponseMessage
          );
        }
      }
      
      // Buffer the message for processing once we have a target
      this.bufferedMessages.push({ message, origin: event.origin });
      console.debug(`[${this.sdkType} PostMessageBridge] Buffering message in listener mode:`, message);
      return;
    }
    
    // Process the message normally if we have a target
    this.processMessage(message, event.origin);
  };

  private isValidOrigin(event: MessageEvent, message: Message): boolean {
    let isValidOrigin = false;

    // For client SDK, we need to validate the origin during the handshake.
    if (this.sdkType === 'client' && message.type === 'handshake' && this.isNullOrEmpty(this.config.targetOrigin)) {
      isValidOrigin = AllowedOrigins.some(origin => event.origin.includes(origin));
      //Once origin is confirmed, targetOrigin will not be null
      if (isValidOrigin) {
        this.config.targetOrigin = event.origin;
      }
    } else {
      let expectedOrigin = this.config.targetOrigin!;
      const eventOriginUrl = new URL(event.origin);
      const expectedOriginUrl = new URL(expectedOrigin);

      console.debug(
        `[${this.sdkType} PostMessageBridge] Received message:`,
        event.data,
        `from origin: ${eventOriginUrl.origin}. Expected origin: ${expectedOriginUrl.origin}`,
      );

      isValidOrigin = eventOriginUrl.origin === expectedOriginUrl.origin;
    }

    return isValidOrigin;
  }

  /**
   * Processes a message after origin validation.
   * 
   * @param message - The message to process
   * @param origin - The origin the message came from
   */
  private processMessage(message: Message, origin: string): void {
    // Handle handshake messages
    if (message.type === 'handshake') {
      if (this.handshakeManager) {
        this.handshakeManager.handleHandshakeMessage(
          message as HandshakeMessage | HandshakeResponseMessage,
          (responseMessage) => {
            this.postMessage(responseMessage);
            this.connected = true;
          }
        );
      }
      return;
    }

    // Don't process other message types until connected
    if (!this.connected && this.sdkType === 'client') {
      console.warn(`[${this.sdkType} PostMessageBridge] Ignoring message, not connected yet:`, message);
      return;
    }

    switch (message.type) {
      case 'response':
        this.handleResponse(message as ResponseMessage);
        break;
      case 'event':
        this.handleEvent(message as EventMessage);
        break;
      case 'request':
        this.handleRequest(message as RequestMessage);
        break;
      default:
        break;
    }
  }

  /**
   * Handles response messages by resolving their corresponding pending requests.
   */
  private handleResponse(message: ResponseMessage): void {
    // Log inbound response details.
    console.debug(
      `[${this.sdkType} PostMessageBridge] Handling response for message ID: ${message.id}`,
      message,
    );

    const pending = this.pendingRequests.get(message.id);
    if (!pending) return;

    const { resolve, reject, timeout } = pending;
    clearTimeout(timeout);
    this.pendingRequests.delete(message.id);

    if (message.success) {
      resolve(message.data);
    } else {
      if (message.error) {
        reject(
          this.formatError(
            new CoreError(message.error.code, message.error.message, message.error.details),
          ),
        );
      } else {
        reject(this.formatError(new CoreError(ErrorCode.UNKNOWN_ERROR, 'Unknown error')));
      }
    }
  }

  /**
   * Handles event messages by emitting them through the event emitter.
   */
  private handleEvent(message: EventMessage): void {
    this.eventEmitter.emit(message.event, message.payload);
  }

  /**
   * Handles incoming request messages by invoking the corresponding registered handler and sending back a response.
   * If no handler is registered, sends an error response.
   * @param message - The received request message.
   */
  private async handleRequest(message: RequestMessage): Promise<void> {
    console.debug(
      `[${this.sdkType} PostMessageBridge] Handling request for action: ${message.action}`,
      message,
    );

    const fullKey = message.action.split(':');
    const actionWithoutPostfix = fullKey[0];
    const handler = this.requestHandlers.get(message.action) ?? this.requestHandlers.get(actionWithoutPostfix);
    const catchAllHandler = this.requestHandlers.get('*');
    if (!handler && !catchAllHandler) {
      // No handler registered for this action, send an error response.
      const response: ResponseMessage = {
        id: message.id,
        type: 'response',
        success: false,
        error: {
          code: ErrorCode.METHOD_NOT_FOUND,
          message: `No handler found for request action "${message.action}".`,
        },
        timestamp: Date.now(),
      };
      this.postMessage(response);
      return;
    }

    try {
      let result;
      if (handler) {
        result = await handler(message.payload);
      } else if (catchAllHandler) {
        result = await catchAllHandler(message);
      }
      const response: ResponseMessage = {
        id: message.id,
        type: 'response',
        success: true,
        data: result,
        timestamp: Date.now(),
      };
      this.postMessage(response);
    } catch (err: any) {
      const response: ResponseMessage = {
        id: message.id,
        type: 'response',
        success: false,
        error: {
          code: ErrorCode.EXECUTION_ERROR,
          message: err?.message || 'Error processing request',
          details: err,
        },
        timestamp: Date.now(),
      };
      this.postMessage(response);
    }
  }

  /**
   * Sends a message to the other side through postMessage.
   */
  private postMessage(message: Message): void {
    if (this.listenerMode || !this.config.target) {
      throw this.formatError(new CoreError(
        ErrorCode.INVALID_STATE,
        'Cannot send messages in listener mode. Set target first.'
      ));
    }

    // Detailed logging added for tracing sent messages.
    message.source = this.source;
    console.debug(
      `[${this.sdkType} PostMessageBridge] Sending message:`,
      message,
      `to targetOrigin: ${this.config.targetOrigin}`,
    );

    // Only client can be null for targetOrigin
    let targetOrigin : string;
    if(this.isNullOrEmpty(this.config.targetOrigin)){
      targetOrigin = "*";
    }
    else{
      targetOrigin = this.config.targetOrigin!;
    }

    this.config.target.postMessage(message, targetOrigin);
  }

  private isNullOrEmpty(prop: string | undefined): boolean {
    return prop == null || prop === "";
  }

  /**
   * Generates a unique message ID.
   */
  private generateId(): string {
    return uuidV4();
  }

  /**
   * Ensures the bridge is initialized and connected before allowing operations.
   * @throws {CoreError} If the bridge is not initialized or connected
   */
  private ensureConnected(): void {
    if (!this.initialized) {
      throw this.formatError(CoreError.notInitialized());
    }
    
    if (this.listenerMode || !this.config.target) {
      throw this.formatError(new CoreError(
        ErrorCode.INVALID_STATE,
        'Cannot perform operations in listener mode. Set target first.'
      ));
    }
    
    if (!this.connected && this.sdkType === 'client') {
      throw this.formatError(new CoreError(
        ErrorCode.NOT_CONNECTED,
        'Bridge is not connected. Call connect() first.'
      ));
    }
  }

  /**
   * Registers a request handler for incoming requests.
   * @param action - The action to register the handler for
   * @param handler - The handler function to register
   */
  public onRequest<T, R>(action: string, handler: (payload: T) => Promise<R> | R): void {
    this.requestHandlers.set(action, handler);
  }

  /**
   * Checks if the bridge is connected.
   * @returns True if the bridge is connected, false otherwise.
   */
  public isConnected(): boolean {
    return this.connected;
  }

  /**
   * Checks if the bridge is in listener mode (no target set).
   * @returns True if in listener mode, false otherwise
   */
  public isInListenerMode(): boolean {
    return this.listenerMode;
  }
}
