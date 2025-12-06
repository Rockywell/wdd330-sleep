import { tmdb } from "../api/tmdb.js";
import { omdb } from "../api/omdb.js";
import { yt } from "../api/youtube.js";
import { store } from "../state/store.js";
import ratingStars from "../ui/components/ratingStars.js";
import reviewBox from "../ui/components/reviewBox.js";

export default async function detailView() {
  const id = new URLSearchParams(location.hash.split("?")[1]).get("id");
  const app = document.querySelector("#app");

  const movie = await tmdb.details(id);
  const ratingData = await omdb.ratings(movie.imdb_id);
  const trailerId = await yt.trailer(movie.title);

  app.innerHTML = `
    <div class="detail-page">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
      <div class="meta">
        <h1>${movie.title}</h1>

        <p>${movie.overview}</p>
        <p><strong>OMDb Rating:</strong> ${ratingData.imdbRating ?? "N/A"}</p>

        <button id="addWatch">Add to Watchlist</button>

        <h3>Your Rating</h3>
        <div id="rating"></div>

        <h3>Your Review</h3>
        <div id="review"></div>

        ${trailerId ? `<iframe class="trailer" src="https://www.youtube.com/embed/${trailerId}" allowfullscreen></iframe>` : ""}
      </div>
    </div>
  `;

  document.getElementById("addWatch").onclick = () => {
    store.addToWatchlist({ id: movie.id, title: movie.title, poster: movie.poster_path });
    alert("Added to Watchlist!");
  };

  const ratingEl = document.getElementById("rating");
  ratingEl.append(ratingStars(id));

  document.getElementById("review").append(reviewBox(id));
}
