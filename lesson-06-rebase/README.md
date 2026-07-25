# Lesson 06 — Rebase

## 📖 Theory

- `git rebase` moves/replays a branch's commits **on top of** another branch's tip — result is a straight, linear history (no merge-bubble commit).
- Rebase **rewrites commit hashes** — every replayed commit becomes a brand-new commit. This is why the golden rule is: **never rebase commits that are already pushed/shared with others.**
- **Interactive rebase** (`-i`) lets you edit history: reorder, squash (combine), reword, or drop commits.
- Merge vs Rebase: `merge` preserves true history with a merge commit; `rebase` rewrites history to look like it happened in a straight line.

## 💻 Important Commands

```bash
git rebase <branch>              # replay current branch's commits on top of <branch>
git rebase -i HEAD~3               # interactively edit the last 3 commits
git rebase --continue                # after fixing a conflict during rebase
git rebase --abort                    # cancel the rebase, go back to pre-rebase state
git rebase --skip                      # skip the current problematic commit
```

### Interactive rebase actions (inside the editor)
```
pick   = keep commit as-is
reword = keep changes, edit the commit message
edit   = pause here to amend the commit
squash = merge this commit INTO the previous one (keep both messages)
fixup  = merge into previous one, DISCARD this message
drop   = delete this commit entirely
```

## 🛠️ Practice

```bash
mkdir lesson-06-rebase && cd lesson-06-rebase
git init
echo "a" > file.txt && git add . && git commit -m "commit A"

git switch -c feature
echo "b" >> file.txt && git add . && git commit -m "commit B"
echo "c" >> file.txt && git add . && git commit -m "commit C"

git switch main
echo "main-update" >> readme.md && git add . && git commit -m "main moved forward"

git switch feature
git rebase main               # replay B and C on top of main's new commit

git log --oneline --graph --all    # notice: straight line, no merge bubble

# Try squashing B and C into one commit
git rebase -i HEAD~2           # change "pick" to "squash" for the 2nd commit, save & close
git log --oneline               # now B and C are combined into one commit
```

### ✅ Checkpoint
- [ ] You've rebased `feature` onto an updated `main` and seen a linear graph.
- [ ] You've squashed two commits into one with interactive rebase.
- [ ] You can state the golden rule of rebase from memory.

➡️ Next: [lesson-07-merge](../lesson-07-merge)
