// @ts-nocheck

// Page Routes
import * as route0 from "./pages/index.js";
import * as route1 from "./pages/root.js";

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
  components: Map<string, WebComponent> = new Map();

  firstUpdated() {
   this.components.set("/", { name: "app-module", type: route0.AppModule });
   this.components.set("", { name: "root-module", type: route1.RootModule });
    window.addEventListener("hashchange", () => {
      this.route = this.getHashRoute();
      this.requestUpdate();
    });
  }

  render() {
    return html` <main>
      <slot></slot>
    </main>`;
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

interface WebComponent {
  name: string;
  type: object;
}

