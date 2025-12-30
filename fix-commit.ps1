# Quick fix for GitHub push protection - Remove secrets from commit history
Write-Host "=== Fixing GitHub Push Protection ===" -ForegroundColor Cyan
Write-Host ""

# Check git status
$status = git status --porcelain
if ($status -match "ENV_SETUP.md") {
    Write-Host "Staging fixed ENV_SETUP.md..." -ForegroundColor Yellow
    git add ENV_SETUP.md
}

# Check if we have uncommitted changes
$uncommitted = git diff --cached --name-only
if ($uncommitted -contains "ENV_SETUP.md") {
    Write-Host "Amending the last commit..." -ForegroundColor Yellow
    git commit --amend --no-edit
    
    Write-Host ""
    Write-Host "✓ Commit amended successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now force push with:" -ForegroundColor Cyan
    Write-Host "  git push --force-with-lease origin dev" -ForegroundColor Yellow
} else {
    Write-Host "No changes to commit. The file might already be fixed." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "If you still get the error, the commit might not be the most recent." -ForegroundColor Yellow
    Write-Host "Try running:" -ForegroundColor Cyan
    Write-Host "  git log --oneline -5" -ForegroundColor Yellow
    Write-Host "to see recent commits." -ForegroundColor Yellow
}

