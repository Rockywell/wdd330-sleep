export default function navbar() {
  const nav = document.createElement("div");
  nav.innerHTML = `
    <a href="#/">Home</a>
    <a href="#/watchlist">Watchlist</a>
    <input id="searchBox" placeholder="Search movies..."/>
  `;

  nav.querySelector("#searchBox").addEventListener("keypress", e => {
    if (e.key === "Enter") {
      location.hash = `/search?q=${e.target.value}`;
    }
  });

  return nav;
}
