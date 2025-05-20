import { SDKModule } from '@sitecore-marketplace-sdk/client';
import * as authoring from './client-authoring/sdk.gen';
import * as content from './client-content/sdk.gen';
import * as contentTransfer from './client-content-transfer/sdk.gen';
import * as xmapp from './client-xmapp/sdk.gen';

// The type `ClientOptions` from difference clients conflicts,
//  we can generate the types in namespace later to sovle conflict
// export * from './client-authoring/types.gen';
export * from './client-authoring/augmentation.gen';

// export * from './client-content/types.gen';
export * from './client-content/augmentation.gen';

// export *  from './client-content-transfer/types.gen';
export * from './client-content-transfer/augmentation.gen';

// export * from './client-xmapp/types.gen';
export * from './client-xmapp/augmentation.gen';

// Define a map for namespaces and their corresponding SDKs
const namespaceMap: Record<string, any> = {
  authoring: authoring,
  live: content,
  preview: content,
  contentTransfer: contentTransfer,
  xmapp: xmapp,
};

export const XMC: SDKModule = {
  namespace: 'xmc',
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
