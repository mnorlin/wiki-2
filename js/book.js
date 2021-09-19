import { sortBigInt } from "./utils/calculations.js";

export default class Book {
  constructor(min, max, buffer, options = { timeout: 0, missingPagesCallback: () => {} }) {
    this.min = min;
    this.max = max;
    this.buffer = BigInt(buffer);
    this.timeout = options.timeout;
    this.requestPages = options.missingPagesCallback;
    this.pages = [];
    this.requestedPages = [];
  }

  turnPage(modifier) {
    const leftPage = document.querySelector(".flipped");
    const rightPages = document.querySelectorAll(".page:not(.flipped)");

    const flipping = modifier < 0 ? leftPage : rightPages[rightPages.length - 1];
    flipping.style.zIndex = 0;
    flipping.classList.add("flipping");
    if (modifier > 0) {
      flipping.previousElementSibling?.classList.remove("shadow");
      flipping.nextElementSibling?.classList.add("shadow");
    } else {
      flipping.previousElementSibling?.classList.add("shadow");
      flipping.nextElementSibling?.classList.remove("shadow");
    }

    setTimeout(() => {
      for (const flipped of document.querySelectorAll(".flipped:not(.flipping)")) {
        const newZIndex = flipped.style.zIndex - modifier;
        flipped.style.zIndex = newZIndex > 0 ? 0 : newZIndex;
      }
      flipping.classList.remove("flipping");
      if (modifier < 0) {
        flipping.style.zIndex = 0;
        flipping.classList.remove("flipped");
      } else {
        flipping.style.zIndex = -1;
        flipping.classList.add("flipped");
      }
    }, this.timeout);

    this.currentPage = this.currentPage + BigInt(modifier);
    const isMissing = this.updatePages();
    this.requestPages(isMissing);
  }

  updatePages(currentPage = this.currentPage) {
    const newPages = [];

    for (let i = currentPage - this.buffer; i < currentPage; i++) {
      newPages.push(i);
    }

    for (let i = currentPage; i <= currentPage + this.buffer; i++) {
      newPages.push(i);
    }

    const toDelete = this.pages.filter((page) => !newPages.includes(page));
    const isMissing = newPages.filter((page) => !this.pages.includes(page));
    const toRequest = isMissing.filter((p) => !this.requestedPages.includes(p));
    this.requestedPages.push(...toRequest);

    toDelete.forEach((pageToDelete) => {
      const node = document.querySelector([`[data-page='${pageToDelete}']`]);
      node?.remove();
      this.pages = this.pages.filter((page) => page !== pageToDelete);
    });

    return toRequest;
  }

  insertPage(pageNumber, page) {
    this.requestedPages = this.requestedPages.filter((p) => p !== pageNumber);

    const pageDiv = document.createElement("div");
    pageDiv.classList.add("page");
    pageDiv.classList.add("shadow");
    pageDiv.dataset.page = pageNumber;

    pageDiv.appendChild(page.back);
    pageDiv.appendChild(page.front);
    pageDiv.querySelector("wiki-bookmark").hardUrl = `/?page=/browse#${pageNumber}`;

    if (this.pages.length === 0 || pageNumber + 1n === this.currentPage) {
      pageDiv.classList.remove("shadow");
    }

    const insertEnd = this.pages.every((page) => page < pageNumber);
    const insertStart = this.pages.every((page) => page > pageNumber);
    if (this.pages.length === 0) {
      document.querySelector(".pages-wrapper").prepend(pageDiv); // TODO
      this.currentPage = pageNumber;
    } else if (insertEnd) {
      const sibling = document.querySelector([`[data-page='${this.pages.slice(-1)}']`]);
      sibling.insertAdjacentElement("beforebegin", pageDiv);
    } else if (insertStart) {
      const sibling = document.querySelector([`[data-page='${this.pages.slice(0, 1)}']`]);
      pageDiv.style.zIndex = Math.min(sibling.style.zIndex - 1, parseInt(pageNumber - this.currentPage));
      pageDiv.classList.add("flipped");
      sibling.insertAdjacentElement("afterend", pageDiv);
    } else {
      const flipped = pageNumber < this.currentPage;
      for (let i = pageNumber + 1n; i <= this.pages.slice(-1); i++) {
        const sibling = document.querySelector([`[data-page='${i}']`]);
        if (sibling) {
          if (flipped) {
            pageDiv.style.zIndex = parseInt(pageNumber - this.currentPage);
            pageDiv.classList.add("flipped");
          }
          sibling.insertAdjacentElement("afterend", pageDiv);
          break;
        }
      }
    }
    this.pages.push(pageNumber);

    this.pages.sort(sortBigInt);

    if (this.pages.length === 1) {
      this.requestPages(this.updatePages());
    }

    if (pageNumber === this.currentPage - 1n) {
      document.querySelector(".cover").classList.remove("loading");
      document.querySelector(".cover").classList.add("loading-done");
    }
  }

  reset(newPage) {
    this.pages.forEach((page) => {
      document.querySelector(`[data-page='${page}']`)?.remove();
    });
    this.pages = [];
    this.currentPage = newPage;
  }

  get current() {
    return this.currentPage;
  }

  previousPage() {}
}
