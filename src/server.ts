import "@lit-labs/ssr/lib/install-global-dom-shim.js";
window.global = window;
document.getElementsByTagName = () => [] as any;

import express from "express";
import { html } from "lit";
import { render } from "@lit-labs/ssr/lib/render-with-global-dom-shim.js";

const app = express();
const port = 3000;

app.use("/test/:page/multiple/:args", (req, res) => {
  const args = Object(req.params);
  const template = html`<root-module>
    <test-module page="${args["page"]}" args="${args["args"]}"> </test-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>test-module</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/test.:page.multiple.:args.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/settings/admin", (_req, res) => {
  const template = html`<root-module>
    <settings-module>
      <settings-default>
        <admin-settings> </admin-settings>
      </settings-default>
    </settings-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>admin-settings</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/settings/admin.js";
import "./pages/settings/index.js";
import "./pages/settings.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/settings/", (_req, res) => {
  const template = html`<root-module>
    <settings-module>
      <settings-default> </settings-default>
    </settings-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>settings-default</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/settings/index.js";
import "./pages/settings.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/settings", (_req, res) => {
  const template = html`<root-module>
    <settings-module> </settings-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>settings-module</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/settings.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/dashboard/overview", (_req, res) => {
  const template = html`<root-module>
    <dashboard-module>
      <dashboard-default>
        <overview-module> </overview-module>
      </dashboard-default>
    </dashboard-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>overview-module</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/dashboard/overview.js";
import "./pages/dashboard/index.js";
import "./pages/dashboard.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/dashboard/account/:id", (req, res) => {
  const args = Object(req.params);
  const template = html`<root-module>
    <dashboard-module>
      <dashboard-default>
        <account-module>
          <account-info>
            <account-details id="${args["id"]}"> </account-details>
          </account-info>
        </account-module>
      </dashboard-default>
    </dashboard-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>account-details</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/dashboard/account/:id.js";
import "./pages/dashboard/account/index.js";
import "./pages/dashboard/account.js";
import "./pages/dashboard/index.js";
import "./pages/dashboard.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/dashboard/account/", (_req, res) => {
  const template = html`<root-module>
    <dashboard-module>
      <dashboard-default>
        <account-module>
          <account-info> </account-info>
        </account-module>
      </dashboard-default>
    </dashboard-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>account-info</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/dashboard/account/index.js";
import "./pages/dashboard/account.js";
import "./pages/dashboard/index.js";
import "./pages/dashboard.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/dashboard/account", (_req, res) => {
  const template = html`<root-module>
    <dashboard-module>
      <dashboard-default>
        <account-module> </account-module>
      </dashboard-default>
    </dashboard-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>account-module</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/dashboard/account.js";
import "./pages/dashboard/index.js";
import "./pages/dashboard.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/dashboard/", (_req, res) => {
  const template = html`<root-module>
    <dashboard-module>
      <dashboard-default> </dashboard-default>
    </dashboard-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>dashboard-default</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/dashboard/index.js";
import "./pages/dashboard.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/dashboard", (_req, res) => {
  const template = html`<root-module>
    <dashboard-module> </dashboard-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>dashboard-module</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/dashboard.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/custom/not/nested/route", (_req, res) => {
  const template = html`<root-module>
    <custom-route> </custom-route>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>custom-route</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/custom.not.nested.route.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/404", (_req, res) => {
  const template = html`<root-module>
    <unknown-route> </unknown-route>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>unknown-route</title>
     </head>
     <body>
       ${code}
       <script type="module">
          import "./pages/404.js";

       </script>
     </body>
   </html>
   `);
});
app.use("/", (_req, res) => {
  const template = html`<root-module>
    <app-module> </app-module>
  </root-module>`;
  const ssrResult = render(template);
  const code = Array.from(ssrResult).join("");
  res.send(`
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset='utf-8' />
       <title>app-module</title>
     </head>
     <body>
       ${code}
     </body>
   </html>
   `);
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
