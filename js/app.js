import { hotels } from './data.js';
import { state, registerCallbacks } from './state.js';
import { isUp, isDown, losesCert } from './utils.js';
import { initMap, drawMap, worldData, rotateGlobeTo, centerFlatOnHotel, isGlobe } from './map.js';
import { initFilters, initFilterToggle, updateResultCount } from './filters.js';
import { renderList, registerMapCallbacks } from './list.js';

// Wire list ↔ map callbacks
registerMapCallbacks(rotateGlobeTo, centerFlatOnHotel, isGlobe);

// Register state callbacks
registerCallbacks(
  () => { if (worldData) drawMap(); },
  renderList,
  updateResultCount
);

// Stats
function updateStats() {
  let up = 0, down = 0, cert = 0, cat8 = 0;
  hotels.forEach(h => {
    if (isUp(h)) up++;
    if (isDown(h)) down++;
    if (losesCert(h)) cert++;
    if (!h.ai && h.nw === 8) cat8++;
  });
  const tot = hotels.length;
  document.getElementById('stat-up').textContent = up;
  document.getElementById('stat-up-pct').textContent = ((up / tot) * 100).toFixed(1) + '%';
  document.getElementById('stat-down').textContent = down;
  document.getElementById('stat-down-pct').textContent = ((down / tot) * 100).toFixed(1) + '%';
  document.getElementById('stat-cert').textContent = cert;
  document.getElementById('stat-cat8').textContent = cat8;
}

// Load world map data
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(world => {
    initMap(world);
    initFilters();
    initFilterToggle();
    updateStats();
    renderList();
    updateResultCount();
  })
  .catch(err => {
    console.error('World atlas load failed', err);
  });
