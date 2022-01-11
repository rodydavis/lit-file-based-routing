import { WebComponent } from "../analyze-page.js";

export function generateJson(components: WebComponent[]) {
  const json: WebComponentJson = {
    components,
  };

  return JSON.stringify(json, null, 2);
}

interface WebComponentJson {
  components: WebComponent[];
}
