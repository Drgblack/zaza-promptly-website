// link-create-deploy-all.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const configPath = path.join(__dirname, "vercel.json");
const tempConfigPath = path.join(__dirname, "vercel.monorepo.json");

// ✅ Rename vercel.json to avoid CLI deploy issues
if (fs.existsSync(configPath)) {
  fs.renameSync(configPath, tempConfigPath);
  console.log("🔧 Temporarily renamed vercel.json → vercel.monorepo.json");
}

const config = require("./vercel.monorepo.json"); // use the renamed one
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
  console.error("❌ VERCEL_TOKEN not set. Use: $env:VERCEL_TOKEN=\"5ax4mmZKKX2jQx1cAZ1HFiu2\"");
  process.exit(1);
}

config.projects.forEach(({ name, rootDirectory }) => {
  const fullPath = path.join(__dirname, rootDirectory);

  console.log(`\n🚀 Working on project: ${name} → ${rootDirectory}`);

  try {
    // Check if project exists
    const check = execSync(
      `curl -s -H "Authorization: Bearer ${VERCEL_TOKEN}" https://api.vercel.com/v9/projects/${name}`
    ).toString();

    if (check.includes("not_found")) {
      console.log(`🆕 Creating Vercel project: ${name}`);
      execSync(
        `curl -X POST "https://api.vercel.com/v9/projects" -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" -d '${JSON.stringify({
          name,
        })}'`,
        { stdio: "inherit" }
      );
    } else {
      console.log(`✅ Project ${name} already exists`);
    }

    // Link the local folder
    console.log(`🔗 Linking ${name}`);
    execSync(`vercel link --project ${name} --cwd "${fullPath}" --yes`, {
      stdio: "inherit",
    });

    // Deploy
    console.log(`🚀 Deploying ${name}`);
    execSync(`vercel deploy --prod --cwd "${fullPath}" --yes`, {
      stdio: "inherit",
    });

    console.log(`🎉 Done: ${name}\n`);
  } catch (err) {
    console.error(`❌ Error with ${name}`, err.message);
  }
});

// ✅ Restore original vercel.json
process.on("exit", () => {
  if (fs.existsSync(tempConfigPath)) {
    fs.renameSync(tempConfigPath, configPath);
    console.log("✅ Restored vercel.monorepo.json → vercel.json");
  }
});
