import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export async function loader(
  route: string,
  args: { [key: string]: any }
): Promise<AccountData> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const id = args["id"]!;
  return {
    id,
    route,
    name: "Name: " + id,
  };
}

@customElement("account-details")
export class AccountDetails extends LitElement {
  static override styles = css``;

  @property({ type: String }) override id = "";
  @property({ type: Object }) data!: AccountData;

  override render() {
    return html`<section>${this.data.name}</section>`;
  }
}

interface AccountData {
  id: string;
  route: string;
  name: string;
}
