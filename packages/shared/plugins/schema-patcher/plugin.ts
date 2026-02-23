import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

interface XScSdk {
  generate?: boolean;
  operationName?: string;
}

function getXScSdk(obj: Record<string, any> | undefined): XScSdk | undefined {
  return obj?.['x-sc-sdk'] as XScSdk | undefined;
}

export const handler: Plugin.Handler<Config> = ({ context, plugin }) => {
  const ir = context.ir;
  const spec = (context as any).spec as Record<string, any> | undefined;

  // Set the base URL if provided in config
  if (ir && ir.servers && ir.servers.length > 0) {
    if (plugin.baseUrl) {
      // baseUrl takes precedence - use full URL as-is
      ir.servers[0].url = plugin.baseUrl;
    } else if (plugin.basePath) {
      // basePath - construct URL with edge platform domain
      ir.servers[0].url = `https://example.com${plugin.basePath}`;
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
          continue;
        }

        // x-sc-sdk.operationName → override IR operation id
        if (opSdk?.operationName) {
          operation.id = opSdk.operationName;
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
      const hasRemainingMethods = HTTP_METHODS.some((m) => (irMethods as Record<string, any>)[m] != null);
      if (!hasRemainingMethods) {
        pathsToDelete.push(path);
      }
    }

    // Delete empty paths
    for (const p of pathsToDelete) {
      delete (ir.paths as Record<string, any>)[p];
    }
  }
};
