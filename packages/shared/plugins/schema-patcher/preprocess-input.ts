import * as fs from 'node:fs';
import * as yaml from 'js-yaml';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

interface XScSdk {
  generate?: boolean;
  operationName?: string;
}

function getXScSdk(obj: Record<string, any> | undefined): XScSdk | undefined {
  return obj?.['x-sc-sdk'] as XScSdk | undefined;
}

function stripXScSdk(obj: Record<string, any>): void {
  delete obj['x-sc-sdk'];
}

/**
 * Pre-processes a raw OpenAPI spec, applying `x-sc-sdk` directives
 * **before** the spec is handed to hey-api's `createClient()`.
 *
 * Processing order:
 * 1. `x-sc-sdk.generate` filtering (with path → operation inheritance)
 * 2. `x-sc-sdk.operationName` → `operationId` override
 * 3. Cleanup (strip `x-sc-sdk` keys, remove empty paths)
 *
 * @param input - File path (JSON/YAML) or URL string or a spec object.
 * @returns A cloned, transformed OpenAPI spec object suitable for `createClient({ input: result })`.
 */
export async function preprocessInput(
  input: string | Record<string, any>,
): Promise<Record<string, any>> {

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

      // 2. operationName → operationId override
      if (opSdk?.operationName) {
        operation.operationId = opSdk.operationName;
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
