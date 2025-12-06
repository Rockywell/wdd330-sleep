import homeView from "./views/homeView.js";
import detailView from "./views/detailView.js";
import watchlistView from "./views/watchlistView.js";
import searchView from "./views/searchView.js";
import profileView from "./views/profileView.js";
import dashboardView from "./views/dashboardView.js";
import settingsView from "./views/settingsView.js";

const routes = {
  "/": homeView,
  "/movie": detailView,
  "/watchlist": watchlistView,
  "/search": searchView,
  "/profile": profileView,
  "/dashboard": dashboardView,
  "/settings": settingsView
};

export function router() {
  const route = location.hash.replace("#", "").split("?")[0] || "/";
  (routes[route] || homeView)();
}
