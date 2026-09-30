// Market
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, footnote, chartBase } = L;
  const SEC = '04 · Market';

  // Market overview — KPI row + line chart
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'A $38B market growing 19% a year through 2030', { lead: 'Global spend on revenue intelligence and sales analytics software.' });
    const k = [
      { label: 'Market size 2026', value: '$38B', delta: '19% CAGR', note: '2024–2030', icon: 'PiGlobe' },
      { label: 'Addressable buyers', value: '210K', delta: '8%', note: 'new companies / yr', icon: 'PiBuildings' },
      { label: 'Software share of spend', value: '34%', delta: '9 pts', note: 'since 2022', icon: 'PiChartPieSlice' },
    ];
    k.forEach((o, i) => kpi(s, M, 2.05 + i * 1.53, gw(4), 1.38, Object.assign({ variant: i === 0 ? 'navy' : 'off', valueSize: 24, pad: 0.22 }, o)));
    const x = gx(4), w = gw(8);
    t(s, 'Market size, $B', { x, y: 2.05, w: 4, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    rect(s, x + w - 3.0, 2.12, 0.3, 0.04, { fill: C.NAVY, square: true });
    t(s, 'Actual', { x: x + w - 2.62, y: 2.03, w: 0.8, h: 0.22, size: 9.5, color: C.CHAR });
    rect(s, x + w - 1.7, 2.12, 0.3, 0.04, { fill: C.SLATE, square: true });
    t(s, 'Forecast', { x: x + w - 1.32, y: 2.03, w: 1.3, h: 0.22, size: 9.5, color: C.CHAR });
    const lab = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
    L.dashedLineChart(pres, s, [
      { name: 'Actual', labels: lab, values: [14.2, 16.8, 19.9, 23.4, 27.1, 32.0, 38.0, null, null, null, null] },
      { name: 'Forecast', labels: lab, values: [null, null, null, null, null, null, 38.0, 45.1, 53.8, 64.0, 76.2] },
    ], [C.NAVY, C.SLATE], ['solid', 'dash'],
    { lineSize: 2.5, lineDataSymbol: 'circle', lineDataSymbolSize: 6, showValue: true, dataLabelPosition: 't', dataLabelFormatCode: '0' },
    chartBase({ x: x - 0.1, y: 2.45, w: w + 0.1, h: 4.15, extra: { valAxisLabelFormatCode: '$0', valAxisMaxVal: 80, valAxisMinVal: 0, valAxisMajorUnit: 20 } }));
    footnote(s, 'Source: industry analyst consensus; Corvanta analysis. Forecast values are illustrative.');
    s.addNotes('MARKET OVERVIEW. Actual and forecast are two series so the forecast can be dashed. Leave blank cells where a series has no value.');
  }

  // TAM / SAM / SOM — nested circles
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'We can reach a $2.1B serviceable market by 2029');
    const bx = M + 0.2, by = 6.55;
    const D = [4.4, 2.9, 1.5];
    const col = [C.OFF, C.NAVY, C.LIME];
    D.forEach((d, i) => oval(s, bx + (D[0] - d) / 2, by - d, d, { fill: col[i] }));
    t(s, 'TAM', { x: bx, y: by - D[0] + 0.35, w: D[0], h: 0.3, font: F.HEAD, bold: true, size: 12, color: C.NAVY, align: 'center' });
    t(s, 'SAM', { x: bx, y: by - D[1] + 0.3, w: D[0], h: 0.3, font: F.HEAD, bold: true, size: 12, color: C.WHITE, align: 'center' });
    t(s, 'SOM', { x: bx, y: by - D[2] + 0.55, w: D[0], h: 0.3, font: F.HEAD, bold: true, size: 12, color: C.NAVY, align: 'center' });
    const rows = [
      ['Total addressable market', '$38.0B', 'All companies globally buying revenue intelligence and sales analytics software.', 'TAM'],
      ['Serviceable available market', '$9.4B', 'Mid-market B2B companies (200–2,000 staff) in our 14 active countries.', 'SAM'],
      ['Serviceable obtainable market', '$2.1B', 'Share we can win by 2029 at our current sales capacity and win rate.', 'SOM'],
    ];
    const tx = gx(5) + 0.3, tw = SW - M - tx;
    rows.forEach(([k, v, d, a], i) => {
      const y = 2.15 + i * 1.5;
      t(s, a, { x: tx, y, w: 1, h: 0.3, font: F.MED, size: 10, color: C.SLATE, charSpacing: 1.5 });
      t(s, v, { x: tx, y: y + 0.28, w: 2.6, h: 0.75, font: F.DISP, size: 40, color: C.NAVY });
      t(s, k, { x: tx + 2.9, y: y + 0.32, w: tw - 2.9, h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      t(s, d, { x: tx + 2.9, y: y + 0.64, w: tw - 2.9, h: 0.6, size: 11, color: C.SLATE, lineSpacingMultiple: 1.2 });
      if (i < 2) line(s, tx, y + 1.35, tw, 0, { color: C.MIST });
    });
    pill(s, tx, 6.35, 'SOM = 5.5% of TAM', { variant: 'lime' });
    s.addNotes('TAM / SAM / SOM. Circles are not to scale — resize them if you want area-accurate proportions (area ∝ value).');
  }

  // Segmentation — 100% stacked bar (native)
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Mid-market is the largest and fastest-growing segment', { lead: 'Share of market spend by company size, by region, 2026.' });
    const x = M, w = gw(8);
    card(s, x, 2.05, w, 4.55, { fill: C.WHITE });
    const regs = ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa'];
    s.addChart(pres.charts.BAR, [
      { name: 'Enterprise', labels: regs, values: [42, 38, 45, 30, 36] },
      { name: 'Mid-market', labels: regs, values: [38, 44, 33, 41, 39] },
      { name: 'Small business', labels: regs, values: [20, 18, 22, 29, 25] },
    ], chartBase({ x: x + 0.2, y: 2.2, w: w - 0.4, h: 4.3, extra: {
      barDir: 'bar', barGrouping: 'percentStacked', chartColors: [C.STEEL, C.NAVY, C.SLATE], barGapWidthPct: 55,
      showValue: true, dataLabelPosition: 'ctr', dataLabelColor: C.WHITE, dataLabelFormatCode: '0"%"',
      valAxisHidden: true, valGridLine: { style: 'none' }, showLegend: true, legendPos: 't', catAxisLabelFontSize: 10, catAxisLineShow: false, catAxisOrientation: 'maxMin',
    } }));
    const rx = gx(8) + 0.1, rw = SW - M - rx;
    [['Enterprise', '2,000+ staff · long cycles, large ACV', C.STEEL], ['Mid-market', '200–2,000 staff · our core focus', C.NAVY], ['Small business', '<200 staff · self-serve, price-led', C.SLATE]].forEach(([n, d, cl], i) => {
      const y = 2.15 + i * 1.05;
      rect(s, rx, y + 0.06, 0.2, 0.2, { fill: cl, radius: 0.04 });
      t(s, n, { x: rx + 0.35, y, w: rw - 0.35, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
      t(s, d, { x: rx + 0.35, y: y + 0.32, w: rw - 0.35, h: 0.5, size: 10.5, color: C.SLATE });
    });
    card(s, rx, 5.35, rw, 1.25, { fill: C.LIME });
    t(s, '41%', { x: rx + 0.25, y: 5.45, w: 1.5, h: 0.6, font: F.DISP, size: 30, color: C.NAVY });
    t(s, 'average mid-market share across regions', { x: rx + 0.25, y: 6.05, w: rw - 0.5, h: 0.4, size: 10.5, color: C.NAVY });
    s.addNotes('MARKET SEGMENTATION. Native 100% stacked bar chart. Values are shares that sum to 100 per region.');
  }

  // Market growth — column with CAGR callout
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Spend will more than double by 2030');
    const x = M, w = gw(9);
    s.addChart(pres.charts.BAR, [{ name: 'Market', labels: ['2022', '2023', '2024', '2025', '2026', '2027F', '2028F', '2029F', '2030F'], values: [19.9, 23.4, 27.1, 32.0, 38.0, 45.1, 53.8, 64.0, 76.2] }], chartBase({
      x, y: 2.9, w, h: 3.7, extra: {
        barDir: 'col', chartColors: [C.NAVY, C.NAVY, C.NAVY, C.NAVY, C.NAVY, C.MIST, C.MIST, C.MIST, C.MIST], barGapWidthPct: 40,
        showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '"$"0.0', valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLabelFontSize: 10,
      },
    }));
    // CAGR callout
    pill(s, x + w * 0.52, 2.1, 'CAGR 19%', { variant: 'lime', w: 1.3, h: 0.36, size: 11 });
    line(s, x + 0.9, 2.28, w * 0.52 - 1.0, 0, { color: C.NAVY, lw: 1, dash: 'dash' });
    line(s, x + w * 0.52 + 1.4, 2.28, w * 0.48 - 1.9, 0, { color: C.NAVY, lw: 1, dash: 'dash', arrow: true });
    const rx = gx(9) + 0.2, rw = SW - M - rx;
    t(s, '2.0×', { x: rx, y: 2.1, w: rw, h: 0.9, font: F.DISP, size: 54, color: C.NAVY });
    t(s, 'growth 2026–2030', { x: rx, y: 3.0, w: rw, h: 0.3, size: 11, color: C.SLATE });
    line(s, rx, 3.55, rw, 0, { color: C.MIST });
    t(s, 'Growth drivers', { x: rx, y: 3.75, w: rw, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    t(s, [
      { text: 'AI budgets moving from pilots to production', options: { bullet: { indent: 12 }, breakLine: true } },
      { text: 'CRM consolidation in the mid-market', options: { bullet: { indent: 12 }, breakLine: true } },
      { text: 'CFO demand for forecast accuracy', options: { bullet: { indent: 12 } } },
    ], { x: rx, y: 4.15, w: rw, h: 1.6, size: 11, color: C.CHAR, paraSpaceAfter: 6 });
    s.addNotes('MARKET GROWTH. Forecast bars are mist-grey; actuals navy. The CAGR callout is a pill + two dashed lines — move them to span the years you reference.');
  }

  // Market trends — rows with adoption bars
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Four trends are reshaping how B2B companies sell', { lead: 'Adoption = share of mid-market companies already acting on the trend.' });
    const tr = [
      ['PiSparkle', 'AI copilots for sellers', 'Assistants draft emails, summarise calls and update CRM automatically.', 46, 'High'],
      ['PiStack', 'Tool consolidation', 'CFOs cut the sales stack from 11 tools to 5 or fewer.', 38, 'High'],
      ['PiArrowsClockwise', 'Revenue operations as a function', 'Sales, marketing and CS operations merge under one leader.', 61, 'Medium'],
      ['PiUsersThree', 'Buying committees grow', 'Average B2B deal now involves 9 stakeholders, up from 6.', 72, 'Medium'],
    ];
    const y0 = 2.1, rh = 1.1;
    const hx = [M, M + 0.8, gx(7), gx(10) + 0.3];
    t(s, 'TREND', { x: hx[1], y: y0, w: 2, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    t(s, 'ADOPTION', { x: hx[2], y: y0, w: 2, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    t(s, 'IMPACT ON US', { x: hx[3], y: y0, w: 2, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    tr.forEach(([ic, h1, d, adopt, imp], i) => {
      const y = y0 + 0.4 + i * rh;
      line(s, M, y, SW - 2 * M, 0, { color: i === 0 ? C.NAVY : C.MIST, lw: i === 0 ? 1.25 : 0.75 });
      icon(s, ic, M, y + 0.3, 0.38, C.NAVY);
      t(s, h1, { x: hx[1], y: y + 0.2, w: gw(6), h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      t(s, d, { x: hx[1], y: y + 0.52, w: gw(6), h: 0.45, size: 10.5, color: C.SLATE });
      const bw = gw(3) - 0.2;
      rect(s, hx[2], y + 0.45, bw, 0.14, { fill: C.OFF, radius: 0.07 });
      rect(s, hx[2], y + 0.45, bw * adopt / 100, 0.14, { fill: C.NAVY, radius: 0.07 });
      t(s, adopt + '%', { x: hx[2], y: y + 0.12, w: 1, h: 0.28, font: F.HEAD, bold: true, size: 12, color: C.NAVY });
      pill(s, hx[3], y + 0.37, imp, { variant: imp === 'High' ? 'lime' : 'outline', w: 0.95 });
    });
    s.addNotes('MARKET TRENDS. Adoption bars are two rounded rectangles: the navy bar width = track width × percentage.');
  }

  // Customer segments — persona cards without photos
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Three customer segments drive 86% of new revenue');
    const seg = [
      ['PiRocketLaunch', 'Scale-up sellers', '44%', [['Company size', '200–600'], ['Economic buyer', 'VP Sales'], ['Average ACV', '$28K'], ['Sales cycle', '38 days']], 'Primary'],
      ['PiBuildings', 'Established mid-market', '29%', [['Company size', '600–2,000'], ['Economic buyer', 'CRO'], ['Average ACV', '$64K'], ['Sales cycle', '71 days']], 'Primary'],
      ['PiBriefcase', 'Enterprise divisions', '13%', [['Company size', '2,000+'], ['Economic buyer', 'Division head'], ['Average ACV', '$120K'], ['Sales cycle', '124 days']], 'Emerging'],
    ];
    const cw = gw(4);
    seg.forEach(([ic, n, share, attrs, pri], i) => {
      const x = gx(i * 4), y = 2.05, h = 4.55;
      card(s, x, y, cw, h, { fill: C.WHITE });
      badge(s, ic, x + 0.35, y + 0.35, 0.7, { bg: i === 0 ? C.LIME : C.OFF, fg: C.NAVY, square: true });
      pill(s, x + cw - 1.35, y + 0.5, pri, { variant: pri === 'Primary' ? 'navy' : 'outline', w: 1.0 });
      t(s, n, { x: x + 0.35, y: y + 1.3, w: cw - 0.7, h: 0.35, font: F.HEAD, bold: true, size: 16, color: C.NAVY });
      t(s, [{ text: share, options: { fontFace: F.DISP, fontSize: 26, color: C.NAVY } }, { text: '  of new ARR', options: { fontSize: 10.5, color: C.SLATE } }], { x: x + 0.35, y: y + 1.72, w: cw - 0.7, h: 0.55, valign: 'bottom' });
      attrs.forEach(([k, v], j) => {
        const ay = y + 2.55 + j * 0.46;
        line(s, x + 0.35, ay, cw - 0.7, 0, { color: C.MIST });
        t(s, k, { x: x + 0.35, y: ay + 0.08, w: 1.8, h: 0.3, size: 10.5, color: C.SLATE, valign: 'middle' });
        t(s, v, { x: x + 2.0, y: ay + 0.08, w: cw - 2.35, h: 0.3, font: F.MED, size: 10.5, color: C.NAVY, align: 'right', valign: 'middle' });
      });
    });
    s.addNotes('CUSTOMER SEGMENTS. Persona cards use an icon instead of a photo. Keep attributes to four rows for scannability.');
  }

  // Geographic distribution — horizontal bar + country table
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Revenue concentrates in five countries — the US is closing the gap', { lead: 'ARR by country, $M, as of Q3 2026.' });
    const x = M, w = gw(7);
    const c = ['Netherlands', 'United States', 'Germany', 'United Kingdom', 'Canada', 'Singapore', 'Sweden', 'Other (7)'];
    s.addChart(pres.charts.BAR, [{ name: 'ARR', labels: c, values: [11.2, 10.6, 8.4, 5.9, 4.5, 3.1, 2.2, 2.7] }], chartBase({
      x, y: 2.05, w, h: 4.5, extra: {
        barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [C.NAVY, C.LIME, C.NAVY, C.NAVY, C.NAVY, C.NAVY, C.NAVY, C.MIST], barGapWidthPct: 45,
        showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '"$"0.0"M"', valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, catAxisLabelFontSize: 10.5, catAxisLabelColor: C.CHAR,
      },
    }));
    const tx = gx(7) + 0.3, tw = SW - M - tx;
    card(s, tx, 2.05, tw, 4.5, { fill: C.OFF });
    t(s, 'Fastest-growing markets', { x: tx + 0.3, y: 2.3, w: tw - 0.6, h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
    const rows = [['United States', '+112%'], ['Singapore', '+120%'], ['Canada', '+74%'], ['Germany', '+51%'], ['United Kingdom', '+38%']];
    rows.forEach(([n, g], i) => {
      const y = 2.85 + i * 0.62;
      t(s, String(i + 1), { x: tx + 0.3, y, w: 0.3, h: 0.4, font: F.HEAD, bold: true, size: 11, color: C.SLATE, valign: 'middle' });
      t(s, n, { x: tx + 0.7, y, w: 2.4, h: 0.4, size: 11.5, color: C.NAVY, valign: 'middle' });
      pill(s, tx + tw - 1.15, y + 0.06, g, { variant: i < 2 ? 'lime' : 'white', w: 0.85, h: 0.28 });
      if (i < rows.length - 1) line(s, tx + 0.3, y + 0.52, tw - 0.6, 0, { color: C.MIST });
    });
    s.addNotes('GEOGRAPHIC DISTRIBUTION. Sorted horizontal bar chart; the lime bar highlights the market in focus. Edit colours per bar via Format Data Point.');
  }
};
