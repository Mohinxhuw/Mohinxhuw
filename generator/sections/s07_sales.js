// Sales
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, footnote, chartBase } = L;
  const SEC = '06 · Sales';

  // Sales funnel — centred shape funnel with conversion rates
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Our funnel converts 4.1% of leads into customers', { lead: 'Trailing 12 months. Stage-to-stage conversion shown on the right.' });
    const st = [['Leads', '28,400'], ['Marketing qualified', '9,650'], ['Sales qualified', '3,480'], ['Opportunities', '2,190'], ['Proposals', '1,640'], ['Closed won', '1,165']];
    const conv = ['34%', '36%', '63%', '75%', '71%'];
    const cx = gx(6), maxW = gw(8), minW = 2.4, y0 = 2.05, h = 0.62, gap = 0.1;
    st.forEach(([n, v], i) => {
      const w = maxW - (maxW - minW) * i / (st.length - 1);
      const x = cx - w / 2 + 0.3, y = y0 + i * (h + gap);
      const last = i === st.length - 1;
      rect(s, x, y, w, h, { fill: last ? C.LIME : (i % 2 ? C.STEEL : C.NAVY), radius: 0.08 });
      t(s, v, { x, y, w, h, font: F.DISP, size: 16, color: last ? C.NAVY : C.WHITE, align: 'center', valign: 'middle' });
      t(s, n, { x: M, y, w: 2.2, h, font: F.MED, size: 11, color: C.NAVY, valign: 'middle' });
      if (i < conv.length) {
        const ry = y + h / 2 + gap / 2;
        line(s, SW - M - 1.6, ry, 0.25, 0, { color: C.MIST });
        pill(s, SW - M - 1.3, ry - 0.15, '↓ ' + conv[i], { variant: i === 1 ? 'lime' : 'off', w: 1.05 });
      }
    });
    t(s, 'Biggest drop-off: MQL → SQL', { x: SW - M - 3.3, y: 6.55, w: 3.3, h: 0.25, font: F.MED, size: 9.5, color: C.OLIVE, align: 'right' });
    s.addNotes('SALES FUNNEL. Each stage is a centred rounded rectangle; the width steps down evenly. Change widths to make stages proportional to volume if preferred.');
  }

  // Sales pipeline — kanban
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, '$31.4M in open pipeline gives us 3.2× coverage for the fourth quarter');
    const stg = [
      ['Discovery', 42, '$9.8M', [['Northwind Logistics', '$420K', 'Enterprise'], ['Helix Bio', '$180K', 'Mid-market']]],
      ['Solution fit', 28, '$8.1M', [['Atlas Foods', '$310K', 'Mid-market'], ['Kestrel Energy', '$260K', 'Enterprise']]],
      ['Proposal', 19, '$6.9M', [['Brightline Retail', '$540K', 'Enterprise'], ['Orbit Media', '$95K', 'Scale-up']]],
      ['Negotiation', 11, '$4.4M', [['Summit Health', '$610K', 'Enterprise'], ['Pinewood Labs', '$140K', 'Mid-market']]],
      ['Commit', 7, '$2.2M', [['Vela Payments', '$380K', 'Mid-market'], ['Cobalt Freight', '$220K', 'Mid-market']]],
    ];
    const cw = (SW - 2 * M - 4 * 0.2) / 5;
    stg.forEach(([n, cnt, val, deals], i) => {
      const x = M + i * (cw + 0.2), y = 2.05;
      const hi = i === 4;
      card(s, x, y, cw, 4.55, { fill: hi ? C.NAVY : C.WHITE });
      t(s, n, { x: x + 0.2, y: y + 0.2, w: cw - 0.9, h: 0.3, font: F.HEAD, bold: true, size: 12.5, color: hi ? C.WHITE : C.NAVY });
      pill(s, x + cw - 0.75, y + 0.2, String(cnt), { variant: hi ? 'lime' : 'off', w: 0.55, h: 0.26 });
      t(s, val, { x: x + 0.2, y: y + 0.6, w: cw - 0.4, h: 0.5, font: F.DISP, size: 22, color: hi ? C.LIME : C.NAVY });
      // stage progress
      rect(s, x + 0.2, y + 1.2, cw - 0.4, 0.06, { fill: hi ? C.NAVY2 : C.OFF, radius: 0.03 });
      rect(s, x + 0.2, y + 1.2, (cw - 0.4) * (i + 1) / 5, 0.06, { fill: hi ? C.LIME : C.NAVY, radius: 0.03 });
      deals.forEach(([d, v, seg], k) => {
        const dy = y + 1.5 + k * 1.1;
        rect(s, x + 0.15, dy, cw - 0.3, 0.95, { fill: hi ? C.NAVY2 : C.OFF, radius: 0.08 });
        t(s, d, { x: x + 0.3, y: dy + 0.12, w: cw - 0.6, h: 0.28, font: F.MED, size: 10.5, color: hi ? C.WHITE : C.NAVY });
        t(s, v, { x: x + 0.3, y: dy + 0.5, w: 1, h: 0.3, font: F.HEAD, bold: true, size: 11, color: hi ? C.WHITE : C.NAVY, valign: 'middle' });
        t(s, seg, { x: x + cw - 1.45, y: dy + 0.5, w: 1.15, h: 0.3, size: 9, color: hi ? C.MIST : C.SLATE, align: 'right', valign: 'middle' });
      });
      t(s, '+ ' + (cnt - 2) + ' more deals', { x: x + 0.2, y: y + 3.85, w: cw - 0.4, h: 0.3, size: 9.5, color: hi ? C.MIST : C.SLATE });
    });
    s.addNotes('SALES PIPELINE. Kanban-style stage columns. Deal cards are grouped shapes — duplicate to add deals. Company names are fictional placeholders.');
  }

  // Conversion rates — clustered bar vs benchmark
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'We beat benchmark conversion at every stage but one', { lead: 'Stage conversion rate, trailing 12 months, versus SaaS industry median.' });
    const x = M, w = gw(8);
    const labels = ['Lead → MQL', 'MQL → SQL', 'SQL → Opportunity', 'Opportunity → Proposal', 'Proposal → Won'];
    rect(s, x + w - 3.35, 2.13, 0.16, 0.16, { fill: C.NAVY, radius: 0.03 });
    t(s, 'Corvanta', { x: x + w - 3.1, y: 2.08, w: 1, h: 0.25, size: 9.5, color: C.CHAR });
    rect(s, x + w - 1.9, 2.13, 0.16, 0.16, { fill: C.MIST, radius: 0.03 });
    t(s, 'Benchmark', { x: x + w - 1.65, y: 2.08, w: 1.4, h: 0.25, size: 9.5, color: C.CHAR });
    s.addChart(pres.charts.BAR, [
      { name: 'Corvanta', labels, values: [34, 36, 63, 75, 71] },
      { name: 'Benchmark', labels, values: [28, 39, 52, 61, 58] },
    ], chartBase({ x, y: 2.4, w, h: 4.2, extra: {
      barDir: 'col', chartColors: [C.NAVY, C.MIST], barGapWidthPct: 70, barOverlapPct: -10,
      showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0"%"', valAxisHidden: true, valGridLine: { style: 'none' }, valAxisMaxVal: 85, catAxisLabelFontSize: 9.5,
    } }));
    const rx = gx(8) + 0.3, rw = SW - M - rx;
    card(s, rx, 2.05, rw, 2.1, { fill: C.NAVY });
    t(s, '+13 pts', { x: rx + 0.3, y: 2.3, w: rw - 0.6, h: 0.7, font: F.DISP, size: 34, color: C.LIME });
    t(s, 'Proposal-to-win above benchmark, driven by deal-risk alerts.', { x: rx + 0.3, y: 3.05, w: rw - 0.6, h: 0.8, size: 11, color: C.MIST, lineSpacingMultiple: 1.2 });
    card(s, rx, 4.4, rw, 2.2, { fill: C.OFF });
    badge(s, 'PiWarning', rx + 0.3, 4.65, 0.45, { bg: C.WHITE, fg: C.NAVY });
    t(s, 'Fix: MQL → SQL', { x: rx + 0.9, y: 4.7, w: rw - 1.1, h: 0.35, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    t(s, '3 pts below benchmark. New lead-scoring model and 1-hour SLA roll out in November.', { x: rx + 0.3, y: 5.3, w: rw - 0.6, h: 0.9, size: 11, color: C.SLATE, lineSpacingMultiple: 1.2 });
    s.addNotes('CONVERSION RATES. Clustered column chart comparing two series. Keep the benchmark series in mist grey so your own data stays dominant.');
  }

  // Sales performance — combo (bars + target line)
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Bookings beat target in 9 of 12 months');
    const mo = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const x = gx(3) + 0.1, w = SW - M - x;
    const k = [
      { label: 'Bookings, 12 months', value: '$21.7M', delta: '18%', note: 'vs target', variant: 'navy' },
      { label: 'Average deal size', value: '$41K', delta: '11%', note: 'YoY' },
      { label: 'Sales cycle', value: '52 days', delta: '6 days', note: 'faster', down: false },
    ];
    k.forEach((o, i) => kpi(s, M, 2.05 + i * 1.53, gw(3) - 0.1, 1.38, Object.assign({ valueSize: 24, pad: 0.22 }, o)));
    rect(s, x + w - 3.4, 2.13, 0.16, 0.16, { fill: C.NAVY, radius: 0.03 });
    t(s, 'Bookings, $M', { x: x + w - 3.15, y: 2.08, w: 1.3, h: 0.25, size: 9.5, color: C.CHAR });
    rect(s, x + w - 1.7, 2.2, 0.3, 0.03, { fill: C.OLIVE, square: true });
    t(s, 'Target', { x: x + w - 1.3, y: 2.08, w: 1.2, h: 0.25, size: 9.5, color: C.CHAR });
    t(s, 'Monthly bookings vs target', { x, y: 2.05, w: 4, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    const opts = chartBase({ x: x - 0.1, y: 2.45, w: w + 0.1, h: 4.15, extra: {
      valAxes: [{ showValAxisTitle: false, valAxisMinVal: 0, valAxisMaxVal: 2.8, valAxisLabelFormatCode: '$0.0', valGridLine: { color: C.GRID, size: 0.75 } }, { showValAxisTitle: false, valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 2.8, valGridLine: { style: 'none' } }],
      catAxes: [{ catAxisTitle: '' }, { catAxisHidden: true }],
    } });
    s.addChart([
      { type: pres.charts.BAR, data: [{ name: 'Bookings', labels: mo, values: [1.42, 1.61, 2.34, 1.28, 1.45, 1.98, 1.66, 1.74, 2.21, 1.52, 1.69, 2.41] }], options: { barDir: 'col', chartColors: [C.NAVY], barGapWidthPct: 55 } },
      { type: pres.charts.LINE, data: [{ name: 'Target', labels: mo, values: [1.35, 1.45, 2.1, 1.4, 1.5, 1.8, 1.6, 1.65, 2.0, 1.6, 1.65, 2.2] }], options: { chartColors: [C.OLIVE], lineSize: 2, lineDataSymbol: 'circle', lineDataSymbolSize: 5, secondaryValAxis: true, secondaryCatAxis: true } },
    ], opts);
    s.addNotes('SALES PERFORMANCE. Combination chart: columns (actual) + line (target) on matched axes. Edit Data opens both series in one sheet.');
  }

  // Customer acquisition — dark
  {
    const s = pres.addSlide({ masterName: L.L.DARK });
    header(s, SEC, 'Partners are now our most efficient acquisition channel', { dark: true, lead: 'Blended CAC fell 14% as partner-sourced deals grew to 38% of new logos.' });
    const k = [
      { label: 'New logos, 12 months', value: '310', delta: '27%', note: 'YoY', icon: 'PiUsersThree' },
      { label: 'Blended CAC', value: '$18.2K', delta: '14%', note: 'lower', icon: 'PiCoins' },
      { label: 'CAC payback', value: '11 mo', delta: '3 mo', note: 'faster', icon: 'PiHourglass' },
    ];
    k.forEach((o, i) => kpi(s, M, 2.05 + i * 1.53, gw(4), 1.38, Object.assign({ variant: 'navy2', valueSize: 26, pad: 0.22 }, o)));
    const x = gx(4) + 0.1, w = SW - M - x;
    card(s, x, 2.05, w, 4.45, { fill: C.NAVY2 });
    t(s, 'CAC by channel, $K', { x: x + 0.35, y: 2.3, w: 4, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.WHITE });
    s.addChart(pres.charts.BAR, [{ name: 'CAC', labels: ['Partners', 'Organic / inbound', 'Events', 'Outbound SDR', 'Paid social', 'Paid search'], values: [9.4, 12.1, 19.8, 22.6, 26.3, 31.7] }], chartBase({
      x: x + 0.2, y: 2.75, w: w - 0.4, h: 3.6, dark: true, bg: C.NAVY2, extra: {
        barDir: 'bar', catAxisOrientation: 'maxMin', chartColors: [C.LIME, C.STEEL, C.STEEL, C.STEEL, C.STEEL, C.STEEL], barGapWidthPct: 45,
        showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '"$"0.0"K"', valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLineShow: false, catAxisLabelColor: C.WHITE, catAxisLabelFontSize: 10.5,
      },
    }));
    s.addNotes('CUSTOMER ACQUISITION. Dark data slide for rhythm. KPI cards use the "navy2" variant; the bar chart highlights the most efficient channel in lime.');
  }

  // Sales strategy — land / expand / retain
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Three plays to reach $80M ARR');
    const plays = [
      ['PiFlag', 'Land', 'Win new mid-market logos', ['Vertical playbooks for 4 industries', 'Partner co-selling with 3 CRM vendors', '14-day proof of value'], '+420', 'new logos'],
      ['PiArrowUpRight', 'Expand', 'Grow inside existing accounts', ['Seat expansion to CS and marketing', 'Cross-sell coaching module', 'Executive business reviews'], '135%', 'net retention'],
      ['PiShieldCheck', 'Retain', 'Protect the installed base', ['Health scoring on every account', 'Renewal desk 120 days out', 'Customer advisory board'], '<6%', 'gross churn'],
    ];
    const cw = gw(4);
    plays.forEach(([ic, n, sub, items, v, k], i) => {
      const x = gx(i * 4), y = 2.05, h = 4.55;
      card(s, x, y, cw, h, { fill: C.OFF });
      badge(s, ic, x + 0.3, y + 0.3, 0.6, { bg: C.NAVY, fg: C.LIME });
      t(s, 'PLAY ' + (i + 1), { x: x + cw - 1.3, y: y + 0.45, w: 1, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5, align: 'right' });
      t(s, n, { x: x + 0.3, y: y + 1.1, w: cw - 0.6, h: 0.5, font: F.DISP, size: 26, color: C.NAVY });
      t(s, sub, { x: x + 0.3, y: y + 1.6, w: cw - 0.6, h: 0.3, size: 11, color: C.SLATE });
      items.forEach((it, k2) => {
        const iy = y + 2.1 + k2 * 0.42;
        icon(s, 'PiCheck', x + 0.3, iy + 0.04, 0.2, C.NAVY);
        t(s, it, { x: x + 0.6, y: iy, w: cw - 0.9, h: 0.3, size: 10.5, color: C.CHAR });
      });
      rect(s, x + 0.2, y + h - 1.0, cw - 0.4, 0.8, { fill: C.WHITE, radius: 0.08 });
      t(s, v, { x: x + 0.4, y: y + h - 1.0, w: 1.4, h: 0.8, font: F.DISP, size: 22, color: C.NAVY, valign: 'middle' });
      t(s, k, { x: x + 1.8, y: y + h - 1.0, w: cw - 2.2, h: 0.8, size: 10.5, color: C.SLATE, valign: 'middle' });
    });
    s.addNotes('SALES STRATEGY. Three plays with actions and a single target metric each. The white box at the bottom of each card is the success metric.');
  }

  // Sales channels — donut
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Direct sales still leads, but partners grew fastest', { lead: 'New ARR by channel, trailing 12 months ($M).' });
    const x = M, w = gw(5);
    card(s, x, 2.05, w, 4.55, { fill: C.WHITE });
    const ch = [['Direct field sales', 8.9, '+12%'], ['Partners & resellers', 5.4, '+86%'], ['Inside sales', 3.6, '+21%'], ['Self-serve', 1.6, '+44%'], ['Marketplaces', 0.8, '+150%']];
    const cols = [C.NAVY, C.LIME, C.STEEL, C.SLATE, C.MIST];
    s.addChart(pres.charts.DOUGHNUT, [{ name: 'New ARR', labels: ch.map(c => c[0]), values: ch.map(c => c[1]) }], chartBase({
      x: x + 0.3, y: 2.25, w: w - 0.6, h: 4.15, extra: { holeSize: 68, chartColors: cols, showPercent: false, showValue: false, showLegend: false, dataBorder: { pt: 1.5, color: C.WHITE } },
    }));
    t(s, '$20.3M', { x: x + w / 2 - 1.2, y: 3.95, w: 2.4, h: 0.5, font: F.DISP, size: 26, color: C.NAVY, align: 'center' });
    t(s, 'new ARR', { x: x + w / 2 - 1.2, y: 4.45, w: 2.4, h: 0.25, size: 10, color: C.SLATE, align: 'center' });
    const tx = gx(5) + 0.3, tw = SW - M - tx;
    t(s, 'CHANNEL', { x: tx + 0.4, y: 2.1, w: 3, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    t(s, 'NEW ARR', { x: tx + tw - 3.1, y: 2.1, w: 1.2, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5, align: 'right' });
    t(s, 'SHARE', { x: tx + tw - 1.85, y: 2.1, w: 0.8, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5, align: 'right' });
    t(s, 'GROWTH', { x: tx + tw - 0.95, y: 2.1, w: 0.95, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5, align: 'right' });
    const tot = ch.reduce((a, c) => a + c[1], 0);
    ch.forEach(([n, v, g], i) => {
      const y = 2.5 + i * 0.8;
      line(s, tx, y, tw, 0, { color: i === 0 ? C.NAVY : C.MIST, lw: i === 0 ? 1.25 : 0.75 });
      rect(s, tx, y + 0.3, 0.2, 0.2, { fill: cols[i], radius: 0.04 });
      t(s, n, { x: tx + 0.4, y: y + 0.2, w: 3.5, h: 0.4, font: F.MED, size: 12, color: C.NAVY, valign: 'middle' });
      t(s, '$' + v.toFixed(1) + 'M', { x: tx + tw - 3.1, y: y + 0.2, w: 1.2, h: 0.4, font: F.HEAD, bold: true, size: 13, color: C.NAVY, align: 'right', valign: 'middle' });
      t(s, Math.round(v / tot * 100) + '%', { x: tx + tw - 1.85, y: y + 0.2, w: 0.8, h: 0.4, size: 11.5, color: C.CHAR, align: 'right', valign: 'middle' });
      t(s, g, { x: tx + tw - 0.95, y: y + 0.2, w: 0.95, h: 0.4, font: F.MED, size: 11.5, color: C.OLIVE, align: 'right', valign: 'middle' });
    });
    s.addNotes('SALES CHANNELS. Native doughnut chart with the total in the centre (a separate text box). Keep legend rows in the same order and colour as the donut slices.');
  }

  // Team performance — bullet charts vs quota
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Four of six regions are on track to hit annual quota', { lead: 'Bookings to date vs annual quota. Marker = expected attainment at this point of the year (75%).' });
    const reg = [['Benelux', 'A. Visser', 92], ['DACH', 'M. Keller', 84], ['UK & Ireland', 'S. Patel', 78], ['US East', 'J. Rivera', 76], ['US West', 'K. Chen', 64], ['Nordics', 'E. Lund', 58]];
    const x0 = M, nameW = 2.6, bx = x0 + nameW, bw = gw(9) - nameW, y0 = 2.3, rh = 0.68;
    t(s, 'REGION', { x: x0, y: 2.0, w: 2, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    t(s, 'ATTAINMENT', { x: bx + bw + 0.2, y: 2.0, w: 1.5, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    reg.forEach(([r, o, p], i) => {
      const y = y0 + i * rh;
      t(s, r, { x: x0, y: y + 0.05, w: nameW, h: 0.28, font: F.HEAD, bold: true, size: 12.5, color: C.NAVY });
      t(s, o, { x: x0, y: y + 0.33, w: nameW, h: 0.22, size: 9.5, color: C.SLATE });
      rect(s, bx, y + 0.12, bw, 0.36, { fill: C.OFF, radius: 0.04 });
      rect(s, bx, y + 0.19, bw * p / 100, 0.22, { fill: p >= 75 ? C.NAVY : C.SLATE, radius: 0.03 });
      rect(s, bx + bw * 0.75 - 0.015, y + 0.04, 0.03, 0.52, { fill: C.OLIVE, square: true });
      t(s, p + '%', { x: bx + bw + 0.2, y: y + 0.1, w: 0.8, h: 0.4, font: F.DISP, size: 16, color: C.NAVY, valign: 'middle' });
      pill(s, bx + bw + 1.05, y + 0.16, p >= 75 ? 'On track' : 'At risk', { variant: p >= 75 ? 'lime' : 'navy', w: 0.95, h: 0.28, size: 8.5 });
    });
    ['0%', '25%', '50%', '75%', '100%'].forEach((lb, i) => t(s, lb, { x: bx + bw * i / 4 - 0.4, y: y0 + reg.length * rh + 0.05, w: 0.8, h: 0.22, size: 8.5, color: C.SLATE, align: 'center' }));
    s.addNotes('TEAM PERFORMANCE. Bullet charts built from shapes: grey track = 100% quota, bar = attainment, olive marker = expected pace. Bar width = track width × attainment.');
  }
};
