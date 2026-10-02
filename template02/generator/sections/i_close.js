// 57–60 Results & closing
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, orbit, cb, legend, icon, panel, footnote } = L;
  const SEC = 'Results & next steps';

  // 57 Case study — editorial results
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    eyebrow(s, M, 0.55, SEC + ' · Case study');
    t(s, 'How Arcwell Systems closed its books in 4 days instead of 12', { x: M, y: 0.82, w: gw(8), h: 1.0, font: F.SERIF, size: 27, lineSpacingMultiple: 0.98 });
    [['Industry', 'Industrial software'], ['Size', '2,300 employees'], ['Modules', 'Planning, Forecasting']].forEach(([k, v], i) => {
      const x = gx(9) + 0.2 + 0;
      t(s, k.toUpperCase(), { x, y: 0.82 + i * 0.4, w: 1.2, h: 0.2, size: 8, bold: true, charSpacing: 1.4, color: C.STONE });
      t(s, v, { x: x + 1.25, y: 0.8 + i * 0.4, w: SW - M - x - 1.25, h: 0.25, size: 10, bold: true });
    });
    const cols = [['Challenge', 'Finance consolidated 14 entities in spreadsheets. Month-end close took 12 days and forecasts were six weeks out of date.'], ['Approach', 'Halden connected the ERP and CRM in three weeks, automated consolidation and moved forecasting to a rolling weekly cycle.']];
    cols.forEach(([h1, d], i) => {
      const x = M + i * (gw(3) + 0.24 + 0.15), y = 2.25;
      numeral(s, x, y, i + 1, { size: 24 });
      t(s, h1, { x, y: y + 0.55, w: gw(3) + 0.1, h: 0.35, font: F.SERIF, size: 18 });
      t(s, d, { x, y: y + 1.0, w: gw(3) + 0.1, h: 2.2, size: 11, color: C.STONE, lineSpacingMultiple: 1.4 });
    });
    const rx = gx(6) + 0.3, rw = SW - rx;
    box(s, rx, 1.95, rw, SH - 1.95, { fill: C.COBALT });
    t(s, 'RESULTS AFTER SIX MONTHS', { x: rx + 0.5, y: 2.25, w: rw - 1, h: 0.2, size: 8, bold: true, charSpacing: 1.8, color: C.SKY });
    [['4 days', 'month-end close, from 12'], ['92%', 'forecast accuracy, from 71%'], ['$1.8M', 'working capital released']].forEach(([v, k], i) => {
      const y = 2.7 + i * 1.3;
      t(s, v, { x: rx + 0.5, y, w: 3.0, h: 0.8, size: 44, bold: true, color: i === 0 ? C.CORAL : C.WHITE });
      t(s, k, { x: rx + 3.6, y: y + 0.22, w: rw - 4.2, h: 0.5, size: 11.5, color: C.WHITE, lineSpacingMultiple: 1.2 });
      if (i < 2) rule(s, rx + 0.5, y + 1.08, rw - 1.1, { color: '4A63D6', lw: 1 });
    });
    t(s, '“We now spend the first week of the month deciding, not reconciling.”  — Group Finance Director', { x: M, y: 5.75, w: gw(6) - 0.2, h: 0.7, font: F.SERIF, italic: true, size: 13, color: C.INK, lineSpacingMultiple: 1.25 });
    s.addNotes('CASE STUDY. Editorial layout: challenge and approach on the left, a full-bleed cobalt results panel on the right. Client name is fictional; attribute quotes by role, not photo.');
  }

  // 58 Before vs after — clustered bars
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Before and after: every finance cycle got faster', { lead: 'Arcwell Systems, working days per cycle, six months before and after go-live.' });
    const met = ['Month-end close', 'Budget cycle', 'Forecast refresh', 'Board pack', 'Variance review'];
    const before = [12, 38, 30, 9, 6], after = [4, 14, 5, 3, 2];
    const x = M, w = gw(8);
    box(s, x, 1.95, w, 4.7, { fill: C.WHITE });
    legend(s, x + 0.3, 2.12, [['Before', C.MIST], ['After', C.CORAL]]);
    s.addChart(pres.charts.BAR, [{ name: 'Before', labels: met, values: before }, { name: 'After', labels: met, values: after }], cb({ x: x + 0.15, y: 2.45, w: w - 0.3, h: 4.1, extra: {
      barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [C.MIST, C.CORAL], barGapWidthPct: 60, barOverlapPct: -5, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0" d"',
      valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, catAxisLabelColor: C.INK, catAxisLabelFontSize: 10.5, valAxisMaxVal: 44 } }));
    const rx = gx(8) + 0.35, rw = SW - M - rx;
    met.forEach((m, i) => {
      const y = 2.0 + i * 0.92, red = Math.round((1 - after[i] / before[i]) * 100);
      rule(s, rx, y, rw, { color: C.RULE });
      t(s, m, { x: rx, y: y + 0.22, w: rw - 1.1, h: 0.3, size: 10.5 });
      chip(s, rx + rw - 1.0, y + 0.24, '−' + red + '%', { variant: i === 2 ? 'coral' : 'cobalt', w: 1.0 });
    });
    s.addNotes('BEFORE VS AFTER. Native clustered bar chart (before in neutral grey, after in coral) with reduction chips.');
  }

  // 59 Key takeaways — dark editorial
  {
    const s = pres.addSlide({ masterName: L.L.CO });
    header(s, SEC, 'Three things to remember', { dark: true });
    const tk = [['A record year', 'Revenue up 31% to $84.2M with operating margin at 18.6% — growth and profitability together.'], ['A clear plan', 'Four priorities and three horizons take us to $150M by 2028 with international scale.'], ['A decision today', 'Approve the 2027 investment plan: $14M for enterprise, EU expansion and AI planning.']];
    const cw = (SW - 2 * M - 2 * 0.4) / 3;
    tk.forEach(([h1, d], i) => {
      const x = M + i * (cw + 0.4), y = 2.3;
      t(s, String(i + 1).padStart(2, '0'), { x, y, w: 2, h: 1.3, font: F.SERIF, italic: true, size: 80, color: i === 2 ? C.CORAL : C.SKY });
      rule(s, x, y + 1.55, cw, { color: i === 2 ? C.CORAL : C.DEEP2, lw: 1.5 });
      t(s, h1, { x, y: y + 1.8, w: cw, h: 0.45, font: F.SERIF, size: 22, color: C.WHITE });
      t(s, d, { x, y: y + 2.35, w: cw, h: 1.2, size: 11.5, color: C.SKY, lineSpacingMultiple: 1.35 });
    });
    s.addNotes('KEY TAKEAWAYS. Three takeaways on deep cobalt; the decision you need is highlighted in coral.');
  }

  // 60 Closing — CTA
  {
    const s = pres.addSlide({ masterName: L.L.BCO });
    orbit(s, 10.4, 3.75, 2.6, { line: C.COBALT, sat: [[1, 200, 0.12, C.WHITE], [0.74, 20, 0.09, C.CORAL], [0.5, 120, 0.07, C.SKY], [1, 300, 0.06, C.SKY]] });
    t(s, 'VANTA', { x: M, y: 0.6, w: 2, h: 0.25, size: 10, bold: true, charSpacing: 4, color: C.WHITE });
    eyebrow(s, M, 2.0, 'Thank you', { dark: true });
    t(s, [{ text: 'Let’s build\nwhat comes\n', options: { color: C.WHITE } }, { text: 'next.', options: { color: C.CORAL, italic: true } }], { x: M, y: 2.35, w: 7, h: 2.7, font: F.SERIF, size: 54, lineSpacingMultiple: 0.95 });
    box(s, M, 5.4, 2.6, 0.55, { fill: C.CORAL, radius: 0.275 });
    t(s, 'Schedule a strategy session', { x: M, y: 5.4, w: 2.6, h: 0.55, size: 10.5, bold: true, color: C.WHITE, align: 'center', valign: 'middle' });
    [['EnvelopeSimple', 'hello@haldengroup.com'], ['Globe', 'www.haldengroup.com']].forEach(([ic, v], i) => {
      const x = M + 3.0 + i * 2.6;
      icon(s, ic, x, 5.55, 0.25, C.SKY);
      t(s, v, { x: x + 0.35, y: 5.52, w: 2.3, h: 0.3, size: 10.5, color: C.WHITE });
    });
    t(s, 'Halden Group · Business Presentation 2026', { x: M, y: 6.85, w: 5, h: 0.25, size: 9, color: C.SKYD });
    s.addNotes('CLOSING. Orbit artwork mirrors the cover. The CTA is a rounded rectangle — add a hyperlink via Insert › Link.');
  }
};
