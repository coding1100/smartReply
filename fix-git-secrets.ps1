# PowerShell script to fix GitHub push protection errors
# This script removes secrets from git history

Write-Host "=== Fixing GitHub Push Protection Errors ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "ERROR: Not in a git repository. Please run this script from the repository root." -ForegroundColor Red
    exit 1
}

# Check current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow
Write-Host ""

# Check if ENV_SETUP.md has been fixed
$envSetupContent = Get-Content "ENV_SETUP.md" -Raw
if ($envSetupContent -match "234259137960|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") {
    Write-Host "ERROR: ENV_SETUP.md still contains secrets. Please fix it first." -ForegroundColor Red
    exit 1
}

Write-Host "✓ ENV_SETUP.md is already fixed (no secrets found)" -ForegroundColor Green
Write-Host ""

# Find the problematic commit
Write-Host "Searching for commit with secrets..." -ForegroundColor Yellow
$problematicCommit = "1609c84987480d5fd867610adb92145a2a710e99"

# Check if commit exists
$commitExists = git cat-file -e $problematicCommit 2>$null
if (-not $commitExists) {
    Write-Host "WARNING: Commit $problematicCommit not found in current repository" -ForegroundColor Yellow
    Write-Host "The commit might have already been fixed or is in a different branch." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Checking if there are any uncommitted changes..." -ForegroundColor Yellow
    
    $status = git status --porcelain
    if ($status) {
        Write-Host "Found uncommitted changes. Staging ENV_SETUP.md..." -ForegroundColor Yellow
        git add ENV_SETUP.md
        Write-Host "✓ ENV_SETUP.md staged" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now commit and push:" -ForegroundColor Cyan
        Write-Host "  git commit -m 'Remove secrets from ENV_SETUP.md'"
        Write-Host "  git push origin $currentBranch"
    } else {
        Write-Host "No uncommitted changes found." -ForegroundColor Yellow
        Write-Host "The file might already be fixed in the current working directory." -ForegroundColor Yellow
    }
    exit 0
}

# Check if this is the most recent commit
$lastCommit = git rev-parse HEAD
if ($lastCommit -eq $problematicCommit) {
    Write-Host "✓ Found problematic commit as the most recent commit" -ForegroundColor Green
    Write-Host "Amending the commit..." -ForegroundColor Yellow
    
    # Stage the fixed file
    git add ENV_SETUP.md
    
    # Amend the commit
    git commit --amend --no-edit
    
    Write-Host "✓ Commit amended successfully" -ForegroundColor Green
    Write-Host ""
    Write-Host "Force pushing to remote..." -ForegroundColor Yellow
    Write-Host "WARNING: This will rewrite history on the remote branch!" -ForegroundColor Red
    Write-Host ""
    
    $confirm = Read-Host "Do you want to force push? (yes/no)"
    if ($confirm -eq "yes") {
        git push --force-with-lease origin $currentBranch
        Write-Host "✓ Force push completed" -ForegroundColor Green
    } else {
        Write-Host "Push cancelled. You can push manually later with:" -ForegroundColor Yellow
        Write-Host "  git push --force-with-lease origin $currentBranch"
    }
} else {
    Write-Host "The problematic commit is not the most recent commit." -ForegroundColor Yellow
    Write-Host "You'll need to use interactive rebase to fix it." -ForegroundColor Yellow
    Write-Host ""
    
    # Find the commit before the problematic one
    $commits = git log --oneline --all
    $commitIndex = -1
    for ($i = 0; $i -lt $commits.Count; $i++) {
        if ($commits[$i] -match $problematicCommit) {
            $commitIndex = $i
            break
        }
    }
    
    if ($commitIndex -gt 0) {
        $parentCommit = ($commits[$commitIndex + 1] -split ' ')[0]
        Write-Host "Parent commit: $parentCommit" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "To fix this, run:" -ForegroundColor Yellow
        Write-Host "  git rebase -i $parentCommit" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "In the editor:" -ForegroundColor Yellow
        Write-Host "  1. Change 'pick' to 'edit' for commit $problematicCommit" -ForegroundColor Cyan
        Write-Host "  2. Save and close" -ForegroundColor Cyan
        Write-Host "  3. Run: git add ENV_SETUP.md" -ForegroundColor Cyan
        Write-Host "  4. Run: git commit --amend --no-edit" -ForegroundColor Cyan
        Write-Host "  5. Run: git rebase --continue" -ForegroundColor Cyan
        Write-Host "  6. Run: git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
    } else {
        Write-Host "Could not find parent commit automatically." -ForegroundColor Red
        Write-Host "Please use interactive rebase manually:" -ForegroundColor Yellow
        Write-Host "  git rebase -i HEAD~N  (where N is the number of commits to go back)" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "=== Script completed ===" -ForegroundColor Cyan

