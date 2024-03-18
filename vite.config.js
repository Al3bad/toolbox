import { resolve } from "path";
import path from "path";
import fs from "fs";
import handlebars from "vite-plugin-handlebars";
import { defineConfig } from "vite";

function getHtmlEntryFiles(srcDir) {
  const entry = {};
  entry["main"] = resolve(__dirname, "index.html");

  function traverseDir(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        // If it's a directory, recursively traverse it
        traverseDir(filePath);
      } else if (path.extname(file) === ".html") {
        // If it's an HTML file, add it to the entry object
        const name = path.relative(srcDir, filePath).replace(/\..*$/, "");
        entry[name] = filePath;
      }
    });
  }

  traverseDir(srcDir);

  return entry;
}

export default defineConfig({
  base: "https://Al3bad.github.io/toolbox/",
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context: {
        repo: process.env.NODE_ENV === "production" ? "/toolbox" : "",
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: getHtmlEntryFiles("tools"),
    },
  },
});
