import customInputFactory from "./custom-input.js";

setTimeout(() => {
  customElements.define("custom-input", customInputFactory(true));
}, 1000);
