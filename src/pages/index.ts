import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-module")
export class AppModule extends LitElement {
  static override styles = css`
    header {
      height: 40px;
      background-color: navy;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;

  override render() {
    return html` <main>
      <header>App Base</header>
      <slot></slot>
    </main>`;
  }
}
