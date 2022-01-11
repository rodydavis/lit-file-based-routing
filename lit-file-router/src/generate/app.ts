import { WebComponent } from "../analyze-page.js";
import { StringBuilder } from "../string-builder.js";

export function generateApp(
  components: WebComponent[],
  options: { staticImports: boolean; cacheAll: boolean; showLoading: boolean }
) {
  const sb = new StringBuilder();
  sb.writeln(`import { customElement } from "lit/decorators.js";`);
  sb.writeln(
    `import { AppBase, Route } from "lit-file-router/src/app-base.js";`
  );
  sb.writeln();
  if (options.staticImports) {
    for (const c of components) {
      sb.writeln(`import * as ${c.alias} from "${c.relativePath}";`);
    }
  }
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
    if (component.hasLoader) {
      if (options.staticImports) {
        sb.writeln(`      loadData: async () => {
        return ${component.alias}.loader;
      },`);
      } else {
        sb.writeln(`      loadData: async () => {
        const {loader} = await import("${component.relativePath}");
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
      sb.writeln(`      loadImport: () => import("${component.relativePath}"),
    }],`);
    }
  }
  sb.writeln("  ]);");
  sb.writeln("}");
  return sb.toString();
}
