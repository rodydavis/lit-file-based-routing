import { WebComponent } from "./analyze-page";
import { StringBuilder } from "./string-builder";

export function generateApp(
  sb: StringBuilder,
  components: WebComponent[],
  options: { staticImports: boolean; cacheAll: boolean }
) {
  sb.writeln(`import { html, css, LitElement } from "lit";`);
  sb.writeln(
    `import { customElement, property, state } from "lit/decorators.js";`
  );
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
    "  @property() hash = 'true';",
    "  @property() base = '/';",
    "  @property() route = this.getCurrentRoute();",
    "  @state() child = document.createElement('main');",
    "",
  ]);
  if (options.cacheAll) {
    sb.writeln("  dataCache = new Map<string, any>();");
  }
  sb.writeln("  components: Map<string, Route> = new Map([");
  for (const component of components) {
    let path = component.path.replace("./src/pages/", "/");
    path = path.replace(".ts", "");
    path = path.replace(".js", "");
    path = path.replace("/index", "/");
    // Check if path contains . and convert to /
    if (path.indexOf(".") > -1) {
      path = path.split(".").join("/");
    }
    if (path == "/root") path = "";
    // sb.writeln(`   ["${path}", "${component.name}"],`);]
    sb.writeln(`   ["${path}", {
      component: "${component.name}",`);
    const componentImportPath = component.path
      .replace("./src/", "./")
      .replace(".ts", ".js");
    if (component.hasLoader) {
      if (options.staticImports) {
        sb.writeln(`      loadData: async () => {
        return ${component.alias}Loader;
      },`);
      } else {
        sb.writeln(`      loadData: async () => {
        const {loader} = await import("${componentImportPath}");
        return loader;
      },`);
      }
    } else {
      sb.writeln(`      loadData: async () => null,`);
    }
    if (options.staticImports) {
      sb.writeln(`      loadImport: async () => {},
    }],`);
    } else {
      sb.writeln(`      loadImport: () => import("${componentImportPath}"),
    }],`);
    }
  }
  sb.writeAll([
    "  ]);",
    "",
    "  firstUpdated() {",
    '    window.addEventListener("hashchange", () => {',
    "      const oldRoute = this.route;",
    "      this.route = this.getCurrentRoute();",
    "      this.updateTree(oldRoute);",
    "    });",
    "    this.updateTree();",
    "  }",
    "",
    "  render() {",
    "    return html` ${this.child} `;",
    "  }",
    "",
    "  private async updateTree(oldRoute?:string) {",
    "    if (oldRoute) {",
    "      // TODO: Get delta between old and new route",
    "    }",
    "    // Remove children",
    "    while (this.child.firstChild) {",
    "      this.child.removeChild(this.child.firstChild);",
    "    }",
    "    // Add new children",
    "    const tree = await this.renderTree();",
    "    this.child.appendChild(tree);",
    "    this.requestUpdate();",
    "  }",
    "",
    "  private async renderTree() {",
    '    let child: Element = document.createElement("div");',
    "    let _route = this.route;",
    "    const args = this.getArgsForRoute(_route);",
    '    if (_route !== "/") {',
    "      while (_route.length > 0) {",
    "        child = await this.getComponent(_route, child, args);",
    '        const parts = _route.split("/");',
    "        parts.pop();",
    '        _route = parts.join("/");',
    '        if (_route === "/") break;',
    "      }",
    '    } else if (_route === "/") {',
    '      child = await this.getComponent("/", child, args);',
    "    } else {",
    '      child = await this.getComponent("/404", child, args);',
    "    }",
    '    child = await this.getComponent("", child, args);',
    "    return child;",
    "  }",
    "",
    "  private async getComponent(",
    "    path: string,",
    "    child: Element,",
    "    args: RegExpMatchArray | null",
    "  ) {",
    "    const applyArgs = (value: string, apply: boolean, data?: any) => {",
    "      const elem = document.createElement(value);",
    "      elem.appendChild(child);",
    "      if (apply && args?.groups) {",
    "        for (const [key, value] of Object.entries(args.groups)) {",
    "          elem.setAttribute(key, value);",
    "        }",
    "      }",
    "      if (data) (elem as any).data = data;",
    "      return elem;",
    "    };",
    "    for (const [key, value] of Array.from(this.components.entries())) {",
    "      const hasArgs = path.match(fixRegex(key)) !== null;",
    "      if (key === path || path.match(fixRegex(key)) !== null) {",
    "        const cacheKey = `${path}:${value.component}`;",
    "        if (this.dataCache.has(cacheKey)) {",
    "          const data = this.dataCache.get(cacheKey)!;",
    "          return applyArgs(value.component, hasArgs, data);",
    "        }",
    "        const getLoader = await value.loadData();",
    "        if (getLoader) {",
    "          const componentData = await getLoader(this.route, args ? Object(args)['groups'] : {});",
    "          this.dataCache.set(cacheKey, componentData);",
    "          return applyArgs(value.component, hasArgs, componentData);",
    "        }",
    ...(options.staticImports ? [] : ["        await value.loadImport();"]),
    "        return applyArgs(value.component, hasArgs);",
    "      }",
    "    }",
    "    return child;",
    "  }",
    "",
    "  private getArgsForRoute(route: string): RegExpMatchArray | null {",
    "    for (const key of Array.from(this.components.keys())) {",
    "      const regMatch = route.match(fixRegex(key));",
    "      if (regMatch !== null) return regMatch;",
    "    }",
    "    return null;",
    "  }",
    "",
    "  private getCurrentRoute() {",
    '    let route = "/";',
    "    if (this.hash ==='true' && window.location.hash.length > 0) {",
    "      route = window.location.hash.slice(1);",
    "    } else {",
    "      const baseUrl = this.getAttribute('base') ?? '';",
    "      route = window.location.pathname.slice(baseUrl.length);",
    "    }",
    "    if (route == '') route = '/';",
    "    console.debug(`current route: ${route}`);",
    "    return route;",
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
    "interface Route {",
    "  component: string;",
    "  loadImport: () => Promise<any>;",
    "  loadData: () => Promise<any>;",
    "}",
    "",
  ]);
  sb.writeln();
}
