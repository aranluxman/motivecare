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
