# Quick Guide: Remove ENV_SETUP.md from Commit 1609c849

## Goal
Remove `ENV_SETUP.md` from commit `1609c84987480d5fd867610adb92145a2a710e99` to fix GitHub push protection.

## Method 1: If Commit is HEAD (Most Recent)

```powershell
# Remove file from commit
git rm --cached ENV_SETUP.md
git commit --amend --no-edit

# Push
git push --force-with-lease origin dev
```

## Method 2: If Commit is in the Middle

```powershell
# 1. Find how many commits back
git log --oneline -10

# 2. Start interactive rebase (replace N with number)
git rebase -i HEAD~N

# 3. In editor: Change 'pick' to 'edit' for commit 1609c849
# 4. Save and close

# 5. Remove the file
git rm --cached ENV_SETUP.md
git commit --amend --no-edit
git rebase --continue

# 6. Push
git push --force-with-lease origin dev
```

## Method 3: Remove from ALL Commits (Nuclear Option)

```powershell
# Remove file from entire history
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ENV_SETUP.md" HEAD

# Push
git push --force-with-lease origin dev
```

## Automated Script

```powershell
.\remove-file-from-commit.ps1
```

Or specify the commit:

```powershell
.\remove-file-from-commit.ps1 -CommitHash "1609c84987480d5fd867610adb92145a2a710e99" -FilePath "ENV_SETUP.md"
```

## Verification

After removal, verify:

```powershell
# Check if file exists in that commit (should fail)
git show 1609c84987480d5fd867610adb92145a2a710e99:ENV_SETUP.md

# Check git log (should not show the file)
git log --all --full-history -- ENV_SETUP.md
```

## Important Notes

- ✅ File is NOT needed for project to run (it's just documentation)
- ⚠️ This rewrites git history
- ⚠️ Use `--force-with-lease` for safer push
- ⚠️ Coordinate with team before force pushing

