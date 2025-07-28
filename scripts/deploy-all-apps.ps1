# scripts/deploy-all-apps.ps1

Write-Host "=== Starting deployment of all Zaza apps ===`n"

# List of app folder names inside /apps
$apps = @(
  "promptly",
  "teach",
  "zaza-about-page",
  "zaza-blog-post",
  "zaza-comparison-page",
  "zaza-contact-page",
  "zaza-faq",
  "zaza-features-page",
  "zaza-pricing",
  "zaza-promptly-support-1",
  "zaza-visuals-landing-1",
  "claritydeck-landing"
)

foreach ($app in $apps) {
    $appPath = "apps\$app"
    if (Test-Path $appPath) {
        Write-Host "`n>>> Deploying $app..."
        Push-Location $appPath

        # Ensure node_modules are installed
        pnpm install

        # Run vercel deploy (assumes login and project config are already set)
        vercel --prod --yes

        Pop-Location
    } else {
        Write-Host "`n⚠️ App folder '$appPath' not found. Skipping..."
    }
}

Write-Host "`n✅ Deployment complete for all apps!"
