// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import {
  createClient,
  createConfig,
  formDataBodySerializer,
  jsonBodySerializer,
  urlSearchParamsBodySerializer,
  type Config,
} from '../http';

const BASE_URL = 'https://api.example.com';

/**
 * Creates a client whose fetch records the outgoing request and resolves with
 * the given response.
 */
function createTestClient(
  response: () => Response = () => Response.json({ ok: true }),
  config: Config = {},
) {
  const requests: Request[] = [];
  const fetch = vi.fn(async (request: Request) => {
    requests.push(request);
    return response();
  });
  const client = createClient(createConfig({ baseUrl: BASE_URL, fetch, ...config }));
  return { client, fetch, requests };
}

function textResponse(body: string, contentType: string, status = 200) {
  return new Response(body, { status, headers: { 'Content-Type': contentType } });
}

describe('createClient configuration', () => {
  it('should apply the default configuration', () => {
    const config = createClient().getConfig();

    expect(config.parseAs).toBe('auto');
    expect(config.bodySerializer).toBe(jsonBodySerializer.bodySerializer);
    expect(typeof config.querySerializer).toBe('function');
    expect((config.headers as Headers).get('Content-Type')).toBe('application/json');
  });

  it('should trim a trailing slash from baseUrl', () => {
    const client = createClient(createConfig({ baseUrl: `${BASE_URL}/` }));

    expect(client.getConfig().baseUrl).toBe(BASE_URL);
  });

  it('should merge config and headers in setConfig and return a copy', () => {
    const client = createClient(createConfig({ baseUrl: BASE_URL, headers: { 'x-a': '1' } }));

    const updated = client.setConfig({ headers: { 'x-b': '2' }, throwOnError: true });

    expect(updated.baseUrl).toBe(BASE_URL);
    expect(updated.throwOnError).toBe(true);
    expect((updated.headers as Headers).get('x-a')).toBe('1');
    expect((updated.headers as Headers).get('x-b')).toBe('2');
    expect(client.getConfig()).not.toBe(client.getConfig());
  });
});

describe('request building', () => {
  it('should send a GET request without Content-Type', async () => {
    const { client, requests } = createTestClient();

    await client.get({ url: '/v1/items' });

    expect(requests[0].method).toBe('GET');
    expect(requests[0].url).toBe(`${BASE_URL}/v1/items`);
    expect(requests[0].headers.has('Content-Type')).toBe(false);
    expect(requests[0].redirect).toBe('follow');
  });

  it('should prefix the url with a slash when it is missing', async () => {
    const { client, requests } = createTestClient();

    await client.get({ url: 'v1/items' });

    expect(requests[0].url).toBe(`${BASE_URL}/v1/items`);
  });

  it('should serialize a JSON body, including bigint values', async () => {
    const { client, requests } = createTestClient();

    await client.post({ url: '/v1/items', body: { name: 'a', count: BigInt(2) } });

    expect(requests[0].method).toBe('POST');
    expect(requests[0].headers.get('Content-Type')).toBe('application/json');
    expect(await requests[0].text()).toBe('{"name":"a","count":"2"}');
  });

  it('should drop the JSON Content-Type when the serialized body is empty', async () => {
    const { client, requests } = createTestClient();

    await client.post({ url: '/v1/items', body: '', bodySerializer: null });

    // Request then applies its own default for string bodies
    expect(requests[0].headers.get('Content-Type')).toBe('text/plain;charset=UTF-8');
  });

  it('should merge, override, append and delete headers', async () => {
    const { client, requests } = createTestClient(undefined, {
      headers: { 'x-default': 'a', 'x-removed': 'b' },
    });

    await client.post({
      url: '/v1/items',
      body: {},
      headers: {
        'x-default': 'override',
        'x-removed': null,
        'x-list': ['1', '2'],
        'x-object': { a: 1 },
        'x-number': 5,
        'x-undefined': undefined,
      },
    });

    const headers = requests[0].headers;
    expect(headers.get('x-default')).toBe('override');
    expect(headers.has('x-removed')).toBe(false);
    expect(headers.get('x-list')).toBe('1, 2');
    expect(headers.get('x-object')).toBe('{"a":1}');
    expect(headers.get('x-number')).toBe('5');
    expect(headers.has('x-undefined')).toBe(false);
  });

  it('should send multipart bodies with formDataBodySerializer', async () => {
    const { client, requests } = createTestClient();
    const file = new Blob(['content'], { type: 'text/plain' });

    await client.post({
      ...formDataBodySerializer,
      url: '/v1/upload',
      body: { file, tags: ['a', 'b'], meta: { x: 1 }, skipped: null },
      headers: { 'Content-Type': null },
    });

    expect(requests[0].headers.get('Content-Type')).toMatch(/^multipart\/form-data; boundary=/);
    const form = await requests[0].formData();
    expect(await (form.get('file') as Blob).text()).toBe('content');
    expect(form.getAll('tags')).toEqual(['a', 'b']);
    expect(form.get('meta')).toBe('{"x":1}');
    expect(form.has('skipped')).toBe(false);
  });

  it('should serialize url-encoded bodies with urlSearchParamsBodySerializer', () => {
    expect(
      urlSearchParamsBodySerializer.bodySerializer({ a: 'x y', b: [1, 2], c: undefined }),
    ).toBe('a=x+y&b=1&b=2');
  });

  it('should prefer the per-request fetch over the configured fetch', async () => {
    const { client, fetch } = createTestClient();
    const requestFetch = vi.fn(async () => Response.json({}));

    await client.get({ url: '/v1/items', fetch: requestFetch });

    expect(requestFetch).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should fall back to globalThis.fetch', async () => {
    const globalFetch = vi.fn(async () => Response.json({}));
    vi.stubGlobal('fetch', globalFetch);
    try {
      await createClient(createConfig({ baseUrl: BASE_URL })).get({ url: '/v1/items' });
    } finally {
      vi.unstubAllGlobals();
    }

    expect(globalFetch).toHaveBeenCalledTimes(1);
  });

  it.each(['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const)(
    'should use the %s method',
    async (method) => {
      const { client, requests } = createTestClient(() => new Response(null, { status: 204 }));

      await client[method]({ url: '/v1/items' });

      expect(requests[0].method).toBe(method.toUpperCase());
    },
  );

  it('should expose buildUrl', () => {
    const client = createClient();

    expect(
      client.buildUrl({
        baseUrl: BASE_URL,
        url: '/v1/items/{id}',
        path: { id: 1 },
        query: { a: 1 },
      }),
    ).toBe(`${BASE_URL}/v1/items/1?a=1`);
  });
});

describe('path parameters', () => {
  const buildUrl = (url: string, path: Record<string, unknown>) =>
    createClient().buildUrl({ baseUrl: BASE_URL, url, path });

  it('should percent-encode primitive values', () => {
    expect(buildUrl('/items/{id}', { id: 'a b/c?d' })).toBe(`${BASE_URL}/items/a%20b%2Fc%3Fd`);
  });

  it('should leave placeholders without a value untouched', () => {
    expect(buildUrl('/items/{id}', { id: undefined })).toBe(`${BASE_URL}/items/{id}`);
  });

  it('should support label and matrix styles', () => {
    expect(buildUrl('/items/{.id}', { id: 'x' })).toBe(`${BASE_URL}/items/.x`);
    expect(buildUrl('/items/{;id}', { id: 'x' })).toBe(`${BASE_URL}/items/;id=x`);
  });

  it('should serialize arrays and objects', () => {
    expect(buildUrl('/items/{ids}', { ids: [1, 2] })).toBe(`${BASE_URL}/items/1,2`);
    expect(buildUrl('/items/{ids*}', { ids: [1, 2] })).toBe(`${BASE_URL}/items/1,2`);
    expect(buildUrl('/items/{.ids*}', { ids: [1, 2] })).toBe(`${BASE_URL}/items/.1.2`);
    expect(buildUrl('/items/{;ids*}', { ids: [1, 2] })).toBe(`${BASE_URL}/items/;ids=1;ids=2`);
    expect(buildUrl('/items/{obj}', { obj: { a: 1, b: 2 } })).toBe(`${BASE_URL}/items/a,1,b,2`);
    expect(buildUrl('/items/{obj*}', { obj: { a: 1, b: 2 } })).toBe(`${BASE_URL}/items/a=1,b=2`);
    expect(buildUrl('/items/{date}', { date: new Date('2025-01-02T03:04:05.000Z') })).toBe(
      `${BASE_URL}/items/date=2025-01-02T03:04:05.000Z`,
    );
  });

  it.each([['..'], ['.'], [['..']]])(
    'should reject values that resolve to a dot segment (%j)',
    (id) => {
      expect(() => buildUrl('/sites/{id}/pages', { id })).toThrow(
        "Path parameters must not resolve to '.' or '..' segments",
      );
    },
  );

  it('should reject label values that resolve to a dot segment', () => {
    expect(() => buildUrl('/sites/{.id}', { id: '.' })).toThrow();
  });

  it('should allow values that only contain dots inside a segment', () => {
    expect(buildUrl('/sites/{id}', { id: '...' })).toBe(`${BASE_URL}/sites/...`);
    expect(buildUrl('/sites/{id}', { id: 'a..b' })).toBe(`${BASE_URL}/sites/a..b`);
    expect(buildUrl('/sites/{id}', { id: '%2e%2e' })).toBe(`${BASE_URL}/sites/%252e%252e`);
  });

  it('should not send the request when a path parameter is rejected', async () => {
    const { client, fetch } = createTestClient();

    await expect(client.get({ url: '/sites/{id}', path: { id: '..' } })).rejects.toThrow();
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('query parameters', () => {
  const buildUrl = (query: Record<string, unknown>, config: Config = {}) => {
    const client = createClient(createConfig({ baseUrl: BASE_URL, ...config }));
    return client.buildUrl({ ...client.getConfig(), url: '/items', query });
  };

  it('should encode primitives and skip empty values', () => {
    expect(buildUrl({ q: 'a b&c', page: 2, active: true, skip: undefined, none: null })).toBe(
      `${BASE_URL}/items?q=a%20b%26c&page=2&active=true`,
    );
  });

  it('should explode arrays in form style and objects in deepObject style', () => {
    expect(buildUrl({ ids: [1, 2], filter: { a: 'x', b: 'y' } })).toBe(
      `${BASE_URL}/items?ids=1&ids=2&filter[a]=x&filter[b]=y`,
    );
  });

  it('should omit the query string when there are no values', () => {
    expect(buildUrl({})).toBe(`${BASE_URL}/items`);
  });

  it('should honour querySerializer options and functions', () => {
    expect(
      buildUrl(
        { ids: [1, 2] },
        { querySerializer: { array: { explode: false, style: 'pipeDelimited' } } },
      ),
    ).toBe(`${BASE_URL}/items?ids=1|2`);
    expect(buildUrl({ a: 1 }, { querySerializer: () => '?custom=1' })).toBe(
      `${BASE_URL}/items?custom=1`,
    );
  });

  it('should reject nested objects', () => {
    expect(() => buildUrl({ filter: { a: { b: 1 } } })).toThrow('Deeply-nested arrays/objects');
  });
});

describe('authentication', () => {
  it('should send a bearer token resolved from the auth function', async () => {
    const auth = vi.fn(async () => 'token-1');
    const { client, requests } = createTestClient(undefined, { auth });

    await client.get({ url: '/v1/items', security: [{ scheme: 'bearer', type: 'http' }] });

    expect(auth).toHaveBeenCalledWith({ scheme: 'bearer', type: 'http' });
    expect(requests[0].headers.get('Authorization')).toBe('Bearer token-1');
  });

  it('should support basic auth and api keys in headers or query', async () => {
    const { client, requests } = createTestClient(undefined, { auth: 'secret' });

    await client.get({ url: '/a', security: [{ scheme: 'basic', type: 'http' }] });
    await client.get({
      url: '/b',
      security: [{ in: 'header', name: 'x-api-key', type: 'apiKey' }],
    });
    await client.get({
      url: '/c',
      query: { page: 1 },
      security: [{ in: 'query', name: 'api_key', type: 'apiKey' }],
    });

    expect(requests[0].headers.get('Authorization')).toBe(`Basic ${btoa('secret')}`);
    expect(requests[1].headers.get('x-api-key')).toBe('secret');
    expect(requests[2].url).toBe(`${BASE_URL}/c?page=1&api_key=secret`);
  });

  it('should use the first security scheme that yields a token', async () => {
    const auth = vi.fn(async (scheme: { type: string }) =>
      scheme.type === 'apiKey' ? undefined : 'token-2',
    );
    const { client, requests } = createTestClient(undefined, { auth });

    await client.get({
      url: '/v1/items',
      security: [
        { in: 'header', name: 'x-api-key', type: 'apiKey' },
        { scheme: 'bearer', type: 'http' },
        { scheme: 'basic', type: 'http' },
      ],
    });

    expect(auth).toHaveBeenCalledTimes(2);
    expect(requests[0].headers.has('x-api-key')).toBe(false);
    expect(requests[0].headers.get('Authorization')).toBe('Bearer token-2');
  });

  it('should not send credentials without a token', async () => {
    const { client, requests } = createTestClient();

    await client.get({ url: '/v1/items', security: [{ scheme: 'bearer', type: 'http' }] });

    expect(requests[0].headers.has('Authorization')).toBe(false);
  });
});

describe('response parsing', () => {
  it('should parse JSON responses', async () => {
    const { client } = createTestClient(() =>
      textResponse('{"a":1}', 'application/json; charset=utf-8'),
    );

    const result = await client.get({ url: '/v1/items' });

    expect(result.data).toEqual({ a: 1 });
    expect(result.error).toBeUndefined();
    expect(result.request).toBeInstanceOf(Request);
    expect(result.response).toBeInstanceOf(Response);
  });

  it.each([
    ['application/problem+json', '{"a":1}', { a: 1 }],
    ['text/plain', 'hello', 'hello'],
    ['foo/bar', '{"a":1}', { a: 1 }],
  ])('should infer the parser from %s', async (contentType, body, expected) => {
    const { client } = createTestClient(() => textResponse(body, contentType));

    expect((await client.get({ url: '/' })).data).toEqual(expected);
  });

  it('should return blobs for binary content types', async () => {
    const { client } = createTestClient(() => textResponse('bytes', 'image/png'));

    const { data } = await client.get({ url: '/' });

    expect(data).toBeInstanceOf(Blob);
    expect(await (data as Blob).text()).toBe('bytes');
  });

  it('should return the body stream when there is no Content-Type', async () => {
    const { client } = createTestClient(() => new Response(new Blob(['raw']).stream()));

    const { data } = await client.get({ url: '/' });

    expect(data).toBeInstanceOf(ReadableStream);
  });

  it('should honour an explicit parseAs', async () => {
    const { client } = createTestClient(() => textResponse('{"a":1}', 'application/json'));

    expect((await client.get({ url: '/', parseAs: 'text' })).data).toBe('{"a":1}');
  });

  it('should return an empty object for empty responses', async () => {
    const noContent = createTestClient(() => new Response(null, { status: 204 }));
    const zeroLength = createTestClient(
      () => new Response('', { status: 200, headers: { 'Content-Length': '0' } }),
    );

    expect((await noContent.client.delete({ url: '/' })).data).toEqual({});
    expect((await zeroLength.client.get({ url: '/' })).data).toEqual({});
  });

  it('should run responseValidator and responseTransformer for JSON', async () => {
    const responseValidator = vi.fn(async () => undefined);
    const responseTransformer = vi.fn(async (data: unknown) => ({ wrapped: data }));
    const { client } = createTestClient(() => Response.json({ a: 1 }), {
      responseValidator,
      responseTransformer,
    });

    const { data } = await client.get({ url: '/' });

    expect(responseValidator).toHaveBeenCalledWith({ a: 1 });
    expect(data).toEqual({ wrapped: { a: 1 } });
  });
});

describe('error handling', () => {
  it('should return parsed JSON errors', async () => {
    const { client } = createTestClient(() => Response.json({ message: 'bad' }, { status: 400 }));

    const result = await client.get({ url: '/' });

    expect(result.data).toBeUndefined();
    expect(result.error).toEqual({ message: 'bad' });
    expect(result.response.status).toBe(400);
  });

  it('should return text errors as-is and empty errors as an empty object', async () => {
    const text = createTestClient(() => new Response('Server error', { status: 500 }));
    const empty = createTestClient(() => new Response('', { status: 500 }));

    expect((await text.client.get({ url: '/' })).error).toBe('Server error');
    expect((await empty.client.get({ url: '/' })).error).toEqual({});
  });

  it('should throw errors when throwOnError is set', async () => {
    const { client } = createTestClient(() => Response.json({ message: 'bad' }, { status: 400 }));

    await expect(client.get({ url: '/', throwOnError: true })).rejects.toEqual({ message: 'bad' });

    client.setConfig({ throwOnError: true });
    await expect(client.get({ url: '/' })).rejects.toEqual({ message: 'bad' });
  });

  it('should propagate fetch failures', async () => {
    const { client } = createTestClient(() => {
      throw new TypeError('Failed to fetch');
    });

    await expect(client.get({ url: '/' })).rejects.toThrow('Failed to fetch');
  });
});

describe('interceptors', () => {
  it('should run request, response and error interceptors in order', async () => {
    const { client, requests } = createTestClient(() =>
      Response.json({ message: 'bad' }, { status: 400 }),
    );
    const calls: string[] = [];

    client.interceptors.request.use((request) => {
      calls.push('request-1');
      request.headers.set('x-intercepted', '1');
      return request;
    });
    client.interceptors.request.use((request) => {
      calls.push('request-2');
      return request;
    });
    client.interceptors.response.use((response) => {
      calls.push('response');
      return response;
    });
    client.interceptors.error.use((error) => {
      calls.push('error');
      return { wrapped: error };
    });

    const result = await client.get({ url: '/' });

    expect(calls).toEqual(['request-1', 'request-2', 'response', 'error']);
    expect(requests[0].headers.get('x-intercepted')).toBe('1');
    expect(result.error).toEqual({ wrapped: { message: 'bad' } });
  });

  it('should stop running ejected interceptors', async () => {
    const { client } = createTestClient();
    const interceptor = vi.fn((request: Request) => request);

    client.interceptors.request.use(interceptor);
    client.interceptors.request.eject(interceptor);
    await client.get({ url: '/' });

    expect(interceptor).not.toHaveBeenCalled();
  });
});
