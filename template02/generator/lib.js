// Vanta — Business Presentation Template 02 · design system
const fs = require('fs');
const path = require('path');
const React = require('react');
const RDS = require('react-dom/server');
const sharp = require('sharp');
const PI = require('react-icons/pi');

// ---------- Colour tokens (theme slots in brackets) ----------
const C = {
  INK: '1A1D23',     // [dk1]  text
  WHITE: 'FFFFFF',   // [lt1]
  DEEP: '13246B',    // [dk2]  deep cobalt — dark slides
  IVORY: 'F8F5EF',   // [lt2]  warm white — default background
  COBALT: '2340C8',  // [accent1] primary
  CORAL: 'FF6B4A',   // [accent2] highlight
  SKY: 'B7C6F5',     // [accent3] cobalt tint — supporting data
  MIST: 'DCDFE6',    // [accent4] cool grey — neutral data, rules
  STONE: '6B7080',   // [accent5] muted text
  PEACH: 'FFD3C4',   // [accent6] coral tint
  // non-slot helpers
  DEEP2: '1D3283',   // raised panel on deep cobalt
  RULE: 'E4E0D8',    // warm hairline on ivory
  GRID: 'E9E6DF',    // chart gridline on ivory/white
  GRIDD: '2A3C86',   // chart gridline on deep cobalt
  CORALD: 'D9482A',  // coral for small text on light
  SKYD: '8FA3E8',    // muted text on deep cobalt
};
const F = { SERIF: 'Georgia', SANS: 'Arial' };
const SW = 13.333, SH = 7.5, M = 0.7, CW = SW - 2 * M, G = 0.24;
const COLW = (CW - 11 * G) / 12;
const gx = (c) => M + c * (COLW + G);
const gw = (n) => n * COLW + (n - 1) * G;
const CT = 1.95, CB = 6.65;

// ---------- Icons: Phosphor Light, SVG + PNG fallback ----------
const ICON_DIR = path.join(__dirname, 'icons');
const ICON_COLORS = [C.INK, C.COBALT, C.CORAL, C.WHITE, C.STONE, C.DEEP, C.SKY];
const iconCache = {};
async function prerenderIcons(names) {
  fs.mkdirSync(ICON_DIR, { recursive: true });
  for (const n of names) for (const col of ICON_COLORS) {
    let svg = RDS.renderToStaticMarkup(React.createElement(PI[`Pi${n}Light`], { size: 256 }));
    svg = svg.replace(/currentColor/g, '#' + col).replace(/ style="[^"]*"/, '');
    if (!svg.includes('xmlns=')) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    const key = `Pi${n}Light_${col}`;
    fs.writeFileSync(path.join(ICON_DIR, key + '.svg'), svg);
    const png = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
    iconCache[key] = 'image/png;base64,' + png.toString('base64');
  }
}
function icon(s, name, x, y, size, color = C.INK) {
  const key = `Pi${name}Light_${color}`;
  if (!iconCache[key]) throw new Error('icon not prerendered ' + key);
  s.addImage({ data: iconCache[key], x, y, w: size, h: size, objectName: `Icon Pi${name}Light ${color}` });
}

// ---------- Primitives ----------
function t(s, text, o = {}) {
  const opt = {
    x: o.x, y: o.y, w: o.w, h: o.h, fontFace: o.font || F.SANS, fontSize: o.size || 11, color: o.color || C.INK,
    bold: !!o.bold, italic: !!o.italic, align: o.align || 'left', valign: o.valign || 'top', margin: 0,
    isTextBox: true, fit: 'none', wrap: true,
  };
  if (o.charSpacing) opt.charSpacing = o.charSpacing;
  if (o.lineSpacingMultiple) opt.lineSpacingMultiple = o.lineSpacingMultiple;
  if (o.paraSpaceAfter) opt.paraSpaceAfter = o.paraSpaceAfter;
  if (o.rotate) opt.rotate = o.rotate;
  s.addText(text, opt);
}
function box(s, x, y, w, h, o = {}) {
  const opt = { x, y, w, h, fill: o.fill ? { color: o.fill, transparency: o.transparency || 0 } : { type: 'none' } };
  opt.line = o.line ? { color: o.line, width: o.lw || 0.75, dashType: o.dash || 'solid' } : { type: 'none' };
  if (o.radius) { opt.rectRadius = o.radius; s.addShape('roundRect', opt); } else s.addShape('rect', opt);
}
function circ(s, x, y, d, o = {}) {
  s.addShape('ellipse', {
    x, y, w: d, h: d, fill: o.fill ? { color: o.fill, transparency: o.transparency || 0 } : { type: 'none' },
    line: o.line ? { color: o.line, width: o.lw || 0.75, dashType: o.dash || 'solid' } : { type: 'none' },
  });
}
function rule(s, x, y, w, o = {}) {
  s.addShape('line', { x, y, w, h: 0, line: { color: o.color || C.RULE, width: o.lw || 0.75, dashType: o.dash || 'solid' } });
}
function vrule(s, x, y, h, o = {}) {
  s.addShape('line', { x, y, w: 0, h, line: { color: o.color || C.RULE, width: o.lw || 0.75, dashType: o.dash || 'solid' } });
}
function arrow(s, x, y, w, h, o = {}) {
  s.addShape('line', { x, y, w, h, flipV: !!o.flipV, line: { color: o.color || C.INK, width: o.lw || 1, endArrowType: 'triangle' } });
}
function arc(s, x, y, d, a0, a1, color, thick) {
  s.addShape('blockArc', { x, y, w: d, h: d, fill: { color }, line: { type: 'none' }, angleRange: [a0, a1], arcThicknessRatio: thick });
}

// ---------- Components ----------
// Eyebrow: coral dot + spaced caps
function eyebrow(s, x, y, text, o = {}) {
  circ(s, x, y + 0.055, 0.09, { fill: C.CORAL });
  t(s, text.toUpperCase(), { x: x + 0.2, y, w: o.w || 6, h: 0.22, size: 8.5, bold: true, charSpacing: 2.2, color: o.dark ? C.SKY : C.COBALT });
}
function header(s, sec, title, o = {}) {
  eyebrow(s, M, 0.55, sec, { dark: o.dark });
  s.addText(title, { placeholder: 'title', align: 'left' });
  if (o.lead) t(s, o.lead, { x: gx(8) + 0.12, y: 0.86, w: gw(4) - 0.12, h: 0.9, size: 10.5, color: o.dark ? C.SKY : C.STONE, lineSpacingMultiple: 1.25 });
}
function chip(s, x, y, text, o = {}) {
  const h = o.h || 0.28, w = o.w || Math.max(0.55, text.length * (o.size || 8.5) * 0.0078 + 0.34);
  const v = { coral: [C.CORAL, null, C.WHITE], cobalt: [C.COBALT, null, C.WHITE], deep: [C.DEEP, null, C.WHITE], peach: [C.PEACH, null, C.CORALD],
    sky: [C.SKY, null, C.DEEP], white: [C.WHITE, C.MIST, C.INK], outline: [null, C.MIST, C.INK], outlineDark: [null, C.SKYD, C.WHITE] }[o.variant || 'coral'];
  box(s, x, y, w, h, { fill: v[0], line: v[1], radius: h / 2 });
  t(s, text, { x, y, w, h, size: o.size || 8.5, bold: true, color: v[2], align: 'center', valign: 'middle' });
  return w;
}
function iconDot(s, name, x, y, d, o = {}) {
  circ(s, x, y, d, { fill: o.bg || C.COBALT, line: o.line });
  const is = d * (o.scale || 0.54);
  icon(s, name, x + (d - is) / 2, y + (d - is) / 2, is, o.fg || C.WHITE);
}
// Editorial KPI: label, big number, delta
function kpi(s, x, y, w, o) {
  const dark = !!o.dark, vs = o.size || 34;
  t(s, o.label.toUpperCase(), { x, y, w, h: 0.22, size: 8, bold: true, charSpacing: 1.6, color: dark ? C.SKY : C.STONE });
  t(s, o.value, { x, y: y + 0.26, w, h: vs / 72 * 1.25, size: vs, bold: true, color: o.color || (dark ? C.WHITE : C.INK) });
  if (o.delta) {
    const up = !o.down;
    t(s, [{ text: (up ? '▲ ' : '▼ ') + o.delta, options: { bold: true, color: dark ? (up ? C.CORAL : C.SKY) : (up ? C.COBALT : C.CORALD) } },
      { text: o.note ? '  ' + o.note : '', options: { color: dark ? C.SKYD : C.STONE } }],
    { x, y: y + 0.3 + vs / 72 * 1.25, w, h: 0.22, size: 9 });
  }
}
function footnote(s, text, o = {}) { t(s, text, { x: M, y: 6.66, w: o.w || 9, h: 0.2, size: 7.5, color: o.dark ? C.SKYD : C.STONE }); }
// Italic serif index numeral, e.g. 01
function numeral(s, x, y, n, o = {}) {
  t(s, String(n).padStart(2, '0'), { x, y, w: o.w || 0.9, h: (o.size || 30) / 72 * 1.25, font: F.SERIF, italic: true, size: o.size || 30, color: o.color || C.CORAL });
}
// Orbit motif: concentric outlines + coral sun + satellite dots
function orbit(s, cx, cy, r, o = {}) {
  const lc = o.line || C.COBALT;
  [1, 0.74, 0.5].forEach((k, i) => circ(s, cx - r * k, cy - r * k, 2 * r * k, { line: lc, lw: 0.9, transparency: 0 }));
  circ(s, cx - r * 0.2, cy - r * 0.2, r * 0.4, { fill: o.sun || C.CORAL });
  const sat = o.sat || [[1, -40, 0.12, C.WHITE], [0.74, 145, 0.09, C.CORAL], [0.5, 250, 0.07, C.SKY], [1, 112, 0.06, C.SKY]];
  sat.forEach(([k, a, d, col]) => {
    const rad = a * Math.PI / 180;
    circ(s, cx + Math.cos(rad) * r * k - d / 2, cy + Math.sin(rad) * r * k - d / 2, d, { fill: col });
  });
}

// ---------- Chart presets ----------
function cb(o = {}) {
  const dark = !!o.dark, bg = o.bg || (dark ? C.DEEP : C.WHITE);
  const lab = dark ? C.SKY : C.STONE;
  return Object.assign({
    x: o.x, y: o.y, w: o.w, h: o.h,
    catAxisLabelFontFace: F.SANS, valAxisLabelFontFace: F.SANS, dataLabelFontFace: F.SANS, legendFontFace: F.SANS,
    catAxisLabelFontSize: 9, valAxisLabelFontSize: 8.5, dataLabelFontSize: 9, legendFontSize: 9,
    catAxisLabelColor: lab, valAxisLabelColor: lab, legendColor: dark ? C.SKY : C.INK, dataLabelColor: dark ? C.WHITE : C.INK,
    valGridLine: { color: dark ? C.GRIDD : C.GRID, size: 0.75 }, catGridLine: { style: 'none' },
    catAxisLineShow: true, catAxisLineColor: dark ? C.GRIDD : C.MIST, catAxisLineSize: 0.75, valAxisLineShow: false,
    catAxisMajorTickMark: 'none', valAxisMajorTickMark: 'none',
    showLegend: false, legendPos: 't',
    chartArea: { fill: { color: bg } }, plotArea: { fill: { color: bg } },
  }, o.extra || {});
}
// per-series dash via combo of LINE entries (pptxgenjs lineDash is one string per chart)
function dashedLines(pres, s, series, colors, dashes, sOpts, base) {
  s.addChart(series.map((d, i) => ({ type: pres.charts.LINE, data: [d],
    options: Object.assign({ chartColors: series.map(() => colors[i]), lineDash: dashes[i] || 'solid' }, sOpts || {}) })), base);
}
// legend swatch row (manual, for exact styling)
function legend(s, x, y, items, o = {}) {
  let cx = x;
  items.forEach(([label, col, kind]) => {
    if (kind === 'line') box(s, cx, y + 0.09, 0.28, 0.035, { fill: col });
    else if (kind === 'dash') { box(s, cx, y + 0.09, 0.1, 0.035, { fill: col }); box(s, cx + 0.16, y + 0.09, 0.1, 0.035, { fill: col }); }
    else box(s, cx, y + 0.04, 0.13, 0.13, { fill: col });
    const w = label.length * 0.068 + 0.2;
    t(s, label, { x: cx + (kind ? 0.36 : 0.2), y, w, h: 0.2, size: 8.5, color: o.dark ? C.SKY : C.INK });
    cx += w + (kind ? 0.5 : 0.36);
  });
}

// Chart panel: sharp white panel with a small title row; returns the inner chart box
function panel(s, x, y, w, h, o = {}) {
  const dark = !!o.dark;
  box(s, x, y, w, h, { fill: o.fill || (dark ? C.DEEP2 : C.WHITE), line: o.line });
  if (o.title) t(s, o.title, { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.24, size: 10.5, bold: true, color: dark ? C.WHITE : C.INK });
  if (o.sub) t(s, o.sub, { x: x + 0.25, y: y + 0.44, w: w - 0.5, h: 0.2, size: 8.5, color: dark ? C.SKY : C.STONE });
  const top = o.title ? (o.sub ? 0.72 : 0.52) : 0.15;
  return { x: x + 0.1, y: y + top, w: w - 0.2, h: h - top - 0.1, bg: o.fill || (dark ? C.DEEP2 : C.WHITE) };
}
// Value callout pill placed over a chart point
function callout(s, x, y, text, o = {}) {
  const w = o.w || text.length * 0.075 + 0.3;
  box(s, x - w / 2, y, w, 0.3, { fill: o.fill || C.CORAL, radius: 0.15 });
  t(s, text, { x: x - w / 2, y, w, h: 0.3, size: 9, bold: true, color: o.color || C.WHITE, align: 'center', valign: 'middle' });
}

// ---------- Masters ----------
function defineMasters(pres) {
  const foot = (dark) => [
    { text: { text: 'VANTA', options: { x: M, y: 7.0, w: 0.7, h: 0.2, fontFace: F.SANS, bold: true, fontSize: 7.5, charSpacing: 2.5, color: dark ? C.WHITE : C.INK, margin: 0, valign: 'middle' } } },
    { text: { text: 'Business Presentation Template 02', options: { x: M + 0.72, y: 7.0, w: 4, h: 0.2, fontFace: F.SANS, fontSize: 7.5, color: dark ? C.SKYD : C.STONE, margin: 0, valign: 'middle' } } },
  ];
  const ttl = (dark) => ({ placeholder: { options: { name: 'title', type: 'title', x: M, y: 0.82, w: gw(8) - 0.15, h: 1.0, fontFace: F.SERIF, fontSize: 27, color: dark ? C.WHITE : C.INK, align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 0.98 }, text: 'Slide headline states the key message' } });
  const sn = (dark) => ({ x: SW - M - 0.6, y: 7.0, w: 0.6, h: 0.2, fontFace: F.SANS, fontSize: 7.5, bold: true, color: dark ? C.SKY : C.COBALT, align: 'right', margin: 0 });
  pres.defineSlideMaster({ title: 'Vanta — Ivory', background: { color: C.IVORY }, objects: [...foot(false), ttl(false)], slideNumber: sn(false) });
  pres.defineSlideMaster({ title: 'Vanta — White', background: { color: C.WHITE }, objects: [...foot(false), ttl(false)], slideNumber: sn(false) });
  pres.defineSlideMaster({ title: 'Vanta — Cobalt', background: { color: C.DEEP }, objects: [...foot(true), ttl(true)], slideNumber: sn(true) });
  pres.defineSlideMaster({ title: 'Vanta — Blank Ivory', background: { color: C.IVORY }, objects: [...foot(false)], slideNumber: sn(false) });
  pres.defineSlideMaster({ title: 'Vanta — Blank Cobalt', background: { color: C.DEEP }, objects: [] });
}
const L = { IV: 'Vanta — Ivory', WH: 'Vanta — White', CO: 'Vanta — Cobalt', BIV: 'Vanta — Blank Ivory', BCO: 'Vanta — Blank Cobalt' };

module.exports = { C, F, SW, SH, M, CW, G, COLW, gx, gw, CT, CB, L, prerenderIcons, icon, t, box, circ, rule, vrule, arrow, arc,
  eyebrow, header, chip, iconDot, kpi, footnote, numeral, orbit, cb, dashedLines, legend, panel, callout, defineMasters };
