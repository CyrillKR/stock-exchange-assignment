import { getQueryParam, refactorProfileData } from "../../utils/generalUtils.js";
import Chart from './Chart.js'
import { getProfile, getCompanyHistory } from "../../utils/api.js";

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
    const ORDER = ["header", "about"];

    ORDER.forEach((type) => {
      const element = document.createElement('article');
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
        this.chart = new Chart(this.history, 30);
        this.chart.init();
        console.log(this.chart);
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
    const { name, symbol, link, img, business } = headerItems;
    const { price, changes, changesPercentage, industry } = business;

    console.log(changes, changesPercentage);

    const checkChanges = (value) => (isNaN(value) ? parseInt(value) : value)>= 0 ? "positive" : "negative";
    
    return `<article class="company-header-container">
      <div className="company-image-container">
        <image src="${img}"/>
      </div>
      <div className="company-name-container">
        <h1 class="company-name-container">
          <a href="${link}" class="company-link-container">${name} (${symbol})</a>
        </h1>  
      </div>
      <div class="company-business-container">
        <p>Price: ${price}</p>
        <p>Changes: <span class="changes-${checkChanges(changes)}">${changes}</span> <span class="changes-${checkChanges(changesPercentage)}">(${parseFloat(changesPercentage).toPrecision(2)}%)</span></p>
        <p>Industry: ${industry}</p>
      </ >
  </article>`;
  }
}

class CompanyAbout extends CompanyItem {
  constructor(type, profile) {
    super(type, profile);
    this.node = CompanyAbout.generateAbout(profile);
  }

  static generateAbout(profile) {
    const { ceo, description, name } = profile;
    const { geo } = profile;
    const { country, state, city, address, currency } = geo;
    return `<article class="section-about">
        <div class="company-general-about">
          <h2>About ${name}</h2>
          <p>Country: ${country}</p>
          <p>State: ${state}</p>
          <p>City: ${city}</p>
          <p>Address: ${address}</p>
          <p>Currency: ${currency}</p>
          <p class="company-ceo-container">CEO: ${ceo}</p>
        </div>
        <div className="company-description">
          <h3>More about ${name}</h3>
          <p class="company-description-container">${description}</p>
        </div>
      </article>`;
  }
}
