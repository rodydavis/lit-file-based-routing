import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export async function loader(route: string, args: { [key: string]: any }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const id = args["id"]!;
  return {
    id,
    name: "Name: " + id,
    email: route,
  };
}

@customElement("account-details")
export class AccountDetails extends LitElement {
  static styles = css``;

  @property({ type: String }) id = "";
  @property({ type: Object }) data!: AccountData;

  render() {
    return html`<section>User ID: ${this.data.id}</section>`;
  }
}

interface AccountData {
  id: string;
  name: string;
  email: string;
}
