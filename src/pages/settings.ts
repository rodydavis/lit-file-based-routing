import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import "../components/menu-button.js";

@customElement("settings-module")
export class SettingsModule extends LitElement {
  static styles = css`
    header {
      height: 40px;
      background-color: black;
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      justify-content: space-between;
    }
  `;

  render() {
    return html` <main>
      <header>
        <menu-button></menu-button>
        <span class="title">Settings</span>
        <div></div>
      </header>
      <slot></slot>
    </main>`;
  }
}
