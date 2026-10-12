import { getAuthToken } from './auth';
import {
  jsonBodySerializer,
  serializeArrayParam,
  serializeObjectParam,
  serializePrimitiveParam,
  type ArraySeparatorStyle,
  type QuerySerializer,
  type QuerySerializerOptions,
} from './serializers';
import type { Client, ClientOptions, Config, RequestOptions } from './types';

interface PathSerializer {
  path: Record<string, unknown>;
  url: string;
}

const PATH_PARAM_RE = /\{[^{}]+\}/g;

// Path segments that URL parsing resolves against the parent segment (WHATWG
// URL single-dot and double-dot segments).
const DOT_SEGMENT_RE = /^(?:\.|%2e){1,2}$/i;

const hasDotSegment = (url: string) =>
  url
    .split(/[?#]/)[0]
    .split('/')
    .some((segment) => DOT_SEGMENT_RE.test(segment));

const defaultPathSerializer = ({ path, url: _url }: PathSerializer) => {
  let url = _url;
  const matches = _url.match(PATH_PARAM_RE);
  if (matches) {
    for (const match of matches) {
      let explode = false;
      let name = match.substring(1, match.length - 1);
      let style: ArraySeparatorStyle = 'simple';

      if (name.endsWith('*')) {
        explode = true;
        name = name.substring(0, name.length - 1);
      }

      if (name.startsWith('.')) {
        name = name.substring(1);
        style = 'label';
      } else if (name.startsWith(';')) {
        name = name.substring(1);
        style = 'matrix';
      }

      const value = path[name];

      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        url = url.replace(match, serializeArrayParam({ explode, name, style, value }));
        continue;
      }

      if (typeof value === 'object') {
        url = url.replace(
          match,
          serializeObjectParam({
            explode,
            name,
            style,
            value: value as Record<string, unknown>,
          }),
        );
        continue;
      }

      if (style === 'matrix') {
        url = url.replace(
          match,
          `;${serializePrimitiveParam({
            name,
            value: value as string,
          })}`,
        );
        continue;
      }

      const replaceValue = encodeURIComponent(
        style === 'label' ? `.${value as string}` : (value as string),
      );
      url = url.replace(match, replaceValue);
    }
  }

  // encodeURIComponent() leaves '.' as is, so a value such as '..' would form a
  // dot segment that redirects the request (and its credentials) to another
  // endpoint once the URL is resolved.
  if (url !== _url && hasDotSegment(url) && !hasDotSegment(_url)) {
    throw new Error(`Path parameters must not resolve to '.' or '..' segments: ${_url}`);
  }

  return url;
};

export const createQuerySerializer = <T = unknown>({
  allowReserved,
  array,
  object,
}: QuerySerializerOptions = {}) => {
  const querySerializer = (queryParams: T) => {
    let search: string[] = [];
    if (queryParams && typeof queryParams === 'object') {
      for (const name in queryParams) {
        const value = queryParams[name];

        if (value === undefined || value === null) {
          continue;
        }

        if (Array.isArray(value)) {
          search = [
            ...search,
            serializeArrayParam({
              allowReserved,
              explode: true,
              name,
              style: 'form',
              value,
              ...array,
            }),
          ];
          continue;
        }

        if (typeof value === 'object') {
          search = [
            ...search,
            serializeObjectParam({
              allowReserved,
              explode: true,
              name,
              style: 'deepObject',
              value: value as Record<string, unknown>,
              ...object,
            }),
          ];
          continue;
        }

        search = [
          ...search,
          serializePrimitiveParam({
            allowReserved,
            name,
            value: value as string,
          }),
        ];
      }
    }
    return search.join('&');
  };
  return querySerializer;
};

/**
 * Infers parseAs value from provided Content-Type header.
 */
export const getParseAs = (contentType: string | null): Exclude<Config['parseAs'], 'auto'> => {
  if (!contentType) {
    // If no Content-Type header is provided, the best we can do is return the raw response body,
    // which is effectively the same as the 'stream' option.
    return 'stream';
  }

  const cleanContent = contentType.split(';')[0]?.trim();

  if (!cleanContent) {
    return;
  }

  if (cleanContent.startsWith('application/json') || cleanContent.endsWith('+json')) {
    return 'json';
  }

  if (cleanContent === 'multipart/form-data') {
    return 'formData';
  }

  if (
    ['application/', 'audio/', 'image/', 'video/'].some((type) => cleanContent.startsWith(type))
  ) {
    return 'blob';
  }

  if (cleanContent.startsWith('text/')) {
    return 'text';
  }
};

export const setAuthParams = async ({
  security,
  ...options
}: Pick<Required<RequestOptions>, 'security'> &
  Pick<RequestOptions, 'auth' | 'query'> & {
    headers: Headers;
  }) => {
  for (const auth of security) {
    const token = await getAuthToken(auth, options.auth);

    if (!token) {
      continue;
    }

    const name = auth.name ?? 'Authorization';

    switch (auth.in) {
      case 'query':
        if (!options.query) {
          options.query = {};
        }
        options.query[name] = token;
        break;
      case 'header':
      default:
        options.headers.set(name, token);
        break;
    }

    return;
  }
};

export const buildUrl: Client['buildUrl'] = (options) => {
  const url = getUrl({
    baseUrl: options.baseUrl as string,
    path: options.path,
    query: options.query,
    querySerializer:
      typeof options.querySerializer === 'function'
        ? options.querySerializer
        : createQuerySerializer(options.querySerializer),
    url: options.url,
  });
  return url;
};

export const getUrl = ({
  baseUrl,
  path,
  query,
  querySerializer,
  url: _url,
}: {
  baseUrl?: string;
  path?: Record<string, unknown>;
  query?: Record<string, unknown>;
  querySerializer: QuerySerializer;
  url: string;
}) => {
  const pathUrl = _url.startsWith('/') ? _url : `/${_url}`;
  let url = (baseUrl ?? '') + pathUrl;
  if (path) {
    url = defaultPathSerializer({ path, url });
  }
  let search = query ? querySerializer(query) : '';
  if (search.startsWith('?')) {
    search = search.substring(1);
  }
  if (search) {
    url += `?${search}`;
  }
  return url;
};

export const mergeConfigs = (a: Config, b: Config): Config => {
  const config = { ...a, ...b };
  if (config.baseUrl?.endsWith('/')) {
    config.baseUrl = config.baseUrl.substring(0, config.baseUrl.length - 1);
  }
  config.headers = mergeHeaders(a.headers, b.headers);
  return config;
};

export const mergeHeaders = (
  ...headers: Array<Required<Config>['headers'] | undefined>
): Headers => {
  const mergedHeaders = new Headers();
  for (const header of headers) {
    if (!header || typeof header !== 'object') {
      continue;
    }

    const iterator = header instanceof Headers ? header.entries() : Object.entries(header);

    for (const [key, value] of iterator) {
      if (value === null) {
        mergedHeaders.delete(key);
      } else if (Array.isArray(value)) {
        for (const v of value) {
          mergedHeaders.append(key, v as string);
        }
      } else if (value !== undefined) {
        // assume object headers are meant to be JSON stringified, i.e. their
        // content value in OpenAPI specification is 'application/json'
        mergedHeaders.set(
          key,
          typeof value === 'object' ? JSON.stringify(value) : (value as string),
        );
      }
    }
  }
  return mergedHeaders;
};

const defaultQuerySerializer = createQuerySerializer({
  allowReserved: false,
  array: {
    explode: true,
    style: 'form',
  },
  object: {
    explode: true,
    style: 'deepObject',
  },
});

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const createConfig = <T extends ClientOptions = ClientOptions>(
  override: Config<Omit<ClientOptions, keyof T> & T> = {},
): Config<Omit<ClientOptions, keyof T> & T> => ({
  ...jsonBodySerializer,
  headers: defaultHeaders,
  parseAs: 'auto',
  querySerializer: defaultQuerySerializer,
  ...override,
});
