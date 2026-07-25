# Lesson 11 — Capstone: Graphical Git Visualizer 🎨

## 📖 What this is

A **single-file HTML/CSS/JS app** (`index.html`) that simulates a Git repository in the browser. You type real Git commands into a terminal-style input box, and a live SVG commit graph draws itself — branches, merges, and HEAD movement, all animated as you go.

This is the **capstone project** for the whole course: everything you learned in lessons 01–10 (init, commit, branch, merge, checkout/switch) is reinforced visually here.

## 🧠 Why build this

- Reading about branches is one thing — **watching a branch pointer physically move** to a new commit makes it click.
- It's a genuinely useful teaching tool you can host on **GitHub Pages** and link from your profile so anyone can learn by playing with it — no terminal required.
- It's a real (if simplified) example of modeling a **DAG (Directed Acyclic Graph)** in JavaScript, which is exactly what Git itself is under the hood.

## 💻 Supported simulated commands

```bash
git init
git commit -m "message"
git branch [name]
git switch [-c] <name>
git checkout [-b] <name-or-hash>
git merge <branch>
git log
git status
git clear
git help
```

> This is a **teaching simulation**, not a real Git implementation — it models the commit graph and branch pointers so you can *see* the concepts, but it doesn't touch a real filesystem. Always practice the real commands too, using lessons 01–10.

## 🚀 How to run it

**Option A — locally:**
```bash
cd lesson-11-visualizer
open index.html      # macOS
start index.html      # Windows
xdg-open index.html    # Linux
```

**Option B — publish it for everyone (GitHub Pages):**
1. Push this whole `Git-Practice` repo to GitHub.
2. Go to **Settings → Pages** → set source to the `main` branch, root folder.
3. Your visualizer will be live at:
   `https://<your-username>.github.io/Git-Practice/lesson-11-visualizer/`
4. Put that link at the top of your main `README.md` so visitors can try it instantly.

## 🛠️ Ideas to extend it (great next practice project)

- [ ] Add `git rebase <branch>` — replay a branch's commits linearly.
- [ ] Add `git reset --soft/--mixed/--hard`.
- [ ] Add `git cherry-pick <hash>`.
- [ ] Add drag-to-pan / zoom on the SVG graph for big histories.
- [ ] Add a "replay mode" that steps through a pasted `git log` history automatically.
- [ ] Add light/dark theme toggle.

---
⭐ If you build on this, keep this README's structure so future learners can follow the same path you did.

➡️ Next: [lesson-12-github-workflow](../lesson-12-github-workflow) — forks, Pull Requests & GitHub Actions
