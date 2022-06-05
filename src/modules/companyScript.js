import CompanyInfo from "../modules/CompanyInfo.js"

async function init() {
  const company = new CompanyInfo();
  console.log(company);
}

init();