# Lesson 05 — Undoing with `git revert`

## 📖 Theory

- `git revert` undoes a commit by creating a **new commit** that applies the *inverse* of the changes — history is preserved, nothing is deleted.
- Safe for **shared/public branches** because you never rewrite existing history (unlike `reset`/`rebase`).
- If the revert conflicts with later changes, Git pauses and asks you to resolve it, just like a merge conflict.
- `git revert <commit>` reverts one commit. A range or `--no-commit` lets you batch multiple reverts before committing.

## 💻 Important Commands

```bash
git revert <commit-hash>          # create a new commit that undoes that commit
git revert HEAD                    # undo the most recent commit
git revert HEAD~2                   # undo a specific older commit (creates new commit)
git revert --no-commit <hash>        # stage the revert but don't commit yet (batch several)
git revert --continue                 # after resolving a revert conflict
git revert --abort                     # cancel an in-progress revert
```

## 🛠️ Practice

```bash
mkdir lesson-05-revert && cd lesson-05-revert
git init
echo "safe code" > app.txt && git add . && git commit -m "Add safe code"
echo "buggy code" >> app.txt && git add . && git commit -m "Add buggy feature"

git log --oneline           # note the 2 commit hashes

# Undo the buggy commit WITHOUT deleting history
git revert HEAD

git log --oneline            # now 3 commits: original 2 + the new "Revert" commit
cat app.txt                   # buggy code line is gone from the file, but history remembers it existed
```

### ✅ Checkpoint
- [ ] You understand revert ADDS a commit rather than deleting one.
- [ ] You've confirmed with `git log --oneline` that history grew, not shrank.
- [ ] You know revert is the safe choice for already-pushed/shared commits.

➡️ Next: [lesson-06-rebase](../lesson-06-rebase)
