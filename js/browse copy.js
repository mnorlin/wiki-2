import lcgParams from "./config/lcg-params.js";
import { toPercent, fromPercent } from "/js/utils/calculations.js";
import getTransitionTime from "/js/utils/css.js";
import Book from "book.js";
const templateImage = '<div class="wiki-image-wrapper"><wiki-image></wiki-image></div>';

const templateText = `
<div class="wiki-text-wrapper">
  <wiki-bookmark default-title="Untitled bookmark">
    <input id="bookmark-checkbox" type="checkbox" />
    <label aria-label="Bookmarked" for="bookmark-checkbox"></label>
    <input aria-label="Bookmark title" type="text" />
  </wiki-bookmark>
  
  <wiki-text role="article"></wiki-text>
  
  <div class="page-number-wrapper">
    <input class="page-number" aria-label="Page number" type="text" />
  </div>
</div>`;

const templatePage = `
<div class="page" style="z-index: 0;">
  <div class="page-front"></div>
  <div class="page-back"></div>
</div>`;

const worker = new Worker("/js/content-generator.js", {
  type: "module",
});

//worker.postMessage(currentPage() - 1n);
worker.postMessage(currentPage());
//worker.postMessage(currentPage() + 1n);

worker.onmessage = (e) => {
  insertPage(e.data);
};

function insertPage(data, flipped = false) {
  const page = document.createElement("div");
  page.classList.add("page");

  const front = createFrontPage(data);
  const back = createBackPage(data);

  if (flipped) {
    page.classList.add("flipped");
  }

  page.appendChild(back);
  page.appendChild(front);

  document.querySelector(".cover").prepend(page);
}

function createBackPage({ image }) {
  const back = document.createElement("div");
  back.classList.add("page-back");
  back.innerHTML = templateImage;
  back.querySelector(`wiki-image`).image = image;
  return back;
}

function createFrontPage({ pageNumber, text }) {
  const hlight = decodeURIComponent(new URLSearchParams(window.location.search).get("highlight") || "");

  const front = document.createElement("div");
  front.classList.add("page-front");

  front.innerHTML = templateText;

  front.querySelector(`wiki-text`).setAttribute("highlight", hlight || "");
  front.querySelector(`wiki-text`).content = text;
  front.querySelector(`wiki-bookmark`).update();

  front.querySelector(`wiki-bookmark`).bookmarked || pageNumber === 0n
    ? front.querySelector(`wiki-text`).setAttribute("unsafe", "")
    : front.querySelector(`wiki-text`).removeAttribute("unsafe");

  return front;
}

document.querySelectorAll(".page-turner button").forEach((b) => {
  b.addEventListener("click", (e) => {
    const modifier = parseInt(e.target.dataset.modifier);
    turnPage(currentPage() + BigInt(modifier), modifier);
  });
});

function turnPage(pageNumber, modifier) {
  history.pushState({ pageNumber }, null, `/page/${pageNumber}`);

  const leftPage = document.querySelector(".flipped");
  const rightPages = document.querySelectorAll(".page:not(.flipped)");

  const flipping = modifier < 0 ? leftPage : rightPages[rightPages.length - 1];

  flipping.style.zIndex = 1;
  flipping.classList.add("flipping");

  if (modifier > 0) {
    flipping.nextElementSibling?.classList.add("hide");
  } else {
    flipping.previousElementSibling?.classList.add("hide");
    flipping.nextElementSibling?.classList.remove("hide");
  }

  setTimeout(() => {
    for (const flipped of document.querySelectorAll(".flipped:not(.flipping)")) {
      const newZIndex = flipped.style.zIndex - modifier;
      flipped.style.zIndex = newZIndex > 0 ? 0 : newZIndex;
    }
    flipping.style.zIndex = 0;
    flipping.classList.remove("flipping");
    modifier < 0 ? flipping.classList.remove("flipped") : flipping.classList.add("flipped");
  }, 1000);

  worker.postMessage(pageNumber);
  deletePages();
}

function deletePages() {
  const next = document.querySelectorAll(".page:not(.flipped)");
  const prev = document.querySelectorAll(".page.flipped");

  for (let i = 0; next.length - i > 3; i++) {
    next.item(i).remove();
  }

  for (let i = prev.length - 1; i > 3; i--) {
    prev.item(i).remove();
  }
}
/*


updatePage(currentPage(), true);

document.querySelector("#menu-bar [href='/page']").classList.add("active");

window.addEventListener("popstate", (e) => {
  updatePage(e.state.pageNumber, false, false);
});

document.querySelector("#page-number").addEventListener("keypress", (e) => {
  if (e.keyCode == 13) updatePage(e.target.value);
});

document.querySelectorAll(".page-turner button").forEach((b) => {
  b.addEventListener("click", (e) => {
    updatePage(currentPage() + BigInt(e.target.dataset.modifier));
  });
});

document.querySelector("wiki-range").addEventListener("input", (e) => {
  updatePage(fromPercent(e.target.value));
});

function updatePage(pageNumber, firstLoad = false, updateHistory = true) {
  pageNumber = validPageNumber(pageNumber);

  if (!firstLoad) {
    document.querySelector("wiki-text").classList.remove("fade-in");
    document.querySelector("wiki-text").classList.add("fade-out");
  }

  if (firstLoad && updateHistory) {
    history.replaceState({ pageNumber }, null);
  } else if (updateHistory) {
    firstView = false;
    history.pushState({ pageNumber }, null, `/page/${pageNumber}`);
  }

  const transition = document.createElement("div");
  transition.classList.add("transition");
  document.querySelector(".page-right").appendChild(transition);
  worker.postMessage(pageNumber);

  document.querySelector("#page-number").value = pageNumber;
  document.querySelector("#progress-percentage").textContent = `${toPercent(pageNumber)} %`;
  document.querySelector("wiki-range").value = toPercent(pageNumber);
  document.querySelectorAll(".page-turner button").forEach((b) => {
    b.disabled = pageNumber + BigInt(b.dataset.modifier) < 0 || pageNumber + BigInt(b.dataset.modifier) > lcgParams.m;
  });
}
*/
function currentPage() {
  return validPageNumber(window.location.pathname.split("/page/").pop());
}

function validPageNumber(page) {
  try {
    const pageNumber = BigInt(page);
    if (pageNumber > lcgParams.m) {
      return lcgParams.m;
    }

    return pageNumber;
  } catch {
    return 0n;
  }
}
