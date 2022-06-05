const searchList = document.querySelector(".search-list");
const loader = document.querySelector(".loader");

function clearList() {
  while (searchList.lastChild) {
    searchList.removeChild(searchList.lastChild);
  }
}

export function renderSearchListItems(items) {
  if (!items) {
    throw new Error("No items were passed");
  }

  if (items.length === 0) {
    const notFoundH2 = document.createElement("h2");
    notFoundH2.textContent = "No companies were found";
    searchList.appendChild(notFoundH2);
    return;
  }

  const nodes = [];

  items.forEach((item) => {
    const { symbol, name } = item;

    const li = document.createElement('li');
    li.classList.add("stock-li");
    li.dataset.companyName = name;
    li.dataset.companySymbol = symbol;

    const a = document.createElement('a');
    a.href = `./pages/company.html?symbol=${symbol}`;
    a.classList.add("search-link")
    a.textContent = `${name} (${symbol})`;
    li.appendChild(a);

    nodes.push(li);
  });

  clearList();

  nodes.forEach((node) => {
    searchList.appendChild(node);
  });
}

export function renderLoader() {
  clearList();
  loader.classList.add("loader-on");
}

export function disableLoader() {
  loader.classList.remove("loader-on");
}
