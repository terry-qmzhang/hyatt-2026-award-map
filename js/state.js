import { hotels } from './data.js';
import { isUp, isDown, losesCert, rateInfo } from './utils.js';

export const REGION_CODES = { AM: ['US', 'LA'], EU: ['EU'], APME: ['AP', 'ME'] };

export const state = {
  region: 'all',
  dir: 'all',
  country: '',
  city: '',
  search: '',
  minCat: 0,
  sort: 'pct',
  sortDir: 'desc',
  active: null,
};

export function matchesRegion(h, region) {
  if (region === 'all') return true;
  return REGION_CODES[region].includes(h.r);
}

export function matchesFilter(h) {
  if (!matchesRegion(h, state.region)) return false;
  if (state.dir === 'up' && !isUp(h)) return false;
  if (state.dir === 'down' && !isDown(h)) return false;
  if (state.dir === 'cert' && !losesCert(h)) return false;
  if (state.minCat > 0) {
    const newCat = h.ai ? 0 : h.nw;
    if (newCat < state.minCat) return false;
  }
  if (state.country && h._country !== state.country) return false;
  if (state.city && h.c !== state.city) return false;
  if (state.search) {
    const s = state.search.toLowerCase();
    if (!h.n.toLowerCase().includes(s) && !h.c.toLowerCase().includes(s)) return false;
  }
  return true;
}

export function sortValue(h) {
  if (state.sort === 'name') return h.n.toLowerCase();
  if (state.sort === 'cat') return h.ai ? -1 : (h.nw * 100 + h.o);
  if (h.ai) return isUp(h) ? 30 : -10;
  const r = rateInfo(h);
  return r ? r.stdPct : 0;
}

// Registered callbacks for applyAll
let _drawMap = null;
let _renderList = null;
let _updateResultCount = null;

export function registerCallbacks(drawMap, renderList, updateResultCount) {
  _drawMap = drawMap;
  _renderList = renderList;
  _updateResultCount = updateResultCount;
}

export function applyAll() {
  if (_drawMap) _drawMap();
  if (_renderList) _renderList();
  if (_updateResultCount) _updateResultCount();
}
