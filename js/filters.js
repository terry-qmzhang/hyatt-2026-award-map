import { CONFIG } from './config.js';
import { hotels } from './data.js';
import { state, matchesRegion, matchesFilter, applyAll } from './state.js';
import { isUp, isDown, losesCert } from './utils.js';
import { clearActive } from './list.js';
import { morphView, isMorphingNow, isGlobe, mapReset, mapZoomBy } from './map.js';

export function buildDropdowns() {
  const base = hotels.filter(h => {
    if (!matchesRegion(h, state.region)) return false;
    if (state.dir === 'up' && !isUp(h)) return false;
    if (state.dir === 'down' && !isDown(h)) return false;
    if (state.dir === 'cert' && !losesCert(h)) return false;
    if (state.minCat > 0 && (h.ai ? 0 : h.nw) < state.minCat) return false;
    if (state.search) {
      const s = state.search.toLowerCase();
      if (!h.n.toLowerCase().includes(s) && !h.c.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  // Country dropdown
  const countryCounts = {};
  base.forEach(h => { countryCounts[h._country] = (countryCounts[h._country] || 0) + 1; });
  const countries = Object.entries(countryCounts).sort((a, b) => a[0].localeCompare(b[0]));
  const cSel = document.getElementById('filt-country');
  cSel.innerHTML = '<option value="">\u6240\u6709\u56fd\u5bb6 (' + base.length + ')</option>';
  countries.forEach(([country, n]) => {
    const opt = document.createElement('option');
    opt.value = country;
    opt.textContent = `${country} (${n})`;
    cSel.appendChild(opt);
  });
  if (state.country && !countryCounts[state.country]) {
    const opt = document.createElement('option');
    opt.value = state.country;
    opt.textContent = `${state.country} (0)`;
    cSel.appendChild(opt);
  }
  cSel.value = state.country;

  // City dropdown
  const withCountry = state.country ? base.filter(h => h._country === state.country) : base;
  const cityCounts = {};
  withCountry.forEach(h => { cityCounts[h.c] = (cityCounts[h.c] || 0) + 1; });
  const cities = Object.entries(cityCounts).sort((a, b) => a[0].localeCompare(b[0]));
  const sel = document.getElementById('filt-city');
  sel.innerHTML = '<option value="">\u6240\u6709\u57ce\u5e02 (' + withCountry.length + ')</option>';
  cities.forEach(([city, n]) => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = `${city} (${n})`;
    sel.appendChild(opt);
  });
  if (state.city && !cityCounts[state.city]) {
    const opt = document.createElement('option');
    opt.value = state.city;
    opt.textContent = `${state.city} (0)`;
    sel.appendChild(opt);
  }
  sel.value = state.city;
}

export function updateResultCount() {
  const visible = hotels.filter(matchesFilter);
  const el = document.getElementById('result-n');
  if (el) {
    const prev = el.textContent;
    el.textContent = visible.length;
    if (prev !== String(visible.length)) {
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 300);
    }
  }
}

export function doReset() {
  state.region = 'all';
  state.dir = 'all';
  state.country = '';
  state.city = '';
  state.search = '';
  state.minCat = 0;
  document.getElementById('search').value = '';
  document.getElementById('filt-cat').value = '';
  document.getElementById('filt-country').value = '';
  document.querySelectorAll('#filt-region .pill').forEach(x => x.classList.toggle('active', x.dataset.region === 'all'));
  document.querySelectorAll('#filt-dir .pill').forEach(x => x.classList.toggle('active', x.dataset.dir === 'all'));
  buildDropdowns();
  clearActive();
  applyAll();
}

let searchTimer = null;

export function initFilters() {
  buildDropdowns();

  // Region pills
  document.querySelectorAll('#filt-region .pill').forEach(p => {
    p.addEventListener('click', () => {
      state.region = p.dataset.region;
      document.querySelectorAll('#filt-region .pill').forEach(x => x.classList.toggle('active', x === p));
      buildDropdowns();
      applyAll();
    });
  });

  // Direction pills
  document.querySelectorAll('#filt-dir .pill').forEach(p => {
    p.addEventListener('click', () => {
      state.dir = p.dataset.dir;
      document.querySelectorAll('#filt-dir .pill').forEach(x => x.classList.toggle('active', x === p));
      buildDropdowns();
      applyAll();
    });
  });

  // Cat dropdown
  document.getElementById('filt-cat').addEventListener('change', e => {
    state.minCat = e.target.value ? parseInt(e.target.value) : 0;
    buildDropdowns();
    applyAll();
  });

  // Country dropdown
  document.getElementById('filt-country').addEventListener('change', e => {
    state.country = e.target.value;
    buildDropdowns();
    applyAll();
  });

  // City dropdown
  document.getElementById('filt-city').addEventListener('change', e => {
    state.city = e.target.value;
    applyAll();
  });

  // Search input with debounce
  document.getElementById('search').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = e.target.value.trim();
      buildDropdowns();
      applyAll();
    }, CONFIG.DEBOUNCE_MS);
  });

  // Reset
  document.getElementById('reset').addEventListener('click', doReset);

  // View toggle
  document.querySelectorAll('#filt-view .pill').forEach(p => {
    p.addEventListener('click', () => {
      const toGlobe = p.dataset.view === 'globe';
      if (toGlobe === isGlobe() || isMorphingNow()) return;
      document.querySelectorAll('#filt-view .pill').forEach(x => x.classList.toggle('active', x === p));
      morphView(toGlobe);
    });
  });

  // Map reset
  document.getElementById('map-reset').addEventListener('click', () => mapReset());

  // Zoom +/-
  document.getElementById('zoom-in').addEventListener('click', () => mapZoomBy(CONFIG.ZOOM_FACTOR));
  document.getElementById('zoom-out').addEventListener('click', () => mapZoomBy(1 / CONFIG.ZOOM_FACTOR));

  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.sort;
      if (state.sort === k) {
        state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
      } else {
        state.sort = k;
        state.sortDir = (k === 'pct' || k === 'cat') ? 'desc' : 'asc';
      }
      document.querySelectorAll('.sort-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.sort === state.sort);
        const arrow = b.querySelector('.arrow');
        if (arrow) {
          if (b.dataset.sort === state.sort) {
            arrow.textContent = state.sortDir === 'desc' ? '\u2193' : '\u2191';
          } else {
            arrow.textContent = '\u2195';
          }
        }
      });
      // Import renderList dynamically to avoid circular ref
      import('./list.js').then(m => m.renderList());
    });
  });
}

export function initFilterToggle() {
  const toggle = document.getElementById('filter-toggle');
  if (!toggle) return;
  const stack = document.querySelector('.filter-stack');
  // Start collapsed on mobile
  if (window.innerWidth <= 640) {
    stack.classList.add('collapsed');
  }
  toggle.addEventListener('click', () => {
    stack.classList.toggle('collapsed');
    toggle.textContent = stack.classList.contains('collapsed') ? '\u7b5b\u9009 \u25bc' : '\u7b5b\u9009 \u25b2';
  });
}
