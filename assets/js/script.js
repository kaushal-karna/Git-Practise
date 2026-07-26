/* ======================================================
   git.learn — script.js
   ====================================================== */
(() => {
  "use strict";

  /* ---------- Lesson data ---------- */
  const LESSONS = [
    { n: 1, title: "Introduction to Git", level: "beginner", time: "20 min" },
    { n: 2, title: "Installing Git", level: "beginner", time: "15 min" },
    { n: 3, title: "Git Init", level: "beginner", time: "25 min" },
    { n: 4, title: "Making Commits", level: "beginner", time: "30 min" },
    { n: 5, title: "Branching", level: "intermediate", time: "35 min" },
    { n: 6, title: "Merging", level: "intermediate", time: "40 min" },
    {
      n: 7,
      title: "Working with Remotes",
      level: "intermediate",
      time: "30 min",
    },
    { n: 8, title: "GitHub Basics", level: "intermediate", time: "35 min" },
    { n: 9, title: "Rebase", level: "advanced", time: "45 min" },
    { n: 10, title: "Cherry-pick", level: "advanced", time: "30 min" },
    { n: 11, title: "Git Internals", level: "advanced", time: "50 min" },
    { n: 12, title: "GitHub Workflow", level: "advanced", time: "55 min" },
  ];

  const pad = (num) => String(num).padStart(2, "0");

  /* ---------- Render lesson cards ---------- */
  const grid = document.getElementById("lessonGrid");
  const noResults = document.getElementById("noResults");

  function renderLessons() {
    grid.innerHTML = LESSONS.map(
      (l) => `
      <a class="lesson-card reveal in" data-level="${l.level}" data-title="${l.title.toLowerCase()}"
         href="lessons/${pad(l.n)}-${l.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/index.html">
        <div class="lesson-top">
          <span class="lesson-num">Lesson ${pad(l.n)}</span>
          <span class="badge ${l.level}">${l.level}</span>
        </div>
        <h3>${l.title}</h3>
        <span class="lesson-time"><i class="fa-regular fa-clock"></i> ${l.time}</span>
        <span class="lesson-start">Start <i class="fa-solid fa-arrow-right"></i></span>
      </a>
    `,
    ).join("");
  }
  renderLessons();

  /* ---------- Filter + search ---------- */
  let activeFilter = "all";
  let searchTerm = "";

  function applyFilters() {
    const cards = grid.querySelectorAll(".lesson-card");
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesLevel =
        activeFilter === "all" || card.dataset.level === activeFilter;
      const matchesSearch =
        !searchTerm || card.dataset.title.includes(searchTerm);
      const show = matchesLevel && matchesSearch;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });
    noResults.hidden = visibleCount !== 0;
    return visibleCount;
  }

  document.getElementById("lessonFilters").addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    document
      .querySelectorAll(".filter-chip")
      .forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    applyFilters();
  });

  const searchInput = document.getElementById("searchInput");
  const searchHint = document.getElementById("searchHint");
  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    const count = applyFilters();
    searchHint.textContent = searchTerm
      ? `${count} result${count === 1 ? "" : "s"}`
      : "";
  });

  /* ---------- Search panel toggle ---------- */
  const searchToggle = document.getElementById("searchToggle");
  const searchPanel = document.getElementById("searchPanel");
  searchToggle.addEventListener("click", () => {
    searchPanel.classList.toggle("open");
    if (searchPanel.classList.contains("open")) {
      setTimeout(() => searchInput.focus(), 200);
    }
  });

  /* ---------- Mobile nav ---------- */
  const navBurger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  navBurger.addEventListener("click", () => {
    navBurger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navBurger.classList.remove("open");
      navLinks.classList.remove("open");
    }),
  );

  /* ---------- Theme toggle (persisted) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const root = document.documentElement;
  const favicon = document.getElementById("favicon");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {

  if (theme === 'light') {

    root.setAttribute('data-theme', 'light');

    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');

    favicon.href = "assets/images/favicon-light.png";

    themeColor.setAttribute("content", "#FFFFFF");

  } else {

    root.removeAttribute('data-theme');

    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');

    favicon.href = "assets/images/favicon-dark.png";

    themeColor.setAttribute("content", "#0F3D2E");

  }

  localStorage.setItem('git-learn-theme', theme);

}
  const savedTheme =
    localStorage.getItem("git-learn-theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark");
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(current === "light" ? "dark" : "light");
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = ["top", "lessons", "practice", "resources"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navAnchors = document.querySelectorAll("[data-nav]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove("active"));
          const match = document.querySelector(
            `[data-nav][href="#${entry.target.id}"]`,
          );
          if (match) match.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  /* ---------- Stat count-up ---------- */
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  document
    .querySelectorAll(".stat-num")
    .forEach((el) => statObserver.observe(el));

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("show", window.scrollY > 500);
    },
    { passive: true },
  );
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  /* ---------- Hero terminal typing effect ---------- */
  const terminalBody = document.getElementById("terminalBody");
  const script = [
    { type: "cmd", text: "git init" },
    {
      type: "out",
      text: "Initialized empty Git repository in ~/project/.git/",
    },
    { type: "cmd", text: "git add ." },
    { type: "cmd", text: 'git commit -m "first commit"' },
    {
      type: "out",
      text: "[main (root-commit) a1b2c3d] first commit\n 3 files changed, 42 insertions(+)",
    },
    { type: "cmd", text: "git push origin main" },
    {
      type: "out",
      text: "Enumerating objects: 5, done.\nWriting objects: 100% (5/5), done.",
    },
  ];

  function typeLine(text, el, speed, cb) {
    let i = 0;
    (function step() {
      el.textContent += text[i];
      i++;
      if (i < text.length) {
        setTimeout(step, speed);
      } else if (cb) {
        cb();
      }
    })();
  }

  function runTerminal(prefersReduced) {
    terminalBody.innerHTML = "";
    if (prefersReduced) {
      script.forEach((s) => {
        const line = document.createElement("span");
        line.className = "line " + (s.type === "cmd" ? "" : "out");
        line.textContent = (s.type === "cmd" ? "$ " : "") + s.text;
        terminalBody.appendChild(line);
      });
      return;
    }

    let idx = 0;
    function nextLine() {
      if (idx >= script.length) {
        const cursorLine = document.createElement("span");
        cursorLine.className = "line";
        cursorLine.innerHTML =
          '<span class="prompt">$</span> <span class="cursor"></span>';
        terminalBody.appendChild(cursorLine);
        return;
      }
      const s = script[idx];
      const line = document.createElement("span");
      line.className = "line" + (s.type === "out" ? " out" : "");
      terminalBody.appendChild(line);

      if (s.type === "cmd") {
        const prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "$ ";
        line.appendChild(prompt);
        const textSpan = document.createElement("span");
        line.appendChild(textSpan);
        typeLine(s.text, textSpan, 35, () => {
          idx++;
          setTimeout(nextLine, 350);
        });
      } else {
        line.textContent = s.text;
        idx++;
        setTimeout(nextLine, 500);
      }
    }
    nextLine();
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  runTerminal(reducedMotion);

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
