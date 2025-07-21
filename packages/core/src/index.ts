// Re-export types and errors for consumers
export * from './types';
export * from './errors';
export * from './shared-types';
export * from './constants';

import { PostMessageBridge } from './post-message';
import { CoreSDKConfig, HandshakeConfig } from './types';

/**
 * Core SDK for managing communication between host and client applications.
 * Provides a high-level API for bidirectional communication through postMessage.
 *
 * Features:
 * - Type-safe messaging
 * - Request/response pattern
 * - Event pub/sub system
 * - Secure handshake protocol
 * - Origin validation
 * // TODO: add examples
 */
export class CoreSDK {
  private bridge: PostMessageBridge;

  /**
   * Creates a new instance of the Core SDK.
   * @param config - Configuration options for the SDK
   *
   * Note: If no target is provided in the config, the SDK will be initialized
   * in "listener mode" where it can receive messages but cannot send them until
   * a target is set using setTarget().
   */
  constructor(config: CoreSDKConfig) {
    this.bridge = new PostMessageBridge(config);
  }

  /**
   * Initializes the SDK with basic configuration. This method sets up event listeners
   * but doesn't perform the handshake yet. For the host, this allows listening for
   * handshake messages before the iframe is fully loaded.
   *
   * @param config - Handshake configuration
   * @throws {CoreError} If already initialized or handshake fails
   */
  initialize(config: HandshakeConfig): void {
    this.bridge.initialize(config);
  }

  /**
   * Sets or updates the target window for communication.
   * This is useful for host applications that need to establish the iframe
   * target after the SDK is already initialized.
   *
   * @param target - The target window to communicate with (typically iframe.contentWindow)
   */
  setTarget(target: Window): void {
    this.bridge.setTarget(target);
  }

  /**
   * Connects the SDK by performing the handshake with the other side.
   * For the client, this sends the handshake init message.
   * For the host, this completes the connection once a handshake init message is received and responded to.
   *
   * @returns Promise that resolves when the connection is established
   * @throws {CoreError} If already initialized
   */
  async connect(): Promise<void> {
    return this.bridge.connect();
  }

  /**
   * Checks if the SDK is connected.
   * @returns True if connected, false otherwise
   */
  isConnected(): boolean {
    return this.bridge.isConnected();
  }

  /**
   * Checks if the SDK is in listener mode (no target set yet).
   * @returns True if in listener mode, false otherwise
   */
  isInListenerMode(): boolean {
    return this.bridge.isInListenerMode();
  }

  /**
   * Sends a request to the other side and waits for a response.
   * @param action - The action to perform
   * @param payload - Optional data to send with the request
   * @returns Promise that resolves with the response data
   * @throws {CoreError} If not initialized or request fails
   */
  async request<T, R>(action: string, payload?: T): Promise<R> {
    return this.bridge.request(action, payload);
  }

  /**
   * Emits an event to the other side.
   * @param event - Event name
   * @param payload - Data to send with the event
   * @throws {CoreError} If not initialized
   */
  emit<T>(event: string, payload: T): void {
    this.bridge.emit(event, payload);
  }

  /**
   * Subscribes to events from the other side.
   * @param event - Event name to listen for
   * @param handler - Callback to handle the event data
   * @returns Function to unsubscribe from the event
   */
  on<T>(event: string, handler: (data: T) => void): () => void {
    return this.bridge.on(event, handler);
  }

  /**
   * Registers a request handler for incoming requests.
   * @param action - The action to register the handler for
   * @param handler - The handler function to register
   */
  onRequest<T, R>(action: string, handler: (payload: T) => Promise<R> | R): void {
    this.bridge.onRequest(action, handler);
  }

  /**
   * Cleans up resources and removes event listeners.
   * The SDK instance cannot be used after calling this method.
   */
  destroy(): void {
    this.bridge.destroy();
  }
}
