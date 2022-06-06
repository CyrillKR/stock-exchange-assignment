const BASE_URL = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3"

export default async function fetchFromAPI(endpoint, url = BASE_URL) {
  if (endpoint[0] !== "/") {
    throw new Error("Endpoint must start with '/'");
  }
  const requestTarget = `${url}${endpoint}`;

  try {
    const response = await fetch(requestTarget);
    const data = await response.json();
    return data;
  } catch(err) {
    console.error(err);
  }
}

export async function searchQuery(value, limit = 10) {
  const query = await fetchFromAPI(`/search?query=${value}&limit=${limit}&exchange=NASDAQ`);

  return query;
}

export async function getProfile(key) {
  const profile = await fetchFromAPI(`/company/profile/${key}`);
  return profile;
}

export async function getCompanyHistory(key) {
  const history = await fetchFromAPI(`/historical-price-full/${key}`);
  console.log(history);
  return history;
}
