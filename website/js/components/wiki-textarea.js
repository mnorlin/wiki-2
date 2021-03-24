class WikiTextArea extends HTMLTextAreaElement {
  constructor() {
    super();

    this.updateHeight();

    this.addEventListener("input", () => {
      this.updateHeight();
    });
  }

  set value(value) {
    super.value = value;
    this.updateHeight();
  }

  get value() {
    return super.value;
  }

  updateHeight() {
    this.style.height = "1px";
    this.style.height = `${this.scrollHeight}px`;
  }
}

customElements.define("wiki-textarea", WikiTextArea, { extends: "textarea" });
