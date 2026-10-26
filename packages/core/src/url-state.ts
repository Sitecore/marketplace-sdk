import { CoreError, ErrorCode } from './errors';

/**
 * Shared URL state contract used by the host SDK and the client SDK.
 *
 * Wire format: `<version><encoding>.<payload>`
 * - `1z.` payload = base64url(zlib-deflate(utf8(JSON))) (RFC 1950, RFC 4648 §5 without padding)
 * - `1j.` payload = base64url(utf8(JSON)), used when it's shorter
 *
 * The JSON is plain JSON: objects, arrays, strings, finite numbers, booleans and `null`, nested at
 * most {@link URL_STATE_MAX_DEPTH} levels. Decoders treat anything else, anything over the limits,
 * an unknown version and any malformed input as "no state".
 *
 * Base64url and compression only make the value compact and URL-safe. They are not encryption:
 * URL state is readable by anyone with the link.
 */

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;
export type JsonObject = { [key: string]: JsonValue };

/** Payload of the `application.urlState` mutation. `state: null` clears the state. */
export interface UrlStateSetPayload {
  state: JsonObject | null;
}

/** Response of the `application.urlState` query. */
export interface UrlStateGetResponse {
  state: JsonObject | null;
}

/** Response of the `application.urlState` mutation. */
export interface UrlStateSetResponse {
  ok: true;
}

/** Value of the host URL param: state of every app instance, scoped to one organization and tenant. */
export interface HostUrlStateMap {
  org: string;
  tenant?: string;
  apps: { [appId: string]: { [instanceKey: string]: JsonObject } };
}

export const URL_STATE_ACTION = 'application.urlState';
/** Iframe URL param carrying the instance's initial state on first load. Never updated afterwards. */
export const URL_STATE_IFRAME_PARAM = 'mkp_initial_state';
/** Host URL param carrying the {@link HostUrlStateMap}. */
export const URL_STATE_HOST_PARAM = 'mkp_url_state';

/** Maximum encoded length (chars) of one app instance's state. */
export const URL_STATE_MAX_SLICE_ENCODED = 1024;
/** Maximum encoded length (chars) of the whole host param. */
export const URL_STATE_MAX_HOST_ENCODED = 4096;
/** Maximum UTF-8 JSON size (bytes) of one app instance's state. Caps encode work and decompression. */
export const URL_STATE_MAX_SLICE_JSON = 8192;
/** Maximum UTF-8 JSON size (bytes) of the host map. */
export const URL_STATE_MAX_HOST_JSON = 32768;
/** Maximum nesting of objects and arrays in one app instance's state, the state object included. */
export const URL_STATE_MAX_DEPTH = 32;

/** Levels the host map adds around each state: map, `apps`, app. */
const HOST_MAP_DEPTH = 3;

/** `details.reason` of the `INVALID_REQUEST` errors thrown when encoding URL state. */
export enum UrlStateErrorReason {
  NOT_PLAIN_OBJECT = 'NOT_PLAIN_OBJECT',
  NOT_SERIALIZABLE = 'NOT_SERIALIZABLE',
  STATE_TOO_LARGE = 'STATE_TOO_LARGE',
  HOST_STATE_FULL = 'HOST_STATE_FULL',
}

const FORMAT = /^1([zj])\.([A-Za-z0-9_-]*)$/;
const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const noop = () => {};

/**
 * Builds the key of an app instance in the host map.
 * @param extensionPointId - Extension point the app is rendered in
 * @param extensionPointMetaId - Meta ID for extension points with several instances (e.g. widget ID)
 */
export function urlStateInstanceKey(
  extensionPointId: string,
  extensionPointMetaId?: string,
): string {
  return extensionPointMetaId ? `${extensionPointId}#${extensionPointMetaId}` : extensionPointId;
}

/**
 * Encodes one app instance's state.
 * @throws {CoreError} `INVALID_REQUEST` with `details.reason` ({@link UrlStateErrorReason})
 */
export async function encodeUrlState(state: JsonObject): Promise<string> {
  if (!isPlainObject(state)) {
    fail(UrlStateErrorReason.NOT_PLAIN_OBJECT, 'URL state must be a plain object.');
  }
  assertJson(
    state,
    URL_STATE_MAX_DEPTH,
    URL_STATE_MAX_SLICE_JSON,
    UrlStateErrorReason.STATE_TOO_LARGE,
  );
  return encode(
    state,
    URL_STATE_MAX_SLICE_JSON,
    URL_STATE_MAX_SLICE_ENCODED,
    UrlStateErrorReason.STATE_TOO_LARGE,
  );
}

/**
 * Decodes one app instance's state. Never throws.
 * @returns The state, or `null` for missing, malformed, oversized or tampered input
 */
export async function decodeUrlState(raw: string | null | undefined): Promise<JsonObject | null> {
  const value = await decode(
    raw,
    URL_STATE_MAX_SLICE_ENCODED,
    URL_STATE_MAX_SLICE_JSON,
    URL_STATE_MAX_DEPTH,
  );
  return isPlainObject(value) ? (value as JsonObject) : null;
}

/**
 * Encodes the host map.
 * @throws {CoreError} `INVALID_REQUEST` with `details.reason` ({@link UrlStateErrorReason})
 */
export async function encodeHostUrlState(map: HostUrlStateMap): Promise<string> {
  if (!isHostMap(map)) {
    fail(UrlStateErrorReason.NOT_PLAIN_OBJECT, 'Host URL state map has an invalid shape.');
  }
  const value = {
    org: map.org,
    ...(map.tenant !== undefined && { tenant: map.tenant }),
    apps: map.apps,
  };
  assertJson(
    value,
    URL_STATE_MAX_DEPTH + HOST_MAP_DEPTH,
    URL_STATE_MAX_HOST_JSON,
    UrlStateErrorReason.HOST_STATE_FULL,
  );
  return encode(
    value,
    URL_STATE_MAX_HOST_JSON,
    URL_STATE_MAX_HOST_ENCODED,
    UrlStateErrorReason.HOST_STATE_FULL,
  );
}

/**
 * Decodes the host map. Never throws.
 * @returns The map, or `null` for missing, malformed, oversized or tampered input, including a
 * state that its app couldn't have saved (over the per-instance limits)
 */
export async function decodeHostUrlState(
  raw: string | null | undefined,
): Promise<HostUrlStateMap | null> {
  const value = await decode(
    raw,
    URL_STATE_MAX_HOST_ENCODED,
    URL_STATE_MAX_HOST_JSON,
    URL_STATE_MAX_DEPTH + HOST_MAP_DEPTH,
  );
  if (!isHostMap(value)) return null;
  try {
    for (const instances of Object.values(value.apps)) {
      for (const state of Object.values(instances)) await encodeUrlState(state);
    }
  } catch {
    return null;
  }
  return {
    org: value.org,
    ...(value.tenant !== undefined && { tenant: value.tenant }),
    apps: value.apps,
  };
}

function fail(reason: UrlStateErrorReason, message: string): never {
  throw new CoreError(ErrorCode.INVALID_REQUEST, message, { reason });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function isHostMap(value: unknown): value is HostUrlStateMap {
  if (!isPlainObject(value)) return false;
  const { org, tenant, apps } = value;
  if (typeof org !== 'string' || org === '') return false;
  if (tenant !== undefined && typeof tenant !== 'string') return false;
  if (!isPlainObject(apps)) return false;
  return Object.values(apps).every(
    (instances) => isPlainObject(instances) && Object.values(instances).every(isPlainObject),
  );
}

/**
 * Rejects anything that isn't plain JSON (`-0` is the one value JSON can't keep: it comes back as
 * `0`). Counts the JSON size while walking, so a small object graph that repeats references can't
 * expand into a huge JSON string.
 */
function assertJson(
  root: object,
  maxDepth: number,
  maxJson: number,
  tooLarge: UrlStateErrorReason,
): void {
  const ancestors = new Set<object>();
  // A lower bound of the JSON size in bytes; `encode` checks the exact size.
  let size = 0;
  const count = (bytes: number) => {
    size += bytes;
    if (size > maxJson) fail(tooLarge, `URL state is over ${maxJson} bytes of JSON.`);
  };
  const visit = (value: unknown, path: string, depth: number): void => {
    if (value === null || typeof value === 'boolean') return count(5);
    if (typeof value === 'string') return count(value.length + 2);
    if (typeof value === 'number' && Number.isFinite(value)) return count(String(value).length);
    if (typeof value === 'object' && (Array.isArray(value) || isPlainObject(value))) {
      if (ancestors.has(value)) {
        fail(
          UrlStateErrorReason.NOT_SERIALIZABLE,
          `URL state has a circular reference at "${path}".`,
        );
      }
      if (depth > maxDepth) {
        fail(UrlStateErrorReason.NOT_SERIALIZABLE, `URL state is nested over ${maxDepth} levels.`);
      }
      count(2);
      ancestors.add(value);
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) visit(value[i], `${path}[${i}]`, depth + 1);
      } else {
        for (const key of Object.keys(value)) {
          if (UNSAFE_KEYS.has(key)) {
            fail(UrlStateErrorReason.NOT_SERIALIZABLE, `URL state can't use the key "${key}".`);
          }
          count(key.length + 3);
          visit((value as Record<string, unknown>)[key], path ? `${path}.${key}` : key, depth + 1);
        }
      }
      ancestors.delete(value);
      return;
    }
    fail(
      UrlStateErrorReason.NOT_SERIALIZABLE,
      `URL state value at "${path}" is not JSON-serializable.`,
    );
  };
  visit(root, '', 1);
}

async function encode(
  value: object,
  maxJson: number,
  maxEncoded: number,
  tooLarge: UrlStateErrorReason,
): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  if (bytes.byteLength > maxJson) {
    fail(tooLarge, `URL state is ${bytes.byteLength} bytes of JSON; the limit is ${maxJson}.`);
  }
  const plain = `1j.${toBase64Url(bytes)}`;
  const compressed =
    typeof CompressionStream === 'undefined'
      ? null
      : await transform(bytes, new CompressionStream('deflate'), Infinity);
  const zipped = compressed ? `1z.${toBase64Url(compressed)}` : null;
  const result = zipped && zipped.length < plain.length ? zipped : plain;
  if (result.length > maxEncoded) {
    fail(tooLarge, `URL state is ${result.length} chars encoded; the limit is ${maxEncoded}.`);
  }
  return result;
}

async function decode(
  raw: string | null | undefined,
  maxEncoded: number,
  maxJson: number,
  maxDepth: number,
): Promise<unknown> {
  try {
    if (typeof raw !== 'string' || raw === '' || raw.length > maxEncoded) return null;
    const match = FORMAT.exec(raw);
    if (!match) return null;
    const bytes = fromBase64Url(match[2]);
    if (!bytes) return null;

    let json: Uint8Array | null;
    if (match[1] === 'z') {
      json =
        typeof DecompressionStream === 'undefined'
          ? null
          : await transform(bytes, new DecompressionStream('deflate'), maxJson);
    } else {
      json = bytes.byteLength <= maxJson ? bytes : null;
    }
    if (!json) return null;

    const text = new TextDecoder('utf-8', { fatal: true }).decode(json);
    const value: unknown = JSON.parse(text);
    return isSafeJson(value, maxDepth) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Checks parsed JSON against the rules the encoder applies: at most `maxDepth` levels, and no
 * number that parsed to `Infinity` (e.g. `1e400`), which could never be saved again. Removes
 * prototype keys.
 */
function isSafeJson(value: unknown, maxDepth: number, depth = 1): boolean {
  if (typeof value === 'number') return Number.isFinite(value);
  if (value === null || typeof value !== 'object') return true;
  if (depth > maxDepth) return false;
  if (Array.isArray(value)) return value.every((item) => isSafeJson(item, maxDepth, depth + 1));
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (UNSAFE_KEYS.has(key)) {
      delete record[key];
    } else if (!isSafeJson(record[key], maxDepth, depth + 1)) {
      return false;
    }
  }
  return true;
}

/**
 * Runs bytes through a (de)compression stream. Stops and returns `null` as soon as the output
 * exceeds `maxOutput`, or when the stream fails (corrupt or truncated input).
 */
async function transform(
  input: Uint8Array,
  stream: CompressionStream | DecompressionStream,
  maxOutput: number,
): Promise<Uint8Array | null> {
  const writer = stream.writable.getWriter();
  writer.write(input as Uint8Array<ArrayBuffer>).catch(noop);
  writer.close().catch(noop);

  const reader = stream.readable.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxOutput) {
        reader.cancel().catch(noop);
        return null;
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }

  const output = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return output;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(payload: string): Uint8Array | null {
  if (payload.length % 4 === 1) return null;
  const base64 =
    payload.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((payload.length + 3) % 4);
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}
