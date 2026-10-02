// 51–56 Product & marketing
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, cb, legend, icon, panel, callout, footnote, dashedLines } = L;
  const SEC = 'Product & marketing';
  const NB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: C.RULE }, { type: 'none' }];
  const HB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1, color: C.INK }, { type: 'none' }];

  // 51 Product overview — three modules
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'One platform, three modules that work better together', { lead: '61% of customers now run two or more modules, up from 38% in 2024.' });
    const mods = [
      ['ChartLineUp', 'Analytics', 'See performance in real time', ['Live dashboards', '140+ data connectors', 'Self-serve exploration'], '1,620 customers'],
      ['Strategy', 'Planning', 'Plan scenarios with confidence', ['Driver-based models', 'AI scenario planning', 'Board-ready reports'], '880 customers'],
      ['Target', 'Forecasting', 'Forecast every number that matters', ['Revenue and pipeline forecasts', 'Accuracy tracking', 'Rolling 18-month view'], '940 customers'],
    ];
    const cw = (SW - 2 * M - 2 * 0.24) / 3;
    mods.forEach(([ic, n, tag, feats, cust], i) => {
      const x = M + i * (cw + 0.24), y = 1.95, hi = i === 1;
      box(s, x, y, cw, 4.7, { fill: hi ? C.DEEP : C.WHITE });
      iconDot(s, ic, x + 0.35, y + 0.35, 0.7, { bg: hi ? C.CORAL : C.IVORY, fg: hi ? C.WHITE : C.COBALT, scale: 0.5 });
      if (hi) chip(s, x + cw - 1.6, y + 0.5, 'Fastest growing', { variant: 'coral', w: 1.3 });
      t(s, n, { x: x + 0.35, y: y + 1.3, w: cw - 0.7, h: 0.5, font: F.SERIF, size: 26, color: hi ? C.WHITE : C.INK });
      t(s, tag, { x: x + 0.35, y: y + 1.85, w: cw - 0.7, h: 0.3, size: 11, color: hi ? C.SKY : C.STONE });
      rule(s, x + 0.35, y + 2.35, cw - 0.7, { color: hi ? C.DEEP2 : C.RULE, lw: 1 });
      feats.forEach((f, k) => {
        icon(s, 'Check', x + 0.35, y + 2.58 + k * 0.42, 0.22, hi ? C.CORAL : C.COBALT);
        t(s, f, { x: x + 0.7, y: y + 2.56 + k * 0.42, w: cw - 1.0, h: 0.26, size: 10.5, color: hi ? C.WHITE : C.INK });
      });
      t(s, cust, { x: x + 0.35, y: y + 4.1, w: cw - 0.7, h: 0.3, size: 12, bold: true, color: hi ? C.CORAL : C.COBALT });
    });
    s.addNotes('PRODUCT OVERVIEW. Three module cards; the highlighted module uses deep cobalt with a coral icon. Icons are editable SVG (Phosphor Light).');
  }

  // 52 Product comparison — radar + spec list
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Product comparison: Planning Pro outscores the legacy suite', { lead: 'Customer-rated capability, 1–10, from 214 product reviews.' });
    const dims = ['Ease of use', 'Speed', 'Collaboration', 'Integrations', 'AI features', 'Reporting', 'Security'];
    const x = M, w = gw(7);
    box(s, x, 1.95, w, 4.7, { fill: C.IVORY });
    legend(s, x + 0.3, 2.12, [['Planning Pro', C.CORAL], ['Legacy suite', C.COBALT]]);
    s.addChart(pres.charts.RADAR, [
      { name: 'Planning Pro', labels: dims, values: [9.1, 8.7, 8.9, 8.2, 9.0, 8.4, 8.8] },
      { name: 'Legacy suite', labels: dims, values: [5.8, 6.1, 5.2, 7.4, 4.1, 7.6, 8.1] },
    ], cb({ x: x + 0.2, y: 2.4, w: w - 0.4, h: 4.15, bg: C.IVORY, extra: { radarStyle: 'marker', chartColors: [C.CORAL, C.COBALT], lineSize: 2.25, lineDataSymbolSize: 6, valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 10, valAxisMajorUnit: 2, catAxisLabelColor: C.INK, catAxisLabelFontSize: 9.5 } }));
    const tx = gx(7) + 0.3, tw = SW - M - tx;
    const rows = [['', 'Planning Pro', 'Legacy'], ['Deployment', 'Cloud', 'On-premise'], ['Time to value', '26 days', '5 months'], ['Model refresh', 'Real time', 'Nightly'], ['AI scenarios', 'Included', 'Add-on'], ['Price per user', '$65', '$90']];
    s.addTable(rows.map((r, ri) => r.map((c, ci) => ({ text: c, options: { fontSize: ri ? 10.5 : 9, bold: ri === 0 || ci === 1, color: ri === 0 ? C.STONE : ci === 1 ? C.CORALD : ci === 2 ? C.STONE : C.INK, border: ri === 0 ? HB : NB, valign: 'middle', align: ci ? 'right' : 'left' } }))),
      { x: tx, y: 2.0, w: tw, colW: [1.6, (tw - 1.6) / 2, (tw - 1.6) / 2], rowH: [0.4, ...Array(5).fill(0.55)], fontFace: F.SANS, margin: [0, 0.06, 0, 0.06] });
    box(s, tx, 5.3, tw, 1.35, { fill: C.DEEP });
    t(s, '+2.3', { x: tx + 0.25, y: 5.42, w: 1.6, h: 0.6, size: 30, bold: true, color: C.CORAL });
    t(s, 'average score advantage across seven dimensions', { x: tx + 0.25, y: 6.05, w: tw - 0.5, h: 0.45, size: 9.5, color: C.SKY });
    s.addNotes('PRODUCT COMPARISON. Native radar chart with two series plus a native specification table.');
  }

  // 53 Pricing strategy — stepped price ladder
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Pricing strategy: three tiers, each priced on value delivered');
    const tiers = [
      ['Essential', '$29', 'per user / month', 'Teams starting with analytics', ['Analytics module', 'Standard connectors', 'Email support'], 1.9, C.SKY, C.DEEP],
      ['Growth', '$65', 'per user / month', 'Scaling teams that plan and forecast', ['All three modules', 'AI scenario planning', 'Named success manager'], 2.9, C.COBALT, C.WHITE],
      ['Enterprise', 'Custom', 'annual agreement', 'Complex, multi-entity organisations', ['EU data residency', 'SSO, audit and admin controls', '99.95% uptime SLA'], 3.9, C.DEEP, C.WHITE],
    ];
    const cw = (SW - 2 * M - 2 * 0.24) / 3, base = 6.65;
    tiers.forEach(([n, p, unit, who, feats, hgt, fill, tc], i) => {
      const x = M + i * (cw + 0.24), y = base - hgt;
      t(s, who, { x, y: y - 1.95, w: cw, h: 0.3, size: 10.5, color: C.STONE });
      feats.forEach((f, k) => {
        icon(s, 'Check', x, y - 1.55 + k * 0.4, 0.2, C.COBALT);
        t(s, f, { x: x + 0.32, y: y - 1.57 + k * 0.4, w: cw - 0.4, h: 0.26, size: 10.5 });
      });
      box(s, x, y, cw, hgt, { fill });
      t(s, n.toUpperCase(), { x: x + 0.3, y: y + 0.25, w: cw - 0.6, h: 0.22, size: 9, bold: true, charSpacing: 2, color: tc });
      t(s, p, { x: x + 0.3, y: y + 0.5, w: cw - 0.6, h: 0.75, size: 40, bold: true, color: i === 1 ? C.WHITE : tc });
      t(s, unit, { x: x + 0.3, y: y + 1.25, w: cw - 0.6, h: 0.25, size: 9.5, color: i === 0 ? C.DEEP : C.SKY });
      if (i === 1) chip(s, x + cw - 1.45, y + 0.25, 'Most chosen', { variant: 'coral', w: 1.15 });
    });
    s.addNotes('PRICING STRATEGY. Stepped price ladder: tier blocks rise in height with value. All blocks are editable rectangles; feature lists sit above each step.');
  }

  // 54 Feature comparison — native table
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Feature comparison: what each tier includes');
    const cols = ['Feature', 'Essential', 'Growth', 'Enterprise'];
    const rows = [['Analytics dashboards', '✓', '✓', '✓'], ['Planning and forecasting', '—', '✓', '✓'], ['AI scenario planning', '—', '✓', '✓'], ['Data connectors', '40', '140+', '140+ and custom'], ['Users included', 'Up to 25', 'Up to 250', 'Unlimited'], ['EU data residency', '—', '—', '✓'], ['SSO and audit log', '—', '✓', '✓'], ['Support', 'Email', 'Named manager', '24/7 and TAM'], ['Uptime SLA', '99.5%', '99.9%', '99.95%']];
    const hi = 2;
    const head = cols.map((c, i) => ({ text: c, options: { fontFace: F.SERIF, fontSize: 15, color: i === hi ? C.WHITE : C.INK, fill: { color: i === hi ? C.CORAL : C.WHITE }, align: i ? 'center' : 'left', valign: 'middle', border: HB } }));
    const body = rows.map(r => r.map((c, i) => ({ text: c, options: { fontSize: c === '✓' ? 13 : 10.5, bold: i === 0 || c === '✓', color: c === '—' ? C.MIST : i === hi ? C.DEEP : c === '✓' ? C.COBALT : C.INK, fill: { color: i === hi ? 'FFF1EC' : C.WHITE }, align: i ? 'center' : 'left', valign: 'middle', border: NB } })));
    s.addTable([head, ...body], { x: M, y: 1.95, w: SW - 2 * M, colW: [4.1, 2.61, 2.61, 2.613], rowH: [0.55, ...Array(rows.length).fill(0.45)], fontFace: F.SANS, margin: [0, 0.15, 0, 0.15] });
    s.addNotes('FEATURE COMPARISON. Native table; the recommended tier column has a coral header and a light coral fill.');
  }

  // 55 Marketing funnel — horizontal, left to right
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Marketing funnel: content drives the top, events close the gap', { lead: 'Fiscal 2026. Bars run left to right; height is proportional to volume.' });
    const st = [['Reach', '2.4M', 1.0, 'Impressions'], ['Visits', '186K', 0.78, 'Website sessions'], ['Leads', '9,450', 0.58, 'Form fills, events'], ['MQLs', '3,120', 0.42, 'Scored and qualified'], ['SQLs', '1,490', 0.3, 'Accepted by sales']];
    const n = st.length, gap = 0.55, bw = (SW - 2 * M - gap * (n - 1)) / n, cy = 4.1, Hmax = 3.2;
    const conv = ['7.8%', '5.1%', '33%', '48%'];
    st.forEach(([nm, v, k, d], i) => {
      const x = M + i * (bw + gap), hh = Hmax * k;
      box(s, x, cy - hh / 2, bw, hh, { fill: i === n - 1 ? C.CORAL : i % 2 ? C.COBALT : C.DEEP });
      t(s, v, { x: x + 0.2, y: cy - 0.35, w: bw - 0.4, h: 0.45, size: 22, bold: true, color: C.WHITE });
      t(s, nm.toUpperCase(), { x: x + 0.2, y: cy + 0.08, w: bw - 0.4, h: 0.22, size: 8.5, bold: true, charSpacing: 1.5, color: i === n - 1 ? C.WHITE : C.SKY });
      t(s, d, { x, y: cy + Hmax / 2 + 0.15, w: bw, h: 0.25, size: 9.5, color: C.STONE });
      if (i < n - 1) {
        L.arrow(s, x + bw + 0.08, cy, gap - 0.16, 0, { color: C.INK, lw: 1 });
        chip(s, x + bw + gap / 2 - 0.36, cy - 0.55, conv[i], { variant: i === 2 ? 'coral' : 'white', w: 0.72, h: 0.26, size: 8 });
      }
    });
    t(s, 'Cost per SQL fell 22% to $412 as events replaced paid search.', { x: M, y: 6.3, w: 9, h: 0.3, size: 11, bold: true, color: C.COBALT });
    s.addNotes('MARKETING FUNNEL. Horizontal funnel of editable rectangles (height ∝ volume, compressed) with conversion chips between stages.');
  }

  // 56 Campaign performance dashboard — marketing dashboard
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Campaign dashboard: “Plan with Confidence” beat every goal', { lead: '12-week integrated campaign, Q3 2026.' });
    const k = [['Pipeline', '$8.6M', '43%', 'vs goal'], ['Leads', '2,940', '18%', 'vs goal'], ['Cost per lead', '$118', '21%', 'lower'], ['ROI', '7.4×', '2.1×', 'vs goal']];
    const kw = (SW - 2 * M - 3 * 0.2) / 4;
    k.forEach(([l, v, d, n], i) => {
      const x = M + i * (kw + 0.2);
      box(s, x, 1.95, kw, 1.25, { fill: i === 0 ? C.DEEP : C.IVORY });
      kpi(s, x + 0.25, 2.1, kw - 0.5, { label: l, value: v, delta: d, note: n, size: 22, dark: i === 0, color: i === 0 ? C.CORAL : C.INK });
    });
    const y = 3.4, h = 3.25, w1 = gw(8) - 0.05;
    const p1 = panel(s, M, y, w1, h, { title: 'Weekly leads by source', fill: C.IVORY });
    const wk = Array.from({ length: 12 }, (_, i) => 'W' + (i + 1));
    legend(s, M + w1 - 4.0, y + 0.2, [['Content', C.COBALT, 'line'], ['Events', C.CORAL, 'line'], ['Paid', C.SKY, 'line']]);
    s.addChart(pres.charts.LINE, [
      { name: 'Content', labels: wk, values: [60, 82, 95, 110, 118, 124, 131, 128, 140, 146, 150, 158] },
      { name: 'Events', labels: wk, values: [20, 24, 30, 26, 80, 96, 40, 34, 38, 102, 118, 60] },
      { name: 'Paid', labels: wk, values: [40, 44, 46, 42, 45, 48, 44, 43, 46, 47, 45, 44] },
    ], cb({ x: p1.x, y: p1.y, w: p1.w, h: p1.h, bg: C.IVORY, extra: { chartColors: [C.COBALT, C.CORAL, C.SKY], lineSize: 2.25, lineDataSymbol: 'none', valAxisMinVal: 0, valAxisMaxVal: 180, valAxisMajorUnit: 60 } }));
    const x2 = M + w1 + 0.2, w2 = SW - M - x2;
    const p2 = panel(s, x2, y, w2, h, { title: 'Spend by channel', fill: C.IVORY });
    const sp = [['Events', 42], ['Content', 31], ['Paid', 27]];
    s.addChart(pres.charts.DOUGHNUT, [{ name: 'Spend', labels: sp.map(a => a[0]), values: sp.map(a => a[1]) }], cb({ x: p2.x, y: p2.y, w: p2.w * 0.55, h: p2.h, bg: C.IVORY, extra: { holeSize: 60, chartColors: [C.CORAL, C.COBALT, C.SKY], showLegend: false, dataBorder: { pt: 2, color: C.IVORY } } }));
    sp.forEach(([n, v], i) => {
      const yy = p2.y + 0.55 + i * 0.6, lx = p2.x + p2.w * 0.58;
      box(s, lx, yy + 0.05, 0.13, 0.13, { fill: [C.CORAL, C.COBALT, C.SKY][i] });
      t(s, n, { x: lx + 0.22, y: yy, w: 1.2, h: 0.22, size: 9.5 });
      t(s, v + '%', { x: lx + 0.22, y: yy + 0.22, w: 1.2, h: 0.22, size: 10, bold: true });
    });
    s.addNotes('CAMPAIGN DASHBOARD. Marketing dashboard: KPI tiles, a native multi-series line chart and a native doughnut.');
  }
};
