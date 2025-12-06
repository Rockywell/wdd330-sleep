import { storage } from "../utils/storage.js";

export const store = {
  watchlist: storage.get("watchlist", []),
  watched: storage.get("watched", {}), // { movieId: { rating, review, date } }

  save() {
    storage.set("watchlist", this.watchlist);
    storage.set("watched", this.watched);
  },

  addToWatchlist(movie) {
    if (!this.watchlist.some(m => m.id === movie.id)) {
      this.watchlist.push(movie);
      this.save();
    }
  },

  removeFromWatchlist(id) {
    this.watchlist = this.watchlist.filter(m => m.id !== id);
    this.save();
  },

  markWatched(id, rating, review) {
    this.watched[id] = { rating, review, date: Date.now() };
    this.save();
  }
};
