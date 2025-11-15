
// main.js - loads data and provides render helpers
window.appData = { events: [], speakers: [] };
fetch("events.json")
  .then(res => res.json())
  .then(data => console.log(data));


async function loadData(){
  try{
    const res = await fetch('events.json');
    const json = await res.json();
    window.appData = json;
  }catch(e){
    console.error('Could not load data/events.json - falling back to empty data', e);
    window.appData = { events: [], speakers: [] };
  }
}

// Utility to create an element from HTML
function el(html){ const template = document.createElement('template'); template.innerHTML = html.trim(); return template.content.firstChild; }

function formatDate(d){
  try { const dt = new Date(d); return dt.toLocaleDateString(); } catch(e){ return d; }
}

function getSpeakerById(id){
  return window.appData.speakers.find(s=>s.id===id) || null;
}

function renderEvents(targetSelector){
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = '';
  window.appData.events.forEach(ev=>{
    const card = el(`<div class="card">
      <h4>${ev.title}</h4>
      <p><strong>${formatDate(ev.date)}</strong> • ${ev.time} • ${ev.location}</p>
      <p>${ev.short}</p>
      <p><a href="event-details.html?id=${ev.id}">View details</a> • <button data-id="${ev.id}" class="favBtn">♥ Favorite</button></p>
    </div>`);
    target.appendChild(card);
  });
  // attach favorite handlers
  document.querySelectorAll('.favBtn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ toggleFavorite(parseInt(e.target.dataset.id)); });
  });
}

function filterEvents(query, targetSelector){
  const q = (query || '').toLowerCase();
  const filtered = window.appData.events.filter(ev=>{
    return ev.title.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q) || (ev.tags||[]).join(' ').includes(q);
  });
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = '';
  filtered.forEach(ev=>{
    const card = el(`<div class="card">
      <h4>${ev.title}</h4>
      <p><strong>${formatDate(ev.date)}</strong> • ${ev.time}</p>
      <p>${ev.short}</p>
      <p><a href="event-details.html?id=${ev.id}">View details</a> • <button data-id="${ev.id}" class="favBtn">♥ Favorite</button></p>
    </div>`);
    target.appendChild(card);
  });
  document.querySelectorAll('.favBtn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ toggleFavorite(parseInt(e.target.dataset.id)); });
  });
}

function renderSpeakers(targetSelector){
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = '';
  window.appData.speakers.forEach(sp=>{
    const s = el(`<div class="speaker"><h4>${sp.name}</h4><p><em>${sp.topic}</em></p><p>${sp.bio}</p></div>`);
    target.appendChild(s);
  });
}

function renderEventDetail(targetSelector){
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'));
  const ev = window.appData.events.find(e=>e.id===id);
  const target = document.querySelector(targetSelector);
  if (!target) return;
  if (!ev){ target.innerHTML = '<p>Event not found.</p>'; return; }
  const speakersHtml = (ev.speakers || []).map(id=>{ const s=getSpeakerById(id); return s?('<strong>'+s.name+'</strong> — '+s.topic):''; }).join('<br/>');
  target.innerHTML = `<div class="card">
    <h2>${ev.title}</h2>
    <p><strong>${formatDate(ev.date)}</strong> • ${ev.time} • ${ev.location}</p>
    <p>${ev.description}</p>
    <p><strong>Speakers:</strong><br/>${speakersHtml}</p>
    <p><button data-id="${ev.id}" class="favBtn">♥ Add to Favorites</button></p>
  </div>`;
  const btn = target.querySelector('.favBtn');
  btn.addEventListener('click', ()=> toggleFavorite(ev.id));
}

function renderSchedule(targetSelector){
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const byDate = {};
  window.appData.events.forEach(ev=>{
    byDate[ev.date] = byDate[ev.date] || [];
    byDate[ev.date].push(ev);
  });
  let html = '';
  Object.keys(byDate).sort().forEach(date=>{
    html += `<section><h3>${formatDate(date)}</h3>`;
    byDate[date].forEach(ev=>{
      html += `<div class="card"><h4>${ev.title}</h4><p>${ev.time} • ${ev.location}</p><p>${ev.short}</p></div>`;
    });
    html += `</section>`;
  });
  target.innerHTML = html;
}

// Favorites (localStorage helpers)
function getFavorites(){
  try{ return JSON.parse(localStorage.getItem('favorites') || '[]'); }catch(e){ return []; }
}
function saveFavorites(arr){ localStorage.setItem('favorites', JSON.stringify(arr)); }
function toggleFavorite(id){
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx === -1){ favs.push(id); } else { favs.splice(idx,1); }
  saveFavorites(favs);
  alert('Favorites updated');
}

// public renderFavorites (used on favorites.html)
function renderFavorites(targetSelector){
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const favs = getFavorites();
  const items = window.appData.events.filter(e=>favs.includes(e.id));
  if (items.length === 0){ target.innerHTML = '<p>No favorites yet.</p>'; return; }
  target.innerHTML = '';
  items.forEach(ev=>{
    const card = el(`<div class="card"><h4>${ev.title}</h4><p>${formatDate(ev.date)} • ${ev.time}</p><p>${ev.short}</p><p><a href="event-details.html?id=${ev.id}">View</a></p></div>`);
    target.appendChild(card);
  });
}

// initialize on page load
document.addEventListener('DOMContentLoaded', async ()=>{
  await loadData();
  // If any render call exists on the page, it will run (pages call these helpers in their inline scripts)
  if (typeof window.pageInit === 'function') window.pageInit();
});
