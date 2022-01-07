import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("custom-route")
export class CustomRoute extends LitElement {
  static styles = css``;

  render() {
    return html` <main>
      <header>Custom</header>
    </main>`;
  }
}
