export default function customInputFactory(needDescriptionDefault) {
  return class CustomInput extends HTMLElement {
    static get observedAttributes() {
      return ["value"];
    }
    get value() {
      return this.getAttribute("value");
    }

    set value(newValue) {
      this.setAttribute("value", newValue);
    }

    get needDescription() {
      const value = this.getAttribute("needDescription");
      return value === "false" ? false : value === "true" ? true : null;
    }

    set needDescription(newValue) {
      const needDescription =
        newValue === "false" ? false : newValue === "true" ? true : null;
      this.setAttribute("needDescription", needDescription);
    }
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "closed" });
      const needDescription =
        typeof this.needDescription === "boolean"
          ? this.needDescription
          : needDescriptionDefault;

      if (needDescription) {
        const template = document.getElementById("description");
        shadow.appendChild(template.content.cloneNode(true));
      }
      this.input = document.createElement("input");
      this.input.setAttribute("type", "text");
      this.input.setAttribute("placeholder", "Type something...");
      this.input.onkeyup = this.onKeyUp.bind(this);
      shadow.appendChild(this.input);
    }

    onKeyUp() {
      this.value = this.input.value;
    }

    /**
     * Invoked each time the custom element is appended into a document-connected
     * element. This will happen each time the node is moved, and may happen
     * before the element's contents have been fully parsed.
     */
    connectedCallback() {
      console.log("invoked connectedCallback");
    }
    /**
   *  Invoked each time the custom element is disconnected from the 
   * document's DOM.
  
   */
    disconnectedCallback() {
      console.log("invoked disconnectedCallback");
    }
    /**
     * Invoked each time the custom element is moved to a new document.
     */
    adoptedCallback() {
      console.log("invoked adoptedCallback");
    }
    /**
     *  Invoked each time one of the custom element's attributes is added,
     * removed, or changed. Which attributes to notice change for is
     * specified in a static get observedAttributes method
     */
    attributeChangedCallback(name, oldValue, newValue) {
      this.input.value = newValue.toUpperCase();
    }
  };
}
