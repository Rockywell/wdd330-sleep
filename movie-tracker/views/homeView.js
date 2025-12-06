console.log("HomeView loaded");

import { tmdb } from "../api/tmdb.js";
import movieCard from "../ui/components/movieCard.js";

export default function homeView() {
  // Return HTML FIRST
  setTimeout(async () => {
    const { results } = await tmdb.trending();
    const grid = document.querySelector("#homeGrid");

    results.forEach(m => grid.append(movieCard(m)));
  }, 0);

  return `
    <section class="home">
      <h2>Trending This Week</h2>
      <div class="grid" id="homeGrid"></div>
    </section>
  `;
}
