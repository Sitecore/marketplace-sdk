import { ClientSDK } from '@sitecore-marketplace-sdk/client';

export const clientSdkfetch: typeof globalThis.fetch = async (input, init): Promise<Response> => {
  const clientSdk: ClientSDK | undefined = (window as any).sitecore_marketplace__clientSdk;

  if (!clientSdk) {
    throw new Error('ClientSDK is not available on the window object.');
  }
  const request = input instanceof Request && !init ? input : new Request(input, init);
  return clientSdk['_fetch'](request);
};
