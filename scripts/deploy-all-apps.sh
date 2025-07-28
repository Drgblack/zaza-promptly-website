#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment of all Zaza apps..."

# List of app directories in /apps
for app in apps/*; do
  if [ -d "$app" ]; then
    app_name=$(basename "$app")
    echo "📦 Deploying: $app_name"

    # Run deployment for each app using Vercel CLI
    vercel --cwd "$app" --prod --confirm --name "zaza-$app_name"

    echo "✅ Done: $app_name"
  fi
done

echo "🎉 All apps deployed!"
