import type { TemplateResult } from "lit";
import { html, literal } from "lit/static-html.js";
import { StringBuilder } from "./string-builder.js";
import { unsafeStatic } from "lit/static-html.js";
import { fixRegex } from "./utils.js";

export class ComponentController {
  cacheAll = false;
  route = "/";
  dataCache = new Map<string, any>();
  components: Map<string, Route> = new Map();

  update(route: string, components: Map<string, Route>) {
    this.route = route;
    this.components = components;
  }

  async renderTemplate() {
    const tree = await this.renderTree();
    if (tree) return createTemplate(tree);
    return html``;
  }

  async renderTree() {
    let _route = this.route;
    const args = this.getArgsForRoute(_route);
    const elements: ComponentData[] = [];
    if (_route !== "/") {
      // Build up the element array for each part of the url
      while (_route.length > 0) {
        const newChild = await this.getComponent(_route, args);
        if (!newChild && _route === this.route) {
          const noChild = await this.getComponent("/404", args);
          if (noChild) elements.push(noChild);
          break;
        }
        elements.push(newChild!);
        const parts = _route.split("/");
        parts.pop();
        _route = parts.join("/");
        if (_route === "/") break;
      }
    } else if (_route === "/") {
      // Return index route
      const indexChild = await this.getComponent("/", args);
      if (indexChild) elements.push(indexChild);
    } else {
      // Return a 404 child
      const noChild = await this.getComponent("/404", args);
      if (noChild) elements.push(noChild);
    }
    // Find the root child (if exists)
    const rootChild = await this.getComponent("", args);
    if (rootChild) elements.push(rootChild);

    let idx = elements.length - 1;
    while (idx >= 1) {
      const parent = elements[idx];
      const child = elements[idx - 1];
      if (child && parent) {
        parent.children.push(child);
      }
      idx--;
    }

    return elements.pop();
  }

  async getComponent(
    path: string,
    args: RegExpMatchArray | null
  ): Promise<ComponentData | null> {
    const applyArgs = (value: string, apply: boolean, data?: any) => {
      const attrs: { [key: string]: string } = {};
      if (apply && args?.groups) {
        for (const [key, value] of Object.entries(args.groups)) {
          if (key && value) attrs[key] = value;
        }
      }
      return {
        tagName: value,
        attributes: attrs,
        data,
        children: [],
      };
    };
    for (const [key, value] of Array.from(this.components.entries())) {
      const hasArgs = path.match(fixRegex(key)) !== null;
      if (key === path || path.match(fixRegex(key)) !== null) {
        const cacheKey = `${path}:${value.component}`;
        if (this.cacheAll && this.dataCache.has(cacheKey)) {
          const data = this.dataCache.get(cacheKey)!;
          await value.loadImport();
          return applyArgs(value.component, hasArgs, data);
        }
        const loader = await value.loadData();
        if (loader) {
          const componentData = await loader(
            this.route,
            args ? Object(args)["groups"] : {}
          );
          if (this.cacheAll) {
            this.dataCache.set(cacheKey, componentData);
          }
          await value.loadImport();
          return applyArgs(value.component, hasArgs, componentData);
        } else {
          await value.loadImport();
          return applyArgs(value.component, hasArgs);
        }
      }
    }
    return null;
  }

  getArgsForRoute(route: string): RegExpMatchArray | null {
    for (const key of Array.from(this.components.keys())) {
      const regMatch = route.match(fixRegex(key));
      if (regMatch !== null) return regMatch;
    }
    return null;
  }
}

export interface Route {
  component: string;
  loadImport: () => Promise<any>;
  loadData: () => Promise<RouteLoader | null>;
}

type RouteLoader = (
  route: string,
  args: { [key: string]: any }
) => Promise<any>;

interface ComponentData {
  tagName: string;
  attributes: { [key: string]: string };
  data?: any;
  children: ComponentData[];
}

export function createTemplate(tree: ComponentData): TemplateResult {
  const tag = literal`${unsafeStatic(tree.tagName)}`;
  return html`<${tag}
      .data=${tree.data || {}}
      ${Object.entries(tree.attributes).map(([key, value]) => {
        return html` ${key}="${value}"`;
      })}
    >
    ${tree.children.map((child) => {
      return createTemplate(child);
    })}
    </${tag}>`;
}

export function createTemplateString(tree: ComponentData): string {
  const sb = new StringBuilder();
  sb.write(`<${tree.tagName}`);
  for (const [key, value] of Object.entries(tree.attributes)) {
    sb.write(` ${key}="${value}"`);
  }
  sb.writeln(">");
  for (const child of tree.children) {
    sb.writeln(createTemplateString(child));
  }
  sb.writeln(`</${tree.tagName}>`);
  return sb.toString();
}
