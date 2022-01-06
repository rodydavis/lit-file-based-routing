import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("settings-default")
export class SettingsDefault extends LitElement {
  static styles = css``;

  render() {
    return html`<section>Default Settings</section>`;
  }
}
