// Covers + navigation
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, tiles, dotGrid, badge, card, stepNum } = L;

  // 1. Hero cover — typography left, tile composition right
  {
    const s = pres.addSlide({ masterName: L.L.BWHITE });
    const u = 1.5, x0 = SW - 4 * u;
    tiles(s, x0, 0, u, [
      [0, 0, 'sq', C.OFF], [0, 0, 'semi', C.NAVY, 0], [1, 0, 'sq', C.NAVY], [1, 0, 'dot', C.LIME], [2, 0, 'sq', C.LIME], [2, 0, 'q', C.NAVY, 0], [3, 0, 'sq', C.NAVY],
      [0, 1, 'sq', C.NAVY], [0, 1, 'q', C.LIME, 1], [1, 1, 'sq', C.NAVY2], [1, 1, 'ring', C.LIME], [2, 1, 'sq', C.NAVY], [3, 1, 'sq', C.OFF], [3, 1, 'circ', C.NAVY],
      [0, 2, 'sq', C.LIME], [1, 2, 'sq', C.NAVY], [1, 2, 'semi', C.OFF, 1], [2, 2, 'sq', C.NAVY2], [2, 2, 'grid', C.LIME], [3, 2, 'sq', C.NAVY], [3, 2, 'q', C.LIME, 3],
      [0, 3, 'sq', C.NAVY], [0, 3, 'circ', C.OFF], [1, 3, 'sq', C.NAVY], [2, 3, 'sq', C.OFF], [2, 3, 'q', C.NAVY, 2], [3, 3, 'sq', C.NAVY2],
      [0, 4, 'sq', C.OFF], [1, 4, 'sq', C.LIME], [1, 4, 'semi', C.NAVY, 3], [2, 4, 'sq', C.NAVY], [3, 4, 'sq', C.NAVY], [3, 4, 'dot', C.LIME],
    ]);
    t(s, 'VERTEX', { x: M, y: 0.55, w: 2, h: 0.3, font: F.DISP, size: 13, color: C.NAVY, charSpacing: 2 });
    tag(s, M, 2.05, 'Annual Business Review 2026');
    t(s, 'Build what\nmoves the\nmarket.', { x: M, y: 2.45, w: 6.4, h: 2.8, font: F.DISP, size: 58, color: C.NAVY, lineSpacingMultiple: 0.92 });
    t(s, 'Growth strategy, sales performance and the plan for the next 24 months.', { x: M, y: 5.3, w: 5.6, h: 0.6, size: 14, color: C.CHAR, lineSpacingMultiple: 1.2 });
    const meta = [['Prepared by', 'Strategy Office'], ['Date', 'September 2026'], ['Classification', 'Confidential']];
    meta.forEach(([k, v], i) => {
      t(s, k, { x: M + i * 1.95, y: 6.45, w: 1.8, h: 0.22, size: 9, color: C.SLATE });
      t(s, v, { x: M + i * 1.95, y: 6.68, w: 1.8, h: 0.25, font: F.MED, size: 10.5, color: C.NAVY });
    });
    s.addNotes('HERO COVER. Replace the headline, sub-headline and meta row. The tile artwork on the right is built from editable shapes — recolour any tile or delete tiles freely.');
  }

  // 2. Minimal cover
  {
    const s = pres.addSlide({ masterName: L.L.BWHITE });
    t(s, 'VERTEX', { x: M, y: 0.55, w: 2, h: 0.3, font: F.DISP, size: 13, color: C.NAVY, charSpacing: 2 });
    t(s, '2026 Edition', { x: SW - M - 2, y: 0.55, w: 2, h: 0.3, font: F.MED, size: 10, color: C.SLATE, align: 'right' });
    pill(s, M, 2.35, 'Q3 2026', { variant: 'lime' });
    t(s, 'Quarterly Business Review', { x: M, y: 2.85, w: 9, h: 1.0, font: F.HEAD, bold: true, size: 48, color: C.NAVY });
    t(s, 'Performance, pipeline and priorities for the quarter ahead.', { x: M, y: 3.9, w: 8, h: 0.4, size: 16, color: C.SLATE });
    line(s, M, 5.9, SW - 2 * M - 2.4, 0, { color: C.MIST });
    [['Presenter', 'Chief Revenue Officer'], ['Audience', 'Executive Leadership Team'], ['Date', '14 October 2026']].forEach(([k, v], i) => {
      t(s, k, { x: M + i * 3.0, y: 6.1, w: 2.8, h: 0.22, size: 9, color: C.SLATE });
      t(s, v, { x: M + i * 3.0, y: 6.34, w: 2.8, h: 0.25, font: F.MED, size: 11, color: C.NAVY });
    });
    const u = 0.9, x0 = SW - M - 2 * u, y0 = SH - 0.6 - 2 * u;
    tiles(s, x0, y0, u, [[0, 0, 'sq', C.NAVY], [0, 0, 'q', C.LIME, 2], [1, 0, 'sq', C.OFF], [1, 0, 'circ', C.NAVY], [0, 1, 'sq', C.LIME], [1, 1, 'sq', C.NAVY], [1, 1, 'semi', C.OFF, 0]]);
    s.addNotes('MINIMAL COVER. Best for internal reviews. Keep the headline to one line.');
  }

  // 3. Bold typography cover
  {
    const s = pres.addSlide({ masterName: L.L.BDARK });
    tag(s, M, 0.6, 'Go-to-market plan · FY2027', { dark: true });
    t(s, 'VERTEX', { x: SW - M - 2, y: 0.58, w: 2, h: 0.3, font: F.DISP, size: 13, color: C.WHITE, charSpacing: 2, align: 'right' });
    t(s, [{ text: 'Grow', options: { color: C.WHITE } }, { text: '.', options: { color: C.LIME } }], { x: M - 0.12, y: 1.25, w: 9, h: 3.4, font: F.DISP, size: 210, valign: 'middle' });
    t(s, 'Faster. Smarter.\nTogether.', { x: M, y: 4.85, w: 5, h: 1.2, font: F.HEAD, bold: true, size: 30, color: C.WHITE, lineSpacingMultiple: 1.0 });
    t(s, 'A focused plan to double enterprise revenue by expanding into three new markets and doubling partner-sourced pipeline.', { x: gx(7), y: 5.0, w: gw(5), h: 1.0, size: 13, color: C.MIST, lineSpacingMultiple: 1.25 });
    dotGrid(s, SW - M - 2.1, 1.35, 8, 8, 0.28, 0.07, C.LIME);
    line(s, M, 6.55, SW - 2 * M, 0, { color: C.NAVY2, lw: 1 });
    t(s, 'Commercial Strategy Office', { x: M, y: 6.72, w: 4, h: 0.25, size: 10, color: C.MIST });
    t(s, 'October 2026', { x: SW - M - 3, y: 6.72, w: 3, h: 0.25, size: 10, color: C.MIST, align: 'right' });
    s.addNotes('BOLD TYPOGRAPHY COVER. Replace "Grow" with one short word (max 5 characters at this size). The lime full stop is a separate text run.');
  }

  // 4. Business title slide — split off-white / navy
  {
    const s = pres.addSlide({ masterName: L.L.BWHITE });
    rect(s, 0, 0, 7.6, SH, { fill: C.OFF, square: true });
    rect(s, 7.6, 0, SW - 7.6, SH, { fill: C.NAVY, square: true });
    t(s, 'VERTEX', { x: M, y: 0.55, w: 2, h: 0.3, font: F.DISP, size: 13, color: C.NAVY, charSpacing: 2 });
    tag(s, M, 2.1, 'Investor presentation');
    t(s, 'Series B\nFunding Proposal', { x: M, y: 2.5, w: 6.6, h: 1.9, font: F.HEAD, bold: true, size: 46, color: C.NAVY, lineSpacingMultiple: 0.95 });
    t(s, 'Scaling the revenue platform for the mid-market — traction, plan and use of funds.', { x: M, y: 4.55, w: 6.0, h: 0.8, size: 14, color: C.CHAR, lineSpacingMultiple: 1.2 });
    t(s, 'Corvanta Inc.  ·  Strictly confidential  ·  2026', { x: M, y: 6.72, w: 6, h: 0.25, size: 10, color: C.SLATE });
    const px = 8.3;
    t(s, 'AT A GLANCE', { x: px, y: 1.3, w: 4, h: 0.25, font: F.MED, size: 9.5, color: C.MIST, charSpacing: 1.5 });
    [['$48.6M', 'Annual recurring revenue'], ['62%', 'Year-over-year growth'], ['128%', 'Net revenue retention']].forEach(([v, k], i) => {
      const y = 1.85 + i * 1.55;
      t(s, v, { x: px, y, w: 4.4, h: 0.85, font: F.DISP, size: 48, color: i === 0 ? C.LIME : C.WHITE });
      t(s, k, { x: px, y: y + 0.85, w: 4.4, h: 0.3, size: 11.5, color: C.MIST });
      if (i < 2) line(s, px, y + 1.35, 4.4, 0, { color: C.NAVY2, lw: 1 });
    });
    s.addNotes('BUSINESS TITLE SLIDE. The right panel is a quick proof-point strip; swap the three metrics for your own headline numbers.');
  }

  // 5. Executive cover — navy with corner quarter-circle
  {
    const s = pres.addSlide({ masterName: L.L.BDARK });
    L.pie(s, SW - 3.2, SH - 3.2, 6.4, 180, 270, C.LIME);
    L.pie(s, SW - 1.9, SH - 1.9, 3.8, 180, 270, C.NAVY);
    oval(s, SW - 1.15, SH - 1.15, 0.3, { fill: C.LIME });
    t(s, 'VERTEX', { x: M, y: 0.58, w: 2, h: 0.3, font: F.DISP, size: 13, color: C.WHITE, charSpacing: 2 });
    tag(s, M, 1.9, 'Board of Directors · Q3 2026', { dark: true });
    t(s, 'Executive\nPerformance Review', { x: M, y: 2.3, w: 8, h: 1.9, font: F.HEAD, bold: true, size: 48, color: C.WHITE, lineSpacingMultiple: 0.95 });
    t(s, 'Results, risks and decisions required from the board.', { x: M, y: 4.35, w: 7, h: 0.45, size: 15, color: C.MIST });
    [['Presented by', 'Chief Executive Officer'], ['Meeting date', '22 October 2026'], ['Decisions required', '3 items']].forEach(([k, v], i) => {
      const x = M + i * 2.55;
      t(s, k, { x, y: 5.85, w: 2.4, h: 0.22, size: 9, color: C.MIST });
      t(s, v, { x, y: 6.1, w: 2.4, h: 0.3, font: F.MED, size: 11.5, color: C.WHITE });
    });
    s.addNotes('EXECUTIVE COVER. For board and leadership meetings. The corner artwork is three editable shapes.');
  }

  // 6. Agenda
  {
    const s = pres.addSlide({ masterName: L.L.BLANK });
    tag(s, M, 0.48, 'Agenda');
    t(s, 'Today’s\nagenda', { x: M, y: 0.85, w: gw(4), h: 1.8, font: F.HEAD, bold: true, size: 40, color: C.NAVY, lineSpacingMultiple: 0.95 });
    t(s, 'Six topics, 60 minutes. Decisions are captured in section 06.', { x: M, y: 2.8, w: gw(3), h: 0.8, size: 12, color: C.SLATE, lineSpacingMultiple: 1.25 });
    card(s, M, 4.6, gw(3), 1.9, { fill: C.NAVY });
    t(s, '60', { x: M + 0.3, y: 4.8, w: 2, h: 0.8, font: F.DISP, size: 44, color: C.LIME });
    t(s, 'minutes total, including\n15 minutes of Q&A', { x: M + 0.3, y: 5.65, w: gw(3) - 0.6, h: 0.6, size: 11, color: C.MIST });
    const items = [
      ['Business overview', 'Where we are and what changed this year', '10 min'],
      ['Market opportunity', 'Size, growth and the segments we will win', '10 min'],
      ['Sales performance', 'Pipeline, conversion and revenue by channel', '10 min'],
      ['Financial outlook', 'Forecast, unit economics and budget', '10 min'],
      ['Strategic roadmap', 'Priorities and milestones for 2027', '5 min'],
      ['Decisions & next steps', 'What we need from this group today', '15 min'],
    ];
    const x0 = gx(5), w = gw(7), y0 = 0.95, rh = 0.9;
    items.forEach(([h, d, m], i) => {
      const y = y0 + i * rh;
      t(s, String(i + 1).padStart(2, '0'), { x: x0, y: y + 0.2, w: 0.6, h: 0.4, font: F.DISP, size: 18, color: i === 0 ? C.NAVY : C.MIST });
      t(s, h, { x: x0 + 0.8, y: y + 0.14, w: 4.6, h: 0.32, font: F.HEAD, bold: true, size: 15, color: C.NAVY });
      t(s, d, { x: x0 + 0.8, y: y + 0.46, w: 4.6, h: 0.28, size: 10.5, color: C.SLATE });
      if (i === 0) pill(s, x0 + w - 1.9, y + 0.28, 'Now', { variant: 'lime', w: 0.7 });
      t(s, m, { x: x0 + w - 1.0, y: y + 0.28, w: 1.0, h: 0.3, font: F.MED, size: 10, color: C.CHAR, align: 'right', valign: 'middle' });
      if (i < items.length - 1) line(s, x0, y + rh, w, 0, { color: C.MIST });
    });
    s.addNotes('AGENDA. Move the lime "Now" pill to the current topic when re-using this slide between sections.');
  }

  // 7. Contents — 3x2 chapter grid
  {
    const s = pres.addSlide({ masterName: L.L.OFFW });
    header(s, 'Contents', 'What’s inside this presentation');
    const ch = [
      ['01', 'Company', 'Overview · Timeline · Model'],
      ['02', 'Market', 'TAM/SAM/SOM · Segments · Trends'],
      ['03', 'Product', 'Features · Architecture · Roadmap'],
      ['04', 'Sales & Marketing', 'Funnel · Pipeline · Channels'],
      ['05', 'Finance', 'Revenue · Unit economics · Forecast'],
      ['06', 'Strategy', 'Priorities · SWOT · Milestones'],
    ];
    const cw = gw(4), chh = 2.2;
    ch.forEach(([n, h, d], i) => {
      const x = gx((i % 3) * 4), y = 2.05 + Math.floor(i / 3) * (chh + 0.25);
      const hi = i === 1;
      card(s, x, y, cw, chh, { fill: hi ? C.NAVY : C.WHITE });
      t(s, n, { x: x + 0.3, y: y + 0.28, w: 1.5, h: 0.75, font: F.DISP, size: 40, color: hi ? C.LIME : C.NAVY });
      t(s, h, { x: x + 0.3, y: y + 1.2, w: cw - 0.6, h: 0.35, font: F.HEAD, bold: true, size: 17, color: hi ? C.WHITE : C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.6, w: cw - 0.6, h: 0.3, size: 10.5, color: hi ? C.MIST : C.SLATE });
      L.icon(s, 'PiArrowUpRight', x + cw - 0.55, y + 0.3, 0.26, hi ? C.LIME : C.NAVY);
    });
    s.addNotes('CONTENTS. Highlight the chapter you are about to present by swapping the navy card.');
  }

  // 8. Section divider — dark
  {
    const s = pres.addSlide({ masterName: L.L.BDARK });
    t(s, '02', { x: M - 0.08, y: 0.9, w: 6, h: 2.6, font: F.DISP, size: 190, color: C.LIME, valign: 'top' });
    tag(s, M, 4.05, 'Section two', { dark: true });
    t(s, 'Market Opportunity', { x: M, y: 4.45, w: 8, h: 0.9, font: F.HEAD, bold: true, size: 44, color: C.WHITE });
    t(s, 'A $38B market growing 19% a year — and the three segments where we have the right to win.', { x: M, y: 5.4, w: 6.8, h: 0.8, size: 14, color: C.MIST, lineSpacingMultiple: 1.25 });
    const u = 1.1, x0 = SW - M - 3 * u, y0 = SH - M - 3 * u;
    tiles(s, x0, y0, u, [[2, 0, 'q', C.LIME, 3], [1, 1, 'sq', C.NAVY2], [1, 1, 'dot', C.LIME], [2, 1, 'sq', C.LIME], [0, 2, 'semi', C.NAVY2, 3], [1, 2, 'q', C.LIME, 1], [2, 2, 'sq', C.NAVY2], [2, 2, 'circ', C.LIME]]);
    s.addNotes('SECTION DIVIDER (DARK). Duplicate for every chapter and change the number, title and one-line summary.');
  }

  // 9. Chapter introduction — light
  {
    const s = pres.addSlide({ masterName: L.L.BWHITE });
    rect(s, 0, 0, gx(5) - 0.25, SH, { fill: C.OFF, square: true });
    t(s, '03', { x: M, y: 0.55, w: 3, h: 1.3, font: F.DISP, size: 80, color: C.NAVY });
    tag(s, M, 2.35, 'Chapter introduction');
    t(s, 'Why the market is shifting now', { x: M, y: 2.75, w: gw(4) - 0.3, h: 1.6, font: F.HEAD, bold: true, size: 30, color: C.NAVY, lineSpacingMultiple: 1.0 });
    t(s, 'Buyers are consolidating tools, budgets are moving to measurable outcomes, and AI is resetting expectations for speed.', { x: M, y: 4.45, w: gw(4) - 0.4, h: 1.3, size: 12.5, color: C.CHAR, lineSpacingMultiple: 1.3 });
    t(s, 'THIS CHAPTER ANSWERS', { x: gx(5) + 0.1, y: 1.0, w: 5, h: 0.25, font: F.MED, size: 9.5, color: C.SLATE, charSpacing: 1.5 });
    const qs = [
      ['PiMagnifyingGlass', 'How big is the opportunity?', 'Market size, growth rate and the share we can realistically capture in three years.'],
      ['PiUsersThree', 'Who are we selling to?', 'The three customer segments with the highest lifetime value and shortest sales cycle.'],
      ['PiCompass', 'Where do we play to win?', 'Positioning against the four competitors that appear in 80% of our deals.'],
    ];
    qs.forEach(([ic, h, d], i) => {
      const y = 1.5 + i * 1.65, x = gx(5) + 0.1, w = SW - M - x;
      badge(s, ic, x, y + 0.1, 0.62, { bg: C.LIME, fg: C.NAVY });
      t(s, h, { x: x + 0.95, y: y + 0.08, w: w - 1, h: 0.4, font: F.HEAD, bold: true, size: 18, color: C.NAVY });
      t(s, d, { x: x + 0.95, y: y + 0.52, w: w - 1.2, h: 0.6, size: 11.5, color: C.SLATE, lineSpacingMultiple: 1.25 });
      if (i < 2) line(s, x, y + 1.42, w, 0, { color: C.MIST });
    });
    s.addNotes('CHAPTER INTRODUCTION. Frame the questions a chapter will answer before showing the data.');
  }
};
