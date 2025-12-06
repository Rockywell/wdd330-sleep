import { store } from "../state/store.js";
import movieCard from "../ui/components/movieCard.js";

export default function watchlistView() {
  const app = document.querySelector("#app");
  app.innerHTML = `<h2>Your Watchlist</h2><div class="grid"></div>`;

  const grid = app.querySelector(".grid");

  if (store.watchlist.length === 0) {
    app.innerHTML += `<p>No movies saved yet.</p>`;
    return;
  }

  store.watchlist.forEach(m => grid.append(movieCard(m)));
}
