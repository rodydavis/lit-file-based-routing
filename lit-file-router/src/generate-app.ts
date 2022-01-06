import { WebComponent } from "./analyze-page";
import { StringBuilder } from "./string-builder";

export function generateApp(sb: StringBuilder, components: WebComponent[]) {
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
    "  @property() hash = 'true';",
    "  @property() base = '/';",
    "  @property() route = this.getCurrentRoute();",
    "",
    "  components: Map<string, string> = new Map([",
  ]);
  sb.writeln();
  for (const component of components) {
    let path = component.path.replace("./src/pages/", "/");
    path = path.replace(".ts", "");
    path = path.replace(".js", "");
    path = path.replace("/index", "/");
    if (path == "/root") path = "";
    sb.writeln(`   ["${path}", "${component.name}"],`);
  }
  sb.writeAll([
    "  ]);",
    "",
    "  firstUpdated() {",
    '    window.addEventListener("hashchange", () => {',
    "      this.route = this.getCurrentRoute();",
    "      this.requestUpdate();",
    "    });",
    "  }",
    "",
    "  render() {",
    '    let child: Element = document.createElement("div");',
    "    let _route = this.route;",
    '    if (_route !== "/") {',
    "      while (_route.length > 0) {",
    "          child = this.getComponent(_route, child);",
    '          const parts = _route.split("/");',
    "          parts.pop();",
    '          _route = parts.join("/");',
    '          if (_route === "/") break;',
    "      }",
    '    } else if (_route === "/") {',
    '      child = this.getComponent("/", child);',
    "    } else {",
    '      child = this.getComponent("/404", child);',
    "    }",
    '        child = this.getComponent("", child);',
    "    return html` <main>${child}</main>`;",
    "  }",
    "",
    "  private getComponent(path: string, child: Element) {",
    "  for (const [key, value] of Array.from(this.components.entries())) {",
    "    if (key === path) {",
    "        const elem = document.createElement(value);",
    "        elem.appendChild(child);",
    "        return elem;",
    "    }",
    "    const regMatch = path.match(fixRegex(key));",
    "    if (regMatch !== null) {",
    "      const elem = document.createElement(value);",
    "      if (regMatch.groups) {",
    "        for (const [key, value] of Object.entries(regMatch.groups)) {",
    "            elem.setAttribute(key, value);",
    "          }",
    "        }",
    "        elem.appendChild(child);",
    "        return elem;",
    "      }",
    "    }",
    "    return child;",
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
  ]);
  sb.writeln();
}
