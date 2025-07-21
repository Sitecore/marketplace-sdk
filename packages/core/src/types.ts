import { ErrorCode } from './errors';
import { UserInfo } from './shared-types';

/**
 * Configuration for the Core SDK.
 */
export interface CoreSDKConfig {
  /** The target window to communicate with (e.g., iframe.contentWindow) */
  target?: Window;
  /** The origin of the target (e.g., "https://example.com") */
  targetOrigin?: string;
  /** The origin of the current window (usually window.location.origin) */
  selfOrigin: string;
  /** Optional timeout for requests in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Configuration for the handshake process.
 */
export interface HandshakeConfig {
  /** Indicates whether this is the host or client side */
  type: 'host' | 'client';
  /** The origin of the target (e.g., "https://example.com") */
  targetOrigin?: string;
  /** The origin of the current window (usually window.location.origin) */
  selfOrigin: string;
  /** Version of the SDK for compatibility checking */
  version: string;
}

/**
 * Base message interface for all message types.
 */
export interface BaseMessage {
  /** Unique identifier for the message */
  id: string;
  /** Message type ("request", "response", "event", or "handshake") */
  type: 'request' | 'response' | 'event' | 'handshake';
  /** Timestamp when the message was created */
  timestamp: number;
  /** Source identifier for the message */
  source?: string;
}

/**
 * Handshake message sent to initiate or respond to a handshake.
 */
export interface HandshakeMessage extends BaseMessage {
  /** Message type is always "handshake" */
  type: 'handshake';
  /** The handshake event (e.g., "handshake:init") */
  event: string;
  /** Type of handshake (request or response) */
  handshakeType: 'request' | 'response';
  /** Type of SDK (host or client) */
  sdkType: 'host' | 'client';
  /** Version of the SDK for compatibility checking */
  version: string;
}

/**
 * Handshake response message sent by the host to the client.
 */
export interface HandshakeResponseMessage extends HandshakeMessage {
  /** Handshake type is always response for this message */
  handshakeType: 'response';
  /** Indicates whether the handshake was successful */
  success: boolean;
  /** Error information if the handshake failed */
  error?: {
    /** Error code */
    code: string;
    /** Error message */
    message: string;
  };
}

/**
 * Request message sent to perform an action.
 */
export interface RequestMessage<T = unknown> extends BaseMessage {
  /** Message type is always "request" */
  type: 'request';
  /** The action to perform (e.g., "host.user") */
  action: string;
  /** Optional payload data for the request */
  payload?: T;
}

/**
 * Response message sent in reply to a request.
 */
export interface ResponseMessage<T = unknown> extends BaseMessage {
  /** Message type is always "response" */
  type: 'response';
  /** Indicates whether the request was successful */
  success: boolean;
  /** Response data if the request was successful */
  data?: T;
  /** Error information if the request failed */
  error?: {
    /** Error code */
    code: ErrorCode;
    /** Error message */
    message: string;
    /** Optional additional details about the error */
    details?: unknown;
  };
}

/**
 * Event message sent to notify about an event.
 */
export interface EventMessage<T = unknown> extends BaseMessage {
  /** Message type is always "event" */
  type: 'event';
  /** The event name */
  event: string;
  /** Optional payload data for the event */
  payload?: T;
}

/**
 * Union type of all possible message types.
 */
export type Message = RequestMessage | ResponseMessage | EventMessage | HandshakeMessage;

export interface MessageHandler {
  onRequest: (message: RequestMessage) => Promise<unknown>;
  onEvent: (message: EventMessage) => void;
}

export interface HandshakeResponse {
  success: boolean;
  error?: Error;
  sessionId?: string;
}

// Base interfaces for Host Schema
export interface IframeMetadata {
  width: string;
  height: string;
  sandbox: string;
}

export interface BaseHostSchema {
  version: string;
  iframeMetadata: IframeMetadata;
  methods: {
    getUserInfo: () => Promise<UserInfo>;
  };
}

// Security Types
export interface SecurityConfig {
  trustedOrigins: string[];
  encryptionKey?: string;
}

// Extended Schema Types (for specific implementations)
export interface PortalSchema extends BaseHostSchema {
  methods: BaseHostSchema['methods'] & {
    getAdditionalData: () => Promise<AdditionalData>;
  };
}

export interface AdditionalData {
  featureFlag: boolean;

  [key: string]: unknown;
}