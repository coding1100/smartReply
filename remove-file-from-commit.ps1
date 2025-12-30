# Script to remove ENV_SETUP.md from specific commit
# This removes the file from commit 1609c84987480d5fd867610adb92145a2a710e99

param(
    [string]$CommitHash = "1609c84987480d5fd867610adb92145a2a710e99",
    [string]$FilePath = "ENV_SETUP.md",
    [switch]$Force
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Remove File from Git Commit" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path .git)) {
    Write-Host "ERROR: Not in a git repository" -ForegroundColor Red
    exit 1
}

$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Cyan
Write-Host "Target commit: $CommitHash" -ForegroundColor Cyan
Write-Host "File to remove: $FilePath" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify commit exists
Write-Host "[1/4] Verifying commit exists..." -ForegroundColor Yellow
$commitExists = git cat-file -e $CommitHash 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Commit $CommitHash not found in this repository" -ForegroundColor Red
    Write-Host ""
    Write-Host "Checking if it exists in other branches..." -ForegroundColor Yellow
    $allCommits = git log --all --oneline | Select-String $CommitHash.Substring(0, 8)
    if ($allCommits) {
        Write-Host "Found in other branches. Switch to that branch first." -ForegroundColor Yellow
    }
    exit 1
}

Write-Host "✓ Commit found" -ForegroundColor Green
Write-Host ""

# Step 2: Check if file exists in that commit
Write-Host "[2/4] Checking if file exists in commit..." -ForegroundColor Yellow
$fileInCommit = git ls-tree -r $CommitHash --name-only | Select-String $FilePath

if (-not $fileInCommit) {
    Write-Host "⚠ File $FilePath not found in commit $CommitHash" -ForegroundColor Yellow
    Write-Host "It may have already been removed." -ForegroundColor Yellow
    exit 0
}

Write-Host "✓ File found in commit" -ForegroundColor Green
Write-Host ""

# Step 3: Check commit position
Write-Host "[3/4] Analyzing commit position..." -ForegroundColor Yellow
$headCommit = git rev-parse HEAD
$isHead = ($headCommit -eq $CommitHash)

# Get commit info
$commitInfo = git log -1 --format="%H|%s|%an|%ad" --date=short $CommitHash
$parts = $commitInfo -split "\|"

Write-Host "  Commit: $($parts[0].Substring(0, 8))" -ForegroundColor Cyan
Write-Host "  Message: $($parts[1])" -ForegroundColor Cyan
Write-Host "  Author: $($parts[2])" -ForegroundColor Cyan
Write-Host "  Date: $($parts[3])" -ForegroundColor Cyan
Write-Host "  Is HEAD: $isHead" -ForegroundColor $(if ($isHead) { "Green" } else { "Yellow" })
Write-Host ""

# Step 4: Remove file from commit
Write-Host "[4/4] Removing file from commit..." -ForegroundColor Yellow
Write-Host ""

if ($isHead) {
    Write-Host "The commit IS the HEAD commit. Using simple method..." -ForegroundColor Green
    Write-Host ""
    
    # Method 1: If it's HEAD, we can just remove it and amend
    Write-Host "Removing file from working directory and staging area..." -ForegroundColor Yellow
    git rm --cached $FilePath 2>$null
    git commit --amend --no-edit
    
    Write-Host "✓ File removed from commit" -ForegroundColor Green
} else {
    Write-Host "The commit is NOT the HEAD commit. Using interactive rebase..." -ForegroundColor Yellow
    Write-Host ""
    
    # Find how many commits back
    $commits = git log --oneline HEAD | ForEach-Object { ($_ -split ' ')[0] }
    $commitIndex = -1
    for ($i = 0; $i -lt $commits.Count; $i++) {
        if ($commits[$i] -eq $CommitHash) {
            $commitIndex = $i
            break
        }
    }
    
    if ($commitIndex -ge 0) {
        $commitsBack = $commitIndex + 1
        Write-Host "Commit is $commitsBack commit(s) back from HEAD" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "You need to use interactive rebase:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Run: git rebase -i HEAD~$commitsBack" -ForegroundColor Cyan
        Write-Host "2. In the editor, change 'pick' to 'edit' for commit $($CommitHash.Substring(0, 8))" -ForegroundColor Cyan
        Write-Host "3. Save and close" -ForegroundColor Cyan
        Write-Host "4. Run: git rm --cached $FilePath" -ForegroundColor Cyan
        Write-Host "5. Run: git commit --amend --no-edit" -ForegroundColor Cyan
        Write-Host "6. Run: git rebase --continue" -ForegroundColor Cyan
        Write-Host "7. Run: git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "OR use filter-branch to remove from ALL commits:" -ForegroundColor Yellow
        Write-Host "  git filter-branch --force --index-filter \"git rm --cached --ignore-unmatch $FilePath\" HEAD" -ForegroundColor Cyan
        exit 0
    } else {
        Write-Host "Could not determine commit position automatically." -ForegroundColor Red
        Write-Host "Use interactive rebase manually:" -ForegroundColor Yellow
        Write-Host "  git rebase -i HEAD~N  (where N is the number of commits)" -ForegroundColor Cyan
        exit 0
    }
}

# Step 5: Push
Write-Host ""
Write-Host "Ready to push changes..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠ WARNING: This will rewrite git history!" -ForegroundColor Red
Write-Host ""

if (-not $Force) {
    $confirm = Read-Host "Do you want to force push now? (yes/no)"
} else {
    $confirm = "yes"
}

if ($confirm -eq "yes" -or $confirm -eq "y") {
    Write-Host "Force pushing..." -ForegroundColor Yellow
    git push --force-with-lease origin $currentBranch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✓ SUCCESS!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "File $FilePath has been removed from commit $($CommitHash.Substring(0, 8))" -ForegroundColor Green
        Write-Host "GitHub should now accept your pushes." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "⚠ Push failed. Try manually:" -ForegroundColor Yellow
        Write-Host "  git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
    }
} else {
    Write-Host "Push cancelled. Run when ready:" -ForegroundColor Yellow
    Write-Host "  git push --force-with-lease origin $currentBranch" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

