// 06–10 Business context
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, orbit, cb, legend, icon, panel, callout, footnote } = L;
  const SEC = 'Business context';

  // 06 Business snapshot — three-panel dashboard (Style D)
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Business snapshot: a balanced, recurring revenue base', { lead: 'Fiscal year 2026. Segment mix by revenue; headcount at year end.' });
    const y = 2.05, h = 4.55, w = (SW - 2 * M - 2 * 0.24) / 3;
    const p1 = panel(s, M, y, w, h, { title: 'Revenue by segment', sub: 'Share of $84.2M' });
    const seg = [['Enterprise', 44], ['Mid-market', 35], ['SMB', 21]];
    s.addChart(pres.charts.DOUGHNUT, [{ name: 'Segment', labels: seg.map(a => a[0]), values: seg.map(a => a[1]) }],
      cb({ x: p1.x, y: p1.y, w: p1.w, h: p1.h - 1.1, extra: { holeSize: 66, chartColors: [C.COBALT, C.SKY, C.MIST], showLegend: false, dataBorder: { pt: 2, color: C.WHITE } } }));
    t(s, '44%', { x: p1.x, y: p1.y + (p1.h - 1.1) / 2 - 0.3, w: p1.w, h: 0.45, size: 24, bold: true, color: C.COBALT, align: 'center' });
    t(s, 'Enterprise', { x: p1.x, y: p1.y + (p1.h - 1.1) / 2 + 0.15, w: p1.w, h: 0.22, size: 9, color: C.STONE, align: 'center' });
    seg.forEach(([n, v], i) => {
      const yy = y + h - 1.05 + i * 0.3;
      box(s, M + 0.3, yy + 0.05, 0.12, 0.12, { fill: [C.COBALT, C.SKY, C.MIST][i] });
      t(s, n, { x: M + 0.5, y: yy, w: 2, h: 0.22, size: 9.5 });
      t(s, v + '%', { x: M + w - 1.05, y: yy, w: 0.8, h: 0.22, size: 9.5, bold: true, align: 'right' });
    });
    const x2 = M + w + 0.24;
    const p2 = panel(s, x2, y, w, h, { title: 'Headcount', sub: 'Employees at year end' });
    s.addChart(pres.charts.BAR, [{ name: 'Headcount', labels: ['2022', '2023', '2024', '2025', '2026'], values: [148, 196, 241, 288, 352] }],
      cb({ x: p2.x, y: p2.y, w: p2.w, h: p2.h, extra: { barDir: 'col', chartColors: [C.SKY, C.SKY, C.SKY, C.SKY, C.COBALT], barGapWidthPct: 55, showValue: true, dataLabelPosition: 'outEnd', valAxisHidden: true, valGridLine: { style: 'none' } } }));
    const x3 = x2 + w + 0.24;
    box(s, x3, y, w, h, { fill: C.DEEP });
    t(s, 'Customer experience', { x: x3 + 0.25, y: y + 0.2, w: w - 0.5, h: 0.24, size: 10.5, bold: true, color: C.WHITE });
    t(s, 'Net Promoter Score', { x: x3 + 0.25, y: y + 0.44, w: w - 0.5, h: 0.2, size: 8.5, color: C.SKY });
    t(s, '64', { x: x3 + 0.25, y: y + 0.85, w: 2, h: 1.1, size: 66, bold: true, color: C.CORAL });
    t(s, '▲ 9 pts vs 2025 · industry average 38', { x: x3 + 0.25, y: y + 1.95, w: w - 0.5, h: 0.22, size: 9, color: C.SKY });
    [['Promoters', 71], ['Passives', 22], ['Detractors', 7]].forEach(([n, v], i) => {
      const yy = y + 2.6 + i * 0.6;
      t(s, n, { x: x3 + 0.25, y: yy, w: 2, h: 0.2, size: 9, color: C.WHITE });
      t(s, v + '%', { x: x3 + w - 1.05, y: yy, w: 0.8, h: 0.2, size: 9, bold: true, color: C.WHITE, align: 'right' });
      box(s, x3 + 0.25, yy + 0.27, w - 0.5, 0.07, { fill: C.DEEP2 });
      box(s, x3 + 0.25, yy + 0.27, (w - 0.5) * v / 100, 0.07, { fill: i === 0 ? C.CORAL : C.SKY });
    });
    s.addNotes('BUSINESS SNAPSHOT. Three-panel dashboard: native doughnut, native column chart and an editable NPS meter built from bars.');
  }

  // 07 Growth overview — full-width chart with large headline (Style J)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    eyebrow(s, M, 0.55, SEC);
    t(s, [{ text: '12 straight quarters ', options: { color: C.INK } }, { text: 'of growth', options: { color: C.CORAL, italic: true } }], { x: M, y: 0.8, w: gw(9), h: 0.9, font: F.SERIF, size: 40 });
    t(s, 'Quarterly revenue, $M — every quarter since Q1 2024 exceeded the one before.', { x: M, y: 1.7, w: gw(8), h: 0.3, size: 11, color: C.STONE });
    const q = ['Q1 24', 'Q2', 'Q3', 'Q4', 'Q1 25', 'Q2', 'Q3', 'Q4', 'Q1 26', 'Q2', 'Q3', 'Q4'];
    const v = [13.2, 14.1, 15.0, 16.4, 15.8, 16.9, 17.6, 18.0, 19.4, 20.6, 21.3, 22.9];
    s.addChart(pres.charts.BAR, [{ name: 'Revenue', labels: q, values: v }], cb({ x: M - 0.1, y: 2.35, w: SW - 2 * M + 0.2, h: 4.3, extra: {
      barDir: 'col', chartColors: v.map((_, i) => i === 11 ? C.CORAL : i >= 8 ? C.COBALT : C.SKY), barGapWidthPct: 38, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0',
      valAxisHidden: true, valGridLine: { style: 'none' }, valAxisMinVal: 0, valAxisMaxVal: 26, catAxisLabelFontSize: 9.5 } }));
    legend(s, SW - M - 3.9, 1.75, [['2024–25', C.SKY], ['2026', C.COBALT], ['Latest quarter', C.CORAL]]);
    s.addNotes('GROWTH OVERVIEW. Full-width native column chart with one coral focus bar. Colour individual bars via Format Data Point.');
  }

  // 08 Business model — node chain
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'How the business model creates value', { lead: 'A land-and-expand model: acquisition is paid back in 14 months, then expansion compounds.' });
    const st = [
      ['Magnet', 'Acquire', 'Inbound, partners and outbound', 'CAC $21K'],
      ['RocketLaunch', 'Onboard', '30-day guided implementation', 'Time to value 26 days'],
      ['Gear', 'Deliver', 'Platform plus managed services', 'Gross margin 71%'],
      ['TrendUp', 'Expand', 'Seats, modules and new teams', 'NRR 118%'],
      ['ArrowsClockwise', 'Renew', 'Multi-year agreements', 'GRR 97%'],
    ];
    const y = 3.35, x0 = M + 0.9, x1 = SW - M - 0.9, step = (x1 - x0) / (st.length - 1), d = 1.0;
    rule(s, x0, y, x1 - x0, { color: C.COBALT, lw: 1.5 });
    st.forEach(([ic, n, desc, m], i) => {
      const cx = x0 + i * step;
      const hi = i === 3;
      circ(s, cx - d / 2, y - d / 2, d, { fill: hi ? C.CORAL : C.WHITE, line: hi ? null : C.COBALT, lw: 1.5 });
      icon(s, ic === 'Magnet' ? 'Funnel' : ic, cx - 0.22, y - 0.22, 0.44, hi ? C.WHITE : C.COBALT);
      numeral(s, cx - 0.45, y - 1.3, i + 1, { size: 18, w: 0.9, color: C.STONE });
      t(s, n, { x: cx - 1.1, y: y + 0.7, w: 2.2, h: 0.35, font: F.SERIF, size: 20, align: 'center' });
      t(s, desc, { x: cx - 1.1, y: y + 1.1, w: 2.2, h: 0.5, size: 10, color: C.STONE, align: 'center' });
      chip(s, cx - 0.95, y + 1.75, m, { variant: hi ? 'coral' : 'white', w: 1.9 });
    });
    t(s, 'Expansion revenue now funds 38% of new growth', { x: M, y: 6.15, w: SW - 2 * M, h: 0.3, size: 11, bold: true, color: C.COBALT, align: 'center' });
    s.addNotes('BUSINESS MODEL. Five-stage value chain on a single line. Nodes are grouped circles + icons; the coral node marks the profit engine.');
  }

  // 09 Revenue streams — 100% stacked column + comparison cards (Style G)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Subscriptions are now four-fifths of revenue');
    const yrs = ['2022', '2023', '2024', '2025', '2026'];
    const st = [['Subscriptions', [62, 68, 73, 77, 80], C.COBALT], ['Services', [24, 20, 16, 13, 11], C.SKY], ['Marketplace', [9, 8, 7, 6, 6], C.MIST], ['Training', [5, 4, 4, 4, 3], C.PEACH]];
    const w = gw(7);
    s.addChart(pres.charts.BAR, st.map(([n, v]) => ({ name: n, labels: yrs, values: v })), cb({ x: M - 0.1, y: 1.95, w: w + 0.1, h: 4.65, extra: {
      barDir: 'col', barGrouping: 'percentStacked', chartColors: st.map(a => a[2]), barGapWidthPct: 45,
      valAxisLabelFormatCode: '0%', valGridLine: { style: 'none' }, showLegend: false } }));
    const x = gx(7) + 0.2, cw = SW - M - x;
    st.forEach(([n, v, col], i) => {
      const y = 1.95 + i * 1.18;
      box(s, x, y, cw, 1.05, { fill: i === 0 ? C.DEEP : C.IVORY });
      box(s, x + 0.25, y + 0.26, 0.14, 0.14, { fill: col });
      t(s, n, { x: x + 0.5, y: y + 0.2, w: 2.2, h: 0.25, size: 11, bold: true, color: i === 0 ? C.WHITE : C.INK });
      t(s, ['ARR-based, billed annually', 'Implementation and advisory', 'Third-party app commissions', 'Certification programmes'][i], { x: x + 0.5, y: y + 0.5, w: 2.4, h: 0.4, size: 9, color: i === 0 ? C.SKY : C.STONE });
      t(s, v[4] + '%', { x: x + cw - 1.3, y: y + 0.18, w: 1.05, h: 0.45, size: 22, bold: true, align: 'right', color: i === 0 ? C.CORAL : C.INK });
      t(s, (v[4] - v[0] > 0 ? '+' : '') + (v[4] - v[0]) + ' pts since 2022', { x: x + cw - 2.05, y: y + 0.65, w: 1.8, h: 0.22, size: 8.5, align: 'right', color: i === 0 ? C.SKY : C.STONE });
    });
    s.addNotes('REVENUE STREAMS. Native 100% stacked column chart; the cards on the right repeat the 2026 share and five-year change.');
  }

  // 10 Market opportunity — dark slide, bright accent chart (Style K)
  {
    const s = pres.addSlide({ masterName: L.L.CO });
    header(s, SEC, 'A $46B opportunity — and we serve less than 1% of it', { dark: true });
    t(s, '$46B', { x: M, y: 2.2, w: gw(4), h: 1.3, size: 80, bold: true, color: C.CORAL });
    t(s, 'Addressable spend on revenue analytics and planning software across our 24 markets, 2026.', { x: M, y: 3.6, w: gw(4), h: 0.9, size: 12, color: C.SKY, lineSpacingMultiple: 1.3 });
    [['14%', 'annual market growth'], ['0.8%', 'our current share']].forEach(([v, k], i) => {
      const x = M + i * 2.15;
      rule(s, x, 4.95, 1.9, { color: C.DEEP2, lw: 1 });
      t(s, v, { x, y: 5.1, w: 1.9, h: 0.55, size: 26, bold: true, color: C.WHITE });
      t(s, k, { x, y: 5.65, w: 1.9, h: 0.25, size: 9.5, color: C.SKY });
    });
    const x = gx(5) + 0.1, w = SW - M - x;
    const p = panel(s, x, 1.95, w, 4.7, { dark: true, title: 'Opportunity by segment, $B', sub: 'Highlighted: our priority segment for 2027' });
    const segs = ['Mid-market SaaS', 'Financial services', 'Manufacturing', 'Healthcare', 'Retail', 'Public sector'];
    const vals = [11.8, 9.6, 8.1, 7.2, 5.4, 3.9];
    s.addChart(pres.charts.BAR, [{ name: 'Opportunity', labels: segs, values: vals }], cb({ x: p.x, y: p.y, w: p.w, h: p.h, dark: true, bg: C.DEEP2, extra: {
      barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: vals.map((_, i) => i === 0 ? C.CORAL : C.SKY), barGapWidthPct: 42, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '"$"0.0"B"',
      valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, catAxisLabelColor: C.WHITE, catAxisLabelFontSize: 10 } }));
    s.addNotes('MARKET OPPORTUNITY. Dark data slide: one big number, two proof points and a native bar chart with a single coral highlight.');
  }
};
