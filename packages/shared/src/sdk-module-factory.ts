import type { SDKModuleDefinition } from './types';

/**
 * Creates an SDKModule with the standard `invokeOperation` logic.
 *
 * The returned object is structurally compatible with
 * `@sitecore-marketplace-sdk/client`'s `SDKModule` interface.
 *
 * @param namespace - The module namespace (e.g. 'ai', 'xmc')
 * @param namespaceMap - Map of sub-namespace keys to their SDK modules
 */
export function createSDKModule(
  namespace: string,
  namespaceMap: Record<string, any>,
): SDKModuleDefinition {
  return {
    namespace,
    invokeOperation: (operation: string, ...args: any[]) => {
      const parts = operation.split('.', 2);

      if (parts.length < 2) {
        throw new Error(
          `Invalid operation format: '${operation}'. Expected format 'clientNamespace.operationName'.`,
        );
      }

      const [clientNamespace, operationName] = parts;

      // Check if the namespace exists in the map
      const sdk = namespaceMap[clientNamespace];
      if (!sdk) {
        throw new Error(`Namespace '${clientNamespace}' not found`);
      }

      // Check if the operation exists in the SDK
      if (!(operationName in sdk)) {
        throw new Error(
          `Operation '${operationName}' not found in namespace '${clientNamespace}'`,
        );
      }

      // Invoke the operation
      return sdk[operationName](...args);
    },
  };
}
