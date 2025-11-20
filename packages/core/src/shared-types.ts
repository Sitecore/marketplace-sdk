// Common types shared between Host and Client
export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface GenericRequestData {
  /**
   * An optional context ID associated with the request.
   * This can be used to identify or group related requests.
   */
  contextId?: string;

  /**
   * The API endpoint path, which can be relative or absolute.
   * For example: '/api/resource' or 'https://example.com/api/resource'.
   */
  path: string;

  /**
   * The HTTP method to use for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * Defaults to 'GET' if not specified.
   */
  method?: string;

  /**
   * Optional headers to include in the request.
   * These headers can be used to provide additional metadata or configuration
   * for the request, such as authentication tokens or content type.
   */
  headers?: Record<string, string>;

  /**
   * The request body, which must be provided as an ArrayBuffer.
   * This is typically used for sending binary data or serialized content.
   */
  body?: ArrayBuffer;

  /**
   * Indicates whether authentication is required for the request.
   * If true, the request will include authentication headers or tokens.
   */
  requiresAuth: boolean;
}

export class GenericResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: ArrayBuffer;

  constructor(
    status: number,
    statusText: string,
    headers: Record<string, string>,
    body: ArrayBuffer,
  ) {
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.body = body;
  }

  /**
   * Parses the body of the response as JSON.
   * @returns {Promise<any>} The parsed JSON object.
   */
  async json(): Promise<any> {
    return JSON.parse(await this.text());
  }

  /**
   * Parses the body of the response as a string.
   * @returns {Promise<string>} The parsed text.
   */
  text(): Promise<string> {
    return Promise.resolve(new TextDecoder().decode(this.body));
  }

  /**
   * Returns the body as an ArrayBuffer.
   * @returns {Promise<ArrayBuffer>} The raw binary data.
   */
  arrayBuffer(): Promise<ArrayBuffer> {
    return Promise.resolve(this.body);
  }

  /**
   * Returns the body as a Blob.
   * @returns {Promise<Blob>} The Blob representation of the response body.
   */
  blob(): Promise<Blob> {
    return Promise.resolve(
      new Blob([this.body], {
        type: this.headers['content-type'] || 'application/octet-stream',
      }),
    );
  }
}

/**
 * Represents a resource in an application runtime context.
 */
export interface ApplicationResourceContext {
  resourceId: string;
  tenantId: string;
  tenantName?: string;
  tenantDisplayName?: string;
  context: {
    live: string;
    preview: string;
  };
  [key: string]: any;
}

/**
 * Represents a touchpoint metadata in an application runtime context.
 * @deprecated Use ApplicationExtensionPointMetaContext instead
 */
export interface ApplicationTouchpointMetaContext {
  route: string;
  id: string;
  title?: string;
  description?: string;
  iconUrl?: string;
  pictureUrl?: string;
  developerName?: string;
  display?: string;
  [key: string]: any;
}

/**
 * Represents an extension point metadata in an application runtime context.
 */
export interface ApplicationExtensionPointMetaContext {
  route: string;
  id: string;
  title?: string;
  description?: string;
  iconUrl?: string;
  pictureUrl?: string;
  developerName?: string;
  display?: string;
  [key: string]: any;
}

/**
 * Represents a touchpoint in an application runtime context.
 * @deprecated Use ApplicationExtensionPointContext instead
 */
export interface ApplicationTouchpointContext {
  touchpointId: string;
  route?: string;
  meta?: ApplicationTouchpointMetaContext[];
  [key: string]: any;
}

/**
 * Represents an extension point in an application runtime context.
 */
export interface ApplicationExtensionPointContext {
  extensionPointId: string;
  route?: string;
  meta?: ApplicationExtensionPointMetaContext[];
  [key: string]: any;
}

export interface ApplicationContext {
  id: string;
  url: string;
  name?: string;
  type?: string;
  iconUrl?: string;
  state?: string;
  installationId?: string;
  MarketplaceAppTenantId?: string;
  organizationId?: string;
  permissions?: Permissions;
  /** @deprecated Use resourceAccess instead */
  resources?: ApplicationResourceContext[];
  /** @deprecated Use extensionPoints instead */
  touchpoints?: ApplicationTouchpointContext[];
  resourceAccess?: ApplicationResourceContext[];
  extensionPoints?: ApplicationExtensionPointContext[];
  [key: string]: any;
}

/**
 * Represents a collection of permission settings for different contexts.
 */
export interface Permissions {
  iframe?: IFramePermission;
  [key: string]: any;
}

/**
 * Represents iframe permission settings for sandbox and allow attributes.
 */
export interface IFramePermission {
  /** Array of sandbox permissions (e.g., "allow-popups", "allow-popups-to-escape-sandbox") */
  sandbox?: string[];
  /** Array of allow permissions (e.g., "clipboard-write", "clipboard-read") */
  allow?: string[];
  [key: string]: any;
}

/**
 * Represents the runtime context of an application.
 */
export interface ApplicationRuntimeContext {
  installationId: string;
  MarketplaceAppTenantId?: string;
  organizationId?: string;
  application: {
    id: string;
    name: string;
    type: string;
    url: string;
    iconUrl?: string;
    state: string;
    [key: string]: any;
  };
  permissions?: Permissions;
  /** @deprecated Use resourceAccess instead */
  resources?: ApplicationResourceContext[];
  /** @deprecated Use extensionPoints instead */
  touchpoints?: ApplicationTouchpointContext[];
  resourceAccess?: ApplicationResourceContext[];
  extensionPoints?: ApplicationExtensionPointContext[];
  [key: string]: any;
}

/**
 * External URL navigation payload.
 */
export interface ExternalUrlPayload {
  /** The URL to navigate to */
  url: string;
  /** Whether to open the URL in a new tab */
  newTab?: boolean;
}

/**
 * Parameters for Pages Context mutation.
 */
export interface PagesContextParams {
  itemId?: string;
  language?: string;
  itemVersion?: number;
}
