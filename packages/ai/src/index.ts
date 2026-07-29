import { SDKModule } from '@sitecore-marketplace-sdk/client';
import { createSDKModule } from '../../shared/src';
import * as brands from './client-brands/sdk.gen';

export * from './client-brands/types.gen';
export * from './client-brands/augmentation.gen';

// Experimental exports with prefix to avoid conflicts
export * from './experimental_ai';

const namespaceMap: Record<string, any> = {
  brands: brands,
};

export const AI: SDKModule = createSDKModule('ai', namespaceMap) as SDKModule;

export { QueryMap, MutationMap } from '@sitecore-marketplace-sdk/client';
