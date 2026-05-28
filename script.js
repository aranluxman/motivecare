const reviewLink = document.querySelector("[data-review-count-link]");
const reviews = document.querySelector("#reviews");

reviewLink?.addEventListener("click", () => {
  if (!reviews) return;
  reviews.setAttribute("tabindex", "-1");
  window.setTimeout(() => reviews.focus({ preventScroll: true }), 250);
});
