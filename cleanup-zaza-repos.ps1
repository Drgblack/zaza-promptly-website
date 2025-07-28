# Zaza GitHub Repository Cleanup Script
# This script renames, archives, and updates descriptions for Zaza repositories
# Run this script after ensuring GitHub CLI is installed and authenticated

Write-Host "Starting Zaza repository cleanup..." -ForegroundColor Green

# Function to safely execute GitHub CLI commands
function Invoke-GitHubCommand {
    param(
        [string]$Command,
        [string]$Description
    )
    
    Write-Host "`n$Description" -ForegroundColor Yellow
    Write-Host "Command: $Command" -ForegroundColor Gray
    
    $response = Read-Host "Execute this command? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        try {
            Invoke-Expression $Command
            Write-Host "✓ Command executed successfully" -ForegroundColor Green
        }
        catch {
            Write-Host "✗ Error executing command: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "Skipped" -ForegroundColor Yellow
    }
}

# Repository rename operations
# Replace these with your actual repository names and desired canonical names

# Example rename operations (uncomment and modify as needed):
# Invoke-GitHubCommand -Command "gh repo rename zaza-inbox-site-65 zaza-inbox-site" -Description "Renaming zaza-inbox-site-65 to zaza-inbox-site"
# Invoke-GitHubCommand -Command "gh repo rename zaza-technologies-site-6m zaza-technologies-site" -Description "Renaming zaza-technologies-site-6m to zaza-technologies-site"

# Repository archive operations
# Archive old/duplicate repositories that are no longer needed

# Example archive operations (uncomment and modify as needed):
# Invoke-GitHubCommand -Command "gh repo archive zaza-old-project-1" -Description "Archiving old project zaza-old-project-1"
# Invoke-GitHubCommand -Command "gh repo archive zaza-duplicate-site-2" -Description "Archiving duplicate repository zaza-duplicate-site-2"

# Repository description updates
# Update descriptions for key Zaza products

# Example description updates (uncomment and modify as needed):
# Invoke-GitHubCommand -Command 'gh repo edit zaza-promptly-site --description "Zaza Promptly - AI-powered prompt management and optimization platform"' -Description "Updating description for zaza-promptly-site"
# Invoke-GitHubCommand -Command 'gh repo edit zaza-teach-site --description "Zaza Teach - Interactive learning platform with AI tutoring capabilities"' -Description "Updating description for zaza-teach-site"
# Invoke-GitHubCommand -Command 'gh repo edit zaza-claritydeck-site --description "Zaza ClarityDeck - AI-driven presentation and deck creation tool"' -Description "Updating description for zaza-claritydeck-site"

Write-Host "`nRepository cleanup script completed!" -ForegroundColor Green
Write-Host "Please review the changes and ensure all operations were successful." -ForegroundColor Yellow

# Optional: List all repositories to verify changes
Write-Host "`nCurrent repository list:" -ForegroundColor Cyan
Write-Host "Run 'gh repo list' to see all repositories" -ForegroundColor Gray 