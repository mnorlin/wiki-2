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
    // We assume "box-sizing: border-box;"
    this.style.height = "1px";
    const scrollHeight = `${this.scrollHeight}px`;
    const borderTopWidth = window.getComputedStyle(this).getPropertyValue("border-top-width");
    const borderBottomWidth = window.getComputedStyle(this).getPropertyValue("border-bottom-width");
    this.style.height = `calc(${scrollHeight} + ${borderTopWidth} + ${borderBottomWidth})`;
  }
}

customElements.define("wiki-textarea", WikiTextArea, { extends: "textarea" });
