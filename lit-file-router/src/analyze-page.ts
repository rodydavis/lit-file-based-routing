import ts from "typescript";

export function analyzePage(path: string, content: string): WebComponent[] {
  const components: WebComponent[] = [];
  const ast = ts.createSourceFile(path, content, ts.ScriptTarget.ES2021, true);
  // console.log(ast);
  const statements = ast.statements;
  // Look for @customElement decorator and get the value
  const classes = statements.filter(
    (s) => s.kind === ts.SyntaxKind.ClassDeclaration
  ) as ts.ClassDeclaration[];
  for (const c of classes) {
    const decorators = c.decorators;
    if (!decorators) continue;
    const decorator = decorators[0];
    if (!decorator) continue;
    const expression = decorator.expression;
    if (!expression) continue;
    if (expression.kind === ts.SyntaxKind.CallExpression) {
      const callExpression = expression as ts.CallExpression;
      if (callExpression.expression.getText() === "customElement") {
        const value = callExpression.arguments[0].getText();
        components.push({
          name: value.substring(1, value.length - 1),
          path,
        });
      }
    }
  }
  // Look for customElements.define() and get the value
  for (const s of statements) {
    if (s.kind === ts.SyntaxKind.ExpressionStatement) {
      const expression = (s as ts.ExpressionStatement).expression;
      if (expression.kind === ts.SyntaxKind.CallExpression) {
        const callExpression = expression as ts.CallExpression;
        if (callExpression.expression.getText() === "customElements") {
          const value = callExpression.arguments[0].getText();
          components.push({
            name: value.substring(1, value.length - 1),
            path,
          });
        }
      }
    }
  }
  return components;
}

export interface WebComponent {
  name: string;
  path: string;
  alias?: string;
}
