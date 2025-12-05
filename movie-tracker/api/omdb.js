const OMDB_KEY = "YOUR_OMDB_KEY";

export async function omdbRatings(imdbID) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}`);
  return res.json();
}
