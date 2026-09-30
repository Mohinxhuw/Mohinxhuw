// Marketing
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, footnote, chartBase } = L;
  const SEC = '07 · Marketing';

  // Marketing strategy — framework columns
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'A focused marketing strategy for 2027', { lead: 'Audience first: every campaign maps to one segment, one message and one measurable goal.' });
    const cols = [
      ['PiUsersThree', 'Audience', ['VP Sales at scale-ups', 'CROs in mid-market', 'RevOps leaders']],
      ['PiChatCircle', 'Message', ['“Stop guessing your number”', 'Forecast accuracy as a board metric', 'Proof: 96% accuracy']],
      ['PiMegaphone', 'Channels', ['Partner co-marketing', 'Executive events', 'LinkedIn thought leadership']],
      ['PiTarget', 'Goals', ['9,500 MQLs', '$42M pipeline sourced', 'CPL below $180']],
    ];
    const cw = gw(3);
    cols.forEach(([ic, n, items], i) => {
      const x = gx(i * 3), y = 2.05;
      const hi = i === 3;
      rect(s, x, y, cw, 0.8, { fill: hi ? C.LIME : C.NAVY, radius: 0.1 });
      icon(s, ic, x + 0.25, y + 0.22, 0.36, hi ? C.NAVY : C.LIME);
      t(s, n, { x: x + 0.8, y, w: cw - 1, h: 0.8, font: F.HEAD, bold: true, size: 15, color: hi ? C.NAVY : C.WHITE, valign: 'middle' });
      if (i < 3) badge(s, 'PiArrowRight', x + cw - 0.07, y + 0.22, 0.36, { bg: C.WHITE, fg: C.NAVY, line: C.MIST, scale: 0.55 });
      items.forEach((it, k) => {
        const iy = y + 1.05 + k * 1.2;
        card(s, x, iy, cw, 1.05, { fill: C.OFF });
        t(s, String(k + 1).padStart(2, '0'), { x: x + 0.25, y: iy + 0.2, w: 0.5, h: 0.25, font: F.HEAD, bold: true, size: 10, color: C.SLATE });
        t(s, it, { x: x + 0.25, y: iy + 0.45, w: cw - 0.5, h: 0.5, font: F.MED, size: 11.5, color: C.NAVY });
      });
    });
    s.addNotes('MARKETING STRATEGY. Four-column framework: Audience → Message → Channels → Goals. The lime header marks the outcome column.');
  }

  // Campaign overview
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Campaign recap: “Know Your Number” beat its pipeline goal by 31%');
    const x = M, w = gw(4);
    card(s, x, 2.05, w, 4.55, { fill: C.NAVY });
    pill(s, x + 0.3, 2.35, 'Completed', { variant: 'lime', w: 1.1 });
    t(s, 'Know Your Number', { x: x + 0.3, y: 2.85, w: w - 0.6, h: 0.5, font: F.HEAD, bold: true, size: 22, color: C.WHITE });
    t(s, 'Integrated demand campaign for Q3 targeting mid-market CROs.', { x: x + 0.3, y: 3.4, w: w - 0.6, h: 0.6, size: 11, color: C.MIST, lineSpacingMultiple: 1.2 });
    [['Dates', '1 Jul – 30 Sep 2026'], ['Budget', '$640K'], ['Owner', 'Demand generation'], ['Regions', 'EU · North America']].forEach(([k, v], i) => {
      const y = 4.3 + i * 0.52;
      line(s, x + 0.3, y, w - 0.6, 0, { color: C.NAVY2, lw: 1 });
      t(s, k, { x: x + 0.3, y: y + 0.1, w: 1.4, h: 0.32, size: 10.5, color: C.MIST, valign: 'middle' });
      t(s, v, { x: x + 1.6, y: y + 0.1, w: w - 1.9, h: 0.32, font: F.MED, size: 10.5, color: C.WHITE, align: 'right', valign: 'middle' });
    });
    const rx = gx(4) + 0.1, rw = SW - M - rx, kw = (rw - 0.6) / 4;
    [['Pipeline', '$5.9M', '31%'], ['MQLs', '2,840', '22%'], ['Cost per lead', '$225', '9%'], ['ROI', '9.2×', '1.8×']].forEach(([k, v, d], i) => {
      kpi(s, rx + i * (kw + 0.2), 2.05, kw, 1.45, { label: k, value: v, delta: d, note: i === 2 ? 'lower' : 'vs goal', variant: 'white', valueSize: 24, pad: 0.22 });
    });
    card(s, rx, 3.75, rw, 2.85, { fill: C.WHITE });
    t(s, 'Weekly MQLs', { x: rx + 0.3, y: 3.95, w: 3, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    const wk = Array.from({ length: 13 }, (_, i) => 'W' + (i + 1));
    s.addChart(pres.charts.AREA, [{ name: 'MQLs', labels: wk, values: [110, 140, 150, 190, 240, 260, 250, 270, 230, 220, 250, 260, 250] }], chartBase({
      x: rx + 0.15, y: 4.3, w: rw - 0.3, h: 2.2, extra: { chartColors: [C.NAVY], chartColorsOpacity: 85, valAxisLabelFontSize: 8, catAxisLabelFontSize: 8, valAxisMajorUnit: 100 },
    }));
    s.addNotes('CAMPAIGN OVERVIEW. Left: campaign brief card. Right: result KPIs and a native area chart of weekly volume.');
  }

  // Channel mix — stacked column
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'We are shifting spend from paid search to partners and events', { lead: 'Marketing spend by channel, $K per quarter.' });
    const q = ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26', 'Q4 26F'];
    const x = M, w = gw(8);
    s.addChart(pres.charts.BAR, [
      { name: 'Paid search', labels: q, values: [420, 410, 380, 360, 330, 300, 270, 240] },
      { name: 'Paid social', labels: q, values: [260, 270, 280, 270, 260, 250, 240, 230] },
      { name: 'Events', labels: q, values: [180, 200, 190, 240, 260, 280, 300, 330] },
      { name: 'Partners', labels: q, values: [90, 110, 140, 170, 220, 260, 300, 350] },
    ], chartBase({ x, y: 2.05, w, h: 4.55, extra: {
      barDir: 'col', barGrouping: 'stacked', chartColors: [C.MIST, C.SLATE, C.STEEL, C.NAVY], barGapWidthPct: 50,
      showLegend: true, legendPos: 't', valAxisLabelFormatCode: '#,##0', valAxisMaxVal: 1200, valAxisMajorUnit: 300,
    } }));
    const rx = gx(8) + 0.3, rw = SW - M - rx;
    [['Partners', '+289%', 'spend growth since Q1 2025; lowest CAC of any channel.', true], ['Events', '+83%', 'growth; executive dinners convert at 3× webinars.', false], ['Paid search', '−43%', 'reduced as CPC rose 38% year over year.', false]].forEach(([n, v, d, hi], i) => {
      const y = 2.05 + i * 1.55;
      card(s, rx, y, rw, 1.4, { fill: hi ? C.NAVY : C.OFF });
      t(s, n, { x: rx + 0.3, y: y + 0.2, w: rw - 0.6, h: 0.25, font: F.MED, size: 10.5, color: hi ? C.MIST : C.SLATE });
      t(s, v, { x: rx + 0.3, y: y + 0.45, w: 1.8, h: 0.55, font: F.DISP, size: 24, color: hi ? C.LIME : C.NAVY });
      t(s, d, { x: rx + 0.3, y: y + 0.98, w: rw - 0.6, h: 0.35, size: 9.5, color: hi ? C.WHITE : C.CHAR });
    });
    s.addNotes('CHANNEL MIX. Stacked column chart; the channel you are growing sits on top in navy for emphasis.');
  }

  // Customer journey — stages + emotion curve
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'The customer journey: where we win and where we lose buyers');
    const st = [
      ['PiMagnifyingGlass', 'Awareness', 'Content, peer referrals, analyst reports', '1.2M reach'],
      ['PiScales', 'Consideration', 'Demo, ROI calculator, case studies', '9.6K MQLs'],
      ['PiHandshake', 'Decision', 'Proof of value, security review, pricing', '28% win rate'],
      ['PiRocketLaunch', 'Onboarding', 'Kick-off, data sync, admin training', '14 days to live'],
      ['PiHeart', 'Advocacy', 'Community, reviews, referrals', 'NPS 72'],
    ];
    const cw = (SW - 2 * M - 4 * 0.15) / 5;
    st.forEach(([ic, n, d, m], i) => {
      const x = M + i * (cw + 0.15), y = 2.05;
      rect(s, x, y, cw, 0.62, { fill: i === 2 ? C.LIME : C.NAVY, radius: 0.1 });
      icon(s, ic, x + 0.2, y + 0.16, 0.3, i === 2 ? C.NAVY : C.LIME);
      t(s, n, { x: x + 0.62, y, w: cw - 0.7, h: 0.62, font: F.HEAD, bold: true, size: 12.5, color: i === 2 ? C.NAVY : C.WHITE, valign: 'middle' });
      t(s, 'TOUCHPOINTS', { x, y: y + 0.85, w: cw, h: 0.22, font: F.MED, size: 8.5, color: C.SLATE, charSpacing: 1.2 });
      t(s, d, { x, y: y + 1.08, w: cw - 0.15, h: 0.6, size: 10, color: C.CHAR, lineSpacingMultiple: 1.15 });
      t(s, m, { x, y: 5.95, w: cw, h: 0.4, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      t(s, 'KEY METRIC', { x, y: 6.35, w: cw, h: 0.22, font: F.MED, size: 8.5, color: C.SLATE, charSpacing: 1.2 });
    });
    t(s, 'Buyer sentiment', { x: M, y: 3.85, w: 2, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE });
    s.addChart(pres.charts.LINE, [{ name: 'Sentiment', labels: st.map(x => x[1]), values: [6, 7.5, 4.2, 6.8, 8.6] }], chartBase({
      x: M - 0.05, y: 4.05, w: SW - 2 * M + 0.1, h: 1.75, extra: {
        chartColors: [C.NAVY], lineSize: 2.5, lineSmooth: true, lineDataSymbol: 'circle', lineDataSymbolSize: 9, lineDataSymbolLineColor: C.LIME, lineDataSymbolLineSize: 2,
        valAxisHidden: true, catAxisHidden: true, valGridLine: { style: 'none' }, valAxisMinVal: 2, valAxisMaxVal: 10, catAxisLineShow: false,
      },
    }));
    pill(s, M + 2 * (cw + 0.15) + 0.1, 5.45, 'Pain point: security review', { variant: 'navy', w: 2.05, size: 8.5 });
    s.addNotes('CUSTOMER JOURNEY. Stage headers align with points on a native line chart (buyer sentiment). Keep the number of stages equal to the chart categories.');
  }

  // Marketing funnel — left-aligned stepped bars (TOFU/MOFU/BOFU)
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Marketing funnel: volume, cost and velocity by stage', { lead: 'Q3 2026. Cost per stage = marketing spend ÷ volume at that stage.' });
    const st = [
      ['TOFU', 'Visitors', 186000, '$1.40', '—'],
      ['TOFU', 'Engaged leads', 28400, '$9', '4 days'],
      ['MOFU', 'MQLs', 9650, '$27', '11 days'],
      ['MOFU', 'SQLs', 3480, '$74', '9 days'],
      ['BOFU', 'Opportunities', 2190, '$118', '16 days'],
    ];
    const x0 = M + 1.1, maxW = gw(7), y0 = 2.35, rh = 0.8;
    t(s, 'STAGE', { x: M, y: 2.0, w: 1, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5 });
    const hx = SW - M - 3.3;
    ['COST / UNIT', 'TIME IN STAGE'].forEach((h1, i) => t(s, h1, { x: hx + i * 1.7, y: 2.0, w: 1.6, h: 0.25, font: F.MED, size: 9, color: C.SLATE, charSpacing: 1.5, align: 'right' }));
    st.forEach(([grp, n, v, c, tm], i) => {
      const y = y0 + i * rh;
      const w = 3.6 + (maxW - 3.6) * (st.length - 1 - i) / (st.length - 1);
      if (i === 0 || st[i - 1][0] !== grp) pill(s, M, y + 0.17, grp, { variant: grp === 'BOFU' ? 'lime' : (grp === 'MOFU' ? 'navy' : 'white'), w: 0.8 });
      rect(s, x0, y + 0.08, w, rh - 0.16, { fill: i === st.length - 1 ? C.NAVY : C.WHITE, radius: 0.08 });
      t(s, n, { x: x0 + 0.25, y: y + 0.08, w: 2.3, h: rh - 0.16, font: F.MED, size: 11.5, color: i === st.length - 1 ? C.WHITE : C.NAVY, valign: 'middle' });
      t(s, v.toLocaleString('en-US'), { x: x0 + w - 1.6, y: y + 0.08, w: 1.35, h: rh - 0.16, font: F.DISP, size: 15, color: i === st.length - 1 ? C.LIME : C.NAVY, align: 'right', valign: 'middle' });
      t(s, c, { x: hx, y, w: 1.6, h: rh, font: F.HEAD, bold: true, size: 13, color: C.NAVY, align: 'right', valign: 'middle' });
      t(s, tm, { x: hx + 1.7, y, w: 1.6, h: rh, size: 11.5, color: C.CHAR, align: 'right', valign: 'middle' });
    });
    footnote(s, 'Bar lengths are stepped for readability and are not drawn to scale.');
    s.addNotes('MARKETING FUNNEL. Left-aligned stepped bars complement the centred sales funnel. Bars are stepped, not to scale; resize freely.');
  }

  // Growth strategy — Ansoff matrix
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Growth strategy: penetrate first, then develop new markets', { lead: 'Ansoff matrix with 2027 investment share and expected new ARR.' });
    const x = M + 0.5, y = 2.25, w = gw(8) - 0.5, h = 4.1, gap = 0.12;
    const cw = (w - gap) / 2, ch = (h - gap) / 2;
    const q = [
      [0, 0, 'Market development', 'Existing product, new markets', '25%', '$6.8M', 'off'],
      [1, 0, 'Diversification', 'New product, new markets', '5%', '$0.9M', 'off'],
      [0, 1, 'Market penetration', 'Existing product, existing markets', '50%', '$14.2M', 'navy'],
      [1, 1, 'Product development', 'New product, existing markets', '20%', '$5.1M', 'lime'],
    ];
    q.forEach(([cx, cy, n, d, inv, arr, v]) => {
      const qx = x + cx * (cw + gap), qy = y + cy * (ch + gap);
      const fill = { off: C.OFF, navy: C.NAVY, lime: C.LIME }[v];
      const dark = v === 'navy';
      card(s, qx, qy, cw, ch, { fill });
      t(s, n, { x: qx + 0.3, y: qy + 0.25, w: cw - 0.6, h: 0.35, font: F.HEAD, bold: true, size: 15, color: dark ? C.WHITE : C.NAVY });
      t(s, d, { x: qx + 0.3, y: qy + 0.6, w: cw - 0.6, h: 0.25, size: 10, color: dark ? C.MIST : (v === 'lime' ? C.NAVY : C.SLATE) });
      t(s, inv, { x: qx + 0.3, y: qy + ch - 0.95, w: 1.5, h: 0.6, font: F.DISP, size: 30, color: dark ? C.LIME : C.NAVY });
      t(s, 'of investment', { x: qx + 0.3, y: qy + ch - 0.4, w: 1.6, h: 0.22, size: 9, color: dark ? C.MIST : (v === 'lime' ? C.NAVY : C.SLATE) });
      t(s, arr, { x: qx + cw - 2.1, y: qy + ch - 0.95, w: 1.8, h: 0.6, font: F.HEAD, bold: true, size: 18, color: dark ? C.WHITE : C.NAVY, align: 'right' });
      t(s, 'new ARR', { x: qx + cw - 2.1, y: qy + ch - 0.4, w: 1.8, h: 0.22, size: 9, color: dark ? C.MIST : (v === 'lime' ? C.NAVY : C.SLATE), align: 'right' });
    });
    t(s, 'Existing  ·  PRODUCTS  ·  New', { x, y: y + h + 0.08, w, h: 0.25, font: F.MED, size: 9, color: C.SLATE, align: 'center', charSpacing: 1 });
    t(s, 'Existing  ·  MARKETS  ·  New', { x: x - 2.35, y: y + h / 2 - 0.12, w: 4.1, h: 0.25, font: F.MED, size: 9, color: C.SLATE, align: 'center', charSpacing: 1, rotate: 270 });
    const rx = gx(8) + 0.3, rw = SW - M - rx;
    t(s, '$27M', { x: rx, y: 2.25, w: rw, h: 0.9, font: F.DISP, size: 50, color: C.NAVY });
    t(s, 'new ARR targeted in 2027 across all four vectors', { x: rx, y: 3.15, w: rw, h: 0.5, size: 11, color: C.SLATE });
    line(s, rx, 3.85, rw, 0, { color: C.MIST });
    t(s, [
      { text: 'Penetration: ', options: { bold: true, color: C.NAVY } }, { text: 'seat expansion and competitive displacement.', options: { breakLine: true } },
      { text: 'Product: ', options: { bold: true, color: C.NAVY } }, { text: 'coaching and planning modules.', options: { breakLine: true } },
      { text: 'Markets: ', options: { bold: true, color: C.NAVY } }, { text: 'France, Spain and Australia.' },
    ], { x: rx, y: 4.05, w: rw, h: 2.2, size: 11, color: C.CHAR, paraSpaceAfter: 10, lineSpacingMultiple: 1.15 });
    s.addNotes('GROWTH STRATEGY. Ansoff matrix. Quadrant order: top = new markets, right = new products. Highlight your priority quadrant in navy.');
  }
};
