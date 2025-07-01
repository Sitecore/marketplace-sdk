import type { Plugin } from '@hey-api/openapi-ts';
import type { Config } from './types';
import ts from 'typescript';

// Helper function to update a file to use namespaced types
function updateFileWithNamespace(file: any, namespace: string): void {
  console.log('📁 updateFileWithNamespace called for namespace:', namespace);

  // Find and update imports from './types.gen'
  const typesGenImports = file['_imports'].get('./types.gen');
  if (typesGenImports) {
    // Get all currently imported type names
    const importedTypeNames = Array.from(typesGenImports.keys()).filter(
      (name) => typeof name === 'string',
    ) as string[];

    console.log('📥 Found imported type names:', importedTypeNames);

    // Clear existing imports from types.gen
    typesGenImports.clear();

    // Import the namespace
    file.import({
      asType: true,
      module: './types.gen',
      name: namespace,
    });

    console.log('📝 Calling updateTypeReferences...');
    // Update all type references in the file to use namespaced types
    updateTypeReferences(file['_items'], importedTypeNames, namespace);
  } else {
    console.log('❌ No ./types.gen imports found in file');
  }
}

// Helper function to update type references to use namespaced types
function updateTypeReferences(items: ts.Node[], typeNames: string[], namespace: string): void {
  console.log('🔧 updateTypeReferences called with:', {
    typeNames,
    namespace,
    itemsCount: items.length,
  });

  const transformer = (context: ts.TransformationContext) => {
    return (rootNode: ts.Node) => {
      function visit(node: ts.Node): ts.Node {
        // Check if this is a type reference that should be namespaced
        if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
          const typeName = node.typeName.text;
          console.log(`🔍 Found type reference: "${typeName}"`);

          // Handle the special case where the entire generic type appears as a single identifier
          if (typeName.includes('<') && typeName.includes('>')) {
            console.log(`🔍 Found complex type identifier: "${typeName}"`);
            // This is likely a string representation of a generic type that needs special handling
            // Try to extract and transform the type names within it
            let transformedTypeName = typeName;
            typeNames.forEach((targetType) => {
              const regex = new RegExp(`\\b${targetType}\\b`, 'g');
              transformedTypeName = transformedTypeName.replace(
                regex,
                `${namespace}.${targetType}`,
              );
            });

            if (transformedTypeName !== typeName) {
              console.log(
                `✅ String-transformed complex type: "${typeName}" -> "${transformedTypeName}"`,
              );
              // Create a new identifier with the transformed name
              return ts.factory.updateTypeReferenceNode(
                node,
                ts.factory.createIdentifier(transformedTypeName),
                node.typeArguments,
              );
            }
          }

          // First check if the main type name should be namespaced
          if (typeNames.includes(typeName)) {
            console.log(`✅ Transforming main type: "${typeName}" -> "${namespace}.${typeName}"`);
            // Replace with namespaced type reference
            return ts.factory.updateTypeReferenceNode(
              node,
              ts.factory.createQualifiedName(
                ts.factory.createIdentifier(namespace),
                ts.factory.createIdentifier(typeName),
              ),
              node.typeArguments,
            );
          }
          // If the main type doesn't need namespacing, check if any type arguments do
          else if (node.typeArguments) {
            console.log(`🔍 Checking type arguments for "${typeName}":`, node.typeArguments.length);
            // Process type arguments to see if any need namespacing
            const transformedTypeArgs = node.typeArguments.map((arg, index) => {
              console.log(`  🔍 Processing type argument ${index}:`, ts.SyntaxKind[arg.kind]);
              const result = visit(arg) as ts.TypeNode;
              return result;
            });

            // Check if any type arguments were actually transformed
            const hasChanges = transformedTypeArgs.some(
              (arg, index) => arg !== node.typeArguments![index],
            );

            if (hasChanges) {
              console.log(`✅ Updated type arguments for "${typeName}"`);
              return ts.factory.updateTypeReferenceNode(
                node,
                node.typeName,
                ts.factory.createNodeArray(transformedTypeArgs),
              );
            } else {
              console.log(`🔄 No changes needed for type arguments of "${typeName}"`);
            }
          }
        }

        // Recursively visit all child nodes to catch nested type references
        return ts.visitEachChild(node, visit, context);
      }
      return visit(rootNode);
    };
  };

  // Transform each item in the file
  for (let i = 0; i < items.length; i++) {
    const result = ts.transform(items[i], [transformer]);
    if (result.transformed[0]) {
      items[i] = result.transformed[0];
    }
    result.dispose();
  }
}

const clientOptions = 'ClientOptions';
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
        console.log('🚀 Processing SDK file...');
        updateFileWithNamespace(sdkFile, plugin.namespace);
      } else {
        console.log('❌ SDK file not found');
      }

      // Update client file
      const clientFile = context.files[plugin.output];
      if (clientFile) {
        console.log('🚀 Processing client file...');
        updateFileWithNamespace(clientFile, plugin.namespace);
      } else {
        console.log('❌ Client file not found');
      }
    }
    // If no namespace, leave types as-is (no wrapping)
  });

  // Handle client-specific modifications (always needed for clientSdkfetch)
  const file = context.files[plugin.output];

  // Handle imports - this will be updated by updateFileWithNamespace if namespace is used
  if (!plugin.namespace) {
    // Only handle imports manually if no namespace (otherwise updateFileWithNamespace handles it)
    file['_imports'].get('./types.gen')?.delete(clientOptions);
    file.import({
      asType: true,
      module: './types.gen',
      name: clientOptions,
    });
  }

  file.import({
    module: '../client-sdk-fetch',
    name: 'clientSdkfetch',
  });

  // client export node
  const clientNode = file['_items'][file['_items'].length - 1];

  // Ensure clientNode is a VariableStatement
  if (!clientNode || !ts.isVariableStatement(clientNode)) {
    throw new Error('clientNode is not a valid VariableStatement');
  }

  // Get the VariableDeclaration from the declarationList
  const declarationList = clientNode.declarationList;
  const declarations = declarationList.declarations;
  if (!declarations || declarations.length === 0) {
    throw new Error('No declarations found in clientNode');
  }

  const variableDeclaration = declarations[0]; // Assuming the first declaration is the one we need
  if (!ts.isVariableDeclaration(variableDeclaration)) {
    throw new Error('The declaration is not a valid VariableDeclaration');
  }

  const initializer = variableDeclaration.initializer;
  if (!initializer || !ts.isCallExpression(initializer)) {
    throw new Error('VariableDeclaration initializer is not a CallExpression');
  }

  const createClientArgs = initializer.arguments;
  if (!createClientArgs || createClientArgs.length === 0) {
    throw new Error('createClient has no arguments');
  }

  const createConfigCall = createClientArgs[0];
  if (!ts.isCallExpression(createConfigCall)) {
    throw new Error('First argument of createClient is not a CallExpression');
  }

  const configObject = createConfigCall.arguments[0];
  if (!configObject || !ts.isObjectLiteralExpression(configObject)) {
    throw new Error('createConfig argument is not an ObjectLiteralExpression');
  }

  // Add a new property to the ObjectLiteralExpression
  const fetchProperty = ts.factory.createPropertyAssignment(
    'fetch',
    ts.factory.createIdentifier('clientSdkfetch'),
  );

  const updatedProperties = ts.factory.createNodeArray([...configObject.properties, fetchProperty]);

  const updatedConfigObject = ts.factory.updateObjectLiteralExpression(
    configObject,
    updatedProperties,
  );

  const updatedCreateConfigCall = ts.factory.updateCallExpression(
    createConfigCall,
    createConfigCall.expression,
    createConfigCall.typeArguments,
    [updatedConfigObject],
  );

  const updatedInitializer = ts.factory.updateCallExpression(
    initializer,
    initializer.expression,
    initializer.typeArguments,
    [updatedCreateConfigCall],
  );

  const updatedVariableDeclaration = ts.factory.updateVariableDeclaration(
    variableDeclaration,
    variableDeclaration.name,
    variableDeclaration.exclamationToken,
    variableDeclaration.type,
    updatedInitializer,
  );

  const updatedDeclarationList = ts.factory.updateVariableDeclarationList(declarationList, [
    updatedVariableDeclaration,
  ]);

  const updatedClientNode = ts.factory.updateVariableStatement(
    clientNode,
    clientNode.modifiers,
    updatedDeclarationList,
  );

  // Replace the original clientNode with the updated one
  file['_items'][file['_items'].length - 1] = updatedClientNode;
};
