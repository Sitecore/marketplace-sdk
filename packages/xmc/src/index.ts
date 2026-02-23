import { SDKModule } from '@sitecore-marketplace-sdk/client';
import { createSDKModule } from '../../shared/src';
import * as authoring from './client-authoring/sdk.gen';
import * as content from './client-content/sdk.gen';
import * as contentTransfer from './client-content-transfer/sdk.gen';
import * as xmapp from './client-xmapp/sdk.gen';
import * as agent from './client-agent/sdk.gen';
import * as search from './client-search/sdk.gen';
import * as pages from './client-pages/sdk.gen';
import * as sites from './client-sites/sdk.gen';

export * from './client-authoring/types.gen';
export * from './client-authoring/augmentation.gen';

export * from './client-content/types.gen';
export * from './client-content/augmentation.gen';

export * from './client-content-transfer/types.gen';
export * from './client-content-transfer/augmentation.gen';

export * from './client-xmapp/types.gen';
export * from './client-xmapp/augmentation.gen';

export * from './client-agent/types.gen';
export * from './client-agent/augmentation.gen';

export * from './client-pages/types.gen';
export * from './client-pages/augmentation.gen';

export * from './client-sites/types.gen';
export * from './client-sites/augmentation.gen';

export * from './client-search/types.gen';
export * from './client-search/augmentation.gen';

// Experimental exports with prefix to avoid conflicts
export * from './experimental_xmc'; // This will export all experimental types and APIs

// Define a map for namespaces and their corresponding SDKs
const namespaceMap: Record<string, any> = {
  authoring: authoring,
  live: content,
  preview: content,
  contentTransfer: contentTransfer,
  xmapp: xmapp,
  agent: agent,
  pages: pages,
  sites: sites,
  search: search,
};

export const XMC: SDKModule = createSDKModule('xmc', namespaceMap) as SDKModule;

export { QueryMap, MutationMap } from '@sitecore-marketplace-sdk/client';
