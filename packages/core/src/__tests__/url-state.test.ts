import { afterEach, describe, expect, test, vi } from 'vitest';
import { CoreError, ErrorCode } from '../errors';
import {
  decodeHostUrlState,
  decodeUrlState,
  encodeHostUrlState,
  encodeUrlState,
  HostUrlStateMap,
  JsonObject,
  JsonValue,
  URL_STATE_MAX_DEPTH,
  UrlStateErrorReason,
} from '../url-state';

const base64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
const plain = (json: string) => `1j.${base64Url(new TextEncoder().encode(json))}`;
const zipped = async (json: string) => {
  const stream = new CompressionStream('deflate');
  const writer = stream.writable.getWriter();
  writer.write(new TextEncoder().encode(json));
  writer.close();
  return `1z.${base64Url(new Uint8Array(await new Response(stream.readable).arrayBuffer()))}`;
};
const reasonOf = (promise: Promise<unknown>) =>
  promise.then(
    () => 'resolved',
    (error: CoreError) => {
      expect(error).toBeInstanceOf(CoreError);
      expect(error.code).toBe(ErrorCode.INVALID_REQUEST);
      return (error.details as { reason: UrlStateErrorReason }).reason;
    },
  );

/** `{ a: [[…[0]…]] }`, nested `levels` deep in total. */
const nested = (levels: number): JsonObject => {
  let value: JsonValue = 0;
  for (let i = 1; i < levels; i++) value = [value];
  return { a: value };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('URL state codec', () => {
  test('round-trips plain JSON objects, including Unicode, with both encodings', async () => {
    const small: JsonObject = { q: 'é' };
    const large: JsonObject = {
      q: 'café Ωμέγα 漢字 🚀',
      ids: Array.from({ length: 20 }, (_, i) => `item-${i}`),
      nested: { flag: false, n: -1.5e-3, none: null, list: [[], {}] },
    };

    const smallEncoded = await encodeUrlState(small);
    const largeEncoded = await encodeUrlState(large);

    expect(smallEncoded.startsWith('1j.')).toBe(true);
    expect(largeEncoded.startsWith('1z.')).toBe(true);
    for (const encoded of [smallEncoded, largeEncoded]) {
      expect(encoded).toMatch(/^1[zj]\.[A-Za-z0-9_-]+$/);
    }
    expect(await decodeUrlState(smallEncoded)).toEqual(small);
    expect(await decodeUrlState(largeEncoded)).toEqual(large);
  });

  test('falls back to the plain encoding when CompressionStream is unavailable', async () => {
    vi.stubGlobal('CompressionStream', undefined);
    const state = { ids: Array.from({ length: 20 }, (_, i) => `item-${i}`) };

    const encoded = await encodeUrlState(state);

    expect(encoded.startsWith('1j.')).toBe(true);
    expect(await decodeUrlState(encoded)).toEqual(state);
  });

  test.each([
    ['null', null],
    ['undefined', undefined],
    ['empty', ''],
    ['unknown version', '2j.e30'],
    ['unknown encoding', '1x.e30'],
    ['empty payload', '1j.'],
    ['non-base64url characters', '1j.e30='],
    ['impossible base64 length', '1j.e30ab'],
    ['over the encoded limit', '1j.' + 'A'.repeat(1022)],
    ['JSON array', plain('[1,2]')],
    ['JSON string', plain('"state"')],
    ['invalid JSON', plain('{"a":')],
    ['invalid UTF-8', `1j.${base64Url(new Uint8Array([0x7b, 0xff, 0x7d]))}`],
    ['corrupt zlib data', `1z.${base64Url(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]))}`],
  ])('decodes %s to null', async (_, raw) => {
    await expect(decodeUrlState(raw)).resolves.toBeNull();
  });

  test('decodes truncated compressed data, or extra bytes after it, to null', async () => {
    const encoded = await zipped(JSON.stringify({ ids: Array.from({ length: 50 }, (_, i) => i) }));
    await expect(decodeUrlState(encoded.slice(0, -6))).resolves.toBeNull();
    await expect(decodeUrlState(`${encoded}AAAA`)).resolves.toBeNull();
  });

  test('decodes valid JSON over the encoded limit to null', async () => {
    const raw = plain(JSON.stringify({ s: 'x'.repeat(900) }));
    expect(raw.length).toBeGreaterThan(1024);

    await expect(decodeUrlState(raw)).resolves.toBeNull();
  });

  test('decodes a number that parses to Infinity to null', async () => {
    await expect(decodeUrlState(plain('{"a":1e999}'))).resolves.toBeNull();
  });

  test('accepts state nested up to the depth limit, and nothing deeper', async () => {
    const atLimit = nested(URL_STATE_MAX_DEPTH);
    const tooDeep = nested(URL_STATE_MAX_DEPTH + 1);

    await expect(decodeUrlState(await encodeUrlState(atLimit))).resolves.toEqual(atLimit);
    expect(await reasonOf(encodeUrlState(tooDeep))).toBe(UrlStateErrorReason.NOT_SERIALIZABLE);
    await expect(decodeUrlState(plain(JSON.stringify(tooDeep)))).resolves.toBeNull();
  });

  test('stops decompressing once the output exceeds the JSON limit', async () => {
    const bomb = await zipped(JSON.stringify({ a: 'a'.repeat(200_000) }));
    expect(bomb.length).toBeLessThanOrEqual(1024);
    let inflated = 0;
    const Native = DecompressionStream;
    vi.stubGlobal(
      'DecompressionStream',
      class extends Native {
        readonly readable = super.readable.pipeThrough(
          new TransformStream<Uint8Array, Uint8Array>({
            transform(chunk, controller) {
              inflated += chunk.byteLength;
              controller.enqueue(chunk);
            },
          }),
        );
      },
    );

    await expect(decodeUrlState(bomb)).resolves.toBeNull();
    expect(inflated).toBeGreaterThan(8192);
    expect(inflated).toBeLessThan(100_000);
  });

  test('decodes compressed state to null where DecompressionStream is unavailable', async () => {
    const encoded = await zipped(JSON.stringify({ ids: Array.from({ length: 50 }, (_, i) => i) }));
    vi.stubGlobal('DecompressionStream', undefined);

    await expect(decodeUrlState(encoded)).resolves.toBeNull();
  });

  test('decoding drops prototype keys at any depth', async () => {
    const raw = plain(
      '{"__proto__":{"polluted":true},"a":{"constructor":{"prototype":{"polluted":true}},"b":1}}',
    );

    const decoded = await decodeUrlState(raw);

    expect(decoded).toEqual({ a: { b: 1 } });
    expect(Object.keys(decoded!)).toEqual(['a']);
    expect(Object.keys(decoded!.a as JsonObject)).toEqual(['b']);
    expect(Object.getPrototypeOf(decoded)).toBe(Object.prototype);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  test.each([
    ['an array', [], UrlStateErrorReason.NOT_PLAIN_OBJECT],
    ['a Date', new Date(), UrlStateErrorReason.NOT_PLAIN_OBJECT],
    ['a class instance', new (class State {})(), UrlStateErrorReason.NOT_PLAIN_OBJECT],
    ['a nested Date', { at: new Date() }, UrlStateErrorReason.NOT_SERIALIZABLE],
    ['a nested Map', { m: new Map() }, UrlStateErrorReason.NOT_SERIALIZABLE],
    ['a function', { f: () => 1 }, UrlStateErrorReason.NOT_SERIALIZABLE],
    ['undefined in an array', { u: [1, undefined] }, UrlStateErrorReason.NOT_SERIALIZABLE],
    ['NaN', { n: NaN }, UrlStateErrorReason.NOT_SERIALIZABLE],
    ['Infinity in an array', { n: [1, Infinity] }, UrlStateErrorReason.NOT_SERIALIZABLE],
    ['a __proto__ key', JSON.parse('{"__proto__":{}}'), UrlStateErrorReason.NOT_SERIALIZABLE],
    ['a constructor key', { constructor: {} }, UrlStateErrorReason.NOT_SERIALIZABLE],
    ['a prototype key', { prototype: {} }, UrlStateErrorReason.NOT_SERIALIZABLE],
  ])('rejects %s', async (_, state, reason) => {
    expect(await reasonOf(encodeUrlState(state as JsonObject))).toBe(reason);
  });

  test('leaves out object properties set to undefined, as JSON.stringify does', async () => {
    const filters = { range: '7d', page: 2 };
    const state = { ...filters, page: undefined, nested: { q: undefined, n: 1 } };

    const decoded = await decodeUrlState(await encodeUrlState(state as unknown as JsonObject));

    expect(decoded).toEqual({ range: '7d', nested: { n: 1 } });
    expect(Object.keys(decoded!)).toEqual(['range', 'nested']);
  });

  test('accepts readonly arrays, such as as-const values', async () => {
    const state = { tabs: ['seo', 'links'], grid: [[1, 2]] } as const;

    await expect(decodeUrlState(await encodeUrlState(state))).resolves.toEqual({
      tabs: ['seo', 'links'],
      grid: [[1, 2]],
    });
  });

  test('rejects circular references', async () => {
    const state: Record<string, unknown> = {};
    state.self = { parent: state };

    await expect(encodeUrlState(state as JsonObject)).rejects.toMatchObject({
      code: ErrorCode.INVALID_REQUEST,
      message: 'URL state has a circular reference at "self.parent".',
      details: { reason: UrlStateErrorReason.NOT_SERIALIZABLE },
    });
  });

  test('stops at the JSON limit when repeated references expand a small object', async () => {
    // 25 levels of { a: v, b: v } would be gigabytes of JSON.
    let value: JsonObject = { leaf: 1 };
    for (let i = 0; i < 25; i++) value = { a: value, b: value };

    expect(await reasonOf(encodeUrlState(value))).toBe(UrlStateErrorReason.STATE_TOO_LARGE);
  });

  test('accepts repeated (non-circular) references', async () => {
    const shared = { id: 1 };
    await expect(decodeUrlState(await encodeUrlState({ a: shared, b: shared }))).resolves.toEqual({
      a: { id: 1 },
      b: { id: 1 },
    });
  });

  test('rejects state over the JSON limit or over the encoded limit', async () => {
    const tooMuchJson = { s: 'x'.repeat(9000) };
    // Compressible JSON under 8 KB, but random IDs don't compress below 1,024 chars.
    const incompressible = {
      ids: Array.from({ length: 40 }, () => crypto.randomUUID()),
    };

    expect(await reasonOf(encodeUrlState(tooMuchJson))).toBe(UrlStateErrorReason.STATE_TOO_LARGE);
    expect(await reasonOf(encodeUrlState(incompressible))).toBe(
      UrlStateErrorReason.STATE_TOO_LARGE,
    );
  });
});

describe('Host URL state map', () => {
  const map: HostUrlStateMap = {
    org: 'org-1',
    tenant: 'tenant-1',
    apps: { 'app-1': { 'xmc:dashboardblocks#w1': { range: '7d' } } },
  };

  test('round-trips, with and without a tenant', async () => {
    const { tenant, ...orgOnly } = map;

    expect(await decodeHostUrlState(await encodeHostUrlState(map))).toEqual(map);
    expect(await decodeHostUrlState(await encodeHostUrlState(orgOnly))).toEqual(orgOnly);
  });

  test.each([
    ['missing org', { apps: {} }],
    ['empty org', { org: '', apps: {} }],
    ['non-string tenant', { org: 'o', tenant: 1, apps: {} }],
    ['apps not an object', { org: 'o', apps: [] }],
    ['an app that is not an object', { org: 'o', apps: { a: 'x' } }],
    ['an instance slice that is not an object', { org: 'o', apps: { a: { i: [1] } } }],
  ])('decodes a map with %s to null', async (_, value) => {
    await expect(decodeHostUrlState(plain(JSON.stringify(value)))).resolves.toBeNull();
  });

  test('drops a state over the per-instance JSON limit and keeps the others', async () => {
    const raw = await zipped(
      JSON.stringify({
        org: 'o',
        apps: {
          a: { i: { ok: 1 }, j: { s: 'a'.repeat(20_000) } },
          b: { k: { s: 'b'.repeat(9000) } },
        },
      }),
    );

    await expect(decodeHostUrlState(raw)).resolves.toEqual({
      org: 'o',
      apps: { a: { i: { ok: 1 } } },
    });
  });

  test('keeps a state that encodes over the per-instance limit on its own', async () => {
    // Under 8 KB of JSON, but random IDs encode to over 1,024 chars. The encoded length depends on
    // the zlib build, so it decides nothing when the map is read.
    const ids = { ids: Array.from({ length: 40 }, () => crypto.randomUUID()) };
    const raw = await encodeHostUrlState({ org: 'o', apps: { a: { i: ids } } });

    await expect(decodeHostUrlState(raw)).resolves.toEqual({ org: 'o', apps: { a: { i: ids } } });
  });

  test('decodes without compressing the states again', async () => {
    const raw = await encodeHostUrlState(map);
    vi.stubGlobal(
      'CompressionStream',
      class {
        constructor() {
          throw new Error('decoding must not compress');
        }
      },
    );

    await expect(decodeHostUrlState(raw)).resolves.toEqual(map);
  });

  test('accepts a state nested up to the depth limit, and nothing deeper', async () => {
    const atLimit = { org: 'o', apps: { a: { i: nested(URL_STATE_MAX_DEPTH) } } };
    const tooDeep = { org: 'o', apps: { a: { i: nested(URL_STATE_MAX_DEPTH + 1) } } };

    await expect(decodeHostUrlState(await encodeHostUrlState(atLimit))).resolves.toEqual(atLimit);
    await expect(decodeHostUrlState(plain(JSON.stringify(tooDeep)))).resolves.toBeNull();
  });

  test('rejects a map with a state over the per-instance JSON limit with STATE_TOO_LARGE', async () => {
    const apps = { a: { i: { s: 'a'.repeat(9000) } } };

    expect(await reasonOf(encodeHostUrlState({ org: 'o', apps }))).toBe(
      UrlStateErrorReason.STATE_TOO_LARGE,
    );
  });

  test('rejects a map over the host limit with HOST_STATE_FULL', async () => {
    const apps = Object.fromEntries(
      Array.from({ length: 20 }, (_, i) => [
        `app-${i}`,
        { standalone: { ids: Array.from({ length: 10 }, () => crypto.randomUUID()) } },
      ]),
    );

    expect(await reasonOf(encodeHostUrlState({ org: 'o', apps }))).toBe(
      UrlStateErrorReason.HOST_STATE_FULL,
    );
  });
});

describe('URL state wire format', () => {
  // Links already shared must keep decoding: these values pin the format.
  test('decodes values encoded by an earlier version', async () => {
    await expect(decodeUrlState('1j.eyJ0YWIiOiJzZW8ifQ')).resolves.toEqual({ tab: 'seo' });
    await expect(
      decodeUrlState(
        '1z.eJwFwT0KwjAYBuCrlHdOoX9azA08gzjk54sWQq1NMpWCtxBcBLcOHcS1m3tuobNH8HkGuMbTVoND5lSrTBRpZSpKK1mLdGNKSjNV6JxWYi1rBQbTWE89-ADnhQ8OfAfdC-PB0AVpG3ckjT3DGRxKmPeUxCkucY6v-Ey-y-MzX5Pf_XbByNCJA4GXDF3TtqTBfR-IoT15Am-DteMfVw87MA',
      ),
    ).resolves.toEqual({
      siteId: 'b1e7c0a2-4f4e-4b7a-9f3e-0c2d1e5a6b7c',
      filter: { status: ['draft', 'published'], q: 'café Ωμέγα 漢字 🚀' },
      page: 3,
      pinned: true,
      note: null,
    });
    await expect(
      decodeHostUrlState(
        '1z.eJx9TUsKwjAUvMu4TcG2C-FdRUSSvGcsxqQk0Qold5dYF67czAzzYVbE5EANz_0wQqFI0KGAvqLTxkJBz3MGrY27vonX3RLrfDVRJzY-2lveLRM7KVuedHACwrhnVPWvPvzWD4xaP3eb33aXh_fZJpHQnOckCwguTQyFLF5sEQYdoaFgoGBxqrXWN_5bR_g',
      ),
    ).resolves.toEqual({
      org: 'org_123',
      tenant: 'tenant-abc',
      apps: {
        'app-1': {
          'xmc:dashboardblocks#widget-1': { range: '30d' },
          'xmc:dashboardblocks#widget-2': { range: '7d' },
        },
        'app-2': { 'xmc:fullscreen': { view: 'grid', selected: ['a', 'b', 'c'] } },
      },
    });
  });
});
