// Data / KPI
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, footnote, chartBase } = L;
  const SEC = '08 · Performance';
  const MO = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const B = (c) => [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: c || C.MIST }, { type: 'none' }];

  // KPI dashboard
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'KPI dashboard: ahead of plan on growth, watching margin', { lead: 'Year to date, as of 30 September 2026.' });
    const k = [
      { label: 'ARR', value: '$48.6M', delta: '62%', note: 'YoY', icon: 'PiChartLineUp', variant: 'navy' },
      { label: 'Net revenue retention', value: '128%', delta: '6 pts', note: 'YoY', icon: 'PiArrowsClockwise', variant: 'white' },
      { label: 'Gross margin', value: '78%', delta: '2 pts', note: 'YoY', icon: 'PiPercent', variant: 'white', down: true },
      { label: 'Burn multiple', value: '0.9×', delta: '0.4×', note: 'better', icon: 'PiGauge', variant: 'white' },
    ];
    const kw = (SW - 2 * M - 3 * 0.25) / 4;
    k.forEach((o, i) => kpi(s, M + i * (kw + 0.25), 2.05, kw, 1.5, Object.assign({ valueSize: 28 }, o)));
    const x = M, w = gw(8), y = 3.8, h = 2.8;
    card(s, x, y, w, h, { fill: C.WHITE });
    t(s, 'ARR vs plan, $M', { x: x + 0.3, y: y + 0.2, w: 3, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    rect(s, x + w - 2.7, y + 0.33, 0.3, 0.04, { fill: C.NAVY, square: true });
    t(s, 'Actual', { x: x + w - 2.3, y: y + 0.22, w: 0.8, h: 0.25, size: 9.5, color: C.CHAR });
    rect(s, x + w - 1.4, y + 0.33, 0.3, 0.04, { fill: C.SLATE, square: true });
    t(s, 'Plan', { x: x + w - 1.0, y: y + 0.22, w: 0.8, h: 0.25, size: 9.5, color: C.CHAR });
    L.dashedLineChart(pres, s, [
      { name: 'Actual', labels: MO, values: [30.1, 31.8, 33.9, 35.0, 36.4, 38.3, 39.6, 41.2, 43.5, 45.0, 46.7, 48.6] },
      { name: 'Plan', labels: MO, values: [30.0, 31.2, 32.5, 33.8, 35.0, 36.3, 37.6, 38.9, 40.2, 41.6, 43.0, 44.5] },
    ], [C.NAVY, C.SLATE], ['solid', 'dash'], { lineSize: 2.25, lineDataSymbol: 'none' },
    chartBase({ x: x + 0.1, y: y + 0.55, w: w - 0.2, h: h - 0.65, extra: { valAxisMinVal: 25, valAxisMaxVal: 50, valAxisMajorUnit: 5, valAxisLabelFormatCode: '$0' } }));
    const rx = gx(8) + 0.25, rw = SW - M - rx;
    card(s, rx, y, rw, h, { fill: C.WHITE });
    t(s, 'Annual goals', { x: rx + 0.3, y: y + 0.2, w: rw - 0.6, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    [['New ARR', 81], ['New logos', 74], ['Expansion', 92], ['Hiring plan', 63]].forEach(([n, p], i) => {
      const yy = y + 0.7 + i * 0.5;
      t(s, n, { x: rx + 0.3, y: yy, w: 2, h: 0.22, size: 10, color: C.CHAR });
      t(s, p + '%', { x: rx + rw - 1.1, y: yy, w: 0.8, h: 0.22, font: F.MED, size: 10, color: C.NAVY, align: 'right' });
      rect(s, rx + 0.3, yy + 0.27, rw - 0.6, 0.09, { fill: C.OFF, radius: 0.045 });
      rect(s, rx + 0.3, yy + 0.27, (rw - 0.6) * p / 100, 0.09, { fill: p >= 75 ? C.NAVY : C.SLATE, radius: 0.045 });
    });
    s.addNotes('KPI DASHBOARD. Four headline KPI cards, a trend chart and goal progress bars. Progress bar width = track width × percentage.');
  }

  // Executive dashboard — dense
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Executive dashboard — Q3 2026');
    pill(s, SW - M - 2.4, 0.85, 'Overall status: on track', { variant: 'lime', w: 2.4 });
    const strip = [['Revenue', '$12.9M', '+58%'], ['Bookings', '$6.1M', '+18%'], ['Pipeline', '$31.4M', '+34%'], ['Win rate', '28%', '+3 pts'], ['NRR', '128%', '+6 pts'], ['Headcount', '320', '+41']];
    const sw = (SW - 2 * M) / strip.length;
    strip.forEach(([k, v, d], i) => {
      const x = M + i * sw;
      if (i > 0) line(s, x, 2.0, 0, 0.95, { color: C.MIST });
      const px = i === 0 ? x : x + 0.25;
      t(s, k, { x: px, y: 2.0, w: sw - 0.3, h: 0.22, size: 9.5, color: C.SLATE });
      t(s, v, { x: px, y: 2.22, w: sw - 0.3, h: 0.5, font: F.DISP, size: 22, color: C.NAVY });
      t(s, '▲ ' + d, { x: px, y: 2.72, w: sw - 0.3, h: 0.22, font: F.MED, size: 9.5, color: C.OLIVE });
    });
    const y = 3.25, h = 3.35;
    const w1 = gw(5), w2 = gw(3), w3 = gw(4);
    const x1 = M, x2 = gx(5), x3 = gx(8);
    card(s, x1, y, w1, h, { fill: C.OFF });
    t(s, 'Quarterly revenue, $M', { x: x1 + 0.25, y: y + 0.2, w: w1 - 0.5, h: 0.28, font: F.HEAD, bold: true, size: 12, color: C.NAVY });
    s.addChart(pres.charts.BAR, [{ name: 'Revenue', labels: ['Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'], values: [8.2, 9.6, 11.1, 12.9] }], chartBase({
      x: x1 + 0.1, y: y + 0.55, w: w1 - 0.2, h: h - 0.7, bg: C.OFF, extra: { barDir: 'col', chartColors: [C.MIST, C.MIST, C.MIST, C.NAVY], barGapWidthPct: 55, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0', valAxisHidden: true, valGridLine: { style: 'none' } },
    }));
    card(s, x2, y, w2, h, { fill: C.OFF });
    t(s, 'Revenue mix', { x: x2 + 0.25, y: y + 0.2, w: w2 - 0.5, h: 0.28, font: F.HEAD, bold: true, size: 12, color: C.NAVY });
    s.addChart(pres.charts.DOUGHNUT, [{ name: 'Mix', labels: ['Subscription', 'Services', 'Marketplace'], values: [81, 12, 7] }], chartBase({
      x: x2 + 0.15, y: y + 0.5, w: w2 - 0.3, h: 1.9, bg: C.OFF, extra: { holeSize: 65, chartColors: [C.NAVY, C.LIME, C.SLATE], showLegend: false, dataBorder: { pt: 1.5, color: C.OFF } },
    }));
    [['Subscription', '81%', C.NAVY], ['Services', '12%', C.LIME], ['Marketplace', '7%', C.SLATE]].forEach(([n, v, c], i) => {
      const yy = y + 2.5 + i * 0.26;
      rect(s, x2 + 0.25, yy + 0.05, 0.13, 0.13, { fill: c, radius: 0.02 });
      t(s, n, { x: x2 + 0.5, y: yy, w: 1.4, h: 0.22, size: 9.5, color: C.CHAR });
      t(s, v, { x: x2 + w2 - 0.9, y: yy, w: 0.65, h: 0.22, font: F.MED, size: 9.5, color: C.NAVY, align: 'right' });
    });
    card(s, x3, y, w3, h, { fill: C.OFF });
    t(s, 'Initiatives', { x: x3 + 0.25, y: y + 0.2, w: w3 - 0.5, h: 0.28, font: F.HEAD, bold: true, size: 12, color: C.NAVY });
    [['US expansion', 'On track'], ['Partner programme', 'On track'], ['Pricing refresh', 'Watch'], ['ERP migration', 'At risk'], ['AI call summaries', 'On track']].forEach(([n, st], i) => {
      const yy = y + 0.65 + i * 0.52;
      t(s, n, { x: x3 + 0.25, y: yy, w: w3 - 1.7, h: 0.36, size: 10.5, color: C.NAVY, valign: 'middle' });
      pill(s, x3 + w3 - 1.3, yy + 0.04, st, { variant: st === 'On track' ? 'lime' : (st === 'Watch' ? 'white' : 'navy'), w: 1.05, h: 0.28, size: 8.5 });
      if (i < 4) line(s, x3 + 0.25, yy + 0.45, w3 - 0.5, 0, { color: C.MIST });
    });
    s.addNotes('EXECUTIVE DASHBOARD. Dense one-page view: KPI strip, trend, mix and status. Status pills: lime = on track, white = watch, navy = at risk.');
  }

  // Monthly metrics — annotated area chart
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Monthly recurring revenue grew every month this year', { lead: 'MRR, $K. Annotations mark the events behind the step changes.' });
    const x = M, w = gw(9);
    const mrr = [2510, 2650, 2830, 2920, 3030, 3190, 3300, 3430, 3620, 3750, 3890, 4050];
    s.addChart(pres.charts.AREA, [{ name: 'MRR', labels: MO, values: mrr }], chartBase({
      x, y: 2.1, w, h: 4.5, extra: { chartColors: [C.NAVY], chartColorsOpacity: 90, valAxisMinVal: 0, valAxisMaxVal: 5000, valAxisMajorUnit: 1000, valAxisLabelFormatCode: '#,##0', catAxisLabelFontSize: 10 },
    }));
    // annotations (positioned over plot)
    const notes = [[2, 'Year-end enterprise deals'], [5, 'Price increase'], [8, 'Partner launch']];
    const plotX = x + 0.62, plotW = w - 0.75;
    notes.forEach(([idx, lbl]) => {
      const px = plotX + plotW * (idx + 0.5) / 12;
      const py = 2.1 + 0.15 + (4.5 - 0.55) * (1 - mrr[idx] / 5000);
      line(s, px, py - 0.75, 0, 0.62, { color: C.NAVY, lw: 0.75 });
      oval(s, px - 0.07, py - 0.13, 0.14, { fill: C.LIME, line: C.NAVY, lw: 1 });
      pill(s, px - 0.95, py - 1.08, lbl, { variant: 'white', w: 1.9, h: 0.3, size: 8.5 });
    });
    const rx = gx(9) + 0.3, rw = SW - M - rx;
    [['$4.05M', 'MRR in September', true], ['+61%', 'growth in 12 months'], ['4.4%', 'average monthly growth'], ['0 months', 'with negative growth']].forEach(([v, k, hi], i) => {
      const y = 2.1 + i * 1.15;
      if (i) line(s, rx, y - 0.1, rw, 0, { color: C.MIST });
      t(s, v, { x: rx, y, w: rw, h: 0.55, font: F.DISP, size: hi ? 28 : 22, color: C.NAVY });
      t(s, k, { x: rx, y: y + 0.55, w: rw, h: 0.3, size: 10.5, color: C.SLATE });
    });
    s.addNotes('MONTHLY METRICS. Annotation markers are shapes placed over the chart — move them if you change the data. Keep annotations to three or fewer.');
  }

  // Quarterly metrics — clustered columns + quarter cards
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Every quarter of 2026 outgrew the same quarter of 2025', { lead: 'Revenue by quarter, $M, with year-over-year growth.' });
    const x = M, w = SW - 2 * M;
    card(s, x, 2.05, w, 2.75, { fill: C.WHITE });
    s.addChart(pres.charts.BAR, [
      { name: '2025', labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [6.1, 6.8, 7.4, 8.2] },
      { name: '2026', labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [9.6, 11.1, 12.9, 14.2] },
    ], chartBase({ x: x + 0.2, y: 2.15, w: w - 0.4, h: 2.55, extra: {
      barDir: 'col', chartColors: [C.MIST, C.NAVY], barGapWidthPct: 110, barOverlapPct: -8, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0',
      valAxisHidden: true, valGridLine: { style: 'none' }, showLegend: true, legendPos: 'r', valAxisMaxVal: 16,
    } }));
    const q = [['Q1', '+57%', 'Strongest new-logo quarter on record.'], ['Q2', '+63%', 'Partner programme contributes first $1M.'], ['Q3', '+74%', 'US revenue passes $10M run-rate.'], ['Q4F', '+73%', 'Forecast includes $2.2M in commit.']];
    const cw = (w - 3 * 0.25) / 4;
    q.forEach(([n, g, d], i) => {
      const cx = x + i * (cw + 0.25), y = 5.05;
      card(s, cx, y, cw, 1.55, { fill: i === 2 ? C.NAVY : C.WHITE });
      t(s, n, { x: cx + 0.25, y: y + 0.2, w: 1, h: 0.3, font: F.HEAD, bold: true, size: 13, color: i === 2 ? C.WHITE : C.NAVY });
      t(s, g, { x: cx + cw - 1.45, y: y + 0.18, w: 1.2, h: 0.35, font: F.DISP, size: 16, color: i === 2 ? C.LIME : C.OLIVE, align: 'right' });
      t(s, d, { x: cx + 0.25, y: y + 0.7, w: cw - 0.5, h: 0.65, size: 10.5, color: i === 2 ? C.MIST : C.SLATE, lineSpacingMultiple: 1.2 });
    });
    s.addNotes('QUARTERLY METRICS. Clustered columns compare years; the cards underneath explain each quarter. Highlight the quarter you are reporting on in navy.');
  }

  // Annual metrics — dark, typographic
  {
    const s = pres.addSlide({ masterName: L.L.DARK });
    header(s, SEC, 'Three years of compounding growth', { dark: true });
    const yrs = ['2024', '2025', '2026'];
    const rows = [['ARR', ['$18.4M', '$30.0M', '$48.6M']], ['Customers', ['560', '930', '1,240']], ['Net revenue retention', ['114%', '122%', '128%']], ['Employees', ['140', '230', '320']]];
    const lx = M, lw = 3.2, cw = (SW - 2 * M - lw) / 3, y0 = 2.1;
    yrs.forEach((yr, j) => {
      const x = lx + lw + j * cw;
      if (j === 2) rect(s, x, y0 - 0.1, cw, 4.6, { fill: C.NAVY2, radius: 0.1 });
      t(s, yr, { x: x + 0.3, y: y0, w: cw - 0.6, h: 0.45, font: F.HEAD, bold: true, size: 16, color: j === 2 ? C.LIME : C.MIST });
    });
    rows.forEach(([k, vals], i) => {
      const y = y0 + 0.7 + i * 0.95;
      line(s, lx, y, lw + 2 * cw, 0, { color: C.NAVY2, lw: 1 });
      t(s, k, { x: lx, y, w: lw, h: 0.95, size: 12, color: C.MIST, valign: 'middle' });
      vals.forEach((v, j) => {
        const x = lx + lw + j * cw;
        t(s, v, { x: x + 0.3, y, w: cw - 0.6, h: 0.95, font: F.DISP, size: j === 2 ? 30 : 24, color: j === 2 ? C.WHITE : C.MIST, valign: 'middle' });
      });
    });
    s.addNotes('ANNUAL METRICS. A typographic year-over-year comparison — the current year sits on a raised navy panel.');
  }

  // KPI scorecard — native table
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Scorecard: 7 of 9 KPIs on or above target', { lead: 'Status: ● on track  ◐ watch  ○ off track.' });
    const hdr = ['Metric', 'Owner', 'Q3 actual', 'Q3 target', 'vs target', 'Trend', 'Status'];
    const data = [
      ['New ARR', 'CRO', '$6.1M', '$5.4M', '+13%', '▲', '●'],
      ['Net revenue retention', 'CCO', '128%', '125%', '+3 pts', '▲', '●'],
      ['Gross churn', 'CCO', '5.8%', '6.0%', '−0.2 pts', '▼', '●'],
      ['Win rate', 'CRO', '28%', '27%', '+1 pt', '▲', '●'],
      ['Sales cycle (days)', 'CRO', '52', '55', '−3 days', '▼', '●'],
      ['Pipeline coverage', 'CMO', '3.2×', '3.0×', '+0.2×', '▲', '●'],
      ['CAC payback (months)', 'CFO', '11', '10', '+1 mo', '▲', '◐'],
      ['Gross margin', 'CFO', '78%', '80%', '−2 pts', '▼', '◐'],
      ['Employee NPS', 'CPO', '31', '40', '−9', '▼', '○'],
    ];
    const head = hdr.map((h, i) => ({ text: h.toUpperCase(), options: { bold: false, fontFace: F.MED, fontSize: 9, color: C.WHITE, fill: { color: C.NAVY }, align: i < 2 ? 'left' : (i >= 5 ? 'center' : 'right'), valign: 'middle', charSpacing: 1 } }));
    const body = data.map((r, ri) => r.map((c, i) => ({
      text: c, options: {
        fontFace: i === 0 ? F.MED : (i === 2 ? F.HEAD : F.BODY), bold: i === 2, fontSize: 11, color: i === 6 ? (c === '●' ? C.NAVY : C.SLATE) : (i === 4 ? (c.startsWith('+') === (ri !== 2 && ri !== 4 && ri !== 6) || ri === 2 || ri === 4 ? C.OLIVE : C.SLATE) : C.NAVY),
        align: i < 2 ? 'left' : (i >= 5 ? 'center' : 'right'), valign: 'middle', fill: { color: ri % 2 ? C.OFF : C.WHITE }, border: B(),
      },
    })));
    // correct vs-target colour: olive when favourable
    const fav = [true, true, true, true, true, true, false, false, false];
    body.forEach((r, ri) => { r[4].options.color = fav[ri] ? C.OLIVE : C.SLATE; r[4].options.fontFace = F.MED; });
    s.addTable([head, ...body], { x: M, y: 2.05, w: SW - 2 * M, colW: [3.4, 1.2, 1.55, 1.55, 1.6, 1.3, 1.533], rowH: 0.44, margin: [0, 0.15, 0, 0.15], fontFace: F.BODY });
    s.addNotes('KPI SCORECARD. Native PowerPoint table — use Table Design to change styles. Status symbols: ● on track, ◐ watch, ○ off track. Olive text marks a favourable variance.');
  }
};
