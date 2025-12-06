console.log("MovieCard loaded");

export default function movieCard(movie) {
  const d = document.createElement("div");
  d.className = "movie-card";

  // Handle missing poster
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  d.innerHTML = `
    <img src="${poster}" alt="${movie.title}">
    <h4>${movie.title}</h4>
  `;

  // Navigate to detail view
  d.onclick = () => {
    location.hash = `/movie?id=${movie.id}`;
  };

  return d;
}
