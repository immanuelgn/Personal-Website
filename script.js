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


// Contact form AJAX submit (no redirect page)
const contactForm = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("contact-submit");

if (contactForm) {
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/ignanaseelan04@gmail.com";

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("contact-email")?.value.trim() || "";
    const message = document.getElementById("contact-message")?.value.trim() || "";

    if (!email || !message) {
      if (statusEl) statusEl.textContent = "Please fill in your email and message.";
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (statusEl) statusEl.textContent = "Sending...";

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          message,
          _subject: "New Portfolio Contact Form Message",
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json();
      if (res.ok && data?.success === "true") {
        if (statusEl) statusEl.textContent = "Message sent. Thanks for reaching out.";
        contactForm.reset();
      } else {
        throw new Error("Submit failed");
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = "Could not send from browser. Please email me directly at ignanaseelan04@gmail.com.";
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
