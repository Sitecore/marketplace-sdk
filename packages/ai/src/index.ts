import { SDKModule } from '@sitecore-marketplace-sdk/client';
import { createSDKModule } from '../../shared/src';
// import * as skills from './client-skills/sdk.gen';

// export * from './client-skills/types.gen';
// export * from './client-skills/augmentation.gen';

// Experimental exports with prefix to avoid conflicts
export * from './experimental_ai'; // This will export all experimental types and APIs

// Define a map for namespaces and their corresponding SDKs
const namespaceMap: Record<string, any> = {
  // skills: skills,
};

export const AI: SDKModule = createSDKModule('ai', namespaceMap) as SDKModule;

export { QueryMap, MutationMap } from '@sitecore-marketplace-sdk/client';
