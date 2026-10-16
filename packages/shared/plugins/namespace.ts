import type { PluginInstance } from '@hey-api/openapi-ts';
import ts from 'typescript';

export function namespaceSource(source: string, namespace: string, isTypesFile: boolean): string {
  const file = ts.createSourceFile('generated.ts', source, ts.ScriptTarget.Latest, true);
  let statements: ts.Statement[];
  if (isTypesFile) {
    const imports = file.statements.filter(ts.isImportDeclaration);
    const members = file.statements.filter((statement) => !ts.isImportDeclaration(statement));
    statements = [
      ...imports,
      ts.factory.createModuleDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createIdentifier(namespace),
        ts.factory.createModuleBlock(members),
        ts.NodeFlags.Namespace,
      ),
    ];
  } else {
    statements = file.statements.flatMap((statement): ts.Statement[] => {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text === './types.gen'
      ) {
        const bindings = statement.importClause?.namedBindings;
        if (!bindings || !ts.isNamedImports(bindings)) {
          throw new Error('Expected named imports from generated types');
        }
        return [
          ts.factory.updateImportDeclaration(
            statement,
            statement.modifiers,
            ts.factory.createImportClause(
              true,
              undefined,
              ts.factory.createNamedImports([
                ts.factory.createImportSpecifier(
                  false,
                  undefined,
                  ts.factory.createIdentifier(namespace),
                ),
              ]),
            ),
            statement.moduleSpecifier,
            statement.attributes,
          ),
          ...bindings.elements.map((element) =>
            ts.factory.createTypeAliasDeclaration(
              undefined,
              element.name,
              undefined,
              ts.factory.createTypeReferenceNode(
                ts.factory.createQualifiedName(
                  ts.factory.createIdentifier(namespace),
                  ts.factory.createIdentifier((element.propertyName ?? element.name).text),
                ),
              ),
            ),
          ),
        ];
      }
      if (
        ts.isExportDeclaration(statement) &&
        statement.moduleSpecifier &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text === './types.gen'
      ) {
        return [
          ts.factory.updateExportDeclaration(
            statement,
            statement.modifiers,
            false,
            ts.factory.createNamedExports([
              ts.factory.createExportSpecifier(
                false,
                undefined,
                ts.factory.createIdentifier(namespace),
              ),
            ]),
            statement.moduleSpecifier,
            statement.attributes,
          ),
        ];
      }
      return [statement];
    });
  }
  return ts.createPrinter().printFile(ts.factory.updateSourceFile(file, statements));
}

export function wrapTypesInNamespace(plugin: PluginInstance, namespace: string): void {
  if (!namespace) return;

  // Namespace transformers are finalizers: plan symbols before adapting the file renderers.
  const project = plugin.context.gen;
  project.plan();
  let foundTypes = false;
  for (const file of project.files.registered()) {
    if (file.external || !file.renderer) continue;
    const renderer = file.renderer;
    const isTypesFile = file.nodes.some((node) => node.symbol?.meta?.artifact === 'types');
    foundTypes ||= isTypesFile;
    file.setRenderer({
      supports: (context) => renderer.supports(context),
      render: (context) => namespaceSource(renderer.render(context), namespace, isTypesFile),
    });
  }
  if (!foundTypes) {
    throw new Error('No generated TypeScript types found to namespace');
  }
}
