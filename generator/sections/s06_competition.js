// Competition
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, footnote, chartBase } = L;
  const SEC = '05 · Competition';

  // Positioning matrix — 2x2 with bubbles
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'We are the only player that is both predictive and easy to adopt');
    const x = M + 0.4, y = 2.05, w = gw(8) - 0.4, h = 4.3;
    rect(s, x, y, w / 2, h / 2, { fill: C.OFF, square: true });
    rect(s, x + w / 2, y, w / 2, h / 2, { fill: C.NAVY, square: true });
    rect(s, x, y + h / 2, w / 2, h / 2, { fill: C.WHITE, line: C.MIST, square: true });
    rect(s, x + w / 2, y + h / 2, w / 2, h / 2, { fill: C.OFF, square: true });
    t(s, 'Leaders', { x: x + w / 2 + 0.2, y: y + 0.15, w: 2, h: 0.25, font: F.MED, size: 9.5, color: C.LIME, charSpacing: 1 });
    t(s, 'Powerful but heavy', { x: x + 0.2, y: y + 0.15, w: 2.5, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE });
    t(s, 'Basic reporting', { x: x + 0.2, y: y + h - 0.4, w: 2.5, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE });
    t(s, 'Simple but shallow', { x: x + w / 2 + 0.2, y: y + h - 0.4, w: 2.5, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE });
    // axes labels
    t(s, 'Ease of adoption →', { x, y: y + h + 0.08, w, h: 0.25, font: F.MED, size: 9.5, color: C.CHAR, align: 'center' });
    t(s, 'Predictive depth →', { x: x - 2.4 + 0.12 - 0.05, y: y + h / 2 - 0.12, w: 4.3, h: 0.25, font: F.MED, size: 9.5, color: C.CHAR, align: 'center', rotate: 270 });
    const pts = [['Corvanta', 0.8, 0.22, 0.75, 'us'], ['Competitor A', 0.28, 0.2, 0.62], ['Competitor B', 0.62, 0.62, 0.5], ['Competitor C', 0.22, 0.7, 0.42], ['Competitor D', 0.16, 0.44, 0.36]];
    pts.forEach(([n, px, py, d, us]) => {
      const cx = x + px * w - d / 2, cy = y + py * h - d / 2;
      const inNavy = px > 0.5 && py < 0.5;
      oval(s, cx, cy, d, { fill: us ? C.LIME : (inNavy ? C.STEEL : C.MIST), line: us ? C.WHITE : undefined, lw: 2 });
      t(s, n, { x: cx + d + 0.08, y: cy + d / 2 - 0.13, w: 1.6, h: 0.26, font: us ? F.HEAD : F.MED, bold: !!us, size: us ? 11 : 9.5, color: inNavy ? C.WHITE : C.NAVY, valign: 'middle' });
    });
    const rx = gx(8) + 0.2, rw = SW - M - rx;
    t(s, 'What this means', { x: rx, y: 2.05, w: rw, h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
    [['Defensible position', 'Competitors need 18+ months to match both axes.'], ['Adoption wins deals', '71% of wins cite setup speed as a deciding factor.'], ['Watch Competitor B', 'Moving up-market with an AI acquisition in 2026.']].forEach(([h1, d], i) => {
      const yy = 2.55 + i * 1.3;
      stepNumSafe(s, rx, yy, i + 1);
      t(s, h1, { x: rx + 0.5, y: yy, w: rw - 0.5, h: 0.3, font: F.HEAD, bold: true, size: 12.5, color: C.NAVY });
      t(s, d, { x: rx + 0.5, y: yy + 0.32, w: rw - 0.5, h: 0.7, size: 10.5, color: C.SLATE, lineSpacingMultiple: 1.2 });
    });
    t(s, 'Bubble size = estimated ARR', { x: rx, y: 6.3, w: rw, h: 0.25, size: 9, color: C.SLATE });
    s.addNotes('POSITIONING MATRIX. Move bubbles to position competitors; resize to reflect revenue or market share. Quadrant labels are editable text boxes.');
  }
  function stepNumSafe(s, x, y, n) {
    oval(s, x, y, 0.32, { fill: C.NAVY });
    t(s, String(n), { x, y, w: 0.32, h: 0.32, font: F.HEAD, bold: true, size: 10, color: C.LIME, align: 'center', valign: 'middle' });
  }

  // Competitor comparison — Harvey balls
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Head-to-head: where we win and where we must improve', { lead: 'Scored by our win/loss team from 214 competitive deals in the last 12 months.' });
    const crit = ['Forecast accuracy', 'Time to value', 'AI deal scoring', 'Ease of use', 'Integrations', 'Enterprise controls', 'Price / value'];
    const players = ['Corvanta', 'Competitor A', 'Competitor B', 'Competitor C'];
    const sc = [[4, 4, 4, 4, 3, 3, 4], [3, 1, 2, 2, 4, 4, 2], [2, 3, 3, 3, 3, 2, 3], [1, 4, 0, 4, 2, 1, 4]];
    const x0 = M, lw = 3.1, cw = (SW - 2 * M - lw) / players.length, y0 = 2.05, rh = 0.5;
    rect(s, x0 + lw, y0 - 0.05, cw, 0.6 + crit.length * rh + 0.1, { fill: C.NAVY, radius: 0.1 });
    players.forEach((p, j) => t(s, p, { x: x0 + lw + j * cw, y: y0, w: cw, h: 0.5, font: F.HEAD, bold: true, size: 12, color: j === 0 ? C.WHITE : C.NAVY, align: 'center', valign: 'middle' }));
    crit.forEach((c, i) => {
      const y = y0 + 0.6 + i * rh;
      line(s, x0, y, lw, 0, { color: C.MIST });
      line(s, x0 + lw + cw, y, SW - M - (x0 + lw + cw), 0, { color: C.MIST });
      t(s, c, { x: x0, y, w: lw, h: rh, size: 11.5, color: C.NAVY, valign: 'middle' });
      sc.forEach((row, j) => {
        const v = row[i], d = 0.3, cx = x0 + lw + j * cw + cw / 2 - d / 2, cy = y + rh / 2 - d / 2;
        const us = j === 0;
        oval(s, cx, cy, d, { fill: us ? C.NAVY2 : C.WHITE, line: us ? C.LIME : C.NAVY, lw: 1 });
        if (v === 4) oval(s, cx, cy, d, { fill: us ? C.LIME : C.NAVY });
        else if (v > 0) L.pie(s, cx, cy, d, 270, (270 + v * 90) % 360, us ? C.LIME : C.NAVY);
      });
    });
    const ly = 6.5;
    ['None', 'Basic', 'Partial', 'Strong', 'Best in class'].forEach((lbl, v) => {
      const lx = M + v * 1.45, d = 0.2;
      oval(s, lx, ly, d, { fill: C.WHITE, line: C.NAVY, lw: 1 });
      if (v === 4) oval(s, lx, ly, d, { fill: C.NAVY }); else if (v > 0) L.pie(s, lx, ly, d, 270, (270 + v * 90) % 360, C.NAVY);
      t(s, lbl, { x: lx + 0.3, y: ly - 0.02, w: 1.1, h: 0.24, size: 9, color: C.SLATE, valign: 'middle' });
    });
    s.addNotes('COMPETITOR COMPARISON. Harvey balls are pie shapes: set the pie angle (yellow handle) to 90° steps for 25/50/75%. Full = circle, empty = outline only.');
  }

  // Radar positioning (native radar chart)
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Our profile is broader than the category average', { lead: 'Capability score, 1–10, versus the average of the top four competitors.' });
    const x = M, w = gw(7);
    card(s, x, 2.05, w, 4.55, { fill: C.WHITE });
    const dims = ['Forecasting', 'Pipeline AI', 'Usability', 'Integrations', 'Security', 'Analytics'];
    s.addChart(pres.charts.RADAR, [
      { name: 'Corvanta', labels: dims, values: [9.2, 8.8, 8.5, 7.6, 8.0, 7.1] },
      { name: 'Category average', labels: dims, values: [6.4, 5.2, 6.8, 7.2, 7.5, 6.9] },
    ], chartBase({ x: x + 0.2, y: 2.15, w: w - 0.4, h: 4.35, extra: {
      radarStyle: 'marker', chartColors: [C.NAVY, C.SLATE], lineSize: 2, lineDataSymbolSize: 6, showLegend: true, legendPos: 'b',
      valAxisHidden: true, valAxisMaxVal: 10, valAxisMinVal: 0, valAxisMajorUnit: 2, catAxisLabelColor: C.NAVY, catAxisLabelFontSize: 10,
    } }));
    const rx = gx(7) + 0.3, rw = SW - M - rx;
    [['+2.8', 'Forecasting', 'Largest lead — our core differentiator.', true], ['+3.6', 'Pipeline AI', 'Only vendor with deal-level explanations.', true], ['−0.4', 'Integrations', 'Close the gap with the partner marketplace.', false]].forEach(([v, k, d, pos], i) => {
      const y = 2.05 + i * 1.55;
      card(s, rx, y, rw, 1.4, { fill: pos && i === 1 ? C.LIME : C.WHITE });
      t(s, v, { x: rx + 0.3, y: y + 0.2, w: 1.4, h: 0.6, font: F.DISP, size: 28, color: C.NAVY });
      t(s, k, { x: rx + 1.75, y: y + 0.25, w: rw - 2, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
      t(s, d, { x: rx + 1.75, y: y + 0.58, w: rw - 2, h: 0.6, size: 10.5, color: pos && i === 1 ? C.NAVY : C.SLATE, lineSpacingMultiple: 1.2 });
    });
    s.addNotes('RADAR POSITIONING. Native radar chart — Edit Data to change dimensions or add a competitor series.');
  }
};
