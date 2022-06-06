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
      switch (key) {
        case "header":
          nodes[key] = new CompanyHeader(key, profile[key]);
          break;
        case "about":
          nodes[key] = new CompanyAbout(key, profile[key]);
          break;
        case "business":
          nodes[key] = new CompanyBusiness(key, profile[key]);
          break;
        case "img":
          nodes[key] = new CompanyImage(key, profile[key]);
          break;
        default:
          nodes[key] = new CompanyItem(key, profile[key]);
      }
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

  createAndAppendNodes() {
    const ORDER = ["img", "header", "business", "about"];

    ORDER.forEach((type) => {
      const element = document.createElement('div');
      element.innerHTML = this.nodes[type].node.trim();
      this.parentNode.appendChild(element.firstChild);
    });
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

      const main = document.querySelector("#main");
      main.appendChild(this.parentNode);
      this.nodes = CompanyInfo.createNodes(this.profile);
      this.createAndAppendNodes();
    }
  }
}

class CompanyItem {
  constructor(type, profile) {
    this.type = type;
    this.profile = profile;
    this.node = CompanyItem.generateItem(profile);
  }

  static generateItem(profile) {
    const nodes = [];
    for (let key in profile) {
      nodes.push(`
      <li>
        <p><strong>${key}</strong>: ${profile[key]}</p>
      </li>`);
    }

    return `<ul class="company-list-container">
    ${nodes.join("\n")}
  </ul>`;
  }
}

class CompanyHeader extends CompanyItem {
  constructor(type, profile) {
    super(type, profile);
    this.node = CompanyHeader.generateHeader(profile);
  }

  static generateHeader(headerItems) {
    const { name, symbol, link } = headerItems;

    return `<div class="company-header-container">
      <h1 class="company-name-container">
        <a href="${link}" class="company-link-container">${name} (${symbol})</a>
      </h1>
  </div>`;
  }
}

class CompanyImage extends CompanyItem {
  constructor(type, profile) {
    super(type, profile);
    this.node = CompanyImage.generateImage(profile);
  }

  static generateImage(profile) {
    const { img, name } = profile;
    return `<div class="company-img-container">
    <img src="${img}" alt="${name}">
   </div>`;
  }
}

class CompanyBusiness extends CompanyItem {
  constructor(type, profile) {
    super(type, profile);
    this.node = CompanyBusiness.generateBusiness(profile);
  }

  static generateBusiness(profile) {
    const { price, changes, changesPercentage, industry } = profile;
    return `<div class="company-business-container">
          <p>Price: ${price}</p>
          <p>Changes: ${changes} <span id="changes-percantage">(${changesPercentage})</span></p>
          <p>Industry: ${industry}</p>
        </div>`;
  }
}

class CompanyAbout extends CompanyItem {
  constructor(type, profile) {
    super(type, profile);
    this.node = CompanyAbout.generateAbout(profile);
  }

  static generateAbout(profile) {
    const { ceo, description } = profile;
    const { geo } = profile;
    const { country, state, city } = geo;
    return `<article class="section-about">
        <div class="company-geo-container">
          <p>Country: ${country}</p>
          <p>State: ${state}</p>
          <p>City: ${city}</p>
        </div>
        <p class="company-ceo-container">${ceo}</p>
        <p class="company-description-container">${description}</p>
      </article>`;
  }
}

class CompanyChart {
  constructor(data) {
    this.data = data;
  }
}