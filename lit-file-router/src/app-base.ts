import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export class AppBase extends LitElement {
  static styles = css`
    main {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: Boolean }) cacheAll = false;
  @property({ type: Boolean }) showLoading = false;
  @property() hash = "true";
  @property() base = "/";
  @state() loading = false;
  @property() route = this.getCurrentRoute();
  @state() child = document.createElement("main");
  dataCache = new Map<string, any>();
  components: Map<string, Route> = new Map();

  firstUpdated() {
    window.addEventListener("hashchange", () => {
      const oldRoute = this.route;
      this.route = this.getCurrentRoute();
      this.checkForIndex();
      this.updateTree(oldRoute);
    });
    this.checkForIndex();
    this.updateTree();
  }

  render() {
    return html` ${this.child} `;
  }

  refresh() {
    return this.updateTree();
  }

  private async updateTree(oldRoute?: string) {
    if (oldRoute) {
      // TODO: Get delta between old and new route
    }

    // Remove children
    while (this.child.firstChild) {
      this.child.removeChild(this.child.firstChild);
    }

    // Show loading component
    let loadingElem: HTMLElement | undefined;
    if (this.showLoading) {
      loadingElem = document.createElement("span");
      loadingElem.innerText = "Loading...";
      this.child.appendChild(loadingElem);
    }

    // Render the new tree of components
    const tree = await this.renderTree();

    if (this.showLoading && loadingElem) loadingElem.remove();

    // Add new children
    if (tree) this.child.appendChild(tree);
    this.requestUpdate();
  }

  private async renderTree() {
    let _route = this.route;
    const args = this.getArgsForRoute(_route);
    const elements: Element[] = [];
    if (_route !== "/") {
      // Build up the element array for each part of the url
      while (_route.length > 0) {
        const newChild = await this.getComponent(_route, args);
        if (!newChild && _route === this.route) {
          const noChild = await this.getComponent("/404", args);
          if (noChild) elements.push(noChild);
          break;
        }
        elements.push(newChild!);
        const parts = _route.split("/");
        parts.pop();
        _route = parts.join("/");
        if (_route === "/") break;
      }
    } else if (_route === "/") {
      // Return index route
      const indexChild = await this.getComponent("/", args);
      if (indexChild) elements.push(indexChild);
    } else {
      // Return a 404 child
      const noChild = await this.getComponent("/404", args);
      if (noChild) elements.push(noChild);
    }
    // Find the root child (if exists)
    const rootChild = await this.getComponent("", args);
    if (rootChild) elements.push(rootChild);

    let idx = elements.length - 1;
    while (idx >= 1) {
      const parent = elements[idx];
      const child = elements[idx - 1];
      if (child && parent) {
        parent.appendChild(child);
      }
      idx--;
    }

    return elements.pop();
  }

  private async getComponent(path: string, args: RegExpMatchArray | null) {
    const applyArgs = (value: string, apply: boolean, data?: any) => {
      const elem = document.createElement(value);
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
        if (this.cacheAll && this.dataCache.has(cacheKey)) {
          const data = this.dataCache.get(cacheKey)!;
          await value.loadImport();
          return applyArgs(value.component, hasArgs, data);
        }
        const loader = await value.loadData();
        if (loader) {
          const componentData = await loader(
            this.route,
            args ? Object(args)["groups"] : {}
          );
          if (this.cacheAll) {
            this.dataCache.set(cacheKey, componentData);
          }
          await value.loadImport();
          return applyArgs(value.component, hasArgs, componentData);
        } else {
          await value.loadImport();
          return applyArgs(value.component, hasArgs);
        }
      }
    }
    return null;
  }

  private getArgsForRoute(route: string): RegExpMatchArray | null {
    for (const key of Array.from(this.components.keys())) {
      const regMatch = route.match(fixRegex(key));
      if (regMatch !== null) return regMatch;
    }
    return null;
  }

  private checkForIndex() {
    if (this.route === "" || this.route === "/") location.hash = "#/";
    if (this.route.endsWith("/")) return;
    const indexArgs = this.getArgsForRoute(`${this.route}/`);
    if (indexArgs !== null) {
      this.route = `${this.route}/`;
      location.hash = `#${this.route}`;
    }
  }

  private getCurrentRoute() {
    let route = "/";
    if (this.hash === "true" && window.location.hash.length > 0) {
      route = window.location.hash.slice(1);
    } else if (this.hash === "false") {
      const baseUrl = this.getAttribute("base") ?? "";
      route = window.location.pathname.slice(baseUrl.length);
    }
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

export interface Route {
  component: string;
  loadImport: () => Promise<any>;
  loadData: () => Promise<RouteLoader | null>;
}

type RouteLoader = (
  route: string,
  args: { [key: string]: any }
) => Promise<any>;
