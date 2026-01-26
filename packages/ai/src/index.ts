import { SDKModule } from '@sitecore-marketplace-sdk/client';
import * as skills from './client-skills/sdk.gen';

export * from './client-skills/types.gen';
export * from './client-skills/augmentation.gen';

// Experimental exports
export * from './experimental_ai';

const namespaceMap: Record<string, any> = {
  skills: skills,
};

export const AI: SDKModule = {
  namespace: 'ai',
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
      throw new Error(`Operation '${operationName}' not found in namespace '${clientNamespace}'`);
    }

    // Invoke the operation
    return sdk[operationName](...args);
  },
};

export { QueryMap, MutationMap } from '@sitecore-marketplace-sdk/client';
