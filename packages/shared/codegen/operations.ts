import type { IR } from '@hey-api/openapi-ts';

/**
 * Methods in the order the SDK functions are emitted for each path.
 */
const METHODS = ['delete', 'get', 'head', 'options', 'patch', 'post', 'put', 'trace'] as const;

export type HttpMethod = (typeof METHODS)[number];

export type BodyType = 'form-data' | 'json' | 'octet-stream' | 'text' | 'url-search-params';

export type TypeRole = 'data' | 'response' | 'error';

/**
 * Returns the name of the generated type for an operation, or `undefined` when the
 * type generator did not emit one (e.g. an operation without error responses).
 */
export type TypeLookup = (operationId: string, role: TypeRole) => string | undefined;

/**
 * Security requirement in the shape expected by the HTTP client's `security` option.
 */
export interface Security {
  in?: 'cookie' | 'query';
  name?: string;
  scheme?: 'basic' | 'bearer';
  type: 'apiKey' | 'http';
}

export interface Operation {
  /** SDK function name. */
  id: string;
  method: HttpMethod;
  /** URL template, e.g. `/v1/items/{id}`. */
  path: string;
  summary?: string;
  description?: string;
  deprecated: boolean;
  /** Whether the SDK function's `options` argument is required. */
  optionsRequired: boolean;
  body?: {
    type: BodyType;
    mediaType: string;
  };
  /** Set when array query parameters are not exploded. */
  arrayQueryExplode?: false;
  security: Security[];
  types: Record<TypeRole, string | undefined> & { data: string };
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

const RESERVED_WORDS = new Set([
  'arguments',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
]);

/**
 * Names declared by the generated modules themselves.
 */
const INTERNAL_NAMES = new Set([
  '_heyApiClient',
  'Client',
  'ClientOptions',
  'formDataBodySerializer',
  'Options',
  'TDataShape',
  'urlSearchParamsBodySerializer',
]);

export function assertIdentifier(name: string, kind: string): void {
  if (!IDENTIFIER.test(name) || RESERVED_WORDS.has(name) || INTERNAL_NAMES.has(name)) {
    throw new Error(`Invalid ${kind} name '${name}'`);
  }
}

/**
 * Collects the operations of the parsed spec in emit order: paths in spec order, methods
 * in alphabetical order.
 */
export function collectOperations(ir: IR.Model, lookupType: TypeLookup): Operation[] {
  const operations: Operation[] = [];
  const ids = new Set<string>();

  for (const [path, pathItem] of Object.entries(ir.paths ?? {}) as [string, IR.PathItemObject][]) {
    for (const method of METHODS) {
      const operation = pathItem[method];
      if (!operation) {
        continue;
      }

      const location = `${method.toUpperCase()} ${path}`;

      assertIdentifier(operation.id, 'operation');
      if (ids.has(operation.id)) {
        throw new Error(`Duplicate operation name '${operation.id}': ${location}`);
      }
      ids.add(operation.id);

      operations.push({
        id: operation.id,
        method,
        path,
        summary: operation.summary,
        description: operation.description,
        deprecated: Boolean(operation.deprecated),
        optionsRequired: isOptionsRequired(operation),
        body: readBody(operation, location),
        arrayQueryExplode: readArrayQueryExplode(ir, operation, location),
        security: readSecurity(operation, location),
        types: readTypes(operation, location, lookupType),
      });
    }
  }

  return operations;
}

function isOptionsRequired(operation: IR.OperationObject): boolean {
  if (operation.body?.required) {
    return true;
  }

  const { cookie = {}, header = {}, path = {}, query = {} } = operation.parameters ?? {};

  return [cookie, header, path, query].some((parameters) =>
    Object.values(parameters).some((parameter) => parameter.required),
  );
}

function readBody(operation: IR.OperationObject, location: string): Operation['body'] {
  if (!operation.body) {
    return undefined;
  }

  const { mediaType, type } = operation.body;
  if (!type) {
    throw new Error(`Unsupported request body media type '${mediaType}': ${location}`);
  }

  return { type, mediaType };
}

/**
 * Checks that every parameter can be serialized by the HTTP client. Query arrays use the
 * `form` style, exploded by default; objects use the `deepObject` style.
 */
function readArrayQueryExplode(
  ir: IR.Model,
  operation: IR.OperationObject,
  location: string,
): false | undefined {
  const { cookie = {}, path = {}, query = {} } = operation.parameters ?? {};

  for (const parameter of Object.values(cookie)) {
    throw new Error(`Cookie parameter '${parameter.name}' is not supported: ${location}`);
  }

  for (const parameter of Object.values(path)) {
    if (parameter.style !== 'simple' || parameter.explode) {
      throw new Error(
        `Path parameter '${parameter.name}' must use the simple style without explode: ${location}`,
      );
    }
  }

  const arrayExplode = new Set<boolean>();

  for (const parameter of Object.values(query)) {
    if (parameter.allowReserved) {
      throw new Error(
        `Query parameter '${parameter.name}' with allowReserved is not supported: ${location}`,
      );
    }

    const kind = schemaKind(ir, parameter.schema, location);

    if (kind === 'array') {
      if (parameter.style !== 'form') {
        throw new Error(
          `Array query parameter '${parameter.name}' must use the form style: ${location}`,
        );
      }
      arrayExplode.add(parameter.explode);
    }

    if (kind === 'object' && parameter.style !== 'deepObject') {
      throw new Error(
        `Object query parameter '${parameter.name}' must use the deepObject style: ${location}`,
      );
    }
  }

  if (arrayExplode.size > 1) {
    throw new Error(`Array query parameters must all use the same explode value: ${location}`);
  }

  return arrayExplode.has(false) ? false : undefined;
}

function schemaKind(
  ir: IR.Model,
  schema: IR.SchemaObject,
  location: string,
  seen: string[] = [],
): 'array' | 'object' | 'primitive' {
  if (schema.$ref) {
    const prefix = '#/components/schemas/';
    const target = schema.$ref.startsWith(prefix)
      ? ir.components?.schemas?.[schema.$ref.slice(prefix.length)]
      : undefined;
    if (!target) {
      throw new Error(`Unresolvable parameter schema '${schema.$ref}': ${location}`);
    }
    if (seen.includes(schema.$ref)) {
      throw new Error(`Circular parameter schema '${schema.$ref}': ${location}`);
    }
    return schemaKind(ir, target, location, [...seen, schema.$ref]);
  }

  if (schema.logicalOperator && schema.items) {
    // Null values are not sent, so a nullable parameter is serialized like its other schemas
    const kinds = new Set(
      schema.items
        .filter((item) => item.type !== 'null')
        .map((item) => schemaKind(ir, item, location, seen)),
    );
    if (kinds.size > 1) {
      throw new Error(
        `Query parameter schemas must not mix arrays, objects and primitives: ${location}`,
      );
    }
    return kinds.values().next().value ?? 'primitive';
  }

  if (schema.type === 'array' || schema.type === 'tuple') {
    return 'array';
  }

  return schema.type === 'object' ? 'object' : 'primitive';
}

function readSecurity(operation: IR.OperationObject, location: string): Security[] {
  const security: Security[] = [];

  for (const scheme of operation.security ?? []) {
    const item = toSecurity(scheme);
    if (!item) {
      throw new Error(`Unsupported security scheme ${JSON.stringify(scheme)}: ${location}`);
    }
    if (!security.some((existing) => JSON.stringify(existing) === JSON.stringify(item))) {
      security.push(item);
    }
  }

  return security;
}

function toSecurity(scheme: IR.SecurityObject): Security | undefined {
  switch (scheme.type) {
    case 'openIdConnect':
      return { scheme: 'bearer', type: 'http' };
    case 'oauth2': {
      const { authorizationCode, clientCredentials, implicit, password } = scheme.flows ?? {};
      return authorizationCode || clientCredentials || implicit || password
        ? { scheme: 'bearer', type: 'http' }
        : undefined;
    }
    case 'apiKey':
      if (scheme.in === 'header') {
        return { name: scheme.name, type: 'apiKey' };
      }
      if (scheme.in === 'query' || scheme.in === 'cookie') {
        return { in: scheme.in, name: scheme.name, type: 'apiKey' };
      }
      return undefined;
    case 'http': {
      const name = scheme.scheme.toLowerCase();
      return name === 'bearer' || name === 'basic' ? { scheme: name, type: 'http' } : undefined;
    }
    default:
      return undefined;
  }
}

function readTypes(
  operation: IR.OperationObject,
  location: string,
  lookupType: TypeLookup,
): Operation['types'] {
  const [data, response, error] = (['data', 'response', 'error'] as const).map((role) => {
    const name = lookupType(operation.id, role);
    if (name !== undefined) {
      assertIdentifier(name, 'type');
    }
    return name;
  });

  if (!data) {
    throw new Error(`No request type was generated: ${location}`);
  }

  return { data, response, error };
}
