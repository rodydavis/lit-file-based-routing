import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("account-details")
export class AccountDetails extends LitElement {
  static styles = css``;

  @property({ type: String }) id = "";

  render() {
    return html`<section>User ID: ${this.id}</section>`;
  }
}
