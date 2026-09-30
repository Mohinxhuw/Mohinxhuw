// Strategy
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, footnote } = L;
  const SEC = '10 · Strategy';

  // Strategic priorities — numbered rows
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Four strategic priorities for 2027', { lead: 'Each priority has one accountable owner and one metric that defines success.' });
    const pr = [
      ['Win the US mid-market', 'Triple US sales capacity and launch two vertical playbooks.', 'CRO', '$25M US ARR'],
      ['Lead in predictive AI', 'Ship autonomous forecasting and call intelligence.', 'CPO', '98% forecast accuracy'],
      ['Scale through partners', 'Make partners the source of 50% of new pipeline.', 'CPO / CRO', '50% partner-sourced'],
      ['Build a durable business', 'Reach sustained profitability without slowing growth.', 'CFO', 'Rule of 40 ≥ 55'],
    ];
    t(s, 'PRIORITY', { x: M + 1.3, y: 2.0, w: 3, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    t(s, 'OWNER', { x: gx(8), y: 2.0, w: 1.5, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    t(s, 'SUCCESS METRIC', { x: gx(9) + 0.3, y: 2.0, w: 3, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    pr.forEach(([h1, d, o, m], i) => {
      const y = 2.35 + i * 1.07;
      line(s, M, y, SW - 2 * M, 0, { color: i === 0 ? C.NAVY : C.MIST, lw: i === 0 ? 1.25 : 0.75 });
      t(s, String(i + 1).padStart(2, '0'), { x: M, y: y + 0.15, w: 1.1, h: 0.75, font: F.DISP, size: 36, color: i === 0 ? C.NAVY : C.MIST });
      t(s, h1, { x: M + 1.3, y: y + 0.2, w: gw(6), h: 0.35, font: F.HEAD, bold: true, size: 16, color: C.NAVY });
      t(s, d, { x: M + 1.3, y: y + 0.57, w: gw(6), h: 0.3, size: 11, color: C.SLATE });
      t(s, o, { x: gx(8), y: y + 0.25, w: 1.4, h: 0.5, font: F.MED, size: 11, color: C.NAVY, valign: 'middle' });
      pill(s, gx(9) + 0.3, y + 0.33, m, { variant: i === 0 ? 'lime' : 'off', w: SW - M - gx(9) - 0.3, h: 0.36, size: 10 });
    });
    s.addNotes('STRATEGIC PRIORITIES. Large index numbers give rhythm; the first priority is emphasised in navy and lime.');
  }

  // Strategic framework — house
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Our strategy on a page');
    const x = M, w = SW - 2 * M;
    // roof
    s.addShape('triangle', { x: x + 0.4, y: 1.95, w: w - 0.8, h: 1.0, fill: { color: C.NAVY }, line: { type: 'none' } });
    t(s, 'VISION', { x: SW / 2 - 2, y: 2.28, w: 4, h: 0.22, font: F.MED, size: 9, color: C.LIME, align: 'center', charSpacing: 2 });
    t(s, 'The operating system for predictable revenue', { x: SW / 2 - 3.5, y: 2.5, w: 7, h: 0.35, font: F.HEAD, bold: true, size: 14, color: C.WHITE, align: 'center' });
    // mission band
    rect(s, x + 0.4, 3.05, w - 0.8, 0.5, { fill: C.LIME, radius: 0.06 });
    t(s, 'Mission: give every revenue team the clarity to make the right call', { x: x + 0.4, y: 3.05, w: w - 0.8, h: 0.5, font: F.MED, size: 11.5, color: C.NAVY, align: 'center', valign: 'middle' });
    const pil = [['PiCpu', 'Product leadership', 'Best predictive engine'], ['PiGlobe', 'Market expansion', 'US, France, Australia'], ['PiShareNetwork', 'Partner ecosystem', '50% partner pipeline'], ['PiHeadset', 'Customer outcomes', 'NRR above 130%']];
    const pw = (w - 0.8 - 3 * 0.25) / 4;
    pil.forEach(([ic, n, d], i) => {
      const px = x + 0.4 + i * (pw + 0.25), py = 3.7;
      card(s, px, py, pw, 1.85, { fill: C.WHITE });
      icon(s, ic, px + 0.3, py + 0.3, 0.38, C.NAVY);
      t(s, n, { x: px + 0.3, y: py + 0.85, w: pw - 0.6, h: 0.3, font: F.HEAD, bold: true, size: 13.5, color: C.NAVY });
      t(s, d, { x: px + 0.3, y: py + 1.2, w: pw - 0.6, h: 0.3, size: 10.5, color: C.SLATE });
    });
    rect(s, x + 0.4, 5.7, w - 0.8, 0.85, { fill: C.NAVY2, radius: 0.08 });
    t(s, 'FOUNDATION', { x: x + 0.7, y: 5.7, w: 1.6, h: 0.85, font: F.MED, size: 9, color: C.LIME, valign: 'middle', charSpacing: 2 });
    ['Radical clarity', 'Earn trust daily', 'Bias for speed', 'Data we can defend'].forEach((v, i) => {
      t(s, v, { x: x + 2.4 + i * 2.35, y: 5.7, w: 2.2, h: 0.85, font: F.MED, size: 11.5, color: C.WHITE, valign: 'middle' });
    });
    s.addNotes('STRATEGIC FRAMEWORK. "Strategy house": vision (roof), mission (band), four pillars and cultural foundation. All shapes are editable.');
  }

  // SWOT
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'SWOT: a strong product with stretched sales capacity');
    const q = [
      ['S', 'Strengths', ['96% forecast accuracy — category best', '128% net revenue retention', 'Two-day implementation'], 'navy'],
      ['W', 'Weaknesses', ['Limited US brand awareness', 'Services margin below target', 'Few enterprise references'], 'off'],
      ['O', 'Opportunities', ['CRM consolidation in mid-market', 'Partner-led growth in new regions', 'AI budgets moving to production'], 'lime'],
      ['T', 'Threats', ['CRM vendors bundling AI features', 'Longer procurement cycles', 'Competition for AI talent'], 'off'],
    ];
    const cw = (SW - 2 * M - 0.25) / 2, ch = 2.2;
    q.forEach(([letter, n, items, v], i) => {
      const x = M + (i % 2) * (cw + 0.25), y = 2.05 + Math.floor(i / 2) * (ch + 0.2);
      const fill = { navy: C.NAVY, off: C.OFF, lime: C.LIME }[v];
      const dark = v === 'navy';
      card(s, x, y, cw, ch, { fill });
      t(s, letter, { x: x + 0.3, y: y + 0.2, w: 1.2, h: 1.2, font: F.DISP, size: 64, color: dark ? C.LIME : C.NAVY });
      t(s, n, { x: x + 1.7, y: y + 0.3, w: cw - 2, h: 0.35, font: F.HEAD, bold: true, size: 16, color: dark ? C.WHITE : C.NAVY });
      items.forEach((it, k) => {
        const iy = y + 0.82 + k * 0.42;
        rect(s, x + 1.7, iy + 0.1, 0.08, 0.08, { fill: dark ? C.LIME : C.NAVY, square: true });
        t(s, it, { x: x + 1.95, y: iy, w: cw - 2.3, h: 0.3, size: 11, color: dark ? C.WHITE : C.NAVY });
      });
    });
    s.addNotes('SWOT. Internal factors on top (S, W), external below (O, T). Strength is navy, opportunity lime to signal positives.');
  }

  // 3-step strategy — chevrons
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'A three-step plan to lead the category');
    const st = [
      ['2026–27', 'Focus', 'Dominate mid-market in our core markets and prove the US playbook.', ['$80M ARR', '2,000 customers']],
      ['2027–28', 'Expand', 'Open three new regions through partners and launch enterprise tier.', ['20 markets', '50% partner pipeline']],
      ['2028–29', 'Lead', 'Become the system of record for revenue decisions.', ['$150M ARR', 'Rule of 40 ≥ 55']],
    ];
    const cw = (SW - 2 * M + 0.3 * 2) / 3;
    st.forEach(([when, n, d, kpis], i) => {
      const x = M + i * (cw - 0.3), y = 2.1;
      s.addShape(i === 0 ? 'homePlate' : 'chevron', { x, y, w: cw, h: 1.2, fill: { color: i === 2 ? C.LIME : (i === 1 ? C.STEEL : C.NAVY) }, line: { color: C.WHITE, width: 3 } });
      t(s, String(i + 1).padStart(2, '0'), { x: x + (i ? 0.75 : 0.35), y: y + 0.18, w: 1, h: 0.3, font: F.HEAD, bold: true, size: 11, color: i === 2 ? C.NAVY : C.LIME });
      t(s, n, { x: x + (i ? 0.75 : 0.35), y: y + 0.45, w: cw - 1.5, h: 0.5, font: F.DISP, size: 24, color: i === 2 ? C.NAVY : C.WHITE });
      const tx = x + (i ? 0.45 : 0.1);
      t(s, when, { x: tx, y: 3.6, w: cw - 0.8, h: 0.25, font: F.MED, size: 10, color: C.SLATE, charSpacing: 1 });
      t(s, d, { x: tx, y: 3.9, w: cw - 0.9, h: 0.9, size: 12, color: C.CHAR, lineSpacingMultiple: 1.25 });
      kpis.forEach((k, j) => {
        card(s, tx, 5.0 + j * 0.78, cw - 0.9, 0.65, { fill: C.OFF });
        icon(s, 'PiTarget', tx + 0.2, 5.0 + j * 0.78 + 0.19, 0.27, C.NAVY);
        t(s, k, { x: tx + 0.6, y: 5.0 + j * 0.78, w: cw - 1.6, h: 0.65, font: F.HEAD, bold: true, size: 13, color: C.NAVY, valign: 'middle' });
      });
    });
    s.addNotes('3-STEP STRATEGY. Chevron shapes chain the phases. Adjust the chevron point with the yellow handle; keep all three the same.');
  }

  // 5-step strategy — staircase
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Five steps from pilot to company-wide adoption', { lead: 'Our proven enterprise rollout path, used in 40+ deployments.' });
    const st = [
      ['Pilot', 'One team, 30 days, agreed success criteria.'],
      ['Prove', 'Business case signed off by finance.'],
      ['Rollout', 'All sales teams live, admins trained.'],
      ['Extend', 'Marketing and CS join the platform.'],
      ['Optimise', 'Quarterly value reviews, new use cases.'],
    ];
    const n = st.length, gap = 0.15, bw = (SW - 2 * M - (n - 1) * gap) / n, base = 6.6, step = 0.62, h0 = 1.6;
    st.forEach(([h1, d], i) => {
      const x = M + i * (bw + gap), h = h0 + i * step, y = base - h;
      const last = i === n - 1;
      card(s, x, y, bw, h, { fill: last ? C.NAVY : C.WHITE });
      t(s, String(i + 1).padStart(2, '0'), { x: x + 0.25, y: y + 0.22, w: 1, h: 0.45, font: F.DISP, size: 22, color: last ? C.LIME : C.NAVY });
      t(s, h1, { x: x + 0.25, y: y + 0.72, w: bw - 0.5, h: 0.3, font: F.HEAD, bold: true, size: 14, color: last ? C.WHITE : C.NAVY });
      t(s, d, { x: x + 0.25, y: y + 1.05, w: bw - 0.5, h: 0.5, size: 10, color: last ? C.MIST : C.SLATE, lineSpacingMultiple: 1.15 });
      if (i < n - 1) icon(s, 'PiArrowUpRight', x + bw - 0.45, y + 0.25, 0.22, C.SLATE);
    });
    t(s, 'Typical time to full adoption', { x: M, y: 2.05, w: 4, h: 0.25, size: 10, color: C.SLATE });
    t(s, '120 days', { x: M, y: 2.3, w: 4, h: 0.6, font: F.DISP, size: 30, color: C.NAVY });
    s.addNotes('5-STEP STRATEGY. Ascending staircase: each step is a card 0.62" taller than the previous one, all aligned to the same baseline.');
  }

  // Roadmap / milestones — Gantt
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, '2027 roadmap and key milestones', { lead: 'Bars show delivery windows; diamonds mark board-level milestones.' });
    const lx = M, lw = 2.6, gx0 = lx + lw, gwid = SW - M - gx0, y0 = 2.05;
    const qs = ['Q1', 'Q2', 'Q3', 'Q4'];
    qs.forEach((q, i) => {
      const x = gx0 + i * gwid / 4;
      rect(s, x + 0.02, y0, gwid / 4 - 0.04, 0.4, { fill: i === 0 ? C.NAVY : C.OFF, radius: 0.06 });
      t(s, q + ' 2027', { x, y: y0, w: gwid / 4, h: 0.4, font: F.MED, size: 10, color: i === 0 ? C.WHITE : C.NAVY, align: 'center', valign: 'middle' });
      if (i > 0) line(s, x, y0 + 0.5, 0, 4.0, { color: C.MIST, dash: 'dash' });
    });
    const rows = [
      ['US expansion', [[0, 2.5, 'navy']], [[2.5, 'Chicago office opens']]],
      ['Partner marketplace', [[0.5, 2.2, 'navy']], [[2.2, 'Public launch']]],
      ['Autonomous forecasting', [[0, 1.5, 'steel'], [1.5, 3.2, 'navy']], [[3.2, 'GA release']]],
      ['Enterprise tier', [[1.8, 3.6, 'navy']], []],
      ['France & Spain entry', [[2.5, 4, 'lime']], [[4, 'First 50 customers']]],
      ['Pricing & packaging', [[0.2, 1.2, 'steel']], [[1.2, 'New price list']]],
    ];
    const rh = 0.6;
    rows.forEach(([n, bars, ms], i) => {
      const y = y0 + 0.6 + i * rh;
      t(s, n, { x: lx, y, w: lw - 0.1, h: rh - 0.1, font: F.MED, size: 11, color: C.NAVY, valign: 'middle' });
      if (i < rows.length - 1) line(s, lx, y + rh - 0.05, SW - 2 * M, 0, { color: C.OFF });
      bars.forEach(([a, b, v]) => {
        const bx = gx0 + gwid * a / 4, bw = gwid * (b - a) / 4;
        rect(s, bx + 0.03, y + 0.14, bw - 0.06, 0.3, { fill: { navy: C.NAVY, steel: C.MIST, lime: C.LIME }[v], radius: 0.15 });
      });
      ms.forEach(([m, lbl]) => {
        const mx = gx0 + gwid * m / 4;
        s.addShape('diamond', { x: mx - 0.15, y: y + 0.14, w: 0.3, h: 0.3, fill: { color: C.LIME }, line: { color: C.NAVY, width: 1.25 } });
        const right = m < 3.5;
        t(s, lbl, { x: right ? mx + 0.22 : mx - 2.02, y: y + 0.14, w: 1.8, h: 0.3, font: F.MED, size: 9, color: C.CHAR, valign: 'middle', align: right ? 'left' : 'right' });
      });
    });
    const ly = 6.4;
    [['Build', C.MIST], ['Deliver', C.NAVY], ['New market', C.LIME]].forEach(([k, c], i) => {
      rect(s, M + i * 1.6, ly + 0.05, 0.4, 0.16, { fill: c, radius: 0.08 });
      t(s, k, { x: M + i * 1.6 + 0.5, y: ly, w: 1, h: 0.25, size: 9, color: C.SLATE });
    });
    s.addShape('diamond', { x: M + 4.85, y: ly + 0.02, w: 0.2, h: 0.2, fill: { color: C.LIME }, line: { color: C.NAVY, width: 1 } });
    t(s, 'Milestone', { x: M + 5.15, y: ly, w: 1, h: 0.25, size: 9, color: C.SLATE });
    s.addNotes('ROADMAP / MILESTONES. Gantt built from shapes. Quarter width = timeline width ÷ 4; position bars by quarter fraction. Diamonds mark milestones.');
  }
};
