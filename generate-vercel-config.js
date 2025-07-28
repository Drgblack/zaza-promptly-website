// generate-vercel-config.js
const fs = require("fs");
const path = require("path");

const appsDir = path.join(__dirname, "apps");
const vercelConfigPath = path.join(__dirname, "vercel.json");

const folders = fs
  .readdirSync(appsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const projects = folders.map((folder) => ({
  name: folder,
  rootDirectory: `apps/${folder}`,
}));

const config = { projects };

fs.writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2));

console.log(`✅ vercel.json updated with ${projects.length} apps`);
