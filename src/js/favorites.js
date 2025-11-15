
// favorites.js - waits until appData is loaded, then renders favorites
async function waitForData(){
  const t0 = Date.now();
  while(!window.appData || !window.appData.events){
    if (Date.now() - t0 > 3000) break;
    await new Promise(r=>setTimeout(r,50));
  }
  if (typeof window.renderFavorites === 'function') window.renderFavorites('#favoritesList');
}
waitForData();
