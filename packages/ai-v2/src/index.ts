import { SDKModule } from '@sitecore-marketplace-sdk/client';
import { createSDKModule } from '../../shared/src';
import * as extractions from './client-extractions/sdk.gen';

export * from './client-extractions/types.gen';
export * from './client-extractions/augmentation.gen';

export * from './experimental_ai-v2';

const namespaceMap: Record<string, any> = {
  extractions: extractions,
};

export const AIV2: SDKModule = createSDKModule('ai-v2', namespaceMap) as SDKModule;

export { QueryMap, MutationMap } from '@sitecore-marketplace-sdk/client';
