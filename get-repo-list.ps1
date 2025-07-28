# Script to get GitHub repository list and generate cleanup script
# Run this first to get your repository list

Write-Host "Getting GitHub repository list..." -ForegroundColor Green

# Check if GitHub CLI is installed
try {
    $ghVersion = gh --version
    Write-Host "GitHub CLI found: $ghVersion" -ForegroundColor Green
} catch {
    Write-Host "GitHub CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Check if authenticated
try {
    $authStatus = gh auth status
    Write-Host "GitHub authentication status:" -ForegroundColor Green
    Write-Host $authStatus -ForegroundColor Gray
} catch {
    Write-Host "Please authenticate with GitHub CLI first:" -ForegroundColor Red
    Write-Host "gh auth login" -ForegroundColor Yellow
    exit 1
}

# Get repository list
Write-Host "`nFetching repository list..." -ForegroundColor Yellow
$repos = gh repo list --json name,description,isArchived,url --limit 100

if ($LASTEXITCODE -eq 0) {
    Write-Host "Repository list retrieved successfully!" -ForegroundColor Green
    
    # Save to file
    $repos | Out-File -FilePath "repositories.json" -Encoding UTF8
    Write-Host "Repository list saved to 'repositories.json'" -ForegroundColor Green
    
    # Display repositories
    Write-Host "`nFound repositories:" -ForegroundColor Cyan
    $reposObj = $repos | ConvertFrom-Json
    $reposObj | ForEach-Object {
        $status = if ($_.isArchived) { "(ARCHIVED)" } else { "" }
        Write-Host "- $($_.name) $status" -ForegroundColor White
        if ($_.description) {
            Write-Host "  Description: $($_.description)" -ForegroundColor Gray
        }
    }
    
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Review the repositories.json file" -ForegroundColor White
    Write-Host "2. Run the cleanup script with your specific repository names" -ForegroundColor White
    Write-Host "3. Update the cleanup script with your actual repository mappings" -ForegroundColor White
    
} else {
    Write-Host "Failed to retrieve repository list" -ForegroundColor Red
    exit 1
} 