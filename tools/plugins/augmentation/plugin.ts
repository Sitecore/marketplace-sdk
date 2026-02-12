import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';
import ts from 'typescript';

const sdkId = 'sdk';
export const handler: Plugin.Handler<Config> = ({ context, plugin }) => {
  const file = context.createFile({
    exportFromIndex: plugin.exportFromIndex,
    id: plugin.name,
    path: plugin.output,
  });

  const overrides: Record<string, ts.PropertySignature[]> = {
    QueryMap: [],
    MutationMap: [],
  };

  // Add the sdk import to the augmentation file
  file.add(`import * as sdk from './sdk.gen'`);

  context.subscribe('operation', ({ operation }) => {
    const operationId = operation.id;

    const isGetOperation = operation.method === 'get';
    const interfaceName = isGetOperation ? 'QueryMap' : 'MutationMap';
    const paramsType = `Parameters<typeof ${sdkId}.${operationId}>[0]`;
    const responseType = `Awaited<ReturnType<typeof ${sdkId}.${operationId}>>`;

    plugin.namespaces?.forEach((namespace) => {
      const key = `${namespace}.${operationId}`;

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
      if (plugin.deprecated) {
        const deprecationMessage = plugin.deprecationMessage || 
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

      overrides[interfaceName].push(propertySignature);
    });
  });

  context.subscribe('after', () => {
    const moduleAugmentations = Object.entries(overrides).map(([interfaceName, properties]) =>
      ts.factory.createModuleDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
        ts.factory.createStringLiteral('@sitecore-marketplace-sdk/client'),
        ts.factory.createModuleBlock([
          ts.factory.createInterfaceDeclaration(
            undefined,
            interfaceName,
            undefined,
            undefined,
            properties,
          ),
        ]),
        ts.NodeFlags.ContextFlags,
      ),
    );

    moduleAugmentations.forEach((augmentation) => file.add(augmentation as any));
  });
};
