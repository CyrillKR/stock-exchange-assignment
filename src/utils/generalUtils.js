export function getQueryParam(queryParam = "symbol") {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(queryParam)) {
    return urlParams.get(queryParam);
  }
}

export function refactorProfileData(data) {
  if (!data.profile) {
    throw new Error("No profile in data");
  }

  let refactored = {
    business: {},
    geo: {},
    img: "",
    description: "",
    name: "",
    symbol: "",
    link: "",
    ceo: ""
  };

  const { profile, symbol } = data;

  refactored.symbol = symbol;

  const { address, city, country, currency, industry, price, changes, changesPercentage, ceo, description, image: img, companyName: name, website: link } = profile;

  refactored.name = name;
  refactored.description = description;
  refactored.ceo = ceo;
  refactored.img = img;
  refactored.link = link;

  refactored.geo.address = address;
  refactored.geo.city = city;
  refactored.geo.country = country;
  refactored.geo.currency = currency;

  refactored.business.price = price;
  refactored.business.industry = industry;
  refactored.business.changes = changes;
  refactored.business.changesPercentage = changesPercentage;

  return refactored;
}
