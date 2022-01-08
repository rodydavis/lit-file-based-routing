import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import '../components/menu-button.js';

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
      padding-right: 10px;
      justify-content: space-between;
    }
  `;

  render() {
    return html`<main>
      <header>
        <menu-button></menu-button>
        <span class="title">Dashboard</span>
        <nav>
          <a href="#/dashboard/overview">Overview</a>
          <a href="#/dashboard/account/">Account</a>
        </nav>
      </header>
      <section><slot></slot></section>
    </main> `;
  }
}
