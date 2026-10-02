// 29–36 Sales
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, box, circ, rule, vrule, eyebrow, header, chip, iconDot, kpi, numeral, cb, legend, icon, panel, callout, footnote, dashedLines } = L;
  const SEC = 'Sales';
  const NB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.75, color: C.RULE }, { type: 'none' }];
  const HB = [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1, color: C.INK }, { type: 'none' }];

  // 29 Sales funnel — native centred funnel (stacked bar with invisible offset)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Sales funnel: 6.8% of leads become customers', { lead: 'Trailing twelve months. Centred bars are a native stacked bar chart.' });
    const st = ['Leads', 'Qualified leads', 'Discovery calls', 'Proposals', 'Negotiation', 'Closed won'];
    const v = [3120, 1490, 820, 460, 290, 212], mx = v[0];
    const x0 = M, y = 1.95, h = 4.7, x = M + 1.75, w = gw(8) + 0.2 - 1.75, lay = { x: 0.01, y: 0.02, w: 0.98, h: 0.96 };
    s.addChart(pres.charts.BAR, [{ name: 'Offset', labels: st, values: v.map(a => (mx - a) / 2) }, { name: 'Volume', labels: st, values: v }], cb({ x, y, w, h, extra: {
      barDir: 'bar', barGrouping: 'stacked', catAxisOrientation: 'maxMin', chartColors: [C.WHITE, C.COBALT], barGapWidthPct: 22, valAxisHidden: true, catAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, valAxisMinVal: 0, valAxisMaxVal: mx, layout: lay } }));
    const rowH = h * lay.h / st.length;
    st.forEach((n, i) => {
      const cy = y + h * lay.y + rowH * (i + 0.5);
      t(s, n, { x: x0, y: cy - 0.15, w: 1.6, h: 0.3, size: 10.5, color: C.INK, align: 'right', valign: 'middle' });
      const cxm = x + w * (lay.x + lay.w / 2);
      const bw = w * lay.w * v[i] / mx;
      if (bw > 1.1) t(s, v[i].toLocaleString('en-US'), { x: cxm - 0.8, y: cy - 0.15, w: 1.6, h: 0.3, size: 12, bold: true, color: C.WHITE, align: 'center', valign: 'middle' });
      else t(s, v[i].toLocaleString('en-US'), { x: cxm + bw / 2 + 0.1, y: cy - 0.15, w: 1.0, h: 0.3, size: 12, bold: true, color: i === st.length - 1 ? C.CORALD : C.INK, valign: 'middle' });
      if (i > 0) chip(s, x + w + 0.15, cy - rowH / 2 - 0.14, Math.round(v[i] / v[i - 1] * 100) + '%', { variant: i === 2 ? 'coral' : 'outline', w: 0.7, h: 0.28 });
    });
    const rx = gx(9) + 0.6, rw = SW - M - rx;
    t(s, 'STAGE CONVERSION', { x: x + w + 0.15, y: 1.65, w: 2, h: 0.2, size: 8, bold: true, charSpacing: 1.6, color: C.STONE });
    box(s, rx, 2.4, rw, 3.6, { fill: C.DEEP });
    t(s, '55%', { x: rx + 0.25, y: 2.6, w: rw - 0.5, h: 0.8, size: 40, bold: true, color: C.CORAL });
    t(s, 'Qualified → discovery is our weakest step. A new SDR playbook targets 65%.', { x: rx + 0.25, y: 3.45, w: rw - 0.5, h: 1.2, size: 10.5, color: C.WHITE, lineSpacingMultiple: 1.3 });
    s.addNotes('SALES FUNNEL. Native stacked bar: the first series ("Offset" = (max − value) ÷ 2) is white and centres the funnel. Edit the "Volume" column, then update Offset.');
  }

  // 30 Sales pipeline — stacked bar by stage and segment + KPI strip
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Pipeline: $68M open, weighted to late stages');
    const k = [['Open pipeline', '$68.4M'], ['Weighted value', '$31.2M'], ['Coverage', '3.4×'], ['Avg. deal size', '$84K']];
    const kw = (SW - 2 * M) / 4;
    k.forEach(([l, v], i) => {
      box(s, M + i * kw + (i ? 0.12 : 0), 1.95, kw - 0.12, 1.0, { fill: i === 0 ? C.COBALT : C.WHITE });
      t(s, l.toUpperCase(), { x: M + i * kw + (i ? 0.12 : 0) + 0.25, y: 2.1, w: kw - 0.6, h: 0.2, size: 8, bold: true, charSpacing: 1.4, color: i === 0 ? C.SKY : C.STONE });
      t(s, v, { x: M + i * kw + (i ? 0.12 : 0) + 0.25, y: 2.33, w: kw - 0.6, h: 0.5, size: 24, bold: true, color: i === 0 ? C.WHITE : C.INK });
    });
    const stg = ['Discovery', 'Qualification', 'Solution', 'Proposal', 'Negotiation', 'Commit'];
    const ent = [6.2, 7.4, 8.1, 7.6, 5.9, 4.8], mid = [4.1, 4.6, 4.4, 3.9, 2.8, 2.2], smb = [1.6, 1.4, 1.2, 0.9, 0.7, 0.6];
    const x = M, y = 3.2, w = gw(9), h = 3.45, lay = { x: 0.17, y: 0.13, w: 0.7, h: 0.84 };
    box(s, x, y, w, h, { fill: C.WHITE });
    legend(s, x + 0.25, y + 0.1, [['Enterprise', C.DEEP], ['Mid-market', C.COBALT], ['SMB', C.SKY]]);
    s.addChart(pres.charts.BAR, [{ name: 'Enterprise', labels: stg, values: ent }, { name: 'Mid-market', labels: stg, values: mid }, { name: 'SMB', labels: stg, values: smb }], cb({ x, y, w, h, extra: {
      barDir: 'bar', barGrouping: 'stacked', catAxisOrientation: 'maxMin', chartColors: [C.DEEP, C.COBALT, C.SKY], barGapWidthPct: 40, valAxisHidden: true, catAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, valAxisMinVal: 0, valAxisMaxVal: 15, layout: lay } }));
    const rowH = h * lay.h / stg.length;
    stg.forEach((n, i) => {
      const tot = ent[i] + mid[i] + smb[i];
      const ex = x + w * (lay.x + lay.w * tot / 15);
      t(s, n, { x: x + 0.2, y: y + h * lay.y + rowH * i, w: w * lay.x - 0.3, h: rowH, size: 10, align: 'right', valign: 'middle' });
      t(s, '$' + tot.toFixed(1) + 'M', { x: ex + 0.08, y: y + h * lay.y + rowH * i, w: 0.9, h: rowH, size: 10, bold: true, valign: 'middle', color: i === 2 ? C.CORALD : C.INK });
    });
    const rx = gx(9) + 0.25, rw = SW - M - rx;
    t(s, 'Deals to watch', { x: rx, y: 3.2, w: rw, h: 0.3, font: F.SERIF, size: 16 });
    [['Arcwell Systems', '$1.4M', 'Negotiation'], ['Northgate Bank', '$1.1M', 'Proposal'], ['Ferro Logistics', '$0.9M', 'Commit'], ['Lumen Health', '$0.8M', 'Solution']].forEach(([n, v, st], i) => {
      const yy = 3.65 + i * 0.73;
      rule(s, rx, yy, rw, { color: C.RULE });
      t(s, n, { x: rx, y: yy + 0.1, w: rw - 0.9, h: 0.25, size: 10.5, bold: true });
      t(s, v, { x: rx + rw - 0.9, y: yy + 0.1, w: 0.9, h: 0.25, size: 10.5, bold: true, align: 'right', color: C.COBALT });
      t(s, st, { x: rx, y: yy + 0.38, w: rw, h: 0.22, size: 9, color: C.STONE });
    });
    s.addNotes('SALES PIPELINE. KPI strip plus a native stacked bar chart by stage and segment; stage totals are text boxes. Company names are fictional.');
  }

  // 31 Conversion rate — large KPI + multi-series line (Style E)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Conversion is rising fastest in the partner channel');
    t(s, 'LEAD-TO-CUSTOMER CONVERSION', { x: M, y: 2.1, w: gw(4), h: 0.2, size: 8, bold: true, charSpacing: 1.6, color: C.STONE });
    t(s, '6.8%', { x: M - 0.03, y: 2.35, w: gw(4), h: 1.2, size: 72, bold: true, color: C.COBALT });
    t(s, [{ text: '▲ 1.9 pts', options: { bold: true, color: C.CORALD } }, { text: '  vs 2025', options: { color: C.STONE } }], { x: M, y: 3.6, w: gw(4), h: 0.3, size: 11 });
    [['Partners', '11.2%', C.CORAL], ['Inbound', '7.4%', C.COBALT], ['Outbound', '3.1%', C.SKY]].forEach(([n, v, c], i) => {
      const y = 4.35 + i * 0.7;
      rule(s, M, y, gw(4), { color: C.RULE });
      box(s, M, y + 0.24, 0.3, 0.05, { fill: c });
      t(s, n, { x: M + 0.45, y: y + 0.12, w: 1.8, h: 0.3, size: 11 });
      t(s, v, { x: M + gw(4) - 1.2, y: y + 0.12, w: 1.2, h: 0.3, size: 13, bold: true, align: 'right' });
    });
    const x = gx(4) + 0.2, w = SW - M - x;
    box(s, x, 1.95, w, 4.7, { fill: C.IVORY });
    t(s, 'Monthly conversion rate by channel, %', { x: x + 0.3, y: 2.15, w: 5, h: 0.25, size: 10.5, bold: true });
    s.addChart(pres.charts.LINE, [
      { name: 'Partners', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [8.1, 8.4, 8.9, 9.2, 9.0, 9.8, 10.1, 10.4, 10.2, 10.8, 11.0, 11.2] },
      { name: 'Inbound', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [6.2, 6.3, 6.6, 6.5, 6.8, 6.9, 7.0, 7.1, 7.0, 7.2, 7.3, 7.4] },
      { name: 'Outbound', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [2.6, 2.7, 2.6, 2.8, 2.9, 2.8, 3.0, 2.9, 3.0, 3.1, 3.0, 3.1] },
    ], cb({ x: x + 0.1, y: 2.5, w: w - 0.2, h: 4.05, bg: C.IVORY, extra: { chartColors: [C.CORAL, C.COBALT, C.SKY], lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 5, valAxisMinVal: 0, valAxisMaxVal: 12, valAxisMajorUnit: 3, valAxisLabelFormatCode: '0"%"' } }));
    s.addNotes('CONVERSION RATE. Large KPI with channel breakdown, plus a native multi-series line chart.');
  }

  // 32 Revenue by channel — stacked area
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Revenue by channel: partners grew from 6% to 19% of sales', { lead: 'Quarterly new revenue by channel, $M.' });
    const q = ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26', 'Q4 26'];
    const x = M, w = gw(9);
    box(s, x, 1.95, w, 4.7, { fill: C.WHITE });
    legend(s, x + 0.3, 2.12, [['Direct sales', C.DEEP], ['Inbound', C.COBALT], ['Self-serve', C.SKY], ['Partners', C.CORAL]]);
    s.addChart(pres.charts.AREA, [
      { name: 'Direct sales', labels: q, values: [6.1, 6.3, 6.5, 7.0, 6.8, 7.1, 7.3, 7.4, 7.6, 7.9, 8.0, 8.3] },
      { name: 'Inbound', labels: q, values: [3.6, 3.8, 4.0, 4.3, 4.2, 4.5, 4.6, 4.7, 5.0, 5.2, 5.3, 5.6] },
      { name: 'Self-serve', labels: q, values: [2.7, 2.9, 3.0, 3.2, 3.1, 3.2, 3.3, 3.3, 3.4, 3.5, 3.5, 3.6] },
      { name: 'Partners', labels: q, values: [0.8, 1.1, 1.5, 1.9, 1.7, 2.1, 2.4, 2.6, 3.4, 4.0, 4.5, 5.4] },
    ], cb({ x: x + 0.1, y: 2.45, w: w - 0.2, h: 4.1, extra: { barGrouping: 'stacked', chartColors: [C.DEEP, C.COBALT, C.SKY, C.CORAL], valAxisLabelFormatCode: '$0', valAxisMaxVal: 25, valAxisMajorUnit: 5 } }));
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    [['Partners', '19%', '+13 pts', true], ['Direct sales', '36%', '−12 pts', false], ['Inbound', '24%', '+0 pts', false], ['Self-serve', '16%', '−7 pts', false]].forEach(([n, v, d, hi], i) => {
      const y = 1.95 + i * 1.18;
      box(s, rx, y, rw, 1.06, { fill: hi ? C.CORAL : C.WHITE });
      t(s, n, { x: rx + 0.25, y: y + 0.15, w: rw - 0.5, h: 0.22, size: 9.5, bold: true, color: hi ? C.WHITE : C.INK });
      t(s, v, { x: rx + 0.25, y: y + 0.42, w: 1.2, h: 0.5, size: 22, bold: true, color: hi ? C.WHITE : C.INK });
      t(s, d, { x: rx + rw - 1.25, y: y + 0.55, w: 1.0, h: 0.25, size: 9, color: hi ? C.WHITE : C.STONE, align: 'right' });
    });
    s.addNotes('REVENUE BY CHANNEL. Native stacked area chart; series order in the data sheet sets the stacking order (first = bottom).');
  }

  // 33 Sales forecast — actual/forecast columns + dashed target line
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'Sales forecast: $118M bookings in 2027, ahead of target', { lead: 'Quarterly bookings, $M. Actual 2026, forecast 2027, board target dashed.' });
    const q = ['Q1 26', 'Q2 26', 'Q3 26', 'Q4 26', 'Q1 27F', 'Q2 27F', 'Q3 27F', 'Q4 27F'];
    const act = [21.2, 23.0, 24.4, 27.8, null, null, null, null], fc = [null, null, null, null, 26.4, 28.9, 30.1, 32.6];
    const x = M - 0.1, w = gw(9) + 0.2;
    legend(s, M, 1.95, [['Actual', C.COBALT], ['Forecast', C.SKY], ['Target', C.CORAL, 'dash']]);
    s.addChart([
      { type: pres.charts.BAR, data: [{ name: 'Actual', labels: q, values: act }, { name: 'Forecast', labels: q, values: fc }], options: { barDir: 'col', chartColors: [C.COBALT, C.SKY], barGapWidthPct: 55, barOverlapPct: 100, showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0' } },
      { type: pres.charts.LINE, data: [{ name: 'Target', labels: q, values: [20, 22, 24, 26, 26, 28, 29, 31] }], options: { chartColors: [C.CORAL], lineSize: 2, lineDash: 'dash', lineDataSymbol: 'none' } },
    ], cb({ x, y: 2.3, w, h: 4.35, extra: { valAxisMinVal: 0, valAxisMaxVal: 36, valAxisMajorUnit: 9, valAxisLabelFormatCode: '$0' } }));
    const rx = gx(9) + 0.35, rw = SW - M - rx;
    box(s, rx, 1.95, rw, 4.7, { fill: C.DEEP });
    [['2027 forecast', '$118.0M', C.WHITE], ['Board target', '$114.0M', C.SKY], ['Confidence', '82%', C.CORAL]].forEach(([k, v, c], i) => {
      const y = 2.25 + i * 1.4;
      t(s, k.toUpperCase(), { x: rx + 0.3, y, w: rw - 0.6, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: C.SKY });
      t(s, v, { x: rx + 0.3, y: y + 0.25, w: rw - 0.6, h: 0.6, size: 28, bold: true, color: c });
      if (i < 2) rule(s, rx + 0.3, y + 1.1, rw - 0.6, { color: C.DEEP2, lw: 1 });
    });
    s.addNotes('SALES FORECAST. Native combination chart: overlapping Actual/Forecast column series (leave cells blank where not applicable) and a dashed target line.');
  }

  // 34 Territory performance — table with attainment heat cells
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Territory performance: four of seven teams at or above quota');
    const rows = [['UK & Ireland', 14.0, 15.8, 38, 48.2], ['DACH', 12.5, 13.6, 35, 41.0], ['Benelux', 8.0, 8.4, 33, 22.6], ['Nordics', 6.5, 6.6, 31, 19.4], ['France', 7.5, 6.9, 27, 18.1], ['US East', 11.0, 9.6, 29, 30.4], ['US West', 9.5, 7.8, 25, 26.9]];
    const cols = ['Territory', 'Quota $M', 'Bookings $M', 'Attainment', 'Win rate', 'Pipeline $M', 'Status'];
    const att = (r) => r[2] / r[1] * 100;
    const fillA = (a) => a >= 110 ? C.COBALT : a >= 100 ? '5A72DD' : a >= 90 ? C.PEACH : C.CORAL;
    const head = cols.map((c, i) => ({ text: c.toUpperCase(), options: { bold: true, fontSize: 8.5, charSpacing: 1.2, color: C.STONE, align: i ? 'center' : 'left', valign: 'middle', border: HB } }));
    const body = rows.map(r => {
      const a = att(r);
      return [
        { text: r[0], options: { bold: true, fontSize: 11, border: NB, valign: 'middle' } },
        { text: r[1].toFixed(1), options: { fontSize: 11, align: 'center', border: NB, valign: 'middle' } },
        { text: r[2].toFixed(1), options: { fontSize: 11, align: 'center', border: NB, valign: 'middle' } },
        { text: Math.round(a) + '%', options: { fontSize: 12, bold: true, align: 'center', valign: 'middle', color: a >= 100 || a < 90 ? C.WHITE : C.CORALD, fill: { color: fillA(a) }, border: [{ type: 'solid', pt: 3, color: C.IVORY }, { type: 'solid', pt: 3, color: C.IVORY }, { type: 'solid', pt: 3, color: C.IVORY }, { type: 'solid', pt: 3, color: C.IVORY }] } },
        { text: r[3] + '%', options: { fontSize: 11, align: 'center', border: NB, valign: 'middle' } },
        { text: r[4].toFixed(1), options: { fontSize: 11, align: 'center', border: NB, valign: 'middle' } },
        { text: a >= 100 ? 'On track' : a >= 90 ? 'Watch' : 'Off track', options: { fontSize: 10, bold: true, align: 'center', valign: 'middle', color: a >= 100 ? C.COBALT : C.CORALD, border: NB } },
      ];
    });
    s.addTable([head, ...body], { x: M, y: 2.0, w: SW - 2 * M, colW: [2.6, 1.5, 1.6, 1.7, 1.4, 1.6, 1.533], rowH: [0.45, ...Array(rows.length).fill(0.58)], fontFace: F.SANS, margin: [0, 0.12, 0, 0.12] });
    t(s, 'ATTAINMENT', { x: M, y: 6.56, w: 1.1, h: 0.2, size: 8, bold: true, charSpacing: 1.5, color: C.STONE });
    [['110%+', C.COBALT], ['100–109%', '5A72DD'], ['90–99%', C.PEACH], ['<90%', C.CORAL]].forEach(([k, c], i) => { box(s, M + 1.2 + i * 1.3, 6.58, 0.16, 0.16, { fill: c }); t(s, k, { x: M + 1.42 + i * 1.3, y: 6.55, w: 1.0, h: 0.22, size: 8.5 }); });
    s.addNotes('TERRITORY PERFORMANCE. Native table; the attainment column uses a four-band colour scale shown below the table.');
  }

  // 35 Customer acquisition — area + CAC line (combo, secondary axis)
  {
    const s = pres.addSlide({ masterName: L.L.WH });
    header(s, SEC, 'More customers at a lower cost: CAC down 18%', { lead: 'New customers per month (area) and blended CAC in $K (line, right axis).' });
    const mo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const x = gx(3) + 0.1, w = SW - M - x;
    legend(s, x, 1.95, [['New customers', C.SKY], ['CAC, $K', C.CORAL, 'line']]);
    s.addChart([
      { type: pres.charts.AREA, data: [{ name: 'New customers', labels: mo, values: [12, 13, 15, 14, 16, 18, 17, 19, 21, 22, 22, 25] }], options: { chartColors: [C.SKY] } },
      { type: pres.charts.LINE, data: [{ name: 'CAC', labels: mo, values: [25.6, 25.1, 24.4, 24.8, 23.9, 23.0, 23.4, 22.6, 21.9, 21.6, 21.3, 21.0] }], options: { chartColors: [C.CORAL], lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 6, secondaryValAxis: true, secondaryCatAxis: true } },
    ], cb({ x: x - 0.1, y: 2.3, w: w + 0.1, h: 4.35, extra: {
      valAxes: [{ showValAxisTitle: false, valAxisMinVal: 0, valAxisMaxVal: 30, valAxisMajorUnit: 10 }, { showValAxisTitle: false, valAxisMinVal: 15, valAxisMaxVal: 30, valAxisLabelFormatCode: '"$"0"K"', valGridLine: { style: 'none' } }],
      catAxes: [{ catAxisTitle: '' }, { catAxisHidden: true }] } }));
    [['212', 'new customers', C.COBALT], ['$21.0K', 'blended CAC (Dec)', C.CORALD], ['14 mo', 'CAC payback', C.INK]].forEach(([v, k, c], i) => {
      const y = 2.05 + i * 1.55;
      rule(s, M, y, gw(3) - 0.1, { color: i ? C.RULE : C.INK, lw: i ? 0.75 : 1 });
      t(s, v, { x: M, y: y + 0.2, w: gw(3), h: 0.65, size: 32, bold: true, color: c });
      t(s, k, { x: M, y: y + 0.85, w: gw(3), h: 0.25, size: 10, color: C.STONE });
    });
    s.addNotes('CUSTOMER ACQUISITION. Native combination chart: area series on the primary axis, CAC line on a secondary axis.');
  }

  // 36 Customer retention — cohort heatmap + retention curves
  {
    const s = pres.addSlide({ masterName: L.L.IV });
    header(s, SEC, 'Retention: newer cohorts keep more revenue', { lead: 'Net revenue retained by signing cohort, % of starting ARR.' });
    const cohorts = [['Q1 25', [100, 104, 108, 111, 115, 118]], ['Q2 25', [100, 105, 109, 113, 117]], ['Q3 25', [100, 106, 111, 116]], ['Q4 25', [100, 107, 113]], ['Q1 26', [100, 108]], ['Q2 26', [100]]];
    const shade = (v) => v >= 116 ? C.COBALT : v >= 111 ? '5A72DD' : v >= 106 ? C.SKY : v > 100 ? 'DCE3FA' : 'EEF1FC';
    const head = ['Cohort', 'Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'].map((c, i) => ({ text: c.toUpperCase(), options: { bold: true, fontSize: 8.5, color: C.STONE, align: i ? 'center' : 'left', valign: 'middle', border: HB } }));
    const cb4 = [{ type: 'solid', pt: 2.5, color: C.IVORY }, { type: 'solid', pt: 2.5, color: C.IVORY }, { type: 'solid', pt: 2.5, color: C.IVORY }, { type: 'solid', pt: 2.5, color: C.IVORY }];
    const body = cohorts.map(([n, v]) => [{ text: n, options: { bold: true, fontSize: 10.5, valign: 'middle', border: NB } }].concat([0, 1, 2, 3, 4, 5].map(i => v[i] === undefined ? { text: '', options: { border: cb4 } } :
      { text: v[i] + '%', options: { fontSize: 10, bold: true, align: 'center', valign: 'middle', color: v[i] >= 111 ? C.WHITE : C.DEEP, fill: { color: shade(v[i]) }, border: cb4 } })));
    const tw = gw(6) + 0.2;
    s.addTable([head, ...body], { x: M, y: 2.0, w: tw, colW: [1.3, ...Array(6).fill((tw - 1.3) / 6)], rowH: [0.42, ...Array(6).fill(0.62)], fontFace: F.SANS, margin: [0, 0.08, 0, 0.08] });
    const x = gx(6) + 0.45, w = SW - M - x;
    const p = panel(s, x, 1.95, w, 4.7, { title: 'Net revenue retention curves', sub: 'Selected cohorts, % of starting ARR' });
    s.addChart(pres.charts.LINE, [
      { name: 'Q1 25', labels: ['Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'], values: [100, 104, 108, 111, 115, 118] },
      { name: 'Q3 25', labels: ['Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'], values: [100, 106, 111, 116, null, null] },
      { name: 'Q1 26', labels: ['Q0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'], values: [100, 108, null, null, null, null] },
    ], cb({ x: p.x, y: p.y, w: p.w, h: p.h, extra: { chartColors: [C.SKY, C.COBALT, C.CORAL], lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 7, valAxisMinVal: 95, valAxisMaxVal: 120, valAxisMajorUnit: 5, valAxisLabelFormatCode: '0"%"', showLegend: true, legendPos: 'b' } }));
    s.addNotes('CUSTOMER RETENTION. Cohort heatmap as a native table (five-step cobalt scale) and a native line chart of retention curves.');
  }
};
