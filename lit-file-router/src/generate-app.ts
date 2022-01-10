import { WebComponent } from "./analyze-page";
import { StringBuilder } from "./string-builder";

export function generateApp(
  sb: StringBuilder,
  components: WebComponent[],
  options: { staticImports: boolean; cacheAll: boolean; showLoading: boolean }
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
    ...(options.showLoading
      ? [
          "    progress {",
          "      position: absolute;",
          "      bottom: 0;",
          "      width: calc(100% - 1rem);",
          "      z-index: 1;",
          "      left: 0.5rem;",
          "      right: 0.5rem;",
          "    }",
        ]
      : []),
    "  `;",
    "",
    "  @property() hash = 'true';",
    "  @property() base = '/';",
    ...(options.showLoading ? ["  @state() loading = false;"] : []),
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
        return ${component.alias}.loader;
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
      sb.writeln(`      loadImport: async () => ${component.alias},
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
    "  refresh() {",
    "    return this.updateTree();",
    "  }",
    "",
    "  private async updateTree(oldRoute?:string) {",
    "    this.checkForIndex();",
    "    if (oldRoute) {",
    "      // TODO: Get delta between old and new route",
    "    }",
    ...(options.showLoading
      ? [
          '    const loadingElem = document.createElement("progress");',
          "    this.child.appendChild(loadingElem);",
        ]
      : []),
    "    const tree = await this.renderTree();",
    "    // Remove children",
    "    while (this.child.firstChild) {",
    "      this.child.removeChild(this.child.firstChild);",
    "    }",
    "    // Add new children",
    "    if (tree) this.child.appendChild(tree);",
    "    this.requestUpdate();",
    "  }",
    "",
    "  private async renderTree() {",
    "    let _route = this.route;",
    "    const args = this.getArgsForRoute(_route);",
    "    const elements: Element[] = [];",
    '    if (_route !== "/") {',
    "      while (_route.length > 0) {",
    "        const newChild = await this.getComponent(_route, args);",
    "        if (!newChild && _route === this.route) {",
    '          const noChild = await this.getComponent("/404", args);',
    "          if (noChild) elements.push(noChild);",
    "          break;",
    "        }",
    "        if (newChild) elements.push(newChild);",
    '        const parts = _route.split("/");',
    "        parts.pop();",
    '        _route = parts.join("/");',
    '        if (_route === "/") break;',
    "      }",
    '    } else if (_route === "/") {',
    '      const indexChild = await this.getComponent("/", args);',
    "      if (indexChild) elements.push(indexChild);",
    "    } else {",
    '      const noChild = await this.getComponent("/404", args);',
    "      if (noChild) elements.push(noChild);",
    "    }",
    '    const rootChild = await this.getComponent("", args);',
    "    if (rootChild) elements.push(rootChild);",
    "    let idx = elements.length - 1;",
    "    while (idx >= 1) {",
    "      const parent = elements[idx];",
    "      const child = elements[idx - 1];",
    "      if (child && parent) {",
    "        parent.appendChild(child);",
    "      }",
    "      idx--;",
    "    }",
    "    return elements.pop();",
    "  }",
    "",
    "  private async getComponent(",
    "    path: string,",
    "    args: RegExpMatchArray | null",
    "  ) {",
  "      const applyArgs = (value: string, apply: boolean, data?: any) => {",
    "      const elem = document.createElement(value);",
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
    ...(options.cacheAll
      ? [
          "        const cacheKey = `${path}:${value.component}`;",
          "        if (this.dataCache.has(cacheKey)) {",
          "          const data = this.dataCache.get(cacheKey)!;",
          ...(options.staticImports
            ? []
            : ["          await value.loadImport();"]),
          "          return applyArgs(value.component, hasArgs, data);",
          "        }",
        ]
      : []),
    "        const getLoader = await value.loadData();",
    "        if (getLoader) {",
    "          const componentData = await getLoader(this.route, args ? Object(args)['groups'] : {});",
    ...(options.cacheAll
      ? ["          this.dataCache.set(cacheKey, componentData);"]
      : []),
    ...(options.staticImports ? [] : ["          await value.loadImport();"]),
    "          return applyArgs(value.component, hasArgs, componentData);",
    "        }",
    ...(options.staticImports ? [] : ["        await value.loadImport();"]),
    "        return applyArgs(value.component, hasArgs);",
    "      }",
    "    }",
    "    return null;",
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
    "  private checkForIndex() {",
    '    if (this.route === "" || this.route === "/") location.hash = "#/";',
    '    if (this.route.endsWith("/")) return;',
    "    const indexArgs = this.getArgsForRoute(`${this.route}/`);",
    "    if (indexArgs !== null) {",
    "      location.hash = `#${this.route}/`;",
    "    }",
    "  }",
    "",
    "  private getCurrentRoute() {",
    '  let route = "/";',
    '  if (this.hash === "true" && window.location.hash.length > 0) {',
    "    route = window.location.hash.slice(1);",
    '  } else if (this.hash === "false") {',
    '    const baseUrl = this.getAttribute("base") ?? "";',
    "    route = window.location.pathname.slice(baseUrl.length);",
    "  }",
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
    "  loadData: () => Promise<RouteLoader | null>;",
    "}",
    "",
    "type RouteLoader = (",
    "  route: string,",
    "  args: { [key: string]: any }",
    ") => Promise<any>;",
  ]);
  sb.writeln();
}
