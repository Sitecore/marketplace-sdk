import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

export const handler: Plugin.Handler<Config> = ({ context, plugin }) => {
  const schema = context.ir;

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

  // Process all routes: inject sitecoreContextId
  if (schema && schema.paths) {
    for (const path in schema.paths) {
      const methods = (schema.paths as Record<string, any>)[path];

      for (const method of HTTP_METHODS) {
        const operation = (methods as Record<string, any>)[method];
        if (!operation) continue;

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
    }
  }
};
