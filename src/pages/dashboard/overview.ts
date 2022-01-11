import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("overview-module")
export class OverviewModule extends LitElement {
  static override styles = css``;

  override render() {
    return html`<section>Overview</section>`;
  }
}
