# Lesson 01 — Git Init & Basics

## 📖 Theory

- **Git** is a *distributed version control system* — it tracks changes to
  files over time.
- `git init` creates a hidden `.git` folder → this folder **is** the repository
  (all history, branches, config lives here).
- Deleting `.git` = deleting all Git history (files themselves stay, just
  untracked).
- `git status` tells you the current state: what's tracked, untracked, staged, modified.
- `git config` sets settings at 3 levels (highest priority first):
  1. `--local` → this repo only (`.git/config`)
  2. `--global` → this user, all repos (`~/.gitconfig`)
  3. `--system` → whole machine
- A file in Git can be in one of these states:
  **Untracked → Staged → Committed → Modified**.

## 💻 Important Commands

```bash
git init                        # initialize a new repo in current folder
git --version                   # check installed git version
git config --global user.name "Kaushal"
git config --global user.email "you@example.com"
git config --list               # view all config settings
git config --list --local       # view only this repo's config
git status                      # see current repo state
git status -s                   # short/compact status output
git help <command>              # built-in docs, e.g. git help init
```

## 🛠️ Practice

```bash
# 1. Create and enter a practice folder
mkdir lesson-01-init && cd lesson-01-init

# 2. Initialize git
git init

# 3. Check status (should say "nothing to commit")
git status

# 4. Look inside the hidden .git folder
ls -la .git

# 5. Create a file and see how status changes
echo "Hello Git" > hello.txt
git status
```

### ✅ Checkpoint

- [ ] You can explain the difference between `git init` and installing Git itself.
- [ ] `git status` shows `hello.txt` as **untracked**.
- [ ] You know where global config is stored (`~/.gitconfig`).

➡️ Next: [lesson-02-commits](../lesson-02-commits)
