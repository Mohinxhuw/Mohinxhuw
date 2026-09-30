// Comparison + tables
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, footnote } = L;
  const SEC = '13 · Comparison';
  const B = (c) => [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: c || C.MIST }, { type: 'none' }];

  // Two-column comparison
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Build in-house or buy a platform?', { lead: 'Recommendation: buy. Building costs 3.2× more over three years and delays value by 14 months.' });
    const cw = (SW - 2 * M - 1.0) / 2, y = 2.05, h = 4.55;
    const sides = [
      ['Option A', 'Build in-house', ['Full control of roadmap', 'Uses existing data team'], ['$4.1M over 3 years', '14 months to first forecast', 'Ongoing maintenance burden'], false],
      ['Option B', 'Buy Corvanta', ['Live in 30 days', 'Proven 96% accuracy', '$1.3M over 3 years'], ['Less roadmap control'], true],
    ];
    sides.forEach(([o, n, pros, cons, rec], i) => {
      const x = M + i * (cw + 1.0);
      card(s, x, y, cw, h, { fill: rec ? C.NAVY : C.OFF });
      t(s, o.toUpperCase(), { x: x + 0.35, y: y + 0.3, w: 2, h: 0.25, font: F.MED, size: 9.5, color: rec ? C.MIST : C.SLATE, charSpacing: 1.5 });
      if (rec) pill(s, x + cw - 1.75, y + 0.28, 'Recommended', { variant: 'lime', w: 1.4 });
      t(s, n, { x: x + 0.35, y: y + 0.6, w: cw - 0.7, h: 0.5, font: F.HEAD, bold: true, size: 22, color: rec ? C.WHITE : C.NAVY });
      t(s, 'Advantages', { x: x + 0.35, y: y + 1.35, w: 2, h: 0.25, font: F.MED, size: 10, color: rec ? C.LIME : C.OLIVE });
      pros.forEach((p, k) => {
        icon(s, 'PiCheckCircle', x + 0.35, y + 1.72 + k * 0.4, 0.24, rec ? C.LIME : C.NAVY);
        t(s, p, { x: x + 0.72, y: y + 1.7 + k * 0.4, w: cw - 1, h: 0.3, size: 11.5, color: rec ? C.WHITE : C.CHAR });
      });
      t(s, 'Trade-offs', { x: x + 0.35, y: y + 3.0, w: 2, h: 0.25, font: F.MED, size: 10, color: rec ? C.MIST : C.SLATE });
      cons.forEach((p, k) => {
        icon(s, 'PiMinus', x + 0.35, y + 3.37 + k * 0.4, 0.24, rec ? C.MIST : C.SLATE);
        t(s, p, { x: x + 0.72, y: y + 3.35 + k * 0.4, w: cw - 1, h: 0.3, size: 11.5, color: rec ? C.MIST : C.CHAR });
      });
    });
    oval(s, SW / 2 - 0.42, y + h / 2 - 0.42, 0.84, { fill: C.WHITE, line: C.MIST, lw: 1 });
    t(s, 'VS', { x: SW / 2 - 0.42, y: y + h / 2 - 0.42, w: 0.84, h: 0.84, font: F.DISP, size: 16, color: C.NAVY, align: 'center', valign: 'middle' });
    s.addNotes('TWO-COLUMN COMPARISON. The recommended option is navy with a lime pill; the VS badge sits on the gutter.');
  }

  // Three-column comparison — options with ratings
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Three ways to enter the French market', { lead: 'Scored 1–5 on speed, cost, control and risk (5 = best).' });
    const opts = [
      ['PiBuildings', 'Direct entry', 'Open a Paris office with a local sales team.', [2, 2, 5, 3], '$3.2M', '9 months', false],
      ['PiHandshake', 'Partner-led', 'Sell through two established CRM resellers.', [5, 4, 3, 4], '$0.9M', '3 months', true],
      ['PiArrowsSplit', 'Acquisition', 'Buy a local competitor with 120 customers.', [4, 1, 4, 2], '$11M', '6 months', false],
    ];
    const crit = ['Speed', 'Cost', 'Control', 'Risk'];
    const cw = gw(4);
    opts.forEach(([ic, n, d, sc, cost, time, rec], i) => {
      const x = gx(i * 4), y = 2.05;
      card(s, x, y, cw, 4.55, { fill: C.WHITE, line: rec ? C.NAVY : undefined });
      badge(s, ic, x + 0.3, y + 0.3, 0.55, { bg: rec ? C.LIME : C.OFF, fg: C.NAVY });
      if (rec) pill(s, x + cw - 1.55, y + 0.42, 'Preferred', { variant: 'navy', w: 1.25 });
      t(s, n, { x: x + 0.3, y: y + 1.0, w: cw - 0.6, h: 0.4, font: F.HEAD, bold: true, size: 17, color: C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.42, w: cw - 0.6, h: 0.5, size: 10.5, color: C.SLATE, lineSpacingMultiple: 1.2 });
      crit.forEach((c, k) => {
        const yy = y + 2.15 + k * 0.38;
        t(s, c, { x: x + 0.3, y: yy, w: 1.3, h: 0.28, size: 10.5, color: C.CHAR, valign: 'middle' });
        for (let j = 0; j < 5; j++) oval(s, x + cw - 0.3 - (5 - j) * 0.28 + 0.06, yy + 0.06, 0.16, { fill: j < sc[k] ? C.NAVY : C.MIST });
      });
      line(s, x + 0.3, y + 3.75, cw - 0.6, 0, { color: C.MIST });
      t(s, cost, { x: x + 0.3, y: y + 3.85, w: 1.6, h: 0.4, font: F.DISP, size: 18, color: C.NAVY });
      t(s, 'investment', { x: x + 0.3, y: y + 4.2, w: 1.6, h: 0.22, size: 9, color: C.SLATE });
      t(s, time, { x: x + cw - 1.9, y: y + 3.85, w: 1.6, h: 0.4, font: F.DISP, size: 18, color: C.NAVY, align: 'right' });
      t(s, 'to first revenue', { x: x + cw - 1.9, y: y + 4.2, w: 1.6, h: 0.22, size: 9, color: C.SLATE, align: 'right' });
    });
    s.addNotes('THREE-COLUMN COMPARISON. Dot ratings: recolour dots navy (filled) or mist (empty). The preferred option has a navy outline and pill.');
  }

  // Plan comparison table (native)
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Plan comparison: what each tier includes');
    const hdr = ['Feature', 'Starter', 'Growth', 'Enterprise'];
    const rows = [
      ['Price per seat / month', '$39', '$79', 'Custom'],
      ['Pipeline & forecasting', '✓', '✓', '✓'],
      ['AI deal scoring', '—', '✓', '✓'],
      ['Guided coaching', '—', '✓', '✓'],
      ['Integrations', '20', '140+', '140+ & custom'],
      ['SSO & SCIM', '—', '—', '✓'],
      ['Data residency', '—', '—', '✓'],
      ['Support', 'Email', 'Named CSM', '24/7 + TAM'],
      ['Uptime SLA', '—', '99.9%', '99.95%'],
    ];
    const hi = 2;
    const head = hdr.map((h, i) => ({ text: h, options: { fontFace: F.HEAD, bold: true, fontSize: 13, color: i === hi ? C.NAVY : (i === 0 ? C.SLATE : C.NAVY), fill: { color: i === hi ? C.LIME : C.WHITE }, align: i ? 'center' : 'left', valign: 'middle', border: B(C.NAVY) } }));
    const body = rows.map((r, ri) => r.map((c, i) => ({ text: c, options: {
      fontFace: i === 0 ? F.MED : (ri === 0 ? F.HEAD : F.BODY), bold: ri === 0 && i > 0, fontSize: c === '✓' ? 13 : 11.5,
      color: c === '—' ? C.MIST : (i === hi ? C.WHITE : C.NAVY), fill: { color: i === hi ? C.NAVY : C.WHITE }, align: i ? 'center' : 'left', valign: 'middle', border: B(i === hi ? C.NAVY2 : C.MIST),
    } })));
    s.addTable([head, ...body], { x: M, y: 2.0, w: SW - 2 * M, colW: [3.9, 2.74, 2.74, 2.753], rowH: [0.55, ...Array(rows.length).fill(0.44)], margin: [0, 0.2, 0, 0.2] });
    s.addNotes('PLAN COMPARISON TABLE. Native table; the highlighted column uses navy cells with a lime header. Use ✓ and — for included / not included.');
  }

  // Data table — P&L
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC.replace('Comparison', 'Tables'), 'Quarterly P&L summary', { lead: 'Unaudited, $K. Variance vs budget shown for the current quarter.' });
    const hdr = ['$K', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Budget Q3', 'Variance'];
    const rows = [
      ['Subscription revenue', '7,210', '8,440', '9,760', '11,350', '10,900', '+4.1%'],
      ['Services revenue', '990', '1,160', '1,340', '1,550', '1,600', '−3.1%'],
      ['Total revenue', '8,200', '9,600', '11,100', '12,900', '12,500', '+3.2%'],
      ['Cost of revenue', '(1,850)', '(2,110)', '(2,420)', '(2,820)', '(2,700)', '−4.4%'],
      ['Gross profit', '6,350', '7,490', '8,680', '10,080', '9,800', '+2.9%'],
      ['Operating expenses', '(7,300)', '(7,900)', '(8,450)', '(9,650)', '(9,900)', '+2.5%'],
      ['EBITDA', '(950)', '(410)', '230', '430', '(100)', 'n.m.'],
    ];
    const tot = [2, 4, 6];
    const head = hdr.map((h, i) => ({ text: h, options: { fontFace: F.MED, fontSize: 10, color: C.WHITE, fill: { color: C.NAVY }, align: i ? 'right' : 'left', valign: 'middle' } }));
    const body = rows.map((r, ri) => r.map((c, i) => ({ text: c, options: {
      fontFace: tot.includes(ri) ? F.HEAD : F.BODY, bold: tot.includes(ri), fontSize: 11.5,
      color: i === 6 ? (c.startsWith('+') ? C.OLIVE : C.SLATE) : C.NAVY,
      fill: { color: i === 4 ? C.LIME : (tot.includes(ri) ? C.OFF : C.WHITE) }, align: i ? 'right' : 'left', valign: 'middle', border: B(tot.includes(ri) ? C.NAVY : C.MIST),
    } })));
    s.addTable([head, ...body], { x: M, y: 2.05, w: SW - 2 * M, colW: [3.4, 1.45, 1.45, 1.45, 1.45, 1.45, 1.483], rowH: [0.5, ...Array(rows.length).fill(0.5)], margin: [0, 0.18, 0, 0.18] });
    t(s, 'Current quarter highlighted in lime. Brackets denote negative values. n.m. = not meaningful.', { x: M, y: 6.25, w: 9, h: 0.25, size: 9, color: C.SLATE });
    s.addNotes('DATA TABLE. Financial table with subtotal rows (bold, off-white) and a highlighted current-period column. Native table — fully editable.');
  }
};
