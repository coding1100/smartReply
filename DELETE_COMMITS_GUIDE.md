# Guide: Delete Commits with Secrets

## Overview
This guide shows you how to delete or fix commits that contain Google OAuth secrets.

## Methods

### Method 1: Amend (If commit is HEAD - Most Recent)

**Use when:** The commit with secrets is your most recent commit.

```powershell
# 1. Make sure ENV_SETUP.md is fixed (already done)
# 2. Stage the fixed file
git add ENV_SETUP.md

# 3. Amend the commit (replaces old commit with new one)
git commit --amend --no-edit

# 4. Force push
git push --force-with-lease origin dev
```

**What this does:** Replaces the commit content with the fixed version. The commit hash changes but history stays linear.

---

### Method 2: Interactive Rebase (If commit is in the middle)

**Use when:** The commit with secrets is somewhere in the middle of your history.

```powershell
# 1. See your commit history
git log --oneline -10

# 2. Count how many commits back the problematic one is
#    Example: If it's 3 commits back, use HEAD~3

# 3. Start interactive rebase
git rebase -i HEAD~N  # Replace N with the number

# 4. In the editor:
#    - Find the line with the problematic commit (1609c849)
#    - Change 'pick' to 'edit' (or 'drop' to delete it completely)
#    - Save and close

# 5. If you chose 'edit':
git checkout HEAD -- ENV_SETUP.md
git add ENV_SETUP.md
git commit --amend --no-edit
git rebase --continue

# 6. Force push
git push --force-with-lease origin dev
```

**What this does:** Rewrites history from that point forward, replacing the problematic commit.

---

### Method 3: Drop Commit (Delete it completely)

**Use when:** You want to completely remove a commit from history.

```powershell
# 1. Start interactive rebase
git rebase -i HEAD~N  # N = commits to go back

# 2. In the editor:
#    - Find the problematic commit
#    - Change 'pick' to 'drop' (or just delete the line)
#    - Save and close

# 3. Continue rebase
git rebase --continue

# 4. Force push
git push --force-with-lease origin dev
```

**What this does:** Completely removes the commit from history. All commits after it are rebased.

---

### Method 4: Filter-Branch (Remove from ALL history)

**Use when:** Secrets appear in multiple commits and you want to remove the file from all history.

```powershell
# 1. Remove ENV_SETUP.md from ALL commits
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ENV_SETUP.md" HEAD

# 2. Add the fixed version
git add ENV_SETUP.md
git commit -m "Add fixed ENV_SETUP.md without secrets"

# 3. Force push
git push --force-with-lease origin dev
```

**What this does:** Removes the file from every commit in history, then adds the fixed version as a new commit.

---

### Method 5: Reset (If it's the only commit)

**Use when:** The commit with secrets is the only commit and you haven't pushed yet.

```powershell
# 1. Reset to before the commit (keeps your changes)
git reset --soft HEAD~1

# 2. Fix ENV_SETUP.md (already done)
# 3. Stage and commit again
git add ENV_SETUP.md
git commit -m "Add ENV_SETUP.md without secrets"

# 4. Push
git push origin dev
```

**What this does:** Undoes the commit but keeps your file changes, allowing you to recommit.

---

## Automated Solution

Use the script I created:

```powershell
# Check which commits have secrets
.\check-commits-for-secrets.ps1

# Delete/fix commits with secrets
.\delete-commits-with-secrets.ps1

# Or with options
.\delete-commits-with-secrets.ps1 -Interactive
.\delete-commits-with-secrets.ps1 -Force
```

---

## Safety Tips

1. **Always backup first:**
   ```powershell
   git branch backup-before-fix
   ```

2. **Use `--force-with-lease` instead of `--force`:**
   - Safer - checks for remote changes
   - Prevents overwriting others' work

3. **Coordinate with team:**
   - If others have pulled, they'll need to reset their branches
   - Communicate before force pushing

4. **Test locally first:**
   - Make sure everything works after rewriting history
   - Check that secrets are actually removed

---

## Verification

After deleting/fixing commits, verify:

```powershell
# Check current file (should be clean)
Get-Content ENV_SETUP.md | Select-String -Pattern "234259137960|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"

# Check git history (should return nothing)
git log -p | Select-String -Pattern "234259137960|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"

# Check specific commit
git show 1609c84987480d5fd867610adb92145a2a710e99:ENV_SETUP.md 2>$null
```

---

## Quick Reference

**Most common case (commit is HEAD):**
```powershell
git add ENV_SETUP.md
git commit --amend --no-edit
git push --force-with-lease origin dev
```

**Commit in the middle:**
```powershell
git rebase -i HEAD~N
# Change 'pick' to 'edit', then:
git checkout HEAD -- ENV_SETUP.md
git add ENV_SETUP.md
git commit --amend --no-edit
git rebase --continue
git push --force-with-lease origin dev
```

---

## Troubleshooting

**Error: "Updates were rejected"**
- Someone else pushed changes
- Pull first: `git pull --rebase origin dev`

**Error: "Commit not found"**
- Commit might be in different branch
- Check: `git log --all --oneline | Select-String "1609c849"`

**Error: "Permission denied"**
- You don't have force push permission
- Contact repository admin

---

## After Fixing

✅ Secrets removed from commit history  
✅ GitHub will accept your pushes  
✅ Code still works (uses environment variables)  
✅ Future commits won't have this issue

