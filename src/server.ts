import "@lit-labs/ssr/lib/install-global-dom-shim.js";
import "@lit-labs/ssr/lib/render-lit-html.js";
import { LitElementRenderer } from "@lit-labs/ssr/lib/lit-element-renderer.js";

import "./pages/test.:page.multiple.:args.js";
import "./pages/settings/admin.js";
import "./pages/settings/index.js";
import "./pages/settings.js";
import "./pages/dashboard/overview.js";
import "./pages/dashboard/account/:id.js";
import { loader as route2Loader } from "./pages/dashboard/account/:id.js";
import "./pages/dashboard/account/index.js";
import "./pages/dashboard/account.js";
import "./pages/dashboard/index.js";
import "./pages/dashboard.js";
import "./pages/custom.not.nested.route.js";
import "./pages/404.js";
import "./pages/index.js";
import "./pages/root.js";

import express from "express";

const app = express();
const port = 3000;

interface Route {
  tag: string;
  loader?: any;
  hasImplicitIndex: boolean;
  parentRoute?: string;
}

const components = new Map<string, Route>([
["/test/:page/multiple/:args", {
  tag: "test-module",
  hasImplicitIndex: false,
}],
["/settings/admin", {
  tag: "admin-settings",
  hasImplicitIndex: false,
  parentRoute: "/settings/"
}],
["/settings/", {
  tag: "settings-default",
  hasImplicitIndex: false,
  parentRoute: "/settings"
}],
["/settings", {
  tag: "settings-module",
  hasImplicitIndex: true,
}],
["/dashboard/overview", {
  tag: "overview-module",
  hasImplicitIndex: false,
  parentRoute: "/dashboard/"
}],
["/dashboard/account/:id", {
  tag: "account-details",
  loader: route2Loader,
  hasImplicitIndex: false,
  parentRoute: "/dashboard/account/"
}],
["/dashboard/account/", {
  tag: "account-info",
  hasImplicitIndex: false,
  parentRoute: "/dashboard/account"
}],
["/dashboard/account", {
  tag: "account-module",
  hasImplicitIndex: true,
  parentRoute: "/dashboard/"
}],
["/dashboard/", {
  tag: "dashboard-default",
  hasImplicitIndex: false,
  parentRoute: "/dashboard"
}],
["/dashboard", {
  tag: "dashboard-module",
  hasImplicitIndex: true,
}],
["/custom/not/nested/route", {
  tag: "custom-route",
  hasImplicitIndex: false,
}],
["/404", {
  tag: "unknown-route",
  hasImplicitIndex: false,
}],
["/", {
  tag: "app-module",
  hasImplicitIndex: false,
}],
["", {
  tag: "root-module",
  hasImplicitIndex: false,
}],
]);

app.get("/test/:page/multiple/:args", async (req, res) => {
  const contents = await renderTree("/test/:page/multiple/:args", req.params);
  res.send(contents);
});
app.get("/settings/admin", async (req, res) => {
  const contents = await renderTree("/settings/admin", req.params);
  res.send(contents);
});
app.get("/settings/", async (req, res) => {
  const contents = await renderTree("/settings/", req.params);
  res.send(contents);
});
app.get("/settings", async (req, res) => {
  const contents = await renderTree("/settings", req.params);
  res.send(contents);
});
app.get("/dashboard/overview", async (req, res) => {
  const contents = await renderTree("/dashboard/overview", req.params);
  res.send(contents);
});
app.get("/dashboard/account/:id", async (req, res) => {
  const contents = await renderTree("/dashboard/account/:id", req.params);
  res.send(contents);
});
app.get("/dashboard/account/", async (req, res) => {
  const contents = await renderTree("/dashboard/account/", req.params);
  res.send(contents);
});
app.get("/dashboard/account", async (req, res) => {
  const contents = await renderTree("/dashboard/account", req.params);
  res.send(contents);
});
app.get("/dashboard/", async (req, res) => {
  const contents = await renderTree("/dashboard/", req.params);
  res.send(contents);
});
app.get("/dashboard", async (req, res) => {
  const contents = await renderTree("/dashboard", req.params);
  res.send(contents);
});
app.get("/custom/not/nested/route", async (req, res) => {
  const contents = await renderTree("/custom/not/nested/route", req.params);
  res.send(contents);
});
app.get("/404", async (req, res) => {
  const contents = await renderTree("/404", req.params);
  res.send(contents);
});
app.get("/", async (req, res) => {
  const contents = await renderTree("/", req.params);
  res.send(contents);
});

async function renderTree(route: string, args: { [key: string]: any }) {
  let _route = route;
  let component = getComponent(_route);
  if (component && component.hasImplicitIndex) {
    _route += "/";
    component = getComponent(_route)!;
  }
  let child = undefined;

  while (component) {
    let data = undefined;
    const routeArgs = _route === route ? args : {};
    if (component.loader) data = await component.loader(_route, routeArgs);
    child = renderComponent(component.tag, routeArgs, child, data);
    _route = component.parentRoute || '';
    if (_route === '') break;
    component = getComponent(_route);
  }

  const root = getComponent("");
  if (root) {
    let data = undefined;
    if (root.loader) data = await root.loader(_route, args);
    child = renderComponent(root.tag, args, child, data);
  }

  return child || "";
}

function renderComponent(
  tag: string,
  args: { [key: string]: any },
  child: string | undefined,
  data: any | undefined
) {
  const sb: string[] = [];
  const instance = new LitElementRenderer(tag);
  const element = customElements.get(tag) || null;
  sb.push(`<${tag} `);

  for (let [name, value] of Object.entries(args)) {
    if (name in element?.prototype) {
      instance.setProperty(name, value);
    } else {
      instance.setAttribute(name, value);
    }
  }
  if (data) instance.setProperty("data", data);
  instance.connectedCallback();
  const attributes = Array.from(instance.renderAttributes()).join(" ");
  sb.push(`${attributes}`);
  sb.push(">");

  const shadowContents = instance.renderShadow({} as any);
  if (shadowContents !== undefined) {
    const shadow = Array.from(shadowContents).join(" ");
    sb.push('<template shadowroot="open">');
    sb.push(shadow);
    sb.push("</template>");
  }
  if (child) {
    sb.push(child);
  }

  sb.push(`</${tag}>`);
  return renderHtml(sb.join("\n"));
}

function getComponent(route: string) {
  for (const key of Array.from(components.keys())) {
    if (key === route) return components.get(key)!;
    const regMatch = route.match(fixRegex(key));
    if (regMatch !== null) return components.get(key)!;
  }
}

function fixRegex(route: string): RegExp {
  const variableRegex = "[a-zA-Z0-9_-]+";
  const nameWithParameters = route.replace(
    new RegExp(`:(${variableRegex})`),
    (match) => {
      const groupName = match.slice(1);
      return `(?<${groupName}>[a-zA-Z0-9_\\-.,:;+*^%$@!]+)`;
    }
  );
  return new RegExp(`^${nameWithParameters}$`);
}

function renderHtml(content: string, title = "") {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
  </html>
`;
}
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
