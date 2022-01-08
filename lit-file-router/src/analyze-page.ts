export function analyzePage(path: string, content: string): WebComponent[] {
  const components: WebComponent[] = [];
  // Check for export function loader( or export async function loader(
  let hasLoader = false;
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      line.includes("export function loader(") ||
      line.includes("export async function loader(")
    ) {
      hasLoader = true;
      break;
    }
  }

  // Look for @customElement decorator and get the value
  const regex = /@customElement\("([^"]+)"\)/g;
  const matches = content.match(regex);
  if (matches) {
    for (const match of matches) {
      const result = match.match(/@customElement\("([^"]+)"\)/);
      if (result) {
        const name = result[1];
        components.push({
          name,
          path,
          hasLoader,
        });
      }
    }
  }
  // Look for customElements.define() and get the value
  const regex2 = /customElements\.define\("([^"]+)"/g;
  const matches2 = content.match(regex2);
  if (matches2) {
    for (const match of matches2) {
      const result = match.match(/customElements\.define\("([^"]+)"/);
      if (result) {
        const name = result[1];
        components.push({
          name,
          path,
          hasLoader,
        });
      }
    }
  }
  return components;
}

export interface WebComponent {
  name: string;
  path: string;
  alias?: string;
  hasLoader: boolean;
}
