import lcgParams from "./config/lcg-params.js";
import { toPercent, fromPercent } from "/js/utils/calculations.js";
import getTransitionTime from "/js/utils/css.js";

const worker = new Worker("/js/content-generator.js", {
  type: "module",
});

let firstView = true;

worker.onmessage = (e) => {
  setTimeout(() => {
    document.querySelectorAll(".transition").forEach((n) => {
      n.remove();
    });
    const hlight = decodeURIComponent(new URLSearchParams(window.location.search).get("highlight") || "");
    document.querySelector("wiki-content").setAttribute("highlight", hlight || "");
    document.querySelector("wiki-content").content = e.data.content;
    document.querySelector("wiki-bookmark").update();
    document.querySelector("wiki-bookmark").bookmarked || e.data.pageNumber === 0n
      ? document.querySelector("wiki-content").setAttribute("unsafe", "")
      : document.querySelector("wiki-content").removeAttribute("unsafe");
    document.querySelector("wiki-content").classList.remove("fade-out");
    document.querySelector("wiki-content").classList.add("fade-in");
    if (!firstView) document.querySelector(".page-turner").scrollIntoView({ block: "nearest" });
  }, getTransitionTime("long"));
};

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
    document.querySelector("wiki-content").classList.remove("fade-in");
    document.querySelector("wiki-content").classList.add("fade-out");
  }

  if (firstLoad && updateHistory) {
    history.replaceState({ pageNumber }, null);
  } else if (updateHistory) {
    firstView = false;
    history.pushState({ pageNumber }, null, `/page/${pageNumber}`);
  }

  const transition = document.createElement("div");
  transition.classList.add("transition");
  document.querySelector(".page").appendChild(transition);
  worker.postMessage(pageNumber);

  document.querySelector("#page-number").value = pageNumber;
  document.querySelector("#progress-percentage").textContent = `${toPercent(pageNumber)} %`;
  document.querySelector("wiki-range").value = toPercent(pageNumber);
  document.querySelectorAll(".page-turner button").forEach((b) => {
    b.disabled = pageNumber + BigInt(b.dataset.modifier) < 0 || pageNumber + BigInt(b.dataset.modifier) > lcgParams.m;
  });
}

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
