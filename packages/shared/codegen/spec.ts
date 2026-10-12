import fs from 'node:fs';
import { load } from 'js-yaml';

export const HTTP_METHODS = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
] as const;

export type OpenApiDocument = Record<string, any>;

export interface SpecOptions {
  /**
   * Server URL used as the client's default `baseUrl`. Takes precedence over `basePath`.
   */
  baseUrl?: string;
  /**
   * Path appended to `https://example.com` and used as the client's default `baseUrl`.
   */
  basePath?: string;
}

/**
 * Sitecore vendor extension that controls SDK generation for a path or an operation.
 * An operation-level value overrides the path-level value.
 */
interface SdkDirective {
  /**
   * Set to `false` to leave the operation out of the SDK.
   */
  generate?: boolean;
  /**
   * Operation id to use instead of the spec's `operationId` (operations only).
   */
  operationName?: string;
}

export const SITECORE_CONTEXT_ID = 'sitecoreContextId';

/**
 * Vendor extension that marks a schema declared as `additionalProperties`, so the type generator
 * can tell it apart from the implicit "any additional property" of an object schema without
 * `additionalProperties`.
 */
export const DECLARED_ADDITIONAL_PROPERTIES = 'x-sc-sdk-additional-properties';

const SERVER_URL = /^https?:\/\/[^{}\s]+$/;

/**
 * Keywords whose value is a schema (or, for `items` in older drafts, a list of schemas).
 */
const SCHEMA_KEYWORDS = [
  'additionalItems',
  'additionalProperties',
  'contains',
  'contentSchema',
  'else',
  'if',
  'items',
  'not',
  'propertyNames',
  'then',
  'unevaluatedItems',
  'unevaluatedProperties',
];

/**
 * Keywords whose value is a list of schemas.
 */
const SCHEMA_LIST_KEYWORDS = ['allOf', 'anyOf', 'oneOf', 'prefixItems'];

/**
 * Keywords whose value maps names to schemas.
 */
const SCHEMA_MAP_KEYWORDS = [
  '$defs',
  'definitions',
  'dependentSchemas',
  'patternProperties',
  'properties',
];

/**
 * Reads an OpenAPI 3 document from a JSON or YAML file.
 */
export function loadSpec(file: string): OpenApiDocument {
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const spec: unknown = /\.ya?ml$/i.test(file) ? load(text) : JSON.parse(text);

  if (!isRecord(spec) || typeof spec.openapi !== 'string' || !spec.openapi.startsWith('3.')) {
    throw new Error(`${file} is not an OpenAPI 3 document`);
  }

  return spec;
}

/**
 * Applies the Sitecore conventions to a copy of the spec:
 * - removes operations marked with `x-sc-sdk.generate: false`, applies `x-sc-sdk.operationName` and
 *   rejects operation names that collide
 * - adds the optional `sitecoreContextId` query parameter to every operation
 * - removes schema titles and marks `additionalProperties` schemas (see `normalizeSchemas`)
 * - sets the default server URL from `baseUrl` or `basePath`
 */
export function preprocessSpec(
  source: OpenApiDocument,
  options: SpecOptions = {},
): OpenApiDocument {
  const spec = structuredClone(source);

  assertLocalRefs(spec, '#');
  applySdkDirectives(spec);
  addSitecoreContextId(spec);
  normalizeSchemas(spec);
  setServer(spec, options);

  return spec;
}

/**
 * Only references within the document are allowed, so generation never reads other files or the
 * network.
 */
function assertLocalRefs(value: unknown, pointer: string): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertLocalRefs(item, `${pointer}/${index}`));
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  if (typeof value.$ref === 'string' && !value.$ref.startsWith('#')) {
    throw new Error(`Unsupported external $ref '${value.$ref}' at ${pointer}`);
  }

  for (const [key, child] of Object.entries(value)) {
    assertLocalRefs(child, `${pointer}/${escapePointerSegment(key)}`);
  }
}

function applySdkDirectives(spec: OpenApiDocument): void {
  if (!isRecord(spec.paths)) {
    return;
  }

  const operationNames = new Map<string, string>();

  for (const [route, pathItem] of Object.entries(spec.paths)) {
    if (!isRecord(pathItem)) {
      continue;
    }

    if (pathItem.$ref !== undefined) {
      throw new Error(`Path item $ref is not supported: ${route}`);
    }

    const pathDirective = readSdkDirective(pathItem, route);
    if (pathDirective?.operationName !== undefined) {
      throw new Error(`x-sc-sdk.operationName is only supported on operations: ${route}`);
    }

    let removed = false;

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!isRecord(operation)) {
        continue;
      }

      const location = `${method.toUpperCase()} ${route}`;
      const directive = readSdkDirective(operation, location);

      if ((directive?.generate ?? pathDirective?.generate) === false) {
        delete pathItem[method];
        removed = true;
        continue;
      }

      if (directive?.operationName) {
        operation.operationId = directive.operationName;
      }

      // The type generator converts operation ids to camelCase (or derives them from the method
      // and the path) and numbers the duplicates, which would silently rename SDK functions
      const name =
        typeof operation.operationId === 'string'
          ? operation.operationId
          : `${method}-${route.replace(/{(.*?)}/g, 'by-$1')}`;
      const key = name.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
      const other = operationNames.get(key);
      if (other !== undefined) {
        throw new Error(`Operation name '${name}' collides with '${other}': ${location}`);
      }
      operationNames.set(key, name);
    }

    if (removed && !HTTP_METHODS.some((method) => pathItem[method] !== undefined)) {
      delete spec.paths[route];
    }
  }
}

function readSdkDirective(owner: Record<string, any>, location: string): SdkDirective | undefined {
  const directive: unknown = owner['x-sc-sdk'];

  if (directive === undefined) {
    return undefined;
  }

  if (!isRecord(directive)) {
    throw new Error(`x-sc-sdk must be an object: ${location}`);
  }

  if (directive.generate !== undefined && typeof directive.generate !== 'boolean') {
    throw new Error(`x-sc-sdk.generate must be a boolean: ${location}`);
  }

  if (
    directive.operationName !== undefined &&
    (typeof directive.operationName !== 'string' || !directive.operationName.trim())
  ) {
    throw new Error(`x-sc-sdk.operationName must be a non-empty string: ${location}`);
  }

  return directive as SdkDirective;
}

function addSitecoreContextId(spec: OpenApiDocument): void {
  if (!isRecord(spec.paths)) {
    return;
  }

  for (const [route, pathItem] of Object.entries(spec.paths)) {
    if (!isRecord(pathItem)) {
      continue;
    }

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!isRecord(operation)) {
        continue;
      }

      const location = `${method.toUpperCase()} ${route}`;
      const queryParameters = [
        ...parameterList(pathItem, route),
        ...parameterList(operation, location),
      ]
        .map((parameter) => resolveRef(spec, parameter))
        .filter(
          (parameter): parameter is Record<string, any> =>
            isRecord(parameter) && parameter.in === 'query',
        );

      if (queryParameters.some((parameter) => parameter.name === SITECORE_CONTEXT_ID)) {
        continue;
      }

      const clash = queryParameters.find(
        (parameter) =>
          typeof parameter.name === 'string' &&
          parameter.name.toLowerCase() === SITECORE_CONTEXT_ID.toLowerCase(),
      );
      if (clash) {
        throw new Error(
          `Query parameter '${clash.name}' clashes with '${SITECORE_CONTEXT_ID}': ${location}`,
        );
      }

      operation.parameters = [...parameterList(operation, location), sitecoreContextIdParameter()];
    }
  }
}

function sitecoreContextIdParameter() {
  return {
    name: SITECORE_CONTEXT_ID,
    in: 'query',
    required: false,
    description: 'The Sitecore context ID.',
    schema: {
      type: 'string',
      description: 'The Sitecore context ID.',
    },
    style: 'form',
    explode: true,
    allowReserved: false,
  };
}

/**
 * Keeps the generated types as they were with the previous type generator, which did not emit
 * schema titles (mostly derived from property names) and typed an object schema without
 * properties as `{}` when its `additionalProperties` schema allows any value.
 */
function normalizeSchemas(spec: OpenApiDocument): void {
  forEachSchema(spec, (schema) => {
    delete schema.title;

    const { additionalProperties } = schema;
    if (isRecord(additionalProperties) && additionalProperties.$ref === undefined) {
      additionalProperties[DECLARED_ADDITIONAL_PROPERTIES] = true;
    }
  });
}

/**
 * Calls `visit` for every schema of the document, nested schemas included. Data such as
 * examples and default values is not visited.
 */
function forEachSchema(spec: OpenApiDocument, visit: (schema: Record<string, any>) => void): void {
  const seen = new Set<object>();

  const schema = (value: unknown): void => {
    if (!isRecord(value) || seen.has(value)) {
      return;
    }
    seen.add(value);
    visit(value);

    for (const keyword of SCHEMA_KEYWORDS) {
      [value[keyword]].flat().forEach(schema);
    }
    for (const keyword of SCHEMA_LIST_KEYWORDS) {
      listOf(value[keyword]).forEach(schema);
    }
    for (const keyword of SCHEMA_MAP_KEYWORDS) {
      valuesOf(value[keyword]).forEach(schema);
    }
  };

  const content = (value: unknown): void => {
    for (const mediaType of valuesOf(value)) {
      if (isRecord(mediaType)) {
        schema(mediaType.schema);
      }
    }
  };

  const parameter = (value: unknown): void => {
    if (isRecord(value)) {
      schema(value.schema);
      content(value.content);
    }
  };

  const requestBody = (value: unknown): void => {
    if (isRecord(value)) {
      content(value.content);
    }
  };

  const response = (value: unknown): void => {
    if (isRecord(value)) {
      content(value.content);
      valuesOf(value.headers).forEach(parameter);
    }
  };

  const pathItem = (value: unknown): void => {
    if (!isRecord(value)) {
      return;
    }

    listOf(value.parameters).forEach(parameter);

    for (const method of HTTP_METHODS) {
      const operation = value[method];
      if (isRecord(operation)) {
        listOf(operation.parameters).forEach(parameter);
        requestBody(operation.requestBody);
        valuesOf(operation.responses).forEach(response);
        valuesOf(operation.callbacks).forEach((callback) => valuesOf(callback).forEach(pathItem));
      }
    }
  };

  valuesOf(spec.paths).forEach(pathItem);
  valuesOf(spec.webhooks).forEach(pathItem);

  const components = isRecord(spec.components) ? spec.components : {};
  valuesOf(components.schemas).forEach(schema);
  valuesOf(components.parameters).forEach(parameter);
  valuesOf(components.headers).forEach(parameter);
  valuesOf(components.requestBodies).forEach(requestBody);
  valuesOf(components.responses).forEach(response);
  valuesOf(components.pathItems).forEach(pathItem);
  valuesOf(components.callbacks).forEach((callback) => valuesOf(callback).forEach(pathItem));
}

function listOf(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function valuesOf(value: unknown): unknown[] {
  return isRecord(value) ? Object.values(value) : [];
}

function parameterList(owner: Record<string, any>, location: string): unknown[] {
  if (owner.parameters === undefined) {
    return [];
  }

  if (!Array.isArray(owner.parameters)) {
    throw new Error(`parameters must be an array: ${location}`);
  }

  return owner.parameters;
}

function setServer(spec: OpenApiDocument, { baseUrl, basePath }: SpecOptions): void {
  const url = baseUrl || (basePath ? `https://example.com${basePath}` : undefined);

  if (spec.servers !== undefined && !Array.isArray(spec.servers)) {
    throw new Error('servers must be an array');
  }

  if (url) {
    const [first, ...rest] = spec.servers ?? [];
    spec.servers = [{ ...(isRecord(first) ? first : {}), url }, ...rest];
  }

  const server = spec.servers?.[0];
  if (!isRecord(server) || typeof server.url !== 'string' || !SERVER_URL.test(server.url)) {
    throw new Error(
      'The first server URL must be an absolute http(s) URL without variables. Set baseUrl or basePath.',
    );
  }
}

/**
 * Resolves a local `$ref` (JSON pointer in a URI fragment) against the document.
 */
function resolveRef(spec: OpenApiDocument, value: unknown, seen: string[] = []): unknown {
  if (!isRecord(value) || typeof value.$ref !== 'string') {
    return value;
  }

  const ref = value.$ref;
  if (seen.includes(ref)) {
    throw new Error(`Circular $ref: ${[...seen, ref].join(' -> ')}`);
  }

  const pointer = decodeURIComponent(ref.slice(1));
  if (pointer && !pointer.startsWith('/')) {
    throw new Error(`Invalid $ref '${ref}'`);
  }

  let target: unknown = spec;
  for (const segment of pointer.split('/').slice(1).map(unescapePointerSegment)) {
    target = isRecord(target) || Array.isArray(target) ? (target as any)[segment] : undefined;
  }

  if (target === undefined) {
    throw new Error(`Unresolvable $ref '${ref}'`);
  }

  return resolveRef(spec, target, [...seen, ref]);
}

function escapePointerSegment(segment: string): string {
  return segment.replace(/~/g, '~0').replace(/\//g, '~1');
}

function unescapePointerSegment(segment: string): string {
  return segment.replace(/~1/g, '/').replace(/~0/g, '~');
}

export function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
