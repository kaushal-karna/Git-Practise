# Lesson 07 — Merge

## 📖 Theory

- `git merge <branch>` combines the history of another branch into your current branch.
- **Fast-forward merge**: if your current branch hasn't diverged (no new commits since the other branch started), Git just moves the pointer forward — no new commit created.
- **3-way merge**: if both branches have new commits, Git creates a special **merge commit** with **two parents**, combining both histories.
- **Merge conflict**: happens when the same lines were changed differently on both branches — Git pauses and marks the file with conflict markers for you to resolve manually.
- Conflict markers look like:
  ```
  <<<<<<< HEAD
  your current branch's version
  =======
  the other branch's version
  >>>>>>> feature-branch
  ```

## 💻 Important Commands

```bash
git merge <branch>              # merge <branch> into your current branch
git merge --no-ff <branch>       # force a merge commit even if fast-forward is possible
git merge --abort                 # cancel a merge that has conflicts
git status                         # while resolving conflicts, shows which files need attention
git add <file>                      # mark a conflict as resolved (after editing it)
git commit                           # finalize the merge commit after resolving
git log --oneline --graph --all       # visualize merge commits (look for commits with 2 parents)
```

## 🛠️ Practice

```bash
mkdir lesson-07-merge && cd lesson-07-merge
git init
echo "line1" > file.txt && git add . && git commit -m "Initial commit"

git switch -c feature
echo "feature line" >> file.txt && git add . && git commit -m "Feature change"

git switch main
git merge feature                # fast-forward merge, no conflict here
git log --oneline --graph --all

# Now let's force a REAL conflict
git switch -c branch-a
echo "Branch A version" > conflict.txt && git add . && git commit -m "A's version"

git switch main
echo "Main's version" > conflict.txt && git add . && git commit -m "Main's version"

git merge branch-a               # CONFLICT!
cat conflict.txt                    # see the <<<<<<< ======= >>>>>>> markers

# Fix it manually: open conflict.txt, keep the lines you want, remove markers
echo "Resolved: combined version" > conflict.txt
git add conflict.txt
git commit -m "Merge branch-a, resolve conflict"
```

### ✅ Checkpoint
- [ ] You've completed one fast-forward merge and one 3-way merge.
- [ ] You've manually resolved a real conflict and understood the markers.
- [ ] You can spot a merge commit in `git log --graph` (it has 2 parent lines).

➡️ Next: [lesson-08-reset](../lesson-08-reset)
