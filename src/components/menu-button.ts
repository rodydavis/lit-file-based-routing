import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("menu-button")
export class MenuButton extends LitElement {
  static styles = css``;

  render() {
    return html` <button @click=${() => alert('Menu Toggle')}>Menu</button> `;
  }
}
