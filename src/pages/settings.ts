import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

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
    }
  `;

  render() {
    return html` <main>
      <header>Settings</header>
      <slot></slot>
    </main>`;
  }
}
