class MenuLinks extends HTMLElement {
  constructor() {
    super();

    const menuItems = this.querySelectorAll("a");
    const rootUrl = new URLSearchParams(window.location.search).get("path") || "/browse";

    menuItems.forEach((item) => {
      if (item && !item.href.includes("#")) {
        if (rootUrl !== "" && item.href.includes(rootUrl)) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  customElements.define("wiki-menu", MenuLinks, { extends: "nav" });
});
