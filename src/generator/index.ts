import * as fs from "fs";
import ts from "typescript";
import { StringBuilder } from "./string-builder.js";

const inputDir = "./src/pages";
const outputFile = "./src/generated.ts";

function readPagesDirectory() {
  const files = fs.readdirSync(inputDir);
  const pages = files.map((file) => {
    const path = `${inputDir}/${file}`;
    const content = fs.readFileSync(path, "utf8");
    return {
      path,
      content,
    };
  });
  return pages;
}

async function analyzePages() {
  const pages = readPagesDirectory();
  // @ts-ignore
  const sb = new StringBuilder();
  sb.writeln("// @ts-nocheck");
  sb.writeln();
  let i = 0;
  sb.writeln(`// Page Routes`);
  const components: WebComponent[] = [];
  for (const { path, content } of pages) {
    // Add import
    const filePath = path.replace("./src/", "./");
    const jsPath = filePath.replace(".ts", ".js");
    sb.writeln(`import * as route${i} from "${jsPath}";`);
    const results = analyzePage(path, content);
    for (const c of results) {
      c.alias = `route${i}`;
      components.push(c);
    }
    i++;
  }
  sb.writeln();
  buildApp(sb, components);
  const output = sb.toString();
  fs.writeFileSync(outputFile, output);
}

function buildApp(sb: StringBuilder, components: WebComponent[]) {
  console.log(components);
  sb.writeln(`import { html, css, LitElement } from "lit";`);
  sb.writeln(`import { customElement, property } from "lit/decorators.js";`);
  sb.writeln();
  sb.writeAll([
    '@customElement("generated-app")',
    "export class GeneratedApp extends LitElement {",
    "  static styles = css`",
    "    main {",
    "      width: 100%;",
    "      height: 100%;",
    "    }",
    "  `;",
    "",
    "  @property() route = this.getHashRoute();",
    "  components: Map<string, WebComponent> = new Map();",
    "",
    "  firstUpdated() {",
  ]);
  sb.writeln();
  for (const component of components) {
    let path = component.path.replace("./src/pages/", "/");
    path = path.replace(".ts", "");
    path = path.replace(".js", "");
    path = path.replace("/index", "/");
    if (path == "/root") path = "";
    sb.write(`   this.components.set("${path}", `);
    sb.write(
      `{ name: "${component.name}", type: ${component.alias}.${component.type} }`
    );
    sb.writeln(");");
  }
  sb.writeAll([
    '    window.addEventListener("hashchange", () => {',
    "      this.route = this.getHashRoute();",
    "      this.requestUpdate();",
    "    });",
    "  }",
    "",
    "  render() {",
    "    return html` <main>",
    "      <slot></slot>",
    "    </main>`;",
    "  }",
    "",
    "  private getHashRoute() {",
    '    let route = "/";',
    "    if (window.location.hash.length > 0) {",
    "      route = window.location.hash.slice(1);",
    '      if (route == "") route = "/";',
    "    }",
    "    console.log(`current route: ${route}`);",
    "    return route;",
    "  }",
    "}",
    "",
    "interface WebComponent {",
    "  name: string;",
    "  type: object;",
    "}",
    "",
  ]);
  sb.writeln();
}

function analyzePage(path: string, content: string): WebComponent[] {
  const components: WebComponent[] = [];
  const ast = ts.createSourceFile(path, content, ts.ScriptTarget.ES2021, true);
  // console.log(ast);
  const statements = ast.statements;
  const classes = statements.filter(
    (s) => s.kind === ts.SyntaxKind.ClassDeclaration
  ) as ts.ClassDeclaration[];
  // Look for @customElement decorator and get the value
  for (const c of classes) {
    const name = c.name?.getText();
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
          type: name ?? "",
          path,
        });
      }
    }
  }
  return components;
}

interface WebComponent {
  name: string;
  type: string;
  path: string;
  alias?: string;
}

analyzePages();
