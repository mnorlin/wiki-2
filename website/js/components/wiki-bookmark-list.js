class WikiBookmarkList extends HTMLUListElement {
  constructor() {
    super();

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const links = this.querySelectorAll("li a");
    const defaultBookmarks = [];
    links.forEach((link) => {
      const title = link.innerText.trim();
      const path = link.getAttribute("href");
      defaultBookmarks.push({ title, path });
    });

    defaultBookmarks.forEach((d) => {
      const exists = bookmarks.find((bookmark) => bookmark.path === d.path);
      if (!exists) {
        bookmarks.push(d);
      }
    });

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    bookmarks.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));

    bookmarks
      .filter((bookmark) => !defaultBookmarks.find((d) => bookmark.path === d.path))
      .forEach((bookmark) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", bookmark.path);
        a.innerText = bookmark.title || "Untitled bookmark";
        li.appendChild(a);
        this.appendChild(li);
      });
  }
}
customElements.define("wiki-bookmark-list", WikiBookmarkList, {
  extends: "ul",
});
