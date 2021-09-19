const template = `
<slot>
  <input type="checkbox" />
  <input type="text" />
</slot>
`;

class WikiBookmark extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).innerHTML = template;

    this.target = document.querySelector(this.getAttribute("target"));
    this.handleSlotChange(this.shadowRoot.querySelector("slot"));
    this.shadowRoot.querySelector("slot").addEventListener("slotchange", (e) => this.handleSlotChange(e.target));
  }

  handleSlotChange(slot) {
    const nodes = slot.assignedNodes({ flatten: true });

    nodes.forEach((node) => {
      if (node.type === "checkbox") {
        this.checkbox = node;
        this.checkbox.onchange = this.handleCheckboxChange.bind(this);
      }

      if (node.type === "text") {
        this.textInput = node;
        node.onkeyup = (e) => {
          this.bookmarked = e.target.value;
        };
      }
    });

    this.update();
  }

  handleCheckboxChange() {
    if (this.checkbox.checked) {
      const defaultTitle = this.getAttribute("default-title");
      this.bookmarked = defaultTitle || document.title;
    } else {
      this.bookmarked = undefined;
    }
    this.checkbox.blur();
  }

  get bookmarked() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    const bookmark = bookmarks?.find((bookmark) => bookmark.path === this.getPath());
    return bookmark ? bookmark?.title || "" : undefined;
  }

  set bookmarked(title) {
    const bookmarks =
      JSON.parse(localStorage.getItem("bookmarks"))?.filter((bookmark) => bookmark.path !== this.getPath()) || [];

    if (title !== undefined) {
      bookmarks.push({
        title: title,
        path: this.getPath(),
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

  set hardUrl(path) {
    this.path = path;
    this.update();
  }

  getPath() {
    const currentPath = new URLSearchParams(window.location.search).get("path") || "/";
    return this.path || currentPath + window.location.hash;
  }
}

customElements.define("wiki-bookmark", WikiBookmark);
