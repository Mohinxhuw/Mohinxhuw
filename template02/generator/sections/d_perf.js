// 19–28 Data & performance
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, cb, legend, icon, panel, callout, footnote, dashedLines } = L;
  const SEC = 'Data & performance';
  const NB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: C.RULE }, { type: 'none' }];
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // 19 Performance dashboard — dark (Style K + D)
  {
    const s = pres.addSlide({ masterName: L.L.CO });
    header(s, SEC, 'Performance dashboard — fiscal 2026', { dark: true, lead: 'All figures year to date, 31 December 2026.' });
    const k = [['Bookings', '$96.4M', '24%', 'vs plan'], ['Revenue', '$84.2M', '31%', 'YoY'], ['Win rate', '34%', '5 pts', 'YoY'], ['Cash', '$41.8M', '$9.2M', 'YoY']];
    const kw = (SW - 2 * M) / 4;
    k.forEach(([l, v, d, n], i) => {
      if (i) L.vrule(s, M + i * kw - 0.02, 2.0, 1.05, { color: C.DEEP2, lw: 1 });
      kpi(s, M + i * kw + (i ? 0.25 : 0), 1.95, kw - 0.4, { label: l, value: v, delta: d, note: n, dark: true, size: 28, color: i === 0 ? C.CORAL : C.WHITE });
    });
    const y = 3.35, h = 3.3, w1 = gw(7) + 0.1;
    const p1 = panel(s, M, y, w1, h, { dark: true, title: 'Monthly revenue vs plan, $M' });
    legend(s, M + w1 - 2.6, y + 0.2, [['Actual', C.CORAL, 'line'], ['Plan', C.SKY, 'dash']], { dark: true });
    dashedLines(pres, s, [{ name: 'Actual', labels: MO, values: [5.9, 6.1, 6.6, 6.5, 6.9, 7.0, 7.2, 7.1, 7.4, 7.6, 7.8, 8.1] }, { name: 'Plan', labels: MO, values: [5.8, 6.0, 6.2, 6.3, 6.5, 6.6, 6.8, 6.9, 7.0, 7.2, 7.3, 7.5] }],
      [C.CORAL, C.SKY], ['solid', 'dash'], { lineSize: 2.25, lineDataSymbol: 'none' },
      cb({ x: p1.x, y: p1.y, w: p1.w, h: p1.h, dark: true, bg: C.DEEP2, extra: { valAxisMinVal: 5, valAxisMaxVal: 8.5, valAxisMajorUnit: 1, valAxisLabelFormatCode: '$0' } }));
    const x2 = M + w1 + 0.24, w2 = SW - M - x2;
    const p2 = panel(s, x2, y, w2, h, { dark: true, title: 'Bookings by segment, $M' });
    s.addChart(pres.charts.BAR, [{ name: 'Bookings', labels: ['Enterprise', 'Mid-market', 'SMB', 'Partners'], values: [42.4, 30.8, 11.6, 11.6] }], cb({ x: p2.x, y: p2.y, w: p2.w, h: p2.h, dark: true, bg: C.DEEP2, extra: {
      barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [C.CORAL, C.SKY, C.SKY, C.SKY], barGapWidthPct: 50, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '"$"0.0',
      valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, catAxisLabelColor: C.WHITE, valAxisMaxVal: 52 } }));
    s.addNotes('PERFORMANCE DASHBOARD. Dark dashboard: KPI strip, native line chart (actual vs dashed plan) and a native bar chart.');
  }

  // 20 KPI dashboard — gauges
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'KPI dashboard: two of three goals already met', { lead: 'Annual targets set by the board in January 2026.' });
    const g = [['Revenue target', 104, '$84.2M of $81.0M', C.COBALT], ['Net retention target', 98, '118% of 120%', C.CORAL], ['Margin target', 112, '18.6% of 16.6%', C.COBALT]];
    const w = (SW - 2 * M - 2 * 0.24) / 3;
    g.forEach(([n, v, d, col], i) => {
      const x = M + i * (w + 0.24), y = 1.95;
      box(s, x, y, w, 2.95, { fill: C.WHITE });
      t(s, n, { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.25, size: 10.5, bold: true });
      const pct = Math.min(v, 100);
      s.addChart(pres.charts.DOUGHNUT, [{ name: n, labels: ['Achieved', 'Remaining', 'Lower half (hidden)'], values: [pct, 100 - pct, 100] }], cb({ x: x + 0.35, y: y + 0.55, w: w - 0.7, h: (w - 0.7), extra: {
        holeSize: 74, firstSliceAng: 270, chartColors: [col, C.MIST, C.WHITE], showLegend: false, dataBorder: { pt: 0.5, color: C.WHITE } } }));
      const cyc = y + 0.55 + (w - 0.7) / 2;
      t(s, v + '%', { x, y: cyc - 0.55, w, h: 0.55, size: 30, bold: true, align: 'center', color: v < 100 ? C.CORALD : C.INK });
      t(s, d, { x, y: cyc + 0.0, w, h: 0.22, size: 9, color: C.STONE, align: 'center' });
      chip(s, x + w / 2 - 0.55, y + 2.5, v >= 100 ? 'Achieved' : 'At risk', { variant: v >= 100 ? 'cobalt' : 'peach', w: 1.1 });
    });
    const small = [['Pipeline coverage', 3.4, 3.0, '×'], ['Customer health', 86, 85, '%'], ['Hiring plan', 92, 100, '%'], ['Uptime', 99.97, 99.9, '%']];
    const sw = (SW - 2 * M - 3 * 0.24) / 4;
    small.forEach(([n, v, tg, u], i) => {
      const x = M + i * (sw + 0.24), y = 5.15;
      box(s, x, y, sw, 1.5, { fill: C.WHITE });
      t(s, n.toUpperCase(), { x: x + 0.25, y: y + 0.2, w: sw - 0.5, h: 0.2, size: 8, bold: true, charSpacing: 1.4, color: C.STONE });
      t(s, v + u, { x: x + 0.25, y: y + 0.42, w: sw - 0.5, h: 0.45, size: 22, bold: true });
      const r = Math.min(v / tg, 1.15) / 1.15, ok = v >= tg;
      box(s, x + 0.25, y + 1.05, sw - 0.5, 0.08, { fill: C.MIST });
      box(s, x + 0.25, y + 1.05, (sw - 0.5) * r, 0.08, { fill: ok ? C.COBALT : C.CORAL });
      box(s, x + 0.25 + (sw - 0.5) * (1 / 1.15) - 0.01, y + 0.98, 0.025, 0.22, { fill: C.INK });
      t(s, 'Target ' + tg + u, { x: x + 0.25, y: y + 1.18, w: sw - 0.5, h: 0.2, size: 8, color: C.STONE });
    });
    s.addNotes('KPI DASHBOARD. Gauges are native half-doughnut charts: values [achieved, remaining, 100] with the third slice coloured like the background. Bottom tiles use editable progress bars with a target marker.');
  }

  // 21 Monthly performance — annotated full-width line (Style F)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Monthly bookings: three moments shaped the year', { lead: 'New bookings by month, $M, 2025–2026.' });
    const lab = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    const v = [5.1, 5.4, 6.0, 5.6, 5.9, 6.4, 5.8, 5.5, 6.6, 6.9, 7.1, 8.4, 6.2, 6.5, 7.4, 7.0, 7.6, 9.1, 7.5, 7.2, 8.3, 8.8, 9.2, 11.4];
    const x = M - 0.1, y = 2.15, w = SW - 2 * M + 0.2, h = 4.5, lay = { x: 0.05, y: 0.12, w: 0.93, h: 0.76 };
    s.addChart(pres.charts.LINE, [{ name: 'Bookings', labels: lab, values: v }], cb({ x, y, w, h, extra: { chartColors: [C.COBALT], lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 5, valAxisMinVal: 4, valAxisMaxVal: 12, valAxisMajorUnit: 2, valAxisLabelFormatCode: '$0', layout: lay } }));
    t(s, '2025', { x: x + w * lay.x, y: y + h - 0.05, w: 1, h: 0.2, size: 8.5, bold: true, color: C.STONE });
    t(s, '2026', { x: x + w * (lay.x + lay.w / 2), y: y + h - 0.05, w: 1, h: 0.2, size: 8.5, bold: true, color: C.STONE });
    const px = (i) => x + w * (lay.x + lay.w * (i + 0.5) / 24), py = (val) => y + h * (lay.y + lay.h * (1 - (val - 4) / 8));
    [[11, 'Year-end enterprise deals', 'Six deals above $500K'], [17, 'Partner programme launch', '+$1.4M partner-sourced'], [23, 'Record month', '$11.4M, +36% YoY']].forEach(([i, h1, d], k) => {
      const cx = px(i), cy = py(v[i]);
      circ(s, cx - 0.09, cy - 0.09, 0.18, { fill: k === 2 ? C.CORAL : C.WHITE, line: k === 2 ? C.WHITE : C.COBALT, lw: 1.5 });
      const bxw = 2.2, bx = Math.min(cx - bxw / 2, SW - M - bxw), by = cy - 1.05;
      s.addShape('line', { x: cx, y: by + 0.72, w: 0, h: cy - by - 0.82, line: { color: C.INK, width: 0.75 } });
      box(s, bx, by, bxw, 0.7, { fill: k === 2 ? C.CORAL : C.DEEP });
      t(s, h1, { x: bx + 0.12, y: by + 0.08, w: bxw - 0.24, h: 0.25, size: 9.5, bold: true, color: C.WHITE });
      t(s, d, { x: bx + 0.12, y: by + 0.36, w: bxw - 0.24, h: 0.22, size: 8.5, color: k === 2 ? C.WHITE : C.SKY });
    });
    s.addNotes('MONTHLY PERFORMANCE. Native line chart with a manual plot layout so annotation callouts can be placed exactly over data points. Move callouts if data changes.');
  }

  // 22 Quarterly comparison — clustered column + table (Style H)
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Every quarter of 2026 beat the same quarter of 2025');
    const q = ['Q1', 'Q2', 'Q3', 'Q4'];
    const a = [17.6, 18.9, 19.8, 21.4], b = [19.4, 20.6, 21.3, 22.9];
    const x = M, w = gw(7);
    box(s, x, 1.95, w, 4.7, { fill: C.WHITE });
    legend(s, x + 0.3, 2.15, [['2025', C.SKY], ['2026', C.COBALT]]);
    s.addChart(pres.charts.BAR, [{ name: '2025', labels: q, values: a }, { name: '2026', labels: q, values: b }], cb({ x: x + 0.1, y: 2.45, w: w - 0.2, h: 4.1, extra: {
      barDir: 'col', chartColors: [C.SKY, C.COBALT], barGapWidthPct: 85, barOverlapPct: -6, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0', valAxisHidden: true, valGridLine: { style: 'none' }, valAxisMinVal: 0, valAxisMaxVal: 26 } }));
    const tx = gx(7) + 0.1, tw = SW - M - tx;
    const head = ['', 'Q1', 'Q2', 'Q3', 'Q4'].map((h1, i) => ({ text: h1, options: { bold: true, fontSize: 9, color: C.STONE, align: i ? 'right' : 'left', border: [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1, color: C.INK }, { type: 'none' }] } }));
    const rows = [['Revenue $M', ...b.map(v => v.toFixed(1))], ['Growth YoY', '+10%', '+9%', '+8%', '+7%'], ['New logos', '48', '53', '51', '60'], ['Win rate', '31%', '33%', '34%', '36%'], ['Churn', '0.8%', '0.7%', '0.7%', '0.6%']];
    const body = rows.map((r, ri) => r.map((c, i) => ({ text: c, options: { fontSize: 10.5, bold: i === 0 || ri === 0, color: ri === 1 && i ? C.COBALT : C.INK, align: i ? 'right' : 'left', valign: 'middle', border: NB } })));
    s.addTable([head, ...body], { x: tx, y: 2.05, w: tw, colW: [1.5, ...Array(4).fill((tw - 1.5) / 4)], rowH: [0.4, ...Array(rows.length).fill(0.52)], fontFace: F.SANS, margin: [0, 0.08, 0, 0.08] });
    box(s, tx, 5.45, tw, 1.2, { fill: C.DEEP });
    t(s, '+8.6%', { x: tx + 0.25, y: 5.55, w: 2, h: 0.55, size: 26, bold: true, color: C.CORAL });
    t(s, 'average year-over-year growth per quarter', { x: tx + 0.25, y: 6.12, w: tw - 0.5, h: 0.4, size: 9.5, color: C.SKY });
    s.addNotes('QUARTERLY COMPARISON. Native clustered column chart plus a native table of supporting metrics.');
  }

  // 23 Year-over-year growth — combo (columns + growth line on secondary axis)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Growth re-accelerated in 2026 after two steady years', { lead: 'Annual revenue ($M, columns) and year-over-year growth (%, line).' });
    const yrs = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
    const x = M - 0.1, w = gw(9) + 0.2;
    legend(s, M, 1.95, [['Revenue, $M', C.SKY], ['Growth, %', C.CORAL, 'line']]);
    s.addChart([
      { type: pres.charts.BAR, data: [{ name: 'Revenue', labels: yrs, values: [27.9, 35.2, 43.8, 52.1, 58.7, 64.3, 84.2] }], options: { barDir: 'col', chartColors: [C.SKY], barGapWidthPct: 55 } },
      { type: pres.charts.LINE, data: [{ name: 'Growth', labels: yrs, values: [13, 26, 24, 19, 13, 10, 31] }], options: { chartColors: [C.CORAL], lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 8, showValue: true, dataLabelPosition: 't', dataLabelFormatCode: '0"%"', dataLabelColor: C.CORALD, secondaryValAxis: true, secondaryCatAxis: true } },
    ], cb({ x, y: 2.3, w, h: 4.35, extra: {
      valAxes: [{ showValAxisTitle: false, valAxisMinVal: 0, valAxisMaxVal: 100, valAxisMajorUnit: 25, valAxisLabelFormatCode: '$0' }, { showValAxisTitle: false, valAxisMinVal: 0, valAxisMaxVal: 40, valAxisLabelFormatCode: '0"%"', valGridLine: { style: 'none' } }],
      catAxes: [{ catAxisTitle: '' }, { catAxisHidden: true }] } }));
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    t(s, '31%', { x: rx, y: 2.1, w: rw, h: 0.95, size: 54, bold: true, color: C.CORAL });
    t(s, 'growth in 2026 — the fastest since 2021', { x: rx, y: 3.05, w: rw, h: 0.5, size: 11, color: C.INK });
    rule(s, rx, 3.75, rw, { color: C.RULE });
    t(s, 'What changed', { x: rx, y: 3.95, w: rw, h: 0.3, font: F.SERIF, size: 15 });
    t(s, [{ text: 'Enterprise tier launched in Q1', options: { bullet: { indent: 12 }, breakLine: true } }, { text: 'Partner channel added $11.6M pipeline', options: { bullet: { indent: 12 }, breakLine: true } }, { text: 'Price increase of 7% at renewal', options: { bullet: { indent: 12 } } }],
      { x: rx, y: 4.35, w: rw, h: 1.5, size: 10.5, color: C.STONE, paraSpaceAfter: 6 });
    s.addNotes('YEAR-OVER-YEAR GROWTH. Native combination chart: columns on the primary axis, growth line on a secondary axis.');
  }

  // 24 Regional performance — abstract tile map
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Regional performance: Europe leads, APAC grows fastest', { lead: 'Revenue by region 2026. Tiles are placed geographically; colour shows growth.' });
    const R = [['North America', 0, 0, 3, 2, 26.1, 24], ['Europe', 3, 0, 3, 2, 31.4, 28], ['Middle East', 3, 2, 1, 1, 5.2, 34], ['Asia-Pacific', 4, 2, 2, 2, 12.9, 52], ['Latin America', 0, 2, 2, 2, 6.3, 19], ['Africa', 2, 3, 1, 1, 2.3, 41]];
    const u = 0.98, x0 = M, y0 = 2.0, gap = 0.08;
    const col = (g) => g >= 45 ? C.CORAL : g >= 30 ? C.COBALT : g >= 22 ? '5A72DD' : C.SKY;
    R.forEach(([n, cx, cy, cw, ch, rev, g]) => {
      const x = x0 + cx * u, y = y0 + cy * u, w = cw * u - gap, h = ch * u - gap;
      box(s, x, y, w, h, { fill: col(g) });
      const dark = g >= 22 && g < 45 || g >= 45;
      t(s, n, { x: x + 0.15, y: y + 0.12, w: w - 0.3, h: 0.22, size: w > 1.5 ? 10 : 8, bold: true, color: g >= 22 ? C.WHITE : C.DEEP });
      t(s, '$' + rev + 'M', { x: x + 0.15, y: y + h - (h > 1.2 ? 0.75 : 0.5), w: w - 0.3, h: 0.35, size: h > 1.2 ? 20 : 12, bold: true, color: g >= 22 ? C.WHITE : C.DEEP });
      if (h > 1.2) t(s, '+' + g + '% YoY', { x: x + 0.15, y: y + h - 0.38, w: w - 0.3, h: 0.22, size: 9, color: g >= 22 ? C.WHITE : C.DEEP });
    });
    t(s, 'GROWTH', { x: x0, y: 6.47, w: 0.8, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: C.STONE });
    [['<22%', C.SKY], ['22–29%', '5A72DD'], ['30–44%', C.COBALT], ['45%+', C.CORAL]].forEach(([k, c], i) => { box(s, x0 + 0.85 + i * 1.05, 6.48, 0.16, 0.16, { fill: c }); t(s, k, { x: x0 + 1.07 + i * 1.05, y: 6.45, w: 0.8, h: 0.22, size: 8.5 }); });
    const rx = gx(7) + 0.2, rw = SW - M - rx;
    t(s, 'Revenue ranking', { x: rx, y: 2.0, w: rw, h: 0.3, font: F.SERIF, size: 16 });
    [...R].sort((a, b) => b[5] - a[5]).forEach(([n, , , , , rev, g], i) => {
      const y = 2.5 + i * 0.66;
      rule(s, rx, y, rw, { color: C.RULE });
      t(s, String(i + 1), { x: rx, y: y + 0.15, w: 0.3, h: 0.3, size: 11, bold: true, color: C.STONE });
      t(s, n, { x: rx + 0.4, y: y + 0.15, w: 2, h: 0.3, size: 11, bold: true });
      t(s, '$' + rev + 'M', { x: rx + rw - 2.0, y: y + 0.15, w: 0.95, h: 0.3, size: 11, align: 'right' });
      chip(s, rx + rw - 0.9, y + 0.16, '+' + g + '%', { variant: g >= 45 ? 'coral' : 'outline', w: 0.85, h: 0.26 });
    });
    s.addNotes('REGIONAL PERFORMANCE. Abstract tile map: regions are editable rectangles placed roughly by geography, coloured by growth band.');
  }

  // 25 Product performance — stacked column + insight panel (Style M asymmetric)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Product performance: Planning is now the growth engine');
    const px = M, pw = gw(4);
    box(s, px, 1.95, pw, 4.7, { fill: C.DEEP });
    t(s, 'PLANNING SUITE', { x: px + 0.3, y: 2.2, w: pw - 0.6, h: 0.2, size: 8, bold: true, charSpacing: 1.8, color: C.SKY });
    t(s, '3.1×', { x: px + 0.3, y: 2.5, w: pw - 0.6, h: 0.95, size: 54, bold: true, color: C.CORAL });
    t(s, 'revenue growth in eight quarters — from $2.4M to $7.4M per quarter.', { x: px + 0.3, y: 3.5, w: pw - 0.6, h: 0.7, size: 11, color: C.WHITE, lineSpacingMultiple: 1.25 });
    rule(s, px + 0.3, 4.45, pw - 0.6, { color: C.DEEP2, lw: 1 });
    [['Analytics', '$9.1M', '+8%'], ['Planning', '$7.4M', '+62%'], ['Forecasting', '$4.2M', '+19%'], ['Data cloud', '$2.2M', '+44%']].forEach(([n, v, g], i) => {
      const y = 4.6 + i * 0.47;
      t(s, n, { x: px + 0.3, y, w: 1.5, h: 0.3, size: 10, color: C.WHITE, bold: i === 1 });
      t(s, v, { x: px + pw - 2.0, y, w: 0.9, h: 0.3, size: 10, color: C.WHITE, align: 'right' });
      t(s, g, { x: px + pw - 1.0, y, w: 0.7, h: 0.3, size: 10, bold: true, color: i === 1 ? C.CORAL : C.SKY, align: 'right' });
    });
    const x = gx(4) + 0.1, w = SW - M - x;
    const q = ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26', 'Q4 26'];
    legend(s, x + 0.1, 1.95, [['Analytics', C.SKY], ['Planning', C.CORAL], ['Forecasting', C.COBALT], ['Data cloud', C.DEEP]]);
    s.addChart(pres.charts.BAR, [
      { name: 'Analytics', labels: q, values: [8.4, 8.5, 8.6, 8.4, 8.7, 8.8, 9.0, 9.1] },
      { name: 'Planning', labels: q, values: [2.4, 2.9, 3.4, 4.1, 4.9, 5.7, 6.5, 7.4] },
      { name: 'Forecasting', labels: q, values: [3.5, 3.6, 3.7, 3.6, 3.9, 4.0, 4.1, 4.2] },
      { name: 'Data cloud', labels: q, values: [1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 2.0, 2.2] },
    ], cb({ x: x - 0.05, y: 2.3, w: w + 0.05, h: 4.35, extra: { barDir: 'col', barGrouping: 'stacked', chartColors: [C.SKY, C.CORAL, C.COBALT, C.DEEP], barGapWidthPct: 45, valAxisLabelFormatCode: '$0', valAxisMaxVal: 25, valAxisMajorUnit: 5 } }));
    s.addNotes('PRODUCT PERFORMANCE. Asymmetric layout: insight panel left, native stacked column chart right. The growth product is coral.');
  }

  // 26 Category ranking — lollipop
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Category ranking: the top three drive half of new revenue', { lead: 'New annual recurring revenue by customer category, 2026, $M.' });
    const cats = [['Software & internet', 9.8], ['Financial services', 8.1], ['Business services', 6.4], ['Manufacturing', 4.9], ['Healthcare', 4.2], ['Logistics', 3.6], ['Retail', 2.9], ['Energy', 2.1], ['Education', 1.4], ['Public sector', 0.9]];
    const lx = M, lw = 3.2, bx = M + 0.6 + lw, bw = gw(9) - lw - 0.9, y0 = 2.05, rh = 0.45, mx = 10.5;
    cats.forEach(([n, v], i) => {
      const y = y0 + i * rh, top = i < 3;
      t(s, String(i + 1).padStart(2, '0'), { x: lx, y, w: 0.5, h: rh, size: 10, bold: true, color: top ? C.CORALD : C.STONE, valign: 'middle' });
      t(s, n, { x: lx + 0.55, y, w: lw, h: rh, size: 11, bold: top, valign: 'middle' });
      const ex = bx + bw * v / mx;
      box(s, bx, y + rh / 2 - 0.012, ex - bx, 0.024, { fill: top ? C.CORAL : C.SKY });
      circ(s, ex - 0.09, y + rh / 2 - 0.09, 0.18, { fill: top ? C.CORAL : C.COBALT });
      t(s, '$' + v.toFixed(1) + 'M', { x: ex + 0.15, y, w: 0.9, h: rh, size: 10, bold: top, valign: 'middle' });
    });
    rule(s, bx, y0 + 10 * rh + 0.05, bw, { color: C.MIST });
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    box(s, rx, 2.05, rw, 4.5, { fill: C.WHITE });
    t(s, '50%', { x: rx + 0.3, y: 2.3, w: rw - 0.6, h: 0.85, size: 46, bold: true, color: C.CORAL });
    t(s, 'of new ARR from the top three categories.', { x: rx + 0.3, y: 3.15, w: rw - 0.6, h: 0.5, size: 10.5 });
    rule(s, rx + 0.3, 3.95, rw - 0.6, { color: C.RULE });
    t(s, 'Focus for 2027: deepen software and financial services; test energy with two partners.', { x: rx + 0.3, y: 4.15, w: rw - 0.6, h: 1.2, size: 10, color: C.STONE, lineSpacingMultiple: 1.3 });
    s.addNotes('CATEGORY RANKING. Lollipop chart built from editable lines and circles; stick length = value ÷ scale max.');
  }

  // 27 Target vs actual — columns + target markers (native combo)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Target vs actual: four of six business units above plan', { lead: 'Revenue by business unit, $M. Columns show actual; markers show target.' });
    const bu = ['Analytics', 'Planning', 'Forecasting', 'Data cloud', 'Services', 'Marketplace'];
    const act = [35.6, 26.0, 16.8, 8.4, 9.3, 5.1], tgt = [33.0, 22.5, 16.0, 8.0, 10.4, 5.6];
    const x = M - 0.1, w = gw(9) + 0.2;
    legend(s, M, 1.95, [['Above target', C.COBALT], ['Below target', C.CORAL], ['Target', C.INK, 'line']]);
    s.addChart([
      { type: pres.charts.BAR, data: [{ name: 'Actual', labels: bu, values: act }], options: { barDir: 'col', chartColors: act.map((a, i) => a >= tgt[i] ? C.COBALT : C.CORAL), barGapWidthPct: 70, showValue: true, dataLabelPosition: 'inEnd', dataLabelColor: C.WHITE, dataLabelFormatCode: '0.0' } },
      { type: pres.charts.LINE, data: [{ name: 'Target', labels: bu, values: tgt }], options: { chartColors: [C.INK], lineSize: 0, lineDataSymbol: 'dash', lineDataSymbolSize: 26, lineDataSymbolLineColor: C.INK, lineDataSymbolLineSize: 2 } },
    ], cb({ x, y: 2.3, w, h: 4.35, extra: { valAxisMinVal: 0, valAxisMaxVal: 40, valAxisMajorUnit: 10, valAxisLabelFormatCode: '$0' } }));
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    [['Analytics', '+7.9%', true], ['Planning', '+15.6%', true], ['Forecasting', '+5.0%', true], ['Data cloud', '+5.0%', true], ['Services', '−10.6%', false], ['Marketplace', '−8.9%', false]].forEach(([n, d, ok], i) => {
      const y = 2.0 + i * 0.75;
      rule(s, rx, y, rw, { color: C.RULE });
      t(s, n, { x: rx, y: y + 0.2, w: 1.8, h: 0.3, size: 10.5 });
      chip(s, rx + rw - 1.0, y + 0.21, d, { variant: ok ? 'cobalt' : 'coral', w: 1.0, h: 0.28 });
    });
    s.addNotes('TARGET VS ACTUAL. Native combination chart: actual columns (coloured per point) and target as a line series with no line and dash markers.');
  }

  // 28 Variance analysis — diverging bar
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Variance to budget: revenue upside offset by hiring costs', { lead: 'Full-year variance vs budget by line item, $M. Positive = favourable.' });
    const items = ['Subscription revenue', 'Services revenue', 'Cost of revenue', 'Sales & marketing', 'Research & development', 'General & admin', 'Other income'];
    const v = [4.6, -1.1, -0.8, -2.3, 1.2, 0.6, 0.3];
    const x = M, w = gw(8);
    box(s, x, 1.95, w, 4.7, { fill: C.WHITE });
    s.addChart(pres.charts.BAR, [{ name: 'Variance', labels: items, values: v }], cb({ x: x + 0.15, y: 2.1, w: w - 0.3, h: 4.45, extra: {
      barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: v.map(a => a >= 0 ? C.COBALT : C.CORAL), invertedColors: v.map(a => a >= 0 ? C.COBALT : C.CORAL), barGapWidthPct: 45,
      showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '+0.0;−0.0', valAxisMinVal: -3, valAxisMaxVal: 6, valAxisMajorUnit: 3, valAxisLabelFormatCode: '+0;−0;0', catAxisLabelPos: 'low', catAxisLineShow: true, catAxisLabelColor: C.INK, catAxisLabelFontSize: 10 } }));
    const rx = gx(8) + 0.35, rw = SW - M - rx;
    t(s, 'NET VARIANCE', { x: rx, y: 2.05, w: rw, h: 0.2, size: 8, bold: true, charSpacing: 1.8, color: C.STONE });
    t(s, '+$2.5M', { x: rx, y: 2.3, w: rw, h: 0.8, size: 42, bold: true, color: C.COBALT });
    t(s, 'favourable to budget', { x: rx, y: 3.1, w: rw, h: 0.3, size: 11 });
    rule(s, rx, 3.7, rw, { color: C.RULE });
    [['Largest upside', 'Subscription revenue, +$4.6M from enterprise wins.', C.COBALT], ['Largest gap', 'Sales & marketing, −$2.3M from accelerated hiring.', C.CORALD]].forEach(([h1, d, c], i) => {
      const y = 3.9 + i * 1.2;
      t(s, h1, { x: rx, y, w: rw, h: 0.25, size: 10.5, bold: true, color: c });
      t(s, d, { x: rx, y: y + 0.3, w: rw, h: 0.6, size: 10, color: C.STONE, lineSpacingMultiple: 1.25 });
    });
    s.addNotes('VARIANCE ANALYSIS. Native diverging bar chart: positive values cobalt, negative coral (per-point colours; invert-if-negative colours set).');
  }
};
