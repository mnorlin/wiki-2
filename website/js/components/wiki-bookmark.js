class WikiBookmark extends HTMLElement {
  constructor() {
    super();

    this.target = document.querySelector(this.getAttribute("target"));
    this.checkbox = this.querySelector("input[type=checkbox]");
    this.textInput = this.querySelector("input[type=text]");
    this.update();

    const defaultTitle = this.getAttribute("default-title");

    this.checkbox.addEventListener("change", () => {
      if (this.checkbox.checked) {
        this.bookmarked = defaultTitle || document.title;
      } else {
        this.bookmarked = undefined;
      }
      this.checkbox.blur();
    });

    this.textInput?.addEventListener("keyup", (e) => {
      this.bookmarked = e.target.value;
    });
  }

  get bookmarked() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    const bookmark = bookmarks?.find((bookmark) => bookmark.path === window.location.pathname);

    return bookmark ? bookmark?.title || "" : undefined;
  }

  set bookmarked(title) {
    const bookmarks =
      JSON.parse(localStorage.getItem("bookmarks"))?.filter((bookmark) => bookmark.path !== window.location.pathname) ||
      [];

    if (title !== undefined) {
      bookmarks.push({
        title: title,
        path: window.location.pathname,
      });
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    this.update();
  }

  update() {
    if (this.textInput) {
      this.textInput.value = this.bookmarked || "";
      this.textInput.disabled = this.bookmarked === undefined ? true : false;
    }

    this.checkbox.checked = this.bookmarked !== undefined ? true : false;
    this.bookmarked !== undefined ? this.setAttribute("bookmarked", "") : this.removeAttribute("bookmarked");
  }
}

customElements.define("wiki-bookmark", WikiBookmark);
