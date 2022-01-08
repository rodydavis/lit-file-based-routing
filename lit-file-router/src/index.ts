import * as fs from "fs";
import { analyzePage, WebComponent } from "./analyze-page.js";
import { generateApp } from "./generate-app.js";
import { StringBuilder } from "./string-builder.js";

let inputDir = "./src/pages";
let outputFile = "./src/generated-app.ts";
let staticImports = true;
let cacheAll = false;

const args = process.argv.slice(2);
if (args.length == 0) {
  analyzePages();
} else {
  // Check for -dynamic-imports=false
  const noDynamicImports = args.indexOf("--dynamic-imports=false") !== -1;
  staticImports = noDynamicImports;
  // Check for --input-dir=<dir>
  const inputDirArg = args.find((arg) => arg.startsWith("--input-dir="));
  if (inputDirArg) {
    inputDir = inputDirArg.replace("--input-dir=", "");
  }
  // Check for --output-file=<file>
  const outputFileArg = args.find((arg) => arg.startsWith("--output-file="));
  if (outputFileArg) {
    outputFile = outputFileArg.replace("--output-file=", "");
  }
  // Check for --cache-all
  const cacheAllArg = args.find((arg) => arg.startsWith("--cache-all"));
  if (cacheAllArg) {
    cacheAll = true;
  }
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
  const sb = new StringBuilder();
  // sb.writeln("// @ts-nocheck");
  // sb.writeln();
  let i = 0;
  if (staticImports) {
    sb.writeln(`// Page Routes`);
  }
  const components: WebComponent[] = [];
  const pages: { path: string; content: string }[] = [];
  readPagesDirectory(inputDir, pages);
  for (const { path, content } of pages) {
    // Add import
    const results = analyzePage(path, content);
    if (results.length > 0) {
      const c = results[0];
      if (staticImports) {
        const filePath = path.replace("./src/", "./");
        const jsPath = filePath.replace(".ts", ".js");
        sb.writeln(`import "${jsPath}";`);
        c.alias = `route${i}`;
        if(c.hasLoader) {
          sb.writeln(`import {loader as ${c.alias}Loader} from "${jsPath}";`);
        }
      }
      components.push(c);
    }
    i++;
  }
  sb.writeln();
  generateApp(sb, components, { staticImports, cacheAll });
  const output = sb.toString();
  fs.writeFileSync(outputFile, output);
}
