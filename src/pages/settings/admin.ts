import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("admin-settings")
export class AdminSettings extends LitElement {
  static override styles = css``;

  override render() {
    return html`Admin Settings`;
  }
}
