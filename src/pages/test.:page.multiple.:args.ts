import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("test-module")
export class TestModule extends LitElement {
  static override styles = css``;

  override render() {
    return html`Test`;
  }
}
