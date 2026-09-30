// Company
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, kpi, icon, footnote } = L;
  const SEC = '01 · Company';

  // Company overview
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'A revenue platform trusted by 1,240 growing companies');
    t(s, 'Corvanta helps mid-market sales teams forecast accurately, prioritise the right deals and grow revenue with less manual work.', { x: M, y: 2.05, w: gw(7), h: 1.1, font: F.HEAD, size: 18, color: C.NAVY, lineSpacingMultiple: 1.2 });
    const rows = [
      ['PiTarget', 'Forecasting', 'AI-driven revenue forecasts with 96% accuracy at quarter start.'],
      ['PiFunnel', 'Pipeline intelligence', 'Deal scoring that surfaces risk three weeks earlier than CRM data alone.'],
      ['PiChartLineUp', 'Revenue analytics', 'One source of truth for bookings, retention and expansion.'],
    ];
    rows.forEach(([ic, h, d], i) => {
      const y = 3.55 + i * 1.0;
      badge(s, ic, M, y, 0.56, { bg: C.OFF, fg: C.NAVY });
      t(s, h, { x: M + 0.8, y: y + 0.02, w: gw(6), h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      t(s, d, { x: M + 0.8, y: y + 0.32, w: gw(6), h: 0.3, size: 11, color: C.SLATE });
    });
    const x = gx(8), w = gw(4);
    card(s, x, 2.05, w, 4.55, { fill: C.NAVY });
    t(s, 'COMPANY FACTS', { x: x + 0.35, y: 2.35, w: w - 0.7, h: 0.25, font: F.MED, size: 9.5, color: C.MIST, charSpacing: 1.5 });
    [['Founded', '2016'], ['Headquarters', 'Amsterdam'], ['Employees', '320'], ['Offices', '6 cities'], ['Customers', '1,240'], ['Markets', '14 countries']].forEach(([k, v], i) => {
      const y = 2.8 + i * 0.6;
      t(s, k, { x: x + 0.35, y, w: 1.8, h: 0.4, size: 11, color: C.MIST, valign: 'middle' });
      t(s, v, { x: x + 1.9, y, w: w - 2.25, h: 0.4, font: F.HEAD, bold: true, size: 14, color: i === 4 ? C.LIME : C.WHITE, align: 'right', valign: 'middle' });
      if (i < 5) line(s, x + 0.35, y + 0.5, w - 0.7, 0, { color: C.NAVY2, lw: 1 });
    });
    s.addNotes('COMPANY OVERVIEW. Left: positioning statement and three capabilities. Right: fact sheet card — keep values short.');
  }

  // Company facts — asymmetric number grid
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'The business at a glance', { lead: 'Figures as of 30 September 2026. ARR includes contracted, not-yet-live revenue.' });
    const y0 = 2.05, H = 4.5;
    const bx = gx(0), bw = gw(5);
    card(s, bx, y0, bw, H, { fill: C.LIME });
    t(s, 'Annual recurring revenue', { x: bx + 0.4, y: y0 + 0.4, w: bw - 0.8, h: 0.3, font: F.MED, size: 12, color: C.NAVY });
    icon(s, 'PiChartLineUp', bx + bw - 0.8, y0 + 0.35, 0.4, C.NAVY);
    t(s, '$48.6M', { x: bx + 0.4, y: y0 + 2.2, w: bw - 0.8, h: 1.3, font: F.DISP, size: 76, color: C.NAVY, valign: 'bottom' });
    t(s, '▲ 62% year over year — fastest growth in our category.', { x: bx + 0.4, y: y0 + 3.65, w: bw - 0.8, h: 0.4, font: F.MED, size: 12, color: C.NAVY });
    const cells = [
      ['PiUsersThree', '1,240', 'Customers', '+310 net new in 2026'],
      ['PiArrowsClockwise', '128%', 'Net revenue retention', 'Top quartile for B2B SaaS'],
      ['PiGlobeHemisphereWest', '14', 'Countries served', '4 regions, 6 offices'],
      ['PiSealCheck', '72', 'Net Promoter Score', 'Up from 58 in 2024'],
    ];
    const cw = gw(3.5) , gap = 0.25, sx = gx(5) + 0.25;
    const w2 = (SW - M - sx - gap) / 2, h2 = (H - gap) / 2;
    cells.forEach(([ic, v, k, n], i) => {
      const x = sx + (i % 2) * (w2 + gap), y = y0 + Math.floor(i / 2) * (h2 + gap);
      card(s, x, y, w2, h2, { fill: C.WHITE });
      badge(s, ic, x + 0.3, y + 0.3, 0.5, { bg: C.OFF, fg: C.NAVY });
      t(s, v, { x: x + 0.3, y: y + 0.95, w: w2 - 0.6, h: 0.7, font: F.DISP, size: 38, color: C.NAVY });
      t(s, k, { x: x + 0.3, y: y + 1.62, w: w2 - 0.6, h: 0.25, font: F.MED, size: 11, color: C.NAVY });
      t(s, n, { x: x + 0.3, y: y + 1.87, w: w2 - 0.6, h: 0.25, size: 10, color: C.SLATE });
    });
    s.addNotes('COMPANY FACTS. The lime card holds the single most important number. Keep the four supporting facts to one number + one label each.');
  }

  // Timeline
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Ten years from spreadsheet add-on to category leader');
    const ev = [
      ['2016', 'Founded', 'Forecasting add-on for spreadsheets, 3 founders.'],
      ['2018', 'Product–market fit', 'First 100 customers and SaaS platform launch.'],
      ['2020', 'Series A · $18M', 'Expansion into DACH and the Nordics.'],
      ['2022', 'AI forecasting', 'Launched predictive deal scoring engine.'],
      ['2024', 'Series B · $65M', 'Opened New York; crossed $25M ARR.'],
      ['2026', '1,240 customers', '$48.6M ARR, 14 markets, 320 people.'],
    ];
    const y = 4.15, x0 = M, x1 = SW - M, step = (x1 - x0) / ev.length;
    line(s, x0, y, x1 - x0, 0, { color: C.MIST, lw: 1.5 });
    ev.forEach(([yr, h, d], i) => {
      const cx = x0 + step * i + step / 2 - 0.9 + 0.9;
      const nx = x0 + i * step;
      const last = i === ev.length - 1;
      oval(s, nx, y - (last ? 0.16 : 0.1), last ? 0.32 : 0.2, { fill: last ? C.LIME : C.NAVY, line: last ? C.NAVY : undefined, lw: 1.5 });
      const up = i % 2 === 0;
      const ty = up ? 2.15 : 4.6;
      line(s, nx + (last ? 0.16 : 0.1), up ? 3.55 : y + 0.2, 0, up ? 0.5 : 0.3, { color: C.MIST });
      t(s, yr, { x: nx, y: ty, w: step - 0.2, h: 0.5, font: F.DISP, size: 24, color: last ? C.NAVY : C.NAVY });
      t(s, h, { x: nx, y: ty + 0.55, w: step - 0.2, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
      t(s, d, { x: nx, y: ty + 0.87, w: step - 0.25, h: 0.6, size: 10, color: C.SLATE, lineSpacingMultiple: 1.2 });
      if (last) pill(s, nx + 1.05, ty + 0.1, 'Today', { variant: 'lime' });
    });
    s.addNotes('TIMELINE. Six milestones alternate above and below the axis. To add a milestone, reduce spacing or duplicate the slide for a second era.');
  }

  // Mission / Vision
  {
    const s = pres.addSlide({ masterName: L.L.BWHITE });
    rect(s, 0, 0, SW / 2, SH, { fill: C.NAVY, square: true });
    const px = M, pw = SW / 2 - 2 * M;
    tag(s, px, 0.6, SEC + ' · Mission', { dark: true });
    t(s, 'OUR MISSION', { x: px, y: 1.9, w: pw, h: 0.3, font: F.MED, size: 10, color: C.LIME, charSpacing: 2 });
    t(s, 'Give every revenue team the clarity to make the right call — every day, on every deal.', { x: px, y: 2.35, w: pw, h: 2.4, font: F.HEAD, bold: true, size: 28, color: C.WHITE, lineSpacingMultiple: 1.1 });
    const qx = SW / 2 + M;
    t(s, 'OUR VISION', { x: qx, y: 1.9, w: pw, h: 0.3, font: F.MED, size: 10, color: C.OLIVE, charSpacing: 2 });
    t(s, 'A world where no forecast is a guess and no good deal is lost to bad data.', { x: qx, y: 2.35, w: pw, h: 2.0, font: F.HEAD, bold: true, size: 28, color: C.NAVY, lineSpacingMultiple: 1.1 });
    t(s, 'VALUES', { x: px, y: 5.25, w: 2, h: 0.25, font: F.MED, size: 9.5, color: C.MIST, charSpacing: 1.5 });
    [['PiEye', 'Radical clarity'], ['PiHandshake', 'Earn trust daily'], ['PiLightning', 'Bias for speed']].forEach(([ic, v], i) => {
      const x = px + i * 1.95;
      badge(s, ic, x, 5.65, 0.5, { bg: C.NAVY2, fg: C.LIME });
      t(s, v, { x, y: 6.25, w: 1.85, h: 0.3, font: F.MED, size: 11, color: C.WHITE });
    });
    t(s, 'BY 2030', { x: qx, y: 5.25, w: 2, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5 });
    [['10K', 'customers'], ['$250M', 'ARR'], ['40', 'markets']].forEach(([v, k], i) => {
      const x = qx + i * 1.95;
      t(s, v, { x, y: 5.6, w: 1.85, h: 0.6, font: F.DISP, size: 30, color: C.NAVY });
      t(s, k, { x, y: 6.25, w: 1.85, h: 0.3, size: 11, color: C.SLATE });
    });
    s.addNotes('MISSION / VISION. Keep each statement under 20 words so it holds at 28 pt.');
  }

  // Business model — flow
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'How we make money: one platform, three revenue streams', { lead: 'Subscription is 81% of revenue; services and marketplace fees lift average contract value by 24%.' });
    const y0 = 2.2, colH = 4.2;
    // Customers
    const c1 = gx(0), w1 = gw(3);
    t(s, 'CUSTOMERS', { x: c1, y: y0, w: w1, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5 });
    [['PiBuildings', 'Mid-market', '200–2,000 staff'], ['PiStorefront', 'Scale-ups', 'Series B–D'], ['PiBriefcase', 'Enterprise teams', 'Division buyers']].forEach(([ic, h, d], i) => {
      const y = y0 + 0.45 + i * 1.3;
      card(s, c1, y, w1, 1.1, { fill: C.OFF });
      icon(s, ic, c1 + 0.25, y + 0.3, 0.4, C.NAVY);
      t(s, h, { x: c1 + 0.85, y: y + 0.25, w: w1 - 1, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
      t(s, d, { x: c1 + 0.85, y: y + 0.57, w: w1 - 1, h: 0.25, size: 10, color: C.SLATE });
    });
    // Platform
    const c2 = gx(4), w2 = gw(4);
    t(s, 'PLATFORM', { x: c2, y: y0, w: w2, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5 });
    card(s, c2, y0 + 0.45, w2, 3.7, { fill: C.NAVY });
    t(s, 'Corvanta Revenue Cloud', { x: c2 + 0.35, y: y0 + 0.75, w: w2 - 0.7, h: 0.35, font: F.HEAD, bold: true, size: 16, color: C.WHITE });
    t(s, 'Per-seat subscription, billed annually', { x: c2 + 0.35, y: y0 + 1.12, w: w2 - 0.7, h: 0.25, size: 10, color: C.MIST });
    ['Forecast', 'Pipeline', 'Analytics', 'Coaching'].forEach((m, i) => {
      const x = c2 + 0.35 + (i % 2) * ((w2 - 0.85) / 2 + 0.15), y = y0 + 1.7 + Math.floor(i / 2) * 0.75;
      rect(s, x, y, (w2 - 0.85) / 2, 0.6, { fill: C.NAVY2 });
      t(s, m, { x, y, w: (w2 - 0.85) / 2, h: 0.6, font: F.MED, size: 11, color: C.WHITE, align: 'center', valign: 'middle' });
    });
    pill(s, c2 + 0.35, y0 + 3.4, 'AI engine included in all plans', { variant: 'lime' });
    // Revenue
    const c3 = gx(9), w3 = gw(3);
    t(s, 'REVENUE STREAMS', { x: c3, y: y0, w: w3, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5 });
    [['81%', 'Subscriptions'], ['12%', 'Implementation services'], ['7%', 'Marketplace fees']].forEach(([v, k], i) => {
      const y = y0 + 0.45 + i * 1.3;
      card(s, c3, y, w3, 1.1, { fill: i === 0 ? C.LIME : C.OFF });
      t(s, v, { x: c3 + 0.25, y: y + 0.15, w: w3 - 0.5, h: 0.5, font: F.DISP, size: 26, color: C.NAVY });
      t(s, k, { x: c3 + 0.25, y: y + 0.68, w: w3 - 0.5, h: 0.25, size: 10.5, color: C.NAVY });
    });
    // arrows
    [[c1 + w1 + 0.08, gx(4) - 0.08], [c2 + w2 + 0.08, gx(9) - 0.08]].forEach(([a, b]) => line(s, a, y0 + 2.3, b - a, 0, { color: C.NAVY, lw: 1.5, arrow: true }));
    s.addNotes('BUSINESS MODEL. Left → right flow: who buys, what they buy, how revenue splits. All boxes are editable shapes.');
  }

  // Global footprint
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Present in 14 countries, with Europe still 52% of revenue');
    const reg = [
      ['Europe', 52, '640', 'Amsterdam · Berlin · London', '+48%'],
      ['North America', 31, '410', 'New York · Toronto', '+91%'],
      ['Asia-Pacific', 11, '140', 'Singapore', '+120%'],
      ['Middle East & Africa', 6, '50', 'Partner-led', '+64%'],
    ];
    // share bar
    t(s, 'REVENUE SHARE BY REGION', { x: M, y: 2.05, w: 5, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5 });
    const cols = [C.NAVY, C.STEEL, C.LIME, C.MIST];
    let x = M; const bw = SW - 2 * M, gap = 0.05;
    reg.forEach(([n, p], i) => {
      const w = (bw - gap * 3) * p / 100;
      rect(s, x, 2.45, w, 0.5, { fill: cols[i], radius: 0.06 });
      t(s, p + '%', { x: x + 0.12, y: 2.45, w: Math.max(w - 0.2, 0.5), h: 0.5, font: F.HEAD, bold: true, size: 12, color: i < 2 ? C.WHITE : C.NAVY, valign: 'middle' });
      x += w + gap;
    });
    const cw = gw(3);
    reg.forEach(([n, p, cust, off, g], i) => {
      const cx = gx(i * 3), y = 3.4;
      card(s, cx, y, cw, 3.15, { fill: C.OFF });
      rect(s, cx + 0.3, y + 0.35, 0.16, 0.16, { fill: cols[i], radius: 0.03 });
      t(s, n, { x: cx + 0.6, y: y + 0.28, w: cw - 0.8, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
      t(s, cust, { x: cx + 0.3, y: y + 0.85, w: cw - 0.6, h: 0.7, font: F.DISP, size: 36, color: C.NAVY });
      t(s, 'customers', { x: cx + 0.3, y: y + 1.55, w: cw - 0.6, h: 0.25, size: 10.5, color: C.SLATE });
      line(s, cx + 0.3, y + 2.0, cw - 0.6, 0, { color: C.MIST });
      icon(s, 'PiMapPin', cx + 0.3, y + 2.2, 0.22, C.NAVY);
      t(s, off, { x: cx + 0.6, y: y + 2.18, w: cw - 0.8, h: 0.28, size: 10, color: C.CHAR });
      icon(s, 'PiTrendUp', cx + 0.3, y + 2.6, 0.22, C.OLIVE);
      t(s, g + ' revenue growth', { x: cx + 0.6, y: y + 2.58, w: cw - 0.8, h: 0.28, font: F.MED, size: 10, color: C.OLIVE });
    });
    s.addNotes('GLOBAL FOOTPRINT. The share bar is built from four rectangles — resize their widths to match your split (full width = 100%).');
  }

  // Core capabilities
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Six capabilities that set us apart', { lead: 'Maturity is self-assessed against our 2027 target state (5 = best in class).' });
    const caps = [
      ['PiCpu', 'Predictive AI', 'Models trained on 1.2B sales activities.', 5],
      ['PiPlugs', 'Integrations', '140+ native connectors, 2-day setup.', 4],
      ['PiShieldCheck', 'Security', 'SOC 2 Type II, ISO 27001, GDPR-native.', 5],
      ['PiHeadset', 'Customer success', 'Named CSM for every account over $50K.', 4],
      ['PiChartPieSlice', 'Analytics', 'Self-serve dashboards for every role.', 3],
      ['PiGlobe', 'Localisation', '9 languages, multi-currency, local data.', 3],
    ];
    const cw = gw(4), ch = 2.1;
    caps.forEach(([ic, h, d, lvl], i) => {
      const x = gx((i % 3) * 4), y = 2.1 + Math.floor(i / 3) * (ch + 0.25);
      card(s, x, y, cw, ch, { fill: C.WHITE });
      badge(s, ic, x + 0.3, y + 0.3, 0.56, { bg: C.NAVY, fg: C.LIME });
      t(s, h, { x: x + 0.3, y: y + 1.0, w: cw - 0.6, h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.32, w: cw - 0.6, h: 0.3, size: 10.5, color: C.SLATE });
      for (let k = 0; k < 5; k++) rect(s, x + cw - 0.3 - (5 - k) * 0.24, y + 0.45, 0.18, 0.18, { fill: k < lvl ? C.NAVY : C.MIST, radius: 0.04 });
      t(s, 'Maturity', { x: x + cw - 1.5, y: y + 0.7, w: 1.2, h: 0.2, size: 8.5, color: C.SLATE, align: 'right' });
    });
    s.addNotes('CORE CAPABILITIES. The five squares are a maturity meter — recolour squares to navy (filled) or mist (empty).');
  }
};
