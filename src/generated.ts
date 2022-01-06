// @ts-nocheck

// Page Routes
import * as route0 from "./pages/404.js";
import * as route1 from "./pages/dashboard/index.js";
import * as route2 from "./pages/dashboard/overview.js";
import * as route3 from "./pages/dashboard.js";
import * as route4 from "./pages/index.js";
import * as route5 from "./pages/root.js";
import * as route6 from "./pages/settings/index.js";
import * as route7 from "./pages/settings.js";

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

  @property() route = this.getHashRoute();
  components: Map<string, WebComponent> = new Map([
   ["/404", { name: "unknown-route", type: route0.UnknownRoute }],
   ["/dashboard/", { name: "dashboard-default", type: route1.DashboardDefault }],
   ["/dashboard/overview", { name: "dashboard-overview", type: route2.DashboardOverview }],
   ["/dashboard", { name: "dashboard-module", type: route3.DashboardModule }],
   ["/", { name: "app-module", type: route4.AppModule }],
   ["", { name: "root-module", type: route5.RootModule }],
   ["/settings/", { name: "settings-default", type: route6.SettingsDefault }],
   ["/settings", { name: "settings-module", type: route7.SettingsModule }],
  ]);

  firstUpdated() {
    window.addEventListener("hashchange", () => {
      this.route = this.getHashRoute();
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
      child = this.getComponent("", child);
    } else if (_route === "/") {
      child = this.getComponent("/", child);
      child = this.getComponent("", child);
    } else {
      child = this.getComponent("/404", child);
  }
    return html` <main>${child}</main>`;
  }

  private getComponent(path: string, child: Element) {
  for (const [key, value] of Array.from(this.components.entries())) {
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

  private getHashRoute() {
    let route = "/";
    if (window.location.hash.length > 0) {
      route = window.location.hash.slice(1);
      if (route == "") route = "/";
    }
    console.log(`current route: ${route}`);
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

interface WebComponent {
  name: string;
  type: object;
}

