// Case study
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, footnote } = L;
  const SEC = '12 · Case study';

  // Case study — challenge / approach / results
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'How Northwind Logistics cut forecast error from 22% to 4%');
    pill(s, SW - M - 3.3, 0.85, 'Logistics', { variant: 'off', w: 1.0 });
    pill(s, SW - M - 2.2, 0.85, '850 employees', { variant: 'off', w: 1.25 });
    pill(s, SW - M - 0.85, 0.85, 'EU', { variant: 'off', w: 0.85 });
    const cols = [
      ['PiWarning', 'Challenge', 'Forecasts were built in spreadsheets by 14 regional managers. The board saw a different number every week and missed two quarters in a row.', [['Forecast error', '22%'], ['Missed quarters', '2 in a row']]],
      ['PiPath', 'Approach', 'Corvanta connected CRM, email and calendar data in 9 days, introduced weekly AI-assisted forecast calls and coached managers on deal inspection.', [['Time to connect', '9 days'], ['Full rollout', '6 weeks']]],
    ];
    const cw = gw(4);
    cols.forEach(([ic, n, d, facts], i) => {
      const x = gx(i * 4), y = 2.05;
      card(s, x, y, cw, 4.55, { fill: C.OFF });
      badge(s, ic, x + 0.35, y + 0.35, 0.6, { bg: C.WHITE, fg: C.NAVY });
      t(s, String(i + 1).padStart(2, '0'), { x: x + cw - 1.0, y: y + 0.45, w: 0.65, h: 0.35, font: F.HEAD, bold: true, size: 12, color: C.SLATE, align: 'right' });
      t(s, n, { x: x + 0.35, y: y + 1.2, w: cw - 0.7, h: 0.45, font: F.HEAD, bold: true, size: 20, color: C.NAVY });
      t(s, d, { x: x + 0.35, y: y + 1.75, w: cw - 0.7, h: 1.5, size: 12, color: C.CHAR, lineSpacingMultiple: 1.35 });
      facts.forEach(([k, v], j) => {
        const fy = y + 3.45 + j * 0.5;
        line(s, x + 0.35, fy, cw - 0.7, 0, { color: C.MIST });
        t(s, k, { x: x + 0.35, y: fy + 0.08, w: 2, h: 0.34, size: 10.5, color: C.SLATE, valign: 'middle' });
        t(s, v, { x: x + cw - 2.05, y: fy + 0.08, w: 1.7, h: 0.34, font: F.HEAD, bold: true, size: 13, color: C.NAVY, align: 'right', valign: 'middle' });
      });
    });
    const x = gx(8), y = 2.05;
    card(s, x, y, cw, 4.55, { fill: C.NAVY });
    badge(s, 'PiTrendUp', x + 0.35, y + 0.35, 0.6, { bg: C.LIME, fg: C.NAVY });
    t(s, '03', { x: x + cw - 1.0, y: y + 0.45, w: 0.65, h: 0.35, font: F.HEAD, bold: true, size: 12, color: C.MIST, align: 'right' });
    t(s, 'Results', { x: x + 0.35, y: y + 1.2, w: cw - 0.7, h: 0.45, font: F.HEAD, bold: true, size: 20, color: C.WHITE });
    [['4%', 'forecast error, from 22%'], ['+31%', 'win rate in six months'], ['6 hrs', 'saved per manager per week']].forEach(([v, k], i) => {
      const yy = y + 1.8 + i * 0.88;
      t(s, v, { x: x + 0.35, y: yy, w: 1.6, h: 0.6, font: F.DISP, size: 28, color: C.LIME, valign: 'middle' });
      t(s, k, { x: x + 1.95, y: yy, w: cw - 2.25, h: 0.6, size: 11, color: C.WHITE, valign: 'middle' });
      if (i < 2) line(s, x + 0.35, yy + 0.74, cw - 0.7, 0, { color: C.NAVY2, lw: 1 });
    });
    s.addNotes('CASE STUDY. Challenge → Approach → Results. The results card is navy to carry the proof. Customer names are fictional placeholders.');
  }

  // Before / After — split
  {
    const s = pres.addSlide({ masterName: L.L.BWHITE });
    rect(s, 0, 0, SW / 2, SH, { fill: C.OFF, square: true });
    rect(s, SW / 2, 0, SW / 2, SH, { fill: C.NAVY, square: true });
    tag(s, M, 0.55, SEC + ' · Before / after');
    t(s, 'BEFORE', { x: M, y: 1.35, w: 3, h: 0.3, font: F.MED, size: 11, color: C.SLATE, charSpacing: 2 });
    t(s, 'Spreadsheets and guesswork', { x: M, y: 1.7, w: SW / 2 - 2 * M, h: 0.9, font: F.HEAD, bold: true, size: 26, color: C.NAVY });
    const ax = SW / 2 + M;
    pill(s, ax, 1.33, 'AFTER', { variant: 'lime', w: 0.95 });
    t(s, 'One forecast everyone trusts', { x: ax, y: 1.7, w: SW / 2 - 2 * M, h: 0.9, font: F.HEAD, bold: true, size: 26, color: C.WHITE });
    const rows = [['Forecast error', '22%', '4%'], ['Time to build forecast', '2 days', '20 min'], ['Deals slipping each quarter', '38%', '12%'], ['Manager hours on admin / week', '9 hrs', '3 hrs']];
    rows.forEach(([k, b, a], i) => {
      const y = 3.05 + i * 0.95;
      line(s, M, y, SW / 2 - 2 * M, 0, { color: C.MIST });
      line(s, ax, y, SW / 2 - 2 * M, 0, { color: C.NAVY2, lw: 1 });
      t(s, k, { x: M, y: y + 0.15, w: 3.5, h: 0.6, size: 12, color: C.CHAR, valign: 'middle' });
      t(s, b, { x: SW / 2 - M - 2, y: y + 0.12, w: 2, h: 0.65, font: F.DISP, size: 26, color: C.SLATE, align: 'right', valign: 'middle' });
      t(s, k, { x: ax, y: y + 0.15, w: 3.5, h: 0.6, size: 12, color: C.MIST, valign: 'middle' });
      t(s, a, { x: SW - M - 2, y: y + 0.12, w: 2, h: 0.65, font: F.DISP, size: 26, color: C.LIME, align: 'right', valign: 'middle' });
    });
    badge(s, 'PiArrowRight', SW / 2 - 0.35, 3.85, 0.7, { bg: C.LIME, fg: C.NAVY });
    t(s, 'Northwind Logistics, 6 months after go-live', { x: M, y: 6.85, w: 5, h: 0.25, size: 9, color: C.SLATE });
    s.addNotes('BEFORE / AFTER. Split layout: left = before (off-white), right = after (navy). Keep the same metric in the same row on both sides.');
  }

  // Metrics impact — before/after bar pairs + quote
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Measured impact across 40 customer deployments', { lead: 'Median change, 12 months after go-live, versus the customer’s own baseline.' });
    const m = [['Win rate', 22, 29, '+31%'], ['Forecast accuracy', 78, 96, '+18 pts'], ['Pipeline coverage', 2.4, 3.3, '+38%'], ['Ramp time, new reps (weeks)', 24, 15, '−38%']];
    const x = M, w = gw(7), y0 = 2.1;
    card(s, x, y0 - 0.05, w, 4.6, { fill: C.WHITE });
    rect(s, x + 0.35, y0 + 0.2, 0.3, 0.12, { fill: C.MIST, radius: 0.03 });
    t(s, 'Before', { x: x + 0.75, y: y0 + 0.14, w: 1, h: 0.25, size: 9.5, color: C.CHAR });
    rect(s, x + 1.65, y0 + 0.2, 0.3, 0.12, { fill: C.NAVY, radius: 0.03 });
    t(s, 'After', { x: x + 2.05, y: y0 + 0.14, w: 1, h: 0.25, size: 9.5, color: C.CHAR });
    m.forEach(([k, b, a, d], i) => {
      const y = y0 + 0.6 + i * 0.97, mx = Math.max(b, a) * 1.15, bw = w - 2.3;
      t(s, k, { x: x + 0.35, y, w: 3.5, h: 0.25, font: F.MED, size: 11, color: C.NAVY });
      pill(s, x + w - 1.35, y + 0.2, d, { variant: 'lime', w: 1.0, h: 0.3 });
      rect(s, x + 0.35, y + 0.33, bw * b / mx, 0.18, { fill: C.MIST, radius: 0.03 });
      rect(s, x + 0.35, y + 0.55, bw * a / mx, 0.18, { fill: C.NAVY, radius: 0.03 });
    });
    const rx = gx(7) + 0.3, rw = SW - M - rx;
    card(s, rx, 2.05, rw, 4.55, { fill: C.NAVY });
    icon(s, 'PiQuotes', rx + 0.4, 2.4, 0.6, C.LIME);
    t(s, 'For the first time, sales, finance and the board look at the same number — and believe it.', { x: rx + 0.4, y: 3.2, w: rw - 0.8, h: 2.0, font: F.HEAD, bold: true, size: 19, color: C.WHITE, lineSpacingMultiple: 1.2 });
    line(s, rx + 0.4, 5.55, 0.6, 0, { color: C.LIME, lw: 2 });
    t(s, 'Chief Revenue Officer', { x: rx + 0.4, y: 5.75, w: rw - 0.8, h: 0.28, font: F.MED, size: 11, color: C.WHITE });
    t(s, 'Northwind Logistics', { x: rx + 0.4, y: 6.03, w: rw - 0.8, h: 0.25, size: 10, color: C.MIST });
    s.addNotes('METRICS IMPACT. Paired bars (before in mist, after in navy) are shapes; bar length = value ÷ scale max. Quote card uses a role instead of a photo.');
  }
};
