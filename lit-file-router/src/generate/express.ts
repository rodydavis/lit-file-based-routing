import { WebComponent } from "../analyze-page.js";
import { StringBuilder } from "../string-builder.js";

export function exportExpress(components: WebComponent[]) {
  const sb = new StringBuilder();

  for (const c of components) {
    sb.writeln(`import * as ${c.alias} from "${c.relativePath}";`);
  }
  sb.writeln();

  sb.writeAll([
    "import '@lit-labs/ssr/lib/install-global-dom-shim.js';",
    "window.global = window;",
    "// @ts-ignore",
    "document.getElementsByTagName = () => [];",
    "",
  ]);

  sb.writeAll([
    'import express from "express";',
    "import '@lit-labs/ssr/lib/render-lit-html.js';",
    "import { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer.js';",
    "",
    "const app = express();",
    "const port = 3000;",
    "",
  ]);
  sb.writeln();

  const allComponents = components
    .sort((a, b) => a.route.localeCompare(b.route))
    .reverse();
  for (const component of allComponents) {
    if (component.route === "") continue;
    sb.writeln(`app.use("${component.route}", (req, res) => {`);
    if (component.args.length > 0) {
      sb.writeln(`   const { ${component.args.join(", ")} } = req.params;`);
      sb.writeln(
        `   console.log("${component.route}", ${component.args.join(", ")});`
      );
    } else {
      sb.writeln("   console.log(`${req.path}`);");
    }
    if (component.args.length > 0) {
      sb.writeln(
        `   const code = renderApp("${component.name}", { ${component.args
          .map((a) => `${a}: ${a}`)
          .join(", ")} });`
      );
    } else {
      sb.writeln(`   const code = renderApp("${component.name}");`);
    }
    sb.writeln(`   res.send(code.toString());`);
    sb.writeln(`});`);
  }
  sb.writeln();

  // Render app function
  sb.writeln(`function* renderApp(component, args = {}) {`);
  sb.writeln("   const instance = new LitElementRenderer(component);");
  sb.writeln("   instance.connectedCallback();");
  sb.writeln("   yield `<${component}`;");
  sb.writeln("   yield '>';");
  sb.writeln("   yield `</${component}>`;");
  sb.writeln(`}`);

  sb.writeAll([
    "app.listen(port, () => {",
    "  console.log(`Server started on port http://localhost:${port}`);",
    "});",
  ]);

  return sb.toString();
}
