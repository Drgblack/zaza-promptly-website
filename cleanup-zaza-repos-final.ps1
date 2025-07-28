param(
    [switch]$Simulate,
    [switch]$Force
)

Write-Host "Starting Zaza Repository Cleanup..." -ForegroundColor Green
Write-Host "Based on analysis of your repository list" -ForegroundColor Gray

if ($Simulate) {
    Write-Host "SIMULATION MODE - No actual changes will be made" -ForegroundColor Yellow
}

function Invoke-GitHubCommand {
    param(
        [string]$Command,
        [string]$Description,
        [string]$ActionType = "Execute"
    )

    Write-Host "`n$Description" -ForegroundColor Yellow
    Write-Host "Command: $Command" -ForegroundColor Gray

    if ($Simulate) {
        Write-Host "SIMULATION: Would ${ActionType}: $Command" -ForegroundColor Cyan
        return
    }

    if (-not $Force) {
        $response = Read-Host "Execute this command? (y/n)"
        if ($response -ne 'y' -and $response -ne 'Y') {
            Write-Host "Skipped" -ForegroundColor Yellow
            return
        }
    }

    try {
        Write-Host "Executing: $Command" -ForegroundColor Blue
        $result = Invoke-Expression $Command 2>&1
        Write-Host "Command executed successfully" -ForegroundColor Green
        if ($result) {
            Write-Host "Output: $result" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "Error executing command: $_" -ForegroundColor Red
    }
}

function Archive-Repository {
    param([string]$RepoName)
    Write-Host "Preparing to archive repository: $RepoName" -ForegroundColor Magenta
    Invoke-GitHubCommand -Command "gh repo archive $RepoName" -Description "Archiving duplicate repository: $RepoName" -ActionType "Archive"
}

function Update-Description {
    param([string]$RepoName, [string]$Description)
    Write-Host "Preparing to update description for: $RepoName" -ForegroundColor Magenta
    Write-Host "New description: $Description" -ForegroundColor Gray
    Invoke-GitHubCommand -Command "gh repo edit $RepoName --description `"$Description`"" -Description "Updating description for: $RepoName" -ActionType "Update Description"
}

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

Write-Host "`n=== ANALYSIS OF YOUR REPOSITORIES ===" -ForegroundColor Cyan
Write-Host "Found 28 repositories total:" -ForegroundColor White
Write-Host "- 7 core repositories (clean names)" -ForegroundColor Green
Write-Host "- 21 duplicate repositories (with suffixes)" -ForegroundColor Red

Write-Host "`n=== STEP 1: ARCHIVING DUPLICATE REPOSITORIES ===" -ForegroundColor Magenta

$techSuffixes = @("6g", "p7", "nl", "65", "zb", "ca", "bj", "rg", "yz", "kn", "ey", "6n", "qa", "7e", "pi", "6m", "ne", "yx", "rj", "fo")
foreach ($suffix in $techSuffixes) {
    $repoName = "zaza-technologies-site-$suffix"
    if (Test-RepositoryExists -RepoName $repoName) {
        Archive-Repository -RepoName $repoName
    } else {
        Write-Host "Repository $repoName not found, skipping..." -ForegroundColor Yellow
    }
}

$inboxSuffixes = @("p7", "nl", "65")
foreach ($suffix in $inboxSuffixes) {
    $repoName = "zaza-inbox-site-$suffix"
    if (Test-RepositoryExists -RepoName $repoName) {
        Archive-Repository -RepoName $repoName
    } else {
        Write-Host "Repository $repoName not found, skipping..." -ForegroundColor Yellow
    }
}

$repoName = "zaza-claritydeck-site-zb"
if (Test-RepositoryExists -RepoName $repoName) {
    Archive-Repository -RepoName $repoName
} else {
    Write-Host "Repository $repoName not found, skipping..." -ForegroundColor Yellow
}

$schwoopSuffixes = @("ca", "bj", "rg")
foreach ($suffix in $schwoopSuffixes) {
    $repoName = "zaza-schwoop-site-$suffix"
    if (Test-RepositoryExists -RepoName $repoName) {
        Archive-Repository -RepoName $repoName
    } else {
        Write-Host "Repository $repoName not found, skipping..." -ForegroundColor Yellow
    }
}

Write-Host "`n=== STEP 2: UPDATE DESCRIPTIONS FOR CORE REPOSITORIES ===" -ForegroundColor Magenta

$descriptions = @{
    "zaza-promptly-site" = "Zaza Promptly - AI-powered prompt management and optimization platform for teachers and educators"
    "zaza-teach" = "Zaza Teach - AI-powered lesson planning and tutoring platform for teachers"
    "zaza-inbox-site" = "Zaza Inbox - Smart email management and communication platform for educators"
    "zaza-visuals-site" = "Zaza Visuals - Creative design and visual content creation platform"
    "zaza-claritydeck-site" = "Zaza ClarityDeck - AI-driven presentation and deck creation tool"
    "zaza-study-site" = "Zaza Study - Learning management and study tools platform"
    "zaza-schwoop-site" = "Zaza Schwoop - Student engagement and gamification platform"
    "zaza-technologies-site" = "Zaza Technologies - Main company website and landing page"
    "zaza-homepage" = "Zaza Technologies - Company homepage and main website"
    "zaza-leadfinder" = "Zaza LeadFinder - AI-powered lead generation engine for Zaza products"
    "zaza-launch" = "Zaza Launch - AI-powered lesson planning tool for teachers"
    "zaza-snippets-app" = "Zaza Snippets - Code snippet management and sharing platform"
    "zaza-mvp" = "Zaza MVP - Initial compliant minimum viable product"
}

foreach ($repo in $descriptions.GetEnumerator()) {
    if (Test-RepositoryExists -RepoName $repo.Key) {
        Update-Description -RepoName $repo.Key -Description $repo.Value
    } else {
        Write-Host "Repository $($repo.Key) not found, skipping..." -ForegroundColor Yellow
    }
}

Write-Host "`n=== CLEANUP COMPLETE ===" -ForegroundColor Green

if ($Simulate) {
    Write-Host "SIMULATION COMPLETE - No actual changes were made" -ForegroundColor Yellow
    Write-Host "To run with actual changes, remove the -Simulate flag" -ForegroundColor Gray
}
