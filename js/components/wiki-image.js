import { slice, length, base64ToString } from "/js/utils/strings.js";
const scale = 3;

class WikiImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "<canvas></canvas>";
    this.canvas = this.shadowRoot.querySelector("canvas");

    // These are to prevent a bug that container background disappear on 0px canvas;
    this.canvas.height = 200;
    this.canvas.width = 200;
    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = `rgba(0,0,0,0)`;
    ctx.fillRect(0, 0, 1, 1);
  }

  set image(image) {
    if (image.length < 1 || image[0].length < 1) return;
    const ctx = this.canvas.getContext("2d");
    this.canvas.height = image.length * scale;
    this.canvas.width = image[0].length * scale;

    for (let row = 0; row < image.length; row++) {
      const imageRow = image[row];

      for (let col = 0; col < imageRow.length; col++) {
        ctx.fillStyle = `rgb(${imageRow[col].r}, ${imageRow[col].g}, ${imageRow[col].b})`;
        ctx.fillRect(row * scale, col * scale, scale, scale);
      }
    }
  }
}

customElements.define("wiki-image", WikiImage);
