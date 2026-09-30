// Problem / Solution
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, footnote, chartBase } = L;
  const SEC = '02 · Problem & solution';

  // Problem statement — typographic
  {
    const s = pres.addSlide({ masterName: L.L.BLANK });
    tag(s, M, 0.48, SEC + ' · The problem');
    t(s, '1 in 3', { x: M - 0.05, y: 1.2, w: gw(5), h: 1.9, font: F.DISP, size: 110, color: C.NAVY });
    rect(s, M, 3.2, 1.2, 0.14, { fill: C.LIME, square: true });
    t(s, 'qualified B2B deals is lost to poor data, not to a competitor.', { x: gx(5) + 0.2, y: 1.55, w: gw(7) - 0.2, h: 1.6, font: F.HEAD, bold: true, size: 32, color: C.NAVY, lineSpacingMultiple: 1.05 });
    const ev = [
      ['68%', 'of sales leaders do not trust their CRM forecast'],
      ['11 hrs', 'per rep, per week, spent on manual data entry'],
      ['$2.1M', 'average annual revenue leakage for a 100-seat team'],
    ];
    ev.forEach(([v, d], i) => {
      const x = gx(i * 4), y = 4.4;
      line(s, x, y, gw(4), 0, { color: C.NAVY, lw: 1.5 });
      t(s, v, { x, y: y + 0.3, w: gw(4), h: 0.75, font: F.DISP, size: 40, color: C.NAVY });
      t(s, d, { x, y: y + 1.1, w: gw(3.5), h: 0.6, size: 12, color: C.SLATE, lineSpacingMultiple: 1.2 });
    });
    footnote(s, 'Source: Corvanta State of Revenue Operations survey, n = 1,050 sales leaders, 2026.');
    s.addNotes('PROBLEM STATEMENT. One oversized statistic, one sentence, three proof points. Keep the statement under 15 words.');
  }

  // Pain points
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Four pain points drain revenue teams', { lead: 'Ranked by annual cost per 100 sellers. Severity reflects frequency × impact from customer interviews.' });
    const pp = [
      ['PiWarning', 'Unreliable forecasts', 'Leaders commit numbers they cannot defend to the board.', 5, '$780K'],
      ['PiClock', 'Manual admin', 'Reps update five systems before they can sell.', 4, '$620K'],
      ['PiEye', 'Hidden deal risk', 'Slipping deals surface in the last week of the quarter.', 4, '$510K'],
      ['PiPuzzlePiece', 'Tool sprawl', 'An average of 11 disconnected tools per sales team.', 3, '$190K'],
    ];
    const cw = gw(3), y = 2.2, h = 4.3;
    pp.forEach(([ic, hd, d, sev, cost], i) => {
      const x = gx(i * 3);
      const top = i === 0;
      card(s, x, y, cw, h, { fill: top ? C.NAVY : C.OFF });
      t(s, String(i + 1).padStart(2, '0'), { x: x + 0.3, y: y + 0.3, w: 1, h: 0.3, font: F.HEAD, bold: true, size: 12, color: top ? C.LIME : C.SLATE });
      badge(s, ic, x + cw - 0.85, y + 0.25, 0.55, { bg: top ? C.LIME : C.WHITE, fg: C.NAVY });
      t(s, hd, { x: x + 0.3, y: y + 1.15, w: cw - 0.6, h: 0.7, font: F.HEAD, bold: true, size: 17, color: top ? C.WHITE : C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.85, w: cw - 0.6, h: 0.8, size: 11, color: top ? C.MIST : C.SLATE, lineSpacingMultiple: 1.2 });
      t(s, 'Severity', { x: x + 0.3, y: y + 2.85, w: 1.5, h: 0.22, size: 9, color: top ? C.MIST : C.SLATE });
      for (let k = 0; k < 5; k++) rect(s, x + 0.3 + k * 0.42, y + 3.12, 0.36, 0.08, { fill: k < sev ? (top ? C.LIME : C.NAVY) : (top ? C.NAVY2 : C.MIST), radius: 0.02 });
      t(s, cost, { x: x + 0.3, y: y + 3.4, w: cw - 0.6, h: 0.5, font: F.DISP, size: 24, color: top ? C.WHITE : C.NAVY });
      t(s, 'annual cost / 100 sellers', { x: x + 0.3, y: y + 3.85, w: cw - 0.6, h: 0.22, size: 9, color: top ? C.MIST : C.SLATE });
    });
    s.addNotes('PAIN POINTS. The navy card marks the most severe pain. Severity bars: recolour segments to show 1–5.');
  }

  // Problem -> Solution mapping
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'From friction to flow: what changes with Corvanta');
    const rows = [
      ['Forecasts built on gut feel and spreadsheets', 'AI forecast with confidence ranges, updated hourly'],
      ['Deal risk discovered at quarter end', 'Risk alerts three weeks earlier, with next best action'],
      ['Reps log activity in five tools', 'Activity captured automatically from email and calendar'],
      ['Managers coach from anecdotes', 'Coaching based on win-pattern data per rep'],
    ];
    const lx = gx(0), lw = gw(5), rx = gx(7), rw = gw(5), y0 = 2.35, rh = 0.9, gap = 0.15;
    t(s, 'TODAY', { x: lx, y: 2.0, w: 3, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5 });
    t(s, 'WITH CORVANTA', { x: rx, y: 2.0, w: 3, h: 0.25, font: F.MED, size: 9.5, color: C.NAVY, charSpacing: 1.5 });
    rows.forEach(([a, b], i) => {
      const y = y0 + i * (rh + gap);
      card(s, lx, y, lw, rh, { fill: C.OFF });
      icon(s, 'PiX', lx + 0.3, y + rh / 2 - 0.12, 0.24, C.SLATE);
      t(s, a, { x: lx + 0.75, y, w: lw - 1, h: rh, size: 12, color: C.CHAR, valign: 'middle' });
      badge(s, 'PiArrowRight', gx(5) + (gw(2) + 0.5) / 2 - 0.5, y + rh / 2 - 0.25, 0.5, { bg: C.WHITE, fg: C.NAVY, line: C.MIST });
      card(s, rx, y, rw, rh, { fill: C.NAVY });
      badge(s, 'PiCheck', rx + 0.25, y + rh / 2 - 0.17, 0.34, { bg: C.LIME, fg: C.NAVY, scale: 0.6 });
      t(s, b, { x: rx + 0.75, y, w: rw - 1, h: rh, font: F.MED, size: 12, color: C.WHITE, valign: 'middle' });
    });
    s.addNotes('PROBLEM → SOLUTION. Each row maps one problem to its fix. Add or remove rows by duplicating a row group.');
  }

  // Solution — three engines
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Our solution: capture, predict and act in one loop', { lead: 'Each engine works on its own; together they compound — customers using all three see 2.3× the win-rate lift.' });
    const st = [
      ['PiDatabase', 'Capture', 'Every email, meeting and call is logged automatically and matched to the right deal.', 'Zero manual entry'],
      ['PiCpu', 'Predict', 'Models score each deal and roll up a forecast with a confidence range.', '96% forecast accuracy'],
      ['PiRocketLaunch', 'Act', 'Reps and managers get the next best action inside the tools they already use.', '+29% win rate'],
    ];
    const cw = gw(4), y = 2.2, h = 4.3;
    st.forEach(([ic, h1, d, out], i) => {
      const x = gx(i * 4);
      card(s, x, y, cw, h, { fill: C.WHITE });
      t(s, String(i + 1).padStart(2, '0'), { x: x + 0.35, y: y + 0.35, w: 1, h: 0.6, font: F.DISP, size: 30, color: C.MIST });
      badge(s, ic, x + cw - 1.0, y + 0.35, 0.65, { bg: C.NAVY, fg: C.LIME });
      t(s, h1, { x: x + 0.35, y: y + 1.35, w: cw - 0.7, h: 0.5, font: F.HEAD, bold: true, size: 24, color: C.NAVY });
      t(s, d, { x: x + 0.35, y: y + 1.95, w: cw - 0.7, h: 1.0, size: 12, color: C.SLATE, lineSpacingMultiple: 1.25 });
      line(s, x + 0.35, y + 3.3, cw - 0.7, 0, { color: C.MIST });
      t(s, 'OUTCOME', { x: x + 0.35, y: y + 3.5, w: 2, h: 0.22, font: F.MED, size: 8.5, color: C.SLATE, charSpacing: 1.5 });
      t(s, out, { x: x + 0.35, y: y + 3.72, w: cw - 0.7, h: 0.35, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      if (i < 2) badge(s, 'PiArrowRight', x + cw - 0.075, y + 0.47, 0.4, { bg: C.LIME, fg: C.NAVY });
    });
    s.addNotes('SOLUTION. Three-step engine. The lime arrow badges overlap the card gaps on purpose to show the flow.');
  }

  // Opportunity — dark with chart
  {
    const s = pres.addSlide({ masterName: L.L.DARK });
    header(s, SEC, 'A $12.4B opportunity hiding in manual work', { dark: true });
    t(s, '$12.4B', { x: M, y: 2.3, w: gw(5), h: 1.3, font: F.DISP, size: 72, color: C.LIME });
    t(s, 'Annual spend on revenue operations tooling by 2028 — growing 24% a year as companies replace spreadsheets.', { x: M, y: 3.7, w: gw(4), h: 1.1, size: 13, color: C.MIST, lineSpacingMultiple: 1.3 });
    [['24%', 'CAGR 2023–2028'], ['3.1×', 'spend increase in five years']].forEach(([v, k], i) => {
      const x = M + i * 2.4;
      t(s, v, { x, y: 5.2, w: 2.2, h: 0.55, font: F.DISP, size: 28, color: C.WHITE });
      t(s, k, { x, y: 5.78, w: 2.2, h: 0.4, size: 10, color: C.MIST });
    });
    const x = gx(6), w = gw(6);
    card(s, x, 2.1, w, 4.5, { fill: C.NAVY2 });
    t(s, 'RevOps tooling spend, $B', { x: x + 0.35, y: 2.35, w: 4, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.WHITE });
    t(s, 'Forecast from 2026', { x: x + w - 2.35, y: 2.37, w: 2, h: 0.3, size: 9.5, color: C.MIST, align: 'right' });
    s.addChart(pres.charts.BAR, [{ name: 'Spend', labels: ['2023', '2024', '2025', '2026', '2027', '2028'], values: [4.0, 5.1, 6.3, 7.9, 9.9, 12.4] }], chartBase({
      x: x + 0.2, y: 2.8, w: w - 0.4, h: 3.6, dark: true, bg: C.NAVY2, extra: {
        barDir: 'col', chartColors: [C.STEEL, C.STEEL, C.STEEL, C.LIME, C.LIME, C.LIME], barGapWidthPct: 45,
        showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0', valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineColor: C.GRIDD,
      },
    }));
    s.addNotes('OPPORTUNITY. Native column chart — right-click › Edit Data. Lime bars mark forecast years; recolour individual bars via Format Data Point.');
  }

  // Value proposition
  {
    const s = pres.addSlide({ masterName: L.L.BLANK });
    tag(s, M, 0.48, SEC + ' · Value proposition');
    t(s, 'Forecast with confidence.\nSell with focus.', { x: M, y: 1.0, w: gw(8), h: 1.6, font: F.HEAD, bold: true, size: 40, color: C.NAVY, lineSpacingMultiple: 1.0 });
    t(s, 'For revenue leaders at growing B2B companies who need to hit their number, Corvanta is the revenue platform that turns activity data into decisions — unlike CRM add-ons that only report what already happened.', { x: M, y: 2.8, w: gw(8), h: 1.0, size: 13, color: C.SLATE, lineSpacingMultiple: 1.3 });
    const vp = [
      ['+29%', 'win rate', 'Reps focus on deals that can close.', 'PiTarget'],
      ['−40%', 'admin time', 'Automatic capture replaces manual logging.', 'PiClock'],
      ['96%', 'forecast accuracy', 'Board-ready numbers from week one.', 'PiChartLineUp'],
      ['4.8×', 'return on investment', 'Payback in under five months.', 'PiCoins'],
    ];
    vp.forEach(([v, k, d, ic], i) => {
      const x = gx(i * 3), y = 4.25, cw = gw(3);
      card(s, x, y, cw, 2.3, { fill: i === 0 ? C.LIME : C.OFF });
      icon(s, ic, x + cw - 0.6, y + 0.3, 0.3, C.NAVY);
      t(s, v, { x: x + 0.3, y: y + 0.3, w: cw - 1, h: 0.75, font: F.DISP, size: 38, color: C.NAVY });
      t(s, k, { x: x + 0.3, y: y + 1.08, w: cw - 0.6, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.45, w: cw - 0.6, h: 0.6, size: 10.5, color: i === 0 ? C.NAVY : C.SLATE, lineSpacingMultiple: 1.2 });
    });
    const u = 0.75, x0 = SW - M - 3 * u;
    L.tiles(s, x0, 1.1, u, [[0, 0, 'q', C.LIME, 2], [1, 0, 'sq', C.NAVY], [1, 0, 'dot', C.LIME], [2, 0, 'circ', C.OFF], [1, 1, 'q', C.NAVY, 0], [2, 1, 'sq', C.LIME], [2, 1, 'semi', C.NAVY, 3], [2, 2, 'q', C.OFF, 1]]);
    s.addNotes('VALUE PROPOSITION. Positioning statement follows the classic "For [target] who [need], [product] is the [category] that [benefit] — unlike [alternative]" template.');
  }
};
