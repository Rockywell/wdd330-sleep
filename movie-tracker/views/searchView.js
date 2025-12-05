import { tmdbSearch } from "../api/tmdb.js";
import movieCard from "../ui/components/movieCard.js";

export default async function searchView() {
  const query = new URLSearchParams(location.hash.split("?")[1]).get("q");
  const app = document.querySelector("#app");
  app.innerHTML = `<h2>Search: "${query}"</h2><div class="grid"></div>`;

  const results = await tmdbSearch(query);
  const grid = app.querySelector(".grid");

  results.results.forEach(m => grid.append(movieCard(m)));
}
