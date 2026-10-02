// 44–50 Strategy
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, cb, legend, icon, panel, callout, footnote } = L;
  const SEC = 'Strategy';
  const NB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: C.RULE }, { type: 'none' }];
  const HB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1, color: C.INK }, { type: 'none' }];

  // 44 Strategic priorities — editorial 2x2
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Four strategic priorities for 2027');
    const pr = [
      ['Target', 'Win the enterprise segment', 'Dedicated enterprise team, 30 named accounts and a new security tier.', '45% of new ARR'],
      ['Globe', 'Expand into DACH and the Nordics', 'Two regional hubs, local partners and data residency in the EU.', '$12M new-market ARR'],
      ['Handshake', 'Scale the partner channel', 'Certify 40 partners and launch a co-selling programme.', '30% partner-sourced'],
      ['Sparkle', 'Lead with intelligent planning', 'Ship AI scenario planning and make it the default workflow.', '60% feature adoption'],
    ];
    const cw = (SW - 2 * M) / 2, rh = 2.3;
    rule(s, M, 2.0, SW - 2 * M, { color: C.INK, lw: 1 });
    rule(s, M, 2.0 + rh, SW - 2 * M, { color: C.RULE });
    L.vrule(s, M + cw, 2.15, rh * 2 - 0.3, { color: C.RULE });
    pr.forEach(([ic, h1, d, kpiT], i) => {
      const x = M + (i % 2) * cw + (i % 2 ? 0.4 : 0), y = 2.0 + Math.floor(i / 2) * rh;
      numeral(s, x, y + 0.2, i + 1, { size: 40 });
      iconDot(s, ic, x + cw - 1.05 - (i % 2 ? 0.4 : 0), y + 0.3, 0.6, { bg: i === 0 ? C.CORAL : C.COBALT });
      t(s, h1, { x: x + 1.15, y: y + 0.32, w: cw - 2.6, h: 0.65, font: F.SERIF, size: 19, lineSpacingMultiple: 1.0 });
      t(s, d, { x: x + 1.15, y: y + 1.0, w: cw - 2.6, h: 0.6, size: 10.5, color: C.STONE, lineSpacingMultiple: 1.25 });
      chip(s, x + 1.15, y + 1.7, 'Goal: ' + kpiT, { variant: i === 0 ? 'coral' : 'white', w: 2.4 });
    });
    s.addNotes('STRATEGIC PRIORITIES. Editorial 2×2 grid divided by hairlines; each priority has an italic numeral, icon, description and a goal chip.');
  }

  // 45 SWOT — cross layout with central hub
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'SWOT: strong economics, thin international footprint');
    const q = [
      ['S', 'Strengths', ['118% net revenue retention', '71% gross margin', 'Highest NPS in our category']],
      ['W', 'Weaknesses', ['Services margin below target', 'Only 9% revenue outside Europe/US', 'Enterprise references still few']],
      ['O', 'Opportunities', ['EU data-residency demand', 'Partners keen to co-sell', 'AI planning budgets growing 40%']],
      ['T', 'Threats', ['Platform vendors bundling analytics', 'Longer enterprise buying cycles', 'Rising cost of senior engineers']],
    ];
    const x0 = M, y0 = 1.95, W2 = SW - 2 * M, H2 = 4.7, cx = x0 + W2 / 2, cy = y0 + H2 / 2;
    box(s, x0, y0, W2 / 2 - 0.06, H2 / 2 - 0.06, { fill: C.DEEP });
    box(s, cx + 0.06, y0, W2 / 2 - 0.06, H2 / 2 - 0.06, { fill: C.IVORY });
    box(s, x0, cy + 0.06, W2 / 2 - 0.06, H2 / 2 - 0.06, { fill: C.IVORY });
    box(s, cx + 0.06, cy + 0.06, W2 / 2 - 0.06, H2 / 2 - 0.06, { fill: C.IVORY });
    q.forEach(([l, n, items], i) => {
      const left = i % 2 === 0, top = i < 2;
      const qx = left ? x0 : cx + 0.06, qy = top ? y0 : cy + 0.06, qw = W2 / 2 - 0.06;
      const dark = i === 0;
      const pad = left ? 0.35 : 0.85;
      t(s, l, { x: qx + pad, y: qy + 0.18, w: 0.9, h: 0.9, font: F.SERIF, italic: true, size: 50, color: dark ? C.CORAL : i === 2 ? C.COBALT : C.STONE });
      t(s, n, { x: qx + pad + 0.95, y: qy + 0.32, w: 3, h: 0.35, font: F.SERIF, size: 18, color: dark ? C.WHITE : C.INK });
      items.forEach((it, k) => {
        const iy = qy + 0.92 + k * 0.38;
        circ(s, qx + pad + 0.98, iy + 0.09, 0.07, { fill: dark ? C.CORAL : C.COBALT });
        t(s, it, { x: qx + pad + 1.15, y: iy, w: qw - pad - 1.9, h: 0.26, size: 10.5, color: dark ? C.WHITE : C.INK });
      });
    });
    circ(s, cx - 0.6, cy - 0.6, 1.2, { fill: C.CORAL, line: C.WHITE, lw: 4 });
    t(s, 'SWOT', { x: cx - 0.6, y: cy - 0.6, w: 1.2, h: 1.2, size: 13, bold: true, charSpacing: 2, color: C.WHITE, align: 'center', valign: 'middle' });
    s.addNotes('SWOT. Four quadrants meeting at a central hub. Strengths sits on deep cobalt to signal the foundation of the plan.');
  }

  // 46 Strategic roadmap — three horizons on a shared time axis
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Roadmap: three horizons over the next two years', { lead: 'Milestones by quarter. Horizon 1 protects the core; horizons 2 and 3 build new growth.' });
    const qs = ['Q1 27', 'Q2 27', 'Q3 27', 'Q4 27', 'Q1 28', 'Q2 28', 'Q3 28', 'Q4 28'];
    const lx = M, lw = 2.5, ax = M + lw + 0.2, aw = SW - M - ax, y0 = 2.05;
    qs.forEach((q, i) => {
      const x = ax + aw * i / qs.length;
      t(s, q, { x, y: y0, w: aw / qs.length, h: 0.25, size: 9, bold: true, color: i < 4 ? C.COBALT : C.STONE, align: 'center' });
      if (i) L.vrule(s, x, y0 + 0.35, 3.95, { color: C.RULE, dash: 'dash' });
    });
    rule(s, ax, y0 + 0.32, aw, { color: C.INK, lw: 1 });
    const H = [
      ['Horizon 1', 'Strengthen the core', C.DEEP, [[0.5, 'Enterprise tier GA'], [2.5, 'Pricing refresh'], [5.0, 'Platform 3.0']]],
      ['Horizon 2', 'Expand reach', C.COBALT, [[1.0, 'Munich hub opens'], [3.0, 'Partner certification'], [5.5, 'Stockholm hub opens']]],
      ['Horizon 3', 'Explore new growth', C.CORAL, [[2.0, 'AI planning beta'], [4.5, 'Data marketplace pilot'], [7.0, 'Industry cloud launch']]],
    ];
    H.forEach(([hn, d, col, ms], i) => {
      const y = y0 + 0.55 + i * 1.3;
      box(s, lx, y, lw, 1.1, { fill: col });
      t(s, hn.toUpperCase(), { x: lx + 0.2, y: y + 0.18, w: lw - 0.4, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: i === 2 ? C.WHITE : C.SKY });
      t(s, d, { x: lx + 0.2, y: y + 0.45, w: lw - 0.4, h: 0.5, font: F.SERIF, size: 15, color: C.WHITE });
      rule(s, ax, y + 0.55, aw, { color: col, lw: 2 });
      ms.forEach(([pos, lbl], k) => {
        const mx = ax + aw * (pos + 0.5) / qs.length;
        s.addShape('diamond', { x: mx - 0.13, y: y + 0.42, w: 0.26, h: 0.26, fill: { color: C.WHITE }, line: { color: col, width: 2 } });
        t(s, lbl, { x: Math.min(mx - 0.9, SW - M - 1.8), y: k % 2 ? y + 0.75 : y + 0.08, w: 1.8, h: 0.25, size: 9, bold: true, align: mx - 0.9 > SW - M - 1.8 ? 'right' : 'center', color: C.INK });
      });
    });
    t(s, 'Diamonds mark board-level milestones. Shaded quarters (cobalt labels) are committed; later quarters are indicative.', { x: M, y: 6.5, w: 10, h: 0.2, size: 8, color: C.STONE });
    s.addNotes('STRATEGIC ROADMAP. Three horizon bands on a shared quarterly axis; milestones are editable diamonds positioned by quarter.');
  }

  // 47 Growth strategy — stacked column path to target
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Growth strategy: four levers take us to $150M by 2028', { lead: 'Revenue by growth lever, $M. Core includes price and retention effects.' });
    const yrs = ['2026A', '2027F', '2028F'];
    const lev = [['Core business', [84.2, 96.0, 106.0], C.DEEP], ['Enterprise expansion', [0, 7.5, 18.0], C.COBALT], ['New markets', [0, 3.5, 12.0], C.SKY], ['New products', [0, 2.5, 14.0], C.CORAL]];
    const x = M, w = gw(6);
    legend(s, x, 1.95, lev.map(l => [l[0], l[2]]));
    s.addChart(pres.charts.BAR, lev.map(([n, v]) => ({ name: n, labels: yrs, values: v })), cb({ x: x - 0.1, y: 2.3, w: w + 0.1, h: 4.35, extra: {
      barDir: 'col', barGrouping: 'stacked', chartColors: lev.map(l => l[2]), barGapWidthPct: 55, valAxisLabelFormatCode: '$0', valAxisMinVal: 0, valAxisMaxVal: 160, valAxisMajorUnit: 40 } }));
    const rx = gx(6) + 0.3, rw = SW - M - rx;
    lev.slice(1).forEach(([n, v, col], i) => {
      const y = 2.0 + i * 1.55;
      box(s, rx, y, rw, 1.4, { fill: i === 2 ? C.PEACH : C.IVORY });
      box(s, rx + 0.3, y + 0.25, 0.14, 0.14, { fill: col });
      t(s, n, { x: rx + 0.55, y: y + 0.18, w: rw - 2.0, h: 0.3, size: 12, bold: true });
      t(s, ['Security tier, 30 named accounts', 'DACH and Nordic hubs', 'AI planning and data marketplace'][i], { x: rx + 0.3, y: y + 0.52, w: rw - 2.0, h: 0.5, size: 9.5, color: C.STONE });
      t(s, '+$' + v[2].toFixed(1) + 'M', { x: rx + rw - 1.75, y: y + 0.2, w: 1.5, h: 0.5, size: 22, bold: true, align: 'right', color: i === 2 ? C.CORALD : C.INK });
      t(s, 'by 2028', { x: rx + rw - 1.75, y: y + 0.75, w: 1.5, h: 0.22, size: 9, color: C.STONE, align: 'right' });
    });
    s.addNotes('GROWTH STRATEGY. Native stacked column chart showing the contribution of each growth lever, with lever cards on the right.');
  }

  // 48 Opportunity matrix — impact vs effort bubble chart
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Opportunity matrix: three quick wins to start now');
    const x = M, y = 1.95, w = gw(8) + 0.2, h = 4.7, lay = { x: 0.06, y: 0.05, w: 0.92, h: 0.86 };
    const px0 = x + w * lay.x, pw0 = w * lay.w, py0 = y + h * lay.y, ph0 = h * lay.h;
    [['Quick wins', 0, 0, 'FFF1EC', C.CORALD], ['Major projects', 1, 0, 'EEF1FC', C.COBALT], ['Fill-ins', 0, 1, C.WHITE, C.STONE], ['Deprioritise', 1, 1, 'F2EFE8', C.STONE]].forEach(([n, qx, qy, f, tc]) => {
      box(s, px0 + qx * pw0 / 2, py0 + qy * ph0 / 2, pw0 / 2, ph0 / 2, { fill: f });
      t(s, n.toUpperCase(), { x: px0 + qx * pw0 / 2 + 0.15, y: py0 + qy * ph0 / 2 + 0.12, w: 2.2, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: tc });
    });
    const ops = [['Renewal price uplift', 10, 81, 6, 'R'], ['Partner co-selling', 40, 74, 9, 'R'], ['Self-serve onboarding', 16, 58, 5, 'R'], ['EU data residency', 72, 64, 10, 'R'], ['AI planning suite', 84, 84, 12, 'L'], ['Vertical templates', 40, 30, 4, 'R'], ['Legacy migration tool', 78, 22, 5, 'L']];
    s.addChart(pres.charts.BUBBLE, [{ name: 'Effort', values: ops.map(o => o[1]) },
      { name: 'Quick wins', values: ops.map((o, i) => i < 3 ? o[2] : null), sizes: ops.map((o, i) => i < 3 ? o[3] : null) },
      { name: 'Other opportunities', values: ops.map((o, i) => i < 3 ? null : o[2]), sizes: ops.map((o, i) => i < 3 ? null : o[3]) }], cb({ x, y, w, h, extra: {
      chartColors: [C.CORAL, C.COBALT], chartColorsOpacity: 80, valAxisMinVal: 0, valAxisMaxVal: 100, catAxisMinVal: 0, catAxisMaxVal: 100, valAxisMajorUnit: 50, catAxisMajorUnit: 50, valGridLine: { style: 'none' },
      layout: lay, chartArea: { fill: { color: C.IVORY, transparency: 100 } }, plotArea: { fill: { color: C.WHITE, transparency: 100 } } } }));
    const dMax = 0.25 * Math.min(pw0, ph0), sMax = Math.max(...ops.map(o => o[3]));
    ops.forEach(([n, ex, im, sz, side], i) => {
      const d = dMax * Math.sqrt(sz / sMax), cx = px0 + pw0 * ex / 100, cy = py0 + ph0 * (1 - im / 100);
      t(s, n, { x: side === 'L' ? cx - d / 2 - 0.06 - 1.8 : cx + d / 2 + 0.06, y: cy - 0.11, w: 1.8, h: 0.22, size: 8.5, bold: i < 3, align: side === 'L' ? 'right' : 'left', color: i < 3 ? C.CORALD : C.INK });
    });
    t(s, 'Effort →', { x: px0, y: py0 + ph0 + 0.25, w: pw0, h: 0.2, size: 8.5, color: C.STONE, align: 'center' });
    t(s, 'Impact →', { x: px0 - 2.3, y: py0 + ph0 / 2 - 0.1, w: 4.0, h: 0.2, size: 8.5, color: C.STONE, align: 'center', rotate: 270 });
    const rx = gx(8) + 0.35, rw = SW - M - rx;
    t(s, 'Start this quarter', { x: rx, y: 2.0, w: rw, h: 0.35, font: F.SERIF, size: 18 });
    [['Renewal price uplift', '+$2.4M ARR, 6 weeks'], ['Partner co-selling', '+$3.1M pipeline, 8 weeks'], ['Self-serve onboarding', '−20% time to value']].forEach(([n, d], i) => {
      const yy = 2.6 + i * 1.0;
      rule(s, rx, yy, rw, { color: C.RULE });
      numeral(s, rx, yy + 0.12, i + 1, { size: 18 });
      t(s, n, { x: rx + 0.6, y: yy + 0.15, w: rw - 0.6, h: 0.28, size: 11.5, bold: true });
      t(s, d, { x: rx + 0.6, y: yy + 0.47, w: rw - 0.6, h: 0.25, size: 10, color: C.STONE });
    });
    t(s, 'Bubble size = expected annual value.', { x: rx, y: 6.4, w: rw, h: 0.22, size: 8.5, color: C.STONE });
    s.addNotes('OPPORTUNITY MATRIX. Native bubble chart (effort, impact, value) over editable quadrant rectangles. Quick wins are a separate series (coral) — move a row between series to re-classify it.');
  }

  // 49 Risk matrix — 5x5 heat grid
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Risk matrix: two risks need board attention');
    const gxp = M + 0.6, gy = 2.05, cs = 0.86;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const score = (c + 1) * (5 - r);
      const f = score >= 15 ? C.CORAL : score >= 10 ? C.PEACH : score >= 5 ? C.SKY : 'EEF1FC';
      box(s, gxp + c * cs, gy + r * cs, cs - 0.05, cs - 0.05, { fill: f });
    }
    const risks = [['1', 'Enterprise sales cycles lengthen', 4, 4], ['2', 'Key engineering attrition', 3, 5], ['3', 'Competitor bundles analytics', 4, 3], ['4', 'EU expansion delayed', 2, 3], ['5', 'Data security incident', 1, 5], ['6', 'FX volatility', 3, 2]];
    risks.forEach(([n, , lk, im]) => {
      const cx = gxp + (lk - 1) * cs + cs / 2 - 0.025, cy = gy + (5 - im) * cs + cs / 2 - 0.025;
      circ(s, cx - 0.2, cy - 0.2, 0.4, { fill: lk * im >= 15 ? C.DEEP : C.WHITE, line: C.DEEP, lw: 1.25 });
      t(s, n, { x: cx - 0.2, y: cy - 0.2, w: 0.4, h: 0.4, size: 11, bold: true, align: 'center', valign: 'middle', color: lk * im >= 15 ? C.WHITE : C.DEEP });
    });
    t(s, 'Likelihood →', { x: gxp, y: gy + 5 * cs + 0.05, w: 5 * cs, h: 0.22, size: 8.5, color: C.STONE, align: 'center' });
    t(s, 'Impact →', { x: gxp - 2.6, y: gy + 2.5 * cs - 0.1, w: 4.5, h: 0.2, size: 8.5, color: C.STONE, align: 'center', rotate: 270 });
    const tx = gx(6), tw = SW - M - tx;
    const head = ['#', 'Risk', 'Score', 'Mitigation', 'Owner'].map((c, i) => ({ text: c.toUpperCase(), options: { bold: true, fontSize: 8, charSpacing: 1.2, color: C.STONE, border: HB, align: i === 2 ? 'center' : 'left' } }));
    const mit = ['Mutual action plans; exec sponsors', 'Retention grants; succession plans', 'Bundle-proof pricing; partner integrations', 'Phased launch; local partners first', 'SOC 2 Type II; quarterly pen tests', 'Natural hedging; EUR pricing'];
    const own = ['CRO', 'CTO', 'CPO', 'COO', 'CISO', 'CFO'];
    const body = risks.map(([n, name, lk, im], i) => [
      { text: n, options: { bold: true, fontSize: 10, color: C.COBALT, border: NB } },
      { text: name, options: { bold: true, fontSize: 10, border: NB } },
      { text: String(lk * im), options: { bold: true, fontSize: 10, align: 'center', color: lk * im >= 15 ? C.WHITE : C.INK, fill: { color: lk * im >= 15 ? C.CORAL : lk * im >= 10 ? C.PEACH : C.WHITE }, border: NB } },
      { text: mit[i], options: { fontSize: 9, color: C.STONE, border: NB } },
      { text: own[i], options: { fontSize: 9.5, bold: true, border: NB } },
    ]);
    s.addTable([head, ...body], { x: tx, y: 2.0, w: tw, colW: [0.35, 2.05, 0.6, tw - 3.75, 0.75], rowH: [0.38, ...Array(6).fill(0.66)], fontFace: F.SANS, margin: [0, 0.06, 0, 0.06], valign: 'middle' });
    s.addNotes('RISK MATRIX. 5×5 grid of editable squares (score = likelihood × impact) with numbered risk markers, plus a native mitigation table.');
  }

  // 50 Action plan — native table with status
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Action plan: twelve weeks to launch the 2027 strategy');
    const rows = [
      ['Appoint enterprise sales lead', 'CRO', '15 Jan', 'Done', 100], ['Finalise security tier pricing', 'CPO', '29 Jan', 'Done', 100],
      ['Sign Munich hub lease', 'COO', '12 Feb', 'In progress', 60], ['Certify first 10 partners', 'VP Partners', '26 Feb', 'In progress', 40],
      ['Launch AI planning beta', 'CPO', '12 Mar', 'Not started', 0], ['Board review of progress', 'CEO', '26 Mar', 'Not started', 0],
    ];
    const head = ['', 'Action', 'Owner', 'Due', 'Status', 'Progress'].map((c, i) => ({ text: c.toUpperCase(), options: { bold: true, fontSize: 8.5, charSpacing: 1.2, color: C.STONE, border: HB, align: i >= 4 ? 'left' : 'left' } }));
    const body = rows.map(([a, o, d, st, p], i) => [
      { text: String(i + 1).padStart(2, '0'), options: { fontFace: F.SERIF, italic: true, fontSize: 14, color: C.CORAL, border: NB, valign: 'middle' } },
      { text: a, options: { fontSize: 11.5, bold: true, border: NB, valign: 'middle' } },
      { text: o, options: { fontSize: 10.5, border: NB, valign: 'middle' } },
      { text: d, options: { fontSize: 10.5, border: NB, valign: 'middle' } },
      { text: st, options: { fontSize: 10, bold: true, color: st === 'Done' ? C.COBALT : st === 'In progress' ? C.CORALD : C.STONE, border: NB, valign: 'middle' } },
      { text: '', options: { border: NB } },
    ]);
    const colW = [0.7, 4.6, 1.5, 1.3, 1.5, SW - 2 * M - 9.6], ty = 2.0, rh = 0.66;
    s.addTable([head, ...body], { x: M, y: ty, w: SW - 2 * M, colW, rowH: [0.42, ...Array(rows.length).fill(rh)], fontFace: F.SANS, margin: [0, 0.08, 0, 0.08] });
    const bx = M + colW.slice(0, 5).reduce((a, b) => a + b, 0) + 0.1, bw = colW[5] - 0.9;
    rows.forEach(([, , , , p], i) => {
      const y = ty + 0.42 + i * rh + rh / 2 - 0.05;
      box(s, bx, y, bw, 0.1, { fill: C.MIST });
      if (p) box(s, bx, y, bw * p / 100, 0.1, { fill: p === 100 ? C.COBALT : C.CORAL });
      t(s, p + '%', { x: bx + bw + 0.1, y: y - 0.08, w: 0.6, h: 0.25, size: 9.5, bold: true });
    });
    s.addNotes('ACTION PLAN. Native table with italic numerals and editable progress bars (bar width = column width × percent).');
  }
};
