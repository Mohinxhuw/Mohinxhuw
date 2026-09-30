// Vertex design system — shared tokens, masters and components.
const fs = require('fs');
const path = require('path');
const React = require('react');
const RDS = require('react-dom/server');
const sharp = require('sharp');
const PI = require('react-icons/pi');

// ---------- Tokens ----------
const C = {
  NAVY: '0A1628',   // dk1  / tx1  — primary ink, dark surfaces
  WHITE: 'FFFFFF',  // lt1  / bg1
  CHAR: '2E3645',   // dk2  / tx2  — body text
  OFF: 'F3F5F7',    // lt2  / bg2  — off-white surfaces
  LIME: 'C6F432',   // accent1 — electric lime
  STEEL: '2C4A74',  // accent2 — secondary data navy
  SLATE: '6B7688',  // accent3 — muted text, tertiary data
  MIST: 'D5DBE3',   // accent4 — hairlines, inactive data
  NAVY2: '17253D',  // accent5 — raised surface on navy
  OLIVE: '5B7A0C',  // accent6 — lime-family text on light (positive deltas)
  GRID: 'E6E9EE',   // chart gridlines (neutral, not a theme slot)
  GRIDD: '24334C',  // chart gridlines on navy
};
const F = {
  DISP: 'Manrope ExtraBold', // display / KPI
  HEAD: 'Manrope',            // headings (bold)
  BODY: 'Inter',
  MED: 'Inter Medium',
};
const SW = 13.333, SH = 7.5, M = 0.6, CW = SW - 2 * M, G = 0.25;
const COLW = (CW - 11 * G) / 12;
const gx = (c) => M + c * (COLW + G);
const gw = (span) => span * COLW + (span - 1) * G;
const R = 0.1; // global corner radius (in)
const CT = 1.95; // content top
const CB = 6.6;  // content bottom

// ---------- Icons ----------
const ICON_DIR = path.join(__dirname, 'icons');
const ICON_COLORS = [C.NAVY, C.LIME, C.WHITE, C.SLATE, C.OLIVE, C.MIST];
const iconCache = {};
async function prerenderIcons(names) {
  fs.mkdirSync(ICON_DIR, { recursive: true });
  for (const n of names) {
    for (const col of ICON_COLORS) {
      let svg = RDS.renderToStaticMarkup(React.createElement(PI[n], { size: 256 }));
      svg = svg.replace(/currentColor/g, '#' + col);
      if (!svg.includes('xmlns=')) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      svg = svg.replace(/ style="[^"]*"/, '');
      const key = `${n}_${col}`;
      fs.writeFileSync(path.join(ICON_DIR, key + '.svg'), svg);
      const png = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
      iconCache[key] = 'image/png;base64,' + png.toString('base64');
    }
  }
}

// ---------- Primitives ----------
function t(s, text, o = {}) {
  const opt = {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fontFace: o.font || F.BODY, fontSize: o.size || 12, color: o.color || C.CHAR,
    bold: !!o.bold, italic: !!o.italic, align: o.align || 'left', valign: o.valign || 'top',
    margin: o.margin !== undefined ? o.margin : 0, isTextBox: true, fit: 'none', wrap: true,
  };
  if (o.charSpacing) opt.charSpacing = o.charSpacing;
  if (o.lineSpacingMultiple) opt.lineSpacingMultiple = o.lineSpacingMultiple;
  if (o.paraSpaceAfter) opt.paraSpaceAfter = o.paraSpaceAfter;
  if (o.fill) opt.fill = { color: o.fill };
  if (o.rotate) opt.rotate = o.rotate;
  if (o.name) opt.objectName = o.name;
  s.addText(text, opt);
}
function rect(s, x, y, w, h, o = {}) {
  const opt = { x, y, w, h, fill: o.fill ? { color: o.fill, transparency: o.transparency || 0 } : { type: 'none' } };
  opt.line = o.line ? { color: o.line, width: o.lw || 0.75, dashType: o.dash || 'solid' } : { type: 'none' };
  if (o.name) opt.objectName = o.name;
  if (o.radius === 0 || o.square) s.addShape('rect', opt);
  else { opt.rectRadius = o.radius !== undefined ? o.radius : R; s.addShape('roundRect', opt); }
}
function oval(s, x, y, d, o = {}) {
  s.addShape('ellipse', {
    x, y, w: d, h: o.h || d,
    fill: o.fill ? { color: o.fill, transparency: o.transparency || 0 } : { type: 'none' },
    line: o.line ? { color: o.line, width: o.lw || 0.75, dashType: o.dash || 'solid' } : { type: 'none' },
  });
}
function line(s, x, y, w, h, o = {}) {
  const ln = { color: o.color || C.MIST, width: o.lw || 0.75, dashType: o.dash || 'solid' };
  if (o.arrow) ln.endArrowType = 'triangle';
  if (o.startArrow) ln.beginArrowType = 'triangle';
  s.addShape('line', { x, y, w, h, line: ln, flipV: !!o.flipV });
}
function pie(s, x, y, d, a0, a1, color) {
  s.addShape('pie', { x, y, w: d, h: d, fill: { color }, line: { type: 'none' }, angleRange: [a0, a1] });
}
function arc(s, x, y, d, a0, a1, color, thick) {
  s.addShape('blockArc', { x, y, w: d, h: d, fill: { color }, line: { type: 'none' }, angleRange: [a0, a1], arcThicknessRatio: thick });
}
function icon(s, name, x, y, size, color = C.NAVY) {
  const key = `${name}_${color}`;
  if (!iconCache[key]) throw new Error('icon not prerendered ' + key);
  s.addImage({ data: iconCache[key], x, y, w: size, h: size, objectName: `Icon ${name} ${color}` });
}

// ---------- Components ----------
// Section tag: lime square + uppercase label
function tag(s, x, y, text, o = {}) {
  rect(s, x, y + 0.075, 0.1, 0.1, { fill: C.LIME, square: true });
  t(s, text.toUpperCase(), { x: x + 0.2, y, w: o.w || 5, h: 0.25, font: F.MED, size: 9.5, color: o.dark ? C.MIST : C.CHAR, charSpacing: 1.5 });
}
// Standard content header (uses the master title placeholder)
function header(s, section, title, o = {}) {
  tag(s, M, 0.48, section, { dark: o.dark });
  s.addText(title, { placeholder: 'title', align: 'left' });
  if (o.lead) t(s, o.lead, { x: gx(8), y: 0.82, w: gw(4), h: 0.95, size: 11.5, color: o.dark ? C.MIST : C.SLATE, lineSpacingMultiple: 1.2 });
}
function pill(s, x, y, text, o = {}) {
  const h = o.h || 0.3;
  const w = o.w || Math.max(0.6, text.length * (o.size || 9) * 0.0082 + 0.36);
  const v = o.variant || 'lime';
  const st = {
    lime: { fill: C.LIME, color: C.NAVY },
    navy: { fill: C.NAVY, color: C.WHITE },
    off: { fill: C.OFF, color: C.CHAR },
    white: { fill: C.WHITE, color: C.NAVY },
    outline: { line: C.MIST, color: C.CHAR },
    outlineDark: { line: C.SLATE, color: C.MIST },
    navy2: { fill: C.NAVY2, color: C.WHITE },
  }[v];
  rect(s, x, y, w, h, { fill: st.fill, line: st.line, radius: h / 2 });
  t(s, text, { x, y, w, h, font: F.MED, size: o.size || 9, color: st.color, align: 'center', valign: 'middle' });
  return w;
}
function badge(s, name, x, y, d, o = {}) {
  const bg = o.bg || C.LIME, fg = o.fg || C.NAVY;
  if (o.square) rect(s, x, y, d, d, { fill: bg, radius: R });
  else oval(s, x, y, d, { fill: bg, line: o.line });
  const is = d * (o.scale || 0.52);
  icon(s, name, x + (d - is) / 2, y + (d - is) / 2, is, fg);
}
function card(s, x, y, w, h, o = {}) {
  rect(s, x, y, w, h, { fill: o.fill || C.OFF, line: o.line, radius: o.radius });
}
// KPI card: label / value / delta
function kpi(s, x, y, w, h, o) {
  const v = o.variant || 'off';
  const bg = { off: C.OFF, white: C.WHITE, navy: C.NAVY, navy2: C.NAVY2, lime: C.LIME }[v];
  const dark = v === 'navy' || v === 'navy2';
  card(s, x, y, w, h, { fill: bg, line: v === 'white' ? C.MIST : undefined });
  const p = o.pad || 0.25;
  t(s, o.label, { x: x + p, y: y + p, w: w - 2 * p, h: 0.25, font: F.MED, size: 10, color: dark ? C.MIST : C.CHAR });
  if (o.icon) icon(s, o.icon, x + w - p - 0.3, y + p - 0.03, 0.3, dark ? C.LIME : C.NAVY);
  const vs = o.valueSize || 34;
  const vh = vs / 72 * 1.25;
  const vy = Math.max(y + p + 0.27, y + h - p - (o.delta ? 0.3 : 0) - vh);
  t(s, o.value, { x: x + p, y: vy, w: w - 2 * p, h: vh, font: F.DISP, size: vs, color: dark ? C.WHITE : C.NAVY, valign: 'top' });
  if (o.delta) {
    const up = !o.down;
    const dcol = dark ? C.LIME : (up ? C.OLIVE : C.SLATE);
    t(s, [
      { text: (up ? '▲ ' : '▼ ') + o.delta, options: { color: v === 'lime' ? C.NAVY : dcol, fontFace: F.MED } },
      { text: o.note ? '  ' + o.note : '', options: { color: dark ? C.MIST : C.SLATE } },
    ], { x: x + p, y: y + h - p - 0.22, w: w - 2 * p, h: 0.22, size: 9.5 });
  }
}
function footnote(s, text, o = {}) {
  t(s, text, { x: M, y: 6.62, w: o.w || 8, h: 0.2, size: 8, color: o.dark ? C.MIST : C.SLATE });
}
function stepNum(s, x, y, n, o = {}) {
  t(s, String(n).padStart(2, '0'), { x, y, w: 0.6, h: 0.3, font: F.HEAD, bold: true, size: o.size || 12, color: o.color || C.SLATE });
}
// Bauhaus tile motif: tiles = [[col,row,kind,color,rot]]
function tiles(s, x0, y0, u, list) {
  for (const [cx, cy, kind, col, rot] of list) {
    const x = x0 + cx * u, y = y0 + cy * u;
    if (kind === 'sq') rect(s, x, y, u, u, { fill: col, square: true });
    else if (kind === 'circ') oval(s, x, y, u, { fill: col });
    else if (kind === 'ring') oval(s, x + u * 0.06, y + u * 0.06, u * 0.88, { line: col, lw: 1.5 });
    else if (kind === 'dot') oval(s, x + u * 0.38, y + u * 0.38, u * 0.24, { fill: col });
    else if (kind === 'q') {
      // quarter circle centred on a tile corner; rot 0=TL,1=TR,2=BR,3=BL
      const r = rot || 0;
      const offs = [[-u, -u], [0, -u], [0, 0], [-u, 0]][r];
      const ang = [[0, 90], [90, 180], [180, 270], [270, 360]][r];
      pie(s, x + offs[0], y + offs[1], 2 * u, ang[0], ang[1], col);
    } else if (kind === 'semi') {
      // semicircle (diameter u) with its flat side on a tile edge; rot 0=left,1=top,2=right,3=bottom
      const r = rot || 0;
      const cfg = [[x - u / 2, y, 270, 90], [x, y - u / 2, 0, 180], [x + u / 2, y, 90, 270], [x, y + u / 2, 180, 360]][r];
      pie(s, cfg[0], cfg[1], u, cfg[2], cfg[3], col);
    } else if (kind === 'grid') {
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) oval(s, x + u * (0.2 + i * 0.3) - 0.03, y + u * (0.2 + j * 0.3) - 0.03, 0.06, { fill: col });
    }
  }
}
function dotGrid(s, x, y, cols, rows, gap, d, color, o = {}) {
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) oval(s, x + i * gap, y + j * gap, d, { fill: color, transparency: o.transparency });
}

// ---------- Chart presets ----------
function chartBase(o = {}) {
  const dark = !!o.dark;
  const lab = dark ? C.MIST : C.SLATE;
  const base = {
    x: o.x, y: o.y, w: o.w, h: o.h,
    catAxisLabelFontFace: F.BODY, valAxisLabelFontFace: F.BODY, dataLabelFontFace: F.MED, legendFontFace: F.BODY,
    catAxisLabelFontSize: 9.5, valAxisLabelFontSize: 9, dataLabelFontSize: 9.5, legendFontSize: 9.5,
    catAxisLabelColor: lab, valAxisLabelColor: lab, legendColor: dark ? C.MIST : C.CHAR,
    dataLabelColor: dark ? C.WHITE : C.NAVY,
    valGridLine: { color: dark ? C.GRIDD : C.GRID, size: 0.75 },
    catGridLine: { style: 'none' },
    catAxisLineShow: true, catAxisLineColor: dark ? C.GRIDD : C.MIST, catAxisLineSize: 0.75,
    valAxisLineShow: false,
    showLegend: false, legendPos: 't',
    chartArea: { fill: { color: o.bg || (dark ? C.NAVY : C.WHITE) } },
    plotArea: { fill: { color: o.bg || (dark ? C.NAVY : C.WHITE) } },
    catAxisMajorTickMark: 'none', valAxisMajorTickMark: 'none',
  };
  return Object.assign(base, o.extra || {});
}

// Line chart with a different dash per series. pptxgenjs' `lineDash` takes ONE
// string per chart, so each series becomes its own LINE entry of a combination
// chart sharing the primary axes (native, fully editable in PowerPoint).
function dashedLineChart(pres, s, series, colors, dashes, seriesOpts, base) {
  const types = series.map((d, i) => ({
    type: pres.charts.LINE,
    data: [d],
    // pptxgenjs picks the colour by index, so fill the list with this series' colour
    options: Object.assign({ chartColors: series.map(() => colors[i]), lineDash: dashes[i] || 'solid' }, seriesOpts || {}),
  }));
  s.addChart(types, base);
}

// ---------- Masters ----------
function footer(dark) {
  return [
    { text: { text: 'VERTEX', options: { x: M, y: 6.98, w: 0.9, h: 0.22, fontFace: F.DISP, fontSize: 9, color: dark ? C.WHITE : C.NAVY, charSpacing: 1.5, margin: 0, valign: 'middle' } } },
    { text: { text: 'Business & Sales Template  ·  2026', options: { x: M + 0.95, y: 6.98, w: 4, h: 0.22, fontFace: F.BODY, fontSize: 8.5, color: dark ? C.MIST : C.SLATE, margin: 0, valign: 'middle' } } },
  ];
}
function defineMasters(pres) {
  const titlePh = (dark) => ({
    placeholder: {
      options: { name: 'title', type: 'title', x: M, y: 0.8, w: gw(8) - 0.1, h: 0.95, fontFace: F.HEAD, bold: true, fontSize: 28, color: dark ? C.WHITE : C.NAVY, align: 'left', valign: 'top', margin: 0, lineSpacingMultiple: 0.95 },
      text: 'Add a one-line headline that states the key message',
    },
  });
  const sn = (dark) => ({ x: SW - M - 0.6, y: 6.98, w: 0.6, h: 0.22, fontFace: F.MED, fontSize: 8.5, color: dark ? C.MIST : C.SLATE, align: 'right', margin: 0 });
  pres.defineSlideMaster({ title: 'Vertex — Content Light', background: { color: C.WHITE }, objects: [...footer(false), titlePh(false)], slideNumber: sn(false) });
  pres.defineSlideMaster({ title: 'Vertex — Content Off-white', background: { color: C.OFF }, objects: [...footer(false), titlePh(false)], slideNumber: sn(false) });
  pres.defineSlideMaster({ title: 'Vertex — Content Dark', background: { color: C.NAVY }, objects: [...footer(true), titlePh(true)], slideNumber: sn(true) });
  pres.defineSlideMaster({ title: 'Vertex — Blank Light', background: { color: C.WHITE }, objects: [...footer(false)], slideNumber: sn(false) });
  pres.defineSlideMaster({ title: 'Vertex — Blank Dark', background: { color: C.NAVY }, objects: [] });
  pres.defineSlideMaster({ title: 'Vertex — Blank White', background: { color: C.WHITE }, objects: [] });
}
const L = { LIGHT: 'Vertex — Content Light', OFFW: 'Vertex — Content Off-white', DARK: 'Vertex — Content Dark', BLANK: 'Vertex — Blank Light', BDARK: 'Vertex — Blank Dark', BWHITE: 'Vertex — Blank White' };

module.exports = { C, F, SW, SH, M, CW, G, COLW, gx, gw, R, CT, CB, L, prerenderIcons, t, rect, oval, line, pie, arc, icon, tag, header, pill, badge, card, kpi, footnote, stepNum, tiles, dotGrid, chartBase, dashedLineChart, defineMasters };
