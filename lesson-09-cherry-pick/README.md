# Lesson 09 — Cherry-pick

## 📖 Theory

- `git cherry-pick <commit>` copies **one specific commit** from another branch and applies it onto your current branch — as a brand-new commit (new hash), without needing the whole branch merged.
- Great for: pulling a single bugfix from a feature branch into `main` without dragging in unfinished work.
- Can cause conflicts just like merge/rebase if the surrounding code differs — resolve, then `git add` + `cherry-pick --continue`.
- `git cherry-pick A B C` or `A..C` can pick multiple/a range of commits at once.

## 💻 Important Commands

```bash
git cherry-pick <commit-hash>          # apply that one commit onto current branch
git cherry-pick <hash1> <hash2>          # cherry-pick multiple specific commits
git cherry-pick <hashA>..<hashC>          # cherry-pick a range (exclusive of hashA)
git cherry-pick --continue                 # after resolving a conflict
git cherry-pick --abort                      # cancel an in-progress cherry-pick
git cherry-pick -n <commit>                    # apply changes but don't auto-commit (--no-commit)
```

## 🛠️ Practice

```bash
mkdir lesson-09-cherry-pick && cd lesson-09-cherry-pick
git init
echo "base" > app.txt && git add . && git commit -m "base commit"

git switch -c feature
echo "feature work" >> app.txt && git add . && git commit -m "WIP feature work"
echo "IMPORTANT bugfix" >> app.txt && git add . && git commit -m "Fix critical bug"
echo "more unfinished work" >> app.txt && git add . && git commit -m "more WIP"

git log --oneline               # copy the hash of "Fix critical bug"

git switch main
git cherry-pick <hash-of-bugfix-commit>

git log --oneline                # main now has base + the bugfix ONLY, not the WIP commits
cat app.txt                        # only "base" + "IMPORTANT bugfix" lines present
```

### ✅ Checkpoint
- [ ] You've pulled a single commit from one branch into another without merging everything.
- [ ] You noticed the cherry-picked commit got a NEW hash on `main`.
- [ ] You can describe a real scenario where cherry-pick is the right tool vs merge.

➡️ Next: [lesson-10-remote](../lesson-10-remote)
