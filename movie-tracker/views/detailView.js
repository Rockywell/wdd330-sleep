import { tmdbDetails } from "../api/tmdb.js";
import { omdbRatings } from "../api/omdb.js";
import { fetchTrailer } from "../api/youtube.js";
import { store } from "../state/store.js";

export default async function detailView() {
  const id = new URLSearchParams(location.hash.split("?")[1]).get("id");
  const app = document.getElementById("app");

  const tmdb = await tmdbDetails(id);
  const omdb = await omdbRatings(tmdb.imdb_id);
  const trailerId = await fetchTrailer(tmdb.title);

  app.innerHTML = `
    <div class="detail">
      <img src="https://image.tmdb.org/t/p/w500${tmdb.poster_path}" alt="">
      <div>
        <h1>${tmdb.title}</h1>
        <p>${tmdb.overview}</p>
        <p><strong>OMDb Rating:</strong> ${omdb.imdbRating ?? "N/A"}</p>

        <button id="addWatch">Add to Watchlist</button>

        ${trailerId ? `<iframe src="https://www.youtube.com/embed/${trailerId}" frameborder="0"></iframe>` : ""}
      </div>
    </div>
  `;

  document.querySelector("#addWatch").onclick = () => {
    store.addToWatchlist({ id: tmdb.id, title: tmdb.title, poster: tmdb.poster_path });
    alert("Added!");
  };
}
