import { WebComponent } from "../analyze-page.js";
import { StringBuilder } from "../string-builder.js";

export function exportExpress(components: WebComponent[]) {
  const sb = new StringBuilder();

  // for (const c of components) {
  //   sb.writeln(`import * as ${c.alias} from "${c.relativePath}";`);
  // }
  // sb.writeln();

  sb.writeAll([
    "import '@lit-labs/ssr/lib/install-global-dom-shim.js';",
    "window.global = window;",
    "document.getElementsByTagName = () => [] as any;",
    "",
    'import express from "express";',
    'import {html} from "lit";',
    "import {render} from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';",
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
    sb.writeln(
      `app.use("${component.route}", (${
        component.args.length > 0 ? "req" : "_req"
      }, res) => {`
    );
    if (component.args.length > 0) {
      sb.writeln(`   const args = Object(req.params);`);
    }
    sb.writeAll([
      `   const template = html\`${renderTemplate(component, components)}\`;`,
      "   const ssrResult = render(template);",
      '   const code = Array.from(ssrResult).join("");',
      "   res.send(`",
      "   <!DOCTYPE html>",
      "   <html>",
      "     <head>",
      "       <meta charset='utf-8' />",
      `       <title>${component.name}</title>`,
      "     </head>",
      "     <body>",
      "       ${code}",
      '       <script type="module">',
      `          ${getImports(component, components)}`,
      "       </script>",
      "     </body>",
      "   </html>",
      "   `);",
      "",
    ]);

    sb.writeln(`});`);
  }
  sb.writeln();

  sb.writeAll([
    "app.listen(port, () => {",
    "  console.log(`Server started on port http://localhost:${port}`);",
    "});",
  ]);

  return sb.toString();
}

function renderTemplate(
  component: WebComponent,
  components: WebComponent[],
  child?: string
) {
  const sb = new StringBuilder();
  const template = renderTag(component, child);
  if (component.parentRoute) {
    const parent = components.find((c) => c.route === component.parentRoute);
    if (parent) {
      sb.write(renderTemplate(parent, components, template));
    }
  } else {
    // Check for root
    const root = components.find((c) => c.route === "");
    if (root) {
      const rootTemplate = renderTag(root, template);
      sb.write(rootTemplate);
    } else {
      sb.writeln(template);
    }
  }
  return sb.toString();
}

function renderTag(component: WebComponent, child?: string) {
  const sb = new StringBuilder();
  sb.write(`<${component.name}`);
  for (const attr of component.args) {
    sb.write(` ${attr}="\${args["${attr}"]}"`);
  }
  sb.writeln(">");
  if (child) sb.writeln(child);
  sb.write(`</${component.name}>`);
  return sb.toString();
}

function getImports(component: WebComponent, components: WebComponent[]) {
  const sb = new StringBuilder();
  sb.writeln(`import "${component.relativePath}";`);
  if (component.parentRoute) {
    const parent = components.find((c) => c.route === component.parentRoute);
    if (parent) {
      sb.write(getImports(parent, components));
    }
  }
  // Get root
  const root = components.find((c) => c.route === "");
  if (root) {
    sb.writeln(`import "${root.relativePath}";`);
  }
  return sb.toString();
}
