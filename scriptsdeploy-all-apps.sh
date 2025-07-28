#!/bin/bash

# Ensure you're in the root directory of the repo
cd "$(dirname "$0")"/..

echo "Starting bulk deployment of Zaza apps..."

# Loop through all app folders inside apps/
for app_path in apps/*; do
  if [ -d "$app_path" ]; then
    app_name=$(basename "$app_path")
    echo ""
    echo "🚀 Deploying $app_name to Vercel..."

    cd "$app_path"

    # Each app should have its own vercel.json in place
    vercel --prod --confirm || {
      echo "❌ Deployment failed for $app_name"
      cd ../..
      continue
    }

    echo "✅ Deployment complete for $app_name"
    cd ../..
  fi
done

echo ""
echo "🎉 All apps processed."
