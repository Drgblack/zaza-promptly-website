# scripts/generate-vercel-configs.ps1

$appsPath = "apps"
$config = '{
  "buildCommand": "pnpm install && pnpm run build",
  "outputDirectory": "out"
}'

Get-ChildItem $appsPath -Directory | ForEach-Object {
    $vercelFilePath = "$($_.FullName)\vercel.json"

    if (-Not (Test-Path $vercelFilePath)) {
        Write-Host "🛠️ Creating vercel.json in $($_.Name)..."
        $config | Out-File -FilePath $vercelFilePath -Encoding UTF8
    } else {
        Write-Host "✅ vercel.json already exists in $($_.Name), skipping..."
    }
}

Write-Host "`n✅ All app folders processed."
