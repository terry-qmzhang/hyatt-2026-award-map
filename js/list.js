import { hotels } from './data.js';
import { state, matchesFilter, sortValue } from './state.js';
import { hasRing, pctText, pctClass, catText, colorByPct } from './utils.js';
import { showTooltip, positionTooltip, hideTooltip } from './tooltip.js';

const rowsEl = document.getElementById('hotel-rows');
const tooltipEl = document.getElementById('tooltip');

// stickyIdx tracks the last clicked hotel
let stickyIdx = null;

// These will be set by app.js after map module is loaded
let _rotateGlobeTo = null;
let _centerFlatOnHotel = null;
let _isGlobe = null;

export function registerMapCallbacks(rotateGlobeTo, centerFlatOnHotel, isGlobe) {
  _rotateGlobeTo = rotateGlobeTo;
  _centerFlatOnHotel = centerFlatOnHotel;
  _isGlobe = isGlobe;
}

function buildRowElement(h) {
  const row = document.createElement('div');
  row.className = 'hl-row';
  row.dataset.idx = h._i;
  if (state.active === h._i) row.classList.add('active');
  const flags = [];
  if (hasRing(h)) flags.push('<span class="ring-flag" title="\u5931\u53bb cert"></span>');
  if (h.early) flags.push('<span class="early-flag">2/25</span>');
  const pct = pctText(h);
  const pCls = pctClass(h);
  const pColor = pCls === 'pos' ? colorByPct(h) : (pCls === 'neg' ? 'var(--c-save-deep)' : 'var(--ink-3)');
  row.innerHTML = `
    <div class="hl-name">
      <div class="hl-name-line">${flags.join('')}<span>${h.n}</span></div>
      <div class="hl-loc">${h.c}</div>
    </div>
    <div class="hl-cat">${catText(h)}</div>
    <div class="hl-pct" style="color:${pColor};">${pct}</div>
  `;
  return row;
}

export function renderList() {
  const visible = hotels.filter(matchesFilter);
  const sorted = [...visible].sort((a, b) => {
    const va = sortValue(a), vb = sortValue(b);
    let cmp;
    if (typeof va === 'string') cmp = va.localeCompare(vb);
    else cmp = va - vb;
    return state.sortDir === 'desc' ? -cmp : cmp;
  });

  // Opacity transition
  rowsEl.style.opacity = '0';

  setTimeout(() => {
    if (sorted.length === 0) {
      rowsEl.innerHTML = '<div class="empty-state">\u6ca1\u6709\u5339\u914d\u7684\u9152\u5e97<br><br>\u8c03\u6574\u8fc7\u6ee4\u5668\u6216\u91cd\u7f6e\u8bd5\u8bd5</div>';
    } else {
      const frag = document.createDocumentFragment();
      sorted.forEach(h => frag.appendChild(buildRowElement(h)));
      rowsEl.innerHTML = '';
      rowsEl.appendChild(frag);
    }
    rowsEl.style.opacity = '1';
  }, 80);
}

export function refreshHighlight(persist) {
  const idx = state.active;
  // Update markers via DOM (avoid circular import)
  document.querySelectorAll('#map-svg g.marker').forEach(g => {
    const i = parseInt(g.getAttribute('data-idx'));
    g.classList.toggle('active', i === idx);
  });
  rowsEl.querySelectorAll('.hl-row').forEach(row => {
    const ri = parseInt(row.dataset.idx);
    if (ri === idx) {
      row.classList.add('active');
      if (persist) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      row.classList.remove('active');
    }
  });
}

export function setActive(idx, persist) {
  if (persist) stickyIdx = idx;
  state.active = idx;
  refreshHighlight(persist);
}

export function unhover() {
  if (stickyIdx !== null) {
    if (state.active !== stickyIdx) {
      state.active = stickyIdx;
      refreshHighlight(false);
    }
  } else if (state.active !== null) {
    state.active = null;
    refreshHighlight(false);
  }
}

export function clearActive() {
  state.active = null;
  stickyIdx = null;
  refreshHighlight(false);
}

// Event delegation on hotel rows
rowsEl.addEventListener('mouseover', e => {
  const row = e.target.closest('.hl-row');
  if (!row) return;
  const i = parseInt(row.dataset.idx);
  setActive(i, false);
  const h = hotels[i];
  showTooltip(h, e.clientX, e.clientY);
});
rowsEl.addEventListener('mousemove', e => {
  if (tooltipEl.classList.contains('show')) positionTooltip(e.clientX, e.clientY);
});
rowsEl.addEventListener('mouseleave', () => {
  hideTooltip();
  unhover();
});
rowsEl.addEventListener('click', e => {
  const row = e.target.closest('.hl-row');
  if (!row) return;
  const i = parseInt(row.dataset.idx);
  setActive(i, true);
  const h = hotels[i];
  if (_isGlobe && _isGlobe()) {
    _rotateGlobeTo(h.lng, h.lat);
  } else if (_centerFlatOnHotel) {
    _centerFlatOnHotel(h);
  }
});

// Click outside clears active
document.addEventListener('click', e => {
  if (!e.target.closest('.hl-row') && !e.target.closest('g.marker')) {
    if (state.active !== null || stickyIdx !== null) clearActive();
  }
});
