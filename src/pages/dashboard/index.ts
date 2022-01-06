import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dashboard-default")
export class DashboardDefault extends LitElement {
  static styles = css``;

  render() {
    return html`<section>Default Dashboard</section>`;
  }
}
