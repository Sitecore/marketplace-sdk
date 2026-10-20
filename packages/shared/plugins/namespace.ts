import type { PluginInstance } from '@hey-api/openapi-ts';
import ts from 'typescript';

export function addTimeoutOption(source: string): string {
  const file = ts.createSourceFile('generated.ts', source, ts.ScriptTarget.Latest, true);
  let found = false;
  const statements = file.statements.map((statement) => {
    if (!ts.isTypeAliasDeclaration(statement) || statement.name.text !== 'Options') return statement;
    found = true;
    return ts.factory.updateTypeAliasDeclaration(
      statement,
      statement.modifiers,
      statement.name,
      statement.typeParameters,
      ts.factory.createIntersectionTypeNode([
        statement.type,
        ts.factory.createTypeLiteralNode([
          ts.factory.createPropertySignature(
            undefined,
            'timeoutMs',
            ts.factory.createToken(ts.SyntaxKind.QuestionToken),
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
          ),
        ]),
      ]),
    );
  });
  if (!found) return source;
  return ts.createPrinter().printFile(ts.factory.updateSourceFile(file, statements));
}

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

export function wrapTypesInNamespace(
  plugin: PluginInstance,
  namespace: string,
  options: { timeoutOptions?: boolean } = {},
): void {
  if (!namespace && !options.timeoutOptions) return;

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
      render: (context) => {
        let source = renderer.render(context);
        if (options.timeoutOptions && !isTypesFile) source = addTimeoutOption(source);
        return namespace ? namespaceSource(source, namespace, isTypesFile) : source;
      },
    });
  }
  if (namespace && !foundTypes) {
    throw new Error('No generated TypeScript types found to namespace');
  }
}
