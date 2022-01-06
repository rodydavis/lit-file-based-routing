import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dashboard-overview")
export class DashboardOverview extends LitElement {
  static styles = css``;

  render() {
    return html`<section>Overview</section>`;
  }
}
