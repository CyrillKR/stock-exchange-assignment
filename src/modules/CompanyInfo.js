import { getQueryParam, refactorProfileData } from "../utils/generalUtils.js";
import { getProfile } from "../utils/api.js";

export default class CompanyInfo {
  static generateLoader() {
    const loaderElement = document.createElement("div");
    loaderElement.classList.add("loader");
    loaderElement.textContent = "$";

    const main = document.querySelector("#main");
    main.appendChild(loaderElement);

    return loaderElement;
  }

  static async getAndRefactorProfile(key) {
    const profile = await getProfile(key);
    return refactorProfileData(profile);
  }

  static generateParentNode() {
    const section = document.createElement("section");
    section.classList.add("section-container", "company-info-container");
    section.id = "company-info";
    return section;
  }

  static generateNodes(profile) {
    const profileKeys = Object.keys(profile);
    console.log(profileKeys);
  }

  constructor() {
    this.loader;
    this.profile;
    this.symbol;
    this.parentNode;
    this.nodes;

    this.init();
  }

  activateLoader() {
    this.loader.classList.add("loader-on");
  }

  deactivateLoader() {
    this.loader.classList.remove("loader-on");
  }

  async init() {
    {
      this.symbol = getQueryParam();
      this.loader = CompanyInfo.generateLoader();
      this.parentNode = CompanyInfo.generateParentNode();

      try {
        this.activateLoader();
        this.profile = await CompanyInfo.getAndRefactorProfile(this.symbol);
      } catch (err) {
        console.error(err);
      } finally {
        this.deactivateLoader();
      }

      this.nodes = CompanyInfo.generateNodes(this.profile);

      const main = document.querySelector("#main");
      main.appendChild(this.parentNode);
    }
  }
}