// Closing
module.exports = (pres, L) => {
  const { C, F, M, SW, SH, gx, gw, t, rect, oval, line, tag, header, pill, badge, card, icon, tiles, dotGrid } = L;
  const SEC = '14 · Closing';

  // Quote
  {
    const s = pres.addSlide({ masterName: L.L.BDARK });
    tag(s, M, 0.6, SEC + ' · Customer voice', { dark: true });
    icon(s, 'PiQuotes', M, 1.5, 0.9, C.LIME);
    t(s, 'Corvanta didn’t just change our forecast. It changed how the whole company talks about revenue.', { x: M, y: 2.6, w: gw(9), h: 2.4, font: F.HEAD, bold: true, size: 36, color: C.WHITE, lineSpacingMultiple: 1.1 });
    line(s, M, 5.45, 0.8, 0, { color: C.LIME, lw: 2.5 });
    t(s, 'Chief Executive Officer', { x: M, y: 5.65, w: 5, h: 0.3, font: F.MED, size: 13, color: C.WHITE });
    t(s, 'Brightline Retail Group · customer since 2021', { x: M, y: 5.97, w: 6, h: 0.3, size: 11, color: C.MIST });
    dotGrid(s, SW - M - 1.95, 1.55, 8, 5, 0.28, 0.07, C.STEEL);
    s.addNotes('QUOTE. Testimonial without a portrait — attribute by role and company. Keep quotes under 25 words.');
  }

  // Next steps / CTA
  {
    const s = pres.addSlide({ masterName: L.L.LIGHT });
    header(s, SEC, 'Three decisions we need today');
    const st = [
      ['Approve the 2027 plan', 'Sign off targets and the $65M allocation.', 'Board', '22 Oct'],
      ['Green-light US hiring', 'Open 24 sales and CS roles in Q1.', 'CEO & CRO', '31 Oct'],
      ['Confirm France partner', 'Select one of two reseller proposals.', 'CPO', '15 Nov'],
    ];
    const cw = gw(4);
    st.forEach(([h1, d, o, dt], i) => {
      const x = gx(i * 4), y = 2.05;
      card(s, x, y, cw, 3.1, { fill: i === 0 ? C.NAVY : C.OFF });
      t(s, String(i + 1).padStart(2, '0'), { x: x + 0.3, y: y + 0.3, w: 1.2, h: 0.7, font: F.DISP, size: 36, color: i === 0 ? C.LIME : C.NAVY });
      t(s, h1, { x: x + 0.3, y: y + 1.15, w: cw - 0.6, h: 0.4, font: F.HEAD, bold: true, size: 16, color: i === 0 ? C.WHITE : C.NAVY });
      t(s, d, { x: x + 0.3, y: y + 1.58, w: cw - 0.6, h: 0.5, size: 11, color: i === 0 ? C.MIST : C.SLATE });
      line(s, x + 0.3, y + 2.3, cw - 0.6, 0, { color: i === 0 ? C.NAVY2 : C.MIST, lw: 1 });
      icon(s, 'PiUserCircle', x + 0.3, y + 2.5, 0.24, i === 0 ? C.LIME : C.NAVY);
      t(s, o, { x: x + 0.62, y: y + 2.48, w: 1.8, h: 0.28, font: F.MED, size: 10.5, color: i === 0 ? C.WHITE : C.NAVY });
      icon(s, 'PiCalendarBlank', x + cw - 1.3, y + 2.5, 0.24, i === 0 ? C.LIME : C.NAVY);
      t(s, dt, { x: x + cw - 1.0, y: y + 2.48, w: 0.75, h: 0.28, font: F.MED, size: 10.5, color: i === 0 ? C.WHITE : C.NAVY, align: 'right' });
    });
    card(s, M, 5.45, SW - 2 * M, 1.15, { fill: C.LIME });
    t(s, 'Ready to see Corvanta on your own data?', { x: M + 0.4, y: 5.45, w: 7, h: 1.15, font: F.HEAD, bold: true, size: 20, color: C.NAVY, valign: 'middle' });
    rect(s, SW - M - 3.05, 5.75, 2.65, 0.55, { fill: C.NAVY, radius: 0.275 });
    t(s, 'Book a strategy session', { x: SW - M - 3.05, y: 5.75, w: 2.25, h: 0.55, font: F.MED, size: 11.5, color: C.WHITE, align: 'center', valign: 'middle' });
    icon(s, 'PiArrowRight', SW - M - 0.85, 5.9, 0.25, C.LIME);
    s.addNotes('NEXT STEPS / CTA. Three decisions with owner and date, plus a call-to-action banner. The button is a rounded rectangle — add a hyperlink via Insert › Link.');
  }

  // Thank you / contact
  {
    const s = pres.addSlide({ masterName: L.L.BDARK });
    t(s, 'VERTEX', { x: M, y: 0.58, w: 2, h: 0.3, font: F.DISP, size: 13, color: C.WHITE, charSpacing: 2 });
    t(s, [{ text: 'Thank you', options: { color: C.WHITE } }, { text: '.', options: { color: C.LIME } }], { x: M - 0.05, y: 1.6, w: 8, h: 1.6, font: F.DISP, size: 88 });
    t(s, 'Questions, feedback or next steps — we would love to hear from you.', { x: M, y: 3.3, w: 6.5, h: 0.5, size: 15, color: C.MIST });
    const ct = [['PiEnvelopeSimple', 'hello@yourcompany.com'], ['PiPhone', '+1 (555) 010-2026'], ['PiGlobe', 'www.yourcompany.com'], ['PiMapPin', '100 Market Street, Suite 400']];
    ct.forEach(([ic, v], i) => {
      const x = M + (i % 2) * 3.6, y = 4.6 + Math.floor(i / 2) * 0.85;
      badge(s, ic, x, y, 0.55, { bg: C.NAVY2, fg: C.LIME });
      t(s, v, { x: x + 0.75, y, w: 2.8, h: 0.55, font: F.MED, size: 12, color: C.WHITE, valign: 'middle' });
    });
    const u = 1.2, x0 = SW - M - 3 * u, y0 = SH - M - 4 * u;
    tiles(s, x0, y0, u, [
      [0, 0, 'q', C.LIME, 2], [1, 0, 'sq', C.NAVY2], [1, 0, 'dot', C.LIME], [2, 0, 'circ', C.STEEL],
      [0, 1, 'sq', C.NAVY2], [0, 1, 'semi', C.LIME, 0], [1, 1, 'sq', C.LIME], [1, 1, 'q', C.NAVY, 0], [2, 1, 'sq', C.NAVY2], [2, 1, 'grid', C.LIME],
      [0, 2, 'circ', C.NAVY2], [1, 2, 'sq', C.STEEL], [1, 2, 'semi', C.NAVY, 3], [2, 2, 'q', C.LIME, 3],
      [1, 3, 'sq', C.NAVY2], [1, 3, 'ring', C.LIME], [2, 3, 'sq', C.LIME],
    ]);
    s.addNotes('THANK YOU / CONTACT. Replace contact details with your own. Tile artwork is editable shapes.');
  }
};
