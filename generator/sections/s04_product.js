// Product / Service
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, footnote, chartBase } = L;
  const SEC = '03 · Product';

  // Product overview — UI mock built from shapes
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'One workspace for the whole revenue team');
    const x = M, y = 2.05, w = gw(7) + 0.2, h = 4.55;
    card(s, x, y, w, h, { fill: C.WHITE, line: C.MIST });
    [0, 1, 2].forEach(i => oval(s, x + 0.2 + i * 0.18, y + 0.17, 0.1, { fill: C.MIST }));
    rect(s, x + 1.0, y + 0.12, 3.2, 0.2, { fill: C.OFF, radius: 0.1 });
    line(s, x, y + 0.45, w, 0, { color: C.MIST });
    // sidebar
    rect(s, x + 0.01, y + 0.46, 1.25, h - 0.47, { fill: C.NAVY, square: true });
    ['PiSquaresFour', 'PiFunnel', 'PiChartBar', 'PiUsersThree', 'PiGear'].forEach((ic, i) => {
      if (i === 0) rect(s, x + 0.15, y + 0.65 + i * 0.5, 0.95, 0.38, { fill: C.NAVY2, radius: 0.06 });
      icon(s, ic, x + 0.25, y + 0.72 + i * 0.5, 0.24, i === 0 ? C.LIME : C.MIST);
      rect(s, x + 0.6, y + 0.8 + i * 0.5, 0.4, 0.07, { fill: i === 0 ? C.WHITE : C.STEEL, radius: 0.03 });
    });
    const ix = x + 1.5, iw = w - 1.75;
    t(s, 'Q4 Forecast', { x: ix, y: y + 0.62, w: 3, h: 0.3, font: F.HEAD, bold: true, size: 13, color: C.NAVY });
    pill(s, ix + iw - 1.1, y + 0.62, 'Live', { variant: 'lime', w: 1.1, h: 0.26, size: 8.5 });
    const kw = (iw - 0.3) / 3;
    [['Commit', '$14.2M'], ['Best case', '$16.8M'], ['Coverage', '3.4×']].forEach(([k, v], i) => {
      const kx = ix + i * (kw + 0.15);
      rect(s, kx, y + 1.05, kw, 0.85, { fill: C.OFF, radius: 0.08 });
      t(s, k, { x: kx + 0.15, y: y + 1.14, w: kw - 0.3, h: 0.2, size: 8.5, color: C.SLATE });
      t(s, v, { x: kx + 0.15, y: y + 1.38, w: kw - 0.3, h: 0.4, font: F.DISP, size: 18, color: C.NAVY });
    });
    s.addChart(pres.charts.LINE, [
      { name: 'Forecast', labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'], values: [9.1, 9.8, 10.4, 11.2, 11.9, 12.4, 13.1, 13.6, 13.9, 14.2] },
      { name: 'Target', labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'], values: [13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5, 13.5] },
    ], chartBase({ x: ix - 0.1, y: y + 2.05, w: iw + 0.15, h: 2.35, extra: { chartColors: [C.NAVY, C.LIME], lineSize: 2, lineDataSymbol: 'none', valAxisHidden: true, catAxisLabelFontSize: 8, lineDash: ['solid', 'dash'] } }));
    // callouts
    const calls = [
      ['Navigation', 'Every workflow one click away — forecast, pipeline, analytics and coaching.', x + 1.05, y + 0.58],
      ['Live KPIs', 'Commit, best case and coverage update hourly from CRM and inbox data.', ix + kw - 0.2, y + 0.9],
      ['Forecast trend', 'Track the call against target week by week, with confidence bands.', ix + iw * 0.6, y + 2.4],
    ];
    calls.forEach(([h1, d, mx, my], i) => {
      oval(s, mx, my, 0.3, { fill: C.LIME, line: C.NAVY, lw: 1 });
      t(s, String(i + 1), { x: mx, y: my, w: 0.3, h: 0.3, font: F.HEAD, bold: true, size: 10, color: C.NAVY, align: 'center', valign: 'middle' });
      const cx = gx(8) + 0.1, cy = 2.2 + i * 1.45;
      oval(s, cx, cy, 0.4, { fill: C.NAVY });
      t(s, String(i + 1), { x: cx, y: cy, w: 0.4, h: 0.4, font: F.HEAD, bold: true, size: 12, color: C.LIME, align: 'center', valign: 'middle' });
      t(s, h1, { x: cx + 0.6, y: cy + 0.03, w: gw(4) - 0.7, h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      t(s, d, { x: cx + 0.6, y: cy + 0.38, w: gw(4) - 0.7, h: 0.8, size: 11, color: C.SLATE, lineSpacingMultiple: 1.2 });
    });
    s.addNotes('PRODUCT OVERVIEW. The interface mock is drawn with editable shapes and a native line chart — no screenshot needed. Replace with your own screenshot if you prefer (Insert › Pictures, then Send to Back).');
  }

  // Product features — open grid with hairlines
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Features built around how revenue teams actually work', { lead: 'All features are included in the Growth plan and above.' });
    const fs = [
      ['PiSparkle', 'AI deal scoring', 'Scores every opportunity daily using 300+ buying signals.'],
      ['PiEnvelopeSimple', 'Automatic capture', 'Syncs email, calendar and calls without browser plug-ins.'],
      ['PiPresentationChart', 'Forecast roll-ups', 'Rep, manager and board views that reconcile automatically.'],
      ['PiChatCircle', 'Guided coaching', 'Talk-track insights from the conversations that win.'],
      ['PiLockKey', 'Enterprise security', 'SSO, SCIM, role-based access and full audit trail.'],
      ['PiPlugs', '140+ integrations', 'Salesforce, HubSpot, Slack, Snowflake and more.'],
    ];
    const cw = gw(4);
    fs.forEach(([ic, h1, d], i) => {
      const c = i % 3, r = Math.floor(i / 3);
      const x = gx(c * 4), y = 2.2 + r * 2.2;
      line(s, x, y, cw, 0, { color: r === 0 ? C.NAVY : C.MIST, lw: r === 0 ? 1.5 : 0.75 });
      icon(s, ic, x, y + 0.35, 0.42, C.NAVY);
      t(s, h1, { x, y: y + 1.0, w: cw - 0.3, h: 0.35, font: F.HEAD, bold: true, size: 15, color: C.NAVY });
      t(s, d, { x, y: y + 1.38, w: cw - 0.4, h: 0.6, size: 11, color: C.SLATE, lineSpacingMultiple: 1.2 });
      if (i === 0) pill(s, x + cw - 0.95, y + 0.4, 'New', { variant: 'lime', w: 0.7 });
    });
    s.addNotes('PRODUCT FEATURES. Open, card-less grid for a lighter rhythm. Use the lime "New" pill to flag recent releases.');
  }

  // Architecture — layered stack
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'A layered architecture that scales with the customer', { lead: 'Every layer is API-first; customers can plug in at any level.' });
    const layers = [
      ['Experience', 'Where users work', ['Web app', 'Mobile', 'Slack & Teams', 'Browser sidebar']],
      ['Intelligence', 'Where decisions are made', ['Deal scoring', 'Forecast engine', 'Next best action', 'Anomaly alerts']],
      ['Data', 'Where signals are unified', ['Activity graph', 'CRM sync', 'Warehouse sync', 'Identity resolution']],
      ['Infrastructure', 'Where it runs', ['Multi-region cloud', 'Encryption', 'Observability', '99.95% SLA']],
    ];
    const lx = M, lw = gw(10), y0 = 2.1, lh = 1.0, gap = 0.15;
    layers.forEach(([n, d, mods], i) => {
      const y = y0 + i * (lh + gap);
      const hi = i === 1;
      card(s, lx, y, lw, lh, { fill: hi ? C.NAVY : C.OFF });
      t(s, n, { x: lx + 0.3, y: y + 0.22, w: 2.2, h: 0.3, font: F.HEAD, bold: true, size: 14, color: hi ? C.WHITE : C.NAVY });
      t(s, d, { x: lx + 0.3, y: y + 0.53, w: 2.2, h: 0.25, size: 9.5, color: hi ? C.MIST : C.SLATE });
      const mx0 = lx + 2.7, mw = (lw - 2.7 - 0.25 - 0.15 * 3) / 4;
      mods.forEach((m, k) => {
        const mx = mx0 + k * (mw + 0.15);
        rect(s, mx, y + 0.2, mw, 0.6, { fill: hi ? C.LIME : C.WHITE, line: hi ? undefined : C.MIST, radius: 0.06 });
        t(s, m, { x: mx, y: y + 0.2, w: mw, h: 0.6, font: F.MED, size: 10.5, color: C.NAVY, align: 'center', valign: 'middle' });
      });
    });
    const vx = gx(10) + 0.05, vw = gw(2) - 0.05, vh = 4 * lh + 3 * gap;
    card(s, vx, y0, vw, vh, { fill: C.WHITE, line: C.NAVY });
    icon(s, 'PiShieldCheck', vx + vw / 2 - 0.25, y0 + 0.4, 0.5, C.NAVY);
    t(s, 'Security & governance', { x: vx + 0.15, y: y0 + 1.1, w: vw - 0.3, h: 0.6, font: F.HEAD, bold: true, size: 13, color: C.NAVY, align: 'center' });
    ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'SSO / SCIM', 'Audit log'].forEach((c, k) => {
      t(s, c, { x: vx + 0.15, y: y0 + 1.95 + k * 0.4, w: vw - 0.3, h: 0.3, size: 10, color: C.CHAR, align: 'center' });
    });
    s.addNotes('PRODUCT ARCHITECTURE. Four horizontal layers plus a cross-cutting column. The navy layer is the differentiator — move the highlight to the layer you want to emphasise.');
  }

  // Service structure — tree
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Services wrap the platform across the customer lifecycle');
    const rootW = 3.4, rx = SW / 2 - rootW / 2, ry = 2.05;
    card(s, rx, ry, rootW, 0.8, { fill: C.NAVY });
    icon(s, 'PiHeadset', rx + 0.3, ry + 0.22, 0.36, C.LIME);
    t(s, 'Customer Success Office', { x: rx + 0.8, y: ry, w: rootW - 0.9, h: 0.8, font: F.HEAD, bold: true, size: 14, color: C.WHITE, valign: 'middle' });
    const br = [
      ['Onboard', 'Days 0–60', ['Implementation', 'Data migration', 'Admin training']],
      ['Adopt', 'Days 60–180', ['Enablement workshops', 'Health monitoring', 'Playbook design']],
      ['Expand', 'Day 180+', ['Business reviews', 'Advisory services', 'Premium support']],
    ];
    const bw = gw(4), by = 3.55;
    line(s, gx(0) + bw / 2, 3.2, gx(8) - gx(0), 0, { color: C.NAVY, lw: 1.25 });
    line(s, SW / 2, ry + 0.8, 0, 0.35, { color: C.NAVY, lw: 1.25 });
    br.forEach(([n, d, leaves], i) => {
      const x = gx(i * 4);
      line(s, x + bw / 2, 3.2, 0, 0.35, { color: C.NAVY, lw: 1.25 });
      card(s, x, by, bw, 0.75, { fill: i === 1 ? C.LIME : C.WHITE, line: C.NAVY });
      t(s, n, { x: x + 0.25, y: by, w: 2, h: 0.75, font: F.HEAD, bold: true, size: 15, color: C.NAVY, valign: 'middle' });
      t(s, d, { x: x + bw - 1.85, y: by, w: 1.6, h: 0.75, font: F.MED, size: 10, color: C.NAVY, valign: 'middle', align: 'right' });
      leaves.forEach((lf, k) => {
        const ly = by + 1.0 + k * 0.62;
        line(s, x + 0.3, by + 0.75, 0, ly - by - 0.75 + 0.25, { color: C.MIST });
        line(s, x + 0.3, ly + 0.25, 0.25, 0, { color: C.MIST });
        rect(s, x + 0.55, ly, bw - 0.55, 0.5, { fill: C.WHITE, radius: 0.06 });
        t(s, lf, { x: x + 0.75, y: ly, w: bw - 0.9, h: 0.5, size: 11, color: C.CHAR, valign: 'middle' });
      });
    });
    s.addNotes('SERVICE STRUCTURE. Tree diagram built from connectors and cards. Duplicate a leaf (card + two lines) to add a service.');
  }

  // Product roadmap — Now / Next / Later
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Product roadmap: now, next and later', { lead: 'Themes: Intelligence (navy), Platform (outline), Ecosystem (lime).' });
    const cols = [
      ['Now', 'Q4 2026', [['Forecast scenarios', 'Intelligence'], ['Mobile deal rooms', 'Platform'], ['HubSpot 2-way sync', 'Ecosystem']]],
      ['Next', 'H1 2027', [['AI call summaries', 'Intelligence'], ['Custom objects', 'Platform'], ['Partner marketplace', 'Ecosystem'], ['Territory planning', 'Intelligence']]],
      ['Later', 'H2 2027+', [['Autonomous forecasting', 'Intelligence'], ['Data residency (APAC)', 'Platform'], ['Revenue data network', 'Ecosystem']]],
    ];
    const variant = { Intelligence: 'navy', Platform: 'outline', Ecosystem: 'lime' };
    const cw = gw(4);
    cols.forEach(([n, when, items], i) => {
      const x = gx(i * 4), y = 2.1;
      card(s, x, y, cw, 4.45, { fill: i === 0 ? C.NAVY : C.OFF });
      t(s, n, { x: x + 0.3, y: y + 0.25, w: 2, h: 0.45, font: F.DISP, size: 24, color: i === 0 ? C.LIME : C.NAVY });
      t(s, when, { x: x + cw - 1.8, y: y + 0.3, w: 1.5, h: 0.35, font: F.MED, size: 10, color: i === 0 ? C.MIST : C.SLATE, align: 'right', valign: 'middle' });
      items.forEach(([f, th], k) => {
        const iy = y + 0.95 + k * 0.85;
        rect(s, x + 0.25, iy, cw - 0.5, 0.7, { fill: i === 0 ? C.NAVY2 : C.WHITE, radius: 0.08 });
        t(s, f, { x: x + 0.45, y: iy, w: cw - 2.1, h: 0.7, font: F.MED, size: 11, color: i === 0 ? C.WHITE : C.NAVY, valign: 'middle' });
        const v = i === 0 && variant[th] === 'outline' ? 'outlineDark' : variant[th];
        pill(s, x + cw - 1.6, iy + 0.21, th, { variant: v, w: 1.15, h: 0.28, size: 8 });
      });
    });
    s.addNotes('PRODUCT ROADMAP. Now/Next/Later avoids committing to dates you cannot keep. Theme pills: navy = Intelligence, outline = Platform, lime = Ecosystem.');
  }

  // Ecosystem — hub and spoke (dark)
  {
    const s = pres.addSlide({ masterName: L.L.DARK });
    header(s, SEC, 'At the centre of the revenue tech stack', { dark: true });
    t(s, '140+ native integrations mean Corvanta fits into existing workflows on day one — no rip-and-replace.', { x: M, y: 2.1, w: gw(4), h: 1.2, size: 13, color: C.MIST, lineSpacingMultiple: 1.3 });
    [['140+', 'integrations'], ['2 days', 'median setup time'], ['38%', 'of pipeline flows via partners']].forEach(([v, k], i) => {
      const y = 3.55 + i * 0.95;
      t(s, v, { x: M, y, w: 2.2, h: 0.5, font: F.DISP, size: 26, color: i === 0 ? C.LIME : C.WHITE });
      t(s, k, { x: M + 2.2, y: y + 0.1, w: 2.4, h: 0.35, size: 11, color: C.MIST, valign: 'middle' });
    });
    const cx = gx(8), cy = 4.25, rad = 2.0;
    const sat = [['PiDatabase', 'CRM'], ['PiEnvelopeSimple', 'Email'], ['PiCalendarBlank', 'Calendar'], ['PiPhone', 'Telephony'], ['PiChartBar', 'BI tools'], ['PiCloud', 'Data warehouse'], ['PiReceipt', 'Billing'], ['PiChatCircle', 'Messaging']];
    sat.forEach(([ic, n], i) => {
      const a = (i / sat.length) * Math.PI * 2 - Math.PI / 2;
      const sx = cx + Math.cos(a) * rad, sy = cy + Math.sin(a) * rad;
      const x1 = Math.min(cx, sx), y1 = Math.min(cy, sy);
      s.addShape('line', { x: x1, y: y1, w: Math.abs(sx - cx) || 0.001, h: Math.abs(sy - cy) || 0.001, line: { color: C.STEEL, width: 1, dashType: 'dash' }, flipV: (sx - cx) * (sy - cy) < 0 });
      const d = 0.72;
      oval(s, sx - d / 2, sy - d / 2, d, { fill: C.NAVY2, line: C.STEEL, lw: 1 });
      icon(s, ic, sx - 0.17, sy - 0.17, 0.34, C.WHITE);
      const below = Math.sin(a) >= -0.1;
      t(s, n, { x: sx - 0.8, y: below ? sy + d / 2 + 0.05 : sy - d / 2 - 0.3, w: 1.6, h: 0.25, font: F.MED, size: 9.5, color: C.MIST, align: 'center' });
    });
    const hd = 1.5;
    oval(s, cx - hd / 2, cy - hd / 2, hd, { fill: C.LIME });
    t(s, 'Corvanta\nCore', { x: cx - hd / 2, y: cy - hd / 2, w: hd, h: hd, font: F.HEAD, bold: true, size: 14, color: C.NAVY, align: 'center', valign: 'middle' });
    s.addNotes('PRODUCT ECOSYSTEM. Hub-and-spoke diagram. Satellites are grouped circle + icon + label; connectors are dashed lines.');
  }
};
