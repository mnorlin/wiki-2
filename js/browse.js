import lcgParams from "./config/lcg-params.js";
import { toPercent, fromPercent } from "/js/utils/calculations.js";
import getTransitionTime from "/js/utils/css.js";
import Book from "./book.js";
const templateImage = '<div class="wiki-image-wrapper"><wiki-image></wiki-image></div>';

const timeout = 1500;
let loading = false;
const templateText = (idSuffix = 0) => `
<div class="wiki-text-wrapper">
  <wiki-bookmark default-title="Untitled bookmark">
    <input id="bookmark-checkbox-${idSuffix}" type="checkbox" />
    <label aria-label="Bookmarked" for="bookmark-checkbox-${idSuffix}"></label>
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

const pageZero = `
<div style="white-space: normal; font-family: Helvetica, sans-serif">
  <div aria-hidden="true" style="margin: 4% auto 0 auto; width: 7rem">
    <svg
      style="fill-rule: evenodd"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 239 239"
    >
      <path
        d="M119.5+9C58.4725+8.99998+9+58.4725+9+119.5C9+180.527+58.4725+230+119.5+230C180.527+230+230+180.527+230+119.5C230+58.4725+180.527+9+119.5+9ZM119.5+6.6103e-06C185.498+6.6103e-06+239+53.502+239+119.5C239+185.498+185.498+239+119.5+239C53.502+239+0+185.498+0+119.5C0+53.502+53.502+3.70007e-05+119.5+6.6103e-06Z"
        opacity="1"
        fill="currentcolor"
      ></path>
      <path
        d="M119.625+18C104.537+18+90.277+21.3764+77.4062+27.2813L77.4062+153.219C77.4063+153.763+77.5984+153.958+77.75+154.188L119.625+102.438L161.5+154.188C161.652+153.958+161.844+153.763+161.844+153.219L161.844+27.2813C148.973+21.3764+134.713+18+119.625+18Z"
        opacity="1"
        fill="var(--bookmark-bookmarked)"
      ></path>
    </svg>
  </div>
  <h1 style="text-align: center; font-size: 4rem; margin-top: 2.67rem; margin-bottom: 1rem">
    Wiki 2.0
  </h1>
  <p style="text-align: center; font-size: 1rem">
    Everything ever written, everything that will be written, exists in this wiki.<br />
    With its 9×10<sup>11 589</sup> pages, the wiki is complete, all you need to do is find the
    right page...
  </p>
</div>`;

const worker = new Worker("/js/content-generator.js", {
  type: "module",
});

const book = new Book(0, lcgParams.m, 2, { timeout, missingPagesCallback: createPages });

worker.onmessage = ({ data }) => {
  const front = createFrontPage(data.pageNumber > 0n ? data : { pageNumber: 0n, text: pageZero });
  const back = createBackPage(data);

  book.insertPage(data.pageNumber, { front, back });
  setPage(book.current);
};

function createPages(missingPages) {
  missingPages.forEach((p) => {
    worker.postMessage(p);
  });
}

worker.postMessage(currentPage());
setPage(currentPage());

function createBackPage({ image }) {
  const back = document.createElement("div");
  back.classList.add("page-back");
  back.innerHTML = templateImage;
  back.querySelector(`wiki-image`).image = image;
  return back;
}

function createFrontPage({ pageNumber, text }, isSafe = false) {
  const hlight = decodeURIComponent(new URLSearchParams(window.location.search).get("highlight") || "");

  const front = document.createElement("div");
  front.classList.add("page-front");

  front.innerHTML = templateText(pageNumber);

  front.querySelector(`wiki-text`).setAttribute("highlight", hlight || "");
  front.querySelector(`wiki-text`).content = text;
  front.querySelector(`wiki-bookmark`).update();

  front.querySelector(".page-number").value = pageNumber;
  front.querySelector(".page-number").addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      const newPage = BigInt(e.target.value);
      window.location.hash = newPage;
      document.querySelector(".cover").classList.add("loading");
      setTimeout(() => {
        book.reset(newPage);
        worker.postMessage(newPage);
      }, 500);

      setPage(newPage);
    }
  });

  setTimeout(() => {
    // TODO: Why timeout needed?
    front.querySelector(`wiki-bookmark`).bookmarked || pageNumber === 0n
      ? front.querySelector(`wiki-text`).setAttribute("unsafe", "")
      : front.querySelector(`wiki-text`).removeAttribute("unsafe");
  });

  return front;
}

function setPage(pageNumber) {
  document.querySelector("#progress-percentage").textContent = `${toPercent(pageNumber)} %`;
  document.querySelector("wiki-range").value = toPercent(pageNumber);
  document.querySelectorAll(".page-turner button").forEach((b) => {
    b.disabled = pageNumber + BigInt(b.dataset.modifier) < 0 || pageNumber + BigInt(b.dataset.modifier) > lcgParams.m;
  });
  document.querySelectorAll("wiki-bookmark").forEach((b) => {
    b.update();
  });
}

document.querySelectorAll(".page-turner button").forEach((b) => {
  b.addEventListener("click", (e) => {
    if (!loading) {
      const modifier = parseInt(e.target.dataset.modifier);
      window.location.hash = currentPage() + BigInt(modifier);
      book.turnPage(modifier);
      loading = true;
      setTimeout(() => (loading = false), timeout);
    }
  });
});

document.querySelector("wiki-range").addEventListener("input", (e) => {
  const newPage = fromPercent(e.target.value);
  window.location.hash = newPage;
  document.querySelector(".cover").classList.add("loading");
  setTimeout(() => {
    book.reset(newPage);
    worker.postMessage(newPage);
  }, 500);

  setPage(newPage);
});

function currentPage() {
  return validPageNumber(window.location.hash.slice(1));
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
