import { SDKModule } from '@sitecore-marketplace-sdk/client';
import { createSDKModule } from '../../shared/src';
import * as brands from './client-brands/sdk.gen';
import * as skills from './client-skills/sdk.gen';

export * from './client-brands/types.gen';
export * from './client-brands/augmentation.gen';
export * from './client-skills/types.gen';
export * from './client-skills/augmentation.gen';

const namespaceMap: Record<string, any> = {
  brands: brands,
  skills: skills,
};

export const AI: SDKModule = createSDKModule('ai', namespaceMap) as SDKModule;

export * from './experimental_ai';

export { QueryMap, MutationMap } from '@sitecore-marketplace-sdk/client';
