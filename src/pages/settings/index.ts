import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("settings-default")
export class SettingsDefault extends LitElement {
  static override styles = css``;

  override render() {
    return html`<section>Default Settings</section>`;
  }
}
