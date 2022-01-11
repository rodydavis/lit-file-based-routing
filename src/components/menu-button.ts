import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("menu-button")
export class MenuButton extends LitElement {
  static override styles = css``;

  override render() {
    return html` <button @click=${() => alert("Menu Toggle")}>Menu</button> `;
  }
}
