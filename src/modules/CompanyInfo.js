import { getQueryParam, refactorProfileData } from "../utils/generalUtils.js";
import { getProfile, getCompanyHistory } from "../utils/api.js";

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

  static async getAndAssignHistory(key) {
    return await getCompanyHistory(key);
  }

  static generateParentNode() {
    const section = document.createElement("section");
    section.classList.add("section-container", "company-info-container");
    section.id = "company-info";
    return section;
  }

  static createNodes(profile) {
    const profileKeys = Object.keys(profile);
    let nodes = {};

    profileKeys.forEach((key) => {
      nodes[key] = new CompanyItem(key, profile);
    });

    return nodes;
  }

  constructor() {
    this.loader;
    this.profile;
    this.history;
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
        this.history = await CompanyInfo.getAndAssignHistory(this.symbol);
      } catch (err) {
        console.error(err);
      } finally {
        this.deactivateLoader();
      }

      this.nodes = CompanyInfo.createNodes(this.profile);

      const main = document.querySelector("#main");
      main.appendChild(this.parentNode);
    }
  }
}

class CompanyItem {
  static generateNode(type, profile) {
    const filter = {
      business: "article",
      geo: "article",
      name: "h1",
      description: "p",
      link: "a",
      ceo: "h3",
      symbol: "h2",
    };

    const element = document.createElement(filter[type] || "div");
    element.classList.add(`company-${type}-container`);
    element.dataset.type = type;
    element.companyInfo = {};
    element.companyInfo[type] = profile[type];

    return element;
  }

  constructor(type, profile) {
    this.type = type;
    this.profile = profile;
    this.node = CompanyItem.generateNode(type, profile);
  }
}

class CompanyChart {
  constructor(data) {
    this.data = data;
  }
}