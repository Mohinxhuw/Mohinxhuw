// 11–18 Market & analysis
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, cb, legend, icon, panel, callout, footnote, dashedLines } = L;
  const SEC = 'Market & analysis';
  const NB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: C.RULE }, { type: 'none' }];

  // 11 Market size — nested squares (area-true) + definitions
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Market size: a $6.2B segment we can realistically serve');
    const base = 4.55, bx = M, by = 6.6;
    const vals = [['TAM', 46.0, 'Total addressable market', 'All revenue analytics and planning software spend in our 24 markets.', C.MIST, C.INK],
      ['SAM', 18.4, 'Serviceable available market', 'Mid-market and enterprise companies in our five priority industries.', C.SKY, C.DEEP],
      ['SOM', 6.2, 'Serviceable obtainable market', 'Share achievable by 2029 at planned sales capacity and win rate.', C.COBALT, C.WHITE]];
    vals.forEach(([k, v, , , fill, tc]) => {
      const side = base * Math.sqrt(v / 46);
      box(s, bx, by - side, side, side, { fill });
      t(s, k, { x: bx + 0.2, y: by - side + 0.18, w: 1.2, h: 0.25, size: 10, bold: true, charSpacing: 1.5, color: tc });
    });
    const tx = gx(6) + 0.1, tw = SW - M - tx;
    vals.forEach(([k, v, n, d], i) => {
      const y = 2.05 + i * 1.5;
      rule(s, tx, y, tw, { color: i === 0 ? C.INK : C.RULE, lw: i === 0 ? 1 : 0.75 });
      t(s, '$' + v.toFixed(1) + 'B', { x: tx, y: y + 0.18, w: 2.4, h: 0.75, size: 38, bold: true, color: i === 2 ? C.COBALT : C.INK });
      t(s, n, { x: tx + 2.6, y: y + 0.22, w: tw - 2.6, h: 0.3, font: F.SERIF, size: 15 });
      t(s, d, { x: tx + 2.6, y: y + 0.58, w: tw - 2.6, h: 0.6, size: 10, color: C.STONE, lineSpacingMultiple: 1.25 });
    });
    t(s, 'Square areas are proportional to market value.', { x: tx, y: 6.42, w: tw, h: 0.2, size: 8, color: C.STONE });
    s.addNotes('MARKET SIZE. Nested squares sized by area (side = base × √(value ÷ TAM)). Resize squares if you change values.');
  }

  // 12 Market growth — multi-series line + insight panel (Style A)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Asia-Pacific is the fastest-growing region', { lead: 'Market value by region, $B. Forecast from 2027.' });
    const yrs = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];
    const ser = [['North America', [12.1, 13.0, 14.2, 15.1, 16.0, 17.2, 18.3, 19.4, 20.4, 21.5], C.MIST], ['Europe', [8.4, 9.0, 9.9, 10.6, 11.5, 12.4, 13.4, 14.5, 15.5, 16.6], C.SKY], ['Asia-Pacific', [4.2, 5.0, 5.9, 7.1, 8.4, 9.9, 11.6, 13.6, 15.8, 18.4], C.CORAL], ['Rest of world', [1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.7, 2.9, 3.1, 3.3], C.STONE]];
    const w = gw(8) + 0.2;
    s.addChart(pres.charts.LINE, ser.map(([n, v]) => ({ name: n, labels: yrs, values: v })), cb({ x: M - 0.1, y: 1.95, w, h: 4.7, extra: {
      chartColors: ser.map(a => a[2]), lineSize: 2.5, lineDataSymbol: 'none', valAxisLabelFormatCode: '$0', valAxisMaxVal: 25, valAxisMinVal: 0, valAxisMajorUnit: 5,
      showLegend: true, legendPos: 't' } }));
    const px = gx(8) + 0.35, pw = SW - M - px;
    box(s, px, 1.95, pw, 4.7, { fill: C.IVORY });
    t(s, 'INSIGHT', { x: px + 0.3, y: 2.2, w: 2, h: 0.2, size: 8, bold: true, charSpacing: 1.8, color: C.CORALD });
    t(s, '4.4×', { x: px + 0.3, y: 2.5, w: pw - 0.6, h: 0.9, size: 48, bold: true, color: C.CORAL });
    t(s, 'Asia-Pacific growth 2020–2029, overtaking Europe by 2029.', { x: px + 0.3, y: 3.45, w: pw - 0.6, h: 0.6, size: 11, color: C.INK, lineSpacingMultiple: 1.25 });
    rule(s, px + 0.3, 4.3, pw - 0.6, { color: C.RULE });
    [['18%', 'APAC CAGR'], ['8%', 'Europe CAGR'], ['6%', 'North America CAGR']].forEach(([v, k], i) => {
      t(s, v, { x: px + 0.3, y: 4.5 + i * 0.6, w: 1, h: 0.35, size: 16, bold: true, color: i === 0 ? C.CORALD : C.INK });
      t(s, k, { x: px + 1.3, y: 4.56 + i * 0.6, w: pw - 1.6, h: 0.3, size: 10, color: C.STONE });
    });
    s.addNotes('MARKET GROWTH. Native multi-series line chart; the highlighted series uses coral, supporting series stay muted.');
  }

  // 13 Market segmentation — heatmap grid (native table)
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Segment attractiveness: where we should play', { lead: 'Scores 1–5 from market data and win/loss analysis. Darker = more attractive.' });
    const cols = ['Segment', 'Size', 'Growth', 'Margin', 'Competition', 'Our fit', 'Total'];
    const rows = [['Mid-market SaaS', 4, 5, 4, 3, 5], ['Financial services', 5, 3, 5, 2, 4], ['Manufacturing', 4, 3, 3, 4, 4], ['Healthcare', 3, 4, 4, 3, 3], ['Retail & e-commerce', 3, 4, 2, 2, 3], ['Public sector', 2, 2, 3, 4, 2]];
    const shade = [null, 'F1F3FA', 'DCE3FA', 'B7C6F5', '6F87E3', '2340C8'];
    const head = cols.map((c, i) => ({ text: c.toUpperCase(), options: { bold: true, fontSize: 8.5, color: C.STONE, align: i ? 'center' : 'left', valign: 'middle', charSpacing: 1.2, border: [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1, color: C.INK }, { type: 'none' }] } }));
    const body = rows.map(r => {
      const tot = r.slice(1).reduce((a, b) => a + b, 0);
      return [{ text: r[0], options: { fontSize: 11, bold: true, color: C.INK, valign: 'middle', border: NB } }]
        .concat(r.slice(1).map(v => ({ text: String(v), options: { fontSize: 12, bold: true, align: 'center', valign: 'middle', color: v >= 4 ? C.WHITE : C.INK, fill: { color: shade[v] }, border: [{ type: 'solid', pt: 3, color: C.IVORY }, { type: 'solid', pt: 3, color: C.IVORY }, { type: 'solid', pt: 3, color: C.IVORY }, { type: 'solid', pt: 3, color: C.IVORY }] } })))
        .concat([{ text: String(tot), options: { fontSize: 14, bold: true, align: 'center', valign: 'middle', color: tot >= 20 ? C.CORALD : C.INK, border: NB } }]);
    });
    s.addTable([head, ...body], { x: M, y: 2.0, w: SW - 2 * M, colW: [3.4, 1.42, 1.42, 1.42, 1.42, 1.42, 1.413], rowH: [0.45, ...Array(rows.length).fill(0.66)], fontFace: F.SANS, margin: [0, 0.12, 0, 0.12] });
    t(s, 'SCORE', { x: M, y: 6.56, w: 0.7, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: C.STONE });
    [1, 2, 3, 4, 5].forEach((v, i) => { box(s, M + 0.75 + i * 0.42, 6.55, 0.36, 0.22, { fill: shade[v] || C.WHITE, line: v === 1 ? C.MIST : null }); t(s, String(v), { x: M + 0.75 + i * 0.42, y: 6.55, w: 0.36, h: 0.22, size: 8, bold: true, align: 'center', valign: 'middle', color: v >= 4 ? C.WHITE : C.INK }); });
    s.addNotes('MARKET SEGMENTATION. Heatmap built as a native table: change a score and recolour the cell from the five-step scale shown at the bottom.');
  }

  // 14 Market share — two charts side by side (Style C)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'We gained 3.2 points of share in four years');
    const w = (SW - 2 * M - 0.3) / 2;
    const p1 = panel(s, M, 1.95, w, 4.7, { title: 'Market share 2026', sub: 'Mid-market revenue analytics', fill: C.IVORY });
    const sh = [['Halden Group', 11.4], ['Competitor A', 22.6], ['Competitor B', 17.9], ['Competitor C', 9.8], ['Others', 38.3]];
    s.addChart(pres.charts.DOUGHNUT, [{ name: 'Share', labels: sh.map(a => a[0]), values: sh.map(a => a[1]) }], cb({ x: p1.x, y: p1.y, w: p1.w * 0.58, h: p1.h, bg: C.IVORY, extra: {
      holeSize: 62, chartColors: [C.CORAL, C.COBALT, C.SKY, C.MIST, 'EDEAE3'], showLegend: false, dataBorder: { pt: 2, color: C.IVORY }, firstSliceAng: 0 } }));
    t(s, '11.4%', { x: p1.x, y: p1.y + p1.h / 2 - 0.3, w: p1.w * 0.58, h: 0.4, size: 22, bold: true, color: C.CORALD, align: 'center' });
    t(s, 'our share', { x: p1.x, y: p1.y + p1.h / 2 + 0.1, w: p1.w * 0.58, h: 0.22, size: 9, color: C.STONE, align: 'center' });
    sh.forEach(([n, v], i) => {
      const y = p1.y + 0.55 + i * 0.6, lx = p1.x + p1.w * 0.6;
      box(s, lx, y + 0.05, 0.13, 0.13, { fill: [C.CORAL, C.COBALT, C.SKY, C.MIST, 'EDEAE3'][i] });
      t(s, n, { x: lx + 0.22, y, w: 1.6, h: 0.22, size: 9.5, bold: i === 0 });
      t(s, v.toFixed(1) + '%', { x: lx + 0.22, y: y + 0.22, w: 1.4, h: 0.22, size: 9, color: C.STONE });
    });
    const x2 = M + w + 0.3;
    const p2 = panel(s, x2, 1.95, w, 4.7, { title: 'Share trend', sub: 'Halden Group vs top competitors, %', fill: C.IVORY });
    const yrs = ['2022', '2023', '2024', '2025', '2026'];
    s.addChart(pres.charts.BAR, [
      { name: 'Halden Group', labels: yrs, values: [8.2, 8.9, 9.7, 10.4, 11.4] },
      { name: 'Competitor A', labels: yrs, values: [24.1, 23.8, 23.4, 23.0, 22.6] },
      { name: 'Competitor B', labels: yrs, values: [16.0, 16.8, 17.3, 17.6, 17.9] },
    ], cb({ x: p2.x, y: p2.y, w: p2.w, h: p2.h, bg: C.IVORY, extra: { barDir: 'bar', barGrouping: 'stacked', chartColors: [C.CORAL, C.COBALT, C.SKY], barGapWidthPct: 45, showValue: true, dataLabelPosition: 'ctr', dataLabelColor: C.WHITE, dataLabelFormatCode: '0.0', valAxisHidden: true, valGridLine: { style: 'none' }, showLegend: true, legendPos: 'b', catAxisLineShow: false, catAxisOrientation: 'maxMin' } }));
    s.addNotes('MARKET SHARE. Two native charts: a doughnut for the current split and a stacked bar for the trend.');
  }

  // 15 Competitive landscape — scatter with labelled points
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Competitive landscape: premium capability at a mid-market price', { lead: 'Price index (market average = 100) against capability score from 40 analyst criteria.' });
    const pts = [['Halden Group', 92, 81], ['Competitor A', 134, 84], ['Competitor B', 108, 66], ['Competitor C', 71, 48], ['Competitor D', 86, 57], ['Competitor E', 121, 72], ['Competitor F', 64, 39]];
    const x = M, y = 1.95, w = gw(8) + 0.2, h = 4.7;
    box(s, x, y, w, h, { fill: C.WHITE });
    const lay = { x: 0.09, y: 0.06, w: 0.87, h: 0.82 };
    // two native series share the X values: competitors (cobalt) and your company (coral); blanks hide a point
    s.addChart(pres.charts.SCATTER, [{ name: 'Price index', values: pts.map(p => p[1]) }, { name: 'Competitors', values: pts.map((p, i) => i ? p[2] : null) }, { name: 'Halden Group', values: pts.map((p, i) => i ? null : p[2]) }], cb({ x: x + 0.1, y: y + 0.1, w: w - 0.2, h: h - 0.2, extra: {
      chartColors: [C.COBALT, C.CORAL], lineSize: 0, lineDataSymbol: 'circle', lineDataSymbolSize: 12, valAxisMinVal: 30, valAxisMaxVal: 100, valAxisMajorUnit: 10, catAxisMinVal: 50, catAxisMaxVal: 150,
      valAxisTitle: 'Capability score', showValAxisTitle: true, valAxisTitleFontSize: 9, valAxisTitleColor: C.STONE, catAxisTitle: 'Price index', showCatAxisTitle: true, catAxisTitleFontSize: 9, catAxisTitleColor: C.STONE,
      catAxisLabelFormatCode: '0', layout: lay } }));
    const cx = (v) => x + 0.1 + (w - 0.2) * (lay.x + lay.w * (v - 50) / 100);
    const cy = (v) => y + 0.1 + (h - 0.2) * (lay.y + lay.h * (1 - (v - 30) / 70));
    pts.forEach(([n, px, py], i) => {
      t(s, n, { x: cx(px) + 0.16, y: cy(py) - 0.12, w: 1.6, h: 0.24, size: 9, bold: i === 0, color: i === 0 ? C.CORALD : C.INK });
    });
    const rx = gx(8) + 0.35, rw = SW - M - rx;
    t(s, 'Sweet spot', { x: rx, y: 2.05, w: rw, h: 0.4, font: F.SERIF, size: 20 });
    t(s, 'Halden scores within 3 points of the market leader on capability while pricing 31% lower.', { x: rx, y: 2.5, w: rw, h: 0.9, size: 11, color: C.STONE, lineSpacingMultiple: 1.3 });
    [['−31%', 'price vs Competitor A'], ['81/100', 'capability score'], ['#2', 'value-for-money rank']].forEach(([v, k], i) => {
      const yy = 3.65 + i * 0.95;
      rule(s, rx, yy, rw, { color: C.RULE });
      t(s, v, { x: rx, y: yy + 0.15, w: rw, h: 0.45, size: 22, bold: true, color: i === 0 ? C.CORALD : C.INK });
      t(s, k, { x: rx, y: yy + 0.58, w: rw, h: 0.22, size: 9.5, color: C.STONE });
    });
    s.addNotes('COMPETITIVE LANDSCAPE. Native scatter chart (X = price index, Y = capability). Point labels are text boxes. Your company is its own series (coral), so it stays highlighted when you edit the data.');
  }

  // 16 Competitor comparison — native table with data bars
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Competitor comparison: fastest growth, highest satisfaction');
    const rows = [['Halden Group', '$84M', 31, 64, 11.4, '14 mo'], ['Competitor A', '$168M', 12, 31, 22.6, '22 mo'], ['Competitor B', '$132M', 18, 42, 17.9, '19 mo'], ['Competitor C', '$71M', 9, 27, 9.8, '25 mo'], ['Competitor D', '$58M', 22, 38, 7.4, '17 mo']];
    const cols = ['Company', 'Revenue', 'Growth', 'NPS', 'Share', 'CAC payback'];
    const colW = [3.0, 1.6, 2.4, 2.0, 1.6, 1.333];
    const head = cols.map((c, i) => ({ text: c.toUpperCase(), options: { bold: true, fontSize: 8.5, charSpacing: 1.2, color: C.STONE, align: i ? (i === 2 || i === 3 ? 'left' : 'right') : 'left', valign: 'middle', border: [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1, color: C.INK }, { type: 'none' }] } }));
    const body = rows.map((r, ri) => r.map((c, i) => ({ text: i === 2 ? c + '%' : i === 3 ? String(c) : i === 4 ? c.toFixed(1) + '%' : c, options: {
      fontSize: 11.5, bold: i === 0 || ri === 0, color: ri === 0 && i > 0 ? C.COBALT : C.INK, align: i ? (i === 2 || i === 3 ? 'left' : 'right') : 'left', valign: 'middle',
      fill: { color: ri === 0 ? 'EEF1FC' : C.WHITE }, border: NB, margin: i === 2 || i === 3 ? [0, 0.1, 0, 1.0] : [0, 0.15, 0, 0.15] } })));
    const ty = 2.05, rh = 0.72;
    s.addTable([head, ...body], { x: M, y: ty, w: SW - 2 * M, colW, rowH: [0.45, ...Array(rows.length).fill(rh)], fontFace: F.SANS });
    // data bars inside Growth and NPS columns
    const gxs = M + colW[0] + colW[1], nxs = gxs + colW[2];
    rows.forEach((r, i) => {
      const yy = ty + 0.45 + i * rh + rh / 2 - 0.07;
      box(s, gxs + 0.12, yy, 0.8 * (r[2] / 31), 0.14, { fill: i === 0 ? C.CORAL : C.SKY });
      box(s, nxs + 0.12, yy, 0.8 * (r[3] / 64), 0.14, { fill: i === 0 ? C.COBALT : C.MIST });
    });
    footnote(s, 'Revenue and share are estimates from public filings and analyst reports, fiscal 2026.');
    s.addNotes('COMPETITOR COMPARISON. Native table with editable in-cell data bars (rectangles). Bar length = value ÷ column maximum × 0.8 in.');
  }

  // 17 Positioning matrix — bubble chart in quadrants
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Positioning: the only challenger moving into the leader quadrant');
    const x = M, y = 1.95, w = gw(8) + 0.2, h = 4.7;
    const lay = { x: 0.07, y: 0.05, w: 0.9, h: 0.85 };
    const px0 = x + w * lay.x, pw0 = w * lay.w, py0 = y + h * lay.y, ph0 = h * lay.h;
    box(s, px0, py0, pw0 / 2, ph0 / 2, { fill: C.WHITE }); box(s, px0 + pw0 / 2, py0, pw0 / 2, ph0 / 2, { fill: 'EEF1FC' });
    box(s, px0, py0 + ph0 / 2, pw0 / 2, ph0 / 2, { fill: 'F2EFE8' }); box(s, px0 + pw0 / 2, py0 + ph0 / 2, pw0 / 2, ph0 / 2, { fill: C.WHITE });
    [['Leaders', 1, 0], ['Specialists', 0, 0], ['Niche players', 0, 1], ['Challengers', 1, 1]].forEach(([n, qx, qy]) => t(s, n.toUpperCase(), { x: px0 + qx * pw0 / 2 + 0.15, y: py0 + qy * ph0 / 2 + 0.12, w: 2, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: n === 'Leaders' ? C.COBALT : C.STONE }));
    const b = [['Halden Group', 60, 66, 11, 'R'], ['Competitor A', 86, 86, 23, 'L'], ['Competitor B', 74, 38, 18, 'R'], ['Competitor C', 32, 34, 10, 'R'], ['Competitor D', 18, 16, 7, 'R'], ['Competitor E', 24, 78, 6, 'R']];
    s.addChart(pres.charts.BUBBLE, [{ name: 'Market presence', values: b.map(a => a[1]) },
      { name: 'Competitors', values: b.map((a, i) => i ? a[2] : null), sizes: b.map((a, i) => i ? a[3] : null) },
      { name: 'Halden Group', values: b.map((a, i) => i ? null : a[2]), sizes: b.map((a, i) => i ? null : a[3]) }], cb({ x, y, w, h, bg: 'FFFFFF', extra: {
      chartColors: [C.COBALT, C.CORAL], chartColorsOpacity: 80, valAxisMinVal: 0, valAxisMaxVal: 100, catAxisMinVal: 0, catAxisMaxVal: 100, valAxisMajorUnit: 50, catAxisMajorUnit: 50,
      valGridLine: { style: 'none' }, valAxisLabelFormatCode: '0', layout: lay, chartArea: { fill: { color: C.IVORY, transparency: 100 } }, plotArea: { fill: { color: C.WHITE, transparency: 100 } } } }));
    const cx = (v) => px0 + pw0 * v / 100, cy = (v) => py0 + ph0 * (1 - v / 100);
    // PowerPoint default bubble scale: largest bubble diameter = 25% of the smaller plot side; diameter ∝ √size
    const dMax = 0.25 * Math.min(pw0, ph0), sMax = Math.max(...b.map(a => a[3]));
    b.forEach(([n, bx, by, sz, side], i) => {
      const d = dMax * Math.sqrt(sz / sMax), lx = side === 'L' ? cx(bx) - d / 2 - 0.06 - 1.5 : cx(bx) + d / 2 + 0.06;
      t(s, n, { x: lx, y: cy(by) - 0.11, w: 1.5, h: 0.22, size: 8.5, bold: i === 0, align: side === 'L' ? 'right' : 'left', color: i === 0 ? C.CORALD : C.INK });
    });
    t(s, 'Market presence →', { x: px0, y: py0 + ph0 + 0.3, w: pw0, h: 0.2, size: 8.5, color: C.STONE, align: 'center' });
    t(s, 'Completeness of vision →', { x: px0 - 2.35, y: py0 + ph0 / 2 - 0.1, w: 4.0, h: 0.2, size: 8.5, color: C.STONE, align: 'center', rotate: 270 });
    const rx = gx(8) + 0.35, rw = SW - M - rx;
    t(s, 'Reading the matrix', { x: rx, y: 2.05, w: rw, h: 0.35, font: F.SERIF, size: 18 });
    [['Bubble size', 'Estimated revenue'], ['Movement', '+14 points on presence since 2024'], ['Next step', 'Cross into Leaders with enterprise wins in 2027']].forEach(([k, v], i) => {
      const yy = 2.65 + i * 1.0;
      rule(s, rx, yy, rw, { color: C.RULE });
      t(s, k.toUpperCase(), { x: rx, y: yy + 0.15, w: rw, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: C.STONE });
      t(s, v, { x: rx, y: yy + 0.4, w: rw, h: 0.45, size: 11.5, color: C.INK });
    });
    s.addNotes('POSITIONING MATRIX. Native bubble chart (X, Y, size) over four editable quadrant rectangles. Point labels are text boxes.');
  }

  // 18 Benchmark analysis — dumbbell dot plot
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Benchmarks: ahead of peers on five of six measures', { lead: 'Halden Group (coral) vs SaaS peer median (cobalt). Peer set: 42 companies, $50–250M revenue.' });
    const rows = [['Revenue growth', 31, 19, '%', 0, 40], ['Net revenue retention', 118, 108, '%', 90, 130], ['Gross margin', 71, 74, '%', 60, 80], ['Rule of 40', 50, 31, '', 0, 60], ['CAC payback (months)', 14, 20, ' mo', 0, 30], ['Employee NPS', 46, 29, '', 0, 60]];
    const lx = M, lw = 3.0, bx = M + lw + 0.3, bw = gw(9) - lw - 0.3, y0 = 2.2, rh = 0.72;
    legend(s, bx, 1.92, [['Halden Group', C.CORAL], ['Peer median', C.COBALT]]);
    rows.forEach(([n, us, peer, u, lo, hi], i) => {
      const y = y0 + i * rh + 0.2;
      t(s, n, { x: lx, y: y - 0.05, w: lw, h: 0.3, size: 11, bold: true });
      box(s, bx, y + 0.08, bw, 0.03, { fill: C.MIST });
      const X = (v) => bx + bw * (v - lo) / (hi - lo);
      const better = n.startsWith('CAC') ? us < peer : us > peer;
      box(s, Math.min(X(us), X(peer)), y + 0.075, Math.abs(X(us) - X(peer)), 0.04, { fill: better ? C.PEACH : C.SKY });
      circ(s, X(peer) - 0.1, y - 0.005, 0.2, { fill: C.COBALT });
      circ(s, X(us) - 0.12, y - 0.025, 0.24, { fill: C.CORAL });
      t(s, us + u, { x: X(us) - 0.6, y: y - 0.3, w: 1.2, h: 0.22, size: 9, bold: true, color: C.CORALD, align: 'center' });
      t(s, peer + u, { x: X(peer) - 0.6, y: y + 0.24, w: 1.2, h: 0.22, size: 8.5, color: C.COBALT, align: 'center' });
    });
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    box(s, rx, 1.95, rw, 4.7, { fill: C.DEEP });
    t(s, '5 of 6', { x: rx + 0.3, y: 2.25, w: rw - 0.6, h: 0.8, size: 40, bold: true, color: C.CORAL });
    t(s, 'benchmarks ahead of the peer median.', { x: rx + 0.3, y: 3.05, w: rw - 0.6, h: 0.5, size: 11, color: C.WHITE });
    rule(s, rx + 0.3, 3.85, rw - 0.6, { color: C.DEEP2, lw: 1 });
    t(s, 'Gap to close', { x: rx + 0.3, y: 4.05, w: rw - 0.6, h: 0.25, size: 9, bold: true, color: C.SKY });
    t(s, 'Gross margin trails peers by 3 points — services mix is the driver.', { x: rx + 0.3, y: 4.35, w: rw - 0.6, h: 0.9, size: 10.5, color: C.WHITE, lineSpacingMultiple: 1.25 });
    s.addNotes('BENCHMARK ANALYSIS. Dumbbell (dot) plot built from editable shapes; each row has its own scale (min/max set per metric).');
  }
};
