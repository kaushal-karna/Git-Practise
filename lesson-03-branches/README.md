# Lesson 03 — Branches

## 📖 Theory

- A **branch** is just a movable pointer (label) to a specific commit — lightweight, not a copy of files.
- Default branch is usually `main` (older repos: `master`).
- Branching lets you develop features/fixes in isolation without touching stable code.
- `git switch` (modern) / `git checkout` (classic) moves you to a different branch, updating your working directory.
- Deleting a branch just removes the pointer — commits stay alive if another branch/tag references them (else they become "dangling" and are garbage-collected later).

## 💻 Important Commands

```bash
git branch                      # list local branches (current one has *)
git branch <name>                # create a new branch (doesn't switch to it)
git switch <name>                 # switch to an existing branch (modern)
git switch -c <name>               # create AND switch in one step
git checkout <name>                # older way to switch branches
git checkout -b <name>              # older way to create+switch
git branch -d <name>                # delete a branch (safe, blocks if unmerged)
git branch -D <name>                # force delete (even if unmerged)
git branch -m <old> <new>            # rename a branch
git branch -vv                        # branches with last commit + tracking info
```

## 🛠️ Practice

```bash
mkdir lesson-03-branches && cd lesson-03-branches
git init
echo "main content" > app.txt
git add . && git commit -m "Initial commit on main"

# create and switch to a feature branch
git switch -c feature-login
echo "login logic" >> app.txt
git add . && git commit -m "Add login feature"

# go back to main — notice app.txt changes!
git switch main
cat app.txt          # login logic is GONE here — it only exists on feature-login

git switch feature-login
cat app.txt          # it's back

git branch            # see both branches, * marks current
git log --oneline --graph --all    # visualize both branch histories

# cleanup practice
git switch main
git branch -d feature-login   # will fail if not merged — that's expected, try -D to force
```

### ✅ Checkpoint
- [ ] You understand a branch is a pointer, NOT a folder copy.
- [ ] You've watched `app.txt` change content just by switching branches.
- [ ] You know the difference between `-d` and `-D`.

➡️ Next: [lesson-04-head](../lesson-04-head)
