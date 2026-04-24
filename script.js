// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// Close modal + stop media (YouTube/video)
function closeModal(modal) {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  modal.querySelectorAll("video").forEach((v) => {
    v.pause();
    v.currentTime = 0;
  });

  modal.querySelectorAll("iframe").forEach((frame) => {
    const src = frame.getAttribute("src");
    frame.setAttribute("src", src);
  });
}

// Click handlers for project cards
document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

// Close handlers
document.querySelectorAll(".modal [data-close]").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

// Click outside modal box closes it
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// ESC closes any open modal
window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".modal[aria-hidden='false']").forEach((m) => closeModal(m));
});

// Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".section-reveal").forEach((el) => revealObserver.observe(el));

// Active nav link based on current section
const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(document.querySelectorAll(".links a"));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -50% 0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => sectionObserver.observe(section));
