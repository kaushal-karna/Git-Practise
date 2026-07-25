# Lesson 02 — Staging & Commits

## 📖 Theory

- **Staging (`git add`)** = telling Git *"include this exact version of the file in my next snapshot."*
- **Commit (`git commit`)** = a permanent snapshot of the staged files + a message + a unique SHA-1 hash ID.
- Every commit stores: a snapshot of the project, the author, timestamp, message, and a pointer to its **parent commit** — this chain of parents forms your history.
- A good commit message has a short summary line (≤50 chars) + optional blank line + details.
- `git diff` shows changes **not yet staged**. `git diff --staged` shows changes staged but **not yet committed**.
- `git log` walks the commit chain from HEAD backwards.

## 💻 Important Commands

```bash
git add <file>              # stage a specific file
git add .                   # stage everything in current folder
git add -p                  # stage interactively, chunk by chunk (patch mode)
git commit -m "message"     # commit staged changes with a message
git commit -am "message"    # add + commit tracked (already-known) files in one step
git status                  # see staged vs unstaged changes
git diff                    # unstaged changes
git diff --staged           # staged changes not yet committed
git log                     # full commit history
git log --oneline           # compact, one line per commit
git log --oneline --graph --all   # visual branch graph
git show <commit-hash>      # see exact contents of one commit
```

## 🛠️ Practice

```bash
mkdir lesson-02-commits && cd lesson-02-commits
git init

echo "line 1" > notes.txt
git status                  # untracked

git add notes.txt
git status                  # staged (green)

git commit -m "Add notes.txt with first line"

# make a change
echo "line 2" >> notes.txt
git diff                    # see the unstaged change

git add notes.txt
git diff --staged           # same change, now staged

git commit -m "Add second line to notes.txt"

git log --oneline           # see both commits
```

### ✅ Checkpoint
- [ ] You can explain staging vs committing in one sentence each.
- [ ] `git log --oneline` shows 2 commits with short hashes.
- [ ] You've used `git diff` and `git diff --staged` and seen the difference.

➡️ Next: [lesson-03-branches](../lesson-03-branches)
