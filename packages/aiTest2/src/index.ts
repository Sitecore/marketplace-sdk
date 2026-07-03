import { SDKModule } from '@sitecore-marketplace-sdk/client';
import { createSDKModule } from '../../shared/src';
import * as authoring from './client-authoring/sdk.gen';

export * from './client-authoring/types.gen';
export * from './client-authoring/augmentation.gen';

// Experimental exports with prefix to avoid conflicts
export * from './experimental_aiTest2';

const namespaceMap: Record<string, any> = {
  authoring: authoring,
};

export const AITest2: SDKModule = createSDKModule('aiTest2', namespaceMap) as SDKModule;

export { QueryMap, MutationMap } from '@sitecore-marketplace-sdk/client';