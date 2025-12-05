const TMDB_KEY = "YOUR_TMDB_KEY";
const TMDB_BASE = "https://api.themoviedb.org/3";

export async function tmdbSearch(query) {
  const res = await fetch(`${TMDB_BASE}/search/movie?api_key=${TMDB_KEY}&query=${query}`);
  return res.json();
}

export async function tmdbTrending() {
  const res = await fetch(`${TMDB_BASE}/trending/movie/week?api_key=${TMDB_KEY}`);
  return res.json();
}

export async function tmdbDetails(id) {
  const res = await fetch(`${TMDB_BASE}/movie/${id}?api_key=${TMDB_KEY}&append_to_response=credits,recommendations`);
  return res.json();
}
