import { searchQuery } from "./utils/api.js";
import Footer from "./modules/footer/footer.js";
import {
  renderSearchListItems,
  renderLoader,
  disableLoader 
} from "./utils/render.js";

async function searchEvent(e) {
  e.preventDefault();
  const searchBar = document.querySelector("#search-bar");

  try {
    renderLoader();
    const results = await searchQuery(searchBar.value);
    renderSearchListItems(results);
  } catch(err) {
    console.error(err);
  } finally {
    disableLoader();
  }
}

function init() {
  const searchBtn = document.querySelector("#search-btn");
  searchBtn.addEventListener("click", searchEvent);
  new Footer();
}

init();