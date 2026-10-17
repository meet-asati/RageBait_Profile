// Copies the static site into ./build for deployment (e.g. Render Static Site).
const fs = require("fs");
const path = require("path");

const root = __dirname;
const outDir = path.join(root, "build");
const extensions = [".html", ".css", ".js", ".jpeg", ".jpg", ".png", ".gif", ".svg", ".mp4", ".webm", ".ico"];
const exclude = ["build.js"];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

const files = fs.readdirSync(root).filter((name) => {
  const full = path.join(root, name);
  return fs.statSync(full).isFile() &&
    extensions.includes(path.extname(name).toLowerCase()) &&
    !exclude.includes(name);
});

for (const name of files) {
  fs.copyFileSync(path.join(root, name), path.join(outDir, name));
}

console.log(`Copied ${files.length} files to build/`);
