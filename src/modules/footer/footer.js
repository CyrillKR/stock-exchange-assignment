import { getPageTitle } from "../../utils/generalUtils.js";

export default class Footer {
  constructor() {
    this.signature = "Cyrill Kravtsoff";
    this.year = new Date(Date.now()).getFullYear();
    this.container = this.generateContainer();
    this.link = this.generateLink(getPageTitle());
    this.init();
  }

  generateContainer() {
    const container = document.createElement("footer");
    container.classList.add("footer");
    return container;
  }

  generateLink(title) {
    console.log(title);
    return title === "Stock Exchange Home" ? "/src/index.html" : "../index.html";
  }

  init() {
    const footerHTML =
      `
      <h1>Copyright &#169 ${this.signature} ${this.year}</h1>
      <a href="${this.link}" class="footer-link">Back to home page</a>
    ` ;
    const div = document.createElement('div');
    div.classList.add("footer-text");
    div.innerHTML = footerHTML;
    this.container.appendChild(div);
    document.body.appendChild(this.container);
  }
}