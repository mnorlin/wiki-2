import { slice, length, stringToBase64 } from "/js/utils/strings.js";
import { toPercent } from "/js/utils/calculations.js";
import getTransitionTime from "/js/utils/css.js";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector("textarea").value;
  if (!searchTerm) {
    return;
  }
  window.location.href = window.location.origin + "/?page=/search&q=" + encodeURIComponent(slice(searchTerm, 0, 3000));
});

if (currentSearchTerm()) {
  const workerSearch = new Worker("/js/content-finder.js", {
    type: "module",
  });

  workerSearch.onmessage = (e) => {
    const { searchString, pageNumber } = e.data;
    generateResult(searchString, currentSearchTerm(), pageNumber);
  };

  workerSearch.postMessage(currentSearchTerm());

  document.querySelector("textarea").value = currentSearchTerm();

  const workerGenerate = new Worker("/js/content-generator.js", {
    type: "module",
  });

  for (let i = 0; i < 4; i++) {
    workerGenerate.onmessage = (e) => {
      workerSearch.postMessage(buildWrappedResult(currentSearchTerm(), e.data.text));
    };

    workerGenerate.postMessage(BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
  }
}

function generateResult(content, searchTerm, pageNumber) {
  const results = document.querySelector("#search-results");
  const result = document.createElement("div");
  const encoded = stringToBase64(searchTerm);
  result.classList.add("result");
  const highlight = length(searchTerm) < 500 ? encoded : "";

  result.innerHTML = `
    <div>
      <a
        class="result-link"
        href="/?page=/browse?highlight=${encodeURIComponent(highlight)}#${pageNumber}"
      >
        ${content === searchTerm ? "Exact match" : "Nested match"}
      </a>
      <nav class="result-breadcrumb">
        <a href="/">Wiki 2.0</a> ›
        <a href="/?page=/browse">Page</a> ›
        <a href="${content === searchTerm ? `/?page=/link#${encoded}` : `/?page=/browse#${pageNumber}`}">
          ${toPercent(pageNumber)} %
        </a>
      </nav>
      <wiki-text class="result-snippet" highlight="${highlight}" trim="300">${content}</wiki-text>
    </div>
    
    <div aria-hidden="true">
      <div class="result-page">
        <wiki-text highlight="${highlight}">${content}</wiki-text>
      </div>
      <div class="track">
        <div
          class="progress"
          style="width: 0%">
        </div>
      </div>
    </div>
  `;

  results.appendChild(result);
  setTimeout(() => {
    result.querySelector(".progress").style.setProperty("width", `${toPercent(pageNumber)}%`);
  }, getTransitionTime("medium"));
}

function currentSearchTerm() {
  return decodeURIComponent(new URLSearchParams(window.location.search).get("q") || "");
}

function buildWrappedResult(searchTerm, randomContent) {
  const wrapperLength = length(randomContent) - length(searchTerm);
  const trimmed = wrapperLength > 0 ? slice(randomContent, 0, wrapperLength) : slice(randomContent, 0, 3);

  const cutPos = Math.floor(Math.random() * length(trimmed));
  return [slice(trimmed, 0, cutPos), searchTerm, slice(trimmed, cutPos)].join("");
}
