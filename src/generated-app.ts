import { customElement } from "lit/decorators.js";
import { AppBase, Route } from "lit-file-router/src/app-base.js";


@customElement("generated-app")
export class GeneratedApp extends AppBase {

  override components: Map<string, Route> = new Map([
   ["/test/:page/multiple/:args", {
      component: "test-module",
      loadData: async () => null,
      loadImport: () => import("./pages/test.:page.multiple.:args.js"),
    }],
   ["/settings/admin", {
      component: "admin-settings",
      loadData: async () => null,
      loadImport: () => import("./pages/settings/admin.js"),
    }],
   ["/settings/", {
      component: "settings-default",
      loadData: async () => null,
      loadImport: () => import("./pages/settings/index.js"),
    }],
   ["/settings", {
      component: "settings-module",
      loadData: async () => null,
      loadImport: () => import("./pages/settings.js"),
    }],
   ["/dashboard/overview", {
      component: "overview-module",
      loadData: async () => null,
      loadImport: () => import("./pages/dashboard/overview.js"),
    }],
   ["/dashboard/account/:id", {
      component: "account-details",
      loadData: async () => {
        const {loader} = await import("./pages/dashboard/account/:id.js");
        return loader;
      },
      loadImport: () => import("./pages/dashboard/account/:id.js"),
    }],
   ["/dashboard/account/", {
      component: "account-info",
      loadData: async () => null,
      loadImport: () => import("./pages/dashboard/account/index.js"),
    }],
   ["/dashboard/account", {
      component: "account-module",
      loadData: async () => null,
      loadImport: () => import("./pages/dashboard/account.js"),
    }],
   ["/dashboard/", {
      component: "dashboard-default",
      loadData: async () => null,
      loadImport: () => import("./pages/dashboard/index.js"),
    }],
   ["/dashboard", {
      component: "dashboard-module",
      loadData: async () => null,
      loadImport: () => import("./pages/dashboard.js"),
    }],
   ["/custom/not/nested/route", {
      component: "custom-route",
      loadData: async () => null,
      loadImport: () => import("./pages/custom.not.nested.route.js"),
    }],
   ["/404", {
      component: "unknown-route",
      loadData: async () => null,
      loadImport: () => import("./pages/404.js"),
    }],
   ["/", {
      component: "app-module",
      loadData: async () => null,
      loadImport: () => import("./pages/index.js"),
    }],
   ["", {
      component: "root-module",
      loadData: async () => null,
      loadImport: () => import("./pages/root.js"),
    }],
  ]);
}
