# Zaza Repository Cleanup Script - Simplified Version
# This script will archive duplicate repositories and rename core ones

# Configuration
$GITHUB_USERNAME = "Drgblack"
$ORGANIZATION = "DigBlack"

Write-Host "Starting Zaza Repository Cleanup..." -ForegroundColor Green
Write-Host "Organization: $ORGANIZATION" -ForegroundColor Cyan

# Step 1: Archive duplicate repositories with suffixes
Write-Host "\nStep 1: Archiving duplicate repositories..." -ForegroundColor Magenta

$suffixes = @("6g", "p7", "nl", "65", "zb", "ca", "bj", "rg", "yz", "kn", "ey", "6n", "qa", "7e", "pi", "6m", "ne", "yx", "rj", "fo")

$reposToArchive = @()

foreach ($suffix in $suffixes) {
    $reposToArchive += "zaza-technologies-site-$suffix"
    $reposToArchive += "zaza-inbox-site-$suffix"
    $reposToArchive += "zaza-schwoop-site-$suffix"
    $reposToArchive += "zaza-claritydeck-site-$suffix"
}

$archivedCount = 0
foreach ($repo in $reposToArchive) {
    Write-Host "Checking: $repo" -ForegroundColor Gray
    
    # Check if repository exists
    $repoExists = gh repo view "$ORGANIZATION/$repo" 2>$null
    if ($repoExists) {
        Write-Host "Archiving: $repo" -ForegroundColor Yellow
        gh repo edit "$ORGANIZATION/$repo" --archived
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Archived: $repo" -ForegroundColor Green
            $archivedCount++
        } else {
            Write-Host "Failed to archive: $repo" -ForegroundColor Red
        }
    }
}

Write-Host "\nArchived $archivedCount duplicate repositories" -ForegroundColor Green

# Step 2: Rename core repositories
Write-Host "\nStep 2: Renaming core repositories..." -ForegroundColor Magenta

$renameMappings = @{
    "zaza-teach" = "zaza-teach-site"
    "zaza-homepage" = "zaza-technologies-site"
}

$renamedCount = 0
foreach ($mapping in $renameMappings.GetEnumerator()) {
    $oldName = $mapping.Key
    $newName = $mapping.Value
    
    Write-Host "Checking rename: $oldName -> $newName" -ForegroundColor Gray
    
    # Check if old repository exists
    $oldExists = gh repo view "$ORGANIZATION/$oldName" 2>$null
    $newExists = gh repo view "$ORGANIZATION/$newName" 2>$null
    
    if ($oldExists -and -not $newExists) {
        Write-Host "Renaming: $oldName -> $newName" -ForegroundColor Cyan
        gh repo rename "$ORGANIZATION/$newName" --repo "$ORGANIZATION/$oldName"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Renamed: $oldName -> $newName" -ForegroundColor Green
            $renamedCount++
        } else {
            Write-Host "Failed to rename: $oldName -> $newName" -ForegroundColor Red
        }
    } elseif ($oldExists -and $newExists) {
        Write-Host "Both $oldName and $newName exist. Manual intervention needed." -ForegroundColor Yellow
    } elseif (-not $oldExists -and $newExists) {
        Write-Host "$newName already exists with correct name." -ForegroundColor Green
    } else {
        Write-Host "$oldName does not exist. Skipping rename." -ForegroundColor Yellow
    }
}

Write-Host "\nRenamed $renamedCount repositories" -ForegroundColor Green

# Step 3: Update descriptions for core repositories
Write-Host "\nStep 3: Updating repository descriptions..." -ForegroundColor Magenta

$coreRepos = @{
    "zaza-technologies-site" = "Zaza Technologies - Main company website and landing page"
    "zaza-promptly-site" = "Zaza Promptly - AI-powered student comments for teachers"
    "zaza-teach-site" = "Zaza Teach - AI-powered lesson planning tool for teachers"
    "zaza-inbox-site" = "Zaza Inbox - Smart email management for educators"
    "zaza-schwoop-site" = "Zaza Schwoop - Student engagement and gamification platform"
    "zaza-claritydeck-site" = "Zaza ClarityDeck - Presentation and content creation tool"
    "zaza-visuals-site" = "Zaza Visuals - Creative design and visual content platform"
    "zaza-study-site" = "Zaza Study - Learning management and study tools"
}

$updatedCount = 0
foreach ($repo in $coreRepos.GetEnumerator()) {
    $repoName = $repo.Key
    $description = $repo.Value
    
    Write-Host "Checking description for: $repoName" -ForegroundColor Gray
    
    $repoExists = gh repo view "$ORGANIZATION/$repoName" 2>$null
    if ($repoExists) {
        Write-Host "Updating description for: $repoName" -ForegroundColor Blue
        gh repo edit "$ORGANIZATION/$repoName" --description $description
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Updated description for: $repoName" -ForegroundColor Green
            $updatedCount++
        } else {
            Write-Host "Failed to update description for: $repoName" -ForegroundColor Red
        }
    }
}

Write-Host "\nUpdated descriptions for $updatedCount repositories" -ForegroundColor Green

# Summary
Write-Host "\nRepository cleanup completed!" -ForegroundColor Green
Write-Host "\nSummary:" -ForegroundColor Magenta
Write-Host "- Archived $archivedCount duplicate repositories" -ForegroundColor White
Write-Host "- Renamed $renamedCount repositories" -ForegroundColor White
Write-Host "- Updated descriptions for $updatedCount repositories" -ForegroundColor White

Write-Host "\nNext Steps:" -ForegroundColor Magenta
Write-Host "1. Review the cleaned repositories on GitHub" -ForegroundColor White
Write-Host "2. Update Vercel project settings" -ForegroundColor White
Write-Host "3. Delete old v0-* Vercel deployments" -ForegroundColor White
Write-Host "4. Update any external links" -ForegroundColor White 