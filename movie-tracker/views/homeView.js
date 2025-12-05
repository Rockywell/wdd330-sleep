import { tmdbTrending } from "../api/tmdb.js";
import movieCard from "../ui/components/movieCard.js";

export default async function homeView() {
  const app = document.querySelector("#app");
  app.innerHTML = `<h2>Trending Movies</h2><div class="grid"></div>`;

  const trending = await tmdbTrending();
  const grid = app.querySelector(".grid");

  trending.results.forEach(m => grid.append(movieCard(m)));
}
