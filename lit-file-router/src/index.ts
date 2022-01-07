import * as fs from "fs";
import { analyzePage, WebComponent } from "./analyze-page.js";
import { generateApp } from "./generate-app.js";
import { StringBuilder } from "./string-builder.js";

const inputDir = "./src/pages";
const outputFile = "./src/generated-app.ts";

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
  sb.writeln(`// Page Routes`);
  const components: WebComponent[] = [];
  const pages: { path: string; content: string }[] = [];
  readPagesDirectory(inputDir, pages);
  for (const { path, content } of pages) {
    // Add import
    const filePath = path.replace("./src/", "./");
    const jsPath = filePath.replace(".ts", ".js");
    const results = analyzePage(path, content);
    if (results.length > 0) {
      sb.writeln(`import "${jsPath}";`);
      const c = results[0];
      c.alias = `route${i}`;
      components.push(c);
    }
    i++;
  }
  sb.writeln();
  generateApp(sb, components);
  const output = sb.toString();
  fs.writeFileSync(outputFile, output);
}

analyzePages();
