import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("account-info")
export class AccountInfo extends LitElement {
  static override styles = css`
    article {
      padding: 16px;
    }
  `;

  override render() {
    return html`<article>
      <h3>Account Info</h3>
      <ul>
        <li><a href="#/dashboard/account/1">User 1</a></li>
        <li><a href="#/dashboard/account/2">User 2</a></li>
        <li><a href="#/dashboard/account/3">User 3</a></li>
      </ul>
    </article>`;
  }
}
