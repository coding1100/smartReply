# Fix GitHub Push Protection Errors

## Quick Fix (If the problematic commit is the most recent)

Run these commands in PowerShell:

```powershell
# 1. Stage the fixed ENV_SETUP.md file
git add ENV_SETUP.md

# 2. Amend the last commit (this will fix commit 1609c84987480d5fd867610adb92145a2a710e99)
git commit --amend --no-edit

# 3. Force push with lease (safer than --force)
git push --force-with-lease origin dev
```

## Alternative: If the commit is not the most recent

If commit `1609c84987480d5fd867610adb92145a2a710e99` is not the most recent commit, use interactive rebase:

```powershell
# 1. Find how many commits back the problematic commit is
git log --oneline

# 2. Start interactive rebase (replace N with the number of commits)
git rebase -i HEAD~N

# 3. In the editor that opens:
#    - Find the line with commit 1609c849
#    - Change 'pick' to 'edit'
#    - Save and close

# 4. Stage the fixed file
git add ENV_SETUP.md

# 5. Amend the commit
git commit --amend --no-edit

# 6. Continue the rebase
git rebase --continue

# 7. Force push
git push --force-with-lease origin dev
```

## Automated Fix Script

You can also run the automated script:

```powershell
.\fix-git-secrets.ps1
```

## Verification

After fixing, verify no secrets remain in history:

```powershell
git log -p | Select-String -Pattern "234259137960|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"
```

If this returns nothing, the secrets have been removed.

## Important Notes

- ⚠️ **Force push rewrites history** - Make sure no one else has pulled the branch
- ✅ The file `ENV_SETUP.md` is already fixed in your working directory
- ✅ Your code functionality is preserved (it uses environment variables, not hardcoded values)

