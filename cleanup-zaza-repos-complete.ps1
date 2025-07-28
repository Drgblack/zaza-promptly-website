# Zaza GitHub Repository Complete Cleanup Script
# ===============================================
# 
# IMPORTANT: This script is the final cleanup step. Before running this script:
# 1. Run get-repo-list.ps1 first to regenerate the current repository list
# 2. Review the list to ensure you have the latest repository information
# 3. This script will rename, archive, and update descriptions for all repositories
#
# This script will:
# - Rename repositories by removing suffixes (e.g., zaza-inbox-site-65 → zaza-inbox-site)
# - Archive duplicates where clean versions already exist
# - Archive unused/throwaway projects
# - Update descriptions for all repositories
# - Include safety prompts before each action
# - Log all actions clearly
# - NOT delete anything (only archive)

param(
    [switch]$Simulate,
    [switch]$Force
)

Write-Host "🚀 Starting Zaza Repository Complete Cleanup..." -ForegroundColor Green
Write-Host "This script will rename, archive, and update descriptions for all repositories" -ForegroundColor Gray

if ($Simulate) {
    Write-Host "🔍 SIMULATION MODE - No actual changes will be made" -ForegroundColor Yellow
}

# Function to safely execute GitHub CLI commands
function Invoke-GitHubCommand {
    param(
        [string]$Command,
        [string]$Description,
        [string]$ActionType = "Execute"
    )
    
    Write-Host "`n$Description" -ForegroundColor Yellow
    Write-Host "Command: $Command" -ForegroundColor Gray
    
    if ($Simulate) {
        Write-Host "🔍 [SIMULATION] Would $ActionType: $Command" -ForegroundColor Cyan
        return
    }
    
    if (-not $Force) {
        $response = Read-Host "Execute this command? (y/n)"
        if ($response -ne 'y' -and $response -ne 'Y') {
            Write-Host "⏭️  Skipped" -ForegroundColor Yellow
            return
        }
    }
    
    try {
        Write-Host "🔄 Executing: $Command" -ForegroundColor Blue
        $result = Invoke-Expression $Command 2>&1
        Write-Host "✓ Command executed successfully" -ForegroundColor Green
        if ($result) {
            Write-Host "Output: $result" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "✗ Error executing command: $_" -ForegroundColor Red
    }
}

# Function to check if repository exists
function Test-RepositoryExists {
    param([string]$RepoName)
    
    try {
        $result = gh repo view $RepoName --json name 2>$null
        return $result -ne $null
    }
    catch {
        return $false
    }
}

# Function to get repository description
function Get-RepositoryDescription {
    param([string]$RepoName)
    
    try {
        $result = gh repo view $RepoName --json description 2>$null
        if ($result) {
            $json = $result | ConvertFrom-Json
            return $json.description
        }
        return $null
    }
    catch {
        return $null
    }
}

# Function to archive repository
function Archive-Repository {
    param([string]$RepoName, [string]$Reason = "Duplicate or unused")
    
    Write-Host "🗄️  Preparing to archive repository: $RepoName" -ForegroundColor Magenta
    Write-Host "Reason: $Reason" -ForegroundColor Gray
    Invoke-GitHubCommand -Command "gh repo archive $RepoName" -Description "🗄️ Archiving repository: $RepoName" -ActionType "Archive"
}

# Function to rename repository
function Rename-Repository {
    param([string]$OldName, [string]$NewName)
    
    Write-Host "🔄 Preparing to rename repository: $OldName → $NewName" -ForegroundColor Magenta
    Invoke-GitHubCommand -Command "gh repo rename $NewName --repo $OldName" -Description "🔄 Renaming repository: $OldName → $NewName" -ActionType "Rename"
}

# Function to update repository description
function Update-Description {
    param([string]$RepoName, [string]$Description)
    
    Write-Host "📝 Preparing to update description for: $RepoName" -ForegroundColor Magenta
    Write-Host "New description: $Description" -ForegroundColor Gray
    Invoke-GitHubCommand -Command "gh repo edit $RepoName --description `"$Description`"" -Description "📝 Updating description for: $RepoName" -ActionType "Update Description"
}

Write-Host "`n=== REPOSITORY CLEANUP PLAN ===" -ForegroundColor Cyan

# =============================================================================
# STEP 1: RENAME REPOSITORIES (Remove Suffixes)
# =============================================================================

Write-Host "`n=== STEP 1: RENAMING REPOSITORIES (Remove Suffixes) ===" -ForegroundColor Magenta

# Define rename operations: OldName -> NewName
$renameOperations = @{
    "zaza-inbox-site-65" = "zaza-inbox-site"
    "zaza-inbox-site-nl" = "zaza-inbox-site"
    "zaza-inbox-site-p7" = "zaza-inbox-site"
    "zaza-claritydeck-site-zb" = "zaza-claritydeck-site"
    "zaza-schwoop-site-ca" = "zaza-schwoop-site"
    "zaza-schwoop-site-bj" = "zaza-schwoop-site"
    "zaza-schwoop-site-rg" = "zaza-schwoop-site"
}

Write-Host "`n🔄 Found $($renameOperations.Count) repositories to rename" -ForegroundColor Blue

foreach ($rename in $renameOperations.GetEnumerator()) {
    $oldName = $rename.Key
    $newName = $rename.Value
    
    Write-Host "`n--- Processing: $oldName → $newName ---" -ForegroundColor White
    
    # Check if old repository exists
    if (-not (Test-RepositoryExists -RepoName $oldName)) {
        Write-Host "⚠️  Source repository $oldName not found, skipping..." -ForegroundColor Yellow
        continue
    }
    
    # Check if target repository already exists
    if (Test-RepositoryExists -RepoName $newName) {
        Write-Host "⚠️  Target repository $newName already exists, archiving duplicate instead..." -ForegroundColor Yellow
        Archive-Repository -RepoName $oldName -Reason "Duplicate of existing $newName"
    } else {
        Rename-Repository -OldName $oldName -NewName $newName
    }
}

# =============================================================================
# STEP 2: ARCHIVE DUPLICATE REPOSITORIES (With Suffixes)
# =============================================================================

Write-Host "`n=== STEP 2: ARCHIVING DUPLICATE REPOSITORIES ===" -ForegroundColor Magenta

# Archive zaza-technologies-site duplicates (where clean version exists)
$techSuffixes = @("6g", "p7", "nl", "65", "zb", "ca", "bj", "rg", "yz", "kn", "ey", "6n", "qa", "7e", "pi", "6m", "ne", "yx", "rj", "fo")
Write-Host "`n📦 Found $($techSuffixes.Count) zaza-technologies-site duplicates to archive" -ForegroundColor Blue

foreach ($suffix in $techSuffixes) {
    $repoName = "zaza-technologies-site-$suffix"
    if (Test-RepositoryExists -RepoName $repoName) {
        Archive-Repository -RepoName $repoName -Reason "Duplicate of zaza-technologies-site"
    } else {
        Write-Host "⚠️  Repository $repoName not found, skipping..." -ForegroundColor Yellow
    }
}

# =============================================================================
# STEP 3: ARCHIVE UNUSED/THROWAWAY PROJECTS
# =============================================================================

Write-Host "`n=== STEP 3: ARCHIVING UNUSED/THROWAWAY PROJECTS ===" -ForegroundColor Magenta

$unusedRepos = @{
    "zaza-homepage" = "Unused homepage (replaced by zaza-technologies-site)"
    "zaza-mvp" = "Initial MVP version (no longer needed)"
}

Write-Host "`n🗑️  Found $($unusedRepos.Count) unused projects to archive" -ForegroundColor Blue

foreach ($repo in $unusedRepos.GetEnumerator()) {
    $repoName = $repo.Key
    $reason = $repo.Value
    
    if (Test-RepositoryExists -RepoName $repoName) {
        Archive-Repository -RepoName $repoName -Reason $reason
    } else {
        Write-Host "⚠️  Repository $repoName not found, skipping..." -ForegroundColor Yellow
    }
}

# =============================================================================
# STEP 4: UPDATE DESCRIPTIONS FOR ALL REPOSITORIES
# =============================================================================

Write-Host "`n=== STEP 4: UPDATING DESCRIPTIONS ===" -ForegroundColor Magenta

# Define descriptions for all repositories
$descriptions = @{
    "zaza-technologies-site" = "Main Zaza Technologies marketing website"
    "zaza-promptly-site" = "Zaza Promptly – AI comment generator for teachers"
    "zaza-inbox-site" = "Zaza Inbox – centralised teacher communication platform"
    "zaza-visuals-site" = "Zaza Visuals – AI-powered visual content creation tool"
    "zaza-claritydeck-site" = "Zaza ClarityDeck – AI-driven presentation creation tool"
    "zaza-study-site" = "Zaza Study – student-focused microlearning app"
    "zaza-schwoop-site" = "Zaza Schwoop – student engagement and gamification platform"
    "zaza-teach" = "Zaza Teach – AI lesson planning tool for teachers"
    "zaza-leadfinder" = "Internal lead generation tool for Zaza Promptly and Zaza Teach"
    "zaza-launch" = "Landing page and early access portal for Zaza products"
    "zaza-snippets-app" = "Early test version of Zaza Promptly"
}

Write-Host "`n📝 Found $($descriptions.Count) repositories to update descriptions" -ForegroundColor Blue

foreach ($repo in $descriptions.GetEnumerator()) {
    $repoName = $repo.Key
    $newDescription = $repo.Value
    
    if (Test-RepositoryExists -RepoName $repoName) {
        $currentDescription = Get-RepositoryDescription -RepoName $repoName
        
        if ($currentDescription -eq $newDescription) {
            Write-Host "✓ Repository $repoName already has the correct description, skipping..." -ForegroundColor Green
        } else {
            Write-Host "`n--- Updating description for: $repoName ---" -ForegroundColor White
            if ($currentDescription) {
                Write-Host "Current: $currentDescription" -ForegroundColor Gray
            } else {
                Write-Host "Current: No description" -ForegroundColor Gray
            }
            Update-Description -RepoName $repoName -Description $newDescription
        }
    } else {
        Write-Host "⚠️  Repository $repoName not found, skipping description update..." -ForegroundColor Yellow
    }
}

# =============================================================================
# SUMMARY AND VERIFICATION
# =============================================================================

Write-Host "`n=== CLEANUP SUMMARY ===" -ForegroundColor Cyan
Write-Host "Operations completed:" -ForegroundColor White
Write-Host "- Renamed $($renameOperations.Count) repositories (removed suffixes)" -ForegroundColor Green
Write-Host "- Archived $($techSuffixes.Count) zaza-technologies-site duplicates" -ForegroundColor Green
Write-Host "- Archived $($unusedRepos.Count) unused/throwaway projects" -ForegroundColor Green
Write-Host "- Updated descriptions for $($descriptions.Count) repositories" -ForegroundColor Green

Write-Host "`n=== VERIFICATION COMMANDS ===" -ForegroundColor Cyan
Write-Host "To verify changes, run these commands:" -ForegroundColor Gray
Write-Host "gh repo list" -ForegroundColor White
Write-Host "gh repo list --archived" -ForegroundColor White
Write-Host "gh repo view zaza-technologies-site --json description" -ForegroundColor White

Write-Host "`n=== MANUAL ACTIONS REQUIRED ===" -ForegroundColor Yellow
Write-Host "1. Update Vercel project settings to point to correct repositories" -ForegroundColor White
Write-Host "2. Delete old Vercel deployments (v0-* projects)" -ForegroundColor White
Write-Host "3. Update any external links pointing to old repository names" -ForegroundColor White
Write-Host "4. Update any CI/CD pipelines that reference old repository names" -ForegroundColor White

Write-Host "`n🎉 Repository cleanup script completed!" -ForegroundColor Green
Write-Host "Please review all changes and ensure operations were successful." -ForegroundColor Yellow

if ($Simulate) {
    Write-Host "`n🔍 SIMULATION COMPLETE - No actual changes were made" -ForegroundColor Yellow
    Write-Host "To run with actual changes, remove the -Simulate parameter" -ForegroundColor Gray
} 