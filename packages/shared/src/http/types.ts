import type { Auth, AuthToken } from './auth';
import type { Middleware } from './interceptors';
import type { BodySerializer, QuerySerializer, QuerySerializerOptions } from './serializers';

export interface ClientOptions {
  baseUrl?: string;
  throwOnError?: boolean;
}

export interface Config<T extends ClientOptions = ClientOptions> extends Omit<
  RequestInit,
  'body' | 'headers' | 'method'
> {
  /**
   * Auth token or a function returning auth token. The resolved value will be
   * added to the request payload as defined by its `security` array.
   */
  auth?: ((auth: Auth) => Promise<AuthToken> | AuthToken) | AuthToken;
  /**
   * Base URL for all requests made by this client.
   */
  baseUrl?: T['baseUrl'];
  /**
   * A function for serializing request body parameter. By default,
   * {@link JSON.stringify()} will be used.
   */
  bodySerializer?: BodySerializer | null;
  /**
   * Fetch API implementation. You can use this option to provide a custom
   * fetch instance.
   *
   * @default globalThis.fetch
   */
  fetch?: (request: Request) => ReturnType<typeof fetch>;
  /**
   * An object containing any HTTP headers that you want to pre-populate your
   * `Headers` object with.
   *
   * {@link https://developer.mozilla.org/docs/Web/API/Headers/Headers#init See more}
   */
  headers?:
    | RequestInit['headers']
    | Record<
        string,
        string | number | boolean | (string | number | boolean)[] | null | undefined | unknown
      >;
  /**
   * The request method.
   *
   * {@link https://developer.mozilla.org/docs/Web/API/fetch#method See more}
   */
  method?: 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
  /**
   * Return the response data parsed in a specified format. By default, `auto`
   * will infer the appropriate method from the `Content-Type` response header.
   * You can override this behavior with any of the {@link Body} methods.
   * Select `stream` if you don't want to parse response data at all.
   *
   * @default 'auto'
   */
  parseAs?: Exclude<keyof Body, 'body' | 'bodyUsed'> | 'auto' | 'stream';
  /**
   * A function for serializing request query parameters. By default, arrays
   * will be exploded in form style, objects will be exploded in deepObject
   * style, and reserved characters are percent-encoded.
   *
   * {@link https://swagger.io/docs/specification/serialization/#query View examples}
   */
  querySerializer?: QuerySerializer | QuerySerializerOptions;
  /**
   * A function transforming response data before it's returned. This is useful
   * for post-processing data, e.g. converting ISO strings into Date objects.
   */
  responseTransformer?: (data: unknown) => Promise<unknown>;
  /**
   * A function validating response data. This is useful if you want to ensure
   * the response conforms to the desired shape, so it can be safely passed to
   * the transformers and returned to the user.
   */
  responseValidator?: (data: unknown) => Promise<unknown>;
  /**
   * Throw an error instead of returning it in the response?
   *
   * @default false
   */
  throwOnError?: T['throwOnError'];
}

export interface RequestOptions<
  ThrowOnError extends boolean = boolean,
  Url extends string = string,
> extends Config<{
  throwOnError: ThrowOnError;
}> {
  /**
   * Any body that you want to add to your request.
   *
   * {@link https://developer.mozilla.org/docs/Web/API/fetch#body}
   */
  body?: unknown;
  path?: Record<string, unknown>;
  query?: Record<string, unknown>;
  /**
   * Security mechanism(s) to use for the request.
   */
  security?: ReadonlyArray<Auth>;
  url: Url;
}

export type RequestResult<
  TData = unknown,
  TError = unknown,
  ThrowOnError extends boolean = boolean,
> = ThrowOnError extends true
  ? Promise<{
      data: TData;
      request: Request;
      response: Response;
    }>
  : Promise<
      (
        | {
            data: TData;
            error: undefined;
          }
        | {
            data: undefined;
            error: TError;
          }
      ) & {
        request: Request;
        response: Response;
      }
    >;

type MethodFn = <TData = unknown, TError = unknown, ThrowOnError extends boolean = false>(
  options: Omit<RequestOptions<ThrowOnError>, 'method'>,
) => RequestResult<TData, TError, ThrowOnError>;

type RequestFn = <TData = unknown, TError = unknown, ThrowOnError extends boolean = false>(
  options: Omit<RequestOptions<ThrowOnError>, 'method'> &
    Pick<Required<RequestOptions<ThrowOnError>>, 'method'>,
) => RequestResult<TData, TError, ThrowOnError>;

type BuildUrlFn = <
  TData extends {
    body?: unknown;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    url: string;
  },
>(
  options: Pick<TData, 'url'> & Options<TData>,
) => string;

interface BaseClient {
  /**
   * Returns the final request URL.
   */
  buildUrl: BuildUrlFn;
  connect: MethodFn;
  delete: MethodFn;
  get: MethodFn;
  getConfig: () => Config;
  head: MethodFn;
  options: MethodFn;
  patch: MethodFn;
  post: MethodFn;
  put: MethodFn;
  request: RequestFn;
  setConfig: (config: Config) => Config;
  trace: MethodFn;
}

// Declared as an intersection, like the `Client` type of `@hey-api/client-fetch` 0.8.3, so the
// type stays identical to the one the generated SDK functions exposed before.
export type Client = BaseClient & {
  interceptors: Middleware<Request, Response, unknown, RequestOptions>;
};

/**
 * The `createClientConfig()` function will be called on client initialization
 * and the returned object will become the client's initial configuration.
 */
export type CreateClientConfig<T extends ClientOptions = ClientOptions> = (
  override?: Config<ClientOptions & T>,
) => Config<Required<ClientOptions> & T>;

export interface TDataShape {
  body?: unknown;
  headers?: unknown;
  path?: unknown;
  query?: unknown;
  url: string;
}

type OmitKeys<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Options<
  TData extends TDataShape = TDataShape,
  ThrowOnError extends boolean = boolean,
> = OmitKeys<RequestOptions<ThrowOnError>, 'body' | 'path' | 'query' | 'url'> & Omit<TData, 'url'>;
