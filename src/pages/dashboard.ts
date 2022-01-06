import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dashboard-module")
export class DashboardModule extends LitElement {
  static styles = css`
    header {
      height: 40px;
      background-color: orange;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
    }
  `;

  render() {
    return html`<main>
      <header>Dashboard</header>
      <section><slot></slot></section>
    </main> `;
  }
}
