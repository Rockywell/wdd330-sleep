import homeView from "./views/homeView.js";
import detailView from "./views/detailView.js";
import watchlistView from "./views/watchlistView.js";
import searchView from "./views/searchView.js";

const routes = {
  "/": homeView,
  "/movie": detailView,
  "/watchlist": watchlistView,
  "/search": searchView,
};

export function router() {
  const path = location.hash.replace("#", "") || "/";
  const view = routes[path.split("?")[0]] || homeView;
  view();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
