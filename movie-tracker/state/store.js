export const store = {
  user: JSON.parse(localStorage.getItem("user")) || { username: "demo" },
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
  watched: JSON.parse(localStorage.getItem("watched")) || {},

  save() {
    localStorage.setItem("watchlist", JSON.stringify(this.watchlist));
    localStorage.setItem("watched", JSON.stringify(this.watched));
  },

  addToWatchlist(movie) {
    if (!this.watchlist.some(m => m.id === movie.id)) {
      this.watchlist.push(movie);
      this.save();
    }
  },

  markWatched(id, rating, review) {
    this.watched[id] = { rating, review, date: Date.now() };
    this.save();
  }
};
