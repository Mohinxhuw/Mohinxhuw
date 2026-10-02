// 37–43 Finance
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, cb, legend, icon, panel, callout, footnote, dashedLines } = L;
  const SEC = 'Finance';
  const NB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: C.RULE }, { type: 'none' }];
  const HB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1, color: C.INK }, { type: 'none' }];

  // 37 Revenue breakdown — pie + split dark list (Style N)
  {
    const s = pres.addSlide({ masterName: L.L.BIV });
    const half = SW * 0.52;
    eyebrow(s, M, 0.55, SEC);
    t(s, 'Revenue breakdown', { x: M, y: 0.82, w: half - M - 0.4, h: 0.6, font: F.SERIF, size: 27 });
    t(s, 'Three revenue types; recurring revenue is 86% of the total.', { x: M, y: 1.42, w: half - M - 0.4, h: 0.3, size: 10.5, color: C.STONE });
    const parts = [['Recurring subscriptions', 72.4, C.COBALT, 'Annual and multi-year platform contracts'], ['Professional services', 8.3, C.CORAL, 'Implementation, training and advisory'], ['Usage and marketplace', 3.5, C.SKY, 'Data credits and partner app commissions']];
    s.addChart(pres.charts.PIE, [{ name: 'Revenue', labels: parts.map(p => p[0]), values: parts.map(p => p[1]) }], cb({ x: M + 0.3, y: 2.0, w: half - M - 1.0, h: 4.6, bg: C.IVORY, extra: {
      chartColors: parts.map(p => p[2]), showPercent: true, showValue: false, dataLabelColor: C.WHITE, dataLabelFontSize: 12, dataLabelPosition: 'inEnd', dataBorder: { pt: 2, color: C.IVORY }, firstSliceAng: 40, showLegend: false } }));
    box(s, half, 0, SW - half, SH, { fill: C.DEEP });
    t(s, 'TOTAL REVENUE 2026', { x: half + 0.6, y: 0.9, w: 4, h: 0.2, size: 8, bold: true, charSpacing: 1.8, color: C.SKY });
    t(s, '$84.2M', { x: half + 0.6, y: 1.15, w: 5, h: 1.0, size: 54, bold: true, color: C.WHITE });
    parts.forEach(([n, v, c, d], i) => {
      const y = 2.75 + i * 1.3;
      rule(s, half + 0.6, y, SW - half - 1.3, { color: C.DEEP2, lw: 1 });
      box(s, half + 0.6, y + 0.3, 0.16, 0.16, { fill: c });
      t(s, n, { x: half + 0.95, y: y + 0.22, w: 3.3, h: 0.3, size: 13, bold: true, color: C.WHITE });
      t(s, d, { x: half + 0.95, y: y + 0.55, w: 3.3, h: 0.25, size: 9.5, color: C.SKY });
      t(s, '$' + v.toFixed(1) + 'M', { x: SW - 2.2, y: y + 0.2, w: 1.5, h: 0.35, size: 16, bold: true, color: i === 1 ? C.CORAL : C.WHITE, align: 'right' });
      t(s, Math.round(v / 84.2 * 100) + '%', { x: SW - 2.2, y: y + 0.55, w: 1.5, h: 0.25, size: 9.5, color: C.SKY, align: 'right' });
    });
    s.addNotes('REVENUE BREAKDOWN. Split screen: native pie chart (used only for three parts) and a dark breakdown list.');
  }

  // 38 Profitability — overlapping areas + margin KPIs
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Profitability: operating profit grew twice as fast as revenue', { lead: 'Gross profit and operating profit, $M, 2020–2026.' });
    [['Gross margin', '71.4%', '+1.8 pts'], ['Operating margin', '18.6%', '+4.1 pts'], ['Net margin', '13.2%', '+3.6 pts']].forEach(([l, v, d], i) => {
      const x = M + i * 2.1;
      kpi(s, x, 1.95, 1.9, { label: l, value: v, delta: d, size: 24, color: i === 1 ? C.CORALD : C.INK });
    });
    const yrs = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
    legend(s, gx(7) + 0.2, 2.05, [['Gross profit', C.SKY], ['Operating profit', C.CORAL, 'line']]);
    s.addChart([
      { type: pres.charts.AREA, data: [{ name: 'Gross profit', labels: yrs, values: [18.9, 24.3, 30.4, 36.6, 41.4, 44.7, 60.1] }], options: { chartColors: [C.SKY] } },
      { type: pres.charts.LINE, data: [{ name: 'Operating profit', labels: yrs, values: [1.4, 2.8, 4.6, 6.1, 7.8, 9.3, 15.7] }], options: { chartColors: [C.CORAL], lineSize: 3, lineDataSymbol: 'circle', lineDataSymbolSize: 8, showValue: true, dataLabelPosition: 't', dataLabelFormatCode: '"$"0.0', dataLabelColor: C.CORALD } },
    ], cb({ x: M - 0.1, y: 3.15, w: SW - 2 * M + 0.2, h: 3.5, extra: { valAxisLabelFormatCode: '$0', valAxisMinVal: 0, valAxisMaxVal: 70, valAxisMajorUnit: 10 } }));
    s.addNotes('PROFITABILITY. Native combination chart: gross profit as an area, operating profit as a labelled line, under a KPI strip.');
  }

  // 39 Expense structure — 100% stacked bar by year
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Expense structure: R&D share up, G&A share down', { lead: 'Operating expenses by function, % of total, 2022–2026.' });
    const yrs = ['2022', '2023', '2024', '2025', '2026'];
    const cats = [['R&D', [28, 30, 32, 33, 35], C.DEEP], ['Sales', [30, 30, 29, 29, 29], C.COBALT], ['Marketing', [15, 15, 15, 15, 14], '5A72DD'], ['G&A', [19, 17, 16, 15, 14], C.STONE], ['Customer success', [8, 8, 8, 8, 8], C.CORAL]];
    const x = M, w = gw(8);
    box(s, x, 1.95, w, 4.7, { fill: C.WHITE });
    legend(s, x + 0.3, 2.12, cats.map(c => [c[0], c[2]]));
    s.addChart(pres.charts.BAR, cats.map(([n, v]) => ({ name: n, labels: yrs, values: v })), cb({ x: x + 0.15, y: 2.45, w: w - 0.3, h: 4.1, extra: {
      barDir: 'bar', barGrouping: 'percentStacked', catAxisOrientation: 'maxMin', chartColors: cats.map(c => c[2]), barGapWidthPct: 38, showValue: true, dataLabelPosition: 'ctr', dataLabelColor: C.WHITE, dataLabelFormatCode: '0"%"',
      valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, catAxisLabelColor: C.INK, catAxisLabelFontSize: 10 } }));
    const rx = gx(8) + 0.35, rw = SW - M - rx;
    t(s, 'TOTAL OPEX 2026', { x: rx, y: 2.05, w: rw, h: 0.2, size: 8, bold: true, charSpacing: 1.6, color: C.STONE });
    t(s, '$44.4M', { x: rx, y: 2.3, w: rw, h: 0.75, size: 38, bold: true });
    t(s, '52.7% of revenue, down from 58.1%', { x: rx, y: 3.05, w: rw, h: 0.3, size: 10.5, color: C.STONE });
    rule(s, rx, 3.65, rw, { color: C.RULE });
    [['R&D', '+7 pts', 'Planning suite and AI features'], ['G&A', '−5 pts', 'Finance automation and shared services']].forEach(([n, d, why], i) => {
      const y = 3.85 + i * 1.25;
      t(s, n, { x: rx, y, w: 1.5, h: 0.3, size: 12, bold: true });
      chip(s, rx + rw - 0.95, y, d, { variant: i ? 'outline' : 'cobalt', w: 0.95 });
      t(s, why, { x: rx, y: y + 0.38, w: rw, h: 0.5, size: 10, color: C.STONE });
    });
    s.addNotes('EXPENSE STRUCTURE. Native 100% stacked bar chart; colours are all dark enough to carry white data labels.');
  }

  // 40 Margin analysis — dark multi-line (Style K)
  {
    const s = pres.addSlide({ masterName: L.L.CO });
    header(s, SEC, 'Margin analysis: operating leverage is now visible', { dark: true, lead: 'Gross, operating and net margin, % of revenue.' });
    const yrs = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
    const x = M - 0.1, w = gw(9) + 0.2;
    legend(s, M, 1.95, [['Gross margin', C.SKY, 'line'], ['Operating margin', C.CORAL, 'line'], ['Net margin', C.WHITE, 'line']], { dark: true });
    s.addChart(pres.charts.LINE, [
      { name: 'Gross margin', labels: yrs, values: [67.7, 69.0, 69.4, 70.2, 70.5, 69.6, 71.4] },
      { name: 'Operating margin', labels: yrs, values: [5.0, 8.0, 10.5, 11.7, 13.3, 14.5, 18.6] },
      { name: 'Net margin', labels: yrs, values: [2.1, 4.6, 6.8, 7.9, 8.8, 9.6, 13.2] },
    ], cb({ x, y: 2.3, w, h: 4.35, dark: true, extra: { chartColors: [C.SKY, C.CORAL, C.WHITE], lineSize: 2.75, lineDataSymbol: 'circle', lineDataSymbolSize: 7, valAxisMinVal: 0, valAxisMaxVal: 80, valAxisMajorUnit: 20, valAxisLabelFormatCode: '0"%"' } }));
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    [['+13.6 pts', 'operating margin since 2020', C.CORAL], ['20%', 'operating margin target for 2027', C.WHITE], ['71%', 'gross margin, stable through scale', C.SKY]].forEach(([v, k, c], i) => {
      const y = 2.0 + i * 1.5;
      rule(s, rx, y, rw, { color: C.DEEP2, lw: 1 });
      t(s, v, { x: rx, y: y + 0.18, w: rw, h: 0.6, size: 28, bold: true, color: c });
      t(s, k, { x: rx, y: y + 0.8, w: rw, h: 0.45, size: 10, color: C.SKY });
    });
    s.addNotes('MARGIN ANALYSIS. Dark data slide with a native three-series line chart.');
  }

  // 41 Cash flow — monthly net cash (pos/neg) + cumulative cash line
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Cash flow: positive in ten of twelve months', { lead: 'Monthly net cash flow ($M, columns) and closing cash balance ($M, line, right axis).' });
    const mo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const net = [1.4, 0.6, -0.9, 0.8, 1.1, 0.5, -0.4, 1.2, 0.9, 1.3, 0.7, 1.8];
    let bal = 32.6; const cum = net.map(n => +(bal += n).toFixed(1));
    const x = M - 0.1, w = gw(9) + 0.2;
    legend(s, M, 1.95, [['Cash inflow', C.COBALT], ['Cash outflow', C.CORAL], ['Cash balance', C.INK, 'line']]);
    s.addChart([
      { type: pres.charts.BAR, data: [{ name: 'Net cash flow', labels: mo, values: net }], options: { barDir: 'col', chartColors: net.map(n => n >= 0 ? C.COBALT : C.CORAL), invertedColors: net.map(n => n >= 0 ? C.COBALT : C.CORAL), barGapWidthPct: 50 } },
      { type: pres.charts.LINE, data: [{ name: 'Cash balance', labels: mo, values: cum }], options: { chartColors: [C.INK], lineSize: 2.25, lineDataSymbol: 'circle', lineDataSymbolSize: 5, secondaryValAxis: true, secondaryCatAxis: true } },
    ], cb({ x, y: 2.3, w, h: 4.35, extra: {
      valAxes: [{ showValAxisTitle: false, valAxisMinVal: -2, valAxisMaxVal: 4, valAxisMajorUnit: 1, valAxisLabelFormatCode: '+0;−0;0' }, { showValAxisTitle: false, valAxisMinVal: 20, valAxisMaxVal: 50, valAxisMajorUnit: 5, valAxisLabelFormatCode: '"$"0', valGridLine: { style: 'none' } }],
      catAxes: [{ catAxisTitle: '', catAxisLabelPos: 'low' }, { catAxisHidden: true }] } }));
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    box(s, rx, 1.95, rw, 4.7, { fill: C.IVORY });
    [['Closing cash', '$41.6M', C.COBALT], ['Free cash flow', '$9.0M', C.INK], ['Cash conversion', '57%', C.INK]].forEach(([k, v, c], i) => {
      const y = 2.2 + i * 1.4;
      t(s, k.toUpperCase(), { x: rx + 0.3, y, w: rw - 0.6, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: C.STONE });
      t(s, v, { x: rx + 0.3, y: y + 0.25, w: rw - 0.6, h: 0.6, size: 28, bold: true, color: c });
      if (i < 2) rule(s, rx + 0.3, y + 1.1, rw - 0.6, { color: C.RULE });
    });
    s.addNotes('CASH FLOW. Native combination chart: per-point coloured net cash columns and a closing-balance line on a secondary axis.');
  }

  // 42 Waterfall — revenue bridge 2025 → 2026
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Revenue bridge: expansion added more than new logos', { lead: 'Revenue 2025 to 2026, $M.' });
    const lab = ['Revenue 2025', 'New logos', 'Expansion', 'Price', 'Churn', 'FX', 'Revenue 2026'];
    const val = [64.3, 9.8, 12.6, 2.4, -3.6, -1.3, 84.2];
    let run = 0; const base = [], vis = [];
    val.forEach((v, i) => {
      if (i === 0 || i === val.length - 1) { base.push(0); vis.push(Math.abs(v)); run = v; }
      else if (v >= 0) { base.push(run); vis.push(v); run += v; }
      else { run += v; base.push(run); vis.push(-v); }
    });
    const x = M, y = 1.95, w = SW - 2 * M, h = 4.7, lay = { x: 0.03, y: 0.1, w: 0.95, h: 0.78 };
    box(s, x, y, w, h, { fill: C.WHITE });
    const isTot = (i) => i === 0 || i === val.length - 1;
    s.addChart(pres.charts.BAR, [
      { name: 'Base', labels: lab, values: base },
      { name: 'Total', labels: lab, values: vis.map((v, i) => isTot(i) ? v : 0) },
      { name: 'Increase', labels: lab, values: vis.map((v, i) => !isTot(i) && val[i] >= 0 ? v : 0) },
      { name: 'Decrease', labels: lab, values: vis.map((v, i) => !isTot(i) && val[i] < 0 ? v : 0) },
    ], cb({ x, y, w, h, extra: {
      barDir: 'col', barGrouping: 'stacked', chartColors: [C.WHITE, C.DEEP, C.COBALT, C.CORAL], barGapWidthPct: 45, valAxisHidden: true, valGridLine: { style: 'none' }, valAxisMinVal: 0, valAxisMaxVal: 90, catAxisLabelFontSize: 10, catAxisLabelColor: C.INK, layout: lay } }));
    const pw = w * lay.w, slot = pw / lab.length, X0 = x + w * lay.x, Y = (v) => y + h * (lay.y + lay.h * (1 - v / 90));
    val.forEach((v, i) => {
      const top = base[i] + vis[i];
      t(s, (isTot(i) ? '$' : v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1), { x: X0 + slot * i, y: Y(top) - 0.32, w: slot, h: 0.28, size: 11, bold: true, align: 'center', color: isTot(i) ? C.DEEP : v >= 0 ? C.COBALT : C.CORALD });
    });
    legend(s, x + 0.3, y + 0.15, [['Total', C.DEEP], ['Increase', C.COBALT], ['Decrease', C.CORAL]]);
    s.addNotes('WATERFALL ANALYSIS. Native stacked column waterfall: "Base" is white (invisible) and positions each step; Total, Increase and Decrease are separate series so colours follow the data. Base = running total before the step (after it, for decreases).');
  }

  // 43 Financial forecast — column + P&L table (Style H)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Five-year outlook: $200M revenue at a 24% operating margin');
    const yrs = ['2026A', '2027F', '2028F', '2029F', '2030F'];
    const rev = [84.2, 109.5, 138.0, 168.4, 201.0];
    const x = M, w = gw(5);
    const p = panel(s, x, 1.95, w, 4.7, { title: 'Revenue, $M', sub: 'Actual 2026, forecast 2027–2030', fill: C.IVORY });
    s.addChart(pres.charts.BAR, [{ name: 'Revenue', labels: yrs, values: rev }], cb({ x: p.x, y: p.y, w: p.w, h: p.h, bg: C.IVORY, extra: {
      barDir: 'col', chartColors: [C.COBALT, C.SKY, C.SKY, C.SKY, C.CORAL], barGapWidthPct: 40, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0', valAxisHidden: true, valGridLine: { style: 'none' }, valAxisMaxVal: 230 } }));
    const tx = gx(5) + 0.2, tw = SW - M - tx;
    const rows = [['$M', ...yrs], ['Revenue', '84.2', '109.5', '138.0', '168.4', '201.0'], ['Growth', '31%', '30%', '26%', '22%', '19%'], ['Gross profit', '60.1', '79.4', '100.7', '124.6', '150.8'], ['Gross margin', '71%', '73%', '73%', '74%', '75%'], ['Operating profit', '15.7', '22.4', '30.4', '38.7', '48.2'], ['Operating margin', '19%', '20%', '22%', '23%', '24%'], ['Free cash flow', '9.0', '14.1', '20.5', '27.0', '34.6']];
    const tbl = rows.map((r, ri) => r.map((c, ci) => ({ text: c, options: {
      fontSize: ri === 0 ? 9 : 10.5, bold: ri === 0 || ri === 1 || ri === 5, color: ri === 0 ? C.STONE : (ri === 2 || ri === 4 || ri === 6) ? C.STONE : C.INK,
      align: ci ? 'right' : 'left', valign: 'middle', fill: { color: ci === 5 && ri ? 'FFF1EC' : C.WHITE }, border: ri === 0 ? HB : NB } })));
    s.addTable(tbl, { x: tx, y: 2.0, w: tw, colW: [2.0, ...Array(5).fill((tw - 2.0) / 5)], rowH: [0.42, ...Array(rows.length - 1).fill(0.5)], fontFace: F.SANS, margin: [0, 0.08, 0, 0.08] });
    t(s, 'A = actual · F = forecast. Shaded column = 2030 ambition.', { x: tx, y: 6.4, w: tw, h: 0.22, size: 8, color: C.STONE });
    s.addNotes('FINANCIAL FORECAST. Native column chart and a native P&L table. The coral bar and shaded column mark the 2030 ambition.');
  }
};
