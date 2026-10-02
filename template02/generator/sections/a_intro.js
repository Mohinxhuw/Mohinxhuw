// 01–05 Opening
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, orbit, cb, legend, icon } = L;

  // 01 Cover
  {
    const s = pres.addSlide({ masterName: L.L.BCO });
    orbit(s, 10.15, 3.75, 2.75, { line: C.COBALT });
    t(s, 'VANTA', { x: M, y: 0.6, w: 2, h: 0.25, size: 10, bold: true, charSpacing: 4, color: C.WHITE });
    t(s, 'Template 02', { x: SW - M - 2, y: 0.6, w: 2, h: 0.25, size: 9, color: C.SKY, align: 'right' });
    eyebrow(s, M, 2.0, 'Annual business presentation · 2026', { dark: true });
    t(s, [
      { text: 'Clarity that\nmoves business\n', options: { color: C.WHITE } },
      { text: 'forward.', options: { color: C.CORAL, italic: true } },
    ], { x: M, y: 2.3, w: 7.2, h: 2.8, font: F.SERIF, size: 56, lineSpacingMultiple: 0.95 });
    t(s, 'Performance, market position and the plan for the year ahead — Halden Group.', { x: M, y: 5.35, w: 6.2, h: 0.6, size: 13, color: C.SKY, lineSpacingMultiple: 1.25 });
    [['Prepared for', 'Board of Directors'], ['Date', '12 November 2026'], ['Version', 'Final · v2.1']].forEach(([k, v], i) => {
      const x = M + i * 2.15;
      rule(s, x, 6.35, 1.9, { color: C.DEEP2, lw: 1 });
      t(s, k, { x, y: 6.48, w: 1.9, h: 0.2, size: 8, color: C.SKYD });
      t(s, v, { x, y: 6.68, w: 1.9, h: 0.25, size: 10, bold: true, color: C.WHITE });
    });
    s.addNotes('COVER. The orbit artwork is built from editable circles. Replace the headline; keep the last word in italic coral for the signature accent.');
  }

  // 02 Statement / value proposition
  {
    const s = pres.addSlide({ masterName: L.L.BIV });
    eyebrow(s, M, 0.62, 'Value proposition');
    t(s, [
      { text: 'We help growing companies turn ', options: { color: C.INK } },
      { text: 'data', options: { color: C.CORAL, italic: true } },
      { text: ' into decisions — and decisions into ', options: { color: C.INK } },
      { text: 'revenue.', options: { color: C.COBALT, italic: true } },
    ], { x: M, y: 1.35, w: gw(10), h: 2.9, font: F.SERIF, size: 44, lineSpacingMultiple: 1.05 });
    const stats = [['1,850', 'clients across mid-market and enterprise'], ['24', 'markets served from 9 regional hubs'], ['97%', 'gross revenue retention in 2026']];
    stats.forEach(([v, k], i) => {
      const x = gx(i * 4);
      if (i) vrule(s, x - 0.12, 4.85, 1.45, { color: C.RULE });
      t(s, v, { x: x + (i ? 0.12 : 0), y: 4.8, w: gw(4) - 0.3, h: 0.95, size: 52, bold: true, color: i === 0 ? C.COBALT : C.INK });
      t(s, k, { x: x + (i ? 0.12 : 0), y: 5.8, w: gw(3), h: 0.5, size: 11, color: C.STONE });
    });
    rule(s, M, 4.6, SW - 2 * M, { color: C.INK, lw: 1 });
    s.addNotes('STATEMENT. One sentence, set large. Use italic coral or cobalt runs to emphasise up to two words.');
  }

  // 03 Agenda
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    eyebrow(s, M, 0.55, 'Agenda');
    t(s, 'What we will\ncover today', { x: M, y: 0.85, w: gw(4), h: 1.5, font: F.SERIF, size: 36, color: C.INK, lineSpacingMultiple: 0.98 });
    t(s, 'Eight chapters, from context to results. Each chapter closes with the decision we need.', { x: M, y: 2.55, w: gw(3) + 0.2, h: 0.9, size: 11, color: C.STONE, lineSpacingMultiple: 1.3 });
    box(s, M, 4.2, gw(3) + 0.2, 2.3, { fill: C.COBALT });
    t(s, '45', { x: M + 0.3, y: 4.4, w: 2, h: 0.9, size: 54, bold: true, color: C.WHITE });
    t(s, 'minutes, including a\n10-minute Q&A', { x: M + 0.3, y: 5.4, w: 2.4, h: 0.6, size: 10.5, color: C.SKY });
    const items = [
      ['Business context', 'Snapshot, growth and model', '06'], ['Market & analysis', 'Size, share and competition', '11'],
      ['Data & performance', 'Dashboards and variance', '19'], ['Sales', 'Funnel, pipeline and forecast', '29'],
      ['Finance', 'Revenue, margin and cash', '37'], ['Strategy', 'Priorities, roadmap and risks', '44'],
      ['Product & marketing', 'Pricing and campaigns', '51'], ['Results & next steps', 'Case study and takeaways', '57'],
    ];
    const x0 = gx(5), cw = gw(3.5), rh = 1.08;
    items.forEach(([h1, d, pg], i) => {
      const col = Math.floor(i / 4), r = i % 4;
      const x = x0 + col * (cw + 0.45), y = 1.0 + r * rh + 0.55;
      rule(s, x, y, cw + 0.2, { color: r === 0 ? C.INK : C.RULE, lw: r === 0 ? 1 : 0.75 });
      numeral(s, x, y + 0.15, i + 1, { size: 22 });
      t(s, h1, { x: x + 0.7, y: y + 0.18, w: cw - 1.2, h: 0.3, size: 13, bold: true, color: C.INK });
      t(s, d, { x: x + 0.7, y: y + 0.5, w: cw - 1.0, h: 0.25, size: 9.5, color: C.STONE });
      t(s, pg, { x: x + cw - 0.4, y: y + 0.2, w: 0.6, h: 0.25, size: 9, bold: true, color: C.COBALT, align: 'right' });
    });
    s.addNotes('AGENDA. Two-column chapter list with italic serif numerals and starting slide numbers.');
  }

  // 04 Executive overview — split editorial + KPI panel
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, 'Executive overview', 'A record year, with three priorities for 2027');
    t(s, 'Halden Group grew revenue 31% to $84.2M while lifting operating margin by four points. Growth came from enterprise expansion and our partner channel; the next stage is international scale.', { x: M, y: 2.05, w: gw(7), h: 1.3, font: F.SERIF, size: 16, color: C.INK, lineSpacingMultiple: 1.3 });
    const pts = [['Win the enterprise segment', 'Enterprise now 44% of new bookings, up from 29%.'], ['Scale the partner channel', 'Partners sourced $11.6M of pipeline this year.'], ['Expand into DACH and Nordics', 'Two hubs open in Q2 2027 with local sales teams.']];
    pts.forEach(([h1, d], i) => {
      const y = 3.75 + i * 0.95;
      rule(s, M, y, gw(7), { color: C.RULE });
      numeral(s, M, y + 0.12, i + 1, { size: 20, color: C.COBALT });
      t(s, h1, { x: M + 0.7, y: y + 0.14, w: gw(6), h: 0.3, size: 13, bold: true });
      t(s, d, { x: M + 0.7, y: y + 0.46, w: gw(6), h: 0.3, size: 10.5, color: C.STONE });
    });
    const px = gx(8) - 0.05, pw = SW - px;
    box(s, px, 0, pw, SH, { fill: C.DEEP });
    const k = [['Revenue', '$84.2M', '31%', 'YoY'], ['Operating margin', '18.6%', '4.1 pts', 'YoY'], ['Customers', '1,850', '212', 'net new'], ['Net retention', '118%', '6 pts', 'YoY']];
    k.forEach(([l, v, d, n], i) => {
      const y = 1.05 + i * 1.42;
      kpi(s, px + 0.55, y, pw - 1.1, { label: l, value: v, delta: d, note: n, dark: true, size: 30, color: i === 0 ? C.CORAL : C.WHITE });
      if (i < 3) rule(s, px + 0.55, y + 1.25, pw - 1.1, { color: C.DEEP2, lw: 1 });
    });
    s.addNotes('EXECUTIVE OVERVIEW. Split layout: narrative on the left, a full-height cobalt KPI rail on the right.');
  }

  // 05 Key numbers — large KPI + supporting area chart (Style E)
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, 'Key numbers', 'Revenue has more than tripled since 2019');
    t(s, 'ANNUAL REVENUE 2026', { x: M, y: 2.1, w: 4, h: 0.22, size: 8.5, bold: true, charSpacing: 1.6, color: C.STONE });
    t(s, '$84.2M', { x: M - 0.04, y: 2.35, w: gw(5), h: 1.35, size: 80, bold: true, color: C.COBALT });
    t(s, [{ text: '▲ 31%', options: { bold: true, color: C.CORALD } }, { text: '  vs 2025 · 3.4× since 2019', options: { color: C.STONE } }], { x: M, y: 3.75, w: gw(5), h: 0.3, size: 11 });
    const sm = [['Gross margin', '71.4%'], ['EBITDA', '$15.7M'], ['Recurring', '86%']];
    sm.forEach(([l, v], i) => {
      const x = M + i * 1.75;
      rule(s, x, 4.7, 1.55, { color: C.INK, lw: 1 });
      t(s, l, { x, y: 4.85, w: 1.6, h: 0.22, size: 9, color: C.STONE });
      t(s, v, { x, y: 5.1, w: 1.6, h: 0.45, size: 22, bold: true });
    });
    const x = gx(6), w = SW - M - x;
    box(s, x, 1.95, w, 4.7, { fill: C.WHITE });
    t(s, 'Revenue, $M', { x: x + 0.3, y: 2.15, w: 3, h: 0.25, size: 11, bold: true });
    s.addChart(pres.charts.AREA, [{ name: 'Revenue', labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'], values: [24.6, 27.9, 35.2, 43.8, 52.1, 58.7, 64.3, 84.2] }],
      cb({ x: x + 0.15, y: 2.5, w: w - 0.3, h: 4.0, extra: { chartColors: [C.COBALT], chartColorsOpacity: 90, valAxisMinVal: 0, valAxisMaxVal: 100, valAxisMajorUnit: 25, valAxisLabelFormatCode: '$0', layout: { x: 0.08, y: 0.08, w: 0.9, h: 0.8 } } }));
    L.callout(s, x + 0.15 + (w - 0.3) * (0.08 + 0.9 * (7.5 / 8)) - 0.05, 2.5 + 4.0 * (0.08 + 0.8 * (1 - 84.2 / 100)) - 0.42, '$84.2M');
    s.addNotes('KEY NUMBERS. Large headline KPI with a supporting native area chart (right-click › Edit Data).');
  }
};
