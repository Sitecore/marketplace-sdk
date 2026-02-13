import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

/**
 * Validates that mutually-exclusive options are not both provided.
 */
function validateOptions(plugin: Record<string, any>): void {
  if (
    plugin.includeOperationIds?.length &&
    plugin.excludeOperationIds?.length
  ) {
    throw new Error(
      'schema-patcher: "includeOperationIds" and "excludeOperationIds" are mutually exclusive.',
    );
  }

  if (
    plugin.includeTags?.length &&
    plugin.excludeTags?.length
  ) {
    throw new Error(
      'schema-patcher: "includeTags" and "excludeTags" are mutually exclusive.',
    );
  }
}

/**
 * Determines whether an operation should be kept based on tag filters.
 */
function passesTagFilter(
  operationTags: ReadonlyArray<string> | undefined,
  plugin: Record<string, any>,
): boolean {
  const includeTags: string[] | undefined = plugin.includeTags;
  if (includeTags?.length) {
    if (!operationTags || operationTags.length === 0) return false;
    return operationTags.some((tag) => includeTags.includes(tag));
  }

  const excludeTags: string[] | undefined = plugin.excludeTags;
  if (excludeTags?.length) {
    if (!operationTags || operationTags.length === 0) return true;
    return !operationTags.some((tag) => excludeTags.includes(tag));
  }

  return true;
}

/**
 * Determines whether an operation should be kept based on operationId filters.
 */
function passesOperationIdFilter(
  operationId: string | undefined,
  plugin: Record<string, any>,
): boolean {
  const includeIds: string[] | undefined = plugin.includeOperationIds;
  if (includeIds?.length) {
    return operationId != null && includeIds.includes(operationId);
  }

  const excludeIds: string[] | undefined = plugin.excludeOperationIds;
  if (excludeIds?.length) {
    return operationId == null || !excludeIds.includes(operationId);
  }

  return true;
}

export const handler: Plugin.Handler<Config> = ({ context, plugin }) => {
  const schema = context.ir;

  // Validate mutually-exclusive options
  validateOptions(plugin as unknown as Record<string, any>);

  // Set the base URL if provided in config
  if (schema && schema.servers && schema.servers.length > 0) {
    if (plugin.baseUrl) {
      // baseUrl takes precedence - use full URL as-is
      schema.servers[0].url = plugin.baseUrl;
    } else if (plugin.basePath) {
      // basePath - construct URL with edge platform domain
      schema.servers[0].url = `https://example.com${plugin.basePath}`;
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

  // Process all routes: filter and inject sitecoreContextId
  if (schema && schema.paths) {
    const pluginAny = plugin as unknown as Record<string, any>;
    const pathsToDelete: string[] = [];

    for (const path in schema.paths) {
      const methods = (schema.paths as Record<string, any>)[path];
      const methodsToDelete: string[] = [];

      for (const method of HTTP_METHODS) {
        const operation = (methods as Record<string, any>)[method];
        if (!operation) continue;

        // 1. Tag filtering
        if (!passesTagFilter(operation.tags, pluginAny)) {
          methodsToDelete.push(method);
          continue;
        }

        // 2. OperationId filtering
        if (!passesOperationIdFilter(operation.id, pluginAny)) {
          methodsToDelete.push(method);
          continue;
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
      for (const method of methodsToDelete) {
        delete (methods as Record<string, any>)[method];
      }

      // If no HTTP methods remain, mark path for deletion
      const hasRemainingMethods = HTTP_METHODS.some((m) => (methods as Record<string, any>)[m] != null);
      if (!hasRemainingMethods) {
        pathsToDelete.push(path);
      }
    }

    // Delete empty paths
    for (const pathKey of pathsToDelete) {
      delete (schema.paths as Record<string, any>)[pathKey];
    }
  }
};
