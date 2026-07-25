# Lesson 10 — Remotes (GitHub / GitLab)

## 📖 Theory

- A **remote** is a version of your repository hosted elsewhere (e.g., GitHub) — the default remote name is `origin`.
- `git clone` copies a remote repo to your machine, automatically setting up `origin`.
- `git fetch` downloads new commits from the remote **without** merging them into your work — safe to run anytime.
- `git pull` = `git fetch` + `git merge` (or `+ rebase` if configured) — brings remote changes into your current branch immediately.
- `git push` uploads your local commits to the remote branch.
- **Upstream tracking**: once a local branch is linked to a remote branch (`git push -u origin main`), plain `git push` / `git pull` know where to go.
- HTTPS vs SSH remotes: HTTPS asks for username/token, SSH uses a key pair (no password prompts once set up).

## 💻 Important Commands

```bash
git clone <url>                   # copy a remote repo locally
git remote -v                       # list remotes and their URLs
git remote add origin <url>          # link a local repo to a remote
git remote remove origin              # unlink a remote
git fetch origin                        # download new commits, don't merge
git pull origin main                     # fetch + merge from remote main
git push origin main                      # upload local commits to remote main
git push -u origin main                    # push AND set upstream tracking (do this once)
git push                                     # (after -u) push without specifying remote/branch
git branch -r                                 # list remote-tracking branches
git branch -vv                                 # see which local branch tracks which remote branch
```

## 🛠️ Practice

```bash
# 1. Create a repo on GitHub first (empty, no README), copy its URL

mkdir lesson-10-remote && cd lesson-10-remote
git init
echo "# My Project" > README.md
git add . && git commit -m "Initial commit"

git remote add origin https://github.com/<your-username>/<repo-name>.git
git remote -v                     # confirm it's linked

git branch -M main                 # ensure branch is named "main"
git push -u origin main              # first push, sets upstream

# make a change and push again (now simpler)
echo "more content" >> README.md
git add . && git commit -m "Update README"
git push

# simulate pulling teammate changes: edit the file on GitHub's web UI, then:
git pull origin main
```

### ✅ Checkpoint
- [ ] You've pushed a local repo to GitHub successfully.
- [ ] You understand `fetch` vs `pull`.
- [ ] You know what `-u` does and why you only need it once per branch.

➡️ Final step: [lesson-11-visualizer](../lesson-11-visualizer) — build the capstone graphical Git visualizer!
