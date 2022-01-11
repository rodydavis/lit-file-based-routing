import { WebComponent } from "../analyze-page.js";
import { StringBuilder } from "../string-builder.js";

export function exportExpress(components: WebComponent[]) {
  const sb = new StringBuilder();

  sb.writeAll([
    'import "@lit-labs/ssr/lib/install-global-dom-shim.js";',
    'import "@lit-labs/ssr/lib/render-lit-html.js";',
    'import { LitElementRenderer } from "@lit-labs/ssr/lib/lit-element-renderer.js";',
  ]);
  sb.writeln();
  for (const c of components) {
    sb.writeln(`import "${c.relativePath}";`);
    if (c.hasLoader) {
      sb.writeln(
        `import { loader as ${c.alias}Loader } from "${c.relativePath}";`
      );
    }
  }
  sb.writeln();

  const allComponents = components
    .sort((a, b) => a.route.localeCompare(b.route))
    .reverse();

  sb.writeAll([
    'import express from "express";',
    "",
    "const app = express();",
    "const port = 3000;",
    "",
    "interface Route {",
    "  tag: string;",
    "  loader?: any;",
    "  hasImplicitIndex: boolean;",
    "  parentRoute?: string;",
    "}",
    "",
    "const components = new Map<string, Route>([",
  ]);

  for (const c of allComponents) {
    sb.writeln(`["${c.route}", {`);
    sb.writeln(`  tag: "${c.name}",`);
    if (c.hasLoader) sb.writeln(`  loader: ${c.alias}Loader,`);
    sb.writeln(`  hasImplicitIndex: ${c.implicitIndex || false},`);
    if (c.parentRoute) sb.writeln(`  parentRoute: "${c.parentRoute}"`);
    sb.writeln("}],");
  }
  sb.writeln("]);");

  sb.writeln();

  for (const c of allComponents) {
    if (c.route === "") continue;
    sb.writeln(`app.get("${c.route}", async (req, res) => {`);
    sb.writeln(
      `  const contents = await renderTree("${c.route}", req.params);`
    );
    sb.writeln(`  res.send(contents);`);
    sb.writeln("});");
  }
  sb.writeln();

  sb.writeAll([
    "async function renderTree(route: string, args: { [key: string]: any }) {",
    "  let _route = route;",
    "  let component = getComponent(_route);",
    "  if (component && component.hasImplicitIndex) {",
    '    _route += "/";',
    "    component = getComponent(_route)!;",
    "  }",
    "  let child = undefined;",
    "",
    "  while (component) {",
    "    let data = undefined;",
    "    const routeArgs = _route === route ? args : {};",
    "    if (component.loader) data = await component.loader(_route, routeArgs);",
    "    child = renderComponent(component.tag, routeArgs, child, data);",
    "    _route = component.parentRoute || '';",
    "    if (_route === '') break;",
    "    component = getComponent(_route);",
    "  }",
    "",
    '  const root = getComponent("");',
    "  if (root) {",
    "    let data = undefined;",
    "    if (root.loader) data = await root.loader(_route, args);",
    "    child = renderComponent(root.tag, args, child, data);",
    "  }",
    "",
    '  return child || "";',
    "}",
    "",
    "function renderComponent(",
    "  tag: string,",
    "  args: { [key: string]: any },",
    "  child: string | undefined,",
    "  data: any | undefined",
    ") {",
    "  const sb: string[] = [];",
    "  const instance = new LitElementRenderer(tag);",
    "  const element = customElements.get(tag) || null;",
    "  sb.push(`<${tag} `);",
    "",
    "  for (let [name, value] of Object.entries(args)) {",
    "    if (name in element?.prototype) {",
    "      instance.setProperty(name, value);",
    "    } else {",
    "      instance.setAttribute(name, value);",
    "    }",
    "  }",
    '  if (data) instance.setProperty("data", data);',
    "  instance.connectedCallback();",
    '  const attributes = Array.from(instance.renderAttributes()).join(" ");',
    "  sb.push(`${attributes}`);",
    '  sb.push(">");',
    "",
    "  const shadowContents = instance.renderShadow({} as any);",
    "  if (shadowContents !== undefined) {",
    '    const shadow = Array.from(shadowContents).join(" ");',
    "    sb.push('<template shadowroot=\"open\">');",
    "    sb.push(shadow);",
    '    sb.push("</template>");',
    "  }",
    "  if (child) {",
    "    sb.push(child);",
    "  }",
    "",
    "  sb.push(`</${tag}>`);",
    '  return renderHtml(sb.join("\\n"));',
    "}",
    "",
    "function getComponent(route: string) {",
    "  for (const key of Array.from(components.keys())) {",
    "    if (key === route) return components.get(key)!;",
    "    const regMatch = route.match(fixRegex(key));",
    "    if (regMatch !== null) return components.get(key)!;",
    "  }",
    "}",
    "",
    "function fixRegex(route: string): RegExp {",
    '  const variableRegex = "[a-zA-Z0-9_-]+";',
    "  const nameWithParameters = route.replace(",
    "    new RegExp(`:(${variableRegex})`),",
    "    (match) => {",
    "      const groupName = match.slice(1);",
    "      return `(?<${groupName}>[a-zA-Z0-9_\\\\-.,:;+*^%$@!]+)`;",
    "    }",
    "  );",
    "  return new RegExp(`^${nameWithParameters}$`);",
    "}",
    "",
    'function renderHtml(content: string, title = "") {',
    "  return `<!DOCTYPE html>",
    '  <html lang="en">',
    "    <head>",
    '      <meta charset="UTF-8">',
    '      <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    "      <title>${title}</title>",
    "      <style>",
    "        body {",
    "          margin: 0;",
    "          padding: 0;",
    "        }",
    "      </style>",
    "    </head>",
    "    <body>",
    "      ${content}",
    "    </body>",
    "  </html>",
    "`;",
    "}",
  ]);

  sb.writeAll([
    "app.listen(port, () => {",
    "  console.log(`Server started on port http://localhost:${port}`);",
    "});",
  ]);

  return sb.toString();
}

// function renderTemplate(
//   component: WebComponent,
//   components: WebComponent[],
//   child?: string
// ) {
//   const sb = new StringBuilder();
//   const template = renderTag(component, child);
//   if (component.parentRoute) {
//     const parent = components.find((c) => c.route === component.parentRoute);
//     if (parent) {
//       sb.write(renderTemplate(parent, components, template));
//     }
//   } else {
//     // Check for root
//     const root = components.find((c) => c.route === "");
//     if (root) {
//       const rootTemplate = renderTag(root, template);
//       sb.write(rootTemplate);
//     } else {
//       sb.writeln(template);
//     }
//   }
//   return sb.toString();
// }

// function renderTag(component: WebComponent, child?: string) {
//   const sb = new StringBuilder();
//   sb.write(`<${component.name}`);
//   for (const attr of component.args) {
//     sb.write(` ${attr}="\${args["${attr}"]}"`);
//   }
//   sb.writeln(">");
//   if (child) sb.writeln(child);
//   sb.write(`</${component.name}>`);
//   return sb.toString();
// }

// function getImports(component: WebComponent, components: WebComponent[]) {
//   const sb = new StringBuilder();
//   sb.writeln(`import "${component.relativePath}";`);
//   if (component.parentRoute) {
//     const parent = components.find((c) => c.route === component.parentRoute);
//     if (parent) {
//       sb.write(getImports(parent, components));
//     }
//   }
//   // Get root
//   const root = components.find((c) => c.route === "");
//   if (root) {
//     sb.writeln(`import "${root.relativePath}";`);
//   }
//   return sb.toString();
// }
