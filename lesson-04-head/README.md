# Lesson 04 — HEAD & References

## 📖 Theory

- **HEAD** is a pointer to *"where you currently are"* — almost always it points to a branch, and that branch points to a commit.
- Normal state: `HEAD → main → commit abc123`
- **Detached HEAD**: HEAD points directly to a commit (not a branch). You can look around and even make commits, but they won't belong to any branch and can get lost after you switch away — unless you create a branch from that point.
- References (`refs`) are just human-friendly names for commit hashes: branches, tags, and HEAD are all refs.
- Shortcuts: `HEAD~1` = one commit before HEAD, `HEAD~2` = two before, `HEAD^` = parent commit, `HEAD^2` = second parent (for merge commits).

## 💻 Important Commands

```bash
cat .git/HEAD                 # see literally what HEAD points to
git rev-parse HEAD             # show current commit hash
git log -1                      # show current HEAD commit details
git checkout <commit-hash>       # enter detached HEAD at that commit
git checkout -b <new-branch>      # save detached HEAD work by branching from here
git switch main                    # return to a branch (leaves detached HEAD)
git reflog                          # history of every place HEAD has pointed to (lifesaver!)
```

## 🛠️ Practice

```bash
mkdir lesson-04-head && cd lesson-04-head
git init
echo "v1" > file.txt && git add . && git commit -m "v1"
echo "v2" > file.txt && git add . && git commit -m "v2"
echo "v3" > file.txt && git add . && git commit -m "v3"

git log --oneline          # note the 3 commit hashes

cat .git/HEAD               # shows: ref: refs/heads/main

# Detach HEAD by checking out an old commit directly
git checkout HEAD~2         # go back 2 commits (to "v1")
cat .git/HEAD                 # now shows a raw commit hash, not a branch name!
cat file.txt                   # shows "v1"

git switch main                 # go back to normal, attached HEAD
cat file.txt                      # back to "v3"

git reflog                          # see every HEAD movement you've made
```

### ✅ Checkpoint
- [ ] You've seen `.git/HEAD` change between a branch ref and a raw hash.
- [ ] You can explain detached HEAD and why it's risky without a new branch.
- [ ] You've used `git reflog` at least once.

➡️ Next: [lesson-05-revert](../lesson-05-revert)
