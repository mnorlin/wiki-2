import { slice, length, stringToBase64 } from "/js/utils/strings.js";
import { toPercent } from "/js/utils/calculations.js";
import getTransitionTime from "/js/utils/css.js";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector("textarea").value;
  if (!searchTerm) {
    return;
  }
  window.location.href =
    window.location.origin + "/search/" + encodeURIComponent(Array.from(searchTerm).slice(0, 3000).join(""));
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

  for (let i = 0; i < 6; i++) {
    workerGenerate.onmessage = (e) => {
      workerSearch.postMessage(buildWrappedResult(currentSearchTerm(), e.data.content));
    };

    workerGenerate.postMessage(BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
  }
}

function generateResult(content, searchTerm, pageNumber) {
  const results = document.querySelector("#search-results");
  const result = document.createElement("div");
  result.classList.add("result");
  const highlight = stringToBase64(searchTerm);

  result.innerHTML = `
    <div>
      <p class="result-breadcrumb">
        <a href="/">Wiki 2.0</a> ›
        <a href="/page">Page</a> ›
        <a href="${content === searchTerm ? `/link/${highlight}` : `/page/${pageNumber}`}">
          ${toPercent(pageNumber)} %
        </a>
      </p>
      <a
        class="result-link"
        href="/page/${pageNumber}?highlight=${encodeURIComponent(highlight)}"
      >
        Page: ${pageNumber.toString().slice(0, 40)}...
      </a>
      <wiki-content class="result-snippet" highlight="${highlight}" trim="300">
        ${content}
      </wiki-content>
    </div>
    
    <div aria-hidden="true">
      <wiki-content class="content" highlight="${highlight}">
        ${content}
      </wiki-content>
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
  return decodeURIComponent(window.location.pathname.split("/search/")?.[1] || "");
}

function buildWrappedResult(searchTerm, randomContent) {
  const trimmed = slice(randomContent, 0, length(randomContent) - length(searchTerm));

  const cutPos = Math.floor(Math.random() * length(trimmed));
  return [slice(trimmed, cutPos), searchTerm, slice(trimmed, 0, cutPos)].join("");
}
