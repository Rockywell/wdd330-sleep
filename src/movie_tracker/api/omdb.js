const KEY = "YOUR_OMDB_KEY";

export const omdb = {
  ratings: imdbID =>
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`).then(r => r.json())
};
