(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  let lessonId = params.get("id");

  // 👉 Default to first lesson if no id provided
  if (!lessonId) {
    lessonId = "01";
    // Update the URL so navigation stays consistent
    window.history.replaceState({}, "", `lesson.html?id=${lessonId}`);
  }

  // Load lesson data
  fetch("../data/lesson.json")
    .then((res) => res.json())
    .then((data) => {
      const lesson = data[lessonId];
      if (!lesson) {
        document.getElementById("lesson-title").textContent = "Lesson not found";
        return;
      }
      console.log("lesson.js loaded and running");

      // Populate lesson content
      document.getElementById("lesson-title").textContent = lesson.title;
      document.getElementById("lesson-theory").innerHTML = lesson.theory;
      document.getElementById("lesson-commands").innerHTML = lesson.commands
        .map(
          (cmd) => `
          <pre><code>${cmd}</code>
            <button class="btn btn-primary btn-sm" onclick="copyCommand('${cmd}')">
              <i class="fa-regular fa-copy"></i> Copy
            </button>
          </pre>`
        )
        .join("");
      document.getElementById("lesson-examples").innerHTML = lesson.examples
        .map((ex) => `<p>${ex}</p>`)
        .join("");
      document.getElementById("lesson-notes").innerHTML = lesson.notes
        .map((note) => `<li>${note}</li>`)
        .join("");

      // ✅ Load README.md dynamically
      console.log("Fetching README from:", lesson.readme);
      fetch(lesson.readme)
        .then((res) => {
          console.log("Fetch response:", res.status, res.statusText);
          if (!res.ok) throw new Error("README not found");
          return res.text();
        })
        .then((md) => {
          console.log("README content length:", md.length);
          const target = document.getElementById("lesson-readme");
          if (!target) {
            console.error("lesson-readme element not found in HTML!");
          } else {
            target.innerHTML = marked.parse(md);
            console.log("README injected successfully");
          }
        })
        .catch((err) => {
          console.error("README fetch error:", err);
          const target = document.getElementById("lesson-readme");
          if (target) {
            target.textContent = "README could not be loaded.";
          }
        });

      // Navigation buttons
      const prevBtn = document.getElementById("prev-btn");
      const nextBtn = document.getElementById("next-btn");
      const prevId = String(parseInt(lessonId) - 1).padStart(2, "0");
      const nextId = String(parseInt(lessonId) + 1).padStart(2, "0");

      prevBtn.onclick = () => (window.location.href = `lesson.html?id=${prevId}`);
      nextBtn.onclick = () => (window.location.href = `lesson.html?id=${nextId}`);

      // Progress tracking
      markLessonComplete(lessonId);
      updateProgress();

      // Highlight current lesson in dropdown menu
      const currentLink = document.querySelector(`#lessonMenu li a[href*="id=${lessonId}"]`);
      if (currentLink) {
        currentLink.style.fontWeight = "700";
        currentLink.style.color = "var(--primary)";
      }
    });

  // Copy command function
  window.copyCommand = function (cmd) {
    navigator.clipboard.writeText(cmd).then(() => {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = `Copied: ${cmd}`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  };

  /* ---------- Progress tracking ---------- */
  function markLessonComplete(id) {
    let completed = JSON.parse(localStorage.getItem("git-learn-progress") || "[]");
    if (!completed.includes(id)) {
      completed.push(id);
      localStorage.setItem("git-learn-progress", JSON.stringify(completed));
    }
  }

  function updateProgress() {
    const completed = JSON.parse(localStorage.getItem("git-learn-progress") || "[]");
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
      const percent = Math.round((completed.length / 12) * 100);
      progressBar.style.width = percent + "%";
      progressBar.textContent = percent + "%";
    }
  }

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
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Collapsible sections ---------- */
  document.querySelectorAll(".section-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });

  /* ---------- Dropdown Lessons Menu ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("lessonMenuToggle");
    const menu = document.getElementById("lessonMenu");

    if (toggleBtn && menu) {
      toggleBtn.addEventListener("click", () => {
        menu.classList.toggle("show");
      });

      document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && e.target !== toggleBtn) {
          menu.classList.remove("show");
        }
      });
    }
  });
})();
