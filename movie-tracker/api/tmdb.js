const TMDB_KEY = "YOUR_TMDB_KEY";  // ← Replace with actual key!
const BASE = "https://api.themoviedb.org/3";

const fetchJSON = async url => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${url}`);
    return await res.json();
  } catch (err) {
    console.error("TMDB ERROR:", err);
    return { results: [] };
  }
};

export const tmdb = {
  search: q =>
    fetchJSON(`${BASE}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(q)}`),

  trending: () =>
    fetchJSON(`${BASE}/trending/movie/week?api_key=${TMDB_KEY}`),

  details: id =>
    fetchJSON(
      `${BASE}/movie/${id}?api_key=${TMDB_KEY}&append_to_response=credits,recommendations,release_dates`
    )
};
