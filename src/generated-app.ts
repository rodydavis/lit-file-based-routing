import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("generated-app")
export class GeneratedApp extends LitElement {
  static styles = css`
    main {
      width: 100%;
      height: 100%;
    }
    progress {
      position: absolute;
      bottom: 0;
      width: calc(100% - 1rem);
      z-index: 1;
      left: 0.5rem;
      right: 0.5rem;
    }
  `;

  @property() hash = "true";
  @property() base = "/";
  @state() loading = false;
  @property() route = this.getCurrentRoute();
  @state() child = document.createElement("main");
  dataCache = new Map<string, any>();
  components: Map<string, Route> = new Map([
    [
      "/404",
      {
        component: "unknown-route",
        loadData: async () => null,
        loadImport: () => import("./pages/404.js"),
      },
    ],
    [
      "/custom/not/nested/route",
      {
        component: "custom-route",
        loadData: async () => null,
        loadImport: () => import("./pages/custom.not.nested.route.js"),
      },
    ],
    [
      "/dashboard/account/:id",
      {
        component: "account-details",
        loadData: async () => {
          const { loader } = await import("./pages/dashboard/account/:id.js");
          return loader;
        },
        loadImport: () => import("./pages/dashboard/account/:id.js"),
      },
    ],
    [
      "/dashboard/account/",
      {
        component: "account-info",
        loadData: async () => null,
        loadImport: () => import("./pages/dashboard/account/index.js"),
      },
    ],
    [
      "/dashboard/account",
      {
        component: "account-module",
        loadData: async () => null,
        loadImport: () => import("./pages/dashboard/account.js"),
      },
    ],
    [
      "/dashboard/",
      {
        component: "dashboard-default",
        loadData: async () => null,
        loadImport: () => import("./pages/dashboard/index.js"),
      },
    ],
    [
      "/dashboard/overview",
      {
        component: "overview-module",
        loadData: async () => null,
        loadImport: () => import("./pages/dashboard/overview.js"),
      },
    ],
    [
      "/dashboard",
      {
        component: "dashboard-module",
        loadData: async () => null,
        loadImport: () => import("./pages/dashboard.js"),
      },
    ],
    [
      "/",
      {
        component: "app-module",
        loadData: async () => null,
        loadImport: () => import("./pages/index.js"),
      },
    ],
    [
      "",
      {
        component: "root-module",
        loadData: async () => null,
        loadImport: () => import("./pages/root.js"),
      },
    ],
    [
      "/settings/admin",
      {
        component: "admin-settings",
        loadData: async () => null,
        loadImport: () => import("./pages/settings/admin.js"),
      },
    ],
    [
      "/settings/",
      {
        component: "settings-default",
        loadData: async () => null,
        loadImport: () => import("./pages/settings/index.js"),
      },
    ],
    [
      "/settings",
      {
        component: "settings-module",
        loadData: async () => null,
        loadImport: () => import("./pages/settings.js"),
      },
    ],
  ]);

  firstUpdated() {
    window.addEventListener("hashchange", () => {
      const oldRoute = this.route;
      this.route = this.getCurrentRoute();
      if (!this.route.endsWith("/")) {
        const indexArgs = this.getArgsForRoute(`${ this.route}/`);
        if (indexArgs !== null) {
           this.route = `${ this.route}/`;
        }
      }
      this.updateTree(oldRoute);
    });
    this.updateTree();
  }

  render() {
    return html` ${this.child} `;
  }

  private async updateTree(oldRoute?: string) {
    if (oldRoute) {
      // TODO: Get delta between old and new route
    }
    const loadingElem = document.createElement("progress");
    this.child.appendChild(loadingElem);
    const tree = await this.renderTree();
    // Remove children
    while (this.child.firstChild) {
      this.child.removeChild(this.child.firstChild);
    }
    // Add new children
    this.child.appendChild(tree);
    this.requestUpdate();
  }

  private async renderTree() {
    let child: Element = document.createElement("div");
    let _route = this.route;
    const args = this.getArgsForRoute(_route);
    if (_route !== "/") {
      while (_route.length > 0) {
        const newChild = await this.getComponent(_route, child, args);
        if (newChild === child && _route === this.route) {
          child = await this.getComponent("/404", child, args);
          break;
        }
        child = newChild;
        const parts = _route.split("/");
        parts.pop();
        _route = parts.join("/");
        if (_route === "/") break;
      }
    } else if (_route === "/") {
      child = await this.getComponent("/", child, args);
    } else {
      child = await this.getComponent("/404", child, args);
    }
    child = await this.getComponent("", child, args);
    return child;
  }

  private async getComponent(
    path: string,
    child: Element,
    args: RegExpMatchArray | null
  ) {
    const applyArgs = (value: string, apply: boolean, data?: any) => {
      const elem = document.createElement(value);
      elem.appendChild(child);
      if (apply && args?.groups) {
        for (const [key, value] of Object.entries(args.groups)) {
          elem.setAttribute(key, value);
        }
      }
      if (data) (elem as any).data = data;
      return elem;
    };
    for (const [key, value] of Array.from(this.components.entries())) {
      const hasArgs = path.match(fixRegex(key)) !== null;
      if (key === path || path.match(fixRegex(key)) !== null) {
        const cacheKey = `${path}:${value.component}`;
        if (this.dataCache.has(cacheKey)) {
          const data = this.dataCache.get(cacheKey)!;
          await value.loadImport();
          return applyArgs(value.component, hasArgs, data);
        }
        const getLoader = await value.loadData();
        if (getLoader) {
          const componentData = await getLoader(
            this.route,
            args ? Object(args)["groups"] : {}
          );
          this.dataCache.set(cacheKey, componentData);
          await value.loadImport();
          return applyArgs(value.component, hasArgs, componentData);
        }
        await value.loadImport();
        return applyArgs(value.component, hasArgs);
      }
    }
    return child;
  }

  private getArgsForRoute(route: string): RegExpMatchArray | null {
    for (const key of Array.from(this.components.keys())) {
      const regMatch = route.match(fixRegex(key));
      if (regMatch !== null) return regMatch;
    }
    return null;
  }

  private getCurrentRoute() {
    let route = "/";
    if (this.hash === "true" && window.location.hash.length > 0) {
      route = window.location.hash.slice(1);
    } else if (this.hash === "false") {
      const baseUrl = this.getAttribute("base") ?? "";
      route = window.location.pathname.slice(baseUrl.length);
    }
    if (route === "" || route === "/") location.hash = "#/";
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

interface Route {
  component: string;
  loadImport: () => Promise<any>;
  loadData: () => Promise<RouteLoader | null>;
}

type RouteLoader = (
  route: string,
  args: { [key: string]: any }
) => Promise<any>;
