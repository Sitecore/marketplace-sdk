import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';

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

  // Add the parameter to all routes
  if (schema && schema.paths) {
    for (const path in schema.paths) {
      const methods = schema.paths[path];
      for (const method in methods) {
        const operation = methods[method];
        if (operation.parameters?.query) {
          // Add the parameter if it doesn't already exist
          if (!operation.parameters.query.sitecoreContextId) {
            operation.parameters.query.sitecoreContextId = sitecoreContextIdParam;
          }
        } else {
          // Initialize query parameters if it doesn't exist
          operation.parameters = operation.parameters || {};
          operation.parameters.query = { sitecoreContextId: sitecoreContextIdParam };
        }
      }
    }
  }
};
