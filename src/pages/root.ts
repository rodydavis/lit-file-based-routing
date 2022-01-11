import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class RootModule extends LitElement {
  static override styles = css`
    main {
      display: flex;
      flex-direction: row;
      height: 100vh;
      width: 100%;
    }
    aside {
      display: flex;
      flex-direction: column;
      background-color: whitesmoke;
      padding: 8px;
    }
    section {
      flex: 1;
    }
  `;

  @property() name = "Test";

  override render() {
    return html`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard">Dashboard</a>
          <a href="#/settings">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `;
  }
}
customElements.define("root-module", RootModule);
