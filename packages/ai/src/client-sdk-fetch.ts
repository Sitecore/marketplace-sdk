import { ClientSDK } from '@sitecore-marketplace-sdk/client';

export const clientSdkfetch = async (input: globalThis.Request): Promise<Response> => {
  const clientSdk: ClientSDK | undefined = (window as any).sitecore_marketplace__clientSdk;

  if (!clientSdk) {
    throw new Error('ClientSDK is not available on the window object.');
  }
  return clientSdk['_fetch'](input);
};
