export default function movieCard(movie) {
  const div = document.createElement("div");
  div.className = "movie-card";

  div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path || movie.poster}" />
    <h4>${movie.title}</h4>
  `;

  div.onclick = () => location.hash = `/movie?id=${movie.id}`;
  return div;
}
