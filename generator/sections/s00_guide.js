// Template guide
module.exports = (pres, L, ctx) => {
  const { C, F, M, SW, SH, gx, gw, COLW, G, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, tiles, chartBase } = L;
  const SEC = '00 · Template guide';

  // G1 Guide cover
  {
    const s = pres.addSlide({ masterName: L.L.BWHITE });
    rect(s, 0, 0, SW, SH, { fill: C.OFF, square: true });
    t(s, 'VERTEX', { x: M, y: 0.58, w: 2, h: 0.3, font: F.DISP, size: 13, color: C.NAVY, charSpacing: 2 });
    t(s, 'Template guide', { x: SW - M - 3, y: 0.58, w: 3, h: 0.3, font: F.MED, size: 10, color: C.SLATE, align: 'right' });
    tag(s, M, 1.9, 'Premium business & sales template');
    t(s, [{ text: 'Vertex', options: { color: C.NAVY } }, { text: '.', options: { color: C.OLIVE } }], { x: M - 0.06, y: 2.2, w: 7, h: 1.7, font: F.DISP, size: 110 });
    t(s, 'A complete presentation system for sales, strategy, marketing and executive reporting — built on one grid, one palette and one type system.', { x: M, y: 4.0, w: 6.8, h: 1.0, size: 15, color: C.CHAR, lineSpacingMultiple: 1.3 });
    const stats = [['85+', 'layouts'], ['35+', 'native charts'], ['90', 'vector icons'], ['100%', 'editable']];
    stats.forEach(([v, k], i) => {
      const x = M + i * 1.75;
      t(s, v, { x, y: 5.6, w: 1.6, h: 0.55, font: F.DISP, size: 26, color: C.NAVY });
      t(s, k, { x, y: 6.15, w: 1.6, h: 0.3, size: 10.5, color: C.SLATE });
    });
    ctx.guideStats = s;
    const u = 1.25, x0 = SW - M - 4 * u, y0 = 1.3;
    tiles(s, x0, y0, u, [
      [0, 0, 'sq', C.NAVY], [0, 0, 'q', C.LIME, 2], [1, 0, 'sq', C.WHITE], [1, 0, 'circ', C.NAVY], [2, 0, 'sq', C.NAVY], [2, 0, 'dot', C.LIME], [3, 0, 'sq', C.LIME],
      [0, 1, 'sq', C.LIME], [0, 1, 'semi', C.NAVY, 2], [1, 1, 'sq', C.NAVY2], [1, 1, 'ring', C.LIME], [2, 1, 'sq', C.WHITE], [2, 1, 'q', C.NAVY, 0], [3, 1, 'sq', C.NAVY],
      [0, 2, 'sq', C.NAVY], [0, 2, 'grid', C.LIME], [1, 2, 'sq', C.WHITE], [1, 2, 'semi', C.LIME, 3], [2, 2, 'sq', C.NAVY], [2, 2, 'q', C.LIME, 1], [3, 2, 'sq', C.WHITE], [3, 2, 'circ', C.NAVY],
      [0, 3, 'sq', C.WHITE], [1, 3, 'sq', C.NAVY], [1, 3, 'q', C.WHITE, 3], [2, 3, 'sq', C.LIME], [3, 3, 'sq', C.NAVY2], [3, 3, 'dot', C.LIME],
    ]);
    s.addNotes('TEMPLATE GUIDE. The first section explains how to use the template. Delete slides 1–10 before presenting.');
  }

  // G2 How to use
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'How to use this template', { lead: 'Six steps from download to finished deck. Everything is native PowerPoint — no plug-ins required.' });
    const steps = [
      ['PiTextAa', 'Install the fonts', 'Install Manrope and Inter (free, SIL Open Font License) from Google Fonts before editing.'],
      ['PiSquaresFour', 'Pick a layout', 'Duplicate a slide, or use Home › New Slide to start from a Vertex master layout.'],
      ['PiNotePencil', 'Replace the content', 'Click any text to type. Headlines should state the message, not the topic.'],
      ['PiPalette', 'Change the colours', 'Design › Variants › Colors. Every shape and chart follows the Vertex theme.'],
      ['PiChartBar', 'Edit the charts', 'Right-click a chart › Edit Data. Charts are native and re-colour with the theme.'],
      ['PiSparkle', 'Swap the icons', 'Icons are SVG. Use Graphics Format › Fill to recolour, or Convert to Shape.'],
    ];
    const cw = gw(4), ch = 2.1;
    steps.forEach(([ic, h1, d], i) => {
      const x = gx((i % 3) * 4), y = 2.1 + Math.floor(i / 3) * (ch + 0.25);
      card(s, x, y, cw, ch, { fill: i === 0 ? C.NAVY : C.OFF });
      badge(s, ic, x + 0.3, y + 0.3, 0.52, { bg: i === 0 ? C.LIME : C.WHITE, fg: C.NAVY });
      t(s, 'STEP ' + (i + 1), { x: x + cw - 1.3, y: y + 0.42, w: 1.0, h: 0.25, font: F.MED, size: 9, color: i === 0 ? C.MIST : C.SLATE, align: 'right', charSpacing: 1.5 });
      t(s, h1, { x: x + 0.3, y: y + 1.0, w: cw - 0.6, h: 0.3, font: F.HEAD, bold: true, size: 14, color: i === 0 ? C.WHITE : C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.33, w: cw - 0.6, h: 0.65, size: 10.5, color: i === 0 ? C.MIST : C.SLATE, lineSpacingMultiple: 1.2 });
    });
    s.addNotes('HOW TO USE. Fonts: fonts.google.com/specimen/Manrope and fonts.google.com/specimen/Inter. If the fonts are not installed PowerPoint substitutes a default font and spacing will shift.');
  }

  // G3 Template index (filled at the end of the build)
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Template index: every layout, by section');
    ctx.indexSlide = s;
    s.addNotes('TEMPLATE INDEX. Slide numbers refer to this file. Use it to find the layout you need quickly.');
  }

  // G4 Colour palette
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Colour palette', { lead: 'Ten theme colours. Navy leads, lime highlights, neutrals do the rest. Change them all in Design › Variants › Colors.' });
    const big = [
      ['Deep Navy', C.NAVY, 'Text / Background Dark 1', 'Primary ink, dark surfaces', C.WHITE],
      ['Electric Lime', C.LIME, 'Accent 1', 'Highlights, CTAs, key data', C.NAVY],
      ['Off-white', C.OFF, 'Text / Background Light 2', 'Section and card surfaces', C.NAVY],
      ['White', C.WHITE, 'Text / Background Light 1', 'Default background', C.NAVY],
    ];
    const bw = gw(3), bh = 2.25;
    big.forEach(([n, hex, slot, use, tc], i) => {
      const x = gx(i * 3), y = 2.05;
      rect(s, x, y, bw, bh, { fill: hex, line: hex === C.WHITE ? C.MIST : undefined });
      t(s, n, { x: x + 0.25, y: y + 0.22, w: bw - 0.5, h: 0.3, font: F.HEAD, bold: true, size: 14, color: tc });
      t(s, '#' + hex, { x: x + 0.25, y: y + bh - 0.9, w: bw - 0.5, h: 0.3, font: F.MED, size: 12, color: tc });
      const rgb = [0, 2, 4].map(k => parseInt(hex.substr(k, 2), 16)).join(' · ');
      t(s, 'RGB ' + rgb, { x: x + 0.25, y: y + bh - 0.58, w: bw - 0.5, h: 0.25, size: 9.5, color: tc });
      t(s, slot, { x, y: y + bh + 0.1, w: bw, h: 0.22, font: F.MED, size: 9, color: C.NAVY });
      t(s, use, { x, y: y + bh + 0.32, w: bw, h: 0.22, size: 9, color: C.SLATE });
    });
    const small = [['Charcoal', C.CHAR, 'Dark 2 · body text'], ['Steel', C.STEEL, 'Accent 2 · data'], ['Slate', C.SLATE, 'Accent 3 · muted'], ['Mist', C.MIST, 'Accent 4 · lines'], ['Navy 2', C.NAVY2, 'Accent 5 · dark cards'], ['Olive', C.OLIVE, 'Accent 6 · deltas']];
    const sw = (SW - 2 * M - 5 * 0.2) / 6;
    small.forEach(([n, hex, d], i) => {
      const x = M + i * (sw + 0.2), y = 5.1;
      rect(s, x, y, 0.55, 0.55, { fill: hex, line: hex === C.MIST ? C.MIST : undefined });
      t(s, n, { x: x + 0.7, y: y - 0.02, w: sw - 0.7, h: 0.22, font: F.HEAD, bold: true, size: 11, color: C.NAVY });
      t(s, '#' + hex, { x: x + 0.7, y: y + 0.2, w: sw - 0.7, h: 0.2, font: F.MED, size: 9, color: C.CHAR });
      t(s, d, { x: x + 0.7, y: y + 0.38, w: sw - 0.6, h: 0.2, size: 8.5, color: C.SLATE });
    });
    t(s, 'Balance', { x: M, y: 5.95, w: 1.5, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE });
    const bx = M + 1.1, bwid = 6;
    [[0.6, C.WHITE], [0.25, C.NAVY], [0.1, C.OFF], [0.05, C.LIME]].reduce((acc, [p, c]) => {
      rect(s, bx + acc * bwid, 5.95, p * bwid, 0.25, { fill: c, line: c === C.WHITE ? C.MIST : undefined, square: true });
      return acc + p;
    }, 0);
    t(s, '60% white · 25% navy · 10% neutrals · 5% lime', { x: bx + bwid + 0.25, y: 5.95, w: 4.5, h: 0.25, size: 9.5, color: C.CHAR });
    t(s, 'Lime rule: never set lime text on white — use lime as a fill behind navy text, or as text on navy.', { x: M, y: 6.35, w: 11, h: 0.25, font: F.MED, size: 9.5, color: C.OLIVE });
    s.addNotes('COLOUR PALETTE. Theme slots: Dark 1 #0A1628, Light 1 #FFFFFF, Dark 2 #2E3645, Light 2 #F3F5F7, Accent 1 #C6F432, Accent 2 #2C4A74, Accent 3 #6B7688, Accent 4 #D5DBE3, Accent 5 #17253D, Accent 6 #5B7A0C.');
  }

  // G5 Typography
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Typography system', { lead: 'Manrope for display and headings, Inter for reading. Two families, nine roles.' });
    const rows = [
      ['Display / Hero', 'Manrope ExtraBold', '60–110 pt', 'Grow.', F.DISP, 34],
      ['H1 · Slide title', 'Manrope Bold', '28 pt', 'Headline states the message', F.HEAD, 22],
      ['H2 · Section', 'Manrope Bold', '18–24 pt', 'Market opportunity', F.HEAD, 18],
      ['H3 · Card title', 'Manrope Bold', '13–16 pt', 'Forecast accuracy', F.HEAD, 14],
      ['KPI', 'Manrope ExtraBold', '24–48 pt', '$48.6M', F.DISP, 26],
      ['Body', 'Inter Regular', '11–14 pt', 'Clear, concise supporting copy for every slide.', F.BODY, 12],
      ['Label / Tag', 'Inter Medium', '9–11 pt, caps +1.5', 'SECTION LABEL', F.MED, 10],
      ['Chart labels', 'Inter / Inter Medium', '9–10.5 pt', 'Q1   Q2   Q3   $12.9M', F.MED, 10],
      ['Caption / Footnote', 'Inter Regular', '8–9 pt', 'Source: Company analysis, 2026.', F.BODY, 9],
    ];
    const y0 = 2.0, rh = 0.5;
    ['ROLE', 'TYPEFACE', 'SIZE', 'SAMPLE'].forEach((h, i) => t(s, h, { x: [M, M + 2.6, M + 5.0, M + 6.9][i], y: y0, w: 2.2, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 }));
    rows.forEach(([r, f, sz, smp, face, ps], i) => {
      const y = y0 + 0.35 + i * rh;
      line(s, M, y, SW - 2 * M, 0, { color: i === 0 ? C.NAVY : C.MIST, lw: i === 0 ? 1.25 : 0.75 });
      t(s, r, { x: M, y, w: 2.5, h: rh, font: F.MED, size: 11, color: C.NAVY, valign: 'middle' });
      t(s, f, { x: M + 2.6, y, w: 2.3, h: rh, size: 10.5, color: C.CHAR, valign: 'middle' });
      t(s, sz, { x: M + 5.0, y, w: 1.8, h: rh, size: 10.5, color: C.CHAR, valign: 'middle' });
      t(s, smp, { x: M + 6.9, y, w: SW - M - (M + 6.9), h: rh, font: face, bold: face === F.HEAD, size: ps, color: C.NAVY, valign: 'middle', charSpacing: r.startsWith('Label') ? 1.5 : undefined });
    });
    s.addNotes('TYPOGRAPHY. Theme fonts are set to Manrope (headings) and Inter (body), so new text boxes pick them up automatically. ExtraBold and Medium weights are separate font families in PowerPoint ("Manrope ExtraBold", "Inter Medium").');
  }

  // G6 Grid & spacing
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Grid, spacing and shape rules', { lead: '12-column grid on a 13.33 × 7.5 in canvas. Snap objects to columns; keep gutters empty.' });
    const y = 2.05, h = 3.3;
    for (let c = 0; c < 12; c++) rect(s, gx(c), y, COLW, h, { fill: C.LIME, transparency: c % 2 ? 55 : 35, square: true });
    t(s, '12 columns · 0.78 in', { x: gx(0) + 0.1, y: y + 0.1, w: 3, h: 0.25, font: F.MED, size: 9, color: C.NAVY });
    // margin annotations
    line(s, 0.02, y + h + 0.25, M - 0.04, 0, { color: C.NAVY, lw: 1, arrow: true, startArrow: true });
    t(s, '0.6 in margin', { x: 0.02, y: y + h + 0.35, w: 1.4, h: 0.22, size: 8.5, color: C.CHAR });
    line(s, gx(1) - G, y + h + 0.25, G, 0, { color: C.NAVY, lw: 1 });
    t(s, '0.25 in gutter', { x: gx(1) - 0.35, y: y + h + 0.35, w: 1.4, h: 0.22, size: 8.5, color: C.CHAR });
    const specs = [
      ['Margins', '0.6 in left / right'], ['Title zone', '0.48 – 1.75 in'], ['Content area', '1.95 – 6.6 in'], ['Footer', '6.98 in baseline'],
      ['Corner radius', '0.1 in on all cards'], ['Hairlines', '0.75 pt · Mist'], ['Emphasis rules', '1.25–1.5 pt · Navy'], ['Card padding', '0.25–0.35 in'],
    ];
    const cw = (SW - 2 * M - 3 * 0.25) / 4;
    specs.forEach(([k, v], i) => {
      const x = M + (i % 4) * (cw + 0.25), yy = 6.0 + Math.floor(i / 4) * 0.35;
      t(s, [{ text: k + '  ', options: { fontFace: F.MED, color: C.NAVY } }, { text: v, options: { color: C.SLATE } }], { x, y: yy, w: cw, h: 0.28, size: 10 });
    });
    s.addNotes('GRID. Turn on View › Guides to see the column guides if you add them to the master (Shift+F9 for gridlines). All layouts in this template align to this grid.');
  }

  // G7 Components 1
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Component library: data and labels', { lead: 'Copy any component into your slide. Each is a group of native shapes and text.' });
    const lab = (x, y, txt) => t(s, txt.toUpperCase(), { x, y, w: 4, h: 0.22, font: F.MED, size: 8.5, color: C.SLATE, charSpacing: 1.5 });
    lab(M, 2.0, 'KPI cards');
    kpi(s, M, 2.3, 2.5, 1.6, { label: 'Revenue', value: '$12.9M', delta: '58%', note: 'YoY', variant: 'white', valueSize: 26, icon: 'PiChartLineUp' });
    kpi(s, M + 2.7, 2.3, 2.5, 1.6, { label: 'Win rate', value: '28%', delta: '3 pts', note: 'QoQ', variant: 'navy', valueSize: 26, icon: 'PiTarget' });
    kpi(s, M + 5.4, 2.3, 2.5, 1.6, { label: 'NRR', value: '128%', delta: '6 pts', note: 'YoY', variant: 'lime', valueSize: 26, icon: 'PiArrowsClockwise' });
    lab(gx(8) + 0.2, 2.0, 'Number block');
    const nx = gx(8) + 0.2;
    t(s, '4.8×', { x: nx, y: 2.3, w: 3, h: 0.9, font: F.DISP, size: 48, color: C.NAVY });
    t(s, 'LTV to CAC ratio', { x: nx, y: 3.2, w: 3, h: 0.3, font: F.MED, size: 11, color: C.NAVY });
    t(s, 'Top-quartile benchmark: 3.0×', { x: nx, y: 3.5, w: 3.5, h: 0.25, size: 9.5, color: C.SLATE });
    lab(M, 4.25, 'Pills & status');
    let px = M;
    [['On track', 'lime'], ['At risk', 'navy'], ['Watch', 'white'], ['Draft', 'outline']].forEach(([txt, v]) => { px += pill(s, px, 4.55, txt, { variant: v, w: 0.95 }) + 0.15; });
    lab(M, 5.1, 'Buttons');
    rect(s, M, 5.4, 2.1, 0.5, { fill: C.NAVY, radius: 0.25 });
    t(s, 'Primary action', { x: M, y: 5.4, w: 2.1, h: 0.5, font: F.MED, size: 11, color: C.WHITE, align: 'center', valign: 'middle' });
    rect(s, M + 2.3, 5.4, 2.1, 0.5, { fill: C.LIME, radius: 0.25 });
    t(s, 'Highlight action', { x: M + 2.3, y: 5.4, w: 2.1, h: 0.5, font: F.MED, size: 11, color: C.NAVY, align: 'center', valign: 'middle' });
    rect(s, M + 4.6, 5.4, 2.1, 0.5, { fill: C.WHITE, line: C.NAVY, radius: 0.25 });
    t(s, 'Secondary', { x: M + 4.6, y: 5.4, w: 2.1, h: 0.5, font: F.MED, size: 11, color: C.NAVY, align: 'center', valign: 'middle' });
    lab(gx(8) + 0.2, 4.25, 'Tags & icon badges');
    tag(s, gx(8) + 0.2, 4.55, 'Section label');
    [['PiLightning', C.LIME, C.NAVY], ['PiShieldCheck', C.NAVY, C.LIME], ['PiGlobe', C.WHITE, C.NAVY]].forEach(([ic, bg, fg], i) => badge(s, ic, gx(8) + 0.2 + i * 0.75, 5.0, 0.55, { bg, fg }));
    badge(s, 'PiCube', gx(8) + 2.45, 5.0, 0.55, { bg: C.NAVY, fg: C.WHITE, square: true });
    lab(M, 6.1, 'Progress bar');
    rect(s, M, 6.4, 4.4, 0.1, { fill: C.WHITE, radius: 0.05 });
    rect(s, M, 6.4, 4.4 * 0.72, 0.1, { fill: C.NAVY, radius: 0.05 });
    t(s, '72%', { x: M + 4.55, y: 6.32, w: 0.6, h: 0.25, font: F.MED, size: 10, color: C.NAVY });
    lab(gx(8) + 0.2, 6.1, 'Rating dots');
    for (let j = 0; j < 5; j++) oval(s, gx(8) + 0.2 + j * 0.3, 6.38, 0.16, { fill: j < 3 ? C.NAVY : C.MIST });
    s.addNotes('COMPONENTS — DATA & LABELS. KPI card variants: white, navy, lime. Pills: lime = positive, navy = attention, white/outline = neutral.');
  }

  // G8 Components 2
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Component library: structure and story');
    const lab = (x, y, txt) => t(s, txt.toUpperCase(), { x, y, w: 4, h: 0.22, font: F.MED, size: 8.5, color: C.SLATE, charSpacing: 1.5 });
    const c1 = M, c2 = gx(4) + 0.1, c3 = gx(8) + 0.2, cw = gw(4) - 0.1;
    lab(c1, 2.0, 'Timeline nodes');
    line(s, c1, 2.6, cw, 0, { color: C.MIST, lw: 1.5 });
    [0, 1, 2, 3].forEach(i => oval(s, c1 + i * (cw - 0.3) / 3, i === 3 ? 2.44 : 2.5, i === 3 ? 0.32 : 0.2, { fill: i === 3 ? C.LIME : C.NAVY, line: i === 3 ? C.NAVY : undefined, lw: 1.5 }));
    ['2023', '2024', '2025', 'Now'].forEach((y, i) => t(s, y, { x: c1 + i * (cw - 0.3) / 3 - 0.1, y: 2.85, w: 0.8, h: 0.25, font: F.HEAD, bold: true, size: 11, color: C.NAVY }));
    lab(c2, 2.0, 'Process steps');
    ['Plan', 'Build', 'Launch'].forEach((n, i) => {
      const x = c2 + i * (cw / 3);
      rect(s, x, 2.35, cw / 3 - 0.3, 0.7, { fill: i === 2 ? C.NAVY : C.WHITE, radius: R() });
      t(s, n, { x, y: 2.35, w: cw / 3 - 0.3, h: 0.7, font: F.HEAD, bold: true, size: 11.5, color: i === 2 ? C.WHITE : C.NAVY, align: 'center', valign: 'middle' });
      if (i < 2) line(s, x + cw / 3 - 0.27, 2.7, 0.24, 0, { color: C.NAVY, lw: 1.25, arrow: true });
    });
    lab(c3, 2.0, 'Highlight box');
    card(s, c3, 2.35, SW - M - c3, 0.95, { fill: C.LIME });
    icon(s, 'PiLightbulb', c3 + 0.25, 2.6, 0.4, C.NAVY);
    t(s, 'Key insight: partners now source 38% of new logos.', { x: c3 + 0.85, y: 2.35, w: SW - M - c3 - 1.05, h: 0.95, font: F.MED, size: 11, color: C.NAVY, valign: 'middle' });
    lab(c1, 3.65, 'Quote block');
    card(s, c1, 3.95, cw, 2.6, { fill: C.NAVY });
    icon(s, 'PiQuotes', c1 + 0.3, 4.2, 0.45, C.LIME);
    t(s, 'The clearest view of our pipeline we have ever had.', { x: c1 + 0.3, y: 4.8, w: cw - 0.6, h: 1.0, font: F.HEAD, bold: true, size: 16, color: C.WHITE, lineSpacingMultiple: 1.15 });
    t(s, 'VP Sales, Atlas Foods', { x: c1 + 0.3, y: 6.0, w: cw - 0.6, h: 0.25, size: 10, color: C.MIST });
    lab(c2, 3.65, 'Data callout');
    card(s, c2, 3.95, cw, 2.6, { fill: C.WHITE });
    s.addChart(pres.charts.BAR, [{ name: 'v', labels: ['A', 'B', 'C', 'D', 'E'], values: [3, 4, 3.5, 5, 7] }], chartBase({ x: c2 + 0.2, y: 4.5, w: cw - 0.4, h: 1.9, extra: { barDir: 'col', chartColors: [C.MIST, C.MIST, C.MIST, C.MIST, C.NAVY], valAxisHidden: true, catAxisHidden: true, valGridLine: { style: 'none' }, barGapWidthPct: 40 } }));
    pill(s, c2 + cw - 1.55, 4.15, '▲ 40% vs D', { variant: 'lime', w: 1.3 });
    lab(c3, 3.65, 'Comparison block');
    const hw = (SW - M - c3 - 0.15) / 2;
    card(s, c3, 3.95, hw, 2.6, { fill: C.WHITE });
    card(s, c3 + hw + 0.15, 3.95, hw, 2.6, { fill: C.NAVY });
    t(s, 'Before', { x: c3 + 0.2, y: 4.15, w: hw - 0.4, h: 0.25, font: F.MED, size: 10, color: C.SLATE });
    t(s, '22%', { x: c3 + 0.2, y: 4.5, w: hw - 0.4, h: 0.6, font: F.DISP, size: 28, color: C.SLATE });
    t(s, 'forecast error', { x: c3 + 0.2, y: 5.15, w: hw - 0.4, h: 0.25, size: 9.5, color: C.SLATE });
    t(s, 'After', { x: c3 + hw + 0.35, y: 4.15, w: hw - 0.4, h: 0.25, font: F.MED, size: 10, color: C.MIST });
    t(s, '4%', { x: c3 + hw + 0.35, y: 4.5, w: hw - 0.4, h: 0.6, font: F.DISP, size: 28, color: C.LIME });
    t(s, 'forecast error', { x: c3 + hw + 0.35, y: 5.15, w: hw - 0.4, h: 0.25, size: 9.5, color: C.MIST });
    s.addNotes('COMPONENTS — STRUCTURE. Timeline nodes, process steps, highlight box, quote block, data callout and comparison block.');
    function R() { return L.R; }
  }

  // G9 Icon library
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Icon library', { lead: 'One family: Phosphor (MIT licence), regular weight. SVG vectors — recolour with Graphics Fill or Convert to Shape.' });
    const ic = ['PiChartBar', 'PiChartLineUp', 'PiChartPieSlice', 'PiPresentationChart', 'PiTarget', 'PiRocketLaunch', 'PiUsersThree', 'PiGlobeHemisphereWest', 'PiLightning', 'PiShieldCheck', 'PiGear', 'PiStack', 'PiCube', 'PiPlugs', 'PiCloud', 'PiDatabase', 'PiCurrencyDollar', 'PiHandshake', 'PiMegaphone', 'PiEnvelopeSimple', 'PiMagnifyingGlass', 'PiFlag', 'PiCompass', 'PiLightbulb', 'PiPuzzlePiece', 'PiTrendUp', 'PiClock', 'PiCheckCircle', 'PiBuildings', 'PiStorefront', 'PiShoppingCart', 'PiCreditCard', 'PiWallet', 'PiBriefcase', 'PiHeadset', 'PiDeviceMobile', 'PiCode', 'PiLockKey', 'PiSparkle', 'PiFunnel', 'PiMapPin', 'PiCalendarBlank', 'PiGauge', 'PiPath', 'PiCpu', 'PiTreeStructure', 'PiCoins', 'PiScales'];
    const cols = 12, cw = (SW - 2 * M) / cols, rh = 1.08;
    ic.forEach((n, i) => {
      const x = M + (i % cols) * cw, y = 2.05 + Math.floor(i / cols) * rh;
      const hi = i === 5;
      if (hi) badge(s, n, x + cw / 2 - 0.3, y, 0.6, { bg: C.LIME, fg: C.NAVY });
      else icon(s, n, x + cw / 2 - 0.19, y + 0.11, 0.38, C.NAVY);
      t(s, n.replace(/^Pi/, '').replace(/([a-z])([A-Z])/g, '$1 $2'), { x, y: y + 0.66, w: cw, h: 0.22, size: 7.5, color: C.SLATE, align: 'center' });
    });
    s.addNotes('ICON LIBRARY. Want more? The full Phosphor set (phosphoricons.com, MIT licence) matches this style — use the Regular weight. Icon badge = circle + icon at 52% of the circle size.');
  }

  // G10 Chart guidance
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Chart editing and styling guidance', { lead: 'Every chart is a native PowerPoint chart. Styling follows three rules: one message, one highlight, minimal ink.' });
    const steps = [['Edit data', 'Right-click the chart › Edit Data. Type over values in the sheet.'], ['Highlight', 'Click a bar twice › Format Data Point › Fill: Navy or Lime.'], ['Labels', 'Chart Elements (+) › Data Labels. Keep axis labels 9–10 pt.'], ['Recolour', 'Design › Variants › Colors re-colours every chart at once.']];
    steps.forEach(([h1, d], i) => {
      const y = 2.1 + i * 1.1;
      oval(s, M, y, 0.42, { fill: C.NAVY });
      t(s, String(i + 1), { x: M, y, w: 0.42, h: 0.42, font: F.HEAD, bold: true, size: 12, color: C.LIME, align: 'center', valign: 'middle' });
      t(s, h1, { x: M + 0.6, y: y - 0.02, w: 3.8, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
      t(s, d, { x: M + 0.6, y: y + 0.3, w: 3.9, h: 0.55, size: 10.5, color: C.SLATE, lineSpacingMultiple: 1.15 });
    });
    const x1 = gx(5), w1 = (SW - M - x1 - 0.25) / 2;
    const data = [{ name: 'v', labels: ['EU', 'NA', 'APAC', 'LATAM', 'MEA'], values: [52, 31, 11, 4, 2] }];
    card(s, x1, 2.05, w1, 4.55, { fill: C.OFF });
    pill(s, x1 + 0.25, 2.25, 'Avoid', { variant: 'navy', w: 0.8 });
    t(s, 'Rainbow colours, gridlines, 3D, legend for one series', { x: x1 + 0.25, y: 2.65, w: w1 - 0.5, h: 0.5, size: 10, color: C.SLATE });
    s.addChart(pres.charts.BAR, data, chartBase({ x: x1 + 0.2, y: 3.2, w: w1 - 0.4, h: 3.2, bg: C.OFF, extra: { barDir: 'col', chartColors: ['8A5CF6', 'F59E0B', '10B981', 'EF4444', '3B82F6'], showLegend: true, legendPos: 'r', catGridLine: { color: 'BBBBBB', size: 0.75 }, valGridLine: { color: 'BBBBBB', size: 0.75 } } }));
    const x2 = x1 + w1 + 0.25;
    card(s, x2, 2.05, w1, 4.55, { fill: C.OFF });
    pill(s, x2 + 0.25, 2.25, 'Prefer', { variant: 'lime', w: 0.8 });
    t(s, 'One highlight, direct labels, no gridlines, message in the title', { x: x2 + 0.25, y: 2.65, w: w1 - 0.5, h: 0.5, size: 10, color: C.SLATE });
    s.addChart(pres.charts.BAR, data, chartBase({ x: x2 + 0.2, y: 3.2, w: w1 - 0.4, h: 3.2, bg: C.OFF, extra: { barDir: 'col', chartColors: [C.NAVY, C.MIST, C.MIST, C.MIST, C.MIST], showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0"%"', valAxisHidden: true, valGridLine: { style: 'none' }, barGapWidthPct: 45 } }));
    s.addNotes('CHART GUIDANCE. The "Avoid" chart deliberately uses off-palette colours to illustrate the anti-pattern — delete this slide before presenting.');
  }

  // Fill the index at the end of the build
  ctx.fillIndex = (sections) => {
    const s = ctx.indexSlide;
    const cols = 3, cw = (SW - 2 * M - 2 * 0.25) / cols, rows = Math.ceil(sections.length / cols), rh = 4.5 / rows;
    sections.forEach(([n, name, from, to, desc], i) => {
      const x = M + (i % cols) * (cw + 0.25), y = 2.05 + Math.floor(i / cols) * rh;
      card(s, x, y, cw, rh - 0.12, { fill: i === 0 ? C.NAVY : C.WHITE });
      t(s, n, { x: x + 0.2, y, w: 0.6, h: rh - 0.12, font: F.DISP, size: 15, color: i === 0 ? C.LIME : C.NAVY, valign: 'middle' });
      t(s, name, { x: x + 0.8, y: y + 0.1, w: cw - 1.7, h: 0.26, font: F.HEAD, bold: true, size: 11.5, color: i === 0 ? C.WHITE : C.NAVY });
      t(s, desc, { x: x + 0.8, y: y + 0.36, w: cw - 1.7, h: 0.2, size: 8.5, color: i === 0 ? C.MIST : C.SLATE });
      t(s, from === to ? String(from) : `${from}–${to}`, { x: x + cw - 0.95, y, w: 0.75, h: rh - 0.12, font: F.MED, size: 10.5, color: i === 0 ? C.WHITE : C.NAVY, align: 'right', valign: 'middle' });
    });
  };
};
