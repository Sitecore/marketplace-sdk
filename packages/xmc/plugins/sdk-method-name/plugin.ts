import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';

/**
 * Validates that an identifier is a valid JavaScript/TypeScript identifier.
 * Must start with a letter or underscore, followed by letters, digits, or underscores.
 */
function isValidIdentifier(name: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

/**
 * Plugin handler that processes x-sdk-method-name extensions in OpenAPI operations.
 *
 * This plugin:
 * - Reads x-sdk-method-name from operation extensions
 * - Validates the name is a valid identifier
 * - Ensures uniqueness per tag/client bucket
 * - Overrides the operation ID used for SDK method naming
 */
export const handler: Plugin.Handler<Config> = ({ context }) => {
  const schema = context.ir;

  // Track used names per tag bucket for collision detection
  const usedNames: Map<string, string> = new Map();

  if (schema && schema.paths) {
    for (const path in schema.paths) {
      const methods = schema.paths[path] as Record<string, any>;
      for (const method in methods) {
        if (['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].includes(method)) {
          const operation = methods[method];

          // Skip if no operation or no x-sdk-method-name extension
          if (!operation) continue;

          // Access the x-sdk-method-name extension
          // In the IR, extensions might be preserved directly on the operation
          const override = operation['x-sdk-method-name'];

          // Skip if extension is not present (but not if it's an empty string - that's an error)
          if (override === undefined || override === null) continue;

          // Validate that override is a non-empty string
          if (typeof override !== 'string' || !override.trim()) {
            throw new Error(
              `x-sdk-method-name for operationId "${operation.id}" must be a non-empty string`,
            );
          }

          const candidate = override.trim();

          // Validate identifier format
          if (!isValidIdentifier(candidate)) {
            throw new Error(
              `Invalid x-sdk-method-name "${candidate}" for operationId "${operation.id}". ` +
                'Must match /^[A-Za-z_][A-Za-z0-9_]*$/.',
            );
          }

          // Get the tag bucket for collision detection
          const tags = operation.tags;
          const bucket = Array.isArray(tags) && tags.length > 0 ? tags[0] : 'default';
          const key = `${bucket}:${candidate}`;

          // Check for duplicates within the same tag
          if (usedNames.has(key)) {
            throw new Error(
              `Duplicate x-sdk-method-name "${candidate}" in tag/client "${bucket}". ` +
                `First seen in operationId "${usedNames.get(key)}", again in "${operation.id}".`,
            );
          }

          // Record the usage
          usedNames.set(key, operation.id);

          // Apply the override by modifying the operation ID
          // This affects how the SDK method is named
          operation.id = candidate;
        }
      }
    }
  }
};
