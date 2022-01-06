import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("root-module")
export class RootModule extends LitElement {
  static styles = css`
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

  render() {
    return html`
      <main>
        <aside>
          <a href="#/">Home</a>
          <a href="#/dashboard/">Dashboard</a>
          <a href="#/settings/">Settings</a>
        </aside>
        <section><slot></slot></section>
      </main>
    `;
  }
}
