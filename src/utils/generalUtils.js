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
    header: {
      name: "",
      symbol: "",
      link: "",
    },
    business: {},
    about: {
      geo: {},
      description: "",
      ceo: ""
    },
    img: {
      name: "",
      img: "",
    },
  };

  const { profile, symbol } = data;
  const { address, city, country, currency, industry, price, changes, changesPercentage, ceo, description, image: img, companyName: name, website: link } = profile;
  
  refactored.header.symbol = symbol;
  refactored.header.name = name;
  refactored.header.img = img;
  refactored.header.link = link;

  refactored.img.img = img;
  refactored.img.name = name;

  refactored.business.price = price;
  refactored.business.industry = industry;
  refactored.business.changes = changes;
  refactored.business.changesPercentage = changesPercentage;
  
  refactored.about.ceo = ceo;
  refactored.about.description = description;
  refactored.about.geo.address = address;
  refactored.about.geo.city = city;
  refactored.about.geo.country = country;
  refactored.about.geo.currency = currency;

  return refactored;
}
