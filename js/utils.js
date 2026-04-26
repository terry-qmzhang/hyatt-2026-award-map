import { OLD_STD, OLD_PK, NEW_MOD, NEW_TOP } from './data.js';

export function rateInfo(h) {
  if (h.ai) return null;
  const oS = OLD_STD[h.o], oP = OLD_PK[h.o], nM = NEW_MOD[h.nw], nT = NEW_TOP[h.nw];
  const stdPct = ((nM - oS) / oS) * 100, pkPct = ((nT - oP) / oP) * 100;
  return { oS, oP, nM, nT, stdPct, pkPct };
}

export function isUp(h) { return h.ai ? (h.nc > h.oc) : (h.nw > h.o); }
export function isDown(h) { return h.ai ? (h.nc < h.oc) : (h.nw < h.o); }
export function losesCert(h) { return !h.ai && h.nw > h.o && h.o <= 4 && h.nw >= 5; }
export function gainsCert(h) { return !h.ai && h.nw < h.o && h.o >= 5 && h.nw <= 4; }
export function losesC17(h) { return !h.ai && h.nw === 8 && h.o < 8; }
export function hasRing(h) { return losesCert(h) || losesC17(h); }

export function colorByPct(h) {
  if (h.ai) {
    return isUp(h) ? 'var(--c-up-mid)' : 'var(--c-save-deep)';
  }
  const r = rateInfo(h);
  if (!r) return 'var(--c-flat)';
  const p = r.stdPct;
  if (p < -15) return 'var(--c-save-deep)';
  if (p < 10) return 'var(--c-flat)';
  if (p < 50) return 'var(--c-up-small)';
  if (p < 85) return 'var(--c-up-mid)';
  return 'var(--c-up-big)';
}

export function pctText(h) {
  if (h.ai) return isUp(h) ? '\u2191' : '\u2193';
  const r = rateInfo(h);
  if (!r) return '\u2014';
  const sign = r.stdPct > 0 ? '+' : '';
  return `${sign}${r.stdPct.toFixed(1)}%`;
}

export function pctClass(h) {
  if (h.ai) return isUp(h) ? 'pos' : 'neg';
  const r = rateInfo(h);
  if (!r) return '';
  return r.stdPct > 0 ? 'pos' : (r.stdPct < 0 ? 'neg' : '');
}

export function catText(h) {
  if (h.ai) return `${h.oc} \u2192 ${h.nc}`;
  return `${h.o} \u2192 ${h.nw}`;
}

export function fmt(n) { return n.toLocaleString(); }
