// @ts-nocheck

// Page Routes
import "./pages/404.js";
import "./pages/dashboard/account/:id.js";
import "./pages/dashboard/account/index.js";
import "./pages/dashboard/account.js";
import "./pages/dashboard/index.js";
import "./pages/dashboard/overview.js";
import "./pages/dashboard.js";
import "./pages/index.js";
import "./pages/root.js";
import "./pages/settings/admin.js";
import "./pages/settings/index.js";
import "./pages/settings.js";

import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("generated-app")
export class GeneratedApp extends LitElement {
  static styles = css`
    main {
      width: 100%;
      height: 100%;
    }
  `;

  @property() hash = 'true';
  @property({attribute: 'base-url'}) baseUrl = '/';
  @property() route = this.getCurrentRoute();

  components: Map<string, string> = new Map([
   ["/404", "unknown-route"],
   ["/dashboard/account/:id", "account-details"],
   ["/dashboard/account/", "account-info"],
   ["/dashboard/account", "account-module"],
   ["/dashboard/", "dashboard-default"],
   ["/dashboard/overview", "overview-module"],
   ["/dashboard", "dashboard-module"],
   ["/", "app-module"],
   ["", "root-module"],
   ["/settings/admin", "admin-settings"],
   ["/settings/", "settings-default"],
   ["/settings", "settings-module"],
  ]);

  firstUpdated() {
    window.addEventListener("hashchange", () => {
      this.route = this.getCurrentRoute();
      this.requestUpdate();
    });
  }

  render() {
    let child: Element = document.createElement("div");
    let _route = this.route;
    if (_route !== "/") {
      while (_route.length > 0) {
          child = this.getComponent(_route, child);
          const parts = _route.split("/");
          parts.pop();
          _route = parts.join("/");
          if (_route === "/") break;
      }
    } else if (_route === "/") {
      child = this.getComponent("/", child);
    } else {
      child = this.getComponent("/404", child);
    }
        child = this.getComponent("", child);
    return html` <main>${child}</main>`;
  }

  private getComponent(path: string, child: Element) {
  for (const [key, value] of Array.from(this.components.entries())) {
    if (key === path) {
        const elem = document.createElement(value);
        elem.appendChild(child);
        return elem;
    }
    const regMatch = path.match(fixRegex(key));
    if (regMatch) {
      const elem = document.createElement(value.name);
      if (regMatch.groups) {
        for (const [key, value] of Object.entries(regMatch.groups)) {
            elem.setAttribute(key, value);
          }
        }
        elem.appendChild(child);
        return elem;
      }
    }
    return child;
  }

  private getCurrentRoute() {
    let route = "/";
    if (this.hash ==='true' && window.location.hash.length > 0) {
      route = window.location.hash.slice(1);
    } else {
      const baseUrl = this.getAttribute("base") ?? "";
      route = window.location.pathname.slice(baseUrl.length);
    }
    if (route == '') route = '/';
    console.debug(`current route: ${route}`);
    return route;
  }
}

function fixRegex(route: string): RegExp {
  const variableRegex = "[a-zA-Z0-9_-]+";
  const nameWithParameters = route.replace(
    new RegExp(`:(${variableRegex})`),
    (match) => {
      const groupName = match.slice(1);
      return `(?<${groupName}>[a-zA-Z0-9_\\-.,:;+*^%$@!]+)`;
    }
  );
  return new RegExp(`^${nameWithParameters}$`);
}

