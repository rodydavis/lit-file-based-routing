import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("account-module")
export class AccountModule extends LitElement {
  static styles = css``;

  render() {
    return html`<section><slot></slot></section>`;
  }
}
