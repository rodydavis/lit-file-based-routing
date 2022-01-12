import { WebComponent } from "../analyze-page.js";
import { StringBuilder } from "../string-builder.js";

export function generateLitRouter(
  components: WebComponent[],
  options: { staticImports: boolean; cacheAll: boolean; showLoading: boolean }
) {
  const sb = new StringBuilder();
  sb.writeln(`import { LitElement, html } from "lit";`);
  sb.writeln(`import { customElement } from "lit/decorators.js";`);
  sb.writeln();
  if (options.staticImports) {
    for (const c of components) {
      sb.writeln(`import "${c.relativePath}";`);
    }
  }
  sb.writeln();
  sb.writeAll([
    '@customElement("generated-app")',
    "export class GeneratedApp extends LitElement {",
    "",
  ]);

  sb.writeln("    private _routes = new Routes(this, [");
  for (const c of components) {
    sb.writeln("{");
    sb.writeln(`        path: "${c.route}",`);
    sb.writeln("        render: async () => {");
    if (!options.staticImports) {
      sb.writeln(`           await import('${c.relativePath}');`);
    }
    sb.writeln(`           return html\`<${c.name}></${c.name}>\`;`);
    sb.writeln("        },");
    sb.writeln("},");
  }
  sb.writeln("    ]);");

  sb.writeAll(["}", ""]);

  return sb.toString();
}
