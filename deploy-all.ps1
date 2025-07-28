$appsPath = ".\apps"
$apps = Get-ChildItem -Path $appsPath -Directory

foreach ($app in $apps) {
    $appName = $app.Name
    $appPath = Join-Path $appsPath $appName
    $packageJson = Join-Path $appPath 'package.json'

    if (-Not (Test-Path $packageJson)) {
        Write-Host "Skipping $appName (no package.json)" -ForegroundColor Yellow
        continue
    }

    Write-Host "`nInstalling dependencies for $appName ..." -ForegroundColor Gray
    try {
        pnpm install --dir $appPath
    } catch {
        Write-Host "Failed to install for $appName" -ForegroundColor Red
        continue
    }

    Write-Host "Deploying $appName ..." -ForegroundColor Cyan
    try {
        vercel --cwd $appPath --prod --yes
        Write-Host "Deployed $appName successfully." -ForegroundColor Green
    } catch {
        Write-Host ("Failed to deploy {0}: {1}" -f $appName, $_.Exception.Message) -ForegroundColor Red
    }
}
