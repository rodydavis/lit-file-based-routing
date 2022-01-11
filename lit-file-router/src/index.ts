import * as fs from "fs";
import { analyzePage, WebComponent } from "./analyze-page.js";
import { generateApp } from "./generate/app.js";
import { exportExpress } from "./generate/express.js";
import { generateJson } from "./generate/json.js";

const args = process.argv.slice(2);

let inputDir = "./src/pages";
const overrides: Overrides = {
  staticImports: false,
  cacheAll: false,
  showLoading: false,
};

let jsonFile = "./web-components.json";
let jsonOutput = args.includes("--json");

let appFile = "./src/generated-app.ts";
let appOutput = args.includes("--app");

let expressFile = "./src/server.ts";
let expressOutput = args.includes("--express");

if (args.length == 0) {
  analyzePages();
} else {
  // Check for -dynamic-imports=false
  const noDynamicImports = args.indexOf("--dynamic-imports=false") !== -1;
  overrides.staticImports = noDynamicImports;
  // Check for --input-dir=<dir>
  const inputDirArg = args.find((arg) => arg.startsWith("--input-dir="));
  if (inputDirArg) {
    inputDir = inputDirArg.replace("--input-dir=", "");
  }
  // Check for --output-json=<file>
  const jsonFileArg = args.find((arg) => arg.startsWith("--output-json="));
  if (jsonFileArg) {
    jsonFile = jsonFileArg.replace("--output-json=", "");
    jsonOutput = true;
  }
  // Check for --output-file=<file>
  const outputFileArg = args.find((arg) => arg.startsWith("--output-file="));
  if (outputFileArg) {
    appFile = outputFileArg.replace("--output-file=", "");
    appOutput = true;
  }
  // Check for --output-express=<file>
  const expressFileArg = args.find((arg) =>
    arg.startsWith("--output-express=")
  );
  if (expressFileArg) {
    expressFile = expressFileArg.replace("--output-express=", "");
    expressOutput = true;
  }
  // Check for --cache-all
  const cacheAllArg = args.find((arg) => arg.startsWith("--cache-all"));
  if (cacheAllArg) {
    overrides.cacheAll = true;
  }

  // Check for --show-loading=false
  const showLoadingArg = args.find((arg) =>
    arg.startsWith("--show-loading=true")
  );
  overrides.showLoading = showLoadingArg ? true : false;
  analyzePages();
}

function readPagesDirectory(
  dir: string,
  pages: { path: string; content: string }[]
) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (fs.statSync(`${dir}/${file}`).isDirectory()) {
      readPagesDirectory(`${dir}/${file}`, pages);
    } else {
      const path = `${dir}/${file}`;
      const content = fs.readFileSync(path, "utf8");
      pages.push({ path, content });
    }
  }
}

async function analyzePages() {
  let i = 0;
  const components: WebComponent[] = [];
  const pages: { path: string; content: string }[] = [];
  readPagesDirectory(inputDir, pages);
  for (const { path, content } of pages) {
    const results = analyzePage(path, content);
    if (results.length > 0) {
      const c = results[0];
      const filePath = path.replace("./src/", "./");
      const jsPath = filePath.replace(".ts", ".js");
      c.alias = `route${i}`;
      c.relativePath = jsPath;
      components.push(c);
    }
    i++;
  }

  for (const component of components) {
    const route = `${component.route}`;
    if (route === "") continue;
    let parentRoute: string | undefined;
    if (route.endsWith("/")) {
      parentRoute = route.slice(0, -1);
    } else {
      const implicitRoute = route + "/";
      const indexComponent = components.find((c) => c.route === implicitRoute);
      component.implicitIndex = indexComponent !== undefined;

      parentRoute = route.split("/").slice(0, -1).join("/");
      parentRoute += "/";
    }
    const hasParentRoute = components.find((c) => c.route === parentRoute);
    if (hasParentRoute !== undefined && parentRoute !== "/") {
      component.parentRoute = parentRoute;
    } else if (parentRoute === "/") {
      const rootComponent = components.find((c) => c.route === "");
      if (rootComponent) {
        component.parentRoute = "";
      }
    }
  }

  if (appOutput) {
    const output = generateApp(components, overrides);
    fs.writeFileSync(appFile, output);
  }

  if (jsonOutput) {
    // Write json file
    const json = generateJson(components);
    fs.writeFileSync(jsonFile, json);
  }

  if (expressOutput) {
    const output = exportExpress(components);
    fs.writeFileSync(expressFile, output);
  }
}

interface Overrides {
  staticImports: boolean;
  cacheAll: boolean;
  showLoading: boolean;
}
