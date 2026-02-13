import * as fs from 'node:fs';
import * as yaml from 'js-yaml';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

interface XScSdk {
  generate?: boolean;
  operationName?: string;
}

/**
 * Options for the raw-spec preprocessor.
 * These options are applied to the raw OpenAPI spec **before** hey-api parses it.
 */
export interface PreprocessInputOptions {
  /**
   * Only keep operations whose operationId is in this list (applied after operationName override).
   * Mutually exclusive with `excludeOperationIds`.
   */
  includeOperationIds?: string[];

  /**
   * Remove operations whose operationId is in this list (applied after operationName override).
   * Mutually exclusive with `includeOperationIds`.
   */
  excludeOperationIds?: string[];

  /**
   * Only keep operations that have at least one matching tag.
   * Mutually exclusive with `excludeTags`.
   */
  includeTags?: string[];

  /**
   * Remove operations that have any matching tag.
   * Mutually exclusive with `includeTags`.
   */
  excludeTags?: string[];
}

function getXScSdk(obj: Record<string, any> | undefined): XScSdk | undefined {
  return obj?.['x-sc-sdk'] as XScSdk | undefined;
}

function stripXScSdk(obj: Record<string, any>): void {
  delete obj['x-sc-sdk'];
}

function passesTagFilter(tags: string[] | undefined, options: PreprocessInputOptions): boolean {
  if (options.includeTags?.length) {
    if (!tags || tags.length === 0) return false;
    return tags.some((t) => options.includeTags!.includes(t));
  }
  if (options.excludeTags?.length) {
    if (!tags || tags.length === 0) return true;
    return !tags.some((t) => options.excludeTags!.includes(t));
  }
  return true;
}

function passesOperationIdFilter(opId: string | undefined, options: PreprocessInputOptions): boolean {
  if (options.includeOperationIds?.length) {
    return opId != null && options.includeOperationIds.includes(opId);
  }
  if (options.excludeOperationIds?.length) {
    return opId == null || !options.excludeOperationIds.includes(opId);
  }
  return true;
}

function validateOptions(options: PreprocessInputOptions): void {
  if (options.includeOperationIds?.length && options.excludeOperationIds?.length) {
    throw new Error('preprocessInput: "includeOperationIds" and "excludeOperationIds" are mutually exclusive.');
  }
  if (options.includeTags?.length && options.excludeTags?.length) {
    throw new Error('preprocessInput: "includeTags" and "excludeTags" are mutually exclusive.');
  }
}

/**
 * Pre-processes a raw OpenAPI spec, applying `x-sc-sdk` directives and optional
 * filters **before** the spec is handed to hey-api's `createClient()`.
 *
 * Processing order:
 * 1. `x-sc-sdk.generate` filtering (with path → operation inheritance)
 * 2. Tag filtering (`includeTags` / `excludeTags`)
 * 3. `x-sc-sdk.operationName` → `operationId` override
 * 4. OperationId filtering (`includeOperationIds` / `excludeOperationIds`)
 * 5. Cleanup (strip `x-sc-sdk` keys, remove empty paths)
 *
 * @param input - File path (JSON/YAML) or URL string or a spec object.
 * @param options - Optional filters.
 * @returns A cloned, transformed OpenAPI spec object suitable for `createClient({ input: result })`.
 */
export async function preprocessInput(
  input: string | Record<string, any>,
  options: PreprocessInputOptions = {},
): Promise<Record<string, any>> {
  validateOptions(options);

  let spec: Record<string, any>;

  if (typeof input === 'string') {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      // Fetch remote spec
      const response = await fetch(input);
      const text = await response.text();
      // Try JSON first, fall back to YAML
      try {
        spec = JSON.parse(text);
      } catch {
        spec = yaml.load(text) as Record<string, any>;
      }
    } else {
      // Local file
      const content = fs.readFileSync(input, 'utf-8');
      if (input.endsWith('.yaml') || input.endsWith('.yml')) {
        spec = yaml.load(content) as Record<string, any>;
      } else {
        spec = JSON.parse(content);
      }
    }
  } else {
    spec = JSON.parse(JSON.stringify(input)); // deep clone
  }

  if (!spec.paths) return spec;

  const pathsToDelete: string[] = [];

  for (const [pathKey, pathItem] of Object.entries(spec.paths as Record<string, any>)) {
    const pathLevelSdk = getXScSdk(pathItem);
    const pathLevelGenerate = pathLevelSdk?.generate;

    // Strip path-level x-sc-sdk
    stripXScSdk(pathItem);

    const methodsToDelete: string[] = [];

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation) continue;

      const opSdk = getXScSdk(operation);

      // 1. x-sc-sdk.generate filtering (operation overrides path)
      const effectiveGenerate = opSdk?.generate ?? pathLevelGenerate;
      if (effectiveGenerate === false) {
        methodsToDelete.push(method);
        continue;
      }

      // 2. Tag filtering
      if (!passesTagFilter(operation.tags, options)) {
        methodsToDelete.push(method);
        continue;
      }

      // 3. operationName → operationId override
      if (opSdk?.operationName) {
        operation.operationId = opSdk.operationName;
      }

      // 4. OperationId filtering (after override)
      if (!passesOperationIdFilter(operation.operationId, options)) {
        methodsToDelete.push(method);
        continue;
      }

      // Strip operation-level x-sc-sdk
      stripXScSdk(operation);
    }

    for (const method of methodsToDelete) {
      delete pathItem[method];
    }

    const hasRemainingMethods = HTTP_METHODS.some((m) => pathItem[m] != null);
    if (!hasRemainingMethods) {
      pathsToDelete.push(pathKey);
    }
  }

  for (const p of pathsToDelete) {
    delete spec.paths[p];
  }

  return spec;
}
