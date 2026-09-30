// Chart library
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, footnote, chartBase } = L;
  const SEC = 'Chart library';
  const box = (s, x, y, w, h, title, sub, fill = C.OFF) => {
    card(s, x, y, w, h, { fill });
    t(s, title, { x: x + 0.3, y: y + 0.22, w: w - 0.6, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    if (sub) t(s, sub, { x: x + 0.3, y: y + 0.52, w: w - 0.6, h: 0.25, size: 9.5, color: C.SLATE });
  };

  // Bars & columns
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Bars and columns', { lead: 'Use bars to rank categories, columns to compare periods. Highlight one bar; mute the rest.' });
    const w = (SW - 2 * M - 0.25) / 2, y = 2.05, h = 4.55;
    box(s, M, y, w, h, 'Ranked horizontal bar', 'Win rate by industry, %');
    s.addChart(pres.charts.BAR, [{ name: 'Win rate', labels: ['Software', 'Logistics', 'Fintech', 'Manufacturing', 'Healthcare', 'Retail'], values: [34, 31, 29, 24, 21, 17] }], chartBase({
      x: M + 0.15, y: y + 0.9, w: w - 0.3, h: h - 1.05, bg: C.OFF, extra: { barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [C.NAVY, C.MIST, C.MIST, C.MIST, C.MIST, C.MIST], barGapWidthPct: 45, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0"%"', valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, catAxisLabelColor: C.CHAR, catAxisLabelFontSize: 10 },
    }));
    const x2 = M + w + 0.25;
    box(s, x2, y, w, h, 'Clustered column', 'New customers by quarter, 2025 vs 2026');
    s.addChart(pres.charts.BAR, [
      { name: '2025', labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [52, 61, 70, 84] },
      { name: '2026', labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [71, 83, 96, 110] },
    ], chartBase({ x: x2 + 0.15, y: y + 0.9, w: w - 0.3, h: h - 1.05, bg: C.OFF, extra: { barDir: 'col', chartColors: [C.MIST, C.NAVY], barGapWidthPct: 90, barOverlapPct: -8, showValue: true, dataLabelPosition: 'outEnd', valAxisHidden: true, valGridLine: { style: 'none' }, showLegend: true, legendPos: 't' } }));
    s.addNotes('CHART LIBRARY — BARS. Right-click any chart › Edit Data. To highlight one bar: click it twice, then Format Data Point › Fill.');
  }

  // Lines & areas
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Lines and areas', { lead: 'Lines for trends over time; stacked areas for composition over time. Limit to four series.' });
    const w = (SW - 2 * M - 0.25) / 2, y = 2.05, h = 4.55;
    const mo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    box(s, M, y, w, h, 'Multi-series line', 'Weekly active users by plan, thousands');
    s.addChart(pres.charts.LINE, [
      { name: 'Growth', labels: mo, values: [12, 13.1, 14.5, 15.2, 16.8, 18.1, 19.0, 20.4, 21.9, 23.5, 24.8, 26.2] },
      { name: 'Enterprise', labels: mo, values: [8, 8.6, 9.1, 9.9, 10.4, 11.2, 11.8, 12.1, 12.9, 13.6, 14.2, 15.0] },
      { name: 'Starter', labels: mo, values: [5, 5.2, 5.6, 5.5, 5.9, 6.2, 6.1, 6.4, 6.6, 6.9, 7.1, 7.2] },
    ], chartBase({ x: M + 0.15, y: y + 0.9, w: w - 0.3, h: h - 1.05, bg: C.OFF, extra: { chartColors: [C.NAVY, C.STEEL, C.SLATE], lineSize: 2.25, lineDataSymbol: 'none', showLegend: true, legendPos: 't', valAxisLabelFontSize: 8.5, catAxisLabelFontSize: 8.5 } }));
    const x2 = M + w + 0.25;
    box(s, x2, y, w, h, 'Stacked area', 'Revenue by product line, $M');
    const q = ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'];
    s.addChart(pres.charts.AREA, [
      { name: 'Forecast', labels: q, values: [3.8, 4.2, 4.5, 4.9, 5.6, 6.3, 7.2] },
      { name: 'Pipeline', labels: q, values: [1.6, 1.8, 2.0, 2.2, 2.6, 3.0, 3.5] },
      { name: 'Analytics', labels: q, values: [0.7, 0.8, 0.9, 1.1, 1.4, 1.8, 2.2] },
    ], chartBase({ x: x2 + 0.15, y: y + 0.9, w: w - 0.3, h: h - 1.05, bg: C.OFF, extra: { barGrouping: 'stacked', chartColors: [C.NAVY, C.STEEL, C.LIME], showLegend: true, legendPos: 't', valAxisLabelFontSize: 8.5, catAxisLabelFontSize: 8.5, valAxisLabelFormatCode: '$0' } }));
    s.addNotes('CHART LIBRARY — LINES & AREAS. Series order in the data sheet controls stacking order (first = bottom).');
  }

  // Parts of a whole, radar, progress
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Proportions, profiles and progress', { lead: 'Pie for 2–3 parts, donut for up to 5, radar for profiles, rings for goal attainment.' });
    const n = 4, gap = 0.25, w = (SW - 2 * M - 3 * gap) / n, y = 2.05, h = 4.55;
    const xs = [0, 1, 2, 3].map(i => M + i * (w + gap));
    box(s, xs[0], y, w, h, 'Pie', 'Contract length', C.WHITE);
    s.addChart(pres.charts.PIE, [{ name: 'Contracts', labels: ['Annual', 'Multi-year', 'Monthly'], values: [58, 34, 8] }], chartBase({
      x: xs[0] + 0.15, y: y + 0.9, w: w - 0.3, h: h - 1.1, extra: { chartColors: [C.NAVY, C.LIME, C.MIST], showPercent: true, showLegend: true, legendPos: 'b', dataLabelColor: C.NAVY, dataBorder: { pt: 1.5, color: C.WHITE }, dataLabelPosition: 'outEnd' },
    }));
    box(s, xs[1], y, w, h, 'Donut', 'Seats by role', C.WHITE);
    s.addChart(pres.charts.DOUGHNUT, [{ name: 'Seats', labels: ['Sellers', 'Managers', 'RevOps', 'Execs'], values: [64, 21, 9, 6] }], chartBase({
      x: xs[1] + 0.15, y: y + 0.9, w: w - 0.3, h: h - 1.1, extra: { holeSize: 62, chartColors: [C.NAVY, C.STEEL, C.LIME, C.MIST], showLegend: true, legendPos: 'b', dataBorder: { pt: 1.5, color: C.WHITE } },
    }));
    box(s, xs[2], y, w, h, 'Radar', 'Team skills profile', C.WHITE);
    s.addChart(pres.charts.RADAR, [{ name: 'Team', labels: ['Prospecting', 'Discovery', 'Demo', 'Negotiation', 'Closing'], values: [7, 8.5, 9, 6, 7.5] }], chartBase({
      x: xs[2] + 0.1, y: y + 0.9, w: w - 0.2, h: h - 1.1, extra: { radarStyle: 'filled', chartColors: [C.NAVY], chartColorsOpacity: 70, valAxisHidden: true, valAxisMaxVal: 10, valAxisMinVal: 0, catAxisLabelFontSize: 8.5, catAxisLabelColor: C.NAVY },
    }));
    box(s, xs[3], y, w, h, 'Progress rings', 'Annual goal attainment', C.WHITE);
    [['Revenue', 81, C.NAVY], ['Logos', 74, C.STEEL]].forEach(([k, p, c], i) => {
      const d = 1.45, rx = xs[3] + w / 2 - d / 2, ry = y + 0.95 + i * 1.8;
      L.arc(s, rx, ry, d, 0, 359.9, C.OFF, 0.22);
      L.arc(s, rx, ry, d, 270, (270 + p * 3.6) % 360, c, 0.22);
      t(s, p + '%', { x: rx, y: ry + d / 2 - 0.25, w: d, h: 0.5, font: F.DISP, size: 18, color: C.NAVY, align: 'center', valign: 'middle' });
      t(s, k, { x: xs[3] + 0.2, y: ry + d + 0.02, w: w - 0.4, h: 0.25, font: F.MED, size: 10, color: C.CHAR, align: 'center' });
    });
    s.addNotes('CHART LIBRARY — PROPORTIONS. Pie, donut and radar are native charts. Progress rings are two block arcs: set the top arc end angle to 270° + 3.6° × percentage.');
  }

  // Combination, stacked 100%, bubble
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Combinations, compositions and correlations', { lead: 'Combo charts pair volume with rate; bubbles add a third dimension.' });
    const n = 3, gap = 0.25, w = (SW - 2 * M - 2 * gap) / n, y = 2.05, h = 4.55;
    const xs = [0, 1, 2].map(i => M + i * (w + gap));
    box(s, xs[0], y, w, h, 'Column + line combo', 'Deals won and win rate');
    const q = ['Q1', 'Q2', 'Q3', 'Q4'];
    s.addChart([
      { type: pres.charts.BAR, data: [{ name: 'Deals won', labels: q, values: [210, 245, 280, 320] }], options: { barDir: 'col', chartColors: [C.NAVY], barGapWidthPct: 70 } },
      { type: pres.charts.LINE, data: [{ name: 'Win rate %', labels: q, values: [24, 26, 27, 29] }], options: { chartColors: [C.OLIVE], lineSize: 2.25, lineDataSymbol: 'circle', lineDataSymbolSize: 7, secondaryValAxis: true, secondaryCatAxis: true } },
    ], chartBase({ x: xs[0] + 0.1, y: y + 0.9, w: w - 0.2, h: h - 1.05, bg: C.OFF, extra: {
      showLegend: true, legendPos: 't',
      valAxes: [{ showValAxisTitle: false, valAxisMinVal: 0, valAxisMaxVal: 400, valGridLine: { color: C.GRID, size: 0.75 } }, { showValAxisTitle: false, valAxisMinVal: 0, valAxisMaxVal: 40, valAxisLabelFormatCode: '0"%"', valGridLine: { style: 'none' } }],
      catAxes: [{ catAxisTitle: '' }, { catAxisHidden: true }],
    } }));
    box(s, xs[1], y, w, h, '100% stacked column', 'Deal stage mix by region');
    const r = ['EU', 'NA', 'APAC'];
    s.addChart(pres.charts.BAR, [
      { name: 'Early', labels: r, values: [45, 38, 52] },
      { name: 'Mid', labels: r, values: [35, 37, 33] },
      { name: 'Late', labels: r, values: [20, 25, 15] },
    ], chartBase({ x: xs[1] + 0.1, y: y + 0.9, w: w - 0.2, h: h - 1.05, bg: C.OFF, extra: { barDir: 'col', barGrouping: 'percentStacked', chartColors: [C.SLATE, C.STEEL, C.NAVY], barGapWidthPct: 60, showValue: true, dataLabelPosition: 'ctr', dataLabelColor: C.WHITE, dataLabelFormatCode: '0"%"', valAxisHidden: true, valGridLine: { style: 'none' }, showLegend: true, legendPos: 't' } }));
    box(s, xs[2], y, w, h, 'Bubble', 'Segment size vs growth (bubble = ARR)');
    s.addChart(pres.charts.BUBBLE, [
      { name: 'X', values: [12, 28, 40, 55, 70] },
      { name: 'Segments', values: [18, 34, 22, 45, 30], sizes: [6, 10, 8, 14, 5] },
    ], chartBase({ x: xs[2] + 0.1, y: y + 0.9, w: w - 0.2, h: h - 1.05, bg: C.OFF, extra: { chartColors: [C.NAVY], chartColorsOpacity: 80, valAxisMinVal: 0, valAxisMaxVal: 60, catAxisLabelFontSize: 8.5, valAxisLabelFontSize: 8.5, valAxisLabelFormatCode: '0"%"' } }));
    s.addNotes('CHART LIBRARY — COMBINATIONS. The combo chart uses a secondary axis for the rate. Bubble: first column = X, second = Y, third = size.');
  }
};
