export default function navbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar";

  nav.innerHTML = `
    <div class="logo">🎬 MovieTracker</div>
    <a href="#/">Home</a>
    <a href="#/watchlist">Watchlist</a>

    <input id="searchBox" placeholder="Search..." aria-label="Search Movies" />
  `;

  nav.querySelector("#searchBox").addEventListener("keypress", e => {
    if (e.key === "Enter") {
      location.hash = `/search?q=${e.target.value}`;
    }
  });

  return nav;
}
