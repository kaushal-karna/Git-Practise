# 🌱 Git-Practice — A Complete Git Learning Path

Welcome! This repository is a **hands-on, lesson-by-lesson Git course** — from
`git init` to rebasing, cherry-picking, and remotes, ending with a **graphical
Git visualizer** you can open in a browser.

Built by **[Kaushal](https://github.com/kaushal-karna)** — BSc.CSIT,
Tribhuvan University.

> 📌 Each lesson = **Theory (short, point-to-point) + Important Commands +
> Hands-on Practice**.
> Do NOT just read — actually run the commands in a terminal/VS Code.

---

## 🗂️ Course Roadmap

| # | Lesson | Concept |
| --- | -------- | --------- |
| 01 | [lesson-01-init](./lesson-01-init) | Git basics, `init`, `config`, `status` |
| 02 | [lesson-02-commits](./lesson-02-commits) | Staging area, commits, `log`, `diff` |
| 03 | [lesson-03-branches](./lesson-03-branches) | Branching model, create/switch/delete |
| 04 | [lesson-04-head](./lesson-04-head) | HEAD, refs, detached HEAD |
| 05 | [lesson-05-revert](./lesson-05-revert) | Safely undoing commits with `revert` |
| 06 | [lesson-06-rebase](./lesson-06-rebase) | Linear history, interactive rebase |
| 07 | [lesson-07-merge](./lesson-07-merge) | Fast-forward vs 3-way merge, conflicts |
| 08 | [lesson-08-reset](./lesson-08-reset) | `--soft` / `--mixed` / `--hard` reset |
| 09 | [lesson-09-cherry-pick](./lesson-09-cherry-pick) | Picking specific commits across branches |
| 10 | [lesson-10-remote](./lesson-10-remote) | `remote`, `push`, `pull`, `fetch`, `clone` |
| 11 | [lesson-11-visualizer](./lesson-11-visualizer) | 🎨 Graphical Git visualizer (mid-course project) |
| 12 | [lesson-12-github-workflow](./lesson-12-github-workflow) | Forks, Pull Requests, merge strategies, GitHub Actions (CI) |

---

## 🎯 How to use this repo

1. Clone it:

   ```bash
   git clone https://github.com/kaushal-karna/Git-Practice.git
   cd Git-Practice
   ```

2. Go into a lesson folder, open its `README.md`, read the theory.
3. **Practice inside that same folder** — most lessons tell you to run `git init`
   right there, so each lesson folder becomes its own mini sandbox repo.
4. Move to the next lesson only after you've typed (not copy-pasted) every
   command at least once.

---

## 🧰 Prerequisites

- Install Git → <https://git-scm.com/downloads>
- Verify install:

  ```bash
  git --version
  ```

- Set your identity (once, globally):

  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
  ```

---

## 🧠 Core Mental Model (read this before anything else)

Git has **4 areas** your files move through:

```text
Working Directory  →  Staging Area (Index)  →  Local Repository  →  Remote Repository
   (edit files)          (git add)               (git commit)          (git push)
```

- **Working Directory** — the actual files you see and edit.
- **Staging Area / Index** — a draft list of changes you're preparing to commit.
- **Local Repository** — the `.git` folder; permanent snapshots (commits) live here.
- **Remote Repository** — a copy hosted elsewhere (GitHub, GitLab, etc.).

Keep this diagram in your head — every command in this course moves data
between these four boxes.

---

## 📜 License

Free to use, fork, and share for learning. Attribution appreciated. ⭐ Star the
repo if it helped you!
