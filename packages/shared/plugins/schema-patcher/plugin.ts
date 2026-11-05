import type { DefinePlugin } from '@hey-api/openapi-ts';
import { buildGraph } from '@hey-api/shared';
import type { Config } from './types';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

interface XScSdk {
  generate?: boolean;
  operationName?: string;
}

function getXScSdk(obj: Record<string, any> | undefined): XScSdk | undefined {
  return obj?.['x-sc-sdk'] as XScSdk | undefined;
}

const COMPONENT_REF_PREFIX = '#/components/';

function collectComponentRefs(value: unknown, refs: Set<string>): void {
  if (Array.isArray(value)) {
    for (const item of value) collectComponentRefs(item, refs);
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (key === '$ref' && typeof child === 'string' && child.startsWith(COMPONENT_REF_PREFIX)) {
      refs.add(child);
    } else {
      collectComponentRefs(child, refs);
    }
  }
}

function resolveComponentRef(spec: Record<string, any> | undefined, ref: string): unknown {
  const [type, name] = ref.slice(COMPONENT_REF_PREFIX.length).split('/');
  return spec?.components?.[type]?.[name];
}

/** Expands a set of component refs to include every component they transitively reference. */
function expandComponentRefs(spec: Record<string, any> | undefined, refs: Set<string>): Set<string> {
  const queue = [...refs];
  while (queue.length) {
    const nested = new Set<string>();
    collectComponentRefs(resolveComponentRef(spec, queue.pop()!), nested);
    for (const ref of nested) {
      if (!refs.has(ref)) {
        refs.add(ref);
        queue.push(ref);
      }
    }
  }
  return refs;
}

/**
 * Removes components (schemas, parameters, etc.) that were only referenced by
 * operations excluded via `x-sc-sdk.generate: false`, so their types are not
 * emitted. Components still used by generated operations, or never referenced
 * by any operation, are kept.
 */
function pruneExcludedComponents(
  ir: any,
  spec: Record<string, any> | undefined,
  removedRefs: Set<string>,
  keptRefs: Set<string>,
): void {
  if (!removedRefs.size || !ir?.components) return;
  expandComponentRefs(spec, removedRefs);
  expandComponentRefs(spec, keptRefs);
  for (const ref of removedRefs) {
    if (keptRefs.has(ref)) continue;
    const [type, name] = ref.slice(COMPONENT_REF_PREFIX.length).split('/');
    if (ir.components[type]) {
      delete ir.components[type][name];
    }
  }
}

function isEmptySchema(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !Object.keys(value).length
  );
}

/**
 * Objects declared with no properties and `additionalProperties: {}` were
 * generated as `{}` before @hey-api/openapi-ts 0.73; later versions generate
 * `{ [key: string]: unknown }`, which rejects interface-typed values. Drop the
 * index signature from the IR so the SDK keeps the published `{}` type.
 */
function keepEmptyObjectTypes(raw: any, ir: any): void {
  if (!raw || !ir || typeof raw !== 'object' || typeof ir !== 'object' || raw.$ref || ir.$ref) {
    return;
  }
  const properties = raw.properties ?? {};
  if (
    raw.type === 'object' &&
    !Object.keys(properties).length &&
    isEmptySchema(raw.additionalProperties) &&
    !ir.properties
  ) {
    delete ir.additionalProperties;
    return;
  }
  for (const [name, schema] of Object.entries(properties)) {
    keepEmptyObjectTypes(schema, ir.properties?.[name]);
  }
  if (raw.items && Array.isArray(ir.items) && ir.items.length === 1) {
    keepEmptyObjectTypes(raw.items, ir.items[0]);
  }
}

export const handler: DefinePlugin<Config>['Handler'] = ({ plugin }) => {
  const context = plugin.context;
  const config = plugin.config;
  const ir = context.ir;
  const spec = (context as any).spec as Record<string, any> | undefined;

  // Set the base URL if provided in config
  if (ir && ir.servers && ir.servers.length > 0) {
    if (config.baseUrl) {
      // baseUrl takes precedence - use full URL as-is
      ir.servers[0].url = config.baseUrl;
    } else if (config.basePath) {
      // basePath - construct URL with edge platform domain
      ir.servers[0].url = `https://example.com${config.basePath}`;
    }
  }

  // Define the sitecoreContextId parameter
  const sitecoreContextIdParam = {
    allowReserved: false,
    explode: true,
    location: 'query',
    name: 'sitecoreContextId',
    schema: {
      description: 'The Sitecore context ID.',
      type: 'string',
    },
    style: 'form',
    description: 'The Sitecore context ID.',
    required: false,
  };

  // Process all routes: apply x-sc-sdk directives and inject sitecoreContextId
  if (ir && ir.paths) {
    const pathsToDelete: string[] = [];
    const removedRefs = new Set<string>();
    const keptRefs = new Set<string>();

    for (const path in ir.paths) {
      const irMethods = (ir.paths as Record<string, any>)[path];
      // Read x-sc-sdk from the raw spec for this path
      const specPath = spec?.paths?.[path] as Record<string, any> | undefined;
      const pathLevelSdk = getXScSdk(specPath);
      const pathLevelGenerate = pathLevelSdk?.generate;

      const methodsToDelete: string[] = [];

      for (const method of HTTP_METHODS) {
        const operation = (irMethods as Record<string, any>)[method];
        if (!operation) continue;

        // Read x-sc-sdk from the raw spec for this operation
        const specOp = specPath?.[method] as Record<string, any> | undefined;
        const opSdk = getXScSdk(specOp);

        // x-sc-sdk.generate filtering (operation overrides path)
        const effectiveGenerate = opSdk?.generate ?? pathLevelGenerate;
        if (effectiveGenerate === false) {
          methodsToDelete.push(method);
          collectComponentRefs(specOp, removedRefs);
          continue;
        }
        collectComponentRefs(specOp, keptRefs);

        // x-sc-sdk.operationName → override IR operation id
        if (opSdk?.operationName) {
          operation.id = opSdk.operationName;
          operation.operationId = opSdk.operationName;
        }

        // Inject sitecoreContextId parameter
        if (operation.parameters?.query) {
          if (!operation.parameters.query.sitecoreContextId) {
            operation.parameters.query.sitecoreContextId = sitecoreContextIdParam;
          }
        } else {
          operation.parameters = operation.parameters || {};
          operation.parameters.query = { sitecoreContextId: sitecoreContextIdParam };
        }
      }

      // Delete filtered methods
      for (const m of methodsToDelete) {
        delete (irMethods as Record<string, any>)[m];
      }

      // If no HTTP methods remain, mark path for deletion
      const hasRemainingMethods = HTTP_METHODS.some(
        (m) => (irMethods as Record<string, any>)[m] != null,
      );
      if (!hasRemainingMethods) {
        pathsToDelete.push(path);
      }

      // Path-level refs (e.g. shared parameters) belong to whichever side the path ends up on
      if (specPath) {
        const pathLevel = Object.fromEntries(
          Object.entries(specPath).filter(([key]) => !(HTTP_METHODS as readonly string[]).includes(key)),
        );
        collectComponentRefs(pathLevel, hasRemainingMethods ? keptRefs : removedRefs);
      }
    }

    // Delete empty paths
    for (const p of pathsToDelete) {
      delete (ir.paths as Record<string, any>)[p];
    }

    pruneExcludedComponents(ir, spec, removedRefs, keptRefs);

    // Keep `{}` for property-less objects in request bodies
    for (const path in ir.paths) {
      for (const method of HTTP_METHODS) {
        const body = (ir.paths as Record<string, any>)[path][method]?.body;
        const content = spec?.paths?.[path]?.[method]?.requestBody?.content;
        if (body?.schema && content?.[body.mediaType]) {
          keepEmptyObjectTypes(content[body.mediaType].schema, body.schema);
        }
      }
    }
  }

  // Keep `{}` for property-less objects in component schemas
  const irSchemas = (ir?.components?.schemas ?? {}) as Record<string, any>;
  for (const name in irSchemas) {
    keepEmptyObjectTypes(spec?.components?.schemas?.[name], irSchemas[name]);
  }

  // Hey API's walkers use a prebuilt graph, not the mutated IR paths directly.
  if (context.graph) {
    context.graph = buildGraph(ir, context.logger).graph;
  }
};
