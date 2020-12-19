class WikiTextArea extends HTMLTextAreaElement {
  constructor() {
    super();

    this.addEventListener("input", (e) => {
      this.style.height = "1px";
      this.style.height = `${this.scrollHeight}px`;
    });
  }

  set value(value) {
    super.value = value;
    this.style.height = `${this.scrollHeight}px`;
  }

  get value() {
    return super.value;
  }
}

customElements.define("wiki-textarea", WikiTextArea, { extends: "textarea" });
