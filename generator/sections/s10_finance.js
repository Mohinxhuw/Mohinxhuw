// Finance
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, footnote, chartBase } = L;
  const SEC = '09 · Finance';
  const B = (c) => [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: c || C.MIST }, { type: 'none' }];

  // Revenue — big number + line/area
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Revenue has grown 5.4× in five years');
    const lx = M, lw = gw(3);
    t(s, 'FY2026 REVENUE (FORECAST)', { x: lx, y: 2.1, w: lw, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    t(s, '$43.8M', { x: lx, y: 2.4, w: lw + 0.3, h: 0.9, font: F.DISP, size: 44, color: C.NAVY });
    pill(s, lx, 3.35, '▲ 59% YoY', { variant: 'lime', w: 1.25 });
    line(s, lx, 4.0, lw, 0, { color: C.MIST });
    [['5-year CAGR', '40%'], ['Recurring share', '88%'], ['Largest customer', '2.1%']].forEach(([k, v], i) => {
      const y = 4.2 + i * 0.75;
      t(s, k, { x: lx, y, w: lw, h: 0.25, size: 10, color: C.SLATE });
      t(s, v, { x: lx, y: y + 0.25, w: lw, h: 0.4, font: F.HEAD, bold: true, size: 17, color: C.NAVY });
    });
    const x = gx(3) + 0.1, w = SW - M - x;
    card(s, x, 2.05, w, 4.55, { fill: C.OFF });
    t(s, 'Annual revenue, $M', { x: x + 0.3, y: 2.25, w: 4, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    const ry = ['2021', '2022', '2023', '2024', '2025', '2026F'], rv = [8.1, 11.9, 16.3, 18.9, 27.5, 43.8];
    s.addChart([
      { type: pres.charts.AREA, data: [{ name: 'Revenue area', labels: ry, values: rv }], options: { chartColors: [C.STEEL], chartColorsOpacity: 25 } },
      { type: pres.charts.LINE, data: [{ name: 'Revenue', labels: ry, values: rv }], options: { chartColors: [C.NAVY], lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 8, showValue: true, dataLabelPosition: 't', dataLabelFormatCode: '"$"0.0' } },
    ], chartBase({ x: x + 0.15, y: 2.65, w: w - 0.3, h: 3.8, bg: C.OFF, extra: { valAxisLabelFormatCode: '$0', valAxisMaxVal: 50, valAxisMinVal: 0, valAxisMajorUnit: 10 } }));
    s.addNotes('REVENUE. Combination chart: a translucent area series plus a line series with labelled points. Edit Data updates both series (keep them identical).');
  }

  // Expenses — horizontal bars + % of revenue
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Operating expenses: R&D is our largest investment', { lead: 'FY2026 operating expenses, $M, and share of revenue.' });
    const x = M, w = gw(8);
    card(s, x, 2.05, w, 4.55, { fill: C.WHITE });
    const cats = ['Research & development', 'Sales', 'Marketing', 'Customer success', 'General & admin', 'Facilities & IT'];
    s.addChart(pres.charts.BAR, [
      { name: 'FY2025', labels: cats, values: [9.8, 7.9, 4.6, 3.1, 3.4, 1.6] },
      { name: 'FY2026', labels: cats, values: [14.2, 11.3, 6.2, 4.4, 4.1, 1.9] },
    ], chartBase({ x: x + 0.2, y: 2.2, w: w - 0.4, h: 4.3, extra: {
      barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [C.MIST, C.NAVY], barGapWidthPct: 55, barOverlapPct: -5, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '"$"0.0', valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, showLegend: true, legendPos: 't', catAxisLabelColor: C.CHAR, catAxisLabelFontSize: 10,
    } }));
    const rx = gx(8) + 0.25, rw = SW - M - rx;
    card(s, rx, 2.05, rw, 2.2, { fill: C.NAVY });
    t(s, 'Total OPEX', { x: rx + 0.3, y: 2.3, w: rw - 0.6, h: 0.25, font: F.MED, size: 10, color: C.MIST });
    t(s, '$42.1M', { x: rx + 0.3, y: 2.6, w: rw - 0.6, h: 0.7, font: F.DISP, size: 34, color: C.WHITE });
    t(s, '96% of revenue, down from 112% in FY2025', { x: rx + 0.3, y: 3.4, w: rw - 0.6, h: 0.6, size: 10.5, color: C.LIME });
    t(s, 'SHARE OF REVENUE', { x: rx, y: 4.5, w: rw, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    [['R&D', 32], ['Sales & marketing', 40], ['G&A', 9]].forEach(([k, p], i) => {
      const y = 4.85 + i * 0.58;
      t(s, k, { x: rx, y, w: rw - 0.8, h: 0.22, size: 10, color: C.CHAR });
      t(s, p + '%', { x: rx + rw - 0.8, y, w: 0.8, h: 0.22, font: F.MED, size: 10, color: C.NAVY, align: 'right' });
      rect(s, rx, y + 0.28, rw, 0.09, { fill: C.WHITE, radius: 0.045 });
      rect(s, rx, y + 0.28, rw * p / 100, 0.09, { fill: C.NAVY, radius: 0.045 });
    });
    s.addNotes('EXPENSES. Clustered horizontal bars compare two fiscal years by category. Progress bars on the right show share of revenue.');
  }

  // Profit bridge — waterfall via stacked columns
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'From revenue to EBITDA: the FY2026 profit bridge', { lead: 'FY2026 forecast, $M. First positive EBITDA year in company history.' });
    const lab = ['Revenue', 'Cost of revenue', 'Gross profit', 'Sales & marketing', 'R&D', 'G&A', 'EBITDA'];
    const base = [0, 34.2, 0, 16.7, 2.5, 0.4, 0];
    const val = [43.8, 9.6, 34.2, 17.5, 14.2, 2.1, 0.4];
    const x = M, w = gw(9);
    s.addChart(pres.charts.BAR, [
      { name: 'Base', labels: lab, values: base },
      { name: 'Value', labels: lab, values: val },
    ], chartBase({ x, y: 2.05, w, h: 4.55, extra: {
      barDir: 'col', barGrouping: 'stacked', chartColors: [C.WHITE, C.NAVY], barGapWidthPct: 35, valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLabelFontSize: 9.5, valAxisMaxVal: 48, valAxisMinVal: 0, layout: { x: 0.02, y: 0.1, w: 0.96, h: 0.8 },
    } }));
    // value labels (shapes, positioned over bars)
    const plotX = x + 0.02 * w, plotW = 0.96 * w, plotY = 2.05 + 0.1 * 4.55, plotH = 0.8 * 4.55;
    const sign = ['', '−', '', '−', '−', '−', ''];
    val.forEach((v, i) => {
      const cx = plotX + plotW * (i + 0.5) / lab.length;
      const top = plotY + plotH * (1 - (base[i] + v) / 48);
      t(s, sign[i] + '$' + v.toFixed(1), { x: cx - 0.6, y: top - 0.32, w: 1.2, h: 0.28, font: F.HEAD, bold: true, size: 11, color: C.NAVY, align: 'center' });
    });
    const rx = gx(9) + 0.3, rw = SW - M - rx;
    card(s, rx, 2.05, rw, 1.9, { fill: C.LIME });
    t(s, 'EBITDA margin', { x: rx + 0.3, y: 2.3, w: rw - 0.6, h: 0.25, font: F.MED, size: 10, color: C.NAVY });
    t(s, '0.9%', { x: rx + 0.3, y: 2.6, w: rw - 0.6, h: 0.7, font: F.DISP, size: 36, color: C.NAVY });
    t(s, 'up from −14.6% in FY2025', { x: rx + 0.3, y: 3.35, w: rw - 0.6, h: 0.3, size: 10.5, color: C.NAVY });
    card(s, rx, 4.2, rw, 2.4, { fill: C.OFF });
    t(s, 'Gross margin', { x: rx + 0.3, y: 4.45, w: rw - 0.6, h: 0.25, font: F.MED, size: 10, color: C.SLATE });
    t(s, '78.1%', { x: rx + 0.3, y: 4.75, w: rw - 0.6, h: 0.55, font: F.DISP, size: 26, color: C.NAVY });
    t(s, 'Hosting efficiency offsets higher services mix.', { x: rx + 0.3, y: 5.4, w: rw - 0.6, h: 0.8, size: 10.5, color: C.SLATE, lineSpacingMultiple: 1.2 });
    s.addNotes('WATERFALL / PROFIT BRIDGE. Built as a native stacked column chart: the first series ("Base") is white and invisible, the second holds the visible values. Update Base = running total after each step. Value labels are text boxes.');
  }

  // Financial forecast — chart + native table
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Five-year forecast: $150M revenue and 22% EBITDA by 2030');
    const yrs = ['2025A', '2026F', '2027F', '2028F', '2029F', '2030F'];
    const x = M, w = gw(5);
    card(s, x, 2.05, w, 4.55, { fill: C.OFF });
    t(s, 'Revenue, $M', { x: x + 0.3, y: 2.25, w: 3, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    s.addChart(pres.charts.BAR, [{ name: 'Revenue', labels: yrs, values: [27.5, 43.8, 66.0, 92.5, 121.0, 150.2] }], chartBase({
      x: x + 0.1, y: 2.65, w: w - 0.2, h: 3.85, bg: C.OFF, extra: { barDir: 'col', chartColors: [C.NAVY, C.STEEL, C.MIST, C.MIST, C.MIST, C.MIST], barGapWidthPct: 45, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0', valAxisHidden: true, valGridLine: { style: 'none' } },
    }));
    const tx = gx(5), tw = SW - M - tx;
    const rows = [
      ['$M', ...yrs],
      ['Revenue', '27.5', '43.8', '66.0', '92.5', '121.0', '150.2'],
      ['Growth', '46%', '59%', '51%', '40%', '31%', '24%'],
      ['Gross profit', '21.1', '34.2', '52.1', '74.0', '97.8', '122.4'],
      ['Gross margin', '77%', '78%', '79%', '80%', '81%', '81%'],
      ['Operating expenses', '25.1', '33.8', '47.5', '61.1', '74.9', '89.4'],
      ['EBITDA', '−4.0', '0.4', '4.6', '12.9', '22.9', '33.0'],
      ['EBITDA margin', '−15%', '1%', '7%', '14%', '19%', '22%'],
    ];
    const tbl = rows.map((r, ri) => r.map((c, ci) => {
      const head = ri === 0, key = ri === 1 || ri === 6;
      return { text: c, options: {
        fontFace: head ? F.MED : (key ? F.HEAD : F.BODY), bold: key && !head, fontSize: head ? 9.5 : 11,
        color: head ? (ci === 0 ? C.SLATE : C.NAVY) : (ri === 2 || ri === 4 || ri === 7 ? C.SLATE : C.NAVY),
        fill: { color: ci === 2 && !head ? C.OFF : C.WHITE }, align: ci === 0 ? 'left' : 'right', valign: 'middle',
        border: head ? B(C.NAVY) : B(),
      } };
    }));
    s.addTable(tbl, { x: tx, y: 2.05, w: tw, colW: [2.05, ...Array(6).fill((tw - 2.05) / 6)], rowH: 0.5, margin: [0, 0.1, 0, 0.1] });
    t(s, 'A = actual, F = forecast. Shaded column = current year.', { x: tx, y: 6.3, w: tw, h: 0.25, size: 8.5, color: C.SLATE });
    s.addNotes('FINANCIAL FORECAST. Column chart + native table. Table cells are editable directly; the shaded column highlights the current year.');
  }

  // Budget allocation — donut + table
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'How we will allocate the $65M Series B', { lead: 'Use of funds over 24 months.' });
    const alloc = [['Product & engineering', 26.0, 40, 'AI roadmap, 60 engineers'], ['Go-to-market expansion', 19.5, 30, 'US, France, Australia'], ['Partner ecosystem', 9.75, 15, 'Marketplace, alliances'], ['Customer success', 6.5, 10, 'Named CSMs, support'], ['Working capital', 3.25, 5, 'Buffer and M&A option']];
    const cols = [C.NAVY, C.LIME, C.STEEL, C.SLATE, C.MIST];
    const x = M, w = gw(5);
    card(s, x, 2.05, w, 4.55, { fill: C.WHITE });
    s.addChart(pres.charts.DOUGHNUT, [{ name: 'Use of funds', labels: alloc.map(a => a[0]), values: alloc.map(a => a[2]) }], chartBase({
      x: x + 0.3, y: 2.25, w: w - 0.6, h: 4.15, extra: { holeSize: 60, chartColors: cols, showPercent: false, showValue: false, dataLabelColor: C.WHITE, dataLabelFontSize: 10, showLegend: false, dataBorder: { pt: 1.5, color: C.WHITE } },
    }));
    t(s, '$65M', { x: x + w / 2 - 1.1, y: 4.0, w: 2.2, h: 0.5, font: F.DISP, size: 24, color: C.NAVY, align: 'center' });
    t(s, 'total raise', { x: x + w / 2 - 1.1, y: 4.48, w: 2.2, h: 0.25, size: 10, color: C.SLATE, align: 'center' });
    const tx = gx(5) + 0.3, tw = SW - M - tx;
    alloc.forEach(([n, v, p, d], i) => {
      const y = 2.05 + i * 0.91;
      card(s, tx, y, tw, 0.78, { fill: C.WHITE });
      rect(s, tx + 0.25, y + 0.29, 0.2, 0.2, { fill: cols[i], radius: 0.04 });
      t(s, n, { x: tx + 0.65, y: y + 0.12, w: 3.6, h: 0.28, font: F.HEAD, bold: true, size: 12.5, color: C.NAVY });
      t(s, d, { x: tx + 0.65, y: y + 0.42, w: 3.6, h: 0.24, size: 10, color: C.SLATE });
      t(s, '$' + v.toFixed(1) + 'M', { x: tx + tw - 2.6, y, w: 1.3, h: 0.78, font: F.HEAD, bold: true, size: 14, color: C.NAVY, align: 'right', valign: 'middle' });
      pill(s, tx + tw - 1.05, y + 0.24, p + '%', { variant: i === 0 ? 'navy' : 'off', w: 0.8, h: 0.3 });
    });
    s.addNotes('BUDGET ALLOCATION. Native doughnut with percentage labels plus an allocation list. Keep list order and colours matched to the chart.');
  }

  // Pricing — three tiers
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Simple, seat-based pricing that scales with the team');
    const tiers = [
      ['Starter', '$39', 'For small teams getting forecasting right.', ['Pipeline views', 'Basic forecasting', 'CRM sync', 'Email support'], 'Start free trial', false],
      ['Growth', '$79', 'For scaling teams that need AI and coaching.', ['Everything in Starter', 'AI deal scoring', 'Forecast roll-ups', 'Coaching insights', 'Named CSM'], 'Book a demo', true],
      ['Enterprise', 'Custom', 'For complex orgs with advanced controls.', ['Everything in Growth', 'SSO & SCIM', 'Data residency', 'Custom objects', '99.95% SLA'], 'Contact sales', false],
    ];
    const cw = gw(4);
    tiers.forEach(([n, p, d, feats, cta, hi], i) => {
      const x = gx(i * 4), y = hi ? 1.9 : 2.05, h = hi ? 4.7 : 4.55;
      card(s, x, y, cw, h, { fill: hi ? C.NAVY : C.WHITE, line: hi ? undefined : C.MIST });
      t(s, n, { x: x + 0.35, y: y + 0.3, w: 2.5, h: 0.35, font: F.HEAD, bold: true, size: 16, color: hi ? C.WHITE : C.NAVY });
      if (hi) pill(s, x + cw - 1.55, y + 0.32, 'Most popular', { variant: 'lime', w: 1.25 });
      t(s, [{ text: p, options: { fontFace: F.DISP, fontSize: 36, color: hi ? C.LIME : C.NAVY } }, { text: p === 'Custom' ? '' : '  / seat / month', options: { fontSize: 10.5, color: hi ? C.MIST : C.SLATE } }], { x: x + 0.35, y: y + 0.75, w: cw - 0.7, h: 0.75, valign: 'bottom' });
      t(s, d, { x: x + 0.35, y: y + 1.6, w: cw - 0.7, h: 0.5, size: 10.5, color: hi ? C.MIST : C.SLATE, lineSpacingMultiple: 1.2 });
      line(s, x + 0.35, y + 2.15, cw - 0.7, 0, { color: hi ? C.NAVY2 : C.MIST, lw: 1 });
      feats.forEach((f, k) => {
        const fy = y + 2.3 + k * 0.3;
        icon(s, 'PiCheck', x + 0.35, fy + 0.03, 0.18, hi ? C.LIME : C.NAVY);
        t(s, f, { x: x + 0.65, y: fy, w: cw - 1, h: 0.26, size: 10.5, color: hi ? C.WHITE : C.CHAR });
      });
      rect(s, x + 0.35, y + h - 0.72, cw - 0.7, 0.46, { fill: hi ? C.LIME : C.WHITE, line: hi ? undefined : C.NAVY, radius: 0.23 });
      t(s, cta, { x: x + 0.35, y: y + h - 0.72, w: cw - 0.7, h: 0.46, font: F.MED, size: 11, color: C.NAVY, align: 'center', valign: 'middle' });
    });
    s.addNotes('PRICING. Three-tier pricing cards; the recommended tier is raised, navy and flagged "Most popular". Buttons are rounded rectangles with text.');
  }

  // Unit economics — equation layout
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Unit economics: every $1 of acquisition returns $4.80', { lead: 'Mid-market cohort, trailing 12 months.' });
    const y = 2.2, h = 2.1;
    const blocks = [
      ['Customer lifetime value', '$86.4K', 'ACV $41K × 78% GM × 2.7-yr life', C.OFF],
      ['Customer acquisition cost', '$18.2K', 'Blended S&M ÷ new customers', C.OFF],
      ['LTV : CAC', '4.8×', 'Benchmark for top-quartile SaaS: 3.0×', C.NAVY],
    ];
    const bw = gw(3) + 0.35, opW = 0.75;
    let x = M;
    blocks.forEach(([k, v, d, fill], i) => {
      const dark = fill === C.NAVY;
      const w = i === 2 ? SW - M - x : bw;
      card(s, x, y, w, h, { fill });
      t(s, k, { x: x + 0.3, y: y + 0.28, w: w - 0.6, h: 0.25, font: F.MED, size: 10.5, color: dark ? C.MIST : C.SLATE });
      t(s, v, { x: x + 0.3, y: y + 0.65, w: w - 0.6, h: 0.8, font: F.DISP, size: 42, color: dark ? C.LIME : C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.5, w: w - 0.6, h: 0.4, size: 10, color: dark ? C.MIST : C.SLATE });
      x += w;
      if (i < 2) {
        oval(s, x + opW / 2 - 0.25, y + h / 2 - 0.25, 0.5, { fill: C.LIME });
        t(s, i === 0 ? '÷' : '=', { x: x + opW / 2 - 0.25, y: y + h / 2 - 0.27, w: 0.5, h: 0.5, font: F.BODY, bold: true, size: 20, color: C.NAVY, align: 'center', valign: 'middle' });
        x += opW;
      }
    });
    const mets = [['CAC payback', '11 months', 'PiHourglass'], ['Gross margin', '78%', 'PiPercent'], ['Net revenue retention', '128%', 'PiArrowsClockwise'], ['Magic number', '1.3', 'PiSparkle']];
    const mw = (SW - 2 * M - 3 * 0.25) / 4;
    mets.forEach(([k, v, ic], i) => {
      const mx = M + i * (mw + 0.25), my = 4.65;
      line(s, mx, my, mw, 0, { color: C.NAVY, lw: 1.25 });
      icon(s, ic, mx, my + 0.3, 0.32, C.NAVY);
      t(s, v, { x: mx, y: my + 0.8, w: mw, h: 0.55, font: F.DISP, size: 26, color: C.NAVY });
      t(s, k, { x: mx, y: my + 1.35, w: mw, h: 0.3, size: 10.5, color: C.SLATE });
    });
    s.addNotes('UNIT ECONOMICS. Equation layout (LTV ÷ CAC = ratio) with supporting efficiency metrics underneath. Operator circles are shapes with text.');
  }

  // Revenue breakdown — treemap from shapes
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Revenue breakdown: Growth plan customers drive 54% of revenue', { lead: 'FY2026 revenue by plan and product line, $M.' });
    const x = M, y = 2.05, w = gw(9), h = 4.55, g = 0.08;
    // Treemap (manual squarified layout)
    const tiles = [
      [0, 0, 0.54, 1, 'Growth plan', '$23.7M', '54%', C.NAVY, C.WHITE, C.LIME],
      [0.54, 0, 0.46, 0.58, 'Enterprise plan', '$11.4M', '26%', C.STEEL, C.WHITE, C.WHITE],
      [0.54, 0.58, 0.184, 0.42, 'Starter plan', '$3.5M', '8%', C.MIST, C.NAVY, C.NAVY],
      [0.724, 0.58, 0.276, 0.245, 'Services', '$3.2M', '7%', C.LIME, C.NAVY, C.NAVY],
      [0.724, 0.825, 0.276, 0.175, 'Marketplace', '$2.0M', '5%', C.WHITE, C.NAVY, C.NAVY],
    ];
    tiles.forEach(([tx, ty, tw, th, n, v, p, fill, tc, pc]) => {
      const X = x + tx * w + (tx ? g / 2 : 0), Y = y + ty * h + (ty ? g / 2 : 0);
      const W = tw * w - (tx ? g / 2 : 0) - (tx + tw < 0.999 ? g / 2 : 0), H = th * h - (ty ? g / 2 : 0) - (ty + th < 0.999 ? g / 2 : 0);
      rect(s, X, Y, W, H, { fill, radius: 0.08 });
      const big = W > 3 && H > 2;
      t(s, n, { x: X + 0.25, y: Y + 0.2, w: W - 0.5, h: 0.28, font: F.HEAD, bold: true, size: big ? 14 : 11, color: tc });
      if (H > 1.3) t(s, v, { x: X + 0.25, y: Y + (big ? 0.55 : 0.45), w: W - 0.5, h: big ? 0.8 : 0.4, font: F.DISP, size: big ? 40 : 16, color: tc });
      else t(s, v, { x: X + W - 1.25, y: Y + 0.2, w: 1.0, h: 0.28, font: F.HEAD, bold: true, size: 11, color: tc, align: 'right' });
      if (H > 1.3) t(s, p + ' of revenue', { x: X + 0.25, y: Y + H - 0.45, w: W - 0.5, h: 0.25, font: F.MED, size: 10, color: pc });
    });
    const rx = gx(9) + 0.3, rw = SW - M - rx;
    t(s, '$43.8M', { x: rx, y: 2.05, w: rw, h: 0.7, font: F.DISP, size: 34, color: C.NAVY });
    t(s, 'FY2026 revenue (forecast)', { x: rx, y: 2.75, w: rw, h: 0.3, size: 10.5, color: C.SLATE });
    line(s, rx, 3.3, rw, 0, { color: C.MIST });
    [['Subscription', '88%'], ['Services', '7%'], ['Marketplace', '5%']].forEach(([k, v], i) => {
      const yy = 3.5 + i * 0.55;
      t(s, k, { x: rx, y: yy, w: rw - 0.8, h: 0.3, size: 11, color: C.CHAR });
      t(s, v, { x: rx + rw - 0.8, y: yy, w: 0.8, h: 0.3, font: F.HEAD, bold: true, size: 12, color: C.NAVY, align: 'right' });
    });
    t(s, 'Tile area is proportional to revenue.', { x: rx, y: 6.3, w: rw, h: 0.25, size: 8.5, color: C.SLATE });
    s.addNotes('REVENUE BREAKDOWN. Treemap built from rectangles (area ∝ value). To update, resize tiles so each area matches its share; keep the 0.08" gutter.');
  }
};
