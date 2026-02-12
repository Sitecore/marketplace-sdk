import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { handler as augmentationHandler } from '../augmentation/plugin';
import { handler as clientTransformerHandler } from '../client-transformer/plugin';
import { handler as namespaceTransformerHandler } from '../namespace-transformer/plugin';
import { handler as schemaPatcherHandler } from '../schema-patcher/plugin';

class MockFile {
  public _items: ts.Node[];
  public _imports: Map<string, Map<string, unknown>>;
  public addCalls: Array<string | ts.Node>;
  public importCalls: Array<{ module: string; name?: string; asType?: boolean; as?: string }>;

  constructor(items: ts.Node[] = [], imports?: Map<string, Map<string, unknown>>) {
    this._items = items;
    this._imports = imports ?? new Map();
    this.addCalls = [];
    this.importCalls = [];
  }

  add(entry: string | ts.Node): void {
    this.addCalls.push(entry);
  }

  import(options: { module: string; name?: string; asType?: boolean; as?: string }): void {
    this.importCalls.push(options);
    const moduleImports = this._imports.get(options.module) ?? new Map<string, unknown>();
    const key = options.name ?? options.as ?? options.module;
    moduleImports.set(key, options);
    this._imports.set(options.module, moduleImports);
  }
}

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const printerSourceFile = ts.createSourceFile('printer.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
const printNode = (node: ts.Node): string =>
  printer.printNode(ts.EmitHint.Unspecified, node, printerSourceFile);

type SubscriberMap = Record<string, Array<(payload?: any) => void>>;

const findInterface = (modules: ts.ModuleDeclaration[], name: string): ts.InterfaceDeclaration => {
  const moduleNode = modules.find((node) => {
    if (!node.body || !ts.isModuleBlock(node.body)) {
      return false;
    }

    return node.body.statements.some(
      (statement) => ts.isInterfaceDeclaration(statement) && statement.name.text === name,
    );
  });

  if (!moduleNode || !moduleNode.body || !ts.isModuleBlock(moduleNode.body)) {
    throw new Error(`Module for interface ${name} not found`);
  }

  const interfaceNode = moduleNode.body.statements.find(
    (statement): statement is ts.InterfaceDeclaration =>
      ts.isInterfaceDeclaration(statement) && statement.name.text === name,
  );

  if (!interfaceNode) {
    throw new Error(`Interface ${name} not found`);
  }

  return interfaceNode;
};

describe('augmentation plugin', () => {
  it('adds module augmentations for query and mutation operations', () => {
    const file = new MockFile();
    const subscribers: SubscriberMap = {};
    const context: any = {
      createFile: () => file,
      subscribe: (event: string, callback: (payload?: any) => void) => {
        (subscribers[event] ||= []).push(callback);
      },
    };

    augmentationHandler({
      context,
      plugin: {
        name: '@sitecore-marketplace/augmentation',
        output: 'augmentation.ts',
        exportFromIndex: true,
        namespaces: ['xmc.analytics'],
        deprecated: true,
        deprecationMessage: 'Use the beta namespace instead.',
      },
    } as any);

    const trigger = (event: string, payload?: any) => {
      (subscribers[event] ?? []).forEach((callback) => callback(payload));
    };

    trigger('operation', {
      operation: {
        id: 'listEntries',
        method: 'get',
        description: 'Lists entries for analytics dashboards.',
      },
    });

    trigger('operation', {
      operation: {
        id: 'createEntry',
        method: 'post',
        summary: 'Creates an analytics entry.',
      },
    });

    trigger('after');

    expect(file.addCalls[0]).toBe("import * as sdk from './sdk.gen'");

    const moduleDeclarations = file.addCalls.slice(1) as ts.ModuleDeclaration[];
    expect(moduleDeclarations).toHaveLength(2);

    const queryInterface = findInterface(moduleDeclarations, 'QueryMap');
    const queryProperty = queryInterface.members[0] as ts.PropertySignature;
    expect((queryProperty.name as ts.StringLiteral).text).toBe('xmc.analytics.listEntries');
    const queryType = queryProperty.type as ts.TypeLiteralNode;
    const subscribeMember = queryType.members.find(
      (member) =>
        ts.isPropertySignature(member) &&
        ts.isIdentifier(member.name) &&
        member.name.text === 'subscribe',
    );
    expect(subscribeMember).toBeDefined();
    expect(printNode(queryProperty)).toContain('Use the beta namespace instead.');

    const mutationInterface = findInterface(moduleDeclarations, 'MutationMap');
    const mutationProperty = mutationInterface.members[0] as ts.PropertySignature;
    const mutationType = mutationProperty.type as ts.TypeLiteralNode;
    const hasSubscribe = mutationType.members.some(
      (member) =>
        ts.isPropertySignature(member) &&
        ts.isIdentifier(member.name) &&
        member.name.text === 'subscribe',
    );
    expect(hasSubscribe).toBe(false);
    const mutationText = printNode(mutationProperty);
    expect(mutationText).toContain('sdk.createEntry');
    expect(mutationText).toContain('Creates an analytics entry.');
  });
});

describe('schema patcher plugin', () => {
  it('prefers baseUrl when provided', () => {
    const schema = {
      servers: [{ url: 'https://old.example' }],
      paths: {},
    };

    const context: any = { ir: schema };

    schemaPatcherHandler({
      context,
      plugin: {
        name: '@sitecore-marketplace/schema-patcher',
        baseUrl: 'https://override.example',
      },
    } as any);

    expect(schema.servers[0].url).toBe('https://override.example');
  });

  it('falls back to basePath and injects the sitecoreContextId parameter', () => {
    const sharedParameter = {
      name: 'sitecoreContextId',
      description: 'existing parameter',
      location: 'query',
    };

    const schema = {
      servers: [{ url: 'https://old.example' }],
      paths: {
        '/search': {
          get: { parameters: { query: {} } },
          post: { parameters: { query: { sitecoreContextId: sharedParameter } } },
        },
      },
    };

    const context: any = { ir: schema };

    schemaPatcherHandler({
      context,
      plugin: {
        name: '@sitecore-marketplace/schema-patcher',
        basePath: '/authoring',
      },
    } as any);

    expect(schema.servers[0].url).toBe('https://example.com/authoring');

    const getParameter =
      (schema.paths['/search'].get.parameters.query as Record<string, any>).sitecoreContextId;
    expect(getParameter).toMatchObject({ name: 'sitecoreContextId', location: 'query' });

    const postParameter =
      (schema.paths['/search'].post.parameters.query as Record<string, any>).sitecoreContextId;
    expect(postParameter).toBe(sharedParameter);
  });
});

describe('namespace transformer plugin', () => {
  it('wraps generated types in the configured namespace and re-exports aliases', () => {
    const originalInterface = ts.factory.createInterfaceDeclaration(
      undefined,
      'WidgetResponse',
      undefined,
      undefined,
      [],
    );

    const typeFile = new MockFile([originalInterface]);
    const sdkImports = new Map<string, Map<string, unknown>>([
      ['./types.gen', new Map<string, unknown>([['ClientOptions', {}]])],
    ]);
    const clientImports = new Map<string, Map<string, unknown>>([
      ['./types.gen', new Map<string, unknown>([['WidgetResponse', {}]])],
    ]);
    const sdkFile = new MockFile(
      [ts.factory.createEmptyStatement()],
      sdkImports,
    );
    const clientFile = new MockFile(
      [ts.factory.createEmptyStatement()],
      clientImports,
    );

    const subscribers: SubscriberMap = {};
    const context: any = {
      files: {
        types: typeFile,
        sdk: sdkFile,
        client: clientFile,
      },
      subscribe: (event: string, callback: (payload?: any) => void) => {
        (subscribers[event] ||= []).push(callback);
      },
    };

    namespaceTransformerHandler({
      context,
      plugin: {
        name: '@sitecore-marketplace/namespace-transformer',
        namespace: 'XmcTypes',
        output: 'client',
      },
    } as any);

    (subscribers['after'] ?? []).forEach((callback) => callback());

    const namespaceModule = typeFile._items[0] as ts.ModuleDeclaration;
    const namespaceName = ts.isIdentifier(namespaceModule.name)
      ? ts.idText(namespaceModule.name)
      : '';
    expect(namespaceName).toBe('XmcTypes');
    const moduleBlock = namespaceModule.body as ts.ModuleBlock;
    expect(moduleBlock.statements[0]).toBe(originalInterface);

    const sdkAlias = sdkFile._items[0] as ts.TypeAliasDeclaration;
    expect(sdkAlias.name.text).toBe('ClientOptions');
    const sdkReference = sdkAlias.type as ts.TypeReferenceNode;
    expect(ts.isQualifiedName(sdkReference.typeName)).toBe(true);
    const sdkQualified = sdkReference.typeName as ts.QualifiedName;
    const sdkNamespace = ts.isIdentifier(sdkQualified.left) ? ts.idText(sdkQualified.left) : '';
    expect(sdkNamespace).toBe('XmcTypes');

    const clientAlias = clientFile._items[0] as ts.TypeAliasDeclaration;
    expect(clientAlias.name.text).toBe('WidgetResponse');
    const clientReference = clientAlias.type as ts.TypeReferenceNode;
    expect(ts.isQualifiedName(clientReference.typeName)).toBe(true);
    const clientQualified = clientReference.typeName as ts.QualifiedName;
    const clientNamespace = ts.isIdentifier(clientQualified.left)
      ? ts.idText(clientQualified.left)
      : '';
    expect(clientNamespace).toBe('XmcTypes');

    const sdkImportsMap = sdkFile._imports.get('./types.gen');
    expect(sdkImportsMap?.has('XmcTypes')).toBe(true);
    const clientImportsMap = clientFile._imports.get('./types.gen');
    expect(clientImportsMap?.has('XmcTypes')).toBe(true);
  });
});

describe('client transformer plugin', () => {
  it('injects clientSdkfetch and re-wires ClientOptions when no namespace is provided', () => {
    const configObject = ts.factory.createObjectLiteralExpression([
      ts.factory.createPropertyAssignment('baseUrl', ts.factory.createStringLiteral('https://api')),
    ]);
    const createConfigCall = ts.factory.createCallExpression(
      ts.factory.createIdentifier('createConfig'),
      undefined,
      [configObject],
    );
    const initializer = ts.factory.createCallExpression(
      ts.factory.createIdentifier('createClient'),
      undefined,
      [createConfigCall],
    );
    const declaration = ts.factory.createVariableDeclaration(
      'client',
      undefined,
      undefined,
      initializer,
    );
    const declarationList = ts.factory.createVariableDeclarationList(
      [declaration],
      ts.NodeFlags.Const,
    );
    const clientStatement = ts.factory.createVariableStatement(undefined, declarationList);

    const clientImports = new Map<string, Map<string, unknown>>([
      ['./types.gen', new Map<string, unknown>([['ClientOptions', {}]])],
    ]);

    const clientFile = new MockFile([clientStatement], clientImports);

    const context: any = {
      files: {
        client: clientFile,
      },
      subscribe: () => undefined,
    };

    clientTransformerHandler({
      context,
      plugin: {
        name: '@sitecore-marketplace/client-transformer',
        output: 'client',
      },
    } as any);

    const updatedStatement = clientFile._items[clientFile._items.length - 1] as ts.VariableStatement;
    const updatedDeclaration = updatedStatement.declarationList.declarations[0];
    const updatedInitializer = updatedDeclaration.initializer as ts.CallExpression;
    const updatedCreateConfigCall = updatedInitializer.arguments[0] as ts.CallExpression;
    const updatedConfigObject = updatedCreateConfigCall.arguments[0] as ts.ObjectLiteralExpression;

    const fetchProperty = updatedConfigObject.properties.find(
      (property) =>
        ts.isPropertyAssignment(property) &&
        ts.isIdentifier(property.name) &&
        property.name.text === 'fetch',
    ) as ts.PropertyAssignment;

    expect(fetchProperty).toBeDefined();
    expect(ts.isIdentifier(fetchProperty.initializer)).toBe(true);
    expect((fetchProperty.initializer as ts.Identifier).text).toBe('clientSdkfetch');

    const importsMap = clientFile._imports.get('./types.gen');
    expect(importsMap?.has('ClientOptions')).toBe(true);

    const sdkFetchImport = clientFile.importCalls.find(
      (entry) => entry.module === '@sitecore-marketplace-sdk/internal' && entry.name === 'clientSdkfetch',
    );
    expect(sdkFetchImport).toBeDefined();
  });
});
