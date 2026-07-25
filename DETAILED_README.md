# Lesson 12 — GitHub Workflow: Forks, Pull Requests & Actions

> This lesson is about **GitHub the platform**, not Git the tool. Git works with any host (GitLab, Bitbucket, self-hosted) — these are GitHub-specific collaboration features built on top of plain Git.

## 📖 Theory

### 1. Fork vs Clone
- **Clone** = copy a repo to your *local machine*. You need write access to push back.
- **Fork** = copy a repo to *your own GitHub account*. Used when you **don't** have write access to the original ("upstream") repo — e.g. contributing to someone else's open-source project.
- Typical open-source flow: **Fork → Clone your fork → branch → commit → push to your fork → open a Pull Request to the original repo.**

### 2. Pull Request (PR)
- A PR is a request to merge changes from one branch (yours) into another (usually `main` of the original/upstream repo).
- A PR is **not a Git concept** — it's a GitHub feature: a conversation + diff viewer + CI checks + review workflow wrapped around a branch comparison.
- Good PR hygiene: small, focused changes; descriptive title; description explaining *what* and *why*; link related issues (`Closes #12`).
- Reviewers can comment inline, request changes, or approve. Once approved (and checks pass), it gets **merged**.
- **Merge strategies on GitHub:**
  - *Create a merge commit* — full history, like `git merge`.
  - *Squash and merge* — combines all PR commits into ONE commit on `main` (clean history).
  - *Rebase and merge* — replays PR commits individually onto `main`, no merge commit (linear history).

### 3. Keeping a fork in sync
- Your fork doesn't auto-update when the original repo changes. You add the original as a second remote (conventionally called `upstream`) and periodically pull from it.

### 4. GitHub Actions (CI/CD basics)
- **CI (Continuous Integration)** = automatically running tasks (tests, linters, builds) every time you push or open a PR.
- GitHub Actions defines this in a YAML file at `.github/workflows/<name>.yml`.
- A **workflow** is triggered by an **event** (push, pull_request, schedule...), runs one or more **jobs**, each made of ordered **steps** (checkout code, install deps, run tests).
- This is how professional repos guarantee: "if the checkmark is green, tests passed" before anyone merges.

## 💻 Important Commands

```bash
# --- Fork workflow ---
git clone https://github.com/<your-username>/<forked-repo>.git
cd <forked-repo>
git remote add upstream https://github.com/<original-owner>/<original-repo>.git
git remote -v                          # now shows both "origin" (your fork) and "upstream"

# sync your fork's main with the original repo
git fetch upstream
git switch main
git merge upstream/main                 # or: git rebase upstream/main
git push origin main                      # update your fork on GitHub

# --- Contributing ---
git switch -c fix-typo-readme
# ...make changes...
git add . && git commit -m "Fix typo in README"
git push -u origin fix-typo-readme
# then open a Pull Request on GitHub's website: your-fork:fix-typo-readme -> upstream:main

# --- Useful GitHub CLI (optional, if `gh` is installed) ---
gh repo fork <owner>/<repo> --clone       # fork + clone in one command
gh pr create --fill                        # open a PR from current branch
gh pr list                                  # list open PRs
gh pr checkout <number>                      # check out someone else's PR locally
gh pr merge <number> --squash                 # merge a PR from the terminal
```

## 🛠️ Practice

### Part A — Simulate the fork + PR flow using two local folders (no GitHub account needed to practice the mechanics)

```bash
# Simulate "upstream" (the original project, owned by someone else)
mkdir upstream-repo && cd upstream-repo
git init
echo "# Shared Project" > README.md
git add . && git commit -m "Initial commit"
cd ..

# Simulate "your fork" (a clone acting as your own copy)
git clone upstream-repo my-fork
cd my-fork
git remote rename origin upstream        # pretend this clone IS your fork,
git remote add origin ../my-fork           # and this is where you'd push (your GitHub fork)
git remote -v

# Make your contribution
git switch -c add-usage-section
echo -e "\n## Usage\nRun \`npm start\`." >> README.md
git add . && git commit -m "Add Usage section to README"

# In real GitHub: you'd push to origin (your fork) then open a PR into upstream/main.
# Practice the sync step instead — pretend upstream got new commits:
cd ../upstream-repo
echo "extra line from maintainer" >> README.md
git add . && git commit -m "Maintainer update"
cd ../my-fork

git fetch upstream
git switch main
git merge upstream/main         # your fork's main is now up to date
git log --oneline --all --graph
```

### Part B — Write your first GitHub Actions workflow

Create this file in your **actual Git-Practice repo** at `.github/workflows/hello.yml`:

```yaml
name: Hello CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Print a message
        run: echo "✅ Hello from GitHub Actions! Workflow triggered by ${{ github.event_name }}"
```

Commit and push it, then open the **Actions** tab on GitHub — you'll see this workflow run automatically and print your message in the logs.

### ✅ Checkpoint
- [ ] You can explain fork vs clone in one sentence each.
- [ ] You've simulated the fork → branch → sync-with-upstream flow.
- [ ] You know the difference between merge commit / squash / rebase merge strategies on a PR.
- [ ] You've added a working `.github/workflows/hello.yml` and watched it run in the Actions tab.

---

## 🎓 Course Complete!

You've now covered: `init`, `commit`, `branch`, `HEAD`, `revert`, `rebase`, `merge`, `reset`, `cherry-pick`, `remote`, a graphical visualizer, and the full GitHub collaboration workflow.

**Next steps:**
- Contribute a real fix to a beginner-friendly open-source repo (look for issues tagged `good first issue`).
- Add a badge to your main `README.md` showing your Actions build status.
- Go back through lessons 01–10 a second time, faster, without looking at the answers.

⬅️ Back to [main README](../README.md)
