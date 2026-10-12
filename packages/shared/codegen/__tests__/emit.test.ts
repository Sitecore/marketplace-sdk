// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  emitAugmentation,
  emitClient,
  emitIndex,
  emitSdk,
  HEADER,
  printBlockComment,
  stringLiteral,
  wrapTypes,
} from '../emit';
import type { Operation } from '../operations';

const HTTP = '../http';

const CLIENT_OPTIONS = `export type ClientOptions = {
  baseUrl: 'https://api.example.com' | (string & {});
};`;

function operation(overrides: Partial<Operation> = {}): Operation {
  return {
    id: 'listItems',
    method: 'get',
    path: '/items',
    deprecated: false,
    optionsRequired: false,
    security: [],
    types: { data: 'ListItemsData', response: 'ListItemsResponse', error: 'ListItemsError' },
    ...overrides,
  };
}

/**
 * Returns the code after the `Options` type, i.e. the SDK functions.
 */
function sdkFunctions(code: string): string {
  const marker = '  meta?: Record<string, unknown>;\n};\n\n';
  const index = code.indexOf(marker);
  expect(index).toBeGreaterThan(0);
  return code.slice(index + marker.length);
}

describe('wrapTypes', () => {
  it('should wrap the types in a namespace with ClientOptions last', () => {
    const source = `${HEADER}

${CLIENT_OPTIONS}

/**
 * An item.
 */
export type Item = {
  id: string;
};

export const Status = { ACTIVE: 'active' } as const;

export type Status = (typeof Status)[keyof typeof Status];

export interface Page {
  items: Item[];
}
`;

    const { code, names } = wrapTypes(source, 'TestApi');

    expect(code).toBe(`${HEADER}

export namespace TestApi {
/**
 * An item.
 */
export type Item = {
  id: string;
};
export const Status = { ACTIVE: 'active' } as const;
export type Status = (typeof Status)[keyof typeof Status];
export interface Page {
  items: Item[];
}
${CLIENT_OPTIONS}
}
`);
    expect([...names]).toEqual(['ClientOptions', 'Item', 'Status', 'Page']);
  });

  it.each([
    [
      'an import',
      `import type { A } from './a';\n${CLIENT_OPTIONS}`,
      `Unexpected statement in the generated types: import type { A } from './a';`,
    ],
    [
      'a type that is not exported',
      `type A = string;\n${CLIENT_OPTIONS}`,
      'Unexpected statement in the generated types: type A = string;',
    ],
    [
      'a function',
      `export function a() {}\n${CLIENT_OPTIONS}`,
      'Unexpected statement in the generated types: export function a() {}',
    ],
    [
      'a destructuring declaration',
      `export const { a } = { a: 1 };\n${CLIENT_OPTIONS}`,
      'Unexpected statement in the generated types: export const { a } = { a: 1 };',
    ],
    [
      'several declarations',
      `export const a = 1, b = 2;\n${CLIENT_OPTIONS}`,
      'Unexpected statement in the generated types: export const a = 1, b = 2;',
    ],
    [
      'a comment between statements',
      `export type A = string;\n// stray\n${CLIENT_OPTIONS}`,
      'Unexpected content in the generated types: // stray',
    ],
    [
      'a comment at the end',
      `${CLIENT_OPTIONS}\n/* trailing */\n`,
      'Unexpected content in the generated types: /* trailing */',
    ],
    [
      'a missing ClientOptions type',
      'export type A = string;',
      'The generated types have no ClientOptions type',
    ],
    [
      'a ClientOptions interface',
      'export interface ClientOptions { baseUrl: string }',
      'ClientOptions is not the client options type. Rename the conflicting schema.',
    ],
    [
      'a ClientOptions schema',
      'export type ClientOptions = { name: string };',
      'ClientOptions is not the client options type. Rename the conflicting schema.',
    ],
    [
      'a ClientOptions schema with a baseUrl',
      'export type ClientOptions = { baseUrl: string; name: string };',
      'ClientOptions is not the client options type. Rename the conflicting schema.',
    ],
  ])('should reject %s', (_name, source, message) => {
    expect(() => wrapTypes(`${HEADER}\n\n${source}`, 'TestApi')).toThrow(message);
  });
});

describe('emitSdk', () => {
  it('should emit the SDK functions', () => {
    expect(emitSdk([operation()], 'TestApi', HTTP)).toBe(`${HEADER}

import type { Options as ClientOptions, TDataShape, Client } from '../http';
import type { TestApi } from './types.gen';
import { client as _heyApiClient } from './client.gen';

type ListItemsError = TestApi.ListItemsError;

type ListItemsResponse = TestApi.ListItemsResponse;

type ListItemsData = TestApi.ListItemsData;

export type Options<
  TData extends TDataShape = TDataShape,
  ThrowOnError extends boolean = boolean,
> = ClientOptions<TData, ThrowOnError> & {
  /**
   * You can provide a client instance returned by \`createClient()\` instead of
   * individual options. This might be also useful if you want to implement a
   * custom client.
   */
  client?: Client;
  /**
   * You can pass arbitrary values through the \`meta\` object. This can be
   * used to access values that aren't defined as part of the SDK function.
   */
  meta?: Record<string, unknown>;
};

export const listItems = <ThrowOnError extends boolean = false>(
  options?: Options<ListItemsData, ThrowOnError>,
) => {
  return (options?.client ?? _heyApiClient).get<ListItemsResponse, ListItemsError, ThrowOnError>({
    url: '/items',
    ...options,
  });
};
`);
  });

  it('should require the options when the operation needs them', () => {
    const code = emitSdk([operation({ optionsRequired: true })], 'TestApi', HTTP);

    expect(sdkFunctions(code))
      .toBe(`export const listItems = <ThrowOnError extends boolean = false>(
  options: Options<ListItemsData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).get<ListItemsResponse, ListItemsError, ThrowOnError>({
    url: '/items',
    ...options,
  });
};
`);
  });

  it('should use unknown for missing response and error types', () => {
    const code = emitSdk(
      [
        operation({
          id: 'deleteItem',
          method: 'delete',
          types: { data: 'DeleteItemData', response: undefined, error: undefined },
        }),
      ],
      'TestApi',
      HTTP,
    );

    expect(code).toContain('\ntype DeleteItemData = TestApi.DeleteItemData;\n');
    expect(code).not.toMatch(/type \w+(Response|Error) =/);
    expect(code).toContain('.delete<unknown, unknown, ThrowOnError>({');
  });

  it('should alias each type once, from the last operation to the first', () => {
    const code = emitSdk(
      [
        operation({ id: 'a', types: { data: 'AData', response: 'AResponse', error: 'Problem' } }),
        operation({ id: 'b', types: { data: 'BData', response: 'BResponse', error: 'Problem' } }),
      ],
      'TestApi',
      HTTP,
    );

    expect([...code.matchAll(/^type (\w+) = TestApi\.\1;$/gm)].map((match) => match[1])).toEqual([
      'BResponse',
      'BData',
      'Problem',
      'AResponse',
      'AData',
    ]);
  });

  it.each([
    ['json', 'application/json', [], "'application/json'"],
    ['form-data', 'multipart/form-data', ['...formDataBodySerializer,'], 'null'],
    [
      'url-search-params',
      'application/x-www-form-urlencoded',
      ['...urlSearchParamsBodySerializer,'],
      "'application/x-www-form-urlencoded'",
    ],
    [
      'octet-stream',
      'application/octet-stream',
      ['bodySerializer: null,'],
      "'application/octet-stream'",
    ],
    ['text', 'text/plain', ['bodySerializer: null,'], "'text/plain'"],
  ] as const)('should send a %s body', (type, mediaType, serializer, contentType) => {
    const code = emitSdk(
      [
        operation({
          id: 'createItem',
          method: 'post',
          optionsRequired: true,
          body: { type, mediaType },
        }),
      ],
      'TestApi',
      HTTP,
    );

    expect(sdkFunctions(code))
      .toBe(`export const createItem = <ThrowOnError extends boolean = false>(
  options: Options<ListItemsData, ThrowOnError>,
) => {
  return (options.client ?? _heyApiClient).post<ListItemsResponse, ListItemsError, ThrowOnError>({
${serializer.map((line) => `    ${line}\n`).join('')}    url: '/items',
    ...options,
    headers: {
      'Content-Type': ${contentType},
      ...options?.headers,
    },
  });
};
`);
  });

  it('should import the body serializers that are used, once', () => {
    const form = { type: 'form-data', mediaType: 'multipart/form-data' } as const;
    const urlEncoded = {
      type: 'url-search-params',
      mediaType: 'application/x-www-form-urlencoded',
    } as const;

    expect(emitSdk([operation({ body: form })], 'TestApi', HTTP)).toContain(
      "import { type Options as ClientOptions, type TDataShape, type Client, formDataBodySerializer } from '../http';",
    );
    expect(
      emitSdk(
        [
          operation({ id: 'a', body: form }),
          operation({ id: 'b', body: urlEncoded }),
          operation({ id: 'c', body: form }),
        ],
        'TestApi',
        HTTP,
      ),
    ).toContain(
      "import { type Options as ClientOptions, type TDataShape, type Client, formDataBodySerializer, urlSearchParamsBodySerializer } from '../http';",
    );
  });

  it('should emit the request options in order', () => {
    const code = emitSdk(
      [
        operation({
          method: 'put',
          body: { type: 'form-data', mediaType: 'multipart/form-data' },
          arrayQueryExplode: false,
          security: [
            { scheme: 'bearer', type: 'http' },
            { in: 'query', name: 'api_key', type: 'apiKey' },
          ],
        }),
      ],
      'TestApi',
      HTTP,
    );

    expect(sdkFunctions(code)).toContain(`.put<ListItemsResponse, ListItemsError, ThrowOnError>({
    ...formDataBodySerializer,
    querySerializer: {
      array: {
        explode: false,
        style: 'form',
      },
    },
    security: [
      {
        scheme: 'bearer',
        type: 'http',
      },
      {
        in: 'query',
        name: 'api_key',
        type: 'apiKey',
      },
    ],
    url: '/items',
    ...options,
    headers: {
      'Content-Type': null,
      ...options?.headers,
    },
  });`);
  });

  it('should document deprecated operations with their summary and description', () => {
    const code = emitSdk(
      [
        operation({
          deprecated: true,
          summary: 'Lists items.',
          description: 'First line.\r\n   Indented line with */ and /* inside.\n\nLast line.',
        }),
      ],
      'TestApi',
      HTTP,
    );

    expect(sdkFunctions(code)).toMatch(
      /^\/\*\*\n \* @deprecated\n \* Lists items\.\n \* First line\.\n \* Indented line with \* and \* inside\.\n \*\n \* Last line\.\n \*\/\nexport const listItems = /,
    );
  });

  it('should document an operation with only a summary', () => {
    const code = emitSdk([operation({ summary: 'Lists items.' })], 'TestApi', HTTP);

    expect(sdkFunctions(code)).toMatch(
      /^\/\*\*\n \* Lists items\.\n \*\/\nexport const listItems = /,
    );
  });

  it('should quote the url', () => {
    const code = emitSdk([operation({ path: "/items/{id}/it's" })], 'TestApi', HTTP);

    expect(code).toContain("    url: '/items/{id}/it\\'s',\n");
  });

  it('should reject a url with a line break', () => {
    expect(() => emitSdk([operation({ path: '/items\n/x' })], 'TestApi', HTTP)).toThrow(
      'Unsupported characters in "/items\\n/x"',
    );
  });
});

describe('emitClient', () => {
  it('should send the requests through the host application', () => {
    const code = emitClient('TestApi', 'https://example.com/authoring', HTTP, true);

    expect(
      code.startsWith(`${HEADER}

import type { TestApi } from './types.gen';
import { type Config, type ClientOptions as DefaultClientOptions, createClient, createConfig } from '../http';
import { clientSdkfetch } from '../client-sdk-fetch';

type ClientOptions = TestApi.ClientOptions;

/**
`),
    ).toBe(true);
    expect(code)
      .toContain(`export type CreateClientConfig<T extends DefaultClientOptions = ClientOptions> = (
  override?: Config<DefaultClientOptions & T>,
) => Config<Required<DefaultClientOptions> & T>;

export const client = createClient(
  createConfig<ClientOptions>({
    baseUrl: 'https://example.com/authoring',
    fetch: clientSdkfetch,
  }),
);
`);
  });

  it('should use the default fetch without hostFetch', () => {
    const code = emitClient('TestApi', 'https://example.com', HTTP, false);

    expect(code).not.toContain('clientSdkfetch');
    expect(
      code.endsWith(`export const client = createClient(
  createConfig<ClientOptions>({
    baseUrl: 'https://example.com',
  }),
);
`),
    ).toBe(true);
  });
});

describe('emitAugmentation', () => {
  const listEntries = operation({
    id: 'listEntries',
    description: 'Lists entries for analytics dashboards.',
    summary: 'Lists entries.',
  });
  const createEntry = operation({
    id: 'createEntry',
    method: 'post',
    summary: 'Creates an analytics entry.',
  });

  it('should declare GET operations as queries and the others as mutations', () => {
    expect(emitAugmentation([listEntries, createEntry], { namespaces: ['xmc.analytics'] }))
      .toBe(`${HEADER}

import * as sdk from './sdk.gen';

declare module '@sitecore-marketplace-sdk/client' {
  interface QueryMap {
    /**
         * Lists entries for analytics dashboards.*/
    'xmc.analytics.listEntries': {
      params: Parameters<typeof sdk.listEntries>[0];
      response: Awaited<ReturnType<typeof sdk.listEntries>>;
      subscribe: false;
    };
  }
}

declare module '@sitecore-marketplace-sdk/client' {
  interface MutationMap {
    /**
         * Creates an analytics entry.*/
    'xmc.analytics.createEntry': {
      params: Parameters<typeof sdk.createEntry>[0];
      response: Awaited<ReturnType<typeof sdk.createEntry>>;
    };
  }
}
`);
  });

  it('should add the deprecation message to every key', () => {
    const code = emitAugmentation([listEntries, createEntry], {
      namespaces: ['xmc.analytics'],
      deprecated: 'Use the beta namespace instead.',
    });

    expect(code).toContain(`    /** @deprecated Use the beta namespace instead.
         *
         * Lists entries for analytics dashboards.*/
    'xmc.analytics.listEntries': {`);
    expect(code).toContain(`    /** @deprecated Use the beta namespace instead.
         *
         * Creates an analytics entry.*/
    'xmc.analytics.createEntry': {`);
  });

  it('should declare every operation in every namespace', () => {
    const code = emitAugmentation([listEntries, operation({ id: 'getEntry' }), createEntry], {
      namespaces: ['xmc.preview', 'xmc.live'],
    });

    expect([...code.matchAll(/^ {4}'([\w.]+)': \{$/gm)].map((match) => match[1])).toEqual([
      'xmc.preview.listEntries',
      'xmc.live.listEntries',
      'xmc.preview.getEntry',
      'xmc.live.getEntry',
      'xmc.preview.createEntry',
      'xmc.live.createEntry',
    ]);
  });

  it('should fall back to the summary and then to a default description', () => {
    const code = emitAugmentation(
      [
        operation({ id: 'a', summary: 'Summary of a.' }),
        operation({ id: 'b', summary: 'Summary of b.', description: '' }),
        operation({ id: 'c' }),
      ],
      { namespaces: ['ns'] },
    );

    expect(
      [...code.matchAll(/\* (.+)\*\/\n {4}'ns\.(\w)'/g)].map((match) => [match[2], match[1]]),
    ).toEqual([
      ['a', 'Summary of a.'],
      ['b', 'Summary of b.'],
      ['c', 'No summary available.'],
    ]);
  });

  it('should declare empty maps', () => {
    expect(emitAugmentation([], { namespaces: ['ns'] })).toBe(`${HEADER}

import * as sdk from './sdk.gen';

declare module '@sitecore-marketplace-sdk/client' {
  interface QueryMap {}
}

declare module '@sitecore-marketplace-sdk/client' {
  interface MutationMap {}
}
`);
  });

  it('should reject a description that ends the comment', () => {
    expect(() =>
      emitAugmentation([operation({ description: 'Ends */ here' })], { namespaces: ['ns'] }),
    ).toThrow("Comments must not contain '*/'");
  });
});

describe('emitIndex', () => {
  it('should export the types and the SDK functions', () => {
    expect(emitIndex()).toBe(
      `${HEADER}\nexport * from './types.gen';\nexport * from './sdk.gen';\n`,
    );
  });
});

describe('printBlockComment', () => {
  it('should trim the lines and indent them by their own indentation', () => {
    expect(printBlockComment('*\n * a\n\t* b\n   c', 2)).toBe('/**\n   * a\n      * b\n     c*/');
  });

  it.each(['\r\n', '\r', '\u2028', '\u2029'])('should split lines on %j', (lineBreak) => {
    expect(printBlockComment(`* a${lineBreak} * b`, 0)).toBe('/** a\n * b*/');
  });

  it('should reject text that ends the comment', () => {
    expect(() => printBlockComment('a */ b', 0)).toThrow("Comments must not contain '*/': a */ b");
  });
});

describe('stringLiteral', () => {
  it('should escape quotes and backslashes', () => {
    expect(stringLiteral("it's a\\b")).toBe("'it\\'s a\\\\b'");
  });

  it.each(['a\nb', 'a\rb', 'a\tb', 'a\u0000b', 'a\u007fb', 'a\u2028b', 'a\u2029b'])(
    'should reject %j',
    (value) => {
      expect(() => stringLiteral(value)).toThrow(
        `Unsupported characters in ${JSON.stringify(value)}`,
      );
    },
  );
});
