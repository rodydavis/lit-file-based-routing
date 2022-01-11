import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("unknown-route")
export class UnknownRoute extends LitElement {
  static override styles = css``;

  override render() {
    return html` <main>
      <header>404</header>
    </main>`;
  }
}
