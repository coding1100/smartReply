# Script to check git commits for secrets
# This will find all commits containing the Google OAuth secrets

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Checking Git Commits for Secrets" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "ERROR: Not in a git repository" -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please navigate to your git repository and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "Current branch: $(git rev-parse --abbrev-ref HEAD)" -ForegroundColor Cyan
Write-Host "Repository: $(git remote get-url origin 2>$null)" -ForegroundColor Cyan
Write-Host ""

# Secrets to search for
$secrets = @(
    @{
        Name = "Google OAuth Client ID"
        Pattern = "234259137960-ib6rpcv6qdg9ubm7gklmu2otf9i7m26m"
    },
    @{
        Name = "Google OAuth Client Secret"
        Pattern = "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"
    }
)

Write-Host "Searching for secrets in git history..." -ForegroundColor Yellow
Write-Host ""

$foundCommits = @()

foreach ($secret in $secrets) {
    Write-Host "Checking for: $($secret.Name)" -ForegroundColor Yellow
    Write-Host "Pattern: $($secret.Pattern)" -ForegroundColor Gray
    Write-Host ""
    
    # Search in all branches and commits
    $results = git log --all --source --full-history -p -S $secret.Pattern --format="%H|%an|%ae|%ad|%s" --date=iso 2>$null
    
    if ($results) {
        $commitHashes = @()
        $currentCommit = $null
        $inCommit = $false
        
        foreach ($line in $results) {
            if ($line -match "^([a-f0-9]{40})\|") {
                $commitHash = $matches[1]
                $commitInfo = $line -replace "^[^|]+\|", ""
                $parts = $commitInfo -split "\|"
                
                if ($commitHash -and $commitHash.Length -eq 40) {
                    $commitHashes += $commitHash
                    $currentCommit = @{
                        Hash = $commitHash
                        Author = if ($parts.Count -gt 0) { $parts[0] } else { "Unknown" }
                        Email = if ($parts.Count -gt 1) { $parts[1] } else { "Unknown" }
                        Date = if ($parts.Count -gt 2) { $parts[2] } else { "Unknown" }
                        Message = if ($parts.Count -gt 3) { $parts[3] } else { "Unknown" }
                        SecretType = $secret.Name
                    }
                }
            }
        }
        
        # Get unique commits
        $uniqueCommits = $commitHashes | Select-Object -Unique
        
        if ($uniqueCommits.Count -gt 0) {
            Write-Host "  Found in $($uniqueCommits.Count) commit(s):" -ForegroundColor Red
            Write-Host ""
            
            foreach ($hash in $uniqueCommits) {
                $commitInfo = git log -1 --format="%H|%an|%ae|%ad|%s" --date=iso $hash 2>$null
                if ($commitInfo) {
                    $parts = $commitInfo -split "\|"
                    $shortHash = $hash.Substring(0, 8)
                    
                    Write-Host "  Commit: $shortHash ($hash)" -ForegroundColor Red
                    Write-Host "    Author: $($parts[1])" -ForegroundColor Yellow
                    Write-Host "    Date: $($parts[3])" -ForegroundColor Yellow
                    Write-Host "    Message: $($parts[4])" -ForegroundColor Yellow
                    
                    # Check which files were changed
                    $files = git diff-tree --no-commit-id --name-only -r $hash 2>$null
                    if ($files) {
                        Write-Host "    Files changed:" -ForegroundColor Gray
                        foreach ($file in $files) {
                            Write-Host "      - $file" -ForegroundColor Gray
                        }
                    }
                    
                    # Check if this is the specific problematic commit
                    if ($hash -eq "1609c84987480d5fd867610adb92145a2a710e99") {
                        Write-Host "    ⚠ THIS IS THE COMMIT BLOCKED BY GITHUB!" -ForegroundColor Red -BackgroundColor Yellow
                    }
                    
                    Write-Host ""
                    
                    $foundCommits += @{
                        Hash = $hash
                        ShortHash = $shortHash
                        Author = $parts[1]
                        Date = $parts[3]
                        Message = $parts[4]
                        SecretType = $secret.Name
                        Files = $files
                    }
                }
            }
        } else {
            Write-Host "  ✓ Not found in commit history" -ForegroundColor Green
        }
    } else {
        Write-Host "  ✓ Not found in commit history" -ForegroundColor Green
    }
    Write-Host ""
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($foundCommits.Count -gt 0) {
    Write-Host "Total commits with secrets: $($foundCommits.Count)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Commits that need to be fixed:" -ForegroundColor Yellow
    
    $uniqueHashes = $foundCommits | Select-Object -ExpandProperty Hash -Unique
    foreach ($hash in $uniqueHashes) {
        $commit = $foundCommits | Where-Object { $_.Hash -eq $hash } | Select-Object -First 1
        $shortHash = $hash.Substring(0, 8)
        Write-Host "  - $shortHash : $($commit.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "To fix these commits:" -ForegroundColor Cyan
    Write-Host "  1. Run: .\fix-all-github-issues.ps1" -ForegroundColor Yellow
    Write-Host "  2. Or manually amend/rebase the commits" -ForegroundColor Yellow
    Write-Host "  3. See COMPLETE_FIX_GUIDE.md for detailed instructions" -ForegroundColor Yellow
} else {
    Write-Host "✓ No secrets found in commit history!" -ForegroundColor Green
    Write-Host "Your repository is clean." -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

