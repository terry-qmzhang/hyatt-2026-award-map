import { isUp, losesCert, gainsCert, losesC17, rateInfo, fmt } from './utils.js';

function buildTooltipTags(h) {
  const tags = [];
  if (h.ai) {
    tags.push(`<span class="tt-tag ${isUp(h) ? 'tag-up' : 'tag-down'}">${h.oc} \u2192 ${h.nc} ${isUp(h) ? '\u5347' : '\u964d'}</span>`);
  } else {
    const dlt = h.nw - h.o;
    if (dlt > 0) tags.push(`<span class="tt-tag tag-up">Cat ${h.o} \u2192 ${h.nw} (\u5347 ${dlt} \u7ea7)</span>`);
    else if (dlt < 0) tags.push(`<span class="tt-tag tag-down">Cat ${h.o} \u2192 ${h.nw} (\u964d ${-dlt} \u7ea7)</span>`);
    else tags.push(`<span class="tt-tag">Cat ${h.o} \u2192 ${h.nw}</span>`);
  }
  if (losesCert(h)) tags.push('<span class="tt-tag tag-cert">\u5931\u53bb 1-4 cert</span>');
  if (gainsCert(h)) tags.push('<span class="tt-tag tag-down">\u6062\u590d 1-4 cert</span>');
  if (losesC17(h)) tags.push('<span class="tt-tag tag-cert">\u5931\u53bb 1-7 cert</span>');
  if (h.early) tags.push('<span class="tt-tag tag-early">2/25 \u5df2\u751f\u6548</span>');
  return tags;
}

function buildTooltipRates(h) {
  if (!h.ai) {
    const r = rateInfo(h);
    if (r) {
      const sP = r.stdPct, pP = r.pkPct;
      const sCls = sP > 0 ? 'pos' : (sP < 0 ? 'neg' : '');
      const pCls = pP > 0 ? 'pos' : (pP < 0 ? 'neg' : '');
      const sSig = sP > 0 ? '+' : '';
      const pSig = pP > 0 ? '+' : '';
      const urDeltaStd = r.nM - r.oS;
      const urDeltaPk = r.nT - r.oP;
      return `
        <div class="tt-rates">
          <div class="rl"><span class="lab">\u6807\u51c6 (\u4e2d\u4f4d)</span><span>${fmt(r.oS)} \u2192 ${fmt(r.nM)} <span class="${sCls}">${sSig}${sP.toFixed(1)}%</span></span></div>
          <div class="rl"><span class="lab">\u5cf0\u503c</span><span>${fmt(r.oP)} \u2192 ${fmt(r.nT)} <span class="${pCls}">${pSig}${pP.toFixed(1)}%</span></span></div>
        </div>
        <div class="tt-tip">
          Chase UR 1:1 \u8f6c\u70b9\uff1a\u5355\u665a\u6807\u51c6\u4ef7\u591a\u8017 <strong>${urDeltaStd >= 0 ? '+' : ''}${fmt(urDeltaStd)}</strong> UR\uff0c\u5cf0\u503c\u591a\u8017 <strong>${urDeltaPk >= 0 ? '+' : ''}${fmt(urDeltaPk)}</strong> UR
        </div>
      `;
    }
  } else {
    return `<div class="tt-rates"><div class="rl"><span class="lab">All-Inclusive</span><span>${h.oc} \u2192 ${h.nc}</span></div></div>`;
  }
  return '';
}

export function tooltipHTML(h) {
  const tags = buildTooltipTags(h);
  const rates = buildTooltipRates(h);
  return `
    <div class="tt-name">${h.n}</div>
    <div class="tt-loc">${h.c}</div>
    <div class="tt-tags">${tags.join('')}</div>
    ${rates}
  `;
}

const tooltipEl = document.getElementById('tooltip');

export function showTooltip(h, x, y) {
  tooltipEl.innerHTML = tooltipHTML(h);
  tooltipEl.classList.add('show');
  positionTooltip(x, y);
}

export function positionTooltip(x, y) {
  const r = tooltipEl.getBoundingClientRect();
  const w = window.innerWidth, hwin = window.innerHeight;
  let left = x + 14, top = y + 14;
  if (left + r.width > w - 8) left = x - r.width - 14;
  if (top + r.height > hwin - 8) top = y - r.height - 14;
  tooltipEl.style.left = left + 'px';
  tooltipEl.style.top = top + 'px';
}

export function hideTooltip() {
  tooltipEl.classList.remove('show');
}
