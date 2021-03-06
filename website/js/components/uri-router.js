class Router extends HTMLElement {
  constructor() {
    super();

    this.setAttribute("aria-hidden", "true");

    this.path = this.getAttribute("path");
    this.routes = document.querySelectorAll("uri-router");

    if (!window.location.pathname.startsWith(this.path)) {
      return;
    }

    this.updateView();
  }

  updateView() {
    const currentPath = window.location.pathname;

    for (let route of this.routes) {
      const otherPath = route.getAttribute("path");

      if (this.path != otherPath && otherPath.startsWith(this.path) && currentPath.startsWith(otherPath)) {
        this.setAttribute("aria-hidden", "true");
        return;
      }
    }

    this.setAttribute("aria-hidden", "false");
    this.appendChild(this.querySelector("template").content.cloneNode(true));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  customElements.define("uri-router", Router);
});
