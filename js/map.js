import { CONFIG } from './config.js';
import { hotels } from './data.js';
import { state, matchesFilter } from './state.js';
import { colorByPct, hasRing } from './utils.js';
import { showTooltip, positionTooltip, hideTooltip } from './tooltip.js';
import { setActive, unhover } from './list.js';

const mapSvg = d3.select('#map-svg');
const mapG = mapSvg.append('g');
const sphereG = mapG.append('path').datum({ type: 'Sphere' }).attr('class', 'sphere').style('opacity', 0);
const landG = mapG.append('g');
const gratG = mapG.append('g');
const markersG = mapG.append('g');

const flatProj = d3.geoNaturalEarth1().scale(CONFIG.FLAT_SCALE).translate(CONFIG.FLAT_XY);
const globeProj = d3.geoOrthographic().clipAngle(90).scale(CONFIG.GLOBE_SCALE).translate(CONFIG.GLOBE_XY);
let isGlobeMode = false;
let isMorphing = false;
export let worldData = null;
let globeRotation = [...CONFIG.GLOBE_ROT0];
let globeScale = CONFIG.GLOBE_SCALE;

// Flat-mode zoom
let currentZoomK = 1;
const flatZoom = d3.zoom()
  .scaleExtent([CONFIG.ZOOM_MIN, CONFIG.ZOOM_MAX])
  .extent([[0, 0], [CONFIG.VB_W, CONFIG.VB_H]])
  .on('zoom', e => {
    mapG.attr('transform', e.transform);
    currentZoomK = e.transform.k;
    rescaleMarkers();
  });

function rescaleMarkers() {
  const k = currentZoomK;
  const r = CONFIG.MARKER_R / k;
  markersG.selectAll('.m-fill').attr('r', r).each(function (d) {
    d3.select(this).attr('stroke-width', (hasRing(d) ? CONFIG.MARKER_RING : CONFIG.MARKER_STROKE) / k);
  });
  markersG.selectAll('.pulse-a, .pulse-b').attr('r', r).attr('stroke-width', CONFIG.MARKER_RING / k);
}

// Globe-mode drag & wheel
let dragStart = null;
const globeDrag = d3.drag()
  .on('start', e => { dragStart = { x: e.x, y: e.y, rot: [...globeRotation] }; })
  .on('drag', e => {
    if (!dragStart) return;
    const dx = e.x - dragStart.x, dy = e.y - dragStart.y;
    globeRotation = [
      dragStart.rot[0] + dx * CONFIG.DRAG_K,
      Math.max(-90, Math.min(90, dragStart.rot[1] - dy * CONFIG.DRAG_K)),
      0
    ];
    globeProj.rotate(globeRotation);
    drawMap();
  });

function globeWheel(e) {
  e.preventDefault();
  const factor = e.deltaY > 0 ? CONFIG.WHEEL_OUT : CONFIG.WHEEL_IN;
  globeScale = Math.max(CONFIG.GSCALE_MIN, Math.min(CONFIG.GSCALE_MAX, globeScale * factor));
  globeProj.scale(globeScale);
  drawMap();
}

function enableFlatInteractions() {
  mapSvg.on('.drag', null);
  mapSvg.on('wheel.globe', null);
  currentZoomK = 1;
  mapSvg.call(flatZoom);
  mapSvg.call(flatZoom.transform, d3.zoomIdentity);
  rescaleMarkers();
  document.getElementById('map-wrap').classList.remove('globe-active');
}

function enableGlobeInteractions() {
  mapSvg.on('.zoom', null);
  mapG.attr('transform', null);
  currentZoomK = 1;
  rescaleMarkers();
  mapSvg.call(globeDrag);
  mapSvg.on('wheel.globe', globeWheel, { passive: false });
  document.getElementById('map-wrap').classList.add('globe-active');
}

function initMarkers() {
  const sel = markersG.selectAll('g.marker').data(hotels, d => d._i);
  const enter = sel.enter().append('g')
    .attr('class', 'marker')
    .attr('data-idx', d => d._i)
    .style('color', d => colorByPct(d));

  enter.append('circle').attr('class', 'pulse pulse-a').attr('r', CONFIG.MARKER_R).attr('stroke', 'currentColor');
  enter.append('circle').attr('class', 'pulse pulse-b').attr('r', CONFIG.MARKER_R).attr('stroke', 'currentColor');
  enter.append('circle').attr('class', 'm-fill').attr('r', CONFIG.MARKER_R)
    .attr('fill', 'currentColor')
    .attr('stroke', d => hasRing(d) ? 'var(--cert-ring)' : 'rgba(0,0,0,0.18)')
    .attr('stroke-width', d => hasRing(d) ? CONFIG.MARKER_RING : CONFIG.MARKER_STROKE);

  enter.on('mouseenter', (e, d) => { showTooltip(d, e.clientX, e.clientY); setActive(d._i, false); })
    .on('mousemove', e => positionTooltip(e.clientX, e.clientY))
    .on('mouseleave', () => { hideTooltip(); unhover(); })
    .on('click', (e, d) => { setActive(d._i, true); e.stopPropagation(); });
}

function isMarkerVisible(d) {
  const rot = globeProj.rotate();
  const lng = d.lng + rot[0];
  const lngR = lng * Math.PI / 180, latR = d.lat * Math.PI / 180;
  const x = Math.cos(latR) * Math.cos(lngR);
  return x > -0.05;
}

export function drawMap() {
  const proj = isGlobeMode ? globeProj : flatProj;
  const path = d3.geoPath(proj);

  landG.selectAll('path').attr('d', path);
  gratG.select('path').attr('d', path);
  sphereG.attr('d', path);

  const visibleSet = new Set(hotels.filter(matchesFilter).map(h => h._i));

  markersG.selectAll('g.marker').each(function (d) {
    const p = proj([d.lng, d.lat]);
    const g = d3.select(this);
    if (isGlobeMode) {
      const vis = isMarkerVisible(d);
      if (p && vis) {
        g.attr('transform', `translate(${p[0]},${p[1]})`).style('display', null);
      } else {
        g.style('display', 'none');
      }
    } else {
      if (p) g.attr('transform', `translate(${p[0]},${p[1]})`).style('display', null);
      else g.style('display', 'none');
    }
    g.classed('dim', !visibleSet.has(d._i))
      .classed('active', d._i === state.active);
  });
}

function drawMapWithProj(proj, blend) {
  const path = d3.geoPath(proj);
  landG.selectAll('path').attr('d', path);
  gratG.select('path').attr('d', path);
  sphereG.attr('d', path);

  const rot = globeRotation;
  const visibleSet = new Set(hotels.filter(matchesFilter).map(h => h._i));

  markersG.selectAll('g.marker').each(function (d) {
    const g = d3.select(this);
    const p = proj([d.lng, d.lat]);
    if (!p) {
      g.style('display', 'none').style('opacity', null);
      return;
    }
    if (blend > 0.01) {
      const lngR = (d.lng + rot[0]) * Math.PI / 180;
      const latR = d.lat * Math.PI / 180;
      const cosDist = Math.cos(latR) * Math.cos(lngR);
      const threshold = blend - 1;
      const fadeWidth = 0.15;
      if (cosDist < threshold) {
        g.style('display', 'none').style('opacity', null);
        return;
      }
      g.style('opacity', cosDist < threshold + fadeWidth
        ? Math.max(0, (cosDist - threshold) / fadeWidth)
        : null);
    } else {
      g.style('opacity', null);
    }
    g.attr('transform', `translate(${p[0]},${p[1]})`).style('display', null);
    g.classed('dim', !visibleSet.has(d._i));
  });
}

export function morphView(toGlobe) {
  if (isMorphing) return;
  isMorphing = true;
  mapSvg.on('.zoom', null);
  mapSvg.on('.drag', null);
  mapSvg.on('wheel.globe', null);
  mapG.attr('transform', null);

  const dur = CONFIG.MORPH_MS;
  const t0 = performance.now();

  const flatRaw = d3.geoNaturalEarth1Raw;
  const orthoRaw = d3.geoOrthographicRaw;

  const flatScale = CONFIG.FLAT_SCALE, globeTargetScale = CONFIG.GLOBE_SCALE;
  const [flatTx, flatTy] = CONFIG.FLAT_XY;
  const [globeTx, globeTy] = CONFIG.GLOBE_XY;

  if (toGlobe) {
    globeProj.rotate(globeRotation);
  }

  function step(now) {
    let t = Math.min(1, (now - t0) / dur);
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const blend = toGlobe ? eased : (1 - eased);

    const sc = flatScale + (globeTargetScale - flatScale) * blend;
    const tx = flatTx + (globeTx - flatTx) * blend;
    const ty = flatTy + (globeTy - flatTy) * blend;

    sphereG.style('opacity', blend);

    const rot = globeRotation;
    const blendedProj = d3.geoProjection((lng, lat) => {
      const f = flatRaw(lng, lat);
      const o = orthoRaw(lng, lat);
      if (!f || !o) return f || o || [0, 0];
      return [
        f[0] * (1 - blend) + o[0] * blend,
        f[1] * (1 - blend) + o[1] * blend
      ];
    }).scale(sc).translate([tx, ty]);

    if (blend > 0.01) {
      blendedProj.rotate(rot);
    }
    if (blend > 0.2) {
      blendedProj.clipAngle(180 - ((blend - 0.2) / 0.8) * 90);
    }

    drawMapWithProj(blendedProj, blend);

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      isGlobeMode = toGlobe;
      isMorphing = false;
      sphereG.style('opacity', toGlobe ? 1 : 0);
      markersG.selectAll('g.marker').style('opacity', null);
      if (toGlobe) {
        globeProj.scale(globeTargetScale).translate([globeTx, globeTy]).rotate(globeRotation);
        globeScale = globeTargetScale;
      }
      drawMap();
      if (toGlobe) enableGlobeInteractions();
      else enableFlatInteractions();
    }
  }
  requestAnimationFrame(step);
}

export function rotateGlobeTo(lng, lat) {
  const start = [...globeRotation];
  const target = [-lng, -lat, 0];
  const t0 = performance.now();
  const dur = CONFIG.ROTATE_MS;
  function step(now) {
    const t = Math.min(1, (now - t0) / dur);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    globeRotation = [
      start[0] + (target[0] - start[0]) * eased,
      start[1] + (target[1] - start[1]) * eased,
      0
    ];
    globeProj.rotate(globeRotation);
    drawMap();
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function centerFlatOnHotel(h) {
  const p = flatProj([h.lng, h.lat]);
  if (!p) return;
  const zoomLevel = CONFIG.CENTER_K;
  const tx = CONFIG.VB_W / 2 - p[0] * zoomLevel;
  const ty = CONFIG.VB_H / 2 - p[1] * zoomLevel;
  const transform = d3.zoomIdentity.translate(tx, ty).scale(zoomLevel);
  mapSvg.transition().duration(CONFIG.CENTER_MS).ease(d3.easeCubicInOut).call(flatZoom.transform, transform);
}

export function mapReset() {
  if (isMorphing) return;
  if (isGlobeMode) {
    const startRot = [...globeRotation];
    const startScale = globeScale;
    const targetRot = [...CONFIG.GLOBE_ROT0];
    const targetScale = CONFIG.GLOBE_SCALE;
    const t0 = performance.now(), dur = CONFIG.RESET_MS;
    (function step(now) {
      const t = Math.min(1, (now - t0) / dur);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      globeRotation = [
        startRot[0] + (targetRot[0] - startRot[0]) * e,
        startRot[1] + (targetRot[1] - startRot[1]) * e, 0
      ];
      globeScale = startScale + (targetScale - startScale) * e;
      globeProj.rotate(globeRotation).scale(globeScale);
      drawMap();
      if (t < 1) requestAnimationFrame(step);
    })(performance.now());
  } else {
    mapSvg.transition().duration(CONFIG.RESET_MS).ease(d3.easeCubicInOut)
      .call(flatZoom.transform, d3.zoomIdentity);
  }
}

export function mapZoomBy(factor) {
  if (isMorphing) return;
  if (isGlobeMode) {
    const target = Math.max(CONFIG.GSCALE_MIN, Math.min(CONFIG.GSCALE_MAX, globeScale * factor));
    const startScale = globeScale;
    const t0 = performance.now(), dur = CONFIG.ZOOM_MS;
    (function step(now) {
      const t = Math.min(1, (now - t0) / dur);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      globeScale = startScale + (target - startScale) * e;
      globeProj.scale(globeScale);
      drawMap();
      if (t < 1) requestAnimationFrame(step);
    })(performance.now());
  } else {
    const center = [CONFIG.VB_W / 2, CONFIG.VB_H / 2];
    mapSvg.transition().duration(CONFIG.ZOOM_MS).ease(d3.easeCubicOut)
      .call(flatZoom.scaleBy, factor, center);
  }
}

export function isGlobe() { return isGlobeMode; }
export function isMorphingNow() { return isMorphing; }

export function initMap(world) {
  worldData = world;
  const land = topojson.feature(world, world.objects.countries);
  landG.selectAll('path').data(land.features).enter()
    .append('path').attr('d', d3.geoPath(flatProj)).attr('class', 'land');
  const grat = d3.geoGraticule().step([20, 20])();
  gratG.append('path').datum(grat).attr('d', d3.geoPath(flatProj)).attr('class', 'graticule');
  initMarkers();
  drawMap();
  enableFlatInteractions();
}
