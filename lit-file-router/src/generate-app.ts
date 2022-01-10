import { WebComponent } from "./analyze-page";
import { StringBuilder } from "./string-builder";

export function generateApp(
  sb: StringBuilder,
  components: WebComponent[],
  options: { staticImports: boolean; cacheAll: boolean; showLoading: boolean }
) {
  sb.writeln(`import { customElement } from "lit/decorators.js";`);
  sb.writeln(
    `import { AppBase, Route } from "lit-file-router/src/app-base.js";`
  );
  sb.writeln();
  sb.writeAll([
    '@customElement("generated-app")',
    "export class GeneratedApp extends AppBase {",
    "",
  ]);
  sb.writeln("  override components: Map<string, Route> = new Map([");
  for (const component of components) {
    let path = component.path.replace("./src/pages/", "/");
    path = path.replace(".ts", "");
    path = path.replace(".js", "");
    path = path.replace("/index", "/");
    // Check if path contains . and convert to /
    if (path.indexOf(".") > -1) {
      path = path.split(".").join("/");
    }
    if (path == "/root") path = "";
    // sb.writeln(`   ["${path}", "${component.name}"],`);]
    sb.writeln(`   ["${path}", {
      component: "${component.name}",`);
    const componentImportPath = component.path
      .replace("./src/", "./")
      .replace(".ts", ".js");
    if (component.hasLoader) {
      if (options.staticImports) {
        sb.writeln(`      loadData: async () => {
        return ${component.alias}.loader;
      },`);
      } else {
        sb.writeln(`      loadData: async () => {
        const {loader} = await import("${componentImportPath}");
        return loader;
      },`);
      }
    } else {
      sb.writeln(`      loadData: async () => null,`);
    }
    if (options.staticImports) {
      sb.writeln(`      loadImport: async () => ${component.alias},
    }],`);
    } else {
      sb.writeln(`      loadImport: () => import("${componentImportPath}"),
    }],`);
    }
  }
  sb.writeln("  ]);");
  sb.writeln("}");
}
