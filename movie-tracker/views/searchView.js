import { tmdb } from "../api/tmdb.js";
import movieCard from "../ui/components/movieCard.js";

export default async function searchView() {
  const q = new URLSearchParams(location.hash.split("?")[1]).get("q");
  const app = document.querySelector("#app");

  app.innerHTML = `<h2>Search: "${q}"</h2><div class="grid"></div>`;

  const { results } = await tmdb.search(q);
  const grid = app.querySelector(".grid");

  results.forEach(m => grid.append(movieCard(m)));
}
