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
      img: "",
      business: {
        price: 0,
        industry: "",
        changes: 0,
        changesPercentage: ""
      },
    },
    about: {
      name: "",
      description: "",
      ceo: "",
      geo: {
        city: "",
        country: "",
        address: "",
        state: "",
      }
    },
  };

  const { profile, symbol } = data;
  const { address, city, country, currency, state, industry, price, changes, changesPercentage, ceo, description, image: img, companyName: name, website: link } = profile;

  refactored.header.symbol = symbol;
  refactored.header.name = name;
  refactored.header.img = img;
  refactored.header.link = link;

  refactored.header.business.price = price;
  refactored.header.business.industry = industry;
  refactored.header.business.changes = changes;
  refactored.header.business.changesPercentage = changesPercentage;

  refactored.about.name = name;
  refactored.about.ceo = ceo;
  refactored.about.description = description;
  refactored.about.geo.address = address;
  refactored.about.geo.city = city;
  refactored.about.geo.country = country;
  refactored.about.geo.currency = currency;
  refactored.about.geo.state = state;

  return refactored;
}
