const css = `
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }
  
  input:focus ~ [part="track"] {
    outline: 2px solid var(--outline-color, rgb(37, 96, 197));
    outline-offset: 0.3em;
  }
  
  [part="track"] {
    display: inline-block;
    width: 100%;
    box-shadow: 0 0 0 1px rgba(127, 127, 127, 0.5);
    border-radius: 1em;
    background-color: rgb(239, 239, 239);
  }
  
  [part="track"]:not(:active):hover {
    filter: brightness(95%);
  }
  
  [part="track"]:active [part="progress"] {
    filter: brightness(110%);
  }
  
  [part="track"]:active [part="thumb"] {
    filter: brightness(115%);
  }
  
  [part="progress"] {
    background-color: rgb(47, 117, 246);
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    height: 0.5em;
    position: relative;
  }
  
  #thumb-wrapper {
    position: absolute;
    right: 0;
    top: 0;
  }
  
  [part="thumb"] {
    width: 1em;
    height: 1em;
    border-radius: 1em;
    border: 1px solid transparent;
    background-color: rgb(47, 117, 246);
  }
`;

class WikiRange extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `<style>${css}</style>`;

    this.track = document.createElement("div");
    this.track.setAttribute("part", "track");
    this.track.innerHTML = `
      <div part="progress">
        <div id="thumb-wrapper">
          <div part="thumb"></div>
        </div>
      </div>
    `;

    this.input = this.removeChild(this.querySelector("input[type='range']"));
    this.input.setAttribute("part", "input");
    shadow.appendChild(this.input);
    shadow.appendChild(this.track);

    this.progress = shadow.querySelector("[part='progress']");
    this.thumbWrapper = shadow.querySelector("#thumb-wrapper");
    this.thumb = shadow.querySelector("[part='thumb']");

    this.max = this.input.max || 100;
    this.min = this.input.min || 0;

    this.updateProgress(this.value);

    this.track.addEventListener("mousedown", (e) => {
      this.value = this.calculateValue(e);
      this.down = true;
    });

    document.addEventListener("mouseup", (e) => {
      if (!this.down) {
        return;
      }
      this.down = false;
      const event = new Event("input");
      this.dispatchEvent(event);
      this.value = this.calculateValue(e);
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.down) {
        return;
      }
      this.value = this.calculateValue(e);
    });

    this.track.addEventListener("click", (e) => {
      const x = e.clientX - this.track.getBoundingClientRect().left;
      this.value = (x / this.track.offsetWidth) * 100;
    });

    this.input.addEventListener("input", (e) => {
      this.value = e.target.value;
      this.updateProgress();
    });

    this.input.addEventListener("change", (e) => {
      this.value = e.target.value;
      this.updateProgress();
    });
  }

  calculateValue(e) {
    const x = e.clientX - this.track.getBoundingClientRect().left;
    return (x / this.track.offsetWidth) * 100;
  }

  updateProgress() {
    const percentage = (this.value / (this.max - this.min)) * 100;

    this.progress.style.width = `${percentage}%`;
    this.thumbWrapper.style.top = this.track.clientHeight / 2 - this.thumb.offsetHeight / 2 + "px";
    this.thumbWrapper.style.right =
      -this.thumb.offsetWidth * (1 - percentage / 100) + (percentage / 100 < 0.5 ? 1 : -1) + "px";
  }

  set value(value) {
    this.input.value = value;
    this.updateProgress();
  }

  get value() {
    return this.input.value;
  }

  set max(value) {
    this.input.max = value;
  }

  get max() {
    return this.input.max;
  }

  set min(value) {
    this.input.min = value;
  }

  get min() {
    return this.input.min;
  }
}

customElements.define("wiki-range", WikiRange);
