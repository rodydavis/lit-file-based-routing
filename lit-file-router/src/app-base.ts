import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { ComponentController } from "./controller";

export class AppBase extends LitElement {
  static override styles = css`
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
  @state() child = html`<main></main>`;
  dataCache = new Map<string, any>();
  components: Map<string, Route> = new Map();
  controller = new ComponentController();

  override firstUpdated() {
    window.addEventListener("hashchange", () => {
      const oldRoute = this.route;
      this.route = this.getCurrentRoute();
      this.controller.update(this.route, this.components);
      this.checkForIndex();
      this.updateTree(oldRoute);
    });
    this.checkForIndex();
    this.updateTree();
    this.controller.update(this.route, this.components);
  }

  override render() {
    return html` ${this.child} `;
  }

  refresh() {
    return this.updateTree();
  }

  private async updateTree(oldRoute?: string) {
    if (oldRoute) {
      // TODO: Get delta between old and new route
    }

    // Show loading component
    if (this.showLoading) {
      const loadingElem = document.createElement("span");
      loadingElem.innerText = "Loading...";
      this.child = html`<main>${loadingElem}</main>`;
    }

    // Render the new tree of components
    const tree = await this.controller.renderTemplate();

    // Add new children
    if (tree) {
      this.child = html`<main>${tree}</main>`;
    } else {
      this.child = html`<main></main>`;
    }
    this.requestUpdate();
  }

  private checkForIndex() {
    if (this.route === "" || this.route === "/") location.hash = "#/";
    if (this.route.endsWith("/")) return;
    const indexArgs = this.controller.getArgsForRoute(`${this.route}/`);
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

export interface Route {
  component: string;
  loadImport: () => Promise<any>;
  loadData: () => Promise<RouteLoader | null>;
}

type RouteLoader = (
  route: string,
  args: { [key: string]: any }
) => Promise<any>;
