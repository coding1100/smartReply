# Script to delete commits containing secrets from git history
# This will help you remove commits with Google OAuth secrets

param(
    [string]$CommitHash = "",
    [switch]$Interactive,
    [switch]$Force
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Delete Commits with Secrets" -ForegroundColor Cyan
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
Write-Host ""

# Step 1: Find commits with secrets
Write-Host "[1/4] Finding commits with secrets..." -ForegroundColor Yellow

$secrets = @(
    "234259137960-ib6rpcv6qdg9ubm7gklmu2otf9i7m26m",
    "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"
)

$commitsWithSecrets = @()

foreach ($secret in $secrets) {
    Write-Host "  Searching for: $secret" -ForegroundColor Gray
    $results = git log --all --source --full-history -S $secret --format="%H|%s|%an|%ad" --date=short 2>$null
    
    if ($results) {
        foreach ($line in $results) {
            if ($line -match "^([a-f0-9]{40})\|") {
                $hash = $matches[1]
                $info = $line -replace "^[^|]+\|", ""
                $parts = $info -split "\|"
                
                if ($commitsWithSecrets -notcontains $hash) {
                    $commitsWithSecrets += @{
                        Hash = $hash
                        ShortHash = $hash.Substring(0, 8)
                        Message = $parts[0]
                        Author = $parts[1]
                        Date = $parts[2]
                    }
                }
            }
        }
    }
}

if ($commitsWithSecrets.Count -eq 0) {
    Write-Host "✓ No commits with secrets found!" -ForegroundColor Green
    exit 0
}

Write-Host ""
Write-Host "Found $($commitsWithSecrets.Count) commit(s) with secrets:" -ForegroundColor Red
Write-Host ""

foreach ($commit in $commitsWithSecrets) {
    Write-Host "  Commit: $($commit.ShortHash) ($($commit.Hash))" -ForegroundColor Red
    Write-Host "    Message: $($commit.Message)" -ForegroundColor Yellow
    Write-Host "    Author: $($commit.Author)" -ForegroundColor Gray
    Write-Host "    Date: $($commit.Date)" -ForegroundColor Gray
    Write-Host ""
}

# Step 2: Determine the problematic commit
Write-Host "[2/4] Analyzing commit positions..." -ForegroundColor Yellow

$headCommit = git rev-parse HEAD
$problematicCommit = "1609c84987480d5fd867610adb92145a2a710e99"

# Check if problematic commit exists
$commitExists = git cat-file -e $problematicCommit 2>$null
$isHead = ($headCommit -eq $problematicCommit)

Write-Host "  HEAD commit: $($headCommit.Substring(0, 8))" -ForegroundColor Cyan
if ($commitExists) {
    Write-Host "  Problematic commit found: $($problematicCommit.Substring(0, 8))" -ForegroundColor Yellow
    if ($isHead) {
        Write-Host "  Status: This IS the HEAD commit (easiest to fix)" -ForegroundColor Green
    } else {
        Write-Host "  Status: This is NOT the HEAD commit (needs rebase)" -ForegroundColor Yellow
    }
} else {
    Write-Host "  Problematic commit not found in current branch" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Choose deletion method
Write-Host "[3/4] Choosing deletion method..." -ForegroundColor Yellow

if ($CommitHash) {
    $targetCommit = $CommitHash
    Write-Host "  Using specified commit: $targetCommit" -ForegroundColor Cyan
} elseif ($isHead) {
    $targetCommit = $problematicCommit
    Write-Host "  Using HEAD commit (will amend)" -ForegroundColor Cyan
} else {
    Write-Host "  Multiple commits found. Choose a method:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Option 1: Amend HEAD (if secrets are in HEAD)" -ForegroundColor Cyan
    Write-Host "  Option 2: Interactive Rebase (if secrets are in middle)" -ForegroundColor Cyan
    Write-Host "  Option 3: Filter-branch (remove from ALL history)" -ForegroundColor Cyan
    Write-Host ""
    
    if (-not $Interactive) {
        Write-Host "  Running in non-interactive mode. Use -Interactive for menu." -ForegroundColor Yellow
        $targetCommit = $problematicCommit
    } else {
        $choice = Read-Host "Enter choice (1/2/3)"
        switch ($choice) {
            "1" { $targetCommit = $headCommit }
            "2" { $targetCommit = "rebase" }
            "3" { $targetCommit = "filter" }
            default { $targetCommit = $problematicCommit }
        }
    }
}

Write-Host ""

# Step 4: Execute deletion
Write-Host "[4/4] Executing deletion..." -ForegroundColor Yellow
Write-Host ""

if ($targetCommit -eq "rebase") {
    Write-Host "Interactive Rebase Method:" -ForegroundColor Cyan
    Write-Host "  1. Run: git log --oneline -10" -ForegroundColor Yellow
    Write-Host "  2. Count commits back to the problematic one" -ForegroundColor Yellow
    Write-Host "  3. Run: git rebase -i HEAD~N (N = number of commits)" -ForegroundColor Yellow
    Write-Host "  4. Change 'pick' to 'drop' for commits with secrets" -ForegroundColor Yellow
    Write-Host "  5. Save and close" -ForegroundColor Yellow
    Write-Host "  6. Run: git push --force-with-lease origin $currentBranch" -ForegroundColor Yellow
    exit 0
}

if ($targetCommit -eq "filter") {
    Write-Host "Filter-Branch Method (removes from ALL history):" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⚠ WARNING: This rewrites ALL commit history!" -ForegroundColor Red
    Write-Host ""
    
    if (-not $Force) {
        $confirm = Read-Host "Are you sure? This cannot be undone! (yes/no)"
        if ($confirm -ne "yes" -and $confirm -ne "y") {
            Write-Host "Cancelled." -ForegroundColor Yellow
            exit 0
        }
    }
    
    Write-Host "Removing ENV_SETUP.md from all commits..." -ForegroundColor Yellow
    git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ENV_SETUP.md" HEAD
    
    Write-Host "Adding fixed ENV_SETUP.md..." -ForegroundColor Yellow
    git add ENV_SETUP.md
    git commit -m "Add fixed ENV_SETUP.md without secrets"
    
    Write-Host "✓ Filter-branch completed" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now push with:" -ForegroundColor Cyan
    Write-Host "  git push --force-with-lease origin $currentBranch" -ForegroundColor Yellow
    exit 0
}

# Default: Amend or rebase specific commit
if ($isHead -or $targetCommit -eq $headCommit) {
    Write-Host "Amending HEAD commit..." -ForegroundColor Yellow
    
    # Make sure ENV_SETUP.md is fixed
    if (-not (Test-Path "ENV_SETUP.md")) {
        Write-Host "ERROR: ENV_SETUP.md not found" -ForegroundColor Red
        exit 1
    }
    
    $fileContent = Get-Content "ENV_SETUP.md" -Raw
    if ($fileContent -match "234259137960-ib6rpcv6qdg9ubm7gklmu2otf9i7m26m|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") {
        Write-Host "ERROR: ENV_SETUP.md still contains secrets!" -ForegroundColor Red
        exit 1
    }
    
    git add ENV_SETUP.md
    git commit --amend --no-edit
    
    Write-Host "✓ Commit amended" -ForegroundColor Green
    Write-Host ""
    Write-Host "The commit has been updated with the fixed file." -ForegroundColor Green
    Write-Host "Secrets are removed from this commit." -ForegroundColor Green
} else {
    Write-Host "The commit is not HEAD. You need interactive rebase:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Find commit position: git log --oneline" -ForegroundColor Cyan
    Write-Host "2. Start rebase: git rebase -i HEAD~N" -ForegroundColor Cyan
    Write-Host "3. Change 'pick' to 'edit' for commit $($targetCommit.Substring(0, 8))" -ForegroundColor Cyan
    Write-Host "4. Run: git checkout HEAD -- ENV_SETUP.md" -ForegroundColor Cyan
    Write-Host "5. Run: git add ENV_SETUP.md" -ForegroundColor Cyan
    Write-Host "6. Run: git commit --amend --no-edit" -ForegroundColor Cyan
    Write-Host "7. Run: git rebase --continue" -ForegroundColor Cyan
    exit 0
}

# Step 5: Push
Write-Host ""
Write-Host "Ready to push changes..." -ForegroundColor Yellow
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
        Write-Host "Commits with secrets have been removed/updated." -ForegroundColor Green
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

