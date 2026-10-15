import { TsDsl, type DefinePlugin, type PluginInstance } from '@hey-api/openapi-ts';
import type { Config } from './types';
import ts from 'typescript';

type Symbol = ReturnType<PluginInstance['symbol']>;

class AugmentationNode extends TsDsl<ts.ModuleDeclaration> {
  readonly '~dsl' = 'MarketplaceAugmentation';

  constructor(
    symbol: Symbol,
    readonly sdk: Symbol,
    readonly declaration: () => ts.ModuleDeclaration,
  ) {
    super();
    this.name.set(symbol);
  }

  analyze(context: Parameters<TsDsl['analyze']>[0]): void {
    context.analyze(this.sdk);
  }

  toAst(): ts.ModuleDeclaration {
    return this.declaration();
  }
}

export const handler: DefinePlugin<Config>['Handler'] = ({ plugin }) => {
  const config = plugin.config;
  const sdk = plugin.symbol('sdk', { external: './sdk.gen', importKind: 'namespace' });

  const overrides: Record<string, Array<() => ts.PropertySignature>> = {
    QueryMap: [],
    MutationMap: [],
  };

  plugin.forEach('operation', ({ operation }) => {
    const operationSymbol = plugin.querySymbol({
      category: 'sdk',
      resource: 'operation',
      resourceId: operation.id,
    });
    if (!operationSymbol) {
      throw new Error(`Generated SDK symbol not found for operation ${operation.id}`);
    }
    const isGetOperation = operation.method === 'get';
    const interfaceName = isGetOperation ? 'QueryMap' : 'MutationMap';

    config.namespaces?.forEach((namespace) => {
      overrides[interfaceName].push(() => {
        const operationId = operationSymbol.finalName ?? operationSymbol.name;
        const key = `${namespace}.${operationId}`;
        const paramsType = `Parameters<typeof ${sdk.finalName ?? sdk.name}.${operationId}>[0]`;
        const responseType = `Awaited<ReturnType<typeof ${sdk.finalName ?? sdk.name}.${operationId}>>`;

        const propertySignature = ts.factory.createPropertySignature(
          undefined,
          ts.factory.createStringLiteral(key),
          undefined,
          ts.factory.createTypeLiteralNode([
            ts.factory.createPropertySignature(
              undefined,
              'params',
              undefined,
              ts.factory.createTypeReferenceNode(paramsType),
            ),
            ts.factory.createPropertySignature(
              undefined,
              'response',
              undefined,
              ts.factory.createTypeReferenceNode(responseType),
            ),
            ...(isGetOperation
              ? [
                  ts.factory.createPropertySignature(
                    undefined,
                    'subscribe',
                    undefined,
                    ts.factory.createLiteralTypeNode(ts.factory.createFalse()),
                  ),
                ]
              : []),
          ]),
        );

        // Add documentation for the key in proper JSDoc format
        let jsDocComment = `
 *
 * ${operation.description || operation.summary || 'No summary available.'}
`;

        // Add deprecation warning if configured
        if (config.deprecated) {
          const deprecationMessage =
            config.deprecationMessage ||
            'This namespace is deprecated and will be removed in a future version.';

          jsDocComment = `
 * @deprecated ${deprecationMessage}
 * 
 * ${operation.description || operation.summary || 'No summary available.'}
`;
        }

        ts.addSyntheticLeadingComment(
          propertySignature,
          ts.SyntaxKind.MultiLineCommentTrivia,
          jsDocComment.trim(),
          true,
        );

        return propertySignature;
      });
    });
  });

  Object.entries(overrides).forEach(([interfaceName, properties], index) => {
    const symbol = plugin.symbol(`augmentation${index}`, {
      getFilePath: () => config.output ?? 'augmentation',
      getExportFromFilePath: () => [],
    });
    plugin.node(
      new AugmentationNode(symbol, sdk, () =>
        ts.factory.createModuleDeclaration(
          [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
          ts.factory.createStringLiteral('@sitecore-marketplace-sdk/client'),
          ts.factory.createModuleBlock([
            ts.factory.createInterfaceDeclaration(
              undefined,
              interfaceName,
              undefined,
              undefined,
              properties.map((property) => property()),
            ),
          ]),
          ts.NodeFlags.ContextFlags,
        ),
      ),
    );
  });
};
