const pptxgen = require('pptxgenjs');
const { execSync } = require('child_process');
const path = require('path');
const lib = require('./lib');

const ICONS = 'PiChartBar PiChartLineUp PiChartPieSlice PiTarget PiRocketLaunch PiUsersThree PiGlobeHemisphereWest PiLightning PiShieldCheck PiGear PiStack PiCube PiPlugs PiCloud PiDatabase PiCurrencyDollar PiHandshake PiMegaphone PiEnvelopeSimple PiMagnifyingGlass PiFlag PiCompass PiLightbulb PiPuzzlePiece PiTrendUp PiTrendDown PiClock PiCheckCircle PiCheck PiX PiArrowRight PiArrowUpRight PiBuildings PiStorefront PiShoppingCart PiCreditCard PiWallet PiBriefcase PiHeadset PiDeviceMobile PiBrowser PiCode PiLockKey PiSparkle PiFunnel PiMapPin PiCalendarBlank PiUserCircle PiWarning PiLeaf PiPresentationChart PiQuotes PiPhone PiGauge PiArrowsClockwise PiPath PiEye PiHeart PiCrown PiCpu PiTreeStructure PiChatCircle PiGlobe PiPercent PiCoins PiReceipt PiNotePencil PiPaintBrush PiUsers PiUser PiMedal PiHourglass PiPackage PiTruck PiShareNetwork PiArrowsSplit PiScales PiSealCheck PiRuler PiTextAa PiPalette PiSquaresFour PiCursorClick PiListChecks PiIdentificationCard PiBank PiChartLine PiRepeat PiMinus PiPlus'.split(' ');

const SECTIONS = (process.env.ONLY ? process.env.ONLY.split(',') : [
  's00_guide', 's01_cover', 's02_company', 's03_problem', 's04_product', 's05_market', 's06_competition',
  's07_sales', 's08_marketing', 's09_kpi', 's10_finance', 's11_strategy', 's12_process', 's13_case',
  's14_compare', 's15_charts', 's16_close',
]);

(async () => {
  await lib.prerenderIcons(ICONS);
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Vertex Studio';
  pres.company = 'Vertex Studio';
  pres.title = 'Vertex — Premium Business & Sales PowerPoint Template';
  pres.theme = { headFontFace: 'Manrope', bodyFontFace: 'Inter' };
  lib.defineMasters(pres);
  const ctx = { n: 0 };
  const META = {
    s00_guide: ['00', 'Template guide', 'Usage, palette, type, components'],
    s01_cover: ['•', 'Covers & navigation', 'Covers, agenda, dividers'],
    s02_company: ['01', 'Company', 'Overview, timeline, model'],
    s03_problem: ['02', 'Problem & solution', 'Pain points, solution, value'],
    s04_product: ['03', 'Product', 'Features, architecture, roadmap'],
    s05_market: ['04', 'Market', 'TAM/SAM/SOM, segments, trends'],
    s06_competition: ['05', 'Competition', 'Matrix, head-to-head, radar'],
    s07_sales: ['06', 'Sales', 'Funnel, pipeline, channels'],
    s08_marketing: ['07', 'Marketing', 'Campaign, mix, journey'],
    s09_kpi: ['08', 'Performance & KPIs', 'Dashboards, trends, scorecard'],
    s10_finance: ['09', 'Finance', 'Revenue, bridge, forecast, pricing'],
    s11_strategy: ['10', 'Strategy', 'Priorities, SWOT, roadmap'],
    s12_process: ['11', 'Operations', 'Workflow, cycle, rollout'],
    s13_case: ['12', 'Case study', 'Challenge, before/after, impact'],
    s14_compare: ['13', 'Comparison & tables', 'Options, plan and data tables'],
    s15_charts: ['•', 'Chart library', 'Bars, lines, pies, combos'],
    s16_close: ['14', 'Closing', 'Quote, next steps, thank you'],
  };
  const idx = [];
  const count = () => (pres.slides || pres._slides).length;
  for (const s of SECTIONS) {
    const from = count() + 1;
    require('./sections/' + s)(pres, lib, ctx);
    if (META[s]) idx.push([META[s][0], META[s][1], from, count(), META[s][2]]);
  }
  if (ctx.fillIndex) ctx.fillIndex(idx);
  console.log('slides:', count());
  const raw = path.join(__dirname, 'raw.pptx');
  await pres.writeFile({ fileName: raw });
  const out = process.env.OUT || path.join(__dirname, 'out', 'Vertex — Premium Business & Sales PowerPoint Template.pptx');
  execSync(`mkdir -p "${path.dirname(out)}"`);
  execSync(`python3 post.py raw.pptx "${out}" icons`, { cwd: __dirname, stdio: 'inherit' });
  console.log('wrote', out);
})();
