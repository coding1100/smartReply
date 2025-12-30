# Comprehensive script to fix ALL GitHub push protection issues
# This removes secrets from git commit history

param(
    [switch]$Force
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Push Protection Fix Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path .git)) {
    Write-Host "ERROR: Not in a git repository" -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    exit 1
}

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify ENV_SETUP.md is fixed
Write-Host "[1/5] Verifying ENV_SETUP.md is fixed..." -ForegroundColor Yellow
if (-not (Test-Path "ENV_SETUP.md")) {
    Write-Host "ERROR: ENV_SETUP.md not found" -ForegroundColor Red
    exit 1
}

$fileContent = Get-Content "ENV_SETUP.md" -Raw
$hasSecrets = $fileContent -match "234259137960-ib6rpcv6qdg9ubm7gklmu2otf9i7m26m|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"

if ($hasSecrets) {
    Write-Host "ERROR: ENV_SETUP.md still contains secrets!" -ForegroundColor Red
    Write-Host "Please fix the file first." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ ENV_SETUP.md is fixed" -ForegroundColor Green
Write-Host ""

# Step 2: Check git status
Write-Host "[2/5] Checking git status..." -ForegroundColor Yellow
$status = git status --porcelain
$hasChanges = $status -match "ENV_SETUP.md"

if ($hasChanges) {
    Write-Host "Found uncommitted changes to ENV_SETUP.md" -ForegroundColor Yellow
    git add ENV_SETUP.md
    Write-Host "✓ Staged ENV_SETUP.md" -ForegroundColor Green
} else {
    Write-Host "No uncommitted changes" -ForegroundColor Green
}
Write-Host ""

# Step 3: Find problematic commit
Write-Host "[3/5] Searching for problematic commit..." -ForegroundColor Yellow
$problematicCommit = "1609c84987480d5fd867610adb92145a2a710e99"

# Check if commit exists
$commitCheck = git cat-file -t $problematicCommit 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Commit $problematicCommit not found in current branch" -ForegroundColor Yellow
    Write-Host "It might be in a different branch or already fixed." -ForegroundColor Yellow
    Write-Host ""
    
    if ($hasChanges) {
        Write-Host "Committing changes..." -ForegroundColor Yellow
        git commit -m "Remove secrets from ENV_SETUP.md"
        Write-Host "✓ Committed" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "You can now try pushing:" -ForegroundColor Cyan
    Write-Host "  git push origin $currentBranch" -ForegroundColor Yellow
    exit 0
}

Write-Host "✓ Found commit: $problematicCommit" -ForegroundColor Green
Write-Host ""

# Step 4: Check if it's HEAD
Write-Host "[4/5] Checking commit position..." -ForegroundColor Yellow
$headCommit = git rev-parse HEAD

if ($headCommit -eq $problematicCommit) {
    Write-Host "The problematic commit IS the HEAD (most recent) commit" -ForegroundColor Green
    Write-Host "This is the easiest case - we can amend it." -ForegroundColor Green
    Write-Host ""
    
    if (-not $hasChanges) {
        Write-Host "Checking out ENV_SETUP.md from working directory..." -ForegroundColor Yellow
        # The file is already fixed, just need to stage it
        git add ENV_SETUP.md
    }
    
    Write-Host "Amending commit..." -ForegroundColor Yellow
    git commit --amend --no-edit
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Commit amended successfully!" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Failed to amend commit" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "The problematic commit is NOT the HEAD commit" -ForegroundColor Yellow
    Write-Host "We need to use interactive rebase or filter-branch" -ForegroundColor Yellow
    Write-Host ""
    
    # Find commit position
    $logOutput = git log --oneline --all | Select-String -Pattern $problematicCommit
    if ($logOutput) {
        Write-Host "Found in history. You'll need to use interactive rebase:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Find how many commits back: git log --oneline" -ForegroundColor Cyan
        Write-Host "2. Start rebase: git rebase -i HEAD~N (where N is the number)" -ForegroundColor Cyan
        Write-Host "3. Change 'pick' to 'edit' for commit $problematicCommit" -ForegroundColor Cyan
        Write-Host "4. Run: git checkout HEAD -- ENV_SETUP.md" -ForegroundColor Cyan
        Write-Host "5. Edit file if needed, then: git add ENV_SETUP.md" -ForegroundColor Cyan
        Write-Host "6. Run: git commit --amend --no-edit" -ForegroundColor Cyan
        Write-Host "7. Run: git rebase --continue" -ForegroundColor Cyan
        Write-Host "8. Run: git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Alternatively, use git filter-branch to remove secrets from ALL commits:" -ForegroundColor Yellow
        Write-Host "  git filter-branch --force --index-filter \"git rm --cached --ignore-unmatch ENV_SETUP.md\" HEAD" -ForegroundColor Cyan
        Write-Host "  git add ENV_SETUP.md" -ForegroundColor Cyan
        Write-Host "  git commit -m 'Add fixed ENV_SETUP.md'" -ForegroundColor Cyan
        Write-Host "  git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
        exit 0
    }
}
Write-Host ""

# Step 5: Force push
Write-Host "[5/5] Ready to push..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠ WARNING: This will rewrite git history!" -ForegroundColor Red
Write-Host "Make sure:" -ForegroundColor Yellow
Write-Host "  - No one else has pulled this branch" -ForegroundColor Yellow
Write-Host "  - You have permission to force push" -ForegroundColor Yellow
Write-Host "  - You've backed up your work" -ForegroundColor Yellow
Write-Host ""

if ($Force) {
    $confirm = "yes"
} else {
    $confirm = Read-Host "Do you want to force push now? (yes/no)"
}

if ($confirm -eq "yes" -or $confirm -eq "y") {
    Write-Host "Force pushing to origin/$currentBranch..." -ForegroundColor Yellow
    git push --force-with-lease origin $currentBranch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✓ SUCCESS!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "The secrets have been removed from git history." -ForegroundColor Green
        Write-Host "GitHub should now accept your pushes." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "⚠ Push failed. Possible reasons:" -ForegroundColor Yellow
        Write-Host "  - Someone else pushed changes (use --force-with-lease for safety)" -ForegroundColor Yellow
        Write-Host "  - No permission to force push" -ForegroundColor Yellow
        Write-Host "  - Network issues" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "You can try manually:" -ForegroundColor Cyan
        Write-Host "  git push --force-with-lease origin $currentBranch" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Or if you're sure, use (less safe):" -ForegroundColor Yellow
        Write-Host "  git push --force origin $currentBranch" -ForegroundColor Yellow
    }
} else {
    Write-Host "Push cancelled." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "When ready, run:" -ForegroundColor Cyan
    Write-Host "  git push --force-with-lease origin $currentBranch" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

