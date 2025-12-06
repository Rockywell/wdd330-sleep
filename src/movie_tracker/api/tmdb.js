const TMDB_KEY = "YOUR_TMDB_KEY";
const BASE = "https://api.themoviedb.org/3";

const fetchJSON = url => fetch(url).then(r => r.json());

export const tmdb = {
  search: q => fetchJSON(`${BASE}/search/movie?api_key=${TMDB_KEY}&query=${q}`),
  trending: () => fetchJSON(`${BASE}/trending/movie/week?api_key=${TMDB_KEY}`),
  details: id =>
    fetchJSON(`${BASE}/movie/${id}?api_key=${TMDB_KEY}&append_to_response=credits,recommendations,release_dates`)
};
