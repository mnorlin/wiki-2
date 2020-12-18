import { slice, length, base64ToString } from "/js/utils/strings.js";

class WikiContent extends HTMLElement {
  static get observedAttributes() {
    return ["unsafe", "highlight", "trim"];
  }

  constructor() {
    super();
    this.unsafe = this.hasAttribute("unsafe");
    this.highlight = base64ToString(this.getAttribute("highlight") || "");
    this.trim = Number(this.getAttribute("trim"));

    this.fallbackContent = this.innerHTML;
    this._content = this.innerHTML;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "unsafe":
        this.unsafe = newValue !== null ? true : false;
        break;
      case "highlight":
        this.highlight = base64ToString(newValue || "");
        break;
      case "trim":
        this.trim = Number(newValue);
        break;
    }

    this.content = this._content;
  }

  set content(content) {
    if (!content) {
      content = this.fallbackContent;
    }
    this._content = content;

    const trimmed = this.getTrimmedContent(content);

    if (this.unsafe && !this.trim && !this.highlight) {
      this.innerHTML = trimmed.join(this.highlight ? `<mark>${sanitizeHTML(this.highlight)}</mark>` : "");

      this.querySelectorAll("script").forEach((n) => {
        eval(n.innerText);
      });
    } else {
      this.innerHTML = trimmed
        .map((t) => sanitizeHTML(t))
        .join(this.highlight ? `<mark>${sanitizeHTML(this.highlight)}</mark>` : "");
    }
  }

  get content() {
    return this._content;
  }

  getTrimmedContent(content) {
    if (!this.highlight) {
      return [content];
    }

    const trimmed = content.split(this.highlight);

    if (!this.trim || length(content) < this.trim) {
      return trimmed;
    }

    if (length(this.highlight) > this.trim) {
      return [slice(this.highlight, 0, this.trim)];
    }

    const middle = length(this.highlight) / 2;
    const center = length(trimmed[0]) + middle;

    if (this.trim > 2 * center) {
      return slice(trimmed.join(this.highlight), 0, this.trim).split(this.highlight);
    }

    return slice(trimmed.join(this.highlight), center - this.trim / 2, center + this.trim / 2).split(this.highlight);
  }
}

function sanitizeHTML(str) {
  const temp = document.createElement("div");
  temp.innerText = str;
  return temp.innerHTML;
}

window.customElements.define("wiki-content", WikiContent);
