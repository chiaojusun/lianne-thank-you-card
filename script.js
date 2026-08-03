const page = document.documentElement;
const stage = document.querySelector("[data-card-stage]");
const openButton = document.querySelector("[data-open-card]");
const letter = document.querySelector(".unfolded-letter");
const closeButton = document.querySelector("[data-close-letter]");
let closeTimer;

function openCard() {
  window.clearTimeout(closeTimer);
  stage.classList.remove("is-closing");
  letter.removeAttribute("inert");
  letter.setAttribute("aria-hidden", "false");
  stage.classList.add("is-open");
  document.body.classList.add("content-visible");
  document.body.classList.add("is-letter-open");
  openButton.textContent = "Card opened";
  openButton.setAttribute("aria-pressed", "true");

  window.setTimeout(() => {
    stage.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 450);
}

function closeCard() {
  window.clearTimeout(closeTimer);
  stage.classList.add("is-closing");
  stage.classList.remove("is-open");
  openButton.textContent = "Open the card";
  openButton.setAttribute("aria-pressed", "false");

  closeTimer = window.setTimeout(() => {
    document.body.classList.remove("content-visible");
    document.body.classList.remove("is-letter-open");
    stage.classList.remove("is-closing");
    letter.setAttribute("aria-hidden", "true");
    letter.setAttribute("inert", "");
    openButton.focus({ preventScroll: true });
  }, 950);
}

openButton.addEventListener("click", openCard);
closeButton.addEventListener("click", closeCard);

openButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openCard();
  }
});

page.classList.add("js-ready");
