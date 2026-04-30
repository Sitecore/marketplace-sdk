import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';
import ts from 'typescript';

// Helper function to update a file to use namespaced types with type aliases
function updateFileWithNamespace(file: any, namespace: string): void {
  // Find and update imports from './types.gen'
  const typesGenImports = file['_imports'].get('./types.gen');
  if (typesGenImports) {
    // Get all currently imported type names
    const importedTypeNames = Array.from(typesGenImports.keys()).filter(
      (name) => typeof name === 'string',
    ) as string[];

    // Clear existing imports from types.gen
    typesGenImports.clear();

    // Import the namespace
    file.import({
      asType: true,
      module: './types.gen',
      name: namespace,
    });

    // Create type aliases for each imported type so they can be used directly
    importedTypeNames.forEach((typeName) => {
      const typeAliasDeclaration = ts.factory.createTypeAliasDeclaration(
        undefined, // no modifiers
        ts.factory.createIdentifier(typeName),
        undefined, // no type parameters
        ts.factory.createTypeReferenceNode(
          ts.factory.createQualifiedName(
            ts.factory.createIdentifier(namespace),
            ts.factory.createIdentifier(typeName),
          ),
        ),
      );

      // Add the type alias to the beginning of the file
      file['_items'].unshift(typeAliasDeclaration);
    });
  }
}

export const handler: Plugin.Handler<Config> = ({ context, plugin }) => {
  // type.gen file - conditionally wrap in namespace
  context.subscribe('after', () => {
    const typeFile = context.files['types'];

    // Only wrap in namespace if one is provided
    if (plugin.namespace) {
      // Get all current items (exported types)
      const currentItems = [...typeFile['_items']];

      // Clear the items array
      typeFile['_items'].length = 0;

      // Create namespace declaration
      const namespaceDeclaration = ts.factory.createModuleDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createIdentifier(plugin.namespace),
        ts.factory.createModuleBlock(currentItems),
        ts.NodeFlags.Namespace,
      );

      // Add the namespace to the file
      typeFile['_items'].push(namespaceDeclaration);

      // Update SDK file imports if namespace is used
      const sdkFile = context.files['sdk'];
      if (sdkFile) {
        updateFileWithNamespace(sdkFile, plugin.namespace);
      }

      // Update client file
      const clientFile = context.files[plugin.output];
      if (clientFile) {
        updateFileWithNamespace(clientFile, plugin.namespace);
      }
    }
    // If no namespace, leave types as-is (no wrapping)
  });
};
