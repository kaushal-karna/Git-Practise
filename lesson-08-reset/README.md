# Lesson 08 — Reset

## 📖 Theory

`git reset` moves your branch pointer to a different commit, with 3 modes controlling what happens to the staging area and working directory:

| Mode | Moves HEAD/branch | Staging area | Working files |
|------|-------------------|---------------|----------------|
| `--soft` | ✅ yes | ❌ untouched (stays staged) | ❌ untouched |
| `--mixed` (default) | ✅ yes | ✅ reset (unstaged) | ❌ untouched |
| `--hard` | ✅ yes | ✅ reset | ✅ **reset — changes LOST** |

- **`--soft`**: undo a commit but keep everything staged, ready to re-commit differently.
- **`--mixed`**: undo commit AND unstage, but keep the file edits in your working directory.
- **`--hard`**: ⚠️ **destructive** — throws away commits AND working directory changes. Use with caution.
- Unlike `revert`, `reset` **rewrites history** — never use `--hard` reset on commits already pushed and shared.
- `git reflog` is your safety net: even after a `--hard` reset, the old commit is usually recoverable for a while.

## 💻 Important Commands

```bash
git reset --soft <commit>     # move pointer back, keep changes staged
git reset --mixed <commit>     # move pointer back, unstage changes (default mode)
git reset <commit>              # same as --mixed
git reset --hard <commit>        # move pointer back, DISCARD all changes (dangerous!)
git reset HEAD~1                  # undo last commit (mixed mode)
git reset --hard HEAD             # discard ALL uncommitted local changes
git reflog                          # recover "lost" commits after a hard reset
```

## 🛠️ Practice

```bash
mkdir lesson-08-reset && cd lesson-08-reset
git init
echo "v1" > file.txt && git add . && git commit -m "v1"
echo "v2" > file.txt && git add . && git commit -m "v2"
echo "v3" > file.txt && git add . && git commit -m "v3"
git log --oneline

# --soft: undo last commit, keep changes staged
git reset --soft HEAD~1
git status              # file.txt shows as staged with v3's content
git commit -m "v3 again"   # re-commit if you want

# --mixed: undo commit, unstage (but file keeps the content)
git reset HEAD~1
git status               # file.txt shows as MODIFIED, not staged
cat file.txt               # content is still there

# --hard: DANGER ZONE — try only after understanding the risk
git add . && git commit -m "v3 restored"
git reset --hard HEAD~1     # this DELETES the v3 commit AND its file content
cat file.txt                  # back to v2, v3 content is gone from working dir too

# recover it anyway using reflog!
git reflog
git reset --hard <hash-from-reflog-that-had-v3>
cat file.txt                  # v3 is back!
```

### ✅ Checkpoint
- [ ] You can explain the difference between `--soft`, `--mixed`, `--hard` in one line each.
- [ ] You've done a `--hard` reset and then recovered using `reflog`.
- [ ] You know reset rewrites history and shouldn't be used on shared commits.

➡️ Next: [lesson-09-cherry-pick](../lesson-09-cherry-pick)
