# PowerShell script to remove secrets from git commit history
# This fixes GitHub push protection errors

Write-Host "=== Removing Secrets from Git History ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "ERROR: Not in a git repository. Please run this script from the repository root." -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    exit 1
}

# Verify ENV_SETUP.md is fixed
Write-Host "Checking ENV_SETUP.md..." -ForegroundColor Yellow
if (-not (Test-Path "ENV_SETUP.md")) {
    Write-Host "ERROR: ENV_SETUP.md not found" -ForegroundColor Red
    exit 1
}

$fileContent = Get-Content "ENV_SETUP.md" -Raw
if ($fileContent -match "234259137960-ib6rpcv6qdg9ubm7gklmu2otf9i7m26m|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") {
    Write-Host "ERROR: ENV_SETUP.md still contains secrets!" -ForegroundColor Red
    Write-Host "Please fix the file first by replacing actual secrets with placeholders." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ ENV_SETUP.md is fixed (no secrets found)" -ForegroundColor Green
Write-Host ""

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Cyan
Write-Host ""

# Check if the problematic commit exists
$problematicCommit = "1609c84987480d5fd867610adb92145a2a710e99"
Write-Host "Checking for commit: $problematicCommit" -ForegroundColor Yellow

$commitExists = git cat-file -e $problematicCommit 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Commit not found in current branch. It might be in a different branch or already fixed." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Checking for uncommitted changes..." -ForegroundColor Yellow
    $status = git status --porcelain
    if ($status -match "ENV_SETUP.md") {
        Write-Host "Found changes to ENV_SETUP.md. Staging and committing..." -ForegroundColor Yellow
        git add ENV_SETUP.md
        git commit -m "Remove secrets from ENV_SETUP.md"
        Write-Host "✓ Changes committed" -ForegroundColor Green
    } else {
        Write-Host "No uncommitted changes found." -ForegroundColor Yellow
    }
    exit 0
}

Write-Host "✓ Commit found" -ForegroundColor Green
Write-Host ""

# Check if this is the HEAD commit
$headCommit = git rev-parse HEAD
if ($headCommit -eq $problematicCommit) {
    Write-Host "The problematic commit is the HEAD (most recent) commit." -ForegroundColor Yellow
    Write-Host "This is the easiest case - we can just amend it." -ForegroundColor Green
    Write-Host ""
    
    # Check if there are uncommitted changes
    $status = git status --porcelain
    if ($status -match "ENV_SETUP.md") {
        Write-Host "Staging ENV_SETUP.md..." -ForegroundColor Yellow
        git add ENV_SETUP.md
    } else {
        Write-Host "No changes to ENV_SETUP.md found. Checking out the file from HEAD..." -ForegroundColor Yellow
        git checkout HEAD -- ENV_SETUP.md
        # Verify it's fixed
        $content = Get-Content "ENV_SETUP.md" -Raw
        if ($content -match "234259137960-ib6rpcv6qdg9ubm7gklmu2otf9i7m26m|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") {
            Write-Host "ERROR: The file in the commit still contains secrets!" -ForegroundColor Red
            Write-Host "You need to manually edit the file to remove secrets first." -ForegroundColor Yellow
            exit 1
        }
        git add ENV_SETUP.md
    }
    
    Write-Host "Amending commit..." -ForegroundColor Yellow
    git commit --amend --no-edit
    
    Write-Host ""
    Write-Host "✓ Commit amended successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next step: Force push to remote" -ForegroundColor Cyan
    Write-Host "Run: git push --force-with-lease origin $currentBranch" -ForegroundColor Yellow
    Write-Host ""
    
    $confirm = Read-Host "Do you want to force push now? (yes/no)"
    if ($confirm -eq "yes" -or $confirm -eq "y") {
        Write-Host "Force pushing..." -ForegroundColor Yellow
        git push --force-with-lease origin $currentBranch
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Successfully pushed! GitHub should now accept the push." -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "⚠ Push failed. You may need to:" -ForegroundColor Yellow
            Write-Host "  1. Check if you have permission to force push" -ForegroundColor Yellow
            Write-Host "  2. Make sure no one else has pushed changes" -ForegroundColor Yellow
            Write-Host "  3. Try: git push --force origin $currentBranch (less safe)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Push cancelled. Run manually when ready:" -ForegroundColor Yellow
        Write-Host "  git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
    }
} else {
    Write-Host "The problematic commit is NOT the HEAD commit." -ForegroundColor Yellow
    Write-Host "You'll need to use interactive rebase." -ForegroundColor Yellow
    Write-Host ""
    
    # Find the commit position
    $commits = git log --oneline --all | ForEach-Object { $_.Split(' ')[0] }
    $commitIndex = -1
    for ($i = 0; $i -lt $commits.Count; $i++) {
        if ($commits[$i] -eq $problematicCommit) {
            $commitIndex = $i
            break
        }
    }
    
    if ($commitIndex -ge 0) {
        $parentCommit = if ($commitIndex + 1 -lt $commits.Count) { $commits[$commitIndex + 1] } else { "HEAD~$($commitIndex + 1)" }
        Write-Host "Found commit at position $commitIndex" -ForegroundColor Cyan
        Write-Host "Parent commit: $parentCommit" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "To fix this, you need to:" -ForegroundColor Yellow
        Write-Host "  1. Run: git rebase -i $parentCommit" -ForegroundColor Cyan
        Write-Host "  2. In the editor, change 'pick' to 'edit' for commit $problematicCommit" -ForegroundColor Cyan
        Write-Host "  3. Save and close the editor" -ForegroundColor Cyan
        Write-Host "  4. Run: git checkout HEAD -- ENV_SETUP.md" -ForegroundColor Cyan
        Write-Host "  5. Edit ENV_SETUP.md to remove secrets (if not already fixed)" -ForegroundColor Cyan
        Write-Host "  6. Run: git add ENV_SETUP.md" -ForegroundColor Cyan
        Write-Host "  7. Run: git commit --amend --no-edit" -ForegroundColor Cyan
        Write-Host "  8. Run: git rebase --continue" -ForegroundColor Cyan
        Write-Host "  9. Run: git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
    } else {
        Write-Host "Could not automatically find the commit position." -ForegroundColor Red
        Write-Host "Please use interactive rebase manually:" -ForegroundColor Yellow
        Write-Host "  git rebase -i HEAD~N  (where N is the number of commits to go back)" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "=== Script completed ===" -ForegroundColor Cyan

