import { EventEmitter } from './event-emitter';
import { CoreError, ErrorCode } from './errors';
import { HandshakeConfig, HandshakeMessage, HandshakeResponseMessage } from './types';

const HANDSHAKE_INIT_EVENT = 'handshake:init';
const HANDSHAKE_RESPONSE_EVENT = 'handshake:response';
const RETRY_DELAY = 2000; // 2 seconds between retries
const MAX_RETRIES = 5;

export interface HandshakeManagerConfig {
  type: 'host' | 'client';
  targetOrigin?: string;
  selfOrigin: string;
  version: string;
  timeout?: number;
}

/**
 * HandshakeManager handles the handshake process between host and client applications.
 * It abstracts the complexity of establishing a secure connection between the two sides.
 */
export class HandshakeManager {
  private eventEmitter = new EventEmitter();
  private handshakeComplete = false;
  private retryCount = 0;
  private retryTimeout: NodeJS.Timeout | null = null;
  private pendingInitMessage: HandshakeMessage | null = null;
  
  constructor(private config: HandshakeManagerConfig) {}

  /**
   * Initializes the handshake process for the client side.
   * This method sends a handshake initialization message and waits for a response.
   * 
   * @returns A promise that resolves when the handshake is complete.
   */
  public async initializeClient(sendMessage: (message: HandshakeMessage) => void): Promise<void> {
    if (this.handshakeComplete) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      const initTimeout = setTimeout(() => {
        if (!this.handshakeComplete && this.retryCount < MAX_RETRIES) {
          this.retryCount++;
          console.debug(`[client SDK] Handshake timeout, retrying (${this.retryCount}/${MAX_RETRIES})...`);
          this.retryTimeout = setTimeout(() => {
            this.initializeClient(sendMessage).then(resolve).catch(reject);
          }, RETRY_DELAY);
        } else if (!this.handshakeComplete) {
          reject(new CoreError(ErrorCode.TIMEOUT, '[client SDK] Handshake timed out after maximum retries'));
        }
      }, RETRY_DELAY);

      // Listen for handshake response
      const unsubscribe = this.eventEmitter.on(HANDSHAKE_RESPONSE_EVENT, () => {
        clearTimeout(initTimeout);
        if (this.retryTimeout) {
          clearTimeout(this.retryTimeout);
          this.retryTimeout = null;
        }
        this.handshakeComplete = true;
        unsubscribe();
        resolve();
      });

      // Send handshake init message
      const handshakeMessage: HandshakeMessage = {
        id: this.generateId(),
        type: 'handshake',
        event: HANDSHAKE_INIT_EVENT,
        handshakeType: 'request',
        sdkType: this.config.type,
        version: this.config.version,
        timestamp: Date.now(),
      };
      
      sendMessage(handshakeMessage);
    });
  }

  /**
   * Initializes the handshake process for the host side.
   * This method listens for handshake initialization messages from the client.
   */
  public initializeHost(): void {
    // The host just needs to be ready to receive handshake messages
    // It doesn't proactively send anything
    console.debug('[host SDK] Host handshake manager initialized, waiting for client handshake...');
  }

  /**
   * Handles an incoming handshake message.
   * If it's an initialization message from the client, it will either respond or store it for later.
   * If it's a response message from the host, it will complete the handshake.
   * 
   * @param message The received handshake message
   * @param sendResponse Function to send a response back (optional, if not provided will buffer the message)
   */
  public handleHandshakeMessage(
    message: HandshakeMessage | HandshakeResponseMessage,
    sendResponse?: (message: HandshakeResponseMessage) => void
  ): void {
    if (message.type !== 'handshake') {
      return;
    }

    // Client received a handshake response from host
    if (this.config.type === 'client' && message.handshakeType === 'response') {
      console.debug('[client SDK] Received handshake response:', message);
      this.eventEmitter.emit(HANDSHAKE_RESPONSE_EVENT, message);
      this.handshakeComplete = true;
      return;
    }

    // Host received a handshake init from client
    if (this.config.type === 'host' && message.handshakeType === 'request' && message.event === HANDSHAKE_INIT_EVENT) {
      console.debug('[host SDK] Received handshake init:', message);
      
      if (sendResponse) {
        // We can respond immediately
        const responseMessage: HandshakeResponseMessage = {
          id: message.id,
          type: 'handshake',
          event: HANDSHAKE_RESPONSE_EVENT,
          handshakeType: 'response',
          sdkType: this.config.type,
          success: true,
          version: this.config.version,
          timestamp: Date.now(),
        };
        
        sendResponse(responseMessage);
        this.handshakeComplete = true;
      } else {
        // Store the message for later
        console.debug('[host SDK] Buffering handshake init message until iframe is ready');
        this.pendingInitMessage = message;
      }
    }
  }

  /**
   * Checks if there's a pending handshake init message that was received 
   * before the target was ready.
   */
  public hasPendingInitMessage(): boolean {
    return this.pendingInitMessage !== null;
  }

  /**
   * Processes any pending handshake init message that was received before
   * the target was ready.
   * 
   * @param sendResponse Function to send a response
   * @returns True if a pending message was processed, false otherwise
   */
  public processPendingInitMessage(
    sendResponse: (message: HandshakeResponseMessage) => void
  ): boolean {
    if (!this.pendingInitMessage) {
      return false;
    }

    console.debug('[host SDK] Processing buffered handshake init message');
    const message = this.pendingInitMessage;
    this.pendingInitMessage = null;

    const responseMessage: HandshakeResponseMessage = {
      id: message.id,
      type: 'handshake',
      event: HANDSHAKE_RESPONSE_EVENT,
      handshakeType: 'response',
      sdkType: this.config.type,
      success: true,
      version: this.config.version,
      timestamp: Date.now(),
    };
    
    sendResponse(responseMessage);
    this.handshakeComplete = true;
    return true;
  }

  /**
   * Checks if the handshake has been completed.
   * 
   * @returns True if the handshake is complete, false otherwise.
   */
  public isHandshakeComplete(): boolean {
    return this.handshakeComplete;
  }

  /**
   * Resets the handshake state, allowing for a new handshake.
   */
  public reset(): void {
    this.handshakeComplete = false;
    this.retryCount = 0;
    this.pendingInitMessage = null;
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
  }

  /**
   * Generates a unique ID for handshake messages.
   * 
   * @returns A unique ID string.
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}