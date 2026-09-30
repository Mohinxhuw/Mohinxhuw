// Process
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, footnote } = L;
  const SEC = '11 · Operations';

  // Workflow with decision branch
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Deal desk workflow: from request to signed contract in 48 hours', { lead: 'Standard deals follow the fast lane; non-standard terms route to approval.' });
    const y = 3.35, h = 1.0, w = 2.0;
    const box = (x, yy, n, d, v) => {
      const fill = { navy: C.NAVY, off: C.OFF, lime: C.LIME, white: C.WHITE }[v];
      card(s, x, yy, w, h, { fill, line: v === 'white' ? C.MIST : undefined });
      t(s, n, { x: x + 0.2, y: yy + 0.15, w: w - 0.4, h: 0.3, font: F.HEAD, bold: true, size: 12, color: v === 'navy' ? C.WHITE : C.NAVY });
      t(s, d, { x: x + 0.2, y: yy + 0.47, w: w - 0.4, h: 0.4, size: 9.5, color: v === 'navy' ? C.MIST : C.SLATE });
    };
    const x1 = M, x2 = x1 + w + 0.55;
    box(x1, y, 'Request', 'Rep submits deal in CRM', 'off');
    box(x2, y, 'Auto-check', 'Pricing & terms validated', 'off');
    // decision diamond
    const dx = x2 + w + 0.55, dd = 1.5;
    s.addShape('diamond', { x: dx, y: y + h / 2 - dd / 2, w: dd, h: dd, fill: { color: C.NAVY }, line: { type: 'none' } });
    t(s, 'Standard\nterms?', { x: dx, y: y + h / 2 - 0.35, w: dd, h: 0.7, font: F.HEAD, bold: true, size: 11, color: C.WHITE, align: 'center', valign: 'middle' });
    const x4 = dx + dd + 0.55;
    // yes lane
    box(x4, 2.15, 'Fast lane', 'Contract auto-generated', 'lime');
    box(x4 + w + 0.55, 2.15, 'Sign', 'E-signature, < 24 h', 'navy');
    // no lane
    box(x4, 4.55, 'Approval', 'Finance & legal review', 'white');
    box(x4 + w + 0.55, 4.55, 'Negotiate', 'Redlines, < 48 h', 'white');
    const mid = y + h / 2;
    line(s, x1 + w, mid, 0.55, 0, { color: C.NAVY, lw: 1.25, arrow: true });
    line(s, x2 + w, mid, 0.55, 0, { color: C.NAVY, lw: 1.25, arrow: true });
    // diamond to lanes (elbow)
    const cxD = dx + dd / 2;
    line(s, cxD, 2.65, 0, y + h / 2 - dd / 2 - 2.65, { color: C.NAVY, lw: 1.25 });
    line(s, cxD, 2.65, x4 - cxD, 0, { color: C.NAVY, lw: 1.25, arrow: true });
    line(s, cxD, y + h / 2 + dd / 2, 0, 5.05 - (y + h / 2 + dd / 2), { color: C.NAVY, lw: 1.25 });
    line(s, cxD, 5.05, x4 - cxD, 0, { color: C.NAVY, lw: 1.25, arrow: true });
    pill(s, cxD + 0.1, 2.28, 'Yes · 78%', { variant: 'lime', w: 0.95, h: 0.26, size: 8.5 });
    pill(s, cxD + 0.1, 5.2, 'No · 22%', { variant: 'navy', w: 0.95, h: 0.26, size: 8.5 });
    line(s, x4 + w, 2.65, 0.55, 0, { color: C.NAVY, lw: 1.25, arrow: true });
    line(s, x4 + w, 5.05, 0.55, 0, { color: C.NAVY, lw: 1.25, arrow: true });
    // negotiate back to sign
    const sx = x4 + w + 0.55 + w / 2;
    line(s, sx, 3.15, 0, 1.4, { color: C.SLATE, lw: 1.25, dash: 'dash', arrow: true, flipV: true });
    t(s, 'Agreed', { x: sx + 0.12, y: 3.7, w: 1, h: 0.25, size: 9, color: C.SLATE });
    footnote(s, 'Median cycle times, Q3 2026. Percentages show share of deals taking each path.');
    s.addNotes('WORKFLOW. Process with a decision diamond and two lanes. Connectors are straight lines with arrowheads — re-route by moving endpoints.');
  }

  // Operating model — cycle
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, SEC, 'Our operating rhythm runs on a quarterly cycle', { lead: 'Every quarter follows the same four beats, so the whole company plans and reviews together.' });
    const cx = gx(3) + 0.3, cy = 4.3, D = 4.1;
    const seg = [[270, 358, C.NAVY], [0, 88, C.STEEL], [90, 178, C.LIME], [180, 268, C.SLATE]];
    seg.forEach(([a, b, c]) => L.arc(s, cx - D / 2, cy - D / 2, D, a, b, c, 0.3));
    oval(s, cx - 1.05, cy - 1.05, 2.1, { fill: C.WHITE });
    t(s, 'Quarterly\nrhythm', { x: cx - 1.05, y: cy - 1.05, w: 2.1, h: 2.1, font: F.HEAD, bold: true, size: 15, color: C.NAVY, align: 'center', valign: 'middle' });
    [314, 44, 134, 224].forEach((a, i) => {
      const r = D / 2 * 0.85, px = cx + r * Math.cos(a * Math.PI / 180), py = cy + r * Math.sin(a * Math.PI / 180);
      t(s, String(i + 1), { x: px - 0.25, y: py - 0.25, w: 0.5, h: 0.5, font: F.DISP, size: 16, color: i === 2 ? C.NAVY : C.WHITE, align: 'center', valign: 'middle' });
    });
    const beats = [
      ['Plan', 'Weeks 1–2', 'Set targets, allocate budget and confirm owners.'],
      ['Execute', 'Weeks 3–10', 'Weekly forecast calls and pipeline reviews.'],
      ['Review', 'Week 11', 'Business review with leadership and the board.'],
      ['Improve', 'Week 12–13', 'Retrospective, process fixes and next-quarter prep.'],
    ];
    const cols = [C.NAVY, C.STEEL, C.LIME, C.SLATE];
    const tx = gx(6) + 0.3, tw = SW - M - tx;
    beats.forEach(([n, when, d], i) => {
      const y = 2.1 + i * 1.13;
      card(s, tx, y, tw, 0.98, { fill: C.WHITE });
      oval(s, tx + 0.25, y + 0.29, 0.4, { fill: cols[i] });
      t(s, String(i + 1), { x: tx + 0.25, y: y + 0.29, w: 0.4, h: 0.4, font: F.HEAD, bold: true, size: 12, color: i === 2 ? C.NAVY : C.WHITE, align: 'center', valign: 'middle' });
      t(s, n, { x: tx + 0.9, y: y + 0.15, w: 2, h: 0.3, font: F.HEAD, bold: true, size: 14, color: C.NAVY });
      t(s, when, { x: tx + tw - 1.8, y: y + 0.15, w: 1.55, h: 0.3, font: F.MED, size: 10, color: C.SLATE, align: 'right' });
      t(s, d, { x: tx + 0.9, y: y + 0.5, w: tw - 1.15, h: 0.35, size: 10.5, color: C.SLATE });
    });
    s.addNotes('OPERATING MODEL. Cycle diagram made of four block-arc shapes. Drag the yellow handles to change arc thickness; keep the same colours as the legend cards.');
  }

  // Implementation process — vertical timeline
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Implementation: live in 30 days, fully adopted in 90', { lead: 'Standard implementation plan for mid-market customers.' });
    const ph = [
      ['Day 0–5', 'Kick-off', 'Goals, success criteria and project team agreed.', ['Success plan', 'Project charter']],
      ['Day 5–15', 'Connect', 'CRM, email and calendar connected; data validated.', ['Data audit', 'Integration sign-off']],
      ['Day 15–30', 'Go live', 'Admins and managers trained; first forecast call.', ['Admin certification', 'Launch comms']],
      ['Day 30–90', 'Adopt', 'Usage coaching and first quarterly value review.', ['Adoption dashboard', 'Value review']],
    ];
    const lx = gx(2) + 0.4, y0 = 2.1, rh = 1.1;
    line(s, lx + 0.15, y0 + 0.2, 0, rh * (ph.length - 1), { color: C.MIST, lw: 2 });
    ph.forEach(([when, n, d, outs], i) => {
      const y = y0 + i * rh;
      const cur = i === 2;
      t(s, when, { x: M, y: y + 0.02, w: lx - M - 0.3, h: 0.35, font: F.HEAD, bold: true, size: 13, color: C.NAVY, align: 'right' });
      if (cur) pill(s, lx - 1.25, y + 0.42, 'Current', { variant: 'lime', w: 0.95, h: 0.26, size: 8.5 });
      oval(s, lx, y + 0.05, 0.3, { fill: cur ? C.LIME : (i < 2 ? C.NAVY : C.WHITE), line: C.NAVY, lw: 1.5 });
      if (i < 2) icon(s, 'PiCheck', lx + 0.07, y + 0.12, 0.16, C.WHITE);
      t(s, n, { x: lx + 0.6, y, w: 3, h: 0.35, font: F.HEAD, bold: true, size: 15, color: C.NAVY });
      t(s, d, { x: lx + 0.6, y: y + 0.38, w: gw(5), h: 0.3, size: 11, color: C.SLATE });
      const ox = gx(9);
      outs.forEach((o, k) => pill(s, ox + k * 0.0, y + 0.02 + k * 0.36, o, { variant: 'off', w: SW - M - ox, h: 0.3, size: 9 }));
    });
    t(s, 'DELIVERABLES', { x: gx(9), y: 1.83, w: 2, h: 0.22, font: F.MED, size: 8.5, color: C.SLATE, charSpacing: 1.5 });
    s.addNotes('IMPLEMENTATION PROCESS. Vertical timeline: completed phases have filled navy nodes with a check, the current phase is lime.');
  }
};
