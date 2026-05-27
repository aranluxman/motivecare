// Replace with the shop's real inbox to receive contact-form messages.
const CONTACT_EMAIL = "info@motivecare.ca";

/* ── Mobile nav toggle ─────────────────────────────────────── */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

/* ── Reviews carousel ──────────────────────────────────────── */
const track = document.querySelector("[data-review-track]");
const previous = document.querySelector("[data-review-prev]");
const next = document.querySelector("[data-review-next]");

function scrollReviews(direction) {
  if (!track) return;
  const card = track.querySelector(".review-card");
  const distance = card ? card.getBoundingClientRect().width + 16 : 360;
  track.scrollBy({ left: direction * distance, behavior: "smooth" });
}

previous?.addEventListener("click", () => scrollReviews(-1));
next?.addEventListener("click", () => scrollReviews(1));

let reviewTimer = window.setInterval(() => {
  if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + 406, behavior: "smooth" });
}, 5200);

track?.addEventListener("pointerdown", () => {
  window.clearInterval(reviewTimer);
  reviewTimer = null;
});

/* ── Gallery lightbox ──────────────────────────────────────── */
const gallery = document.querySelector("[data-lightbox-gallery]");
const lightbox = document.querySelector("[data-lightbox]");

if (gallery && lightbox) {
  const lbImg = lightbox.querySelector("[data-lightbox-img]");
  const lbCaption = lightbox.querySelector("[data-lightbox-caption]");
  const lbClose = lightbox.querySelector("[data-lightbox-close]");
  const lbPrev = lightbox.querySelector("[data-lightbox-prev]");
  const lbNext = lightbox.querySelector("[data-lightbox-next]");
  const figures = Array.from(gallery.querySelectorAll(".photo-item"));
  let current = 0;

  function show(index) {
    current = (index + figures.length) % figures.length;
    const img = figures[current].querySelector("img");
    const caption = figures[current].querySelector("figcaption");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = caption ? caption.textContent : "";
  }

  function open(index) {
    show(index);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  figures.forEach((fig, index) => {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.addEventListener("click", () => open(index));
    fig.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(index);
      }
    });
  });

  lbClose?.addEventListener("click", close);
  lbPrev?.addEventListener("click", () => show(current - 1));
  lbNext?.addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
}

/* ── Contact form ──────────────────────────────────────────── */
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = (data.get("name") || "").toString().trim();
  const contact = (data.get("contact") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (!name || !contact || !message) {
    if (formStatus) formStatus.textContent = "Please fill in every field.";
    return;
  }

  const subject = encodeURIComponent(`Website enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone/Email: ${contact}\n\n${message}`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  if (formStatus) {
    formStatus.textContent = "Opening your email app… or call (905) 201-0087.";
  }
  contactForm.reset();
});
