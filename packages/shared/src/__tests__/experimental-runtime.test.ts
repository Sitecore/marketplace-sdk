import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { experimental_AI } from '../../../ai/src/experimental_ai';
import { experimental_XMC } from '../../../xmc/src/experimental_xmc';
import { DEFAULT_EDGE_PLATFORM_PROXY_URL } from '../constants';

const getAccessToken = vi.fn<() => Promise<string>>();
const networkFetch = vi.fn<typeof fetch>();
const proxyUrl = 'https://proxy.example.com';

beforeEach(() => {
  getAccessToken.mockReset().mockResolvedValue('test-token');
  networkFetch.mockReset().mockImplementation(async () => Response.json({ result: 'ok' }));
  vi.stubGlobal('fetch', networkFetch);
  vi.stubGlobal('window', { env: { EDGE_PLATFORM_PROXY_URL: proxyUrl } });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function sentRequest(): Request {
  const input = networkFetch.mock.calls[0]?.[0];
  expect(input).toBeInstanceOf(Request);
  if (!(input instanceof Request)) {
    throw new Error('Expected the generated runtime to send a Request');
  }
  return input;
}

describe('experimental generated Fetch runtimes', () => {
  it('sends an AI request with authentication, custom headers, and serialized body', async () => {
    const ai = new experimental_AI({ getAccessToken });
    const body = { brandkitId: 'brand-kit', input: { text: 'Review this' } };
    const result = await ai.skills.generateBrandReview({
      body,
      headers: { 'x-sc-feature': 'test-feature' },
      query: { sitecoreContextId: 'context-id' },
    });

    const request = sentRequest();
    expect(request.url).toBe(
      `${proxyUrl}/stream/ai-skills-api/api/skills/v1/brandreview/generate?sitecoreContextId=context-id`,
    );
    expect(request.method).toBe('POST');
    expect(request.headers.get('authorization')).toBe('Bearer test-token');
    expect(request.headers.get('sc-resource')).toBe('marketplace');
    expect(request.headers.get('sc-marketplace-auth')).toBe('interactive/v1');
    expect(request.headers.get('x-sc-feature')).toBe('test-feature');
    expect(await request.json()).toEqual(body);
    expect(result.data).toEqual({ result: 'ok' });
    expect(getAccessToken).toHaveBeenCalledOnce();
  });

  it.each([
    {
      name: 'sites',
      path: '/authoring/api/v1/languages',
      invoke: (xmc: experimental_XMC) => xmc.sites.listLanguages(),
    },
    {
      name: 'pages',
      path: '/authoring/api/v1/pages/search',
      invoke: (xmc: experimental_XMC) => xmc.pages.search(),
    },
    {
      name: 'authoring',
      path: '/v1/authoring/graphql',
      invoke: (xmc: experimental_XMC) => xmc.authoring.graphql({ body: { query: '{ test }' } }),
    },
    {
      name: 'contentTransfer',
      path: '/authoring/transfer/content/v1/transfers/transfer-id/status',
      invoke: (xmc: experimental_XMC) =>
        xmc.contentTransfer.getContentTransferStatus({ path: { transferId: 'transfer-id' } }),
    },
    {
      name: 'preview',
      path: '/content/api/graphql/v1',
      invoke: (xmc: experimental_XMC) => xmc.preview.graphql({ body: { query: '{ test }' } }),
    },
    {
      name: 'live',
      path: '/content/api/graphql/v1',
      invoke: (xmc: experimental_XMC) => xmc.live.graphql({ body: { query: '{ test }' } }),
    },
    {
      name: 'agent',
      path: '/stream/ai-agent-api/api/v1/sites',
      invoke: (xmc: experimental_XMC) => xmc.agent.sitesGetSitesList(),
    },
    {
      name: 'search',
      path: '/search/v1/config',
      invoke: (xmc: experimental_XMC) => xmc.search.getConfigs(),
    },
  ])('routes $name through its authenticated generated client', async ({ path, invoke }) => {
    const xmc = new experimental_XMC({ getAccessToken });
    const result = await invoke(xmc);

    const request = sentRequest();
    expect(request.url).toBe(`${proxyUrl}${path}`);
    expect(request.headers.get('authorization')).toBe('Bearer test-token');
    expect(request.headers.get('sc-resource')).toBe('marketplace');
    expect(request.headers.get('sc-marketplace-auth')).toBe('interactive/v1');
    expect(result.data).toEqual({ result: 'ok' });
    expect(getAccessToken).toHaveBeenCalledOnce();
  });

  it('uses the default proxy URL and refreshes the token for each request', async () => {
    vi.stubGlobal('window', { env: undefined });
    getAccessToken.mockResolvedValueOnce('first-token').mockResolvedValueOnce('second-token');
    const xmc = new experimental_XMC({ getAccessToken });

    await xmc.sites.listLanguages();
    expect(sentRequest().url).toBe(`${DEFAULT_EDGE_PLATFORM_PROXY_URL}/authoring/api/v1/languages`);
    expect(sentRequest().headers.get('authorization')).toBe('Bearer first-token');
    networkFetch.mockClear();
    await xmc.sites.listLanguages();
    expect(sentRequest().headers.get('authorization')).toBe('Bearer second-token');
    expect(getAccessToken).toHaveBeenCalledTimes(2);
  });

  it('returns API errors by default and throws them when requested', async () => {
    networkFetch.mockImplementation(async () =>
      Response.json({ message: 'Forbidden' }, { status: 403 }),
    );
    const xmc = new experimental_XMC({ getAccessToken });

    const result = await xmc.sites.listLanguages();
    expect(result.error).toEqual({ message: 'Forbidden' });
    expect(result.response?.status).toBe(403);
    await expect(xmc.sites.listLanguages({ throwOnError: true })).rejects.toEqual({
      message: 'Forbidden',
    });
  });

  it('propagates token failures without sending a request', async () => {
    getAccessToken.mockRejectedValue(new Error('Token unavailable'));
    const ai = new experimental_AI({ getAccessToken });

    await expect(
      ai.skills.generateBrandReview({ body: { brandkitId: 'brand-kit', input: {} } }),
    ).rejects.toThrow('Token unavailable');
    expect(networkFetch).not.toHaveBeenCalled();
  });

  it('propagates network failures', async () => {
    networkFetch.mockRejectedValue(new TypeError('Network unavailable'));
    const xmc = new experimental_XMC({ getAccessToken });

    await expect(xmc.sites.listLanguages()).rejects.toThrow('Network unavailable');
  });

  it('propagates invalid JSON responses', async () => {
    networkFetch.mockResolvedValue(
      new Response('invalid json', { headers: { 'Content-Type': 'application/json' } }),
    );
    const xmc = new experimental_XMC({ getAccessToken });

    await expect(xmc.sites.listLanguages()).rejects.toBeInstanceOf(SyntaxError);
  });
});
